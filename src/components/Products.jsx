import React, { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import apps, { AppIcons } from '../config/apps.config.jsx'
import { APP_STATUS_LABELS, APP_STATUS_COLORS } from '../config/constants'

function Products() {
  const [buildingAnimId, setBuildingAnimId] = useState(null)

  const handleBuildingClick = useCallback((appId) => {
    if (buildingAnimId !== null) return // Prevent multiple animations
    setBuildingAnimId(appId)
    setTimeout(() => setBuildingAnimId(null), 2500)
  }, [buildingAnimId])

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
            const isLive = app.status === 'available'
            const isExternal = Boolean(app.href)
            const isAnimating = buildingAnimId === app.id
            const cardClassName = `group relative bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col h-full ${isLive ? '' : 'cursor-pointer'}`
            
            // Live apps with external links
            if (isLive && isExternal) {
              return (
                <a
                  key={app.id}
                  href={app.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cardClassName}
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
                </a>
              )
            }

            // Live apps without external links → navigate to detail page
            if (isLive) {
              return (
                <Link
                  key={app.id}
                  to={`/apps/${app.slug}`}
                  className={cardClassName}
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
            }

            // In-development / non-live apps → show building animation on click
            return (
              <div
                key={app.id}
                onClick={() => handleBuildingClick(app.id)}
                className={cardClassName}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleBuildingClick(app.id) }}
              >
                {/* Status badge */}
                <div className="absolute top-6 right-6 z-10">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors.bg} ${statusColors.text}`}>
                    {statusLabel}
                  </span>
                </div>

                {/* Icon */}
                <div className={`mb-6 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl w-fit text-gray-900 dark:text-white transition-transform duration-300 ${isAnimating ? 'animate-bounce' : 'group-hover:scale-110'}`}>
                  {IconComponent && <IconComponent />}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {app.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-4">
                    {app.shortDescription}
                  </p>
                </div>

                {/* Bottom CTA */}
                <div className="mt-4 flex items-center text-sm font-medium text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform duration-200">
                  Learn more
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Building animation overlay */}
                {isAnimating && (
                  <div className="absolute inset-0 bg-white/90 dark:bg-gray-800/95 rounded-2xl flex flex-col items-center justify-center z-20 animate-fade-in">
                    {/* Construction icon */}
                    <div className="mb-4 relative">
                      <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center animate-pulse">
                        <svg className="w-8 h-8 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                      </div>
                      {/* Spark particles */}
                      <span className="absolute -top-1 -right-1 text-amber-500 animate-spin-slow text-lg">⚙️</span>
                    </div>

                    {/* Text */}
                    <p className="text-lg font-bold text-gray-900 dark:text-white mb-1 animate-pulse">
                      Building This App
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      We're crafting something great. Stay tuned!
                    </p>

                    {/* Progress bar illusion */}
                    <div className="mt-5 w-40 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 rounded-full animate-build-progress" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Products

