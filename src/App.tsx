/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ApproachSection } from './components/ApproachSection';
import { PartnershipsSection } from './components/PartnershipsSection';
import { LeadershipSection } from './components/LeadershipSection';
import { ExploreBusinessSection } from './components/ExploreBusinessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';
import {
  DEFAULT_SITE_CONFIG,
  loadStoredConfig,
  saveStoredConfig,
  loadStoredPortrait,
  saveStoredPortrait,
  loadStoredBrandLogo,
  saveStoredBrandLogo,
  loadStoredPartners,
  saveStoredPartners,
} from './data/siteConfig';
import { SiteConfig, PartnerBrand } from './types/content';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [brandLogoUrl, setBrandLogoUrl] = useState<string | null>(null);
  const [partners, setPartners] = useState<PartnerBrand[]>([]);
  const [isAdminView, setIsAdminView] = useState(false);

  useEffect(() => {
    // 1. Load configurations and assets from storage
    const savedConfig = loadStoredConfig();
    setConfig(savedConfig);

    const savedPortrait = loadStoredPortrait();
    if (savedPortrait) {
      setPortraitUrl(savedPortrait);
    }

    const savedBrandLogo = loadStoredBrandLogo();
    if (savedBrandLogo) {
      setBrandLogoUrl(savedBrandLogo);
    }

    const savedPartners = loadStoredPartners();
    setPartners(savedPartners);

    // 2. Check URL routing for #admin or /admin
    const checkAdminRoute = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const search = window.location.search.toLowerCase();
      if (hash === '#admin' || path.endsWith('/admin') || search.includes('admin=true')) {
        setIsAdminView(true);
      } else {
        setIsAdminView(false);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);

    // 3. Keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A to toggle Admin Portal
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminView((prev) => {
          const next = !prev;
          if (next) {
            window.location.hash = 'admin';
          } else {
            window.location.hash = '';
          }
          return next;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    saveStoredConfig(newConfig);
  };

  const handleSavePortrait = (dataUrl: string | null) => {
    setPortraitUrl(dataUrl);
    saveStoredPortrait(dataUrl);
  };

  const handleSaveBrandLogo = (dataUrl: string | null) => {
    setBrandLogoUrl(dataUrl);
    saveStoredBrandLogo(dataUrl);
  };

  const handleSavePartners = (newPartners: PartnerBrand[]) => {
    setPartners(newPartners);
    saveStoredPartners(newPartners);
  };

  const handleExitAdmin = () => {
    setIsAdminView(false);
    if (window.location.hash === '#admin') {
      window.history.pushState(null, '', window.location.pathname);
    }
  };

  // If on Admin Portal route, render the executive portal dashboard
  if (isAdminView) {
    return (
      <AdminPortal
        config={config}
        onSaveConfig={handleSaveConfig}
        portraitUrl={portraitUrl}
        onSavePortrait={handleSavePortrait}
        brandLogoUrl={brandLogoUrl}
        onSaveBrandLogo={handleSaveBrandLogo}
        partners={partners}
        onSavePartners={handleSavePartners}
        onExitAdmin={handleExitAdmin}
      />
    );
  }

  // Otherwise, render the 100% clean, public-facing personal website
  return (
    <div className="min-h-screen bg-[#F3EFE4] text-[#382A22] flex flex-col font-sans selection:bg-[#444B35]/20 selection:text-[#382A22]">
      {/* Top Bar Navigation */}
      <Navigation />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection config={config} portraitUrl={portraitUrl} />

        {/* Section 2: About Me */}
        <AboutSection config={config} portraitUrl={portraitUrl} />

        {/* Section 3: My Approach */}
        <ApproachSection config={config} />

        {/* Section 4: Professional Affiliations & Partnerships ("Partnering With") */}
        <PartnershipsSection config={config} partners={partners} />

        {/* Section 5: Leadership & Entrepreneurship */}
        <LeadershipSection config={config} brandLogoUrl={brandLogoUrl} />

        {/* Section 6: Explore My Business (Prime Culture Homes) */}
        <ExploreBusinessSection config={config} brandLogoUrl={brandLogoUrl} />

        {/* Section 7: Contact */}
        <ContactSection config={config} />
      </main>

      {/* Site Footer with subtle, discreet portal trigger */}
      <Footer config={config} />
    </div>
  );
}
