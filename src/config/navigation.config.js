/**
 * Navigation Configuration
 * Centralized navigation menu items and footer links
 */

// Main navigation menu items
export const mainNavigation = [
  {
    name: 'Home',
    href: '/',
    anchor: '#home',
  },
  {
    name: 'About',
    href: '/',
    anchor: '#about',
  },
  {
    name: 'Products',
    href: '/',
    anchor: '#products',
  },
  {
    name: 'Contact',
    href: '/',
    anchor: '#contact',
  },
]

// Footer navigation sections
export const footerNavigation = {
  products: {
    title: 'Products',
    links: [
      { name: 'Calendr', href: '/apps/calendr', external: false },
      { name: 'Orbyte', href: '/apps/orbyte', external: false },
      { name: 'RecipeDiary', href: '/apps/recipe-diary', external: false },
      { name: 'MyInvestments', href: '/apps/my-investments', external: false },
    ],
  },
  company: {
    title: 'Company',
    links: [
      { name: 'About', href: '/#about', external: false },
      { name: 'Contact', href: '/#contact', external: false },
      // Add more as needed:
      // { name: 'Blog', href: '/blog', external: false },
      // { name: 'Careers', href: '/careers', external: false },
    ],
  },
  resources: {
    title: 'Resources',
    links: [
      // Uncomment when these pages are created:
      // { name: 'Documentation', href: '/docs', external: false },
      // { name: 'Help Center', href: '/help', external: false },
      // { name: 'Privacy Policy', href: '/privacy', external: false },
      // { name: 'Terms of Service', href: '/terms', external: false },
    ],
  },
  social: {
    title: 'Connect',
    links: [
      // Add social media links when available:
      // { name: 'Twitter', href: 'https://twitter.com/t25apps', external: true, icon: 'twitter' },
      // { name: 'GitHub', href: 'https://github.com/t25apps', external: true, icon: 'github' },
      // { name: 'LinkedIn', href: 'https://linkedin.com/company/t25apps', external: true, icon: 'linkedin' },
      // { name: 'Discord', href: 'https://discord.gg/t25apps', external: true, icon: 'discord' },
    ],
  },
}

// Mobile menu configuration
export const mobileMenuConfig = {
  enabled: true,
  position: 'right', // 'left' or 'right'
  animation: 'slide', // 'slide' or 'fade'
}

// Call-to-action buttons (optional)
export const ctaButtons = {
  primary: {
    text: 'Get Started',
    href: '/#products',
    variant: 'primary',
  },
  secondary: {
    text: 'Contact Us',
    href: '/#contact',
    variant: 'secondary',
  },
}

/**
 * Helper function to get navigation items for a specific section
 * @param {string} section - Navigation section name
 * @returns {Array} Array of navigation items
 */
export const getNavigationSection = (section) => {
  switch (section) {
    case 'main':
      return mainNavigation
    case 'footer':
      return footerNavigation
    default:
      return []
  }
}

/**
 * Check if a link is external
 * @param {string} href - Link URL
 * @returns {boolean}
 */
export const isExternalLink = (href) => {
  return href.startsWith('http://') || href.startsWith('https://')
}

/**
 * Get link properties for React Router vs anchor tag
 * @param {Object} link - Link object with href
 * @returns {Object} Props for Link or anchor tag
 */
export const getLinkProps = (link) => {
  if (link.external || isExternalLink(link.href)) {
    return {
      href: link.href,
      target: '_blank',
      rel: 'noopener noreferrer',
      isExternal: true,
    }
  }
  
  return {
    to: link.href,
    isExternal: false,
  }
}

export default {
  mainNavigation,
  footerNavigation,
  mobileMenuConfig,
  ctaButtons,
}
