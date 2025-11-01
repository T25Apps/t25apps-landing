import React, { useState } from 'react'

function Contribution() {
  const [selectedAmount, setSelectedAmount] = useState('')
  const [customAmount, setCustomAmount] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const presetAmounts = [10, 25, 50, 100, 250, 500]

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount.toString())
    setCustomAmount('')
  }

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value)
    setSelectedAmount('')
  }

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const amount = selectedAmount || customAmount
    if (!amount || parseFloat(amount) <= 0) {
      alert('Please select or enter a valid contribution amount')
      return
    }
    // In a real implementation, this would integrate with a payment processor
    // like Stripe, PayPal, etc.
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
      setSelectedAmount('')
      setCustomAmount('')
    }, 5000)
  }

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Support T25Apps
          </h1>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your contributions help us continue developing innovative apps and bringing 
            new ideas to life. Every donation makes a difference!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Select Contribution Amount
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4 mb-6">
              {presetAmounts.map((amount) => (
                <button
                  key={amount}
                  onClick={() => handleAmountSelect(amount)}
                  className={`py-3 px-4 rounded-lg border-2 font-semibold transition-all ${
                    selectedAmount === amount.toString()
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300 text-gray-700 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  ${amount}
                </button>
              ))}
            </div>
            <div>
              <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Or enter custom amount
              </label>
              <input
                type="number"
                id="customAmount"
                value={customAmount}
                onChange={handleCustomAmountChange}
                min="1"
                step="0.01"
                placeholder="Enter amount"
                className="w-full md:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleFormChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Leave us a message..."
              ></textarea>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-900">Contribution Amount:</span>
                <span className="text-2xl font-bold text-blue-600">
                  ${selectedAmount || customAmount || '0.00'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg"
            >
              Continue to Payment
            </button>

            {submitted && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">Thank you for your contribution!</p>
                <p className="text-sm mt-1">
                  In a production environment, you would be redirected to a secure payment processor.
                  Your support helps us continue building great apps!
                </p>
              </div>
            )}
          </form>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Contribute</h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Share our apps with friends and family
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Provide feedback and suggestions
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Follow us on social media
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Rate and review our apps
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contribution

