# Evaluación UX y conversión — rama `codex/ux-conversion-v2`

Fecha: 2026-09-18

## Objetivo

Convertir la landing en una página más clara, confiable y orientada a conversación comercial, sin sacrificar la identidad visual ni añadir animaciones o dependencias pesadas.

La propuesta parte de la evaluación previa de la home, que estimaba: claridad 7/10, confianza 6/10, conversión 5,5/10, experiencia móvil 7/10 y rendimiento 6,5/10.

## Cambios aplicados en esta rama

1. **Promesa más específica en el hero**
   - Se conserva el mensaje principal.
   - Se añade una frase de audiencia: empresas y marcas que necesitan convertir un reto digital en una decisión clara.
   - Esto ayuda a que el visitante se identifique antes de leer toda la página.

2. **Franja compacta de confianza y proceso**
   - Dirección antes que tecnología.
   - Proceso visible: entender → diseñar → construir → optimizar.
   - Contacto sin fricción: formulario, WhatsApp o Telegram.
   - La franja también se adapta al modo oscuro y al móvil.

3. **Menú móvil de la versión inglesa**
   - El botón podía cambiar de estado sin mostrar el panel de navegación.
   - Ahora abre el mismo tipo de panel móvil que la versión española y permite cerrar al seleccionar una sección.

4. **Más seguridad percibida en el formulario**
   - Se explicita que el visitante no necesita llegar con la solución definida.
   - Se recuerda que se conserva el servicio seleccionado.
   - Se informa que recibirá confirmación cuando la solicitud sea enviada.

5. **Rendimiento preservado**
   - La nueva capa solo añade HTML y CSS ligero.
   - No se agregaron librerías de animación, vídeos ni imágenes nuevas.
   - Se mantienen las optimizaciones anteriores: carga diferida de imágenes, shader diferido en móvil y respaldo estático del hero.

## Evaluación heurística esperada

| Área | Antes | En esta rama | Observación |
|---|---:|---:|---|
| Claridad de la propuesta | 7/10 | 8,5/10 | El hero identifica mejor a quién ayudamos y qué decisión facilitamos. |
| Navegación | 8/10 | 9/10 | Se corrige la navegación móvil en inglés. |
| Servicios | 8/10 | 8,5/10 | Los servicios ya explican resultados; la franja refuerza el criterio de trabajo. |
| Confianza | 6/10 | 7/10 | Se comunica el proceso, pero aún faltan pruebas externas verificables. |
| Conversión | 7,5/10 | 8,5/10 | El formulario ya tiene recepción, estados, servicio persistido y ahora más contexto antes del envío. |
| Experiencia móvil | 8/10 | 8,5/10 | Mejor navegación y bloques compactos sin aumentar la carga visual. |
| Rendimiento | 8/10 | 8/10 | Esta rama no introduce coste significativo; debe confirmarse con una medición del Preview. |

**Resultado global orientativo: 8,4/10.** Es una valoración heurística, no una métrica de usuarios reales ni una auditoría de Lighthouse.

## No aplicado todavía

- Testimonios, logos de clientes, cifras de conversión o casos de éxito: no hay datos autorizados y verificables para publicarlos sin inventar evidencia.
- Traducción automática por país: se mantiene la elección por idioma del navegador y el selector visible; no se fuerza un cambio por geolocalización porque puede sorprender a usuarios bilingües.
- Cambios estructurales mayores, rediseño completo o nuevas animaciones: requieren validación visual y no son necesarios para esta iteración.

## Próxima validación

1. Revisar el Preview en escritorio y móvil.
2. Abrir y cerrar el menú inglés en un teléfono real.
3. Comprobar que el nuevo mensaje no desplaza demasiado el CTA principal.
4. Ejecutar una medición de rendimiento móvil y escritorio sobre el Preview.
5. Si la versión es aprobada, integrar la rama en `main` mediante un commit separado.
