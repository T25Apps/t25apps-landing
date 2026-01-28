# T25Apps - Detailed Implementation To-Do List

**Start Date:** January 27, 2026  
**Target Completion (Phase 1):** February 10, 2026

This is your working document. Check off items as you complete them. Each task includes specific steps, code examples, and estimated time.

---

## 🎯 TODAY - Quick Setup (30-60 minutes)

### Task 1: Create Environment Configuration ⏱️ 5 min
- [ ] Create `.env.example` file in project root

```bash
# In PowerShell:
New-Item -ItemType File -Path ".env.example" -Force
```

Add this content:
```env
# Analytics
VITE_GA_MEASUREMENT_ID=
VITE_PLAUSIBLE_DOMAIN=

# Sentry (Error Tracking)
VITE_SENTRY_DSN=

# API Keys (if needed)
VITE_API_URL=
VITE_MAILCHIMP_API_KEY=
VITE_EMAILJS_SERVICE_ID=
VITE_EMAILJS_TEMPLATE_ID=
VITE_EMAILJS_PUBLIC_KEY=

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_BLOG=false
```

- [ ] Create actual `.env.local` file (copy from .env.example)
- [ ] Add `.env.local` to `.gitignore` (should already be there)

---

### Task 2: Create robots.txt ⏱️ 2 min
- [ ] Create `public/robots.txt`

```bash
New-Item -ItemType File -Path "public\robots.txt" -Force
```

Add this content:
```txt
User-agent: *
Allow: /

# Sitemap location
Sitemap: https://www.t25apps.com/sitemap.xml

# Crawl-delay (optional, helps with server load)
Crawl-delay: 1
```

**🔗 Reference:** [ASSESSMENT_AND_RECOMMENDATIONS.md](ASSESSMENT_AND_RECOMMENDATIONS.md) - Section 3.1

---

### Task 3: Create Basic Sitemap ⏱️ 5 min
- [ ] Create `public/sitemap.xml`

```bash
New-Item -ItemType File -Path "public\sitemap.xml" -Force
```

Add this content:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://www.t25apps.com/</loc>
    <lastmod>2026-01-27</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://www.t25apps.com/contribution</loc>
    <lastmod>2026-01-27</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <!-- Add more URLs as you create pages -->
</urlset>
```

**Note:** We'll make this dynamic later. For now, manual is fine.

---

### Task 4: Update Meta Tags in index.html ⏱️ 10 min
- [ ] Open `index.html`
- [ ] Replace the `<head>` section with enhanced meta tags

**File:** `index.html`

Replace:
```html
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>T25Apps - Innovative Apps for Everyone</title>
    <meta name="description" content="T25Apps showcases innovative mobile and web applications built to solve real-world problems." />
  </head>
```

With:
```html
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Primary Meta Tags -->
    <title>T25Apps - Innovative Mobile & Web Apps for Modern Life</title>
    <meta name="title" content="T25Apps - Innovative Mobile & Web Apps for Modern Life" />
    <meta name="description" content="Discover innovative mobile and web applications designed to solve real-world problems. From productivity tools to educational apps, explore our collection of beautifully crafted software." />
    <meta name="keywords" content="mobile apps, web apps, productivity apps, calendar app, study app, recipe app, investment tracker, t25apps" />
    <meta name="author" content="T25Apps" />
    <meta name="robots" content="index, follow" />
    
    <!-- Open Graph / Facebook -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://www.t25apps.com/" />
    <meta property="og:title" content="T25Apps - Innovative Mobile & Web Apps" />
    <meta property="og:description" content="Discover innovative mobile and web applications designed to solve real-world problems." />
    <meta property="og:image" content="https://www.t25apps.com/images/og-image.jpg" />
    <meta property="og:site_name" content="T25Apps" />
    
    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:url" content="https://www.t25apps.com/" />
    <meta property="twitter:title" content="T25Apps - Innovative Mobile & Web Apps" />
    <meta property="twitter:description" content="Discover innovative mobile and web applications designed to solve real-world problems." />
    <meta property="twitter:image" content="https://www.t25apps.com/images/og-image.jpg" />
    <meta name="twitter:site" content="@t25apps" />
    <meta name="twitter:creator" content="@t25apps" />
    
    <!-- Favicon - We'll replace these properly later -->
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <link rel="canonical" href="https://www.t25apps.com/" />
    
    <!-- Theme Color -->
    <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
    <meta name="theme-color" content="#ffffff" media="(prefers-color-scheme: light)" />
  </head>
```

---

### Task 5: Set Up Google Analytics ⏱️ 15 min
- [ ] Go to [Google Analytics](https://analytics.google.com/)
- [ ] Create new property for t25apps.com
- [ ] Get Measurement ID (starts with G-)
- [ ] Add to `.env.local`: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

- [ ] Install react-ga4:
```bash
npm install react-ga4
```

- [ ] Create `src/utils/analytics.js`:
```bash
mkdir src\utils
New-Item -ItemType File -Path "src\utils\analytics.js" -Force
```

Add this code:
```javascript
import ReactGA from 'react-ga4';

let analyticsInitialized = false;

