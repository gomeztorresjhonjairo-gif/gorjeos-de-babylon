# Referencia competitiva y propuesta de conversión

## Referencia revisada

Se revisó [Q2BSTUDIO](https://q2bstudio.com/) como referencia de estructura comercial, no como modelo para copiar su identidad visual.

Los elementos más útiles de su página son:

- Pruebas de confianza visibles: experiencia, proyectos, valoraciones y señales de autoridad.
- Preguntas frecuentes que reducen dudas sobre alcance, tiempos, inversión, propiedad y acompañamiento.
- Llamadas a la acción concretas, orientadas a iniciar una conversación sobre el proyecto.
- Separación clara entre servicios, prueba social y contacto.

## Decisiones aplicadas en esta rama

### 1. Confianza sin testimonios inventados

Todavía no contamos con testimonios verificables, nombres de clientes ni resultados publicados que debamos mostrar como prueba social. Por eso el módulo se orienta a explicar el método real de trabajo en cuatro pasos:

1. Entender el reto antes de construir.
2. Diseñar una ruta viable.
3. Construir con criterio y entregables visibles.
4. Optimizar con aprendizaje del uso real.

Cuando existan casos autorizados, este módulo podrá evolucionar a casos reales, resultados medibles o testimonios.

### 2. Preguntas frecuentes

Se añadió una sección desplegable con preguntas sobre el inicio del proyecto, cobertura Colombia–España, trabajo sobre productos existentes, pasos posteriores al formulario y contacto directo por WhatsApp.

### 3. Conversión

Se añadió “Preguntas” a la navegación para que las objeciones comerciales estén a un clic del visitante. Se mantiene el CTA “Iniciar proyecto” y el enlace secundario “Cuéntanos tu reto”, alineados con el flujo actual.

### 4. Telegram

El enlace de Telegram fue actualizado a `https://t.me/GoBbylon`.

## Recomendación de logo

Para usar únicamente el símbolo, la mejor opción de la cuadrícula recibida es la de la esquina inferior derecha: el arco de Babilonia lineal con circuitos. Es la más legible en favicon, navegación, pie de página y botones pequeños, y mantiene una relación directa con el nombre de la marca.

La opción circular de la fila superior central funcionaría como avatar o sello social, pero añade un contenedor que compite con el sistema de pastillas de la interfaz. No se reemplazó todavía el asset del sitio porque la imagen recibida es una composición con fondo y texto; conviene preparar una versión vectorial transparente del símbolo seleccionado antes de ponerla en producción.

## Alcance de la iteración anterior

La iteración anterior incorporó la propuesta de estructura, confianza, FAQ, animaciones moderadas y el ajuste de Telegram. `main` y `correcciones` no se modificaron con esos cambios.

La iteración actual se documenta en `docs/claridad-home-2026-09-15.md` y trabaja sobre la claridad del home en la rama `codex/claridad-home`.

## Criterio de animación aplicado

La referencia competitiva tiene una presencia animada más intensa, con estados de carga, navegación dinámica, carruseles, logos y prueba social. En Gorjeos se eligió una capa intermedia:

- Entrada inicial breve del contenido principal.
- Aparición una sola vez al entrar en viewport para tarjetas de servicios.
- Desfase leve entre tarjetas para crear ritmo sin convertirlo en una cascada lenta.
- Elevación corta en hover y foco visible para teclado.
- Apertura suave de las respuestas FAQ.
- Respeto de `prefers-reduced-motion` para desactivar el movimiento cuando el dispositivo o la persona lo solicita.

Se evitó añadir más vídeos, bucles permanentes o animaciones de fondo adicionales. La intención es mejorar la percepción de calidad sin aumentar solicitudes de red ni mantener trabajo constante innecesario en el navegador.
