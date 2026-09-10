import { StrictMode, useEffect, useState, type FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, Clock, Link2, Menu, Moon, Sun, X } from 'lucide-react'
import { ChromaFlow, FilmGrain, FlutedGlass, Shader, Swirl } from 'shaders/react'
import './index.css'

const smallImage = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090123_74be96d4-9c1b-40cf-932a-96f4f4babed3.png&w=1280&q=85'
const largeImage = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85'

function useColombiaTime() {
  const [time, setTime] = useState('00:00')
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('es-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()))
    update()
    const timer = window.setInterval(update, 1000)
    return () => window.clearInterval(timer)
  }, [])
  return time
}

function RollingButton({ children, dark = true, href = '#contacto' }: { children: string; dark?: boolean; href?: string }) {
  return (
    <a className={`rolling-button group ${dark ? 'rolling-dark' : 'rolling-orange'}`} href={href}>
      <span className="rolling-text"><span>{children}</span><span>{children}</span></span>
      <span className="rolling-arrow"><ArrowRight size={15} strokeWidth={2} /></span>
    </a>
  )
}

function PartnerBadge() {
  return (
    <div className="partner-badge">
      <svg className="partner-star" viewBox="0 0 100 100" aria-hidden="true"><path d="m19.6 66.5 19.7-11 .3-1-.3-.5h-1l-3.3-.2-11.2-.3L14 53l-9.5-.5-2.4-.5L0 49l.2-1.5 2-1.3 2.9.2 6.3.5 9.5.6 6.9.4L38 49.1h1.6l.2-.7-.5-.4-.4-.4L29 41l-10.6-7-5.6-4.1-3-2-1.5-2-.6-4.2 2.7-3 3.7.3.9.2 3.7 2.9 8 6.1L37 36l1.5 1.2.6-.4.1-.3-.7-1.1L33 25l-6-10.4-2.7-4.3-.7-2.6c-.3-1-.4-2-.4-3l3-4.2L28 0l4.2.6L33.8 2l2.6 6 4.1 9.3L47 29.9l2 3.8 1 3.4.3 1h.7v-.5l.5-7.2 1-8.7 1-11.2.3-3.2 1.6-3.8 3-2L61 2.6l2 2.9-.3 1.8-1.1 7.7L59 27.1l-1.5 8.2h.9l1-1.1 4.1-5.4 6.9-8.6 3-3.5L77 13l2.3-1.8h4.3l3.1 4.7-1.4 4.9-4.4 5.6-3.7 4.7-5.3 7.1-3.2 5.7.3.4h.7l12-2.6 6.4-1.1 7.6-1.3 3.5 1.6.4 1.6-1.4 3.4-8.2 2-9.6 2-14.3 3.3-.2.1.2.3 6.4.6 2.8.2h6.8l12.6 1 3.3 2 1.9 2.7-.3 2-5.1 2.6-6.8-1.6-16-3.8-5.4-1.3h-.8v.4l4.6 4.5 8.3 7.5L89 80.1l.5 2.4-1.3 2-1.4-.2-9.2-7-3.6-3-8-6.8h-.5v.7l1.8 2.7 9.8 14.7.5 4.5-.7 1.4-2.6 1-2.7-.6-5.8-8-6-9-4.7-8.2-.5.4-2.9 30.2-1.3 1.5-3 1.2-2.5-2-1.4-3 1.4-6.2 1.6-8 1.3-6.4 1.2-7.9.7-2.6v-.2H49L43 72l-9 12.3-7.2 7.6-1.7.7-3-1.5.3-2.8L24 86l10-12.8 6-7.9 4-4.6-.1-.5h-.3L17.2 77.4l-4.7.6-2-2 .2-3 1-1 8-5.5Z" /></svg>
      <span>Colombia + España</span><strong>10 años</strong>
    </div>
  )
}

