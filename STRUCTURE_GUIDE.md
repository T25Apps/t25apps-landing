# T25Apps - Proposed Reorganized Structure

## 📁 Complete New Directory Structure

```
t25apps-landing/
├── .github/
│   └── workflows/
│       └── deploy.yml                    # CI/CD workflow
│
├── public/
│   ├── favicon/
│   │   ├── favicon.ico
│   │   ├── favicon-16x16.png
│   │   ├── favicon-32x32.png
│   │   ├── apple-touch-icon.png
│   │   ├── android-chrome-192x192.png
│   │   ├── android-chrome-512x512.png
│   │   └── site.webmanifest
│   ├── images/
│   │   ├── og-image.jpg                  # Open Graph default image
│   │   └── logo-square.png               # For social media
│   ├── robots.txt
│   └── sitemap.xml
│
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── logos/
│   │   │   │   ├── logo-light.png
│   │   │   │   ├── logo-dark.png
│   │   │   │   └── logo-full.svg
│   │   │   ├── apps/                     # App screenshots organized by app
│   │   │   │   ├── calendr/
│   │   │   │   │   ├── hero.png
│   │   │   │   │   ├── screenshot-1.png
│   │   │   │   │   ├── screenshot-2.png
│   │   │   │   │   └── icon.svg
│   │   │   │   ├── orbyte/
│   │   │   │   ├── recipediary/
│   │   │   │   └── myinvestments/
│   │   │   ├── illustrations/
│   │   │   │   ├── hero-bg.svg
│   │   │   │   └── about-illustration.svg
│   │   │   └── placeholders/
│   │   │       └── app-placeholder.png
│   │   └── videos/
│   │       └── demo-calendr.mp4
│   │
│   ├── components/
│   │   ├── common/                        # Reusable UI components
│   │   │   ├── Button/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── Button.module.css     # Optional: component styles
│   │   │   │   └── Button.test.jsx       # Optional: tests
│   │   │   ├── Card/
│   │   │   │   └── index.jsx
│   │   │   ├── Badge/
│   │   │   │   └── index.jsx
│   │   │   ├── Modal/
│   │   │   │   └── index.jsx
│   │   │   ├── Input/
│   │   │   │   └── index.jsx
│   │   │   ├── Loading/
│   │   │   │   ├── Spinner.jsx
│   │   │   │   └── Skeleton.jsx
│   │   │   ├── SEO/
│   │   │   │   └── index.jsx             # Dynamic SEO component
│   │   │   └── ErrorBoundary/
│   │   │       └── index.jsx
│   │   │
│   │   ├── layout/                        # Layout components
│   │   │   ├── Navbar/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── NavLinks.jsx
│   │   │   │   ├── MobileMenu.jsx
│   │   │   │   └── ThemeToggle.jsx
│   │   │   ├── Footer/
│   │   │   │   ├── index.jsx
│   │   │   │   ├── FooterLinks.jsx
│   │   │   │   └── SocialLinks.jsx
│   │   │   ├── ScrollToTop/
│   │   │   │   └── index.jsx
│   │   │   └── PageLayout/
│   │   │       └── index.jsx             # Wrapper for pages
│   │   │
│   │   └── sections/                      # Home page sections
│   │       ├── Hero/
│   │       │   └── index.jsx
│   │       ├── About/
│   │       │   └── index.jsx
│   │       ├── Products/
│   │       │   ├── index.jsx
│   │       │   ├── ProductCard.jsx
│   │       │   └── ProductFilter.jsx
│   │       ├── Contact/
│   │       │   └── index.jsx
│   │       ├── Testimonials/
│   │       │   ├── index.jsx
│   │       │   └── TestimonialCard.jsx
│   │       ├── Features/
│   │       │   └── index.jsx
│   │       ├── FAQ/
│   │       │   ├── index.jsx
│   │       │   └── FAQItem.jsx
│   │       └── Newsletter/
│   │           └── index.jsx
│   │
│   ├── pages/
│   │   ├── Home/
│   │   │   └── index.jsx                 # Combines all sections
│   │   ├── AppDetail/
│   │   │   ├── index.jsx                 # Dynamic app page
│   │   │   ├── AppHeader.jsx
│   │   │   ├── AppFeatures.jsx
│   │   │   ├── AppScreenshots.jsx
│   │   │   ├── AppReviews.jsx
│   │   │   └── AppDownload.jsx
│   │   ├── Apps/
│   │   │   └── index.jsx                 # All apps listing
│   │   ├── Blog/
│   │   │   ├── index.jsx                 # Blog listing
│   │   │   └── BlogCard.jsx
│   │   ├── BlogPost/
│   │   │   └── index.jsx                 # Individual blog post
│   │   ├── Contribution/
│   │   │   └── index.jsx
│   │   ├── About/
│   │   │   └── index.jsx                 # Dedicated about page
│   │   ├── Contact/
│   │   │   └── index.jsx                 # Dedicated contact page
│   │   ├── Privacy/
│   │   │   └── index.jsx
│   │   ├── Terms/
│   │   │   └── index.jsx
│   │   ├── InDevelopment/
│   │   │   └── index.jsx
│   │   └── NotFound/
│   │       └── index.jsx
│   │
│   ├── features/                          # Feature-based organization
│   │   ├── apps/
│   │   │   ├── components/
│   │   │   │   ├── AppCard.jsx
│   │   │   │   └── AppStatus.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAppData.js
│   │   │   │   └── useAppFilter.js
│   │   │   └── data/
│   │   │       └── appsData.js           # Could move to config
│   │   ├── newsletter/
│   │   │   ├── components/
│   │   │   │   └── SubscribeForm.jsx
│   │   │   ├── hooks/
│   │   │   │   └── useNewsletter.js
│   │   │   └── api/
│   │   │       └── newsletter.js
│   │   └── search/
│   │       ├── components/
│   │       │   └── SearchBar.jsx
│   │       └── hooks/
│   │           └── useSearch.js
│   │
│   ├── hooks/                             # Custom React hooks
│   │   ├── useAnalytics.js
│   │   ├── useScrollPosition.js
│   │   ├── useMediaQuery.js
│   │   ├── useLocalStorage.js
│   │   ├── useIntersectionObserver.js
│   │   ├── useDebounce.js
│   │   └── index.js                      # Export all hooks
│   │
│   ├── utils/                             # Utility functions
│   │   ├── seo.js                        # SEO helper functions
│   │   ├── analytics.js                  # Analytics wrapper
│   │   ├── validation.js                 # Form validation schemas
│   │   ├── formatters.js                 # Date, number formatters
│   │   ├── helpers.js                    # General helpers
│   │   └── index.js                      # Export all utils
│   │
│   ├── config/                            # Configuration files
│   │   ├── apps.config.js                # All app data
│   │   ├── seo.config.js                 # SEO defaults
│   │   ├── navigation.config.js          # Nav menu items
│   │   ├── social.config.js              # Social media links
│   │   ├── constants.js                  # App-wide constants
│   │   └── index.js                      # Export all configs
│   │
│   ├── services/                          # API services
│   │   ├── api.js                        # Base API client
│   │   ├── analytics.service.js
│   │   ├── newsletter.service.js
│   │   └── contact.service.js
│   │
│   ├── context/                           # React Context
│   │   ├── ThemeContext.jsx
│   │   ├── AppContext.jsx                # Global app state
│   │   └── index.js                      # Export all contexts
│   │
│   ├── styles/
│   │   ├── index.css                     # Main CSS with Tailwind
│   │   ├── animations.css                # Custom animations
│   │   └── utilities.css                 # Custom utility classes
│   │
│   ├── types/                             # TypeScript types (if using TS)
│   │   ├── app.types.ts
│   │   └── index.ts
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── .env.example                           # Environment variables template
├── .env.local                             # Local environment (gitignored)
├── .eslintrc.json                         # ESLint configuration
├── .prettierrc                            # Prettier configuration
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── README.md
├── ASSESSMENT_AND_RECOMMENDATIONS.md     # This assessment doc
├── IMPLEMENTATION_CHECKLIST.md           # Implementation checklist
└── STRUCTURE_GUIDE.md                    # This file

```

