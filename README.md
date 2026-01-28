# T25Apps Landing Page

A modern, responsive landing page for t25apps.com built with React, Tailwind CSS, and Vite.

## Features

- **Hero Section**: Eye-catching introduction to T25Apps
- **About Us**: Information about the company and values
- **Products**: Showcase of apps with status indicators
- **Contact**: Contact form and information
- **Contribution Page**: Support and donation page
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Beautiful gradients and smooth animations

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
npm run build
```

The build files will be in the `dist` directory, ready to be deployed to any static hosting service.

### Preview Production Build

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
t25apps-landing/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Products.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   └── pages/
│       └── Contribution.jsx
└── README.md
```

## Customization

### Updating App Information

Edit the `src/components/Products.jsx` file to update the apps showcase.

### Changing Colors

Modify the Tailwind color classes throughout the components, or update the `tailwind.config.js` file to customize the color palette.

### Adding Real Form Functionality

Currently, forms are static. To add real form submission:

1. **Contact Form**: Integrate with a service like:
   - Formspree
   - EmailJS
   - Netlify Forms
   - Custom backend API

2. **Contribution Form**: Integrate with a payment processor like:
   - Stripe
   - PayPal
   - Square
   - Custom payment gateway

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

Required variables:
- `VITE_GA_MEASUREMENT_ID` - Google Analytics Measurement ID
- `VITE_ENABLE_ANALYTICS` - Set to `true` to enable analytics

## Project Status

✅ Core features complete
🚧 Individual app pages - In progress
🚧 SEO optimization - In progress
📋 Blog section - Planned
📋 Newsletter integration - Planned

## Deployment

This is a static website that can be deployed to:

- **Netlify**: Connect your Git repository or drag and drop the `dist` folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Use GitHub Actions to build and deploy
- **AWS S3 + CloudFront**: Upload `dist` folder to S3 bucket
- **Any static hosting service**

## Technologies Used

- React 18
- React Router DOM
- Tailwind CSS
- Vite
- JavaScript (ES6+)

## License

This project is private and proprietary to T25Apps.

