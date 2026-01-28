/**
 * Serverless API endpoint for sending emails via ZeptoMail
 * Works with Vercel serverless functions
 */

// Simple in-memory rate limiting (resets on cold starts)
const rateLimitMap = new Map()
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_REQUESTS_PER_WINDOW = 3 // Max 3 emails per minute per IP

// Allowed origins for CORS
const ALLOWED_ORIGINS = [
  'https://www.t25apps.com',
  'https://t25apps.com',
  'https://t25apps.vercel.app'
]

export default async function handler(req, res) {
  // Get origin and set appropriate CORS headers
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  } else if (process.env.NODE_ENV === 'development' || origin?.includes('localhost')) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Rate limiting by IP
  const clientIP = req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
                   req.headers['x-real-ip'] || 
                   'unknown'
  const now = Date.now()
  const rateKey = `rate_${clientIP}`
  const rateData = rateLimitMap.get(rateKey) || { count: 0, resetTime: now + RATE_LIMIT_WINDOW }
  
  if (now > rateData.resetTime) {
    rateData.count = 0
    rateData.resetTime = now + RATE_LIMIT_WINDOW
  }
  
  if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({ 
      success: false, 
      error: 'Too many requests. Please wait a minute before trying again.' 
    })
  }
  
  rateData.count++
  rateLimitMap.set(rateKey, rateData)

  try {
    const { name, email, message } = req.body || {}

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields: name, email, and message are required' })
    }

    // Validate input lengths
    if (name.length > 100) {
      return res.status(400).json({ success: false, error: 'Name is too long (max 100 characters)' })
    }
    if (email.length > 254) {
      return res.status(400).json({ success: false, error: 'Email is too long' })
    }
    if (message.length > 5000) {
      return res.status(400).json({ success: false, error: 'Message is too long (max 5000 characters)' })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: 'Please enter a valid email address' })
    }

    // Check for potential email header injection
    if (/[\r\n]/.test(name) || /[\r\n]/.test(email)) {
      return res.status(400).json({ success: false, error: 'Invalid characters in input' })
    }

    // Sanitize inputs (trim whitespace)
    const sanitizedName = name.trim().slice(0, 100)
    const sanitizedEmail = email.trim().toLowerCase().slice(0, 254)
    const sanitizedMessage = message.trim().slice(0, 5000)

    // Get credentials from environment
    const apiToken = process.env.ZEPTO_API_TOKEN
    const fromEmail = process.env.ZEPTO_FROM_EMAIL || 'noreply@t25apps.com'
    const fromName = process.env.ZEPTO_FROM_NAME || 'T25Apps Contact Form'
    const toEmail = 'contact@t25apps.com'

    if (!apiToken) {
      console.error('ZEPTO_API_TOKEN not configured')
      return res.status(500).json({ success: false, error: 'Email service not configured. Please contact support.' })
    }

    // Generate subject line: General Enquiry_DD_MM_YYYY_HHMMSS
    const now = new Date()
    const day = String(now.getDate()).padStart(2, '0')
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const year = now.getFullYear()
    const hours = String(now.getHours()).padStart(2, '0')
    const minutes = String(now.getMinutes()).padStart(2, '0')
    const seconds = String(now.getSeconds()).padStart(2, '0')
    const subject = `General Enquiry_${day}_${month}_${year}_${hours}${minutes}${seconds}`

    // HTML email template
    const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #1c1917; color: white; padding: 20px; border-radius: 8px 8px 0 0; }
    .content { background: #f5f5f4; padding: 20px; border-radius: 0 0 8px 8px; }
    .field { margin-bottom: 16px; }
    .label { font-weight: bold; color: #57534e; font-size: 12px; text-transform: uppercase; }
    .value { margin-top: 4px; }
    .message-box { background: white; padding: 16px; border-radius: 8px; border: 1px solid #e7e5e4; }
    .footer { margin-top: 20px; font-size: 12px; color: #a8a29e; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2 style="margin: 0;">New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">From</div>
        <div class="value">${escapeHtml(sanitizedName)}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(sanitizedEmail)}">${escapeHtml(sanitizedEmail)}</a></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(sanitizedMessage).replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      This email was sent from the T25Apps contact form.
    </div>
  </div>
</body>
</html>
`

    const payload = {
      from: {
        address: fromEmail,
        name: fromName
      },
      to: [
        {
          email_address: {
            address: toEmail,
            name: 'T25Apps Team'
          }
        }
      ],
      reply_to: [
        {
          address: sanitizedEmail,
          name: sanitizedName
        }
      ],
      subject: subject,
      htmlbody: htmlBody
    }

    const response = await fetch('https://api.zeptomail.in/v1.1/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Zoho-enczapikey ${apiToken}`
      },
      body: JSON.stringify(payload)
    })

    if (response.ok) {
      const data = await response.json()
      return res.status(200).json({ 
        success: true, 
        message: 'Your message has been sent successfully!' 
      })
    } else {
      const errorData = await response.json()
      console.error('ZeptoMail API error:', errorData)
      return res.status(500).json({ 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      })
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'An error occurred. Please try again later.' 
    })
  }
}

// Helper to escape HTML
function escapeHtml(text) {
  if (!text) return ''
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return String(text).replace(/[&<>"']/g, m => map[m])
}