---

## 📋 Migration Plan

### Step-by-Step Migration (Do Gradually!)

#### Phase 1: Create New Directories
```bash
# Create new structure (PowerShell)
mkdir src\components\common, src\components\layout, src\components\sections
mkdir src\hooks, src\utils, src\config, src\services
mkdir src\pages\Home, src\pages\AppDetail, src\pages\Apps, src\pages\Blog
mkdir src\pages\Privacy, src\pages\Terms, src\pages\NotFound
mkdir public\favicon, public\images
```

#### Phase 2: Move Existing Files
1. Move `src/components/Navbar.jsx` → `src/components/layout/Navbar/index.jsx`
2. Move `src/components/Footer.jsx` → `src/components/layout/Footer/index.jsx`
3. Move `src/components/ScrollToTop.jsx` → `src/components/layout/ScrollToTop/index.jsx`
4. Move `src/components/Hero.jsx` → `src/components/sections/Hero/index.jsx`
5. Move `src/components/About.jsx` → `src/components/sections/About/index.jsx`
6. Move `src/components/Products.jsx` → `src/components/sections/Products/index.jsx`
7. Move `src/components/Contact.jsx` → `src/components/sections/Contact/index.jsx`
8. Move `src/pages/Contribution.jsx` → `src/pages/Contribution/index.jsx`
9. Move `src/pages/InDevelopment.jsx` → `src/pages/InDevelopment/index.jsx`

