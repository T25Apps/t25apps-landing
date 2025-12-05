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
      link: 'https://calendr.t25apps.com',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      id: 2,
      name: 'Orbit',
      description: 'An innovative study guide for students to help them understand and learn faster.',
      category: 'Education',
      status: 'In Development',
      link: 'https://orbit.t25apps.com',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 3,
      name: 'RecipeDiary',
      description: 'A beautiful recipe app that helps you preserve and savor your favorite recipes from people you know.',
      category: 'Food',
      status: 'In Development',
      link: 'https://recipediary.t25apps.com',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      )
    },
    {
      id: 4,
      name: 'MyInvestments',
      description: 'A simple to use investment tracker that helps you track your investments and plan your financial goals.',
      category: 'Finance',
      status: 'In Development',
      link: 'https://myinvestments.t25apps.com',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
  ]

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            Our Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
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
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
              >
                <div className="absolute top-6 right-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    app.status === 'Available' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' 
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                  }`}>
                    {app.status}
                  </span>
                </div>

                <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl w-fit text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                  {app.icon}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {app.description}
                  </p>
                </div>

                <div className="mt-4 flex items-center text-sm font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
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

