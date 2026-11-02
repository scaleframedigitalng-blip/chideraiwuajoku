/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ApproachSection } from './components/ApproachSection';
import { LeadershipSection } from './components/LeadershipSection';
import { ExploreBusinessSection } from './components/ExploreBusinessSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ContentManagerModal } from './components/ContentManagerModal';
import {
  DEFAULT_SITE_CONFIG,
  loadStoredConfig,
  saveStoredConfig,
  loadStoredPortrait,
  saveStoredPortrait,
  loadStoredBrandLogo,
  saveStoredBrandLogo,
} from './data/siteConfig';
import { SiteConfig } from './types/content';

export default function App() {
  const [config, setConfig] = useState<SiteConfig>(DEFAULT_SITE_CONFIG);
  const [portraitUrl, setPortraitUrl] = useState<string | null>(null);
  const [brandLogoUrl, setBrandLogoUrl] = useState<string | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    // Load persisted configurations
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
  }, []);

  const handleUploadPortrait = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPortraitUrl(result);
        saveStoredPortrait(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePortrait = () => {
    setPortraitUrl(null);
    saveStoredPortrait(null);
  };

  const handleUploadBrandLogo = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setBrandLogoUrl(result);
        saveStoredBrandLogo(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveBrandLogo = () => {
    setBrandLogoUrl(null);
    saveStoredBrandLogo(null);
  };

  const handleSaveConfig = (newConfig: SiteConfig) => {
    setConfig(newConfig);
    saveStoredConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-[#F3EFE4] text-[#382A22] flex flex-col font-sans selection:bg-[#444B35]/20 selection:text-[#382A22]">
      {/* Top Bar Navigation */}
      <Navigation onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Section 1: Hero */}
        <HeroSection
          config={config}
          portraitUrl={portraitUrl}
          onUploadPortrait={handleUploadPortrait}
          onRemovePortrait={handleRemovePortrait}
        />

        {/* Section 2: About Me */}
        <AboutSection config={config} portraitUrl={portraitUrl} />

        {/* Section 3: My Approach */}
        <ApproachSection config={config} />

        {/* Section 4: Leadership & Entrepreneurship */}
        <LeadershipSection config={config} brandLogoUrl={brandLogoUrl} />

        {/* Section 5: Explore My Business (Prime Culture Homes) */}
        <ExploreBusinessSection config={config} brandLogoUrl={brandLogoUrl} />

        {/* Section 6: Contact */}
        <ContactSection config={config} />
      </main>

      {/* Site Footer */}
      <Footer config={config} onOpenSettings={() => setIsSettingsOpen(true)} />

      {/* Preferences & Brand Management Modal */}
      <ContentManagerModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={config}
        onSaveConfig={handleSaveConfig}
        portraitUrl={portraitUrl}
        onUploadPortrait={handleUploadPortrait}
        onRemovePortrait={handleRemovePortrait}
        brandLogoUrl={brandLogoUrl}
        onUploadBrandLogo={handleUploadBrandLogo}
        onRemoveBrandLogo={handleRemoveBrandLogo}
      />
    </div>
  );
}