export const initAnalytics = () => {
  if (analyticsInitialized) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (measurementId && import.meta.env.VITE_ENABLE_ANALYTICS !== 'false') {
    ReactGA.initialize(measurementId);
    analyticsInitialized = true;
    console.log('Analytics initialized');
  }
};

export const trackPageView = (path) => {
  if (analyticsInitialized) {
    ReactGA.send({ hitType: 'pageview', page: path });
  }
};

export const trackEvent = (category, action, label = '', value = 0) => {
  if (analyticsInitialized) {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};

// Convenience functions
export const trackDownload = (appName, platform) => {
  trackEvent('Download', 'click', `${appName} - ${platform}`);
};

export const trackFormSubmission = (formName) => {
  trackEvent('Form', 'submit', formName);
};

export const trackLinkClick = (linkName, destination) => {
  trackEvent('Link', 'click', `${linkName} -> ${destination}`);
};
```

- [ ] Update `src/main.jsx` to initialize analytics:

Add at the top:
```javascript
import { initAnalytics } from './utils/analytics'

// Initialize analytics
initAnalytics()
```

- [ ] Update `src/App.jsx` to track page views:

Add imports:
```javascript
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './utils/analytics'
```

Inside the App component:
```javascript
function App() {
  const location = useLocation()

  useEffect(() => {
    trackPageView(location.pathname)
  }, [location])

  return (
    // ... rest of component
  )
}
```

**🔗 Reference:** [ASSESSMENT_AND_RECOMMENDATIONS.md](ASSESSMENT_AND_RECOMMENDATIONS.md) - Section 2.4

---

### Task 6: Update README with Better Documentation ⏱️ 10 min
- [ ] Open `README.md`
- [ ] Add sections for:
  - Environment setup
  - Available scripts
  - Deployment instructions
  - Project status
  - Contributing guidelines

**File:** `README.md`

Add after the existing content:
```markdown

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `VITE_GA_MEASUREMENT_ID` - Google Analytics Measurement ID
- `VITE_ENABLE_ANALYTICS` - Set to `true` to enable analytics

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint (once configured)

## Deployment

This site is deployed on [Vercel/Netlify]. Automatic deployments happen on push to `main` branch.

### Manual Deployment

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting provider

## Project Status

✅ Core features complete
🚧 Individual app pages - In progress
📋 Blog section - Planned
📋 Newsletter integration - Planned

## Tech Stack

- **Framework:** React 18.2
- **Build Tool:** Vite 5.0
- **Styling:** Tailwind CSS 3.3
- **Routing:** React Router 6.20
- **Analytics:** Google Analytics 4

## Contributing

We're not accepting external contributions at this time, but feel free to fork the project for your own use.

## License

© 2026 T25Apps. All rights reserved.
```

---

### ✅ TODAY CHECKLIST - Verify Everything Works
- [ ] Run `npm install` to ensure new dependencies are installed
- [ ] Run `npm run dev` and check for errors
- [ ] Open http://localhost:5173 in browser
- [ ] Check browser console for any errors
- [ ] Open DevTools Network tab, verify analytics request (if GA configured)
- [ ] Verify dark mode toggle still works
- [ ] Test navigation between pages

**🎉 Congratulations! You've completed the quick setup.**

---

## 📅 WEEK 1 - Days 1-3: Project Structure & Configuration

### Day 1: Create Configuration Files ⏱️ 3-4 hours

#### Task 7: Create Directory Structure
```bash
# Create all directories at once
mkdir src\config, src\hooks, src\utils, src\services
mkdir src\components\common, src\components\layout, src\components\sections
mkdir src\pages\Home, src\pages\AppDetail, src\pages\Apps, src\pages\Privacy, src\pages\Terms, src\pages\NotFound
mkdir public\favicon, public\images
```

---

#### Task 8: Create apps.config.js ⏱️ 1 hour
- [ ] Create `src/config/apps.config.js`

```bash
New-Item -ItemType File -Path "src\config\apps.config.js" -Force
```

Add this complete configuration:

```javascript
export const APPS_DATA = [
  {
    id: 1,
    name: 'Calendr',
    slug: 'calendr',
    tagline: 'Simple Calendar, Smart Planning',
    shortDescription: 'A simple to use calendar app that helps you stay organized and manage your tasks efficiently.',
    description: `Calendr is your ultimate productivity companion, designed to simplify scheduling and task management. With an intuitive interface and powerful features, Calendr helps you organize your life effortlessly.
    
Whether you're managing work projects, personal appointments, or family events, Calendr provides all the tools you need in one beautiful app. Never miss an important meeting or deadline again with smart reminders and seamless synchronization across all your devices.

Built with modern design principles and user experience in mind, Calendr makes planning your day a pleasure rather than a chore.`,
    category: 'Productivity',
    status: 'available',
    platforms: ['web', 'ios', 'android'],
    website: 'https://calendr.t25apps.com',
    github: '', // Add if open source
    features: [
      {
        title: 'Smart Scheduling',
        description: 'AI-powered scheduling suggestions based on your habits',
        icon: 'calendar'
      },
      {
        title: 'Task Integration',
        description: 'Seamlessly integrate tasks with your calendar events',
        icon: 'check-circle'
      },
      {
        title: 'Cross-Device Sync',
        description: 'Access your calendar on all devices with real-time sync',
        icon: 'refresh'
      },
      {
        title: 'Smart Reminders',
        description: 'Never miss important events with intelligent notifications',
        icon: 'bell'
      },
      {
        title: 'Multiple Calendars',
        description: 'Organize different aspects of your life separately',
        icon: 'layers'
      },
      {
        title: 'Team Collaboration',
        description: 'Share calendars and coordinate with team members',
        icon: 'users'
      },
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    screenshots: [], // Add later
    video: '', // Add later
    downloadLinks: {
      web: 'https://calendr.t25apps.com',
      ios: '', // Add when available
      android: '', // Add when available
    },
    stats: {
      downloads: '1K+',
      rating: 4.8,
      reviews: 42,
    },
    pricing: {
      model: 'freemium',
      free: true,
      premium: {
        monthly: 4.99,
        yearly: 49.99,
      }
    },
    seo: {
      title: 'Calendr - Simple Calendar App for Productivity',
      description: 'Organize your life with Calendr, the beautiful calendar app with smart scheduling, task management, and seamless sync across all devices.',
      keywords: ['calendar app', 'task manager', 'productivity app', 'scheduling', 'calendar sync'],
    }
  },
  {
    id: 2,
    name: 'Orbyte',
    slug: 'orbyte',
    tagline: 'Your Smart Study Companion',
    shortDescription: 'An innovative study guide for students to help them understand and learn faster.',
    description: `Orbyte revolutionizes the way students learn by providing intelligent study tools and personalized learning experiences. Whether you're preparing for exams, mastering new concepts, or organizing study materials, Orbyte adapts to your learning style.

Our advanced algorithms help you identify knowledge gaps, create efficient study schedules, and retain information better through spaced repetition and active recall techniques.`,
    category: 'Education',
    status: 'in-development',
    platforms: ['web', 'ios', 'android'],
    website: 'https://orbyte.t25apps.com',
    features: [
      {
        title: 'Smart Flashcards',
        description: 'AI-powered flashcards that adapt to your learning pace',
        icon: 'book'
      },
      {
        title: 'Study Analytics',
        description: 'Track your progress and identify areas for improvement',
        icon: 'chart'
      },
      {
        title: 'Collaborative Learning',
        description: 'Share study materials and learn with classmates',
        icon: 'users'
      },
      {
        title: 'Spaced Repetition',
        description: 'Scientifically proven method for long-term retention',
        icon: 'clock'
      },
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    screenshots: [],
    downloadLinks: {},
    seo: {
      title: 'Orbyte - Smart Study App for Students',
      description: 'Master your subjects faster with Orbyte, the intelligent study companion with flashcards, analytics, and spaced repetition.',
      keywords: ['study app', 'flashcards', 'education', 'learning app', 'student tools'],
    }
  },
  {
    id: 3,
    name: 'RecipeDiary',
    slug: 'recipediary',
    tagline: 'Preserve Family Recipes, Forever',
    shortDescription: 'A beautiful recipe app that helps you preserve and savor your favorite recipes from people you know.',
    description: `RecipeDiary is more than just a recipe app—it's a digital heirloom for your family's culinary traditions. Save recipes from grandparents, parents, and friends, complete with their stories and memories.

Organize your collection, plan meals, generate shopping lists, and keep your family's food heritage alive for generations to come.`,
    category: 'Food & Cooking',
    status: 'in-development',
    platforms: ['web', 'ios', 'android'],
    website: 'https://recipediary.t25apps.com',
    features: [
      {
        title: 'Recipe Organization',
        description: 'Categorize and tag recipes for easy discovery',
        icon: 'folder'
      },
      {
        title: 'Story Preservation',
        description: 'Add notes and memories to each recipe',
        icon: 'heart'
      },
      {
        title: 'Meal Planning',
        description: 'Plan weekly meals and generate shopping lists',
        icon: 'calendar'
      },
      {
        title: 'Family Sharing',
        description: 'Share recipes with family members',
        icon: 'users'
      },
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    screenshots: [],
    downloadLinks: {},
    seo: {
      title: 'RecipeDiary - Preserve Family Recipes Forever',
      description: 'Keep your family\'s culinary heritage alive with RecipeDiary. Save, organize, and share cherished recipes with stories and memories.',
      keywords: ['recipe app', 'family recipes', 'meal planning', 'cooking app', 'recipe organizer'],
    }
  },
  {
    id: 4,
    name: 'MyInvestments',
    slug: 'myinvestments',
    tagline: 'Track, Analyze, Grow',
    shortDescription: 'A simple to use investment tracker that helps you track your investments and plan your financial goals.',
    description: `MyInvestments makes portfolio tracking simple and insightful. Monitor stocks, crypto, mutual funds, and more in one unified dashboard. Get real-time updates, performance analytics, and personalized insights to make informed investment decisions.

Whether you're a beginner or experienced investor, MyInvestments helps you stay on top of your financial goals with intuitive tools and clear visualizations.`,
    category: 'Finance',
    status: 'in-development',
    platforms: ['web', 'ios', 'android'],
    website: 'https://myinvestments.t25apps.com',
    features: [
      {
        title: 'Portfolio Tracking',
        description: 'Track multiple portfolios across different accounts',
        icon: 'briefcase'
      },
      {
        title: 'Real-time Updates',
        description: 'Get live price updates and market data',
        icon: 'refresh'
      },
      {
        title: 'Performance Analytics',
        description: 'Detailed charts and insights on your investments',
        icon: 'chart'
      },
      {
        title: 'Goal Planning',
        description: 'Set and track your financial goals',
        icon: 'target'
      },
    ],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    screenshots: [],
    downloadLinks: {},
    seo: {
      title: 'MyInvestments - Simple Investment Tracker',
      description: 'Track your investment portfolio with real-time updates, performance analytics, and goal planning. Stocks, crypto, and more.',
      keywords: ['investment tracker', 'portfolio management', 'stock tracker', 'crypto tracker', 'finance app'],
    }
  },
];

// Categories
export const APP_CATEGORIES = [
  'All',
  'Productivity',
  'Education',
  'Food & Cooking',
  'Finance',
  'Health & Fitness',
  'Entertainment',
];

// Status types
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

export const getAppById = (id) => {
  return APPS_DATA.find(app => app.id === id);
};

export const getAppsByCategory = (category) => {
  if (category === 'All') return APPS_DATA;
  return APPS_DATA.filter(app => app.category === category);
};

export const getAppsByStatus = (status) => {
  return APPS_DATA.filter(app => app.status === status);
};

export const getFeaturedApps = (count = 3) => {
  return APPS_DATA.filter(app => app.status === 'available').slice(0, count);
};

export const getAvailableApps = () => {
  return APPS_DATA.filter(app => app.status === 'available');
};

export const getInDevelopmentApps = () => {
  return APPS_DATA.filter(app => app.status === 'in-development');
};
```

**🔗 Reference:** [STRUCTURE_GUIDE.md](STRUCTURE_GUIDE.md) - Section "Sample File Contents"

---

#### Task 9: Create seo.config.js ⏱️ 30 min
- [ ] Create `src/config/seo.config.js`

```javascript
export const DEFAULT_SEO = {
  siteName: 'T25Apps',
  siteUrl: 'https://www.t25apps.com',
  defaultTitle: 'T25Apps - Innovative Mobile & Web Apps for Modern Life',
  titleTemplate: '%s | T25Apps',
  defaultDescription: 'Discover innovative mobile and web applications designed to solve real-world problems. From productivity tools to educational apps, explore our collection of beautifully crafted software.',
  
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'T25Apps',
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
  
  keywords: [
    'mobile apps',
    'web applications',
    'productivity tools',
    'educational apps',
    'finance apps',
    'recipe apps',
    't25apps',
  ],
};

export const getPageSEO = (page, customData = {}) => {
  const pages = {
    home: {
      title: 'T25Apps - Innovative Mobile & Web Apps for Modern Life',
      description: 'Discover innovative mobile and web applications designed to solve real-world problems. From productivity to education, we build apps that matter.',
      keywords: ['mobile apps', 'web apps', 'productivity apps', 'innovative software'],
    },
    apps: {
      title: 'Our Apps',
      description: 'Explore our collection of innovative apps designed to enhance your digital experience across productivity, education, finance, and more.',
      keywords: ['t25apps products', 'mobile applications', 'web applications'],
    },
    about: {
      title: 'About Us',
      description: 'Learn about T25Apps and our mission to create innovative applications that solve real-world problems and improve people\'s lives.',
      keywords: ['about t25apps', 'app development company', 'software company'],
    },
    contact: {
      title: 'Contact Us',
      description: 'Get in touch with the T25Apps team. We\'d love to hear from you and answer any questions about our apps.',
      keywords: ['contact t25apps', 'support', 'get in touch'],
    },
    contribution: {
      title: 'Support T25Apps',
      description: 'Support T25Apps in building innovative applications. Your contribution helps us continue developing great apps for everyone.',
      keywords: ['support t25apps', 'donate', 'contribute'],
    },
    privacy: {
      title: 'Privacy Policy',
      description: 'Read our privacy policy to understand how we collect, use, and protect your data across all T25Apps products.',
      keywords: ['privacy policy', 'data protection', 'user privacy'],
    },
    terms: {
      title: 'Terms of Service',
      description: 'Read our terms of service for using T25Apps products and services.',
      keywords: ['terms of service', 'user agreement', 'terms and conditions'],
    },
  };

  const pageData = pages[page] || {};
  
  return {
    title: customData.title || pageData.title || DEFAULT_SEO.defaultTitle,
    description: customData.description || pageData.description || DEFAULT_SEO.defaultDescription,
    keywords: customData.keywords || pageData.keywords || DEFAULT_SEO.keywords,
    canonical: customData.canonical || `${DEFAULT_SEO.siteUrl}${customData.path || '/'}`,
    openGraph: {
      ...DEFAULT_SEO.openGraph,
      title: customData.title || pageData.title || DEFAULT_SEO.defaultTitle,
      description: customData.description || pageData.description || DEFAULT_SEO.defaultDescription,
      url: customData.canonical || `${DEFAULT_SEO.siteUrl}${customData.path || '/'}`,
      ...(customData.image && {
        images: [{
          url: customData.image,
          width: 1200,
          height: 630,
          alt: customData.title || pageData.title,
        }],
      }),
    },
  };
};

// Helper to generate app-specific SEO
export const getAppSEO = (app) => {
  if (!app) return DEFAULT_SEO;
  
  return {
    title: app.seo?.title || `${app.name} - ${app.tagline}`,
    description: app.seo?.description || app.shortDescription,
    keywords: app.seo?.keywords || [app.name, app.category, 'app', 'mobile app'],
    canonical: `${DEFAULT_SEO.siteUrl}/apps/${app.slug}`,
    openGraph: {
      ...DEFAULT_SEO.openGraph,
      type: 'website',
      title: `${app.name} - ${app.tagline}`,
      description: app.shortDescription,
      url: `${DEFAULT_SEO.siteUrl}/apps/${app.slug}`,
    },
  };
};
```

---

#### Task 10: Create navigation.config.js ⏱️ 15 min
- [ ] Create `src/config/navigation.config.js`

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
      { label: 'About Us', path: '/', anchor: 'about' },
      { label: 'Contact', path: '/', anchor: 'contact' },
      { label: 'Contribute', path: '/contribution' },
    ],
  },
  products: {
    title: 'Products',
    links: [
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
};
```

---

#### Task 11: Create constants.js ⏱️ 10 min
- [ ] Create `src/config/constants.js`

```javascript
export const COMPANY_NAME = 'T25Apps';
export const COMPANY_EMAIL = 'contact@t25apps.com';
export const COMPANY_WEBSITE = 'https://www.t25apps.com';

export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/t25apps',
  facebook: 'https://facebook.com/t25apps',
  instagram: 'https://instagram.com/t25apps',
  linkedin: 'https://linkedin.com/company/t25apps',
  github: 'https://github.com/t25apps',
};

export const APP_VERSION = '1.0.0';

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
};
```

---

#### Task 12: Create index.js for config exports ⏱️ 5 min
- [ ] Create `src/config/index.js`

```javascript
export * from './apps.config';
export * from './seo.config';
export * from './navigation.config';
export * from './constants';
```

---

### ✅ Day 1 Checklist
- [ ] All config files created
- [ ] No errors when importing from config files
- [ ] Run `npm run dev` and verify no errors
- [ ] Commit changes: `git add . && git commit -m "feat: add configuration files"`

---

### Day 2: Update Components to Use Config ⏱️ 4-5 hours

#### Task 13: Update Products Component ⏱️ 45 min
- [ ] Open `src/components/Products.jsx`
- [ ] Add import at top:

```javascript
import { APPS_DATA, APP_CATEGORIES, getAppsByCategory } from '../config/apps.config';
import { useState } from 'react';
```

- [ ] Replace the hardcoded `apps` array with `APPS_DATA`
- [ ] Add category filter (see STRUCTURE_GUIDE.md for complete example)
- [ ] Update the mapping to use config data
- [ ] Test that all apps display correctly

**Key changes:**
1. Remove hardcoded app data
2. Import from config
3. Use helper functions
4. Update routing to use slug

---

#### Task 14: Update Footer Component ⏱️ 30 min
- [ ] Open `src/components/Footer.jsx`
- [ ] Add imports:

```javascript
import { FOOTER_LINKS, SOCIAL_LINKS, COMPANY_NAME, COMPANY_EMAIL } from '../config';
```

- [ ] Replace hardcoded social links with `SOCIAL_LINKS`
- [ ] Replace footer menu with `FOOTER_LINKS`
- [ ] Replace company name/email with constants

---

#### Task 15: Update Navbar Component ⏱️ 30 min
- [ ] Open `src/components/Navbar.jsx`
- [ ] Import NAV_ITEMS:

```javascript
import { NAV_ITEMS } from '../config';
```

- [ ] Replace hardcoded `navItems` with `NAV_ITEMS`

---

### Day 3: Create Individual App Pages ⏱️ 5-6 hours

This is a BIG task - create the app detail page that will showcase each app.

#### Task 16: Create AppDetail Page Component ⏱️ 3 hours
- [ ] Create `src/pages/AppDetail/index.jsx`

```bash
New-Item -ItemType Directory -Path "src\pages\AppDetail" -Force
New-Item -ItemType File -Path "src\pages\AppDetail\index.jsx" -Force
```

Add this complete component:

```javascript
import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getAppBySlug } from '../../config';
import { trackDownload } from '../../utils/analytics';

function AppDetail() {
  const { slug } = useParams();
  const app = getAppBySlug(slug);

  if (!app) {
    return <Navigate to="/404" replace />;
  }

  const handleDownloadClick = (platform) => {
    trackDownload(app.name, platform);
  };

  const isAvailable = app.status === 'available';
  const isInDevelopment = app.status === 'in-development';

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: App Info */}
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-sm font-medium mb-4">
                <span className={`flex h-2 w-2 rounded-full mr-2 ${
                  isAvailable ? 'bg-green-500' : 'bg-yellow-500'
                }`}></span>
                {app.status === 'available' ? 'Available Now' : 'In Development'}
              </div>

              <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {app.name}
              </h1>
              
              <p className="text-2xl text-gray-600 dark:text-gray-400 mb-6">
                {app.tagline}
              </p>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {app.shortDescription}
              </p>

              {/* Download Buttons */}
              <div className="flex flex-wrap gap-4">
                {isAvailable ? (
                  <>
                    {app.downloadLinks.web && (
                      <a
                        href={app.downloadLinks.web}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDownloadClick('web')}
                        className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        Open Web App
                      </a>
                    )}
                    {app.downloadLinks.ios && (
                      <a
                        href={app.downloadLinks.ios}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDownloadClick('ios')}
                        className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        Download for iOS
                      </a>
                    )}
                    {app.downloadLinks.android && (
                      <a
                        href={app.downloadLinks.android}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => handleDownloadClick('android')}
                        className="inline-flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        Download for Android
                      </a>
                    )}
                  </>
                ) : (
                  <Link
                    to="/contribution"
                    className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                  >
                    Support Development
                  </Link>
                )}
              </div>

              {/* Stats */}
              {isAvailable && app.stats && (
                <div className="mt-8 flex gap-8">
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {app.stats.rating}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Rating</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {app.stats.downloads}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Downloads</div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      {app.stats.reviews}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: App Icon/Image */}
            <div className="flex justify-center">
              <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-3xl flex items-center justify-center text-gray-900 dark:text-white shadow-2xl">
                <div className="scale-150">
                  {app.icon}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Description */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            About {app.name}
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line">
              {app.description}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {app.features.map((feature, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700"
              >
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mb-4 text-gray-900 dark:text-white">
                  {/* You can add feature icons here */}
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {isAvailable ? `Ready to try ${app.name}?` : `Excited about ${app.name}?`}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            {isAvailable 
              ? `Join thousands of users already using ${app.name}` 
              : `Support us to bring ${app.name} to life faster`
            }
          </p>
          {isAvailable ? (
            <a
              href={app.downloadLinks.web || app.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => handleDownloadClick('web')}
              className="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
            >
              Get Started Free
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          ) : (
            <Link
              to="/contribution"
              className="inline-flex items-center px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
            >
              Support Development
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}

export default AppDetail;
```

---

#### Task 17: Add Route for App Detail Page ⏱️ 10 min
- [ ] Open `src/App.jsx`
- [ ] Import the AppDetail component:

```javascript
import AppDetail from './pages/AppDetail'
```

- [ ] Add route inside `<Routes>`:

```javascript
<Route path="/apps/:slug" element={<AppDetail />} />
```

---

#### Task 18: Update Products Links to New Route ⏱️ 15 min
- [ ] Open `src/components/Products.jsx`
- [ ] Update the links to use `/apps/:slug` instead of `/in-development/:appName`

Change from:
```javascript
const linkUrl = isInDevelopment 
  ? `/in-development/${encodeURIComponent(app.name)}`
  : app.link
```

To:
```javascript
const linkUrl = `/apps/${app.slug}`
```

And change:
```javascript
const LinkComponent = isInDevelopment ? Link : 'a'
const linkProps = isInDevelopment 
  ? { to: linkUrl }
  : { href: linkUrl, target: '_blank', rel: 'noopener noreferrer' }
```

To:
```javascript
const LinkComponent = Link
const linkProps = { to: linkUrl }
```

---

#### Task 19: Create 404 Not Found Page ⏱️ 30 min
- [ ] Create `src/pages/NotFound/index.jsx`

```bash
New-Item -ItemType Directory -Path "src\pages\NotFound" -Force
New-Item -ItemType File -Path "src\pages\NotFound\index.jsx" -Force
```

```javascript
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800 mb-4">
          404
        </h1>
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Sorry, the page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Back to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
```

- [ ] Add 404 route to `App.jsx`:

```javascript
import NotFound from './pages/NotFound'

// In Routes:
<Route path="*" element={<NotFound />} />
```

---

### ✅ Day 2-3 Checklist
- [ ] All components updated to use config
- [ ] App detail pages work for all apps
- [ ] Navigation works correctly
- [ ] 404 page displays for invalid routes
- [ ] Test clicking on each app from home page
- [ ] Test direct URL access: `/apps/calendr`, `/apps/orbyte`, etc.
- [ ] Commit: `git add . && git commit -m "feat: add app detail pages and update components"`

---

## 📅 WEEK 1 - Days 4-7: Performance & SEO

### Day 4: Image Lazy Loading & Code Splitting ⏱️ 3-4 hours

#### Task 20: Add React Lazy Loading for Routes ⏱️ 1 hour
- [ ] Update `src/App.jsx` to lazy load route components

Replace imports:
```javascript
import Contribution from './pages/Contribution'
import InDevelopment from './pages/InDevelopment'
import AppDetail from './pages/AppDetail'
import NotFound from './pages/NotFound'
```

With:
```javascript
import { lazy, Suspense } from 'react'

// Lazy load pages
const Contribution = lazy(() => import('./pages/Contribution'))
const InDevelopment = lazy(() => import('./pages/InDevelopment'))
const AppDetail = lazy(() => import('./pages/AppDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))
```

- [ ] Wrap Routes in Suspense:

```javascript
<Suspense fallback={
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
  </div>
}>
  <Routes>
    {/* ... your routes */}
  </Routes>
</Suspense>
```

**🔗 Reference:** [ASSESSMENT_AND_RECOMMENDATIONS.md](ASSESSMENT_AND_RECOMMENDATIONS.md) - Section 9

---

#### Task 21: Add Loading Skeleton Component ⏱️ 1 hour
- [ ] Create `src/components/common/Loading/Skeleton.jsx`

```bash
mkdir src\components\common
mkdir src\components\common\Loading
New-Item -ItemType File -Path "src\components\common\Loading\Skeleton.jsx" -Force
```

```javascript
import React from 'react';

export function Skeleton({ className = '', variant = 'rectangular' }) {
  const baseClasses = 'animate-pulse bg-gray-200 dark:bg-gray-700';
  
  const variantClasses = {
    rectangular: 'rounded',
    circular: 'rounded-full',
    text: 'rounded h-4',
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`} />
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
      <Skeleton variant="circular" className="w-12 h-12 mb-4" />
      <Skeleton variant="text" className="w-3/4 mb-2" />
      <Skeleton variant="text" className="w-full mb-2" />
      <Skeleton variant="text" className="w-5/6" />
    </div>
  );
}

export default Skeleton;
```

---

#### Task 22: Optimize Images ⏱️ 1 hour
- [ ] Install image optimization plugin:

```bash
npm install -D vite-plugin-imagemin
```

- [ ] Update `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteImagemin from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        quality: [0.8, 0.9],
        speed: 4,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
})
```

**Note:** This plugin runs during build. Test with `npm run build`

---

### Day 5: Install react-helmet-async for Dynamic SEO ⏱️ 2-3 hours

#### Task 23: Install and Configure react-helmet-async ⏱️ 30 min
- [ ] Install:

```bash
npm install react-helmet-async
```

- [ ] Update `src/main.jsx`:

```javascript
import { HelmetProvider } from 'react-helmet-async'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HelmetProvider>
  </React.StrictMode>,
)
```

---

#### Task 24: Create SEO Component ⏱️ 1 hour
- [ ] Create `src/components/common/SEO/index.jsx`

```bash
New-Item -ItemType Directory -Path "src\components\common\SEO" -Force
New-Item -ItemType File -Path "src\components\common\SEO\index.jsx" -Force
```

```javascript
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DEFAULT_SEO } from '../../../config/seo.config';

