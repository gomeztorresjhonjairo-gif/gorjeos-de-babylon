import { StrictMode, lazy, Suspense, useEffect, useState, type FormEvent } from 'react'
import { createRoot } from 'react-dom/client'
import { ArrowRight, BarChart3, Clock, Code2, Eye, Menu, Moon, Palette, ShieldCheck, Sparkles, Sun, Target, X } from 'lucide-react'
import { Analytics } from '@vercel/analytics/react'
import { track } from '@vercel/analytics'
import { SpeedInsights } from '@vercel/speed-insights/react'
import './index.css'

const largeImage = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=1280&q=85'
const largeImageMobile = 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260516_090133_c157d30b-a99a-4477-bec1-a446149ec3f2.png&w=640&q=72'
const telegramUrl = 'https://t.me/GoBbylon'
const whatsappUrl = 'https://wa.me/34695018080?text=Hello%2C%20I%27d%20like%20to%20learn%20more%20about%20Gorjeos%20de%20Babylon%20services.'

function trackCta(label: string, location: string) { track('cta_click', { label, location, language: 'en' }) }
function trackContact(channel: string, location: string) { track('contact_click', { channel, location, language: 'en' }) }

function useColombiaTime() {
  const [time, setTime] = useState('00:00')
  useEffect(() => {
    const update = () => setTime(new Intl.DateTimeFormat('en-CO', { timeZone: 'America/Bogota', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()))
    update()
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      update()
      interval = window.setInterval(update, 60000)
    }, (60 - new Date().getSeconds()) * 1000)
    return () => {
      window.clearTimeout(timeout)
      if (interval) window.clearInterval(interval)
    }
  }, [])
  return time
}

function RollingButton({ children, href = '#contact', onClick }: { children: string; href?: string; onClick?: () => void }) {
  return <a className="rolling-button group rolling-orange" href={href} onClick={() => { trackCta(children, href); onClick?.() }}><span className="rolling-text"><span>{children}</span><span>{children}</span></span><span className="rolling-arrow"><ArrowRight size={15} strokeWidth={2} /></span></a>
}

function ThemeToggle({ darkMode, onToggle, tabIndex }: { darkMode: boolean; onToggle: () => void; tabIndex?: number }) {
  return <button className="theme-toggle" type="button" onClick={onToggle} tabIndex={tabIndex} aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={darkMode} title={darkMode ? 'Light mode' : 'Dark mode'}>{darkMode ? <Sun size={15} /> : <Moon size={15} />}</button>
}

function BrandLogo({ compact = false }: { compact?: boolean }) {
  return <img className={compact ? 'brand-logo brand-logo-compact' : 'brand-logo'} src={compact ? '/gorjeos-mark-64.webp' : '/gorjeos-mark.webp'} alt="Gorjeos de Babylon" width={compact ? 64 : 256} height={compact ? 67 : 266} decoding="async" />
}

function SectionBadge({ number, children }: { number: string; children: string }) {
  return <div className="section-badge"><span>{number}</span><strong>{children}</strong></div>
}

function SectionTerrainLines() {
  return <div className="section-terrain-lines" aria-hidden="true"><svg viewBox="0 0 1600 900" preserveAspectRatio="none"><path d="M0 690C160 610 220 760 390 660S690 520 830 660s280 120 410 10 220-60 360-150" /><path d="M0 760c170-70 250 60 420-45s300-170 450-30 250 150 390 40 210-120 340-170" /><path d="M0 830c150-60 290 20 430-45s260-95 400-15 270 120 420 40 220-95 350-130" /></svg></div>
}

