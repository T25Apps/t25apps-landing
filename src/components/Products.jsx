import React from 'react'
import { Link } from 'react-router-dom'

function Products() {
  const apps = [
    {
      id: 1,
      name: 'Calendr',
      description: 'A simple to use calendar app that helps you stay organized and manage your tasks efficiently.',
      category: 'Productivity',
      status: 'Available',
      link: 'https://calendr.t25apps.com', // Update with your actual product URL
    },
    {
      id: 2,
      name: 'Orbit',
      description: 'An innovative study guide for students to help them understand and learn faster.',
      category: 'Education',
      status: 'In Development',
      link: 'https://orbit.t25apps.com', // Update with your actual product URL
    },
    {
      id: 3,
      name: 'RecipeDiary',
      description: 'A beautiful recipe app that helps you preserve and savor your favorite recipes from people you know.',
      category: 'Food',
      status: 'In Development',
      link: 'https://recipediary.t25apps.com', // Update with your actual product URL
    },
    {
      id: 4,
      name: 'MyInvestments',
      description: 'A simple to use investment tracker that helps you track your investments and plan your financial goals.',
      category: 'Finance',
      status: 'In Development',
      link: 'https://myinvestments.t25apps.com', // Update with your actual product URL
    },
  ]

  return (
    <section id="products" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Products
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our collection of innovative apps designed to enhance your digital experience
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {apps.map((app) => {
            const isInDevelopment = app.status === 'In Development'
            const linkUrl = isInDevelopment 
              ? `/in-development/${encodeURIComponent(app.name)}`
              : app.link
            const LinkComponent = isInDevelopment ? Link : 'a'
            const linkProps = isInDevelopment 
              ? { to: linkUrl }
              : { href: linkUrl, target: '_blank', rel: 'noopener noreferrer' }
            
            return (
              <LinkComponent
                key={app.id}
                {...linkProps}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer block"
              >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm font-semibold">{app.category}</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">{app.name}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    app.status === 'Available' ? 'bg-green-100 text-green-800' :
                    app.status === 'In Development' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-4">{app.description}</p>
                <div className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-center">
                  Learn More
                </div>
              </div>
            </LinkComponent>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Products