export default function SEO({ 
  title, 
  description, 
  canonical, 
  keywords,
  image,
  type = 'website',
  noindex = false,
  nofollow = false,
}) {
  const seo = {
    title: title || DEFAULT_SEO.defaultTitle,
    description: description || DEFAULT_SEO.defaultDescription,
    canonical: canonical || DEFAULT_SEO.siteUrl,
    keywords: keywords || DEFAULT_SEO.keywords.join(', '),
    image: image || DEFAULT_SEO.openGraph.images[0].url,
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seo.title}</title>
      <meta name="title" content={seo.title} />
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      {(noindex || nofollow) && (
        <meta 
          name="robots" 
          content={`${noindex ? 'noindex' : ''}${noindex && nofollow ? ',' : ''}${nofollow ? 'nofollow' : ''}`} 
        />
      )}
      <link rel="canonical" href={seo.canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={seo.canonical} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:site_name" content={DEFAULT_SEO.siteName} />

      {/* Twitter */}
      <meta property="twitter:card" content={DEFAULT_SEO.twitter.cardType} />
      <meta property="twitter:url" content={seo.canonical} />
      <meta property="twitter:title" content={seo.title} />
      <meta property="twitter:description" content={seo.description} />
      <meta property="twitter:image" content={seo.image} />
      <meta name="twitter:site" content={DEFAULT_SEO.twitter.site} />
      <meta name="twitter:creator" content={DEFAULT_SEO.twitter.handle} />
    </Helmet>
  );
}
```

---

#### Task 25: Add SEO to AppDetail Page ⏱️ 30 min
- [ ] Open `src/pages/AppDetail/index.jsx`
- [ ] Import SEO component and helper:

```javascript
import SEO from '../../components/common/SEO';
import { getAppSEO } from '../../config/seo.config';
```

- [ ] Add SEO component at the top of the return statement:

```javascript
const appSEO = getAppSEO(app);

