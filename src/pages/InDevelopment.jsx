import React from 'react'
import { Link, useParams } from 'react-router-dom'

function InDevelopment() {
  const { appName } = useParams()
  const displayName = appName ? decodeURIComponent(appName) : 'this app'

  return (
    <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="mb-8">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-2xl flex items-center justify-center">
              <svg className="w-12 h-12 text-gray-900 dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">
            {displayName} is Coming Soon!
          </h1>
          <div className="w-24 h-1 bg-gray-900 dark:bg-white mx-auto mb-6 rounded-full"></div>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
            We're working hard to bring <span className="font-semibold text-gray-900 dark:text-white">{displayName}</span> to life!
          </p>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-12 mb-8 shadow-sm">
            <div className="flex items-center justify-center mb-6">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 dark:border-gray-700 border-t-gray-900 dark:border-t-white rounded-full animate-spin"></div>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              This app is currently in development
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
              <span className="font-semibold text-gray-900 dark:text-white">Watch this space!</span> We'll be launching soon.
            </p>
            <div className="bg-white dark:bg-gray-800 border-l-4 border-gray-900 dark:border-white p-4 rounded-r-lg text-left">
              <p className="text-gray-700 dark:text-gray-300">
                <strong>Stay updated:</strong> Follow us to be notified when {displayName} launches!
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors font-semibold shadow-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default InDevelopment