function ShaderBackground() {
  return (
    <div className="shader-layer" aria-hidden="true">
      <Shader className="shader-canvas" onUnavailable={() => undefined}>
        <Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} />
        <ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} />
        <FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} />
        <FilmGrain strength={0.05} />
      </Shader>
    </div>
  )
}

function WhatsAppIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .4 5.3.4 11.8c0 2.1.6 4.1 1.6 5.9L.3 24l6.5-1.7a11.8 11.8 0 0 0 5.3 1.3h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.1-1.2-6-3.5-8.3ZM12.1 21.5c-1.7 0-3.4-.5-4.9-1.3l-.4-.2-3.9 1 1-3.8-.3-.4a9.7 9.7 0 0 1-1.5-5.1c0-5.4 4.4-9.8 9.9-9.8 2.6 0 5.1 1 6.9 2.9a9.8 9.8 0 0 1 2.9 7c0 5.4-4.4 9.8-9.7 9.8Zm5.4-7.3c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.8 1.1-.2.2-.3.2-.6.1-1.6-.8-2.7-1.4-3.8-3.2-.3-.5.3-.4.8-1.4.1-.2.1-.4 0-.6-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.7 0 1.6 1.2 3.1 1.4 3.3.2.2 2.4 3.7 5.8 5.1.8.3 1.4.5 1.9.7.8.2 1.5.2 2 .1.6-.1 1.7-.7 1.9-1.3.2-.6.2-1.2.1-1.3 0-.2-.2-.2-.4-.3Z" /></svg>
}

function TelegramIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.8 3.2 2.7 10.6c-1.3.5-1.3 1.2-.2 1.5l4.9 1.5 1.9 5.8c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.5.3 1.7-.8l3.2-15.1c.3-1.4-.5-2-1.8-1.5ZM8.2 13.3l10.8-6.8c.5-.3.9-.1.5.2l-8.8 7.9-.3 3.3-1.7-4.6-3.5-1.1c-.8-.2-.8-.5.2-.9l2.8-1.1Z" /></svg>
}

function ThemeToggle({ darkMode, onToggle }: { darkMode: boolean; onToggle: () => void }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} aria-label={darkMode ? 'Activar modo claro' : 'Activar modo oscuro'} aria-pressed={darkMode} title={darkMode ? 'Modo claro' : 'Modo oscuro'}>{darkMode ? <Sun size={15} /> : <Moon size={15} />}</button>
}

function SectionBadge({ number, children }: { number: string; children: string }) {
  return <div className="section-badge"><span>{number}</span><strong>{children}</strong></div>
}

function ProjectCard({ video, title, description, eyebrow, outcome, dark = false, action }: { video: string; title: string; description: string; eyebrow: string; outcome: string; dark?: boolean; action: string }) {
  return (
    <article className="project-card">
      <div className={`project-media ${dark ? 'media-dark' : ''}`}>
        <video src={video} autoPlay muted loop playsInline className="project-video" />
        <div className="project-overlay"><span>{eyebrow}</span><strong>{outcome}</strong></div>
        <a className={`project-action ${dark ? 'project-action-dark' : ''}`} href="#contacto"><span>{action}</span>{dark ? <ArrowRight size={14} /> : <Link2 size={14} />}</a>
      </div>
      <p>{description}</p><h3>{title}</h3>
    </article>
  )
}

