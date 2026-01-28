/**
 * Application Constants
 * Single source of truth for app-wide constants
 */

// App Information
export const APP_NAME = 'T25Apps'
export const APP_VERSION = '1.0.0'
export const APP_DESCRIPTION = 'Innovative mobile and web applications designed to solve real-world problems'

// Contact Information
export const CONTACT_EMAIL = 'contact@t25apps.com'
export const SUPPORT_EMAIL = 'support@t25apps.com'
export const BUSINESS_EMAIL = 'business@t25apps.com'

// Social Media Handles (update when available)
export const SOCIAL_MEDIA = {
  instagram: 'https://instagram.com/t25apps',
  facebook: 'https://facebook.com/t25apps',
  threads: 'https://threads.net/t25apps',
  youtube: 'https://youtube.com/@t25apps',
  twitter: 'https://twitter.com/t25apps',
}

// URLs
export const SITE_URL = import.meta.env.PROD 
  ? 'https://www.t25apps.com' 
  : 'http://localhost:5173'

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.t25apps.com'

// App Status Types
export const APP_STATUS = {
  AVAILABLE: 'available',
  IN_DEVELOPMENT: 'in-development',
  COMING_SOON: 'coming-soon',
  BETA: 'beta',
  DEPRECATED: 'deprecated',
}

// App Status Display Labels
export const APP_STATUS_LABELS = {
  [APP_STATUS.AVAILABLE]: 'Available',
  [APP_STATUS.IN_DEVELOPMENT]: 'In Development',
  [APP_STATUS.COMING_SOON]: 'Coming Soon',
  [APP_STATUS.BETA]: 'Beta',
  [APP_STATUS.DEPRECATED]: 'Deprecated',
}

// App Status Colors (Tailwind classes)
export const APP_STATUS_COLORS = {
  [APP_STATUS.AVAILABLE]: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-800 dark:text-green-400',
  },
  [APP_STATUS.IN_DEVELOPMENT]: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-800 dark:text-yellow-400',
  },
  [APP_STATUS.COMING_SOON]: {
    bg: 'bg-blue-100 dark:bg-blue-900/30',
    text: 'text-blue-800 dark:text-blue-400',
  },
  [APP_STATUS.BETA]: {
    bg: 'bg-purple-100 dark:bg-purple-900/30',
    text: 'text-purple-800 dark:text-purple-400',
  },
  [APP_STATUS.DEPRECATED]: {
    bg: 'bg-gray-100 dark:bg-gray-900/30',
    text: 'text-gray-800 dark:text-gray-400',
  },
}

// App Categories
export const APP_CATEGORIES = {
  PRODUCTIVITY: 'Productivity',
  EDUCATION: 'Education',
  FOOD_LIFESTYLE: 'Food & Lifestyle',
  FINANCE: 'Finance',
  HEALTH: 'Health & Fitness',
  ENTERTAINMENT: 'Entertainment',
  UTILITIES: 'Utilities',
  SOCIAL: 'Social',
}

// Platform Types
export const PLATFORMS = {
  WEB: 'Web',
  IOS: 'iOS',
  ANDROID: 'Android',
  DESKTOP: 'Desktop',
  API: 'API',
}

// Theme Constants
export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
}

// Breakpoints (matching Tailwind defaults)
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
}

// Animation Durations (in milliseconds)
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
}

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 't25apps_theme',
  USER_PREFERENCES: 't25apps_preferences',
  LAST_VISITED: 't25apps_last_visited',
}

// Form Validation
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_MESSAGE_LENGTH: 500,
  MAX_NAME_LENGTH: 100,
}

// Feature Flags (can be controlled via environment variables)
export const FEATURES = {
  ANALYTICS_ENABLED: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  BLOG_ENABLED: import.meta.env.VITE_ENABLE_BLOG === 'true',
  NEWSLETTER_ENABLED: false, // Enable when newsletter is set up
  COMMENTS_ENABLED: false, // Enable when comment system is added
}

// Error Messages
export const ERROR_MESSAGES = {
  GENERIC: 'Something went wrong. Please try again later.',
  NETWORK: 'Network error. Please check your connection.',
  NOT_FOUND: 'The requested resource was not found.',
  UNAUTHORIZED: 'You are not authorized to access this resource.',
  VALIDATION: 'Please check your input and try again.',
  FORM_SUBMIT: 'Failed to submit form. Please try again.',
}

// Success Messages
export const SUCCESS_MESSAGES = {
  FORM_SUBMIT: 'Thank you! Your message has been sent successfully.',
  SUBSCRIBE: 'Successfully subscribed to our newsletter!',
  DOWNLOAD: 'Download started successfully.',
}

// Date Formats
export const DATE_FORMATS = {
  SHORT: 'MMM DD, YYYY', // Jan 27, 2026
  LONG: 'MMMM DD, YYYY', // January 27, 2026
  ISO: 'YYYY-MM-DD', // 2026-01-27
  TIME: 'hh:mm A', // 02:30 PM
  DATETIME: 'MMM DD, YYYY hh:mm A', // Jan 27, 2026 02:30 PM
}

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  ITEMS_PER_PAGE_OPTIONS: [12, 24, 48],
}

// API Rate Limits (if applicable)
export const RATE_LIMITS = {
  CONTACT_FORM: 5, // 5 submissions per hour
  NEWSLETTER: 3, // 3 subscriptions per day
}

// External Links
export const EXTERNAL_LINKS = {
  DOCUMENTATION: 'https://docs.t25apps.com',
  GITHUB: 'https://github.com/t25apps',
  SUPPORT: 'https://support.t25apps.com',
  STATUS_PAGE: 'https://status.t25apps.com',
}

// Copyright
export const COPYRIGHT_YEAR = new Date().getFullYear()
export const COPYRIGHT_TEXT = `© ${COPYRIGHT_YEAR} ${APP_NAME}. All rights reserved.`

// Default Meta Tags (fallback)
export const DEFAULT_META = {
  TITLE: `${APP_NAME} - ${APP_DESCRIPTION}`,
  DESCRIPTION: APP_DESCRIPTION,
  IMAGE: `${SITE_URL}/images/og-image.jpg`,
  KEYWORDS: ['mobile apps', 'web apps', 'productivity', 'innovation'],
}

export default {
  APP_NAME,
  APP_VERSION,
  APP_DESCRIPTION,
  CONTACT_EMAIL,
  SITE_URL,
  API_BASE_URL,
  APP_STATUS,
  APP_STATUS_LABELS,
  APP_STATUS_COLORS,
  APP_CATEGORIES,
  PLATFORMS,
  THEMES,
  STORAGE_KEYS,
  FEATURES,
  COPYRIGHT_TEXT,
}