#### Phase 3: Create New Config Files
Create these files in order:

1. **src/config/constants.js**
2. **src/config/apps.config.js** (extract data from Products.jsx)
3. **src/config/seo.config.js**
4. **src/config/navigation.config.js**
5. **src/config/social.config.js**

#### Phase 4: Update Imports
Update all import paths in your files to match the new structure.

---

## 📄 Sample File Contents

### 1. `src/config/apps.config.js`
```javascript
export const APPS_DATA = [
  {
    id: 'calendr',
    name: 'Calendr',
    slug: 'calendr',
    tagline: 'Simple Calendar, Smart Planning',
    description: 'A simple to use calendar app that helps you stay organized and manage your tasks efficiently.',
    fullDescription: `Calendr is your ultimate productivity companion, designed to simplify 
    scheduling and task management. With an intuitive interface and powerful features, 
    Calendr helps you organize your life effortlessly.
    
    Whether you're managing work projects, personal appointments, or family events, 
    Calendr provides all the tools you need in one beautiful app.`,
    category: 'Productivity',
    status: 'available', // available | in-development | planned | coming-soon
    platforms: ['web', 'ios', 'android'],
    website: 'https://calendr.t25apps.com',
    downloadLinks: {
      web: 'https://calendr.t25apps.com',
      ios: 'https://apps.apple.com/...',
      android: 'https://play.google.com/...',
    },
    features: [
      {
        title: 'Smart Scheduling',
        description: 'AI-powered scheduling suggestions',
        icon: 'calendar'
      },
      {
        title: 'Task Management',
        description: 'Integrate tasks with your calendar',
        icon: 'check'
      },
      {
        title: 'Sync Everywhere',
        description: 'Access your calendar on all devices',
        icon: 'sync'
      },
      {
        title: 'Reminders',
        description: 'Never miss an important event',
        icon: 'bell'
      },
      {
        title: 'Multiple Calendars',
        description: 'Organize different aspects of your life',
        icon: 'layers'
      },
      {
        title: 'Share & Collaborate',
        description: 'Share calendars with team members',
        icon: 'users'
      },
    ],
    screenshots: [
      {
        url: '/images/apps/calendr/screenshot-1.png',
        alt: 'Calendr main calendar view',
        caption: 'Beautiful monthly calendar view'
      },
      {
        url: '/images/apps/calendr/screenshot-2.png',
        alt: 'Calendr task list',
        caption: 'Integrated task management'
      },
      // Add more screenshots
    ],
    videoDemo: 'https://www.youtube.com/embed/...',
    icon: {
      svg: `<svg>...</svg>`,
      component: 'CalendarIcon' // Or reference to component
    },
    reviews: [
      {
        id: 1,
        author: 'Sarah Johnson',
        rating: 5,
        text: 'Best calendar app I\'ve ever used! Simple and powerful.',
        date: '2026-01-15',
        verified: true
      },
      // Add more reviews
    ],
    stats: {
      downloads: '100K+',
      rating: 4.8,
      reviewCount: 2543,
    },
    pricing: {
      model: 'freemium', // free | freemium | paid | subscription
      free: true,
      premium: {
        monthly: 4.99,
        yearly: 49.99,
      }
    },
    seo: {
      title: 'Calendr - Simple Calendar App for Productivity',
      description: 'Organize your life with Calendr, the beautiful calendar app with smart scheduling, task management, and seamless sync across all devices.',
      keywords: ['calendar app', 'task manager', 'productivity', 'scheduling app'],
      ogImage: '/images/apps/calendr/og-image.jpg',
    },
    faq: [
      {
        question: 'Is Calendr free to use?',
        answer: 'Yes! Calendr offers a free version with core features. Premium features are available with a subscription.',
      },
      {
        question: 'Does Calendr sync across devices?',
        answer: 'Absolutely! Your calendars, tasks, and events sync seamlessly across all your devices in real-time.',
      },
      // Add more FAQs
    ],
    releaseDate: '2025-06-01',
    lastUpdate: '2026-01-20',
    version: '2.1.0',
  },
  {
    id: 'orbyte',
    name: 'Orbyte',
    slug: 'orbyte',
    tagline: 'Your Smart Study Companion',
    description: 'An innovative study guide for students to help them understand and learn faster.',
    fullDescription: `Orbyte revolutionizes the way students learn...`,
    category: 'Education',
    status: 'in-development',
    platforms: ['web', 'ios', 'android'],
    website: 'https://orbyte.t25apps.com',
    // ... similar structure
  },
  {
    id: 'recipediary',
    name: 'RecipeDiary',
    slug: 'recipediary',
    tagline: 'Preserve Family Recipes, Forever',
    description: 'A beautiful recipe app that helps you preserve and savor your favorite recipes from people you know.',
    fullDescription: `RecipeDiary is more than just a recipe app...`,
    category: 'Food & Cooking',
    status: 'in-development',
    platforms: ['web', 'ios', 'android'],
    website: 'https://recipediary.t25apps.com',
    // ... similar structure
  },
  {
    id: 'myinvestments',
    name: 'MyInvestments',
    slug: 'myinvestments',
    tagline: 'Track, Analyze, Grow',
    description: 'A simple to use investment tracker that helps you track your investments and plan your financial goals.',
    fullDescription: `MyInvestments makes portfolio tracking simple...`,
    category: 'Finance',
    status: 'in-development',
    platforms: ['web', 'ios', 'android'],
    website: 'https://myinvestments.t25apps.com',
    // ... similar structure
  },
];

export const APP_CATEGORIES = [
  'All',
  'Productivity',
  'Education',
  'Food & Cooking',
  'Finance',
  'Health & Fitness',
  'Entertainment',
];

export const APP_STATUSES = {
  AVAILABLE: 'available',
  IN_DEVELOPMENT: 'in-development',
  PLANNED: 'planned',
  COMING_SOON: 'coming-soon',
};

// Helper functions
export const getAppBySlug = (slug) => {
  return APPS_DATA.find(app => app.slug === slug);
};

export const getAppsByCategory = (category) => {
  if (category === 'All') return APPS_DATA;
  return APPS_DATA.filter(app => app.category === category);
};

export const getAppsByStatus = (status) => {
  return APPS_DATA.filter(app => app.status === status);
};

export const getFeaturedApps = () => {
  return APPS_DATA.filter(app => app.status === 'available').slice(0, 3);
};
```

