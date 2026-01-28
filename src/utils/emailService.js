/**
 * Email Service using Zoho ZeptoMail API
 * 
 * IMPORTANT: For production, move this to a serverless function (Vercel/Netlify)
 * to protect your API credentials. Never expose API tokens in frontend code.
 * 
 * Environment Variables Required:
 * - VITE_ZEPTO_API_TOKEN: Your ZeptoMail API token
 * - VITE_ZEPTO_FROM_EMAIL: Sender email address (verified in ZeptoMail)
 * - VITE_ZEPTO_FROM_NAME: Sender name
 */

const ZEPTO_API_URL = 'https://api.zeptomail.com/v1.1/email'
const TO_EMAIL = 'contact@t25apps.com'

/**
 * Generates subject line in format: General Enquiry_DD_MM_YYYY_HHMMSS
 */
const generateSubjectLine = () => {
  const now = new Date()
  const day = String(now.getDate()).padStart(2, '0')
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const year = now.getFullYear()
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')
  const timestamp = `${hours}${minutes}${seconds}`
  
  return `General Enquiry_${day}_${month}_${year}_${timestamp}`
}

/**
 * Sends contact form email via ZeptoMail API
 * @param {Object} formData - The form data containing name, email, and message
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendContactEmail = async (formData) => {
  const { name, email, message } = formData
  
  const apiToken = import.meta.env.VITE_ZEPTO_API_TOKEN
  const fromEmail = import.meta.env.VITE_ZEPTO_FROM_EMAIL || 'noreply@t25apps.com'
  const fromName = import.meta.env.VITE_ZEPTO_FROM_NAME || 'T25Apps Contact Form'
  
  if (!apiToken) {
    console.error('ZeptoMail API token not configured')
    // Return success for development/demo purposes
    return { 
      success: true, 
      message: 'Message received (email service not configured)' 
    }
  }
  
  const subject = generateSubjectLine()
  
  const emailBody = `
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
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
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
          address: TO_EMAIL,
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
    htmlbody: emailBody
  }
  
  try {
    const response = await fetch(ZEPTO_API_URL, {
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
      return { 
        success: true, 
        message: 'Your message has been sent successfully!',
        data 
      }
    } else {
      const errorData = await response.json()
      console.error('ZeptoMail API error:', errorData)
      return { 
        success: false, 
        message: 'Failed to send message. Please try again later.' 
      }
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return { 
      success: false, 
      message: 'An error occurred. Please try again later.' 
    }
  }
}
