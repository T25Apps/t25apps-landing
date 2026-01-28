import React, { useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { getAppBySlug, AppIcons, apps } from '../config/apps.config.jsx'
import { useTheme } from '../context/ThemeContext'
import { APP_NAME } from '../config/constants'
import SEO from '../components/SEO'
import { generateAppMeta, getAppSchema } from '../config/seo.config'

function AppDetail() {
  const { slug } = useParams()
  const app = getAppBySlug(slug)
  const { theme, toggleTheme } = useTheme()
  const [activeScreenshot, setActiveScreenshot] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // If app not found, redirect to home
  if (!app) {
    return <Navigate to="/" replace />
  }

  const IconComponent = AppIcons[app.icon]

  // Generate SEO metadata
  const appMeta = generateAppMeta(app)
  const structuredData = getAppSchema(app)

  const statusColors = {
    available: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', dot: 'bg-green-500' },
    'in-development': { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-500' },
    'coming-soon': { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', dot: 'bg-blue-500' }
  }

  const statusLabels = {
    available: 'Available Now',
    'in-development': 'In Development',
    'coming-soon': 'Coming Soon'
  }

  // Placeholder screenshots - replace with actual app.screenshots when available
  const screenshots = app.screenshots || [
    { id: 1, placeholder: true },
    { id: 2, placeholder: true },
    { id: 3, placeholder: true },
    { id: 4, placeholder: true },
    { id: 5, placeholder: true }
  ]

  // Get other apps for recommendations
  const otherApps = apps.filter(a => a.id !== app.id).slice(0, 3)

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-950 dotted-bg">
      <SEO
        title={appMeta.title}
        description={appMeta.description}
        keywords={appMeta.keywords.split(', ')}
        url={`/apps/${app.slug}`}
        image={appMeta.openGraph?.images?.[0]?.url}
        structuredData={structuredData}
      />

      {/* Fixed Header */}
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

          <div className="flex items-center gap-3">
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
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-12">
        {/* Hero Section */}
        <section className="px-6 md:px-10 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
              {/* Left: App Info */}
              <div className="flex-1 animate-fade-in-up">
                {/* Icon and Title */}
                <div className="flex items-start gap-5 mb-6">
                  <div 
                    className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center shadow-soft-xl flex-shrink-0"
                    style={{ backgroundColor: app.primaryColor }}
                  >
                    <div className="text-white scale-150">
                      {IconComponent && <IconComponent />}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h1 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white">
                        {app.name}
                      </h1>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status].bg} ${statusColors[app.status].text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusColors[app.status].dot} ${app.status === 'in-development' ? 'status-pulse' : ''}`}></span>
                        {statusLabels[app.status]}
                      </span>
                    </div>
                    <p className="text-lg text-stone-500 dark:text-stone-400">{app.tagline}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed mb-8">
                  {app.fullDescription}
                </p>

                {/* Platform Tags */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {app.platforms.map((platform) => (
                    <span 
                      key={platform}
                      className="px-4 py-2 bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 rounded-full text-sm font-medium border border-stone-200 dark:border-stone-700"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 items-center">
                  {app.status === 'available' ? (
                    <>
                      {app.website && (
                        <a
                          href={app.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium rounded-xl hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors shadow-lg"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                          </svg>
                          Launch Web App
                        </a>
                      )}
                      {/* App Store Badge */}
                      <a
                        href={app.appStore || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block transition-opacity ${app.appStore ? 'hover:opacity-80' : 'opacity-40 cursor-not-allowed'}`}
                        onClick={e => !app.appStore && e.preventDefault()}
                      >
                        <img 
                          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                          alt="Download on the App Store"
                          className="h-[44px]"
                        />
                      </a>
                      {/* Play Store Badge */}
                      <a
                        href={app.playStore || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-block transition-opacity ${app.playStore ? 'hover:opacity-80' : 'opacity-40 cursor-not-allowed'}`}
                        onClick={e => !app.playStore && e.preventDefault()}
                      >
                        <img 
                          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                          alt="Get it on Google Play"
                          className="h-[66px] -my-[11px]"
                        />
                      </a>
                    </>
                  ) : (
                    <>
                      <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-medium rounded-xl">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Coming Soon
                      </div>
                      {/* App Store Placeholder */}
                      <div className="inline-block opacity-40 cursor-not-allowed">
                        <img 
                          src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                          alt="Download on the App Store"
                          className="h-[44px]"
                        />
                      </div>
                      {/* Play Store Placeholder */}
                      <div className="inline-block opacity-40 cursor-not-allowed">
                        <img 
                          src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png"
                          alt="Get it on Google Play"
                          className="h-[66px] -my-[11px]"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Right: Demo Video Placeholder */}
              <div className="w-full lg:w-[45%] animate-fade-in-up delay-200">
                <div 
                  className="relative aspect-video bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-900 rounded-2xl overflow-hidden shadow-soft-xl cursor-pointer group"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  {/* Demo Video Placeholder */}
                  {app.demoVideo ? (
                    <video 
                      src={app.demoVideo}
                      className="w-full h-full object-cover"
                      controls={isVideoPlaying}
                      poster={app.demoPoster}
                    />
                  ) : (
                    <>
                      {/* Placeholder UI */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div 
                          className="w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
                          style={{ backgroundColor: app.primaryColor }}
                        >
                          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </div>
                        <p className="text-stone-500 dark:text-stone-400 text-sm font-medium">Watch Demo</p>
                        <p className="text-stone-400 dark:text-stone-500 text-xs mt-1">Video coming soon</p>
                      </div>
                      {/* Decorative Elements */}
                      <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-red-400 opacity-60"></div>
                      <div className="absolute top-4 left-10 w-3 h-3 rounded-full bg-yellow-400 opacity-60"></div>
                      <div className="absolute top-4 left-16 w-3 h-3 rounded-full bg-green-400 opacity-60"></div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Screenshots Gallery */}
        <section className="px-6 md:px-10 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white mb-8">
              Screenshots
            </h2>
            
            {/* Main Screenshot Display */}
            <div className="mb-6">
              <div className="relative aspect-[16/10] bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-800 dark:to-stone-900 rounded-2xl overflow-hidden shadow-soft-xl">
                {screenshots[activeScreenshot]?.url ? (
                  <img 
                    src={screenshots[activeScreenshot].url}
                    alt={`${app.name} screenshot ${activeScreenshot + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-stone-300 dark:bg-stone-700 flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-stone-400 dark:text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-stone-400 dark:text-stone-500 text-sm">Screenshot placeholder</p>
                    <p className="text-stone-400 dark:text-stone-600 text-xs mt-1">Image {activeScreenshot + 1} of {screenshots.length}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {screenshots.map((screenshot, index) => (
                <button
                  key={screenshot.id || index}
                  onClick={() => setActiveScreenshot(index)}
                  className={`flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden transition-all ${
                    activeScreenshot === index 
                      ? 'ring-2 ring-stone-900 dark:ring-white ring-offset-2 ring-offset-stone-50 dark:ring-offset-stone-950' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  {screenshot.url ? (
                    <img 
                      src={screenshot.url}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800 flex items-center justify-center">
                      <span className="text-xs text-stone-400 dark:text-stone-500">{index + 1}</span>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* More Apps */}
        {otherApps.length > 0 && (
          <section className="px-6 md:px-10 py-12">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-stone-900 dark:text-white">
                  More Apps
                </h2>
                <Link 
                  to="/"
                  className="text-sm text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors link-underline"
                >
                  View all
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {otherApps.map((otherApp) => {
                  const OtherIcon = AppIcons[otherApp.icon]
                  return (
                    <Link
                      key={otherApp.id}
                      to={`/apps/${otherApp.slug}`}
                      className="app-card group flex items-start gap-4 p-5 bg-white dark:bg-stone-900 rounded-xl border border-stone-200 dark:border-stone-800"
                    >
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                        style={{ backgroundColor: otherApp.primaryColor }}
                      >
                        <div className="text-white">
                          {OtherIcon && <OtherIcon />}
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-stone-900 dark:text-white mb-1">
                          {otherApp.name}
                        </h3>
                        <p className="text-sm text-stone-500 dark:text-stone-400 line-clamp-1">
                          {otherApp.tagline}
                        </p>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="px-6 md:px-10 py-6 border-t border-stone-200 dark:border-stone-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
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

export default AppDetail