### 2. `src/config/seo.config.js`
```javascript
export const DEFAULT_SEO = {
  title: 'T25Apps - Innovative Apps for Everyone',
  titleTemplate: '%s | T25Apps',
  description: 'T25Apps showcases innovative mobile and web applications built to solve real-world problems. Discover apps for productivity, education, finance, and more.',
  canonical: 'https://www.t25apps.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.t25apps.com',
    siteName: 'T25Apps',
    title: 'T25Apps - Innovative Apps for Everyone',
    description: 'Discover innovative mobile and web applications built to solve real-world problems.',
    images: [
      {
        url: 'https://www.t25apps.com/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'T25Apps - Innovative Mobile Applications',
      },
    ],
  },
  twitter: {
    handle: '@t25apps',
    site: '@t25apps',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'keywords',
      content: 'mobile apps, web apps, productivity apps, calendar app, study app, recipe app, investment tracker',
    },
    {
      name: 'author',
      content: 'T25Apps',
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, maximum-scale=5',
    },
    {
      name: 'theme-color',
      content: '#0f172a',
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      href: '/favicon/favicon-32x32.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      href: '/favicon/favicon-16x16.png',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/favicon/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/favicon/site.webmanifest',
    },
  ],
};

export const getPageSEO = (page, customData = {}) => {
  const seoConfigs = {
    home: {
      title: 'T25Apps - Innovative Apps for Everyone',
      description: 'Discover innovative mobile and web applications built to solve real-world problems. From productivity to education, we build apps that matter.',
    },
    apps: {
      title: 'Our Apps',
      description: 'Explore our collection of innovative apps designed to enhance your digital experience across productivity, education, finance, and more.',
    },
    about: {
      title: 'About Us',
      description: 'Learn about T25Apps and our mission to create innovative applications that solve real-world problems.',
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with the T25Apps team. We\'d love to hear from you!',
    },
    contribution: {
      title: 'Support T25Apps',
      description: 'Support T25Apps in building innovative applications. Your contribution helps us continue developing great apps.',
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'Read our privacy policy to understand how we collect, use, and protect your data.',
    },
    terms: {
      title: 'Terms of Service',
      description: 'Read our terms of service for using T25Apps products and services.',
    },
  };

  return {
    ...DEFAULT_SEO,
    ...seoConfigs[page],
    ...customData,
  };
};
```