return (
  <div className="min-h-screen bg-white dark:bg-gray-950">
    <SEO
      title={appSEO.title}
      description={appSEO.description}
      keywords={appSEO.keywords.join(', ')}
      canonical={appSEO.canonical}
      image={appSEO.openGraph.images?.[0]?.url}
    />
    {/* Rest of component */}
  </div>
);
```

---

### ✅ Week 1 Complete! Test Everything
- [ ] Run `npm run dev` - No errors
- [ ] Test all pages load correctly
- [ ] Check Network tab - verify analytics, no 404s
- [ ] Test lazy loading (Network tab, see chunks load)
- [ ] Test app detail pages
- [ ] View page source - verify meta tags
- [ ] Test social share preview: https://www.opengraph.xyz/
- [ ] Commit: `git add . && git commit -m "feat: add lazy loading, SEO, and performance optimizations"`

**🎉 Week 1 Complete! You now have:**
- ✅ Better project structure
- ✅ Centralized configuration
- ✅ Individual app pages
- ✅ Dynamic SEO
- ✅ Performance optimizations
- ✅ Analytics tracking

---

## 📅 WEEK 2: Deploy & Measure

### Day 8: Prepare for Deployment ⏱️ 2-3 hours

#### Task 26: Create Production Build ⏱️ 15 min
- [ ] Test production build:

```bash
npm run build
npm run preview
```

- [ ] Check `dist` folder size
- [ ] Test in preview mode
- [ ] Fix any build errors

---

#### Task 27: Deploy to Vercel ⏱️ 30 min
- [ ] Go to [vercel.com](https://vercel.com)
- [ ] Sign up / Sign in with GitHub
- [ ] Click "New Project"
- [ ] Import your t25apps-landing repository
- [ ] Configure:
  - Framework Preset: Vite
  - Build Command: `npm run build`
  - Output Directory: `dist`
- [ ] Add environment variables from `.env.local`
- [ ] Click Deploy
- [ ] Wait for deployment (~2 min)
- [ ] Visit your new URL!

---

#### Task 28: Set Up Custom Domain (Optional) ⏱️ 15 min
- [ ] In Vercel dashboard, go to project Settings
- [ ] Click Domains
- [ ] Add your domain (e.g., t25apps.com)
- [ ] Follow DNS configuration instructions
- [ ] Wait for DNS propagation (can take up to 24 hours)

---

### Day 9: Set Up Monitoring ⏱️ 2 hours

#### Task 29: Set Up Google Search Console ⏱️ 30 min
- [ ] Go to [search.google.com/search-console](https://search.google.com/search-console)
- [ ] Add property (your domain)
- [ ] Verify ownership (Vercel makes this easy)
- [ ] Submit sitemap: `https://yourdomain.com/sitemap.xml`
- [ ] Wait 24-48 hours for indexing to start

