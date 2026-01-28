import React from 'react'
import { Link } from 'react-router-dom'
import apps, { AppIcons } from '../config/apps.config.jsx'
import { APP_STATUS_LABELS, APP_STATUS_COLORS } from '../config/constants'

function Products() {

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
            const statusLabel = APP_STATUS_LABELS[app.status] || app.status
            const statusColors = APP_STATUS_COLORS[app.status] || APP_STATUS_COLORS['in-development']
            const IconComponent = AppIcons[app.icon]
            
            return (
              <Link
                key={app.id}
                to={`/apps/${app.slug}`}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full"
              >
                <div className="absolute top-6 right-6">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                    {statusLabel}
                  </span>
                </div>

                <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl w-fit text-gray-900 dark:text-white group-hover:scale-110 transition-transform duration-300">
                  {IconComponent && <IconComponent />}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {app.shortDescription}
                  </p>
                </div>

                <div className="mt-4 flex items-center text-sm font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Products

