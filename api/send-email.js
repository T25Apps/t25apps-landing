/**
 * Serverless API endpoint for sending emails via ZeptoMail
 * Works with Vercel serverless functions
 */

export default async function handler(req, res) {
  // CORS headers - must be set first
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version')

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { name, email, message } = req.body || {}

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Missing required fields: name, email, and message are required' })
    }

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
        <div class="value">${escapeHtml(name)}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
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
          address: email,
          name: name
        }
      ],
      subject: subject,
      htmlbody: htmlBody
    }

    const response = await fetch('https://api.zeptomail.com/v1.1/email', {
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
