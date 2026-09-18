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

## Pendiente de medición

Después de publicar la preview se debe repetir PageSpeed móvil sobre esa URL. El resultado posterior debe compararse con la línea base; no se considera éxito solo por el tamaño del bundle, sino por la mejora de FCP, LCP y la puntuación móvil en condiciones equivalentes.

La advertencia de chunk grande del shader es esperada: ese código queda fuera de la carga inicial para no penalizar la primera pantalla y se mantiene como mejora visual progresiva.

