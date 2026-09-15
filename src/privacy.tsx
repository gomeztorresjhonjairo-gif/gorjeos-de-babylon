import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import './index.css'

function PrivacyPage() {
  return (
    <main className="privacy-page-shell">
      <header className="privacy-page-header">
        <a className="privacy-page-brand" href="/" aria-label="Volver a Gorjeos de Babylon">
          <img src="/gorjeos-mark.png" alt="" />
          <span>Gorjeos de Babylon</span>
        </a>
        <a className="privacy-page-back" href="/">
          Volver al sitio <ArrowLeft size={15} />
        </a>
      </header>

      <article className="privacy-page-card">
        <span className="privacy-page-kicker">Privacidad</span>
        <h1>Política de tratamiento de datos personales.</h1>
        <p className="privacy-updated">Última actualización: 13 de septiembre de 2026</p>

        <div className="privacy-copy">
          <h3>Responsable del tratamiento</h3>
          <p>Gorjeos de Babylon S.A.S., con operación en Fusagasugá, Colombia, es responsable del tratamiento de los datos personales que recibimos a través de este sitio web.</p>

          <h3>Para qué usamos tus datos</h3>
          <p>Usamos los datos que compartes para responder a tus consultas, entender el reto que nos planteas y enviarte información comercial relacionada con nuestros servicios cuando nos hayas autorizado para ello.</p>

          <h3>Qué datos solicitamos</h3>
          <p>Podemos solicitar tu nombre, correo electrónico, servicio de interés y el mensaje que decidas enviarnos. El formulario también incorpora controles técnicos básicos para prevenir envíos automatizados y abusivos.</p>

          <h3>Proveedores tecnológicos</h3>
          <p>Para operar el sitio y gestionar las solicitudes podemos utilizar Vercel para alojamiento, despliegue, analítica y métricas de rendimiento, y Resend para la entrega del correo electrónico. Estos proveedores reciben únicamente la información necesaria para prestar esos servicios.</p>

          <h3>Tus derechos</h3>
          <p>Puedes solicitar la consulta, actualización, rectificación o eliminación de tus datos, así como retirar tu autorización para recibir información comercial, escribiendo a <a href="mailto:gorjeosbabylon@gmail.com">gorjeosbabylon@gmail.com</a>.</p>

          <h3>Marco aplicable</h3>
          <p>El tratamiento se realiza conforme a la normativa colombiana de protección de datos personales, incluida la Ley 1581 de 2012. Para conocer información general de la autoridad de protección de datos, puedes consultar la <a href="https://www.sic.gov.co/tema/proteccion-de-datos-personales" target="_blank" rel="noreferrer">Superintendencia de Industria y Comercio</a>.</p>
        </div>

        <a className="privacy-back-link" href="/#contacto">
          Volver al formulario <ArrowRight size={15} />
        </a>
      </article>
    </main>
  )
}

createRoot(document.getElementById('privacy-root')!).render(
  <StrictMode>
    <PrivacyPage />
  </StrictMode>,
)