### 3. `src/config/navigation.config.js`
```javascript
export const NAV_ITEMS = [
  {
    id: 'home',
    label: 'Home',
    path: '/',
    type: 'link',
  },
  {
    id: 'about',
    label: 'About',
    path: '#about',
    type: 'anchor',
  },
  {
    id: 'products',
    label: 'Products',
    path: '#products',
    type: 'anchor',
  },
  {
    id: 'contact',
    label: 'Contact',
    path: '#contact',
    type: 'anchor',
  },
  {
    id: 'contribute',
    label: 'Contribute',
    path: '/contribution',
    type: 'link',
  },
];

export const FOOTER_LINKS = {
  company: {
    title: 'Company',
    links: [
      { label: 'About Us', path: '#about' },
      { label: 'Contact', path: '#contact' },
      { label: 'Contribute', path: '/contribution' },
    ],
  },
  products: {
    title: 'Products',
    links: [
      { label: 'All Apps', path: '/apps' },
      { label: 'Calendr', path: '/apps/calendr' },
      { label: 'Orbyte', path: '/apps/orbyte' },
      { label: 'RecipeDiary', path: '/apps/recipediary' },
      { label: 'MyInvestments', path: '/apps/myinvestments' },
    ],
  },
  legal: {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', path: '/privacy' },
      { label: 'Terms of Service', path: '/terms' },
    ],
  },
  support: {
    title: 'Support',
    links: [
      { label: 'FAQ', path: '/faq' },
      { label: 'Documentation', path: '/docs' },
      { label: 'Contact Support', path: '/contact' },
    ],
  },
};
```

