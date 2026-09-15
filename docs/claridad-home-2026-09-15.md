# Revisión de claridad y conversión del home

## Diagnóstico aplicado

Las anotaciones de control de calidad apuntaban a tres problemas principales:

1. La promesa del hero era demasiado abstracta y no explicaba con rapidez qué hace Gorjeos de Babylon.
2. El bloque de presentación, el bloque de método y el bloque de servicios repetían ideas sin una jerarquía clara.
3. El visitante necesitaba leer los servicios desde su resultado de negocio, no únicamente desde categorías técnicas.

También se identificó una oportunidad de pedagogía comercial: la página debe poder entenderse por una persona que todavía no conoce la marca.

## Cambios realizados en `codex/claridad-home`

- El hero ahora comunica una propuesta directa: crear, posicionar y hacer evolucionar la presencia digital.
- Se añadió una explicación breve de las capacidades: software, web, SEO, analítica, ciberseguridad e IA.
- Se añadió una frase de posicionamiento: “No se trata solo de estar en internet. Se trata de construir algo que funcione.”
- “Nosotros” quedó centrado en el problema del cliente y en tres ideas accionables: entender, diseñar y construir para evolucionar.
- Se eliminó la repetición de las tarjetas de servicios detallados dentro de “Nosotros”. Los servicios se explican una sola vez en su bloque principal.
- El método ahora funciona como un recorrido de cuatro pasos: entender, diseñar, construir y optimizar.
- Las cinco tarjetas de servicios se reescribieron para explicar su resultado y utilidad, conservando la identidad visual existente.
- Se mantuvo la navegación y el tono de marca, sin convertir la página en una copia literal del esquema de referencia.

## Ajustes posteriores

- El símbolo de marca se reemplazó por el logo recibido, preparado con fondo transparente para funcionar sobre superficies claras y oscuras.
- El hero conserva un fallback con gradiente animado debajo del shader WebGPU. Si un navegador de escritorio no puede inicializar WebGPU, el banner mantiene una microanimación visible en lugar de quedar estático.

## Pendientes recomendados

- Añadir ejemplos concretos o casos de uso en el bloque de soluciones.
- Revisar las cinco tarjetas en móvil con usuarios reales para comprobar que el beneficio se entiende sin abrir más contenido.
- Validar que cada servicio conserve su selección al llegar al formulario y que el envío muestre estados de éxito y error.
- Medir el CTA principal, WhatsApp, Telegram, inicio del formulario, servicio seleccionado, envío exitoso y error.
- Revisar SEO técnico final: título, descripción, jerarquía H1–H3, datos estructurados y textos alternativos.
