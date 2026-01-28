import ReactGA from 'react-ga4';

let analyticsInitialized = false;

export const initAnalytics = () => {
  if (analyticsInitialized) return;
  
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (measurementId && import.meta.env.VITE_ENABLE_ANALYTICS !== 'false') {
    ReactGA.initialize(measurementId);
    analyticsInitialized = true;
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
