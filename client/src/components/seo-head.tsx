import { useEffect } from "react";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  articleData?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  structuredData?: object;
}

export default function SEOHead({
  title = "Roto Lighting - Custom Rotational Molding Services | 40+ Years Experience",
  description = "Professional rotational molding services with 40+ years of experience. Custom housings, commercial applications, and precision manufacturing. Contact us for a quote today.",
  keywords = ["rotational molding", "rotomolding", "custom plastic manufacturing", "commercial housings", "industrial molding"],
  canonicalUrl = "https://rotationalmoldingpros.com/",
  ogImage = "https://rotationalmoldingpros.com/og-image.jpg",
  ogType = "website",
  articleData,
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    // Update title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? "property" : "name";
      let meta = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    // Basic meta tags
    updateMetaTag("description", description);
    updateMetaTag("keywords", keywords.join(", "));

    // Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:url", canonicalUrl, true);
    updateMetaTag("og:image", ogImage, true);
    updateMetaTag("og:type", ogType, true);
    updateMetaTag("og:site_name", "Roto Lighting", true);

    // Twitter tags
    updateMetaTag("twitter:title", title, true);
    updateMetaTag("twitter:description", description, true);
    updateMetaTag("twitter:image", ogImage, true);
    updateMetaTag("twitter:card", "summary_large_image", true);

    // Article-specific tags
    if (articleData && ogType === "article") {
      if (articleData.publishedTime) {
        updateMetaTag("article:published_time", articleData.publishedTime, true);
      }
      if (articleData.modifiedTime) {
        updateMetaTag("article:modified_time", articleData.modifiedTime, true);
      }
      if (articleData.author) {
        updateMetaTag("article:author", articleData.author, true);
      }
      if (articleData.section) {
        updateMetaTag("article:section", articleData.section, true);
      }
      if (articleData.tags) {
        articleData.tags.forEach(tag => {
          const meta = document.createElement("meta");
          meta.setAttribute("property", "article:tag");
          meta.content = tag;
          document.head.appendChild(meta);
        });
      }
    }

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalUrl;

    // Update structured data
    if (structuredData) {
      let script = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "dynamic-structured-data";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(structuredData);
    }

    // Cleanup function to remove dynamic tags when component unmounts
    return () => {
      const dynamicScript = document.querySelector('script[type="application/ld+json"]#dynamic-structured-data');
      if (dynamicScript) {
        dynamicScript.remove();
      }

      // Remove dynamic article tags
      if (articleData?.tags) {
        const articleTags = document.querySelectorAll('meta[property="article:tag"]');
        articleTags.forEach(tag => tag.remove());
      }
    };
  }, [title, description, keywords, canonicalUrl, ogImage, ogType, articleData, structuredData]);

  return null; // This component doesn't render anything
}