import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { APP_NAME, SOCIAL_MEDIA, CONTACT_EMAIL } from '../config/constants'
import SEO from '../components/SEO'
import { sendContactEmail } from '../utils/emailService'

function ContactPage() {
  const { theme, toggleTheme } = useTheme()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    
    const result = await sendContactEmail(formData)
    
    setIsSubmitting(false)
    
    if (result.success) {
      setSubmitted(true)
      setFormData({ name: '', email: '', message: '' })
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 dotted-bg">
      <SEO 
        title={`Contact - ${APP_NAME}`}
        description={`Get in touch with ${APP_NAME}. We'd love to hear from you!`}
      />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-stone-200 dark:border-stone-800">
        <div className="flex items-center justify-between px-6 md:px-10 py-3">
          <div className="flex items-center gap-4">
            <Link 
              to="/" 
              className="flex items-center gap-2 text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium hidden sm:inline">Back</span>
            </Link>
            <div className="h-4 w-px bg-stone-300 dark:bg-stone-700"></div>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-stone-900 dark:bg-white flex items-center justify-center">
                <span className="text-white dark:text-stone-900 font-bold text-xs">T</span>
              </div>
              <span className="text-sm font-medium text-stone-900 dark:text-white hidden sm:inline">{APP_NAME}</span>
            </Link>
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12 px-6 md:px-10">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <section className="py-12 md:py-20 text-center animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 dark:text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-2xl mx-auto leading-relaxed">
              Have a question, feedback, or just want to say hello? We'd love to hear from you.
            </p>
          </section>

          <div className="grid md:grid-cols-2 gap-8 animate-fade-in-up delay-100">
            {/* Contact Form */}
            <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 border border-stone-200 dark:border-stone-800 shadow-soft">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-stone-500 dark:text-stone-400">We'll get back to you as soon as possible.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-6 text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-white focus:border-transparent transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full px-4 py-3 bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 dark:focus:ring-white focus:border-transparent transition-all resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  {error && (
                    <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium rounded-xl hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Email */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-soft">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-600 dark:text-stone-300 flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-stone-900 dark:text-white mb-1">Email</h3>
                    <a 
                      href={`mailto:${CONTACT_EMAIL || 'hello@t25apps.com'}`}
                      className="text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white transition-colors"
                    >
                      {CONTACT_EMAIL || 'hello@t25apps.com'}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-6 border border-stone-200 dark:border-stone-800 shadow-soft">
                <h3 className="font-medium text-stone-900 dark:text-white mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  <a 
                    href={SOCIAL_MEDIA.instagram || 'https://instagram.com/t25apps'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a 
                    href={SOCIAL_MEDIA.facebook || 'https://facebook.com/t25apps'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a 
                    href={SOCIAL_MEDIA.threads || 'https://threads.net/t25apps'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.88-.73 2.087-1.146 3.398-1.172 1.163-.024 2.237.172 3.2.583.015-.442.005-.874-.034-1.29-.166-1.766-.9-2.693-2.508-2.762a3.003 3.003 0 0 0-.085-.003c-1.2 0-2.16.584-2.637 1.287l-1.73-1.168c.764-1.127 2.2-1.993 4.258-2.012h.095c1.568.015 2.858.542 3.838 1.57.927.972 1.44 2.324 1.527 4.02.022.428.027.874.015 1.337.54.315 1.02.69 1.435 1.126 1.089 1.145 1.63 2.674 1.564 4.428-.079 2.086-.993 3.958-2.647 5.42C18.14 22.995 15.385 23.98 12.186 24zm-.09-8.399c-.06 0-.12.002-.18.004-.94.04-1.667.35-2.104.903-.39.495-.548 1.126-.473 1.883.122 1.218 1.165 1.96 2.794 1.875 1.182-.063 2.064-.475 2.62-1.226.503-.678.766-1.645.784-2.876-.704-.366-1.53-.563-2.441-.563z"/>
                    </svg>
                  </a>
                  <a 
                    href={SOCIAL_MEDIA.youtube || 'https://youtube.com/@t25apps'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                  <a 
                    href={SOCIAL_MEDIA.twitter || 'https://twitter.com/t25apps'}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-6 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-stone-400 dark:text-stone-600">
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>
          <Link 
            to="/"
            className="text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  )
}

export default ContactPage
