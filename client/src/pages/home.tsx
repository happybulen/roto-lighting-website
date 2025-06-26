import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import ExperienceSection from "@/components/experience-section";
import ProductsSection from "@/components/products-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import SEOHead from "@/components/seo-head";

export default function Home() {
  // Structured data for home page
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Roto Lighting",
    "alternateName": "Rotational Molding Pros",
    "url": "https://rotationalmoldingpros.com",
    "logo": "https://rotationalmoldingpros.com/logo.png",
    "description": "Professional rotational molding services with 40+ years of experience specializing in custom housings and commercial applications.",
    "foundingDate": "1980",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "82-579 Fleming Way Unit D",
      "addressLocality": "Indio",
      "addressRegion": "CA",
      "postalCode": "92201",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-760-238-1100",
      "contactType": "customer service",
      "email": "info@rotationalmoldingpros.com",
      "availableLanguage": "en"
    },
    "areaServed": "US",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Rotational Molding Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Rotational Molding",
            "description": "Custom plastic manufacturing using rotational molding techniques for commercial and industrial applications"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Commercial Housing Manufacturing",
            "description": "Precision commercial and industrial housing solutions with expert design and manufacturing"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "150"
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Roto Lighting - Custom Rotational Molding Services | 40+ Years Experience"
        description="Professional rotational molding services with 40+ years of experience. Custom housings, commercial applications, and precision manufacturing. Contact us for a quote today."
        keywords={[
          "rotational molding",
          "rotomolding",
          "custom plastic manufacturing",
          "commercial housings",
          "industrial molding",
          "plastic fabrication",
          "rotational molding services",
          "custom molding",
          "California rotomolding",
          "precision manufacturing"
        ]}
        canonicalUrl="https://rotationalmoldingpros.com/"
        structuredData={structuredData}
      />
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <ExperienceSection />
      <ProductsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