### 4. `src/config/social.config.js`
```javascript
export const SOCIAL_LINKS = [
  {
    name: 'Twitter',
    url: 'https://twitter.com/t25apps',
    icon: 'twitter',
    handle: '@t25apps',
  },
  {
    name: 'Facebook',
    url: 'https://facebook.com/t25apps',
    icon: 'facebook',
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/t25apps',
    icon: 'instagram',
    handle: '@t25apps',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/company/t25apps',
    icon: 'linkedin',
  },
  {
    name: 'GitHub',
    url: 'https://github.com/t25apps',
    icon: 'github',
  },
];

export const COMPANY_INFO = {
  name: 'T25Apps',
  email: 'contact@t25apps.com',
  website: 'https://www.t25apps.com',
  address: {
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  },
  phone: '',
  description: 'Building innovative apps that make a difference in people\'s lives.',
};
```

### 5. `src/components/common/SEO/index.jsx`
```javascript
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_SEO } from '../../../config/seo.config';

export default function SEO({ 
  title, 
  description, 
  canonical, 
  openGraph, 
  twitter,
  noindex = false,
  nofollow = false,
}) {
  const seo = {
    title: title || DEFAULT_SEO.title,
    description: description || DEFAULT_SEO.description,
    canonical: canonical || DEFAULT_SEO.canonical,
    openGraph: { ...DEFAULT_SEO.openGraph, ...openGraph },
    twitter: { ...DEFAULT_SEO.twitter, ...twitter },
  };

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {(noindex || nofollow) && (
        <meta name="robots" content={`${noindex ? 'noindex' : ''}${noindex && nofollow ? ',' : ''}${nofollow ? 'nofollow' : ''}`} />
      )}
      <link rel="canonical" href={seo.canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={seo.openGraph.type} />
      <meta property="og:title" content={seo.openGraph.title || seo.title} />
      <meta property="og:description" content={seo.openGraph.description || seo.description} />
      <meta property="og:url" content={seo.openGraph.url || seo.canonical} />
      <meta property="og:site_name" content={seo.openGraph.siteName} />
      {seo.openGraph.images && seo.openGraph.images.map((image, index) => (
        <React.Fragment key={index}>
          <meta property="og:image" content={image.url} />
          <meta property="og:image:width" content={image.width} />
          <meta property="og:image:height" content={image.height} />
          <meta property="og:image:alt" content={image.alt} />
        </React.Fragment>
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content={seo.twitter.cardType} />
      <meta name="twitter:site" content={seo.twitter.site} />
      <meta name="twitter:creator" content={seo.twitter.handle} />
      <meta name="twitter:title" content={seo.openGraph.title || seo.title} />
      <meta name="twitter:description" content={seo.openGraph.description || seo.description} />
      {seo.openGraph.images && seo.openGraph.images[0] && (
        <meta name="twitter:image" content={seo.openGraph.images[0].url} />
      )}
    </Helmet>
  );
}
```

### 6. `src/hooks/useAnalytics.js`
```javascript
import { useEffect } from 'react';
import { trackPageView, trackEvent } from '../utils/analytics';

export function usePageView() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);
}

export function useTrackEvent() {
  return (eventName, eventData) => {
    trackEvent(eventName, eventData);
  };
}

// Usage in components:
// const trackEvent = useTrackEvent();
// trackEvent('button_click', { button: 'download', app: 'calendr' });
```

