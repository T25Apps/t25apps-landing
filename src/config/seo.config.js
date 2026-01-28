/**
 * SEO Configuration
 * Centralized SEO defaults, helpers, and structured data
 */

// Site-wide SEO defaults
export const siteConfig = {
  name: 'T25Apps',
  title: 'T25Apps - Innovative Mobile & Web Apps for Modern Life',
  description: 'Discover innovative mobile and web applications designed to solve real-world problems. From productivity tools to educational apps, explore our collection of beautifully crafted software.',
  url: 'https://www.t25apps.com',
  ogImage: 'https://www.t25apps.com/images/og-image.jpg',
  twitterHandle: '@t25apps',
  twitterCard: 'summary_large_image',
  keywords: [
    'mobile apps',
    'web apps',
    'productivity apps',
    'calendar app',
    'study app',
    'recipe app',
    'investment tracker',
    't25apps',
    'app development',
    'software solutions'
  ],
  author: 'T25Apps',
  language: 'en-US',
  locale: 'en_US',
}

// Page-specific SEO configurations
export const pageConfig = {
  home: {
    title: siteConfig.title,
    description: siteConfig.description,
    path: '/',
    keywords: siteConfig.keywords,
  },
  contribution: {
    title: 'Contribute to T25Apps - Join Our Development Community',
    description: 'Want to contribute to T25Apps? Learn how you can help improve our apps, report bugs, suggest features, or join our open-source projects.',
    path: '/contribution',
    keywords: ['contribute', 'open source', 'collaboration', 'development', 't25apps community'],
  },
  inDevelopment: {
    title: 'App In Development - Coming Soon | T25Apps',
    description: 'This app is currently under development. Check back soon for updates and launch information.',
    path: '/in-development',
    keywords: ['coming soon', 'in development', 'app launch', 't25apps'],
  },
}

/**
 * Generate complete page metadata
 * @param {Object} config - Page configuration
 * @returns {Object} Complete metadata object
 */
export const generatePageMeta = (config = {}) => {
  const title = config.title || siteConfig.title
  const description = config.description || siteConfig.description
  const url = `${siteConfig.url}${config.path || ''}`
  const image = config.ogImage || siteConfig.ogImage
  const keywords = config.keywords || siteConfig.keywords

  return {
    title,
    description,
    keywords: Array.isArray(keywords) ? keywords.join(', ') : keywords,
    canonical: url,
    openGraph: {
      type: 'website',
      url,
      title,
      description,
      siteName: siteConfig.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: siteConfig.locale,
    },
    twitter: {
      card: siteConfig.twitterCard,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title,
      description,
      images: [image],
    },
  }
}

/**
 * Generate app-specific metadata
 * @param {Object} app - App object from apps.config.js
 * @returns {Object} Complete metadata object
 */
export const generateAppMeta = (app) => {
  if (!app) return generatePageMeta()

  return {
    title: app.seo?.title || `${app.name} - ${app.tagline} | T25Apps`,
    description: app.seo?.description || app.fullDescription || app.shortDescription,
    keywords: app.seo?.keywords?.join(', ') || siteConfig.keywords.join(', '),
    canonical: `${siteConfig.url}/apps/${app.slug}`,
    openGraph: {
      type: 'website',
      url: `${siteConfig.url}/apps/${app.slug}`,
      title: app.seo?.title || `${app.name} - ${app.tagline}`,
      description: app.seo?.description || app.shortDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: app.seo?.ogImage || siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: app.name,
        },
      ],
      locale: siteConfig.locale,
    },
    twitter: {
      card: siteConfig.twitterCard,
      site: siteConfig.twitterHandle,
      creator: siteConfig.twitterHandle,
      title: app.seo?.title || `${app.name} - ${app.tagline}`,
      description: app.seo?.description || app.shortDescription,
      images: [app.seo?.ogImage || siteConfig.ogImage],
    },
  }
}

/**
 * Generate JSON-LD structured data for Organization
 */
export const getOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    sameAs: [
      `https://twitter.com/${siteConfig.twitterHandle.replace('@', '')}`,
      // Add other social media links as available
    ],
  }
}

/**
 * Generate JSON-LD structured data for SoftwareApplication
 * @param {Object} app - App object from apps.config.js
 */
export const getAppSchema = (app) => {
  if (!app) return null

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: app.name,
    description: app.fullDescription || app.shortDescription,
    url: app.website,
    applicationCategory: app.category,
    operatingSystem: app.platforms.join(', '),
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
    },
  }

  // Add app store links if available
  if (app.appStore) {
    schema.downloadUrl = app.appStore
  }

  // Add aggregateRating if we have reviews later
  // schema.aggregateRating = { ... }

  return schema
}

/**
 * Generate JSON-LD structured data for BreadcrumbList
 * @param {Array} items - Array of breadcrumb items [{name, url}]
 */
export const getBreadcrumbSchema = (items) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

/**
 * Format date for sitemap (YYYY-MM-DD)
 * @param {Date|string} date
 * @returns {string}
 */
export const formatSitemapDate = (date) => {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}

/**
 * Generate robots meta tag value
 * @param {boolean} index - Allow indexing
 * @param {boolean} follow - Allow following links
 * @returns {string}
 */
export const generateRobotsMeta = (index = true, follow = true) => {
  const indexValue = index ? 'index' : 'noindex'
  const followValue = follow ? 'follow' : 'nofollow'
  return `${indexValue}, ${followValue}`
}

export default siteConfig
