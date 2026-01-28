/**
 * Apps Configuration
 * Central source of truth for all T25Apps products
 * 
 * Each app should have:
 * - Basic info (id, name, slug, tagline, description)
 * - Technical details (status, category, platforms)
 * - Links (website, github, stores)
 * - Media (icon, screenshots, colors)
 * - SEO data (meta title, description, keywords)
 * - Features list
 */

// Icon components for each app
export const AppIcons = {
  calendr: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  orbyte: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  recipediary: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  myinvestments: () => (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
}

export const apps = [
  {
    id: 1,
    name: 'Calendr',
    slug: 'calendr',
    tagline: 'Simplify Your Schedule',
    shortDescription: 'A simple to use calendar app that helps you stay organized and manage your tasks efficiently.',
    fullDescription: 'Calendr is a beautifully designed calendar and task management app that helps you stay organized without the complexity. Built with simplicity in mind, it combines a clean interface with powerful features to manage your daily schedule, tasks, and events seamlessly.',
    category: 'Productivity',
    status: 'available', // available, in-development, coming-soon
    platforms: ['Web', 'iOS', 'Android'],
    
    // Links
    website: 'https://calendr.t25apps.com',
    github: null, // Add if open source
    appStore: null, // Add when available
    playStore: null, // Add when available
    
    // Branding
    primaryColor: '#3B82F6', // blue-500
    accentColor: '#60A5FA', // blue-400
    icon: 'calendr', // References AppIcons
    
    // Features
    features: [
      'Clean, intuitive calendar interface',
      'Task management with priorities',
      'Event reminders and notifications',
      'Multiple calendar views (day, week, month)',
      'Dark mode support',
      'Cross-platform synchronization',
      'Recurring events support',
      'Share events with others'
    ],
    
    // Technical stack (for portfolio/about page)
    technologies: ['React', 'Node.js', 'MongoDB', 'Tailwind CSS'],

    // Media assets - Add your screenshots and demo video here
    screenshots: [
      // { id: 1, url: '/images/apps/calendr/screenshot-1.png', alt: 'Calendar view' },
      // { id: 2, url: '/images/apps/calendr/screenshot-2.png', alt: 'Task management' },
      // { id: 3, url: '/images/apps/calendr/screenshot-3.png', alt: 'Event details' },
    ],
    demoVideo: null, // Add video URL: '/videos/calendr-demo.mp4'
    demoPoster: null, // Add poster image for video
    
    // SEO
    seo: {
      title: 'Calendr - Simple Calendar & Task Management App | T25Apps',
      description: 'Stay organized with Calendr, a beautifully designed calendar and task management app. Manage your schedule, tasks, and events with ease.',
      keywords: ['calendar app', 'task management', 'schedule planner', 'productivity app', 'event organizer', 'calendr'],
      ogImage: '/images/apps/calendr-og.jpg',
    },
    
    // Launch date
    launchDate: '2025-12-15',
    lastUpdated: '2026-01-20',
  },
  
  {
    id: 2,
    name: 'Orbyte',
    slug: 'orbyte',
    tagline: 'Study Smarter, Not Harder',
    shortDescription: 'An innovative study guide for students to help them understand and learn faster.',
    fullDescription: 'Orbyte is an AI-powered study companion designed for students who want to learn more effectively. Using proven learning techniques and modern technology, Orbyte helps you create study guides, practice with flashcards, take notes, and track your progress across all subjects.',
    category: 'Education',
    status: 'in-development',
    platforms: ['Web', 'iOS', 'Android'],
    
    website: 'https://orbyte.t25apps.com',
    github: null,
    appStore: null,
    playStore: null,
    
    primaryColor: '#8B5CF6', // purple-500
    accentColor: '#A78BFA', // purple-400
    icon: 'orbyte',
    
    features: [
      'AI-powered study guide generation',
      'Spaced repetition flashcards',
      'Smart note-taking with organization',
      'Progress tracking and analytics',
      'Practice quizzes and tests',
      'Study session timer (Pomodoro)',
      'Subject-based organization',
      'Collaboration with study groups'
    ],
    
    technologies: ['React', 'TypeScript', 'Python', 'OpenAI', 'PostgreSQL'],

    // Media assets - Add your screenshots and demo video here
    screenshots: [],
    demoVideo: null,
    demoPoster: null,
    
    seo: {
      title: 'Orbyte - AI-Powered Study Guide & Learning App | T25Apps',
      description: 'Learn faster with Orbyte, an AI-powered study companion. Create study guides, practice with flashcards, and track your academic progress.',
      keywords: ['study app', 'learning app', 'flashcards', 'study guide', 'student app', 'education', 'orbyte'],
      ogImage: '/images/apps/orbyte-og.jpg',
    },
    
    launchDate: null, // Not launched yet
    lastUpdated: '2026-01-25',
  },
  
  {
    id: 3,
    name: 'RecipeDiary',
    slug: 'recipe-diary',
    tagline: 'Preserve Your Culinary Memories',
    shortDescription: 'A beautiful recipe app that helps you preserve and savor your favorite recipes from people you know.',
    fullDescription: 'RecipeDiary is more than just a recipe app - it\'s a digital cookbook that preserves the stories and memories behind your favorite dishes. Save recipes from family, friends, and loved ones, complete with photos, notes, and the stories that make each dish special.',
    category: 'Food & Lifestyle',
    status: 'in-development',
    platforms: ['Web', 'iOS', 'Android'],
    
    website: 'https://recipediary.t25apps.com',
    github: null,
    appStore: null,
    playStore: null,
    
    primaryColor: '#EF4444', // red-500
    accentColor: '#F87171', // red-400
    icon: 'recipediary',
    
    features: [
      'Beautiful recipe cards with photos',
      'Story and memory preservation',
      'Ingredient scaling calculator',
      'Shopping list generator',
      'Meal planning calendar',
      'Recipe sharing with family',
      'Dietary filters and tags',
      'Cook mode with step-by-step guidance'
    ],
    
    technologies: ['React', 'Firebase', 'Cloudinary', 'Tailwind CSS'],

    // Media assets - Add your screenshots and demo video here
    screenshots: [],
    demoVideo: null,
    demoPoster: null,
    
    seo: {
      title: 'RecipeDiary - Digital Recipe Book & Family Cookbook | T25Apps',
      description: 'Preserve your family recipes and culinary memories with RecipeDiary. A beautiful digital cookbook for storing recipes from loved ones.',
      keywords: ['recipe app', 'digital cookbook', 'family recipes', 'meal planner', 'cooking app', 'recipe diary'],
      ogImage: '/images/apps/recipediary-og.jpg',
    },
    
    launchDate: null,
    lastUpdated: '2026-01-22',
  },
  
  {
    id: 4,
    name: 'MyInvestments',
    slug: 'my-investments',
    tagline: 'Track Your Financial Journey',
    shortDescription: 'A simple to use investment tracker that helps you track your investments and plan your financial goals.',
    fullDescription: 'MyInvestments is a comprehensive portfolio tracking app that helps you monitor all your investments in one place. Track stocks, bonds, crypto, real estate, and more while getting insights into your financial performance and progress towards your goals.',
    category: 'Finance',
    status: 'in-development',
    platforms: ['Web', 'iOS', 'Android'],
    
    website: 'https://myinvestments.t25apps.com',
    github: null,
    appStore: null,
    playStore: null,
    
    primaryColor: '#10B981', // green-500
    accentColor: '#34D399', // green-400
    icon: 'myinvestments',
    
    features: [
      'Multi-asset portfolio tracking',
      'Real-time market data',
      'Performance analytics and charts',
      'Goal-based investing',
      'Dividend tracking',
      'Tax lot management',
      'News and market updates',
      'Portfolio diversification analysis'
    ],
    
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'Alpha Vantage API'],

    // Media assets - Add your screenshots and demo video here
    screenshots: [],
    demoVideo: null,
    demoPoster: null,
    
    seo: {
      title: 'MyInvestments - Portfolio Tracker & Investment Manager | T25Apps',
      description: 'Track all your investments in one place. Monitor stocks, crypto, and more with MyInvestments portfolio tracker.',
      keywords: ['investment tracker', 'portfolio management', 'stock tracker', 'crypto tracker', 'finance app', 'my investments'],
      ogImage: '/images/apps/myinvestments-og.jpg',
    },
    
    launchDate: null,
    lastUpdated: '2026-01-18',
  },
]

// Helper functions
export const getAppBySlug = (slug) => {
  return apps.find(app => app.slug === slug)
}

export const getAppById = (id) => {
  return apps.find(app => app.id === id)
}

export const getAvailableApps = () => {
  return apps.filter(app => app.status === 'available')
}

export const getInDevelopmentApps = () => {
  return apps.filter(app => app.status === 'in-development')
}

export const getAppsByCategory = (category) => {
  return apps.filter(app => app.category === category)
}

export const getAllCategories = () => {
  return [...new Set(apps.map(app => app.category))]
}

export default apps