function WhatsAppIcon() { return <svg viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2.5A13.5 13.5 0 0 0 4.5 23.1L2.7 29.3l6.4-1.7A13.5 13.5 0 1 0 16 2.5Z" /><path fill="none" stroke="#25d366" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.4" d="M11.1 10.7c.4-.8 1.2-.9 1.8-.4l1.5 1.3c.4.4.5.9.2 1.4l-.7 1c.7 1.3 1.8 2.4 3.1 3.1l1-.7c.5-.3 1-.2 1.4.2l1.3 1.5c.5.6.4 1.4-.4 1.8-.7.4-1.6.6-2.5.3-3.6-1.1-6.6-4.1-7.7-7.7-.3-.9-.1-1.8.3-2.5Z" /></svg> }
function TelegramIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.8 3.2 2.7 10.6c-1.3.5-1.3 1.2-.2 1.5l4.9 1.5 1.9 5.8c.2.6.1.8.7.8.5 0 .7-.2 1-.5l2.4-2.3 5 3.7c.9.5 1.5.3 1.7-.8l3.2-15.1c.3-1.4-.5-2-1.8-1.5ZM8.2 13.3l10.8-6.8c.5-.3.9-.1.5.2l-8.8 7.9-.3 3.3-1.7-4.6-3.5-1.1c-.8-.2-.8-.5.2-.9l2.8-1.1Z" /></svg> }

function ShaderFallback() {
  return <div className="shader-fallback" aria-hidden="true"><img className="shader-poster" src="/hero-shader-poster.webp" alt="" decoding="async" fetchPriority="high" /></div>
}

function shouldSkipShader() {
  const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return window.matchMedia('(max-width: 767px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches || Boolean(connection?.saveData)
}

function StaticHeroBackground() {
  return <div className="shader-layer hero-css-background" aria-hidden="true"><ShaderFallback /><div className="hero-wave hero-wave-one" /><div className="hero-wave hero-wave-two" /><div className="terrain-lines"><svg viewBox="0 0 1600 900" preserveAspectRatio="none"><path d="M0 690C160 610 220 760 390 660S690 520 830 660s280 120 410 10 220-60 360-150" /><path d="M0 760c170-70 250 60 420-45s300-170 450-30 250 150 390 40 210-120 340-170" /></svg></div></div>
}

const ShaderBackground = lazy(async () => {
  const { ChromaFlow, FilmGrain, FlutedGlass, Shader, Swirl } = await import('shaders/react')
  return {
    default: () => {
      const canUseWebGpu = typeof navigator !== 'undefined' && 'gpu' in navigator
      const [shaderUnavailable, setShaderUnavailable] = useState(!canUseWebGpu)
      return <div className="shader-layer" aria-hidden="true">{shaderUnavailable ? <ShaderFallback /> : <Shader className="shader-canvas" onReady={() => setShaderUnavailable(false)} onUnavailable={() => setShaderUnavailable(true)}><Swirl colorA="#ffffff" colorB="#f0f0f0" detail={1.7} /><ChromaFlow baseColor="#ffffff" downColor="#ff5f03" leftColor="#ff5f03" rightColor="#ff5f03" upColor="#ff5f03" momentum={13} radius={3.5} /><FlutedGlass aberration={0.61} angle={31} frequency={8} highlight={0.12} highlightSoftness={0} lightAngle={-90} refraction={4} shape="rounded" softness={1} speed={0.15} /><FilmGrain strength={0.05} /></Shader>}<div className="terrain-lines"><svg viewBox="0 0 1600 900" preserveAspectRatio="none"><path d="M0 690C160 610 220 760 390 660S690 520 830 660s280 120 410 10 220-60 360-150" /><path d="M0 760c170-70 250 60 420-45s300-170 450-30 250 150 390 40 210-120 340-170" /></svg></div></div>
    },
  }
})

function DeferredShaderBackground() {
  const skipShader = shouldSkipShader()
  const [shaderEnabled, setShaderEnabled] = useState(false)

  useEffect(() => {
    if (skipShader) return
    const activate = () => setShaderEnabled(true)
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (idleWindow.requestIdleCallback) {
      const idleId = idleWindow.requestIdleCallback(activate, { timeout: 1200 })
      return () => idleWindow.cancelIdleCallback?.(idleId)
    }
    const timeoutId = window.setTimeout(activate, 800)
    return () => window.clearTimeout(timeoutId)
  }, [skipShader])

  if (skipShader || !shaderEnabled) return <StaticHeroBackground />
  return <Suspense fallback={<StaticHeroBackground />}><ShaderBackground /></Suspense>
}

type Service = { eyebrow: string; title: string; interest: string; description: string; image: string; alt: string; Icon: typeof BarChart3 }
const services: Service[] = [
  { eyebrow: 'Acquisition and sales', title: 'Websites + digital funnels', interest: 'Website and digital funnel', description: 'Digital journeys designed to explain your value, attract the right customer and turn interest into a conversation.', image: '/services/websites-embudo.webp', alt: 'Orange steps representing a digital funnel', Icon: BarChart3 },
  { eyebrow: 'Custom operations', title: 'Apps and business software', interest: 'App or business software', description: 'Software adapted to your processes to reduce friction, organize operations and help your team work better.', image: '/services/apps-software.webp', alt: 'Digital modules connected around a central core', Icon: Code2 },
  { eyebrow: 'Protection and trust', title: 'Cybersecurity audit', interest: 'Cybersecurity audit', description: 'We detect vulnerabilities before they become problems and give you a clear map to strengthen your operation.', image: '/services/ciberseguridad.webp', alt: 'Orange technology shield protecting a digital core', Icon: ShieldCheck },
  { eyebrow: 'Experiences that convert', title: 'UX / UI review', interest: 'UX / UI review', description: 'We analyze where users hesitate or leave, then design clearer, more intuitive interfaces built for action.', image: '/services/revision-ux-ui.webp', alt: 'Continuous digital flow around an orange core', Icon: Palette },
  { eyebrow: 'Identity and differentiation', title: 'AI models and characters', interest: 'AI models or characters', description: 'Visual assets, characters and brand worlds made with AI to help you stand out without losing creative direction.', image: '/services/modelos-ia.webp', alt: 'Human figure formed by orange particles and circuits', Icon: Sparkles },
]

function ServiceCard({ service }: { service: Service }) {
  const { Icon } = service
  const compactImage = service.image.replace(/\.webp$/, '-400.webp')
  const selectService = () => {
    const url = new URL(window.location.href)
    url.searchParams.set('servicio', service.interest)
    url.hash = 'contact'
    window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`)
    window.dispatchEvent(new CustomEvent('gorjeos:service-selected', { detail: { interest: service.interest } }))
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    track('service_selected', { service: service.interest, location: 'services', language: 'en' })
  }
  return <article className="additional-service-card"><div className="service-image"><img src={service.image} srcSet={`${compactImage} 400w, ${service.image} 800w`} sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 400px" alt={service.alt} loading="lazy" decoding="async" width="400" height="299" /><div className="service-icon"><Icon size={19} /></div></div><div className="additional-service-copy"><span>{service.eyebrow}</span><h3>{service.title}</h3><p>{service.description}</p><a href="#contact" onClick={selectService}>Start a project <ArrowRight size={15} /></a></div></article>
}

const faqItems = [
  ['How does a project start?', 'We begin by understanding your business, users and goals. Then we define the clearest next step before recommending a solution.'],
  ['Do you work with companies in Colombia and Spain?', 'Yes. Gorjeos de Babylon works across Colombia and Spain and can support remote projects with communication adapted to each team.'],
  ['Can you work on an existing operation or product?', 'Yes. We can review a digital experience, internal operation, application or public-facing product before proposing improvements.'],
  ['What happens after I send my details?', 'We review the information, identify the main challenge and reply with the most useful next step. You do not need to arrive with a finished solution.'],
  ['Can I contact you directly on WhatsApp?', 'Yes. WhatsApp is ideal for a quick conversation, while the form is better when you want to explain your challenge in more detail.'],
]

function EnglishFAQ() {
  return <section className="faq-section" id="faq"><div className="content-container"><SectionBadge number="4">Let’s be clear</SectionBadge><div className="faq-layout"><div><h2>Questions worth answering <em>before we begin.</em></h2><p>If you cannot find the answer you need, tell us about your situation and we will review it with you.</p><a className="faq-contact-link" href="#contact" onClick={() => trackCta('Tell us about your challenge', 'faq')}>Tell us about your challenge <ArrowRight size={15} /></a></div><div className="faq-list">{faqItems.map(([question, answer]) => <details key={question}><summary onClick={() => track('faq_open', { question, language: 'en' })}>{question}<span aria-hidden="true">+</span></summary><div className="faq-answer"><p>{answer}</p></div></details>)}</div></div></div></section>
}

function EnglishContact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [selectedInterest, setSelectedInterest] = useState(() => new URLSearchParams(window.location.search).get('servicio') || '')
  useEffect(() => {
    const handleServiceSelected = (event: Event) => {
      const customEvent = event as CustomEvent<{ interest?: string }>
      if (customEvent.detail?.interest) setSelectedInterest(customEvent.detail.interest)
    }
    window.addEventListener('gorjeos:service-selected', handleServiceSelected)
    return () => window.removeEventListener('gorjeos:service-selected', handleServiceSelected)
  }, [])
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus('submitting')
    const data = new FormData(event.currentTarget); const interest = String(data.get('interest') || '')
    try {
      const response = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: String(data.get('name') || ''), email: String(data.get('email') || ''), interest, message: String(data.get('message') || ''), consent: data.get('consent') === 'on', website: String(data.get('website') || ''), startedAt: Date.now() }) })
      if (!response.ok) throw new Error('request_failed')
      setStatus('success'); track('form_submit_success', { service: interest || 'none', language: 'en' })
    } catch { setStatus('error'); track('form_submit_error', { service: interest || 'none', language: 'en' }) }
  }
  if (status === 'success') return <section className="contact-section" id="contact"><div className="content-container"><div className="contact-success" role="status"><strong>We received your request.</strong><p>Thank you for writing to us. We will review your challenge and reply with the most useful next step.</p></div></div></section>
  return <section className="contact-section" id="contact"><div className="content-container contact-container"><div className="contact-intro"><SectionBadge number="5">Start building</SectionBadge><h2>Your project deserves a response that rises to the occasion. Let’s build something extraordinary.</h2><p>Share your objective and contact details. We will accompany you from the first idea to a digital solution that works.</p><div className="contact-direct"><span>Or contact us directly →</span><a href="mailto:gorjeosbabylon@gmail.com">gorjeosbabylon@gmail.com</a><a href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => trackContact('whatsapp', 'contact_direct')}>WhatsApp · +34 695 018 080</a></div><ul className="contact-reassurance"><li>You do not need to arrive with the solution.</li><li>We keep the service you selected.</li><li>You receive confirmation when your request is sent.</li></ul></div>{selectedInterest && <div className="selected-service-note" role="status"><span>Selected service</span><strong>{selectedInterest}</strong><button type="button" onClick={() => setSelectedInterest('')}>Change</button></div>}<form className="contact-form contact-form-wrap" onSubmit={submit}><label>Name<input required name="name" placeholder="Your name" autoComplete="name" /></label><label>Email<input required type="email" name="email" placeholder="you@email.com" autoComplete="email" /></label><label>What are you interested in?<select required name="interest" value={selectedInterest} onChange={(event) => { setSelectedInterest(event.target.value); track('service_selected', { service: event.target.value, location: 'contact_form', language: 'en' }) }}><option value="" disabled>Select an option</option>{services.map((service) => <option key={service.interest}>{service.interest}</option>)}<option>Just getting to know the company</option></select></label><label>Message<textarea required name="message" rows={4} placeholder="Tell us briefly what you need…" /></label><label className="contact-honeypot" aria-hidden="true">Website<input tabIndex={-1} autoComplete="off" name="website" /></label><label className="consent-field"><input required type="checkbox" name="consent" /><span>I authorize Gorjeos de Babylon to send me information about its services. See the <a href="/privacy.html" target="_blank" rel="noreferrer">privacy policy</a>.</span></label>{status === 'error' && <p className="contact-form-error" role="alert">We could not send your request. Please try again or write to us on WhatsApp.</p>}<button className="form-submit" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? 'Sending…' : 'Send request'} <span><ArrowRight size={15} /></span></button></form></div></section>
}

function App() {
  const colombiaTime = useColombiaTime(); const [menuOpen, setMenuOpen] = useState(false); const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem('gorjeos-theme') === 'dark')
  useEffect(() => { document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'; window.localStorage.setItem('gorjeos-theme', darkMode ? 'dark' : 'light') }, [darkMode])
  const navItems = [['Home', '#home'], ['Services', '#services'], ['About', '#about'], ['FAQ', '#faq'], ['Contact', '#contact']]
  return <><a className="skip-link" href="#services">Skip to main content</a><main className={`axion-page ${darkMode ? 'theme-dark' : ''}`}><section className="hero-section" id="home"><DeferredShaderBackground /><div className="hero-overlay" aria-hidden="true" /><div className="hero-container"><header className="pill-nav"><div className="nav-left"><a href="#home" className="brand-link" aria-label="Gorjeos de Babylon"><BrandLogo compact /></a><nav className="nav-links">{navItems.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav></div><div className="nav-right"><span className="london-time"><Clock size={14} /> {colombiaTime} in Bogotá</span><a className="language-switcher" href="/" onClick={() => window.localStorage.setItem('gorjeos-language-choice', 'es')}>ES</a><ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} /><RollingButton>Start a project</RollingButton></div><button className="mobile-menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} aria-controls="en-mobile-navigation" onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <X size={17} /> : <Menu size={17} />}<span>{menuOpen ? 'Close' : 'Menu'}</span></button></header><div id="en-mobile-navigation" className={`mobile-sheet ${menuOpen ? 'mobile-sheet-open' : ''}`} aria-hidden={!menuOpen}><div className="mobile-sheet-tools"><span className="mobile-time"><Clock size={14} /> {colombiaTime} in Bogotá</span><div className="mobile-sheet-actions"><a className="language-switcher" href="/" onClick={() => window.localStorage.setItem('gorjeos-language-choice', 'es')} tabIndex={menuOpen ? 0 : -1}>ES</a><ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode((value) => !value)} tabIndex={menuOpen ? 0 : -1} /><button className="mobile-sheet-close" type="button" onClick={() => setMenuOpen(false)} aria-label="Close menu" tabIndex={menuOpen ? 0 : -1}><X size={17} /><span>Close</span></button></div></div><nav>{navItems.map(([label, href]) => <a key={label} href={href} onClick={() => setMenuOpen(false)} tabIndex={menuOpen ? 0 : -1}>{label}<ArrowRight size={18} /></a>)}</nav><RollingButton onClick={() => setMenuOpen(false)}>Start a project</RollingButton></div><div className="hero-content"><p className="hero-label">Gorjeos de Babylon · Technology with direction</p><h1>We create, position and evolve your digital presence.</h1><p className="hero-support">Web development, business software, SEO, analytics, cybersecurity and artificial intelligence to turn business challenges into solutions that work.</p><p className="hero-audience">For companies and brands that need to turn a digital challenge into a clear decision.</p><p className="hero-tagline">It is not just about being online. It is about building something that works.</p><div className="hero-cta-row"><RollingButton>Start a project</RollingButton><div className="partner-badge"><span>Colombia + Spain</span><strong>10 years</strong></div></div></div><span className="hero-corner-note">COL / ESP · 10 YEARS OF EXPERIENCE</span></div></section><section className="trust-signals" aria-label="What you can expect from Gorjeos de Babylon"><div className="content-container"><div className="trust-signal"><strong>Direction before technology</strong><span>We prioritize the problem that moves your business.</span></div><div className="trust-signal"><strong>A visible process</strong><span>Understand → design → build → optimize.</span></div><div className="trust-signal"><strong>Contact without friction</strong><span>Form, WhatsApp or Telegram: you choose.</span></div></div></section><section className="projects-section" id="services"><SectionTerrainLines /><div className="content-container"><SectionBadge number="1">Services</SectionBadge><h2>What we can build for <em>your business.</em></h2><div className="additional-services-heading"><span>Digital solutions</span><h3>We choose the technology according to the challenge, not the other way around.</h3><p>From a digital presence that converts to software and security that help you operate better, every service becomes a result you can understand and measure.</p></div><div className="service-offers-grid">{services.map((service) => <ServiceCard key={service.title} service={service} />)}</div><div className="projects-footer"><span>Have another digital challenge?</span><a href="#contact" onClick={() => trackCta('Start a project', 'services_footer')}>Start a project <ArrowRight size={15} /></a></div></div></section><section className="about-section" id="about"><SectionTerrainLines /><div className="content-container"><SectionBadge number="2">About Gorjeos</SectionBadge><h2>We turn complex problems into <em>clear digital solutions.</em></h2><div className="about-desktop-grid"><figure className="about-figure"><img src={largeImage} alt="Strategy and digital technology session" loading="lazy" decoding="async" /><figcaption><strong>Direction with purpose</strong><span>AI is not the future; it is the present your competition still does not understand.<br />We do.</span></figcaption></figure><div className="about-copy"><p>We help companies and brands solve digital challenges with technology, design and strategy. We do not start with the tool; we start by understanding the problem.</p><ul><li>We understand before building.</li><li>We design a concrete path.</li><li>We build to evolve.</li></ul><RollingButton href="#contact">Tell us about your challenge</RollingButton></div></div><div className="mission-vision-heading"><span>Our direction</span><h3>You have a vision and purpose that deserve to exist.</h3></div><div className="mission-vision-grid"><article className="mission-vision-card"><div className="mission-vision-card-face mission-vision-card-front"><div className="mission-vision-top"><div className="mission-vision-icon"><Target size={20} /></div><span>Mission</span></div><h3>Refining intelligent systems that strengthen digital sovereignty through AI, web design and secure application development.</h3></div></article><article className="mission-vision-card"><div className="mission-vision-card-face mission-vision-card-front"><div className="mission-vision-top"><div className="mission-vision-icon"><Eye size={20} /></div><span>Vision</span></div><h3>To become a reference point for technology across Spanish-speaking markets, Europe and the Americas.</h3></div></article></div></div></section><EnglishFAQ /><EnglishContact /><footer className="axion-footer"><div className="footer-brand"><a href="#home" className="brand-link"><BrandLogo /></a><span>Gorjeos de Babylon</span></div><div className="footer-message"><p>We do not just implement AI; we design digital structures that lead.</p><span>Gorjeos de Babylon: The peak of your ambition.</span></div><div className="footer-contact"><a href="#contact" onClick={() => trackCta('Start a project', 'footer')}>Start a project</a><a href="/privacy.html" target="_blank" rel="noreferrer">Privacy policy</a><a className="footer-top-link" href="#home">Back to top ↑</a><small>© 2026 Gorjeos de Babylon</small></div></footer><div className="floating-contact" aria-label="Direct contact"><a className="floating-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Write on WhatsApp" onClick={() => trackContact('whatsapp', 'floating')}><WhatsAppIcon /></a><a className="floating-telegram" href={telegramUrl} target="_blank" rel="noreferrer" aria-label="Write on Telegram" onClick={() => trackContact('telegram', 'floating')}><TelegramIcon /></a></div></main><Analytics /><SpeedInsights /></>
}

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