---

#### Task 30: Set Up Error Tracking with Sentry (Optional) ⏱️ 45 min
- [ ] Go to [sentry.io](https://sentry.io)
- [ ] Sign up for free account
- [ ] Create new project (React)
- [ ] Get DSN
- [ ] Install:

```bash
npm install @sentry/react
```

- [ ] Create `src/utils/sentry.js`:

```javascript
import * as Sentry from '@sentry/react';

export const initSentry = () => {
  if (import.meta.env.VITE_SENTRY_DSN && import.meta.env.PROD) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      integrations: [
        new Sentry.BrowserTracing(),
        new Sentry.Replay(),
      ],
      tracesSampleRate: 1.0,
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0,
    });
  }
};
```

- [ ] Update `src/main.jsx`:

```javascript
import { initSentry } from './utils/sentry'
initSentry()
```

---

### ✅ Final Week 2 Checklist
- [ ] Site is live and accessible
- [ ] Analytics tracking works
- [ ] Google Search Console configured
- [ ] Error tracking configured (optional)
- [ ] All pages load correctly in production
- [ ] Mobile responsive
- [ ] Dark mode works
- [ ] All links work

---

## 🎉 CONGRATULATIONS!

You've completed Phase 1! Your site now has:

### ✅ What You've Accomplished:
1. **Project Structure** - Organized, scalable architecture
2. **Configuration** - Centralized app data and settings
3. **Individual App Pages** - Showcase each app properly
4. **SEO Optimization** - Meta tags, Open Graph, Twitter Cards
5. **Performance** - Lazy loading, code splitting, image optimization
6. **Analytics** - Track user behavior
7. **Live Deployment** - Your site is on the internet!
8. **Monitoring** - Search Console and error tracking

### 📊 Measure Your Success:
- Check Google Analytics after 1 week
- Monitor Search Console for indexed pages
- Test page speed: https://pagespeed.web.dev/
- Check mobile friendliness
- Share on social media and check preview

---

## 🚀 NEXT STEPS (Phase 2)

Ready to continue? Start Phase 2 in Week 3:

1. **Structured Data (JSON-LD)** - Help search engines understand your content
2. **Content Enhancement** - Write detailed app descriptions
3. **Newsletter Integration** - Collect email addresses
4. **Form Validation** - Better contact forms
5. **Accessibility** - WCAG compliance

**See [IMPLEMENTATION_CHECKLIST.md](IMPLEMENTATION_CHECKLIST.md) for Phase 2 tasks**

---

## 📚 Quick Reference

### Important Files Created:
- `.env.example` - Environment variables template
- `public/robots.txt` - Search engine instructions
- `public/sitemap.xml` - Page listing for search engines
- `src/config/apps.config.js` - All app data
- `src/config/seo.config.js` - SEO configurations
- `src/config/navigation.config.js` - Navigation menus
- `src/config/constants.js` - App constants
- `src/utils/analytics.js` - Analytics wrapper
- `src/components/common/SEO/index.jsx` - SEO component
- `src/pages/AppDetail/index.jsx` - App detail page
- `src/pages/NotFound/index.jsx` - 404 page

### Key Commands:
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
git status           # Check what changed
git add .            # Stage all changes
git commit -m "msg"  # Commit changes
git push             # Push to GitHub
```

### Useful Links:
- **Google Analytics:** https://analytics.google.com/
- **Google Search Console:** https://search.google.com/search-console
- **Vercel Dashboard:** https://vercel.com/dashboard
- **PageSpeed Insights:** https://pagespeed.web.dev/
- **Open Graph Preview:** https://www.opengraph.xyz/

---

**Good luck! You've got this! 🚀**

**Questions?** Refer to the main assessment docs or ask for help!
