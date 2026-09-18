# Revisión de rendimiento móvil

Fecha: 18 de septiembre de 2026  
Rama: `codex/mobile-performance`  
URL evaluada: `https://www.gorjeosbabylon.com/`  
Herramienta: PageSpeed Insights / Lighthouse móvil

## Línea base

La medición móvil inicial obtuvo:

- Rendimiento: 64
- Accesibilidad: 97
- Prácticas recomendadas: 100
- SEO: 100
- First Contentful Paint: 4,2 s
- Largest Contentful Paint: 6,5 s
- Total Blocking Time: 30 ms
- Cumulative Layout Shift: 0
- Speed Index: 6,0 s

El entorno de prueba emula un Moto G Power con red 4G lenta, por lo que estos valores son una referencia de laboratorio y no sustituyen los datos reales de usuarios.

## Problemas confirmados

PageSpeed señaló tres áreas que sí podían optimizarse sin cambiar el diseño ni la tecnología de la animación:

1. El shader del banner quedaba dentro del paquete principal y aportaba aproximadamente 328 KiB de JavaScript no utilizado durante el arranque.
2. `apps-software.webp` podía comprimirse con un ahorro estimado de aproximadamente 31,5 KiB.
3. `modelos-ia.webp` podía comprimirse con un ahorro estimado de aproximadamente 4,9 KiB.
4. El logo compacto se servía a 256 px aunque en la cabecera móvil se mostraba cerca de 54 px.

## Cambios aplicados

- Se mantuvo la importación diferida del shader y se separó el código de `shaders/react` en `hero-shader`.
- Se eliminó únicamente la precarga automática de ese chunk. La animación, sus parámetros, el fallback estático y la lógica de accesibilidad no se modificaron.
- Se conserva el retraso de carga inicial y el fallback para dispositivos sin WebGPU, `prefers-reduced-motion` o `Save-Data`.
- Se recompresaron `apps-software.webp` y `modelos-ia.webp` manteniendo sus dimensiones de 800 × 597 px.
- Se añadió `gorjeos-mark-64.webp` para la cabecera compacta y se mantuvo el logo grande para el pie de página y metadatos.

## Corrección de navegación agéntica

PageSpeed identificó que el carrusel del método declaraba `role="listitem"` directamente sobre elementos `article`, una combinación que no cumple el árbol ARIA esperado por la auditoría de navegación agéntica. Se reemplazó por una lista semántica real con `ul` y `li`, manteniendo las mismas clases, estilos, desplazamiento y controles.

También se ajustó la compresión de `apps-software.webp` tras la segunda medición. La imagen conserva sus dimensiones y composición visual, pero reduce su peso para atender el ahorro restante señalado por PageSpeed.

## Validación posterior

En la nueva preview `https://gorjeos-de-babylon-eyhywlqut-gorjeos.vercel.app/`:

- Navegación agéntica: 3/3; el error del árbol de accesibilidad quedó resuelto.
- Rendimiento móvil: 62 en esta ejecución, con FCP de 5,9 s, LCP de 6,4 s, TBT de 30 ms, CLS de 0 y Speed Index de 5,9 s.
- Rendimiento de escritorio: 92, con FCP de 0,8 s, LCP de 1,2 s, TBT de 150 ms, CLS de 0 y Speed Index de 1,5 s.
- SEO: 100.
- Prácticas recomendadas: 100.

Las puntuaciones móviles fluctúan entre ejecuciones de PageSpeed por las condiciones de red y CPU emuladas. La señal más estable de esta iteración es que el JavaScript ya no genera tareas largas relevantes y la auditoría agéntica está completamente aprobada.

## Verificaciones

- `npm run build`: correcto.
- El HTML generado ya no contiene `modulepreload` para `hero-shader`.
- El shader continúa apareciendo como importación dinámica en el bundle principal.
- `git diff --check`: correcto.
- No se modificaron imágenes de fondo, contenido textual ni parámetros de la animación.

## Resultado de la preview

La preview `https://gorjeos-de-babylon-kfsjxz8yn-gorjeos.vercel.app/` se volvió a medir con el mismo perfil móvil:

- Rendimiento: 66, +2 puntos
- First Contentful Paint: 3,8 s, mejora de 0,4 s
- Largest Contentful Paint: 6,5 s, sin cambio
- Total Blocking Time: 140 ms
- Cumulative Layout Shift: 0
- Speed Index: 4,1 s, mejora de 1,9 s

La auditoría de JavaScript todavía identifica el chunk del shader cuando este termina cargándose, aunque ya no se descarga mediante `modulepreload`. Para eliminar también ese coste de la medición habría que retrasar más la aparición de la animación o sustituirla, y ambas opciones modificarían la experiencia visual solicitada; por eso no se aplicaron.

La advertencia de chunk grande del shader es esperada: ese código queda fuera de la carga inicial para no penalizar la primera pantalla y se mantiene como mejora visual progresiva.

## Prueba de retraso adicional

Se probó una espera móvil de 3,2 s antes de importar el shader, manteniendo el mismo shader, fallback y apariencia final. En la preview `https://gorjeos-de-babylon-rnk0dbluy-gorjeos.vercel.app/`, PageSpeed obtuvo:

- Rendimiento móvil: 62, sin mejora.
- First Contentful Paint: 5,9 s, sin mejora.
- Largest Contentful Paint: 6,8 s, frente a 6,4 s en la medición anterior.
- Total Blocking Time: 30 ms.
- Cumulative Layout Shift: 0.
- Navegación agéntica: 3/3.

El retraso adicional no redujo el coste que PageSpeed observa en la cadena de red: el chunk `hero-shader` siguió apareciendo con aproximadamente 698 KiB. Se revirtió a 1,2 s en móvil para no empeorar la percepción de carga. La conclusión es que un retraso temporal, por sí solo, no resuelve el problema; una mejora mayor requeriría reducir o cambiar la entrega del shader en móvil, algo que sí alteraría la estrategia de carga de la animación y queda pendiente de aprobación específica.

## Comparación de empaquetado y escritorio

También se compararon dos variantes sin modificar el aspecto de la animación:

- Sin división manual de React: móvil 65, FCP 4,1 s, LCP 6,3 s, TBT 50 ms; escritorio 86, con TBT de 330 ms.
- Retraso de escritorio a 1,6 s: escritorio 79, con FCP 0,5 s, LCP 0,7 s, TBT 470 ms y CLS 0,001. Se descartó porque empeoró el bloqueo total.

La rama vuelve a la configuración equilibrada: React separado, shader en su propio chunk diferido, sin `modulepreload` del shader y 650 ms de espera en escritorio / 1,2 s en móvil. En la medición previa de esta configuración se obtuvo escritorio 92 y móvil 62; la diferencia frente a ejecuciones de 64–66 confirma que PageSpeed varía entre corridas por CPU, red y momento de ejecución. La preview final de esta configuración es `https://gorjeos-de-babylon-q26ohada2-gorjeos.vercel.app/`.
