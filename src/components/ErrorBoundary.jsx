import React from 'react'
import { Link } from 'react-router-dom'

/**
 * Error Boundary Component
 * Catches JavaScript errors anywhere in the child component tree
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo)
    this.setState({
      error,
      errorInfo
    })

    // You can also log error to an error reporting service
    // logErrorToService(error, errorInfo)
  }

  handleReset = () => {
    this.setState({ 
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      // Fallback UI
      return (
        <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
          <div className="max-w-2xl w-full text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/20 rounded-full mb-6">
                <svg 
                  className="w-10 h-10 text-red-600 dark:text-red-500" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                We're sorry, but something unexpected happened. Our team has been notified.
              </p>
            </div>

            {/* Error details in development */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-8 text-left bg-gray-100 dark:bg-gray-900 rounded-lg p-6">
                <summary className="cursor-pointer font-semibold text-gray-900 dark:text-white mb-2">
                  Error Details (Development Only)
                </summary>
                <div className="mt-4 space-y-2">
                  <p className="text-sm text-red-600 dark:text-red-400 font-mono">
                    {this.state.error.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <pre className="text-xs text-gray-700 dark:text-gray-300 overflow-auto">
                      {this.state.errorInfo.componentStack}
                    </pre>
                  )}
                </div>
              </details>
            )}

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={this.handleReset}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Again
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Go to Homepage
              </Link>
            </div>

            {/* Support info */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                If this problem persists, please{' '}
                <Link 
                  to="/#contact" 
                  className="text-blue-600 dark:text-blue-500 hover:underline"
                >
                  contact our support team
                </Link>
              </p>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
