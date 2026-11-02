export interface SiteConfig {
  personal: {
    fullName: string;
    title: string;
    tagline: string;
    headline: string;
    subheadline: string;
    location: string;
    country: string;
    email: string;
    whatsappNumber: string; // international format e.g. 2348012345678
    whatsappWelcomeMessage: string;
    linkedinUrl: string;
    instagramUrl: string;
  };
  about: {
    heading: string;
    leadParagraph: string;
    paragraphs: string[];
    focusAreas: string[];
  };
  approach: {
    heading: string;
    subheading: string;
    principles: {
      number: string;
      title: string;
      description: string;
      detail: string;
    }[];
  };
  leadership: {
    eyebrow: string;
    role: string;
    companyName: string;
    headline: string;
    supportingMessage: string;
    paragraphs: string[];
    companyUrl: string;
    corePillars: {
      title: string;
      description: string;
    }[];
  };
  exploreBusiness: {
    eyebrow: string;
    headline: string;
    supportingText: string;
    companyUrl: string;
    primaryCtaText: string;
    secondaryCtaText: string;
  };
  futureModules: {
    listingsEnabled: boolean;
    projectsEnabled: boolean;
    inspectionVideosEnabled: boolean;
    testimonialsEnabled: boolean;
    marketInsightsEnabled: boolean;
    mediaFeaturesEnabled: boolean;
  };
}

export interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}

// Schemas prepared for future expansion without redesigning
export interface PropertyListing {
  id: string;
  title: string;
  location: string;
  type: 'Residential' | 'Commercial' | 'Land' | 'Advisory';
  summary: string;
  status: 'Available' | 'Under Offer' | 'Completed';
}

export interface MarketInsightArticle {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
}

export interface PropertyVideo {
  id: string;
  title: string;
  location: string;
  videoUrl: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  role: string;
  statement: string;
}
