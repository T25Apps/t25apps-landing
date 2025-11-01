import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '#about', label: 'About' },
    { path: '#products', label: 'Products' },
    { path: '#contact', label: 'Contact' },
    { path: '/contribution', label: 'Contribute' },
  ]

  const handleNavClick = (e, path) => {
    if (path.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(path)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
    setIsOpen(false)
  }

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              T25Apps
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              item.path.startsWith('#') ? (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === '/' && item.path === '#about' ? 'text-blue-600' : ''
                  }`}
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path ? 'text-blue-600 font-semibold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {navItems.map((item) => (
              item.path.startsWith('#') ? (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium"
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

