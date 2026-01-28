import { Helmet } from 'react-helmet-async';
import { siteConfig } from '../config/seo.config';

/**
 * SEO Component
 * Manages document head for SEO optimization
 * @param {Object} props - SEO configuration
 */
const SEO = ({ 
  title,
  description,
  keywords = [],
  image,
  url,
  type = 'website',
  author = siteConfig.author,
  structuredData
}) => {
  // Construct full title
  const fullTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  
  // Use defaults if not provided
  const metaDescription = description || siteConfig.description;
  const metaImage = image || siteConfig.ogImage;
  const metaUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
  const metaKeywords = keywords.length > 0 ? keywords.join(', ') : siteConfig.keywords.join(', ');

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="author" content={author} />
      <link rel="canonical" href={metaUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={metaUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:locale" content={siteConfig.locale} />

      {/* Twitter */}
      <meta name="twitter:card" content={siteConfig.twitterCard} />
      <meta name="twitter:url" content={metaUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
      {siteConfig.twitterHandle && (
        <meta name="twitter:creator" content={siteConfig.twitterHandle} />
      )}

      {/* Additional Meta Tags */}
      <meta name="language" content={siteConfig.language} />
      <meta name="robots" content="index, follow" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Structured Data (JSON-LD) */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
