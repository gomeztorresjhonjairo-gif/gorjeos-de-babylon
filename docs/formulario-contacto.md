# Formulario de contacto

El formulario usa el endpoint `POST /api/contact` y entrega los mensajes mediante Resend.

En Vercel, dentro de las variables de entorno del proyecto, hay que añadir:

- `RESEND_API_KEY`: clave secreta de Resend.
- `CONTACT_TO_EMAIL`: bandeja que recibirá las solicitudes.
- `CONTACT_FROM_EMAIL`: remitente autorizado en Resend. Para producción conviene usar un correo del dominio verificado.

El endpoint valida los campos, el consentimiento, un campo trampa invisible, el tiempo mínimo de interacción y la longitud máxima de los datos. La clave nunca debe guardarse en el repositorio ni en el código del navegador.
