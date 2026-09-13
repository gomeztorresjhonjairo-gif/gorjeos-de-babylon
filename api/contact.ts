const MAX_NAME_LENGTH = 120
const MAX_EMAIL_LENGTH = 254
const MAX_INTEREST_LENGTH = 80
const MAX_MESSAGE_LENGTH = 4000

function sendJson(response: any, status: number, body: Record<string, unknown>) {
  response.status(status).setHeader('Cache-Control', 'no-store').json(body)
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' })[character] || character)
}

export default async function handler(request: any, response: any) {
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST')
    return sendJson(response, 405, { message: 'Método no permitido.' })
  }

  try {
    const body = typeof request.body === 'string' ? JSON.parse(request.body) : request.body || {}
    const name = String(body.name || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const interest = String(body.interest || '').trim()
    const message = String(body.message || '').trim()
    const website = String(body.website || '').trim()
    const startedAt = Number(body.startedAt)

    // Honeypot and minimum completion time catch the most common automated submissions.
    if (website || !Number.isFinite(startedAt) || Date.now() - startedAt < 1200 || Date.now() - startedAt > 2 * 60 * 60 * 1000) {
      return sendJson(response, 400, { message: 'No pudimos validar la solicitud.' })
    }

    if (!name || name.length > MAX_NAME_LENGTH || !email || email.length > MAX_EMAIL_LENGTH || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !interest || interest.length > MAX_INTEREST_LENGTH || !message || message.length > MAX_MESSAGE_LENGTH || body.consent !== true) {
      return sendJson(response, 400, { message: 'Revisa los campos obligatorios e inténtalo de nuevo.' })
    }

    const apiKey = process.env.RESEND_API_KEY
    const recipient = process.env.CONTACT_TO_EMAIL || 'gorjeosbabylon@gmail.com'
    const sender = process.env.CONTACT_FROM_EMAIL || 'Gorjeos de Babylon <onboarding@resend.dev>'
    if (!apiKey) {
      console.error('Missing RESEND_API_KEY environment variable')
      return sendJson(response, 503, { message: 'El servicio de recepción aún no está configurado.' })
    }

    const safeName = escapeHtml(name)
    const safeEmail = escapeHtml(email)
    const safeInterest = escapeHtml(interest)
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br />')
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: email,
        subject: `Nueva solicitud — ${interest}`,
        text: `Nombre: ${name}\nCorreo: ${email}\nInterés: ${interest}\n\nMensaje:\n${message}`,
        html: `<h2>Nueva solicitud desde Gorjeos de Babylon</h2><p><strong>Nombre:</strong> ${safeName}</p><p><strong>Correo:</strong> ${safeEmail}</p><p><strong>Interés:</strong> ${safeInterest}</p><p><strong>Mensaje:</strong><br />${safeMessage}</p>`,
      }),
    })

    if (!resendResponse.ok) {
      console.error('Resend rejected contact submission', await resendResponse.text())
      return sendJson(response, 502, { message: 'No pudimos entregar tu solicitud. Inténtalo de nuevo.' })
    }

    return sendJson(response, 200, { ok: true })
  } catch (error) {
    console.error('Contact endpoint error', error)
    return sendJson(response, 500, { message: 'Ocurrió un error inesperado.' })
  }
}
