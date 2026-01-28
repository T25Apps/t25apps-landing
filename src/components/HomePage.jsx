import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { apps, AppIcons } from '../config/apps.config.jsx'
import { APP_NAME, SOCIAL_MEDIA, CONTACT_EMAIL } from '../config/constants'
import SEO from './SEO'
import logoLight from '../assets/logo_light.png'
import logoDark from '../assets/logo_dark.png'
import { sendContactEmail } from '../utils/emailService'

// Placeholder tiles for future projects
const futureTiles = [
  { id: 'future-1', name: 'Coming Soon', tagline: 'New app in progress', status: 'coming-soon', primaryColor: '#6B7280' },
  { id: 'future-2', name: 'Coming Soon', tagline: 'Stay tuned', status: 'coming-soon', primaryColor: '#9CA3AF' },
  { id: 'future-3', name: 'Coming Soon', tagline: 'Something exciting', status: 'coming-soon', primaryColor: '#D1D5DB' },
  { id: 'future-4', name: 'Coming Soon', tagline: 'More to come', status: 'coming-soon', primaryColor: '#E5E7EB' },
]

function HomePage() {
  const { theme, toggleTheme } = useTheme()
  const [hoveredApp, setHoveredApp] = useState(null)
  const [activePopup, setActivePopup] = useState(null) // 'about' | 'contact' | null
  const containerRef = useRef(null)
  const aboutLinkRef = useRef(null)
  const contactLinkRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [linkPositions, setLinkPositions] = useState({ about: null, contact: null })
  
  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(null)

  const statusColors = {
    available: 'bg-green-500',
    'in-development': 'bg-amber-500',
    'coming-soon': 'bg-stone-400'
  }

  const statusLabels = {
    available: 'LIVE',
    'in-development': 'BUILDING',
    'coming-soon': 'SOON'
  }

  // Tile size multipliers based on status
  const tileSizeMultipliers = {
    available: 1.15,
    'in-development': 1.0,
    'coming-soon': 0.75
  }

  // Calculate positions for radial layout
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        })
      }
      // Update link positions for dotted lines
      if (aboutLinkRef.current && contactLinkRef.current) {
        const aboutRect = aboutLinkRef.current.getBoundingClientRect()
        const contactRect = contactLinkRef.current.getBoundingClientRect()
        setLinkPositions({
          about: { x: aboutRect.left + aboutRect.width / 2, y: aboutRect.top },
          contact: { x: contactRect.left + contactRect.width / 2, y: contactRect.top }
        })
      }
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  // Contact form handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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

  const closePopup = () => {
    setActivePopup(null)
    setSubmitted(false)
    setError(null)
  }

  // Combine real apps with future placeholders
  const allTiles = [...apps, ...futureTiles]

  // Calculate tile positions in a radial pattern with random distances
  const getAppPositions = () => {
    const positions = []
    const numApps = allTiles.length
    const isMobile = dimensions.width < 640
    const isTablet = dimensions.width >= 640 && dimensions.width < 1024
    
    // Base radius based on screen size
    let baseRadius
    if (isMobile) {
      baseRadius = Math.min(dimensions.width * 0.35, dimensions.height * 0.28)
    } else if (isTablet) {
      baseRadius = Math.min(dimensions.width * 0.32, dimensions.height * 0.30)
    } else {
      baseRadius = Math.min(dimensions.width * 0.28, dimensions.height * 0.32)
    }
    
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    
    // Start from top and distribute evenly
    const startAngle = -Math.PI / 2
    
    // Predefined random-looking distance variations for each position
    // Index 2 is the right-side tile, give it more distance
    const distanceVariations = [0.95, 1.08, 1.25, 1.12, 1.0, 0.92, 1.18, 0.88]
    
    for (let i = 0; i < numApps; i++) {
      const angle = startAngle + (2 * Math.PI * i) / numApps
      // Apply semi-random distance variation
      const radiusVariation = baseRadius * distanceVariations[i % distanceVariations.length]
      positions.push({
        x: centerX + radiusVariation * Math.cos(angle),
        y: centerY + radiusVariation * Math.sin(angle),
        angle: angle
      })
    }
    return positions
  }

  const appPositions = getAppPositions()
  const centerX = dimensions.width / 2
  const centerY = dimensions.height / 2

  // Responsive sizing
  const isMobile = dimensions.width < 640
  const isTablet = dimensions.width >= 640 && dimensions.width < 1024

  // Get tile size based on status and screen size
  const getTileWidth = (status) => {
    const baseSize = isMobile ? 90 : isTablet ? 120 : 160
    return baseSize * (tileSizeMultipliers[status] || 1)
  }

  return (
    <div className="h-screen-safe flex flex-col bg-stone-50 dark:bg-stone-950 dotted-bg overflow-hidden">
      <SEO 
        title="T25Apps - Innovative Apps for Modern Problems"
        description="We craft beautiful, high-performance applications designed to solve real-world challenges. Simple, powerful, and built for you."
      />
      
      {/* Blur overlay when popup is active */}
      {activePopup && (
        <div 
          className="fixed inset-0 z-40 bg-stone-900/20 dark:bg-stone-950/40 backdrop-blur-sm transition-all duration-300"
          onClick={closePopup}
        />
      )}
      
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-4 md:px-10 py-3 animate-fade-in transition-all duration-300 ${activePopup ? 'blur-sm pointer-events-none' : ''}`}>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <svg className="w-4 h-4 md:w-5 md:h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 md:w-5 md:h-5 text-stone-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Main Content - Radial Layout */}
      <main 
        ref={containerRef}
        className={`flex-1 relative overflow-hidden transition-all duration-300 ${activePopup ? 'blur-sm pointer-events-none' : ''}`}
      >
        {dimensions.width > 0 && (
          <>
            {/* SVG Connecting Lines */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0"
              style={{ overflow: 'visible' }}
            >
              {appPositions.map((pos, index) => {
                const tile = allTiles[index]
                const isHovered = hoveredApp === tile.id
                const isFuture = tile.id?.toString().startsWith('future')
                return (
                  <g key={`line-${index}`}>
                    {/* Dotted connecting line */}
                    <line
                      x1={centerX}
                      y1={centerY}
                      x2={pos.x}
                      y2={pos.y}
                      stroke={theme === 'dark' ? 'rgba(168, 162, 158, 0.4)' : 'rgba(120, 113, 108, 0.35)'}
                      strokeWidth={isMobile ? "1" : "1.5"}
                      strokeDasharray={isMobile ? "4,4" : "6,6"}
                      className="transition-all duration-300"
                      style={{
                        strokeOpacity: isHovered ? 0.9 : (isFuture ? 0.3 : 0.5)
                      }}
                    />
                  </g>
                )
              })}
            </svg>

            {/* Center Hub - Logo */}
            <div 
              className="absolute z-20 transform -translate-x-1/2 -translate-y-1/2 animate-fade-in"
              style={{ left: centerX, top: centerY }}
            >
              <div className="bg-white dark:bg-stone-900 rounded-xl md:rounded-2xl px-4 py-3 md:px-6 md:py-4 shadow-soft-xl border border-stone-200 dark:border-stone-800">
                <img 
                  src={theme === 'dark' ? logoDark : logoLight} 
                  alt={APP_NAME}
                  className="h-6 md:h-10 lg:h-12 w-auto"
                />
              </div>
            </div>

            {/* App Tiles - Floating around center */}
            {allTiles.map((tile, index) => {
              const IconComponent = tile.icon ? AppIcons[tile.icon] : null
              const pos = appPositions[index]
              const isHovered = hoveredApp === tile.id
              const isFuture = tile.id?.toString().startsWith('future')
              const tileWidth = getTileWidth(tile.status)
              const sizeMultiplier = tileSizeMultipliers[tile.status] || 1
              
              // Font sizes based on screen and tile size
              const nameFontSize = isMobile ? '10px' : isTablet ? '12px' : '14px'
              const taglineFontSize = isMobile ? '8px' : isTablet ? '10px' : '12px'
              const statusFontSize = isMobile ? '6px' : isTablet ? '7px' : '9px'
              const iconSize = isMobile ? 28 * sizeMultiplier : isTablet ? 36 * sizeMultiplier : 48 * sizeMultiplier
              
              const TileWrapper = isFuture ? 'div' : Link
              const tileProps = isFuture 
                ? { className: 'cursor-default' }
                : { to: `/apps/${tile.slug}` }
              
              return (
                <TileWrapper
                  key={tile.id}
                  {...tileProps}
                  className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 ${isFuture ? 'cursor-default' : ''}`}
                  style={{ 
                    left: pos.x, 
                    top: pos.y,
                    width: tileWidth,
                    animation: `float ${3 + (index % 4) * 0.7}s ease-in-out infinite`,
                    animationDelay: `${index * 0.4}s`
                  }}
                  onMouseEnter={() => setHoveredApp(tile.id)}
                  onMouseLeave={() => setHoveredApp(null)}
                >
                  <div 
                    className={`
                      bg-white dark:bg-stone-900 rounded-xl md:rounded-2xl p-2 md:p-3 lg:p-4
                      shadow-soft border border-stone-200 dark:border-stone-800 
                      transition-all duration-300
                      ${isHovered && !isFuture ? 'scale-110 shadow-soft-xl border-stone-300 dark:border-stone-600' : ''}
                      ${isFuture ? 'opacity-50' : ''}
                    `}
                  >
                    {/* Status Badge */}
                    <div className="flex justify-end mb-1 md:mb-2">
                      <div className="flex items-center gap-0.5 md:gap-1">
                        <span className={`w-1 h-1 md:w-1.5 md:h-1.5 rounded-full ${statusColors[tile.status]} ${tile.status === 'in-development' ? 'status-pulse' : ''}`}></span>
                        <span 
                          className="font-semibold text-stone-400 dark:text-stone-500 tracking-wider"
                          style={{ fontSize: statusFontSize }}
                        >
                          {statusLabels[tile.status]}
                        </span>
                      </div>
                    </div>

                    {/* App Icon */}
                    <div 
                      className={`rounded-lg md:rounded-xl flex items-center justify-center mb-1 md:mb-2 transition-transform duration-300 ${isHovered && !isFuture ? 'scale-110' : ''}`}
                      style={{ 
                        backgroundColor: tile.primaryColor,
                        width: iconSize,
                        height: iconSize
                      }}
                    >
                      {IconComponent ? (
                        <div className="text-white" style={{ transform: `scale(${isMobile ? 0.7 : isTablet ? 0.85 : 1})` }}>
                          <IconComponent />
                        </div>
                      ) : (
                        <svg className="text-white opacity-50" style={{ width: iconSize * 0.5, height: iconSize * 0.5 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                      )}
                    </div>

                    {/* App Name & Tagline */}
                    <h3 
                      className="font-semibold text-stone-900 dark:text-white leading-tight"
                      style={{ fontSize: nameFontSize }}
                    >
                      {tile.name}
                    </h3>
                    <p 
                      className="text-stone-500 dark:text-stone-400 leading-snug line-clamp-2 mt-0.5"
                      style={{ fontSize: taglineFontSize }}
                    >
                      {tile.tagline}
                    </p>
                  </div>
                </TileWrapper>
              )
            })}
          </>
        )}
      </main>

      {/* Footer Bar */}
      <footer className="fixed bottom-0 left-0 right-0 z-50 px-4 md:px-10 py-2 md:py-3 animate-fade-in delay-300">
        <div className="flex items-center justify-between gap-2">
          {/* Left - Links */}
          <nav className="flex items-center gap-3 md:gap-6 text-xs md:text-sm">
            <button 
              ref={aboutLinkRef}
              onClick={() => setActivePopup('about')}
              className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
            >
              About
            </button>
            <button 
              ref={contactLinkRef}
              onClick={() => setActivePopup('contact')}
              className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
            >
              Contact
            </button>
          </nav>

          {/* Center - Copyright */}
          <p className="text-[10px] md:text-xs text-stone-400 dark:text-stone-600 hidden sm:block">
            © {new Date().getFullYear()} {APP_NAME}
          </p>

          {/* Right - Social Links */}
          <div className="flex items-center gap-2 md:gap-4">
            <a 
              href={SOCIAL_MEDIA.instagram || 'https://instagram.com/t25apps'}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-900 dark:text-stone-500 dark:hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a 
              href={SOCIAL_MEDIA.facebook || 'https://facebook.com/t25apps'}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-900 dark:text-stone-500 dark:hover:text-white transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a 
              href={SOCIAL_MEDIA.threads || 'https://threads.net/t25apps'}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-900 dark:text-stone-500 dark:hover:text-white transition-colors"
              aria-label="Threads"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.88-.73 2.087-1.146 3.398-1.172 1.163-.024 2.237.172 3.2.583.015-.442.005-.874-.034-1.29-.166-1.766-.9-2.693-2.508-2.762a3.003 3.003 0 0 0-.085-.003c-1.2 0-2.16.584-2.637 1.287l-1.73-1.168c.764-1.127 2.2-1.993 4.258-2.012h.095c1.568.015 2.858.542 3.838 1.57.927.972 1.44 2.324 1.527 4.02.022.428.027.874.015 1.337.54.315 1.02.69 1.435 1.126 1.089 1.145 1.63 2.674 1.564 4.428-.079 2.086-.993 3.958-2.647 5.42C18.14 22.995 15.385 23.98 12.186 24zm-.09-8.399c-.06 0-.12.002-.18.004-.94.04-1.667.35-2.104.903-.39.495-.548 1.126-.473 1.883.122 1.218 1.165 1.96 2.794 1.875 1.182-.063 2.064-.475 2.62-1.226.503-.678.766-1.645.784-2.876-.704-.366-1.53-.563-2.441-.563z"/>
              </svg>
            </a>
            <a 
              href={SOCIAL_MEDIA.youtube || 'https://youtube.com/@t25apps'}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-900 dark:text-stone-500 dark:hover:text-white transition-colors"
              aria-label="YouTube"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a 
              href={SOCIAL_MEDIA.twitter || 'https://twitter.com/t25apps'}
              target="_blank" 
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-stone-900 dark:text-stone-500 dark:hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>

      {/* About Popup Tile */}
      {activePopup === 'about' && linkPositions.about && (
        <>
          {/* Dotted line from About link to popup */}
          <svg className="fixed inset-0 w-full h-full pointer-events-none z-50" style={{ overflow: 'visible' }}>
            <line
              x1={linkPositions.about.x}
              y1={linkPositions.about.y - 8}
              x2={dimensions.width / 2}
              y2={dimensions.height / 2 + 100}
              stroke={theme === 'dark' ? 'rgba(168, 162, 158, 0.6)' : 'rgba(120, 113, 108, 0.5)'}
              strokeWidth="1.5"
              strokeDasharray="6,6"
            />
          </svg>
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="relative w-full animate-fade-in-up"
              style={{ maxWidth: isMobile ? '90vw' : '340px' }}
            >
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 shadow-soft-xl border border-stone-200 dark:border-stone-800 overflow-y-auto max-h-[70vh]">
                {/* Close button */}
                <button 
                  onClick={closePopup}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors z-10"
                >
                  <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h2 className="text-base font-bold text-stone-900 dark:text-white mb-2">About {APP_NAME}</h2>
              <p className="text-xs text-stone-500 dark:text-stone-400 mb-4">Innovative yet simple apps to solve modern problems</p>
              
              <div className="space-y-3">
                <div>
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-white mb-1">Our Mission</h3>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400 leading-relaxed">
                    We're on a mission to create apps that genuinely improve people's lives. Technology should be a helpful companion, not a distraction.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-white mb-2">What We Believe</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center">
                      <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-1">
                        <svg className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-medium text-stone-700 dark:text-stone-300">Simplicity</span>
                    </div>
                    <div className="text-center">
                      <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-1">
                        <svg className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-medium text-stone-700 dark:text-stone-300">Innovation</span>
                    </div>
                    <div className="text-center">
                      <div className="w-7 h-7 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center mx-auto mb-1">
                        <svg className="w-3.5 h-3.5 text-stone-600 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <span className="text-[9px] font-medium text-stone-700 dark:text-stone-300">Quality</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xs font-semibold text-stone-900 dark:text-white mb-2">Connect With Us</h3>
                  <div className="flex justify-center gap-2">
                    <a href={SOCIAL_MEDIA.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    </a>
                    <a href={SOCIAL_MEDIA.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                    <a href={SOCIAL_MEDIA.threads} target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.96-.065-1.182.408-2.256 1.332-3.023.88-.73 2.087-1.146 3.398-1.172 1.163-.024 2.237.172 3.2.583.015-.442.005-.874-.034-1.29-.166-1.766-.9-2.693-2.508-2.762a3.003 3.003 0 0 0-.085-.003c-1.2 0-2.16.584-2.637 1.287l-1.73-1.168c.764-1.127 2.2-1.993 4.258-2.012h.095c1.568.015 2.858.542 3.838 1.57.927.972 1.44 2.324 1.527 4.02.022.428.027.874.015 1.337.54.315 1.02.69 1.435 1.126 1.089 1.145 1.63 2.674 1.564 4.428-.079 2.086-.993 3.958-2.647 5.42C18.14 22.995 15.385 23.98 12.186 24zm-.09-8.399c-.06 0-.12.002-.18.004-.94.04-1.667.35-2.104.903-.39.495-.548 1.126-.473 1.883.122 1.218 1.165 1.96 2.794 1.875 1.182-.063 2.064-.475 2.62-1.226.503-.678.766-1.645.784-2.876-.704-.366-1.53-.563-2.441-.563z"/></svg>
                    </a>
                    <a href={SOCIAL_MEDIA.youtube} target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    </a>
                    <a href={SOCIAL_MEDIA.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-stone-100 dark:bg-stone-800 rounded-lg text-stone-600 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            </div>
          </div>
        </>
      )}

      {/* Contact Popup Tile */}
      {activePopup === 'contact' && linkPositions.contact && (
        <>
          {/* Dotted line from Contact link to popup */}
          <svg className="fixed inset-0 w-full h-full pointer-events-none z-50" style={{ overflow: 'visible' }}>
            <line
              x1={linkPositions.contact.x}
              y1={linkPositions.contact.y - 8}
              x2={dimensions.width / 2}
              y2={dimensions.height / 2 + 100}
              stroke={theme === 'dark' ? 'rgba(168, 162, 158, 0.6)' : 'rgba(120, 113, 108, 0.5)'}
              strokeWidth="1.5"
              strokeDasharray="6,6"
            />
          </svg>
          
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
              className="relative w-full animate-fade-in-up"
              style={{ maxWidth: isMobile ? '90vw' : '340px' }}
            >
              <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 shadow-soft-xl border border-stone-200 dark:border-stone-800 overflow-y-auto max-h-[70vh]">
                {/* Close button */}
                <button 
                  onClick={closePopup}
                  className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors z-10"
                >
                  <svg className="w-4 h-4 text-stone-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
                
                <h2 className="text-base font-bold text-stone-900 dark:text-white mb-1">Get in Touch</h2>
              <p className="text-[10px] text-stone-500 dark:text-stone-400 mb-3">Have a question or feedback? We'd love to hear from you.</p>
              
              {submitted ? (
                <div className="text-center py-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                    <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900 dark:text-white mb-1">Message Sent!</h3>
                  <p className="text-[10px] text-stone-500 dark:text-stone-400">We'll get back to you soon.</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="mt-3 text-[10px] text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div>
                    <label htmlFor="popup-name" className="block text-[10px] font-medium text-stone-700 dark:text-stone-300 mb-1">Name</label>
                    <input
                      type="text"
                      id="popup-name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="popup-email" className="block text-[10px] font-medium text-stone-700 dark:text-stone-300 mb-1">Email</label>
                    <input
                      type="email"
                      id="popup-email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="popup-message" className="block text-[10px] font-medium text-stone-700 dark:text-stone-300 mb-1">Message</label>
                    <textarea
                      id="popup-message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-3 py-2 text-xs bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 dark:focus:ring-white transition-all resize-none"
                      placeholder="Tell us more..."
                    />
                  </div>
                  {error && (
                    <div className="p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-600 dark:text-red-400 text-[10px]">
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 text-xs bg-stone-900 dark:bg-white text-white dark:text-stone-900 font-medium rounded-lg hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-1">
                        <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
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
              
              {/* Email info */}
              <div className="mt-4 pt-3 border-t border-stone-200 dark:border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center">
                    <svg className="w-3 h-3 text-stone-600 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-[9px] text-stone-500 dark:text-stone-400">Email us at</span>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="block text-[10px] text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white transition-colors">
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </>
      )}
    </div>
  )
}

export default HomePage