function ContactSection() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent('Solicitud de información — Gorjeos de Babylon')
    const body = encodeURIComponent(`Nombre: ${data.get('name')}\nCorreo: ${data.get('email')}\nInterés: ${data.get('interest')}\nMensaje: ${data.get('message')}\n\nAutorizo el envío de información comercial: sí`)
    setSent(true)
    window.location.href = `mailto:gorjeosbabylon@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section className="contact-section" id="contacto">
      <div className="content-container contact-container">
        <div className="contact-intro"><SectionBadge number="3">Hablemos claro</SectionBadge><h2>¿Quieres recibir información o encontrar una solución?</h2><p>Déjanos tus datos y cuéntanos qué estás buscando. Te responderemos desde Gorjeos de Babylon con información útil, sin ruido.</p><div className="contact-direct"><span>También puedes escribirnos directo</span><a href="mailto:gorjeosbabylon@gmail.com">gorjeosbabylon@gmail.com</a><a href="https://wa.me/573212155883" target="_blank" rel="noreferrer">WhatsApp · +57 321 215 5883</a><a href="tel:+34695018080">España · +34 695 018 080</a></div></div>
        <div className="contact-form-wrap">{sent ? <div className="contact-success"><strong>Gracias por escribirnos.</strong><p>Se abrió tu correo con la información preparada. Si no se abrió automáticamente, puedes escribirnos a <a href="mailto:gorjeosbabylon@gmail.com">gorjeosbabylon@gmail.com</a>.</p></div> : <form className="contact-form" onSubmit={handleSubmit}><label>Nombre<input required name="name" placeholder="Tu nombre" /></label><label>Correo electrónico<input required type="email" name="email" placeholder="tu@correo.com" /></label><label>¿Qué te interesa?<select required name="interest" defaultValue=""><option value="" disabled>Selecciona una opción</option><option>Website y embudo digital</option><option>App o software empresarial</option><option>Auditoría de ciberseguridad</option><option>Revisión UX / UI</option><option>Modelos o personajes con IA</option><option>Solo quiero conocer la empresa</option></select></label><label>Mensaje<textarea required name="message" rows={4} placeholder="Cuéntanos brevemente qué necesitas..." /></label><label className="consent-field"><input required type="checkbox" name="consent" /><span>Autorizo a Gorjeos de Babylon a enviarme información relacionada con sus servicios. Puedo retirar esta autorización cuando quiera.</span></label><button className="form-submit" type="submit">Enviar solicitud <span><ArrowRight size={15} /></span></button></form>}</div>
      </div>
    </section>
  )
}

function App() {
  const colombiaTime = useColombiaTime()
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('gorjeos-theme') === 'dark')
  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    window.localStorage.setItem('gorjeos-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])
  const navItems = [['Inicio', '#inicio'], ['Nosotros', '#estudio'], ['Servicios', '#servicios'], ['Contacto', '#contacto']]

  return (
    <main className={`axion-page ${darkMode ? 'theme-dark' : ''}`}>
      <section className="hero-section" id="inicio">
        <ShaderBackground />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-container">
          <header className="pill-nav">
            <div className="nav-left"><a href="#inicio" className="logo-circle" aria-label="Gorjeos de Babylon">GB</a><nav className="nav-links">{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav></div>
            <div className="nav-right"><span className="london-time"><Clock size={14} /> {colombiaTime} en Bogotá</span><ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} /><RollingButton>Solicitar información</RollingButton></div>
            <button className="mobile-menu-button" type="button" aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenuOpen((open) => !open)}>{menuOpen ? <X size={17} /> : <Menu size={17} />}<span>{menuOpen ? 'Cerrar' : 'Menú'}</span></button>
          </header>

          <div className={`mobile-sheet ${menuOpen ? 'mobile-sheet-open' : ''}`}>
            <div className="mobile-sheet-tools"><span className="mobile-time"><Clock size={14} /> {colombiaTime} en Bogotá</span><ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} /></div>
            <nav>{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={20} /></a>)}</nav>
            <RollingButton dark={false}>Solicitar información</RollingButton>
          </div>

          <div className="hero-content">
            <p className="hero-label">Gorjeos de Babylon</p>
            <h1>Construimos experiencias digitales <br className="desktop-break" />para marcas listas para <br className="desktop-break" />crecer con intención.</h1>
            <div className="hero-cta-row"><RollingButton dark={false}>Solicitar información</RollingButton><PartnerBadge /></div>
          </div>
          <span className="hero-corner-note">COL / ESP · 10 AÑOS DE EXPERIENCIA</span>
        </div>
      </section>

      <section className="about-section" id="estudio">
        <div className="content-container">
          <SectionBadge number="1">Presentamos Gorjeos</SectionBadge>
          <h2>Estrategia, diseño y tecnología para resolver <br className="desktop-break" />lo que otros prefieren llamar <em>complicado.</em></h2>
          <div className="about-desktop-grid">
            <img src={smallImage} alt="Detalle visual de un proyecto digital de Gorjeos de Babylon" />
            <div className="about-copy"><p>Investigamos, pensamos y construimos con equipos que quieren llevar su potencial digital más lejos.</p><RollingButton dark={false} href="#contacto">Conoce nuestro estudio</RollingButton></div>
            <img src={largeImage} alt="Composición visual de una experiencia digital" />
          </div>
          <div className="about-mobile-grid"><p>Investigamos, pensamos y construimos con equipos que quieren llevar su potencial digital más lejos.</p><RollingButton dark={false} href="#contacto">Conoce nuestro estudio</RollingButton><div className="about-images"><img src={smallImage} alt="Detalle visual de un proyecto digital" /><img src={largeImage} alt="Composición visual de una experiencia digital" /></div></div>
          <div className="about-values"><span>Software a medida</span><span>Embudo digital</span><span>UX / UI</span><span>Ciberseguridad</span><span>IA creativa</span></div>
          <div className="mission-vision-grid"><article><span>Misión</span><h3>Crear soluciones digitales que hagan más simples, seguras y valiosas las operaciones de empresas, gobierno y terceros.</h3></article><article><span>Visión</span><h3>Ser un aliado tecnológico confiable entre Colombia y España, reconocido por convertir retos complejos en progreso visible.</h3></article></div>
        </div>
      </section>

      <section className="projects-section" id="servicios">
        <div className="content-container"><SectionBadge number="2">Servicios que sí aterrizan</SectionBadge><h2>Soluciones para que una marca <em>se mueva.</em></h2><div className="project-grid"><ProjectCard video="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_122702_390f5305-8719-41d5-ae80-d23ab3796c28.mp4" eyebrow="Captación y ventas" outcome="Una presencia digital que abre conversaciones." title="Websites + embudo digital" description="Landing pages, contenido y automatizaciones para conseguir clientes con una inversión accesible." action="Solicitar información" /><ProjectCard video="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260516_123323_f909c2b8-ff6c-4edf-882b-8ebcdbe389b5.mp4" eyebrow="Operación a medida" outcome="Herramientas que trabajan como tu equipo." title="Apps y software empresarial" description="Aplicaciones para contabilidad, gestión y operación, pensadas alrededor de los procesos reales de tu empresa." action="Solicitar información" dark /></div><div className="projects-footer"><span>También auditamos seguridad, UX/UI y creamos personajes con IA.</span><a href="#contacto">Cuéntanos qué necesitas <ArrowRight size={15} /></a></div></div>
      </section>

      <ContactSection />
      <footer className="axion-footer" id="pie"><div className="footer-brand"><a href="#inicio" className="logo-circle">GB</a><span>Gorjeos de Babylon</span></div><div className="footer-contact"><a href="mailto:gorjeosbabylon@gmail.com">gorjeosbabylon@gmail.com</a><a href="https://wa.me/573212155883" target="_blank" rel="noreferrer">WhatsApp +57 321 215 5883</a><a href="tel:+34695018080">España +34 695 018 080</a><a href="https://t.me/gorjeosbabylon" target="_blank" rel="noreferrer">Telegram · gorjeosbabylon</a></div><div className="footer-meta"><span>Colombia · España</span><span>© 2026 Gorjeos de Babylon</span><a href="#inicio">Volver arriba ↑</a></div></footer>
      <div className="floating-contact" aria-label="Contacto directo"><a className="floating-whatsapp" href="https://wa.me/573212155883" target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp"><WhatsAppIcon /></a><a className="floating-telegram" href="https://t.me/gorjeosbabylon" target="_blank" rel="noreferrer" aria-label="Escribir por Telegram"><TelegramIcon /></a></div>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)