### 7. `src/utils/analytics.js`
```javascript
// Analytics wrapper - supports multiple providers
let analyticsInitialized = false;

export const initAnalytics = () => {
  if (analyticsInitialized) return;

  // Google Analytics 4
  if (import.meta.env.VITE_GA_MEASUREMENT_ID) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID);
  }

  // Can add other analytics providers here (Plausible, Umami, etc.)

  analyticsInitialized = true;
};

export const trackPageView = (path) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
      page_path: path,
    });
  }
};

export const trackEvent = (eventName, eventData = {}) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', eventName, eventData);
  }

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', eventName, eventData);
  }
};

// Common events
export const trackDownload = (appName, platform) => {
  trackEvent('download_click', {
    app_name: appName,
    platform: platform,
  });
};

export const trackFormSubmission = (formName) => {
  trackEvent('form_submission', {
    form_name: formName,
  });
};

export const trackLinkClick = (linkName, destination) => {
  trackEvent('link_click', {
    link_name: linkName,
    destination: destination,
  });
};
```

---

## 🔄 Updated Component Examples

### Example: Updated `Products.jsx` using config
```javascript
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APPS_DATA, APP_CATEGORIES, getAppsByCategory } from '../../../config/apps.config';

function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const filteredApps = getAppsByCategory(selectedCategory);

  return (
    <section id="products" className="py-24 px-4 sm:px-6 lg:px-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {APP_CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-gray-900 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* App Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredApps.map((app) => (
          <Link
            key={app.id}
            to={`/apps/${app.slug}`}
            className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all"
          >
            {/* App Card Content */}
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Products;
```

---

## 📝 Quick Commands Reference

### Create All Config Files at Once (PowerShell)
```powershell
# Navigate to your project
cd c:\Users\srira\Desktop\t25apps\Code\t25apps-landing

# Create config files
New-Item -ItemType File -Path "src\config\apps.config.js" -Force
New-Item -ItemType File -Path "src\config\seo.config.js" -Force
New-Item -ItemType File -Path "src\config\navigation.config.js" -Force
New-Item -ItemType File -Path "src\config\social.config.js" -Force
New-Item -ItemType File -Path "src\config\constants.js" -Force
New-Item -ItemType File -Path "src\config\index.js" -Force

# Create utility files
New-Item -ItemType File -Path "src\utils\seo.js" -Force
New-Item -ItemType File -Path "src\utils\analytics.js" -Force
New-Item -ItemType File -Path "src\utils\validation.js" -Force
New-Item -ItemType File -Path "src\utils\helpers.js" -Force
New-Item -ItemType File -Path "src\utils\index.js" -Force

# Create public files
New-Item -ItemType File -Path "public\robots.txt" -Force
New-Item -ItemType File -Path "public\sitemap.xml" -Force
New-Item -ItemType File -Path ".env.example" -Force
```

---

## ✅ Benefits of This Structure

1. **Scalability** - Easy to add new features without clutter
2. **Maintainability** - Clear separation of concerns
3. **Reusability** - Common components are easily accessible
4. **Team Collaboration** - Clear structure for multiple developers
5. **Testing** - Organized structure makes testing easier
6. **Performance** - Better for code splitting and lazy loading
7. **SEO** - Centralized SEO configuration
8. **Development Speed** - Know exactly where to find things

---

## 🎯 Priority: What to Move First

### Day 1:
1. Create config directory and files
2. Move app data to `apps.config.js`
3. Create SEO config

### Day 2:
1. Create utils directory
2. Create analytics utility
3. Set up .env.example

### Day 3:
1. Reorganize components into layout/sections/common
2. Update all imports

### Day 4:
1. Create public files (robots.txt, sitemap.xml)
2. Add favicon files
3. Test everything works

---

**Remember:** You don't have to do all of this at once! Start with the config files and gradually migrate to the new structure.

Refer to `IMPLEMENTATION_CHECKLIST.md` for step-by-step tasks!
