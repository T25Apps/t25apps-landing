import React, { useEffect, Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import HomePage from './components/HomePage'
import { trackPageView } from './utils/analytics'

// Lazy load page components
const AppDetail = lazy(() => import('./pages/AppDetail'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="h-screen-safe flex items-center justify-center bg-stone-50 dark:bg-stone-950 dotted-bg">
    <div className="text-center animate-fade-in">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-stone-300 border-t-stone-900 dark:border-stone-700 dark:border-t-stone-100"></div>
      <p className="mt-4 text-stone-500 dark:text-stone-400 text-sm">Loading...</p>
    </div>
  </div>
)

function AppContent() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location])

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/apps/:slug" element={<AppDetail />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App

