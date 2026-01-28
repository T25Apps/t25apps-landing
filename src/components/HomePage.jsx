import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { apps, AppIcons } from '../config/apps.config.jsx'
import { APP_NAME, SOCIAL_MEDIA } from '../config/constants'
import SEO from './SEO'
import logoLight from '../assets/logo_light.png'
import logoDark from '../assets/logo_dark.png'

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
  const containerRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

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
    }
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

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
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-end px-4 md:px-10 py-3 animate-fade-in">
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
        className="flex-1 relative overflow-hidden"
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
            <Link 
              to="/about" 
              className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
            >
              About
            </Link>
            <Link 
              to="/contact" 
              className="text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white transition-colors"
            >
              Contact
            </Link>
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
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
