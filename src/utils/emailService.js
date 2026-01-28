/**
 * Email Service - calls serverless function to send emails
 * The actual ZeptoMail API call happens server-side to avoid CORS issues
 */

/**
 * Sends contact form email via serverless API endpoint
 * @param {Object} formData - The form data containing name, email, and message
 * @returns {Promise<{success: boolean, message: string}>}
 */
export const sendContactEmail = async (formData) => {
  const { name, email, message } = formData
  
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message })
    })
    
    const data = await response.json()
    
    if (response.ok && data.success) {
      return { 
        success: true, 
        message: data.message || 'Your message has been sent successfully!'
      }
    } else {
      return { 
        success: false, 
        message: data.error || 'Failed to send message. Please try again later.' 
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
