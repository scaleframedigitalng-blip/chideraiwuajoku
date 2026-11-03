import { SiteConfig, PartnerBrand } from '../types/content';

export const INITIAL_PARTNER_BRANDS: PartnerBrand[] = [
  {
    id: 'partner_teamfocus',
    name: 'Teamfocus Realtors Group',
    logoUrl: '/assets/aistudio/images__5_-removebg-preview_c5d0f405.png',
    showName: true,
  },
  {
    id: 'partner_abode',
    name: 'Abode',
    logoUrl: '/assets/aistudio/images__4_-removebg-preview_bf1c3c2a.png',
    showName: true,
  },
  {
    id: 'partner_psp',
    name: 'PSP',
    logoUrl: '/assets/aistudio/logo-removebg-preview_1432acc0.png',
    showName: true,
  },
];

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  personal: {
    fullName: "Chidera Iwuajoku",
    title: "Real Estate Consultant",
    tagline: "Nigeria",
    headline: "Helping You Make Informed Real Estate Decisions.",
    subheadline:
      "Providing thoughtful guidance and informed perspectives to individuals navigating property acquisition and real estate opportunities.",
    location: "Lagos & Regional Nigeria",
    country: "Nigeria",
    email: "iwuajokuchidera64@gmail.com",
    whatsappNumber: "2348000000000", // placeholder until updated
    whatsappWelcomeMessage:
      "Hello Chidera, I came across your website and would like to speak regarding real estate advisory in Nigeria.",
    linkedinUrl: "https://www.linkedin.com/in/chidera-iwuajoku",
    instagramUrl: "https://www.instagram.com/chideraiwuajoku",
  },
  about: {
    heading: "An Informed Approach to Real Estate.",
    leadParagraph:
      "I am Chidera Iwuajoku, a Real Estate Consultant operating within Nigeria's evolving property landscape. My practice is built on a straightforward conviction: property decisions of any magnitude deserve thorough research, balanced counsel, and undivided attention.",
    paragraphs: [
      "Navigating property acquisition—whether for private residential purposes, capital preservation, or long-term investment—often involves navigating ambiguous information, complex documentation, and varying market valuations. My role is to bring clarity to this process.",
      "Rather than prioritizing transaction velocity, my work centers on patient due diligence, genuine market inquiry, and direct advocacy for the individuals I advise. Every property opportunity is assessed with an analytical eye toward location fundamentals, title integrity, and genuine value.",
      "My commitment is to foster enduring professional relationships rooted in discretion, factual transparency, and honest communication at every milestone of your real estate journey.",
    ],
    focusAreas: [
      "Residential Advisory",
      "Property Acquisition Due Diligence",
      "Market Inquiry & Valuation Perspectives",
      "Client Representation & Consultation",
    ],
  },
  approach: {
    heading: "How I Approach Real Estate.",
    subheading:
      "Three guiding principles govern every consultation, client engagement, and property assessment.",
    principles: [
      {
        number: "01",
        title: "Trust & Transparency",
        description:
          "Clear communication, honest guidance and transparency throughout the property acquisition process.",
        detail:
          "Integrity precedes every recommendation. You receive unbiased assessments—including candid counsel when a property or timing does not serve your best interests.",
      },
      {
        number: "02",
        title: "Knowledge & Research",
        description:
          "Understanding property opportunities, evaluating relevant information and encouraging informed decisions.",
        detail:
          "Property decisions require ground-level insight, documentation scrutiny, and market context. I synthesize relevant factors so you make choices with confidence.",
      },
      {
        number: "03",
        title: "Client Relationships",
        description:
          "Understanding individual objectives and providing guidance that aligns with each client's property needs.",
        detail:
          "Every individual has specific risk tolerances, lifestyle aspirations, and financial timelines. Advisory is calibrated to your distinct priorities rather than generic templates.",
      },
    ],
  },
  partnerships: {
    heading: "Partnering With",
    subheading: "Partnering With Established Real Estate Brands",
    description:
      "Working alongside and professionally representing established real estate companies and property brands across Nigeria.",
    showCompanyNames: true,
  },
  leadership: {
    eyebrow: "Leadership & Entrepreneurship",
    role: "Founder & CEO",
    companyName: "Prime Culture Homes",
    headline: "Building Beyond the Individual.",
    supportingMessage:
      "Beyond my work as a Real Estate Consultant, I am also the Founder and CEO of Prime Culture Homes, a real estate brand focused on connecting individuals with property ownership opportunities through a foundation of trust, transparency and professionalism.",
    paragraphs: [
      "The conception of Prime Culture Homes originated from a distinct market need: property acquisition in Nigeria should be an empowering, predictable, and transparent journey. While advisory serves individual mandates, institutional leadership allows us to build systemic trust and curated property offerings at scale.",
      "As Founder and CEO, my objective is to establish an enduring culture of accountability, meticulous property vetting, and exceptional client stewardship. We work to ensure every client engages with legitimate, well-structured property solutions designed for both living and capital growth.",
    ],
    companyUrl: "https://primeculturehomes.com", // placeholder until updated
    corePillars: [
      {
        title: "Access to Quality Ownership",
        description:
          "Curating verified property opportunities with verified titles, strategic locations, and viable long-term value.",
      },
      {
        title: "Institutional Transparency",
        description:
          "Clear transaction structures, honest guidance, and direct communication at every step.",
      },
      {
        title: "Professional Standards",
        description:
          "A service culture prioritizing client security, rigorous due diligence, and dedicated stewardship.",
      },
    ],
  },
  exploreBusiness: {
    eyebrow: "Prime Culture Homes",
    headline: "Discover Prime Culture Homes.",
    supportingText:
      "Explore Prime Culture Homes, a real estate brand committed to providing access to quality property ownership opportunities through trust, transparency and professionalism.",
    companyUrl: "https://primeculturehomes.com", // placeholder until updated
    primaryCtaText: "Visit Prime Culture Homes",
    secondaryCtaText: "Explore Our Website",
  },
  futureModules: {
    listingsEnabled: false,
    projectsEnabled: false,
    inspectionVideosEnabled: false,
    testimonialsEnabled: false,
    marketInsightsEnabled: false,
    mediaFeaturesEnabled: false,
  },
};

