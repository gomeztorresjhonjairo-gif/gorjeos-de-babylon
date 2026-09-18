# Evaluación UX, comercial y de navegación

**Fecha:** 13 de septiembre de 2026  
**Rama evaluada:** `correcciones`  
**Preview evaluado:** <https://gorjeos-de-babylon-i3uyt1djc-gorjeos.vercel.app/>  
**Alcance:** revisión heurística desde la perspectiva de una persona que busca contratar un servicio digital.

## Resumen ejecutivo

La página transmite una identidad visual fuerte y profesional. La navegación principal es clara, el contacto por WhatsApp está siempre disponible y la propuesta tiene una buena estructura por etapas: presentación, servicios y contacto.

El principal riesgo no está en la estética, sino en la conversión: el visitante puede interesarse, pero todavía no recibe suficiente prueba de resultados y el formulario depende del cliente de correo del dispositivo. La animación de Misión y Visión aporta atención visual, aunque es decorativa y debe evitar competir con la lectura.

**Puntuación general actual: 7,1/10.**

## Puntuación por área

| Área | Puntuación | Lectura |
|---|---:|---|
| Coherencia visual y marca | 8,5/10 | Sistema visual consistente, con buen uso del naranja y del azul oscuro. |
| Navegación | 8/10 | La navegación permanece fija y los destinos principales son fáciles de localizar. |
| Claridad de servicios | 7/10 | Los nombres son comprensibles, pero algunas descripciones son abstractas o extensas. |
| Confianza comercial | 6/10 | Falta evidencia: casos, testimonios, métricas o resultados concretos. |
| Flujo de conversión | 5,5/10 | El formulario no captura contactos directamente y las tarjetas no conservan el servicio elegido. |
| Experiencia móvil | 7/10 | La estructura es legible, pero debe validarse en dispositivos físicos y con diferentes velocidades de red. |
| Rendimiento | 6,5/10 | Hay carga diferida en videos e imágenes, pero la compilación mantiene un paquete React muy grande. |

## Recorrido de un usuario potencial

### 1. Primera impresión

La página comunica sofisticación y capacidad técnica. El hero tiene personalidad y el CTA se identifica con rapidez.

El punto débil es la claridad inmediata del beneficio. Expresiones como “construimos tu imperio digital” son memorables, pero no explican rápidamente qué problema concreto se resuelve ni para quién.

**Pregunta del usuario:** “¿Esto es exactamente para una empresa como la mía?”  
**Respuesta actual:** parcialmente clara; falta una segmentación o prueba más directa.

### 2. Exploración de servicios

Las categorías se entienden: software, embudos, UX/UI, ciberseguridad e IA creativa. La lectura es ordenada y las tarjetas tienen una jerarquía visual correcta.

Sin embargo, todos los enlaces de servicio terminan en `#contacto`. El usuario no recibe una explicación específica ni llega al formulario con el servicio seleccionado.

**Riesgo:** el visitante debe recordar o volver a escribir qué servicio le interesó.

### 3. Misión y Visión

La animación 3D se detecta y genera atención por el color naranja. En el preview actual las tarjetas tienen una cara trasera naranja y una animación de una sola ejecución con duración de 1,8 segundos.

Desde la perspectiva de un usuario:

- Llama la atención de forma positiva.
- Puede distraer si las dos tarjetas giran mientras el usuario intenta leer.
- El giro es decorativo: la cara trasera no comunica información nueva.
- Una duración de 1,8 segundos puede sentirse lenta para una interacción que no depende de una acción del usuario.
- Si el visitante desplaza la página rápidamente, puede perderse el efecto o percibirlo como un cambio de estado.

**Recomendación no aplicada:** mantener una sola activación, pero probar una duración aproximada de 0,9–1,2 segundos o reservar el giro completo para una interacción explícita. Si se conserva el giro de 360°, la cara naranja debería incorporar una palabra clave o beneficio para darle significado.

### 4. Contacto

El formulario tiene una estructura clara y pocos campos. WhatsApp funciona como canal directo y tiene un mensaje prellenado, lo cual reduce fricción.

El problema crítico es que el envío utiliza `mailto:`. Esto abre el cliente de correo del visitante y no garantiza que la solicitud llegue. En teléfonos sin una aplicación de correo configurada, el flujo puede fallar silenciosamente.

**Pregunta del usuario:** “¿La empresa recibió mis datos?”  
**Respuesta actual:** no existe una confirmación real del lado del servidor.

### 5. Footer

En el preview actualizado el footer está mucho mejor organizado:

- identidad de marca agrupada;
- mensaje principal separado;
- acciones y copyright en una tercera zona;
- espacio reservado para WhatsApp y Telegram.

La composición ya no presenta el solapamiento grave de la versión anterior. En móvil, la agrupación horizontal del icono y el nombre mejora la lectura.

## Hallazgos técnicos y de funcionamiento

### Prioridad alta

1. **Sustituir el envío por `mailto:` por un endpoint o servicio de recepción real.**
2. **Conservar el servicio elegido** cuando el visitante pulse una tarjeta y llegue al formulario.
3. **Agregar confirmación real de envío**, con estado de éxito y manejo de errores.
4. **Medir eventos de conversión:** WhatsApp, inicio de formulario, selección de servicio, envío y CTA principal.

### Prioridad media

5. Añadir casos reales, testimonios, métricas o ejemplos de entregables.
6. Reemplazar los marcadores repetidos “Visual del servicio” por imágenes, diagramas o resultados concretos.
7. Revisar frases excesivamente abstractas o grandilocuentes para que el beneficio sea más inmediato.
8. Añadir una referencia visible a privacidad o tratamiento de datos junto al consentimiento.

### Prioridad de rendimiento

9. Reducir el peso inicial de React y revisar la división de código; la compilación advierte un paquete superior a 2,5 MB sin comprimir.
10. Mantener shaders y videos fuera de la carga inicial cuando no sean necesarios.
11. Validar la página en Android y iPhone físicos con red móvil, no solo en el modo responsive del navegador.

## Recomendación de orden para próximas iteraciones

1. Captura real de leads y confirmación de envío.
2. Contexto de servicio dentro del formulario.
3. Instrumentación de eventos y revisión de datos reales.
4. Casos, resultados y elementos de confianza.
5. Prueba A/B de la animación de Misión y Visión.
6. Sustitución de visuales provisionales.
7. Optimización de peso y validación en dispositivos físicos.

## Conclusión

La página ya tiene una base visual sólida y una navegación funcional. El siguiente salto de calidad no depende de añadir más efectos, sino de transformar el interés en una conversación medible y confiable. La animación puede mantenerse como recurso de identidad, pero debe permanecer subordinada a la lectura, la claridad del servicio y la captura del contacto.
