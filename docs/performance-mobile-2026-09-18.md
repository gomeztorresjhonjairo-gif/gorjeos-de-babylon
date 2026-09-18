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