const STORAGE_KEY_CONFIG = 'chidera_site_config_v2';
const STORAGE_KEY_PORTRAIT = 'chidera_user_portrait_v1';
const STORAGE_KEY_BRAND_LOGO = 'chidera_prime_culture_logo_v1';
const STORAGE_KEY_PARTNERS = 'chidera_partner_brands_v1';

export function loadStoredConfig(): SiteConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CONFIG);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_SITE_CONFIG,
        ...parsed,
        personal: { ...DEFAULT_SITE_CONFIG.personal, ...parsed.personal },
        partnerships: { ...DEFAULT_SITE_CONFIG.partnerships, ...parsed.partnerships },
        leadership: { ...DEFAULT_SITE_CONFIG.leadership, ...parsed.leadership },
        exploreBusiness: { ...DEFAULT_SITE_CONFIG.exploreBusiness, ...parsed.exploreBusiness },
      };
    }
  } catch (err) {
    console.warn('Could not read site config from storage:', err);
  }
  return DEFAULT_SITE_CONFIG;
}

export function saveStoredConfig(config: SiteConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY_CONFIG, JSON.stringify(config));
  } catch (err) {
    console.warn('Could not write site config to storage:', err);
  }
}

export function loadStoredPartners(): PartnerBrand[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PARTNERS);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('Could not read partners from storage:', err);
  }
  return INITIAL_PARTNER_BRANDS;
}

export function saveStoredPartners(partners: PartnerBrand[]): void {
  try {
    localStorage.setItem(STORAGE_KEY_PARTNERS, JSON.stringify(partners));
  } catch (err) {
    console.warn('Could not write partners to storage:', err);
  }
}

export function loadStoredPortrait(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_PORTRAIT);
  } catch (err) {
    console.warn('Could not read portrait from storage:', err);
    return null;
  }
}

export function saveStoredPortrait(dataUrl: string | null): void {
  try {
    if (dataUrl) {
      localStorage.setItem(STORAGE_KEY_PORTRAIT, dataUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY_PORTRAIT);
    }
  } catch (err) {
    console.warn('Could not write portrait to storage:', err);
  }
}

export function loadStoredBrandLogo(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY_BRAND_LOGO);
  } catch (err) {
    console.warn('Could not read brand logo from storage:', err);
    return null;
  }
}

export function saveStoredBrandLogo(dataUrl: string | null): void {
  try {
    if (dataUrl) {
      localStorage.setItem(STORAGE_KEY_BRAND_LOGO, dataUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY_BRAND_LOGO);
    }
  } catch (err) {
    console.warn('Could not write brand logo to storage:', err);
  }
}
