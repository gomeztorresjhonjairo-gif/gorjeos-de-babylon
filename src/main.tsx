import { StrictMode, useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4'

const services = [
  {
    number: '01',
    title: 'Websites que convierten',
    description:
      'Páginas rápidas, memorables y listas para transformar visitas en conversaciones. Ideal para pequeñas empresas que quieren abrir su primer embudo digital.',
    tags: ['Estrategia', 'UX/UI', 'SEO'],
    className: 'service-lime',
  },
  {
    number: '02',
    title: 'Apps para operar mejor',
    description:
      'Herramientas de contabilidad, gestión y operación hechas alrededor de cómo trabaja realmente tu equipo.',
    tags: ['Web apps', 'Automatización', 'Datos'],
    className: 'service-blue',
  },
  {
    number: '03',
    title: 'Ciberseguridad sin ruido',
    description:
      'Auditamos tu superficie digital, priorizamos riesgos y convertimos hallazgos técnicos en decisiones claras.',
    tags: ['Auditoría', 'Riesgo', 'Resiliencia'],
    className: 'service-cream',
  },
  {
    number: '04',
    title: 'Experiencias que fluyen',
    description:
      'Revisamos tu producto digital con ojos de usuario: fricciones, estructura, interfaz y cada pequeño momento que puede mejorar.',
    tags: ['UX research', 'Producto', 'Design systems'],
    className: 'service-pink',
  },
  {
    number: '05',
    title: 'Universos generativos',
    description:
      'Creamos personajes, modelos y mundos visuales con IA para que tu marca tenga una presencia imposible de ignorar.',
    tags: ['IA creativa', 'Personajes', 'Campañas'],
    className: 'service-purple',
  },
]

const navItems = [
  ['Nosotros', '#nosotros'],
  ['Servicios', '#servicios'],
  ['Proceso', '#proceso'],
  ['Contacto', '#contacto'],
]

function ArrowUpRight({ light = false }: { light?: boolean }) {
  return (
    <svg aria-hidden="true" className={`arrow-icon ${light ? 'arrow-light' : ''}`} viewBox="0 0 18 18" fill="none">
      <path d="M4 14 14 4M6 4h8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function LogoMark() {
  return (
    <a className="brand" href="#inicio" aria-label="Gorjeos de Babylon, inicio">
      <span className="brand-mark" aria-hidden="true"><span /><span /><span /><span /></span>
      <span className="brand-copy"><span>Gorjeos</span><span>de Babylon</span></span>
    </a>
  )
}

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.14 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={`reveal ${visible ? 'is-visible' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>{children}</div>
}

function App() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const previousX = useRef<number | null>(null)
  const targetTime = useRef(0)
  const isSeeking = useRef(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [formSent, setFormSent] = useState(false)

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const video = videoRef.current
      if (!video || !Number.isFinite(video.duration) || video.duration <= 0) return
      if (previousX.current === null) {
        previousX.current = event.clientX
        return
      }
      const delta = event.clientX - previousX.current
      previousX.current = event.clientX
      targetTime.current = Math.max(0, Math.min(video.duration, targetTime.current + (delta / window.innerWidth) * 0.8 * video.duration))
      if (!isSeeking.current) {
        isSeeking.current = true
        video.currentTime = targetTime.current
      }
    }
    const handleSeeked = () => {
      const video = videoRef.current
      if (!video) return
      if (Math.abs(video.currentTime - targetTime.current) > 0.01) video.currentTime = targetTime.current
      else isSeeking.current = false
    }
    window.addEventListener('mousemove', handleMouseMove)
    videoRef.current?.addEventListener('seeked', handleSeeked)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      videoRef.current?.removeEventListener('seeked', handleSeeked)
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormSent(true)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <main className="site-shell">
      <section className="hero" id="inicio">
        <video ref={videoRef} className="hero-video" src={VIDEO_SRC} muted playsInline preload="auto" aria-hidden="true" />
        <div className="hero-wash" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <header className="site-header">
          <LogoMark />
          <nav className="desktop-nav" aria-label="Navegación principal">
            {navItems.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <a className="header-cta" href="#contacto">Hablemos <ArrowUpRight light /></a>
          <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuOpen}>
            <span /><span /><span />
          </button>
        </header>

        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
          {navItems.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}<ArrowUpRight light /></a>)}
          <a href="mailto:gorjeosbabylon@gmail.com" onClick={closeMenu}>gorjeosbabylon@gmail.com</a>
        </div>

        <div className="hero-content">
          <Reveal className="hero-kicker"><span className="live-dot" /> COL / ESP — 10 AÑOS HACIENDO QUE LAS IDEAS FUNCIONEN</Reveal>
          <Reveal className="hero-title-wrap" delay={80}>
            <h1>El software también puede <em>tener alma.</em></h1>
          </Reveal>
          <Reveal className="hero-description" delay={160}>
            <p>Diseñamos y construimos soluciones digitales que vuelven más simples las cosas complejas — para empresas, gobierno y quienes están listos para dar el siguiente paso.</p>
            <div className="hero-actions">
              <a className="button button-lime" href="#contacto">Cuéntanos tu idea <ArrowUpRight /></a>
              <a className="text-link" href="#servicios">Ver lo que hacemos <span>↓</span></a>
            </div>
          </Reveal>
        </div>

        <div className="hero-note hero-note-top">01 <span>ESTRATEGIA + DISEÑO + CÓDIGO</span></div>
        <div className="hero-note hero-note-bottom"><span>DESLIZA / EXPLORA</span> ↓</div>
        <div className="hero-orbit" aria-hidden="true">
          <svg viewBox="0 0 220 220" fill="none">
            <circle cx="110" cy="110" r="82" stroke="currentColor" strokeOpacity=".34" />
            <circle cx="110" cy="110" r="48" stroke="currentColor" strokeOpacity=".18" strokeDasharray="2 6" />
            <path d="M110 28c45.287 0 82 36.713 82 82" stroke="#D8FA6B" strokeWidth="2" />
            <circle cx="192" cy="110" r="4" fill="#D8FA6B" />
          </svg>
          <span>GB / 2016—2026</span>
        </div>
      </section>

      <div className="ticker" aria-label="Áreas de trabajo">
        <div className="ticker-track"><span>ESTRATEGIA DIGITAL</span><i>✳</i><span>PRODUCTO</span><i>✳</i><span>DESARROLLO</span><i>✳</i><span>EXPERIENCIAS</span><i>✳</i><span>ESTRATEGIA DIGITAL</span><i>✳</i><span>PRODUCTO</span><i>✳</i><span>DESARROLLO</span><i>✳</i><span>EXPERIENCIAS</span><i>✳</i></div>
      </div>

      <section className="section intro-section" id="nosotros">
        <div className="section-label"><span>02</span><span>Nosotros</span></div>
        <div className="intro-grid">
          <Reveal><p className="display-quote">Tecnología con criterio. Diseño con intención. <span>Resultados que se sienten.</span></p></Reveal>
          <Reveal className="intro-copy" delay={120}>
            <p>Somos una empresa colombiana con alianza en España y una década resolviendo retos digitales con equipos que piensan, preguntan y construyen juntos.</p>
            <p>No llegamos a poner una capa bonita encima. Nos metemos en el problema, encontramos lo esencial y lo convertimos en una experiencia clara, útil y lista para crecer.</p>
            <a className="underlined-link" href="#contacto">Conoce nuestra forma de trabajar <ArrowUpRight /></a>
          </Reveal>
        </div>
        <div className="stat-row">
          <div><strong>10</strong><span>años de experiencia</span></div>
          <div><strong>02</strong><span>mercados conectados</span></div>
          <div><strong>∞</strong><span>formas de hacerlo posible</span></div>
        </div>
      </section>

      <section className="section mission-section">
        <div className="mission-visual" aria-hidden="true"><span className="mission-cross">+</span><span className="mission-word">MISIÓN</span><span className="mission-circle" /></div>
        <Reveal className="mission-copy">
          <div className="section-label light-label"><span>03</span><span>Lo que nos mueve</span></div>
          <h2>Hacer que la tecnología <em>sirva de verdad.</em></h2>
          <p>Impulsamos a empresas, instituciones y equipos públicos con software que aclara, conecta y abre nuevas posibilidades. Porque una buena solución no solo funciona: le devuelve tiempo a la gente.</p>
        </Reveal>
      </section>

      <section className="section services-section" id="servicios">
        <div className="section-heading-row">
          <div className="section-label"><span>04</span><span>Servicios</span></div>
          <Reveal><h2>De la primera conversación <em>a la última línea de código.</em></h2></Reveal>
        </div>
        <div className="services-list">
          {services.map((service, index) => (
            <Reveal key={service.number} className="service-reveal" delay={index * 50}>
              <article className={`service-card ${service.className}`}>
                <span className="service-number">{service.number}</span>
                <div className="service-main"><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
                <span className="service-arrow"><ArrowUpRight /></span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section process-section" id="proceso">
        <div className="section-label light-label"><span>05</span><span>Proceso</span></div>
        <div className="process-heading"><h2>Lo complejo se vuelve claro cuando se <em>trabaja en equipo.</em></h2><p>Un proceso abierto, humano y medible. Cada etapa tiene una razón de ser y un resultado que puedes ver.</p></div>
        <div className="process-line">
          {['Escuchar', 'Enfocar', 'Construir', 'Evolucionar'].map((step, index) => <div className="process-step" key={step}><span>0{index + 1}</span><h3>{step}</h3><p>{['Entendemos el contexto, la oportunidad y a quién queremos ayudar.', 'Convertimos preguntas en una dirección compartida y un plan posible.', 'Diseñamos, desarrollamos y probamos sin perder de vista lo importante.', 'Medimos, aprendemos y hacemos que la solución siga creciendo contigo.'][index]}</p></div>)}
        </div>
      </section>

      <section className="section contact-section" id="contacto">
        <div className="contact-intro"><div className="section-label"><span>06</span><span>Contacto</span></div><Reveal><h2>¿Qué vamos a <em>hacer posible?</em></h2></Reveal><Reveal delay={120}><p>Cuéntanos un poco. No necesitas tenerlo todo resuelto; para eso estamos.</p><div className="direct-contact"><span>También puedes escribirnos directo</span><a href="mailto:gorjeosbabylon@gmail.com">gorjeosbabylon@gmail.com</a><a href="tel:+573212155883">+57 321 215 5883</a></div></Reveal></div>
        <Reveal className="contact-form-wrap" delay={120}>
          {formSent ? <div className="form-success"><span className="success-mark">✓</span><h3>Mensaje recibido.</h3><p>Gracias por abrir la conversación. Te escribiremos pronto desde Gorjeos de Babylon.</p><button className="underlined-link" onClick={() => setFormSent(false)}>Enviar otro mensaje</button></div> : <form className="contact-form" onSubmit={handleSubmit}><label>Tu nombre<input required name="name" placeholder="¿Cómo te llamas?" /></label><label>Tu email<input required type="email" name="email" placeholder="donde@podamos.encontrarte" /></label><label>Cuéntanos sobre el proyecto<textarea required name="message" rows={3} placeholder="Qué quieres construir, mejorar o entender..." /></label><button className="button button-dark" type="submit">Enviar mensaje <ArrowUpRight /></button><small>Al enviar aceptas que usemos tus datos únicamente para responder a esta solicitud.</small></form>}
        </Reveal>
      </section>

      <footer className="site-footer" id="terms">
        <div className="footer-top"><LogoMark /><p>Software con alma<br />desde Colombia para el mundo.</p><a className="footer-mail" href="mailto:gorjeosbabylon@gmail.com">gorjeosbabylon@gmail.com <ArrowUpRight /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Gorjeos de Babylon. Todos los derechos reservados.</span><span>Colombia +57 321 215 5883 · España +34 695 018 080</span><a href="#terms">Términos y condiciones</a></div>
        <p className="terms-copy">Este sitio comunica servicios de diseño, desarrollo y consultoría digital. La información compartida a través del formulario se utiliza únicamente para responder solicitudes comerciales y no se comparte con terceros sin autorización.</p>
      </footer>

      <div className="floating-contact" aria-label="Contacto directo"><a className="float-whatsapp" href="https://wa.me/573212155883" target="_blank" rel="noreferrer" aria-label="Escribir por WhatsApp">wa</a><a className="float-telegram" href="https://t.me/gorjeosbabylon" target="_blank" rel="noreferrer" aria-label="Escribir por Telegram">➤</a></div>
    </main>
  )
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
