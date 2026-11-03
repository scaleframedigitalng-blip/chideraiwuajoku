import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Upload,
  Trash2,
  Check,
  Building2,
  Globe,
  Phone,
  Mail,
  User,
  Inbox,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  Eye,
  EyeOff,
  ExternalLink,
  Shield,
  FileText,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { SiteConfig, PartnerBrand, ContactInquiry } from '../types/content';
import { INITIAL_PARTNER_BRANDS } from '../data/siteConfig';
import { PrimeCultureLogo } from './PrimeCultureLogo';

interface AdminPortalProps {
  config: SiteConfig;
  onSaveConfig: (newConfig: SiteConfig) => void;
  portraitUrl: string | null;
  onSavePortrait: (dataUrl: string | null) => void;
  brandLogoUrl: string | null;
  onSaveBrandLogo: (dataUrl: string | null) => void;
  partners: PartnerBrand[];
  onSavePartners: (partners: PartnerBrand[]) => void;
  onExitAdmin: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  config,
  onSaveConfig,
  portraitUrl,
  onSavePortrait,
  brandLogoUrl,
  onSaveBrandLogo,
  partners,
  onSavePartners,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<
    'portrait' | 'partners' | 'venture' | 'profile' | 'contact' | 'inbox'
  >('portrait');

  // Form states
  const [formData, setFormData] = useState({
    fullName: config.personal.fullName,
    title: config.personal.title,
    headline: config.personal.headline,
    subheadline: config.personal.subheadline,
    email: config.personal.email,
    whatsappNumber: config.personal.whatsappNumber,
    whatsappWelcomeMessage: config.personal.whatsappWelcomeMessage,
    linkedinUrl: config.personal.linkedinUrl,
    instagramUrl: config.personal.instagramUrl,
    companyUrl: config.leadership.companyUrl,
    leadershipRole: config.leadership.role,
    companyName: config.leadership.companyName,
    leadershipHeadline: config.leadership.headline,
    leadershipSupportingMessage: config.leadership.supportingMessage,
    partnersHeading: config.partnerships?.heading || 'Partnering With',
    aboutHeading: config.about.heading,
    aboutLead: config.about.leadParagraph,
  });

  const [partnerList, setPartnerList] = useState<PartnerBrand[]>(partners);
  const [newPartnerName, setNewPartnerName] = useState('');
  const [newPartnerShowName, setNewPartnerShowName] = useState(true);
  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  const portraitInputRef = useRef<HTMLInputElement>(null);
  const brandLogoInputRef = useRef<HTMLInputElement>(null);
  const partnerLogoInputRef = useRef<HTMLInputElement>(null);
  const replacePartnerInputRef = useRef<HTMLInputElement>(null);
  const [replacingPartnerId, setReplacingPartnerId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('chidera_inquiries_v1');
      if (stored) {
        setInquiries(JSON.parse(stored));
      }
    } catch (err) {
      console.warn('Could not read inquiries:', err);
    }
  }, []);

  const triggerSaveNotification = (msg: string) => {
    setSaveBanner(msg);
    setTimeout(() => setSaveBanner(null), 3000);
  };

  // 1. Portrait Handlers
  const handlePortraitUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onSavePortrait(result);
          triggerSaveNotification('Portrait updated successfully.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePortrait = () => {
    if (window.confirm('Remove your personal portrait and revert to the editorial monogram?')) {
      onSavePortrait(null);
      triggerSaveNotification('Portrait reset to editorial frame.');
    }
  };

  // 2. Brand Logo Handlers
  const handleBrandLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          onSaveBrandLogo(result);
          triggerSaveNotification('Prime Culture Homes logo updated.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveBrandLogo = () => {
    onSaveBrandLogo(null);
    triggerSaveNotification('Brand logo reset to bespoke insignia.');
  };

  // 3. Partner Logos Handlers
  const handleAddPartnerLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const newBrand: PartnerBrand = {
            id: 'partner_' + Date.now(),
            name: newPartnerName.trim() || 'Real Estate Company',
            logoUrl: dataUrl,
            showName: newPartnerShowName,
          };
          const updated = [...partnerList, newBrand];
          setPartnerList(updated);
          onSavePartners(updated);
          setNewPartnerName('');
          triggerSaveNotification(`Added "${newBrand.name}" to Partnering With.`);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReplacePartnerLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && replacingPartnerId) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result as string;
        if (dataUrl) {
          const updated = partnerList.map((p) =>
            p.id === replacingPartnerId ? { ...p, logoUrl: dataUrl } : p
          );
          setPartnerList(updated);
          onSavePartners(updated);
          setReplacingPartnerId(null);
          triggerSaveNotification('Logo replaced successfully.');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePartner = (id: string, name: string) => {
    if (window.confirm(`Remove "${name}" from the Partnering With section?`)) {
      const updated = partnerList.filter((p) => p.id !== id);
      setPartnerList(updated);
      onSavePartners(updated);
      triggerSaveNotification(`Removed "${name}".`);
    }
  };

  const handleMovePartner = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= partnerList.length) return;
    const updated = [...partnerList];
    const [moved] = updated.splice(index, 1);
    updated.splice(targetIndex, 0, moved);
    setPartnerList(updated);
    onSavePartners(updated);
  };

  const handleTogglePartnerShowName = (id: string) => {
    const updated = partnerList.map((p) =>
      p.id === id ? { ...p, showName: !p.showName } : p
    );
    setPartnerList(updated);
    onSavePartners(updated);
  };

  const handleUpdatePartnerName = (id: string, name: string) => {
    const updated = partnerList.map((p) => (p.id === id ? { ...p, name } : p));
    setPartnerList(updated);
    onSavePartners(updated);
  };

  const handleResetDefaultPartners = () => {
    if (window.confirm('Reset partner logos to the initial 3 official logos?')) {
      setPartnerList(INITIAL_PARTNER_BRANDS);
      onSavePartners(INITIAL_PARTNER_BRANDS);
      triggerSaveNotification('Reset to initial partner brands.');
    }
  };

  // 4. Save Config
  const handleSaveAllConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteConfig = {
      ...config,
      personal: {
        ...config.personal,
        fullName: formData.fullName,
        title: formData.title,
        headline: formData.headline,
        subheadline: formData.subheadline,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        whatsappWelcomeMessage: formData.whatsappWelcomeMessage,
        linkedinUrl: formData.linkedinUrl,
        instagramUrl: formData.instagramUrl,
      },
      about: {
        ...config.about,
        heading: formData.aboutHeading,
        leadParagraph: formData.aboutLead,
      },
      partnerships: {
        ...config.partnerships,
        heading: formData.partnersHeading,
      },
      leadership: {
        ...config.leadership,
        role: formData.leadershipRole,
        companyName: formData.companyName,
        headline: formData.leadershipHeadline,
        supportingMessage: formData.leadershipSupportingMessage,
        companyUrl: formData.companyUrl,
      },
      exploreBusiness: {
        ...config.exploreBusiness,
        companyUrl: formData.companyUrl,
      },
    };
    onSaveConfig(updated);
    triggerSaveNotification('Site configuration updated successfully.');
  };

  const clearInquiries = () => {
    if (window.confirm('Clear all stored inquiries?')) {
      localStorage.removeItem('chidera_inquiries_v1');
      setInquiries([]);
      triggerSaveNotification('Inquiries cleared.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EFE4] text-[#382A22] font-sans flex flex-col">
      {/* Hidden file inputs */}
      <input
        type="file"
        ref={portraitInputRef}
        onChange={handlePortraitUpload}
        accept="image/*"
        className="hidden"
        aria-label="Upload personal portrait"
      />
      <input
        type="file"
        ref={brandLogoInputRef}
        onChange={handleBrandLogoUpload}
        accept="image/*"
        className="hidden"
        aria-label="Upload brand logo"
      />
      <input
        type="file"
        ref={partnerLogoInputRef}
        onChange={handleAddPartnerLogo}
        accept="image/*"
        className="hidden"
        aria-label="Upload partner logo"
      />
      <input
        type="file"
        ref={replacePartnerInputRef}
        onChange={handleReplacePartnerLogo}
        accept="image/*"
        className="hidden"
        aria-label="Replace partner logo"
      />

      {/* Top Bar for Admin */}
      <header className="bg-[#382A22] text-[#FAF9F5] px-6 py-4 flex items-center justify-between border-b border-[#444B35]/40 shadow-sm sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-none border border-[#B8AA91]/50 flex items-center justify-center bg-[#FAF9F5]/10">
            <Shield className="w-4 h-4 text-[#B8AA91]" />
          </div>
          <div>
            <h1 className="font-serif text-lg tracking-wide uppercase">
              Chidera Iwuajoku
            </h1>
            <p className="text-[10px] text-[#B8AA91] font-sans tracking-widest uppercase">
              Executive Content Studio & Portal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {saveBanner && (
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-[#444B35] text-[#FAF9F5] text-xs font-medium">
              <Check className="w-3.5 h-3.5" />
              <span>{saveBanner}</span>
            </div>
          )}

          <button
            type="button"
            onClick={onExitAdmin}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#FAF9F5] text-[#382A22] text-xs font-sans uppercase tracking-[0.15em] font-medium hover:bg-[#F3EFE4] transition-colors shadow-xs"
          >
            <span>View Live Website</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#444B35]" />
          </button>
        </div>
      </header>

      {/* Main Admin Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <aside className="md:col-span-3 space-y-1 bg-[#FAF9F5] border border-[#B8AA91]/40 p-3 shadow-xs">
          <p className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#382A22]/50 px-3 py-2 border-b border-[#382A22]/10">
            Site Management
          </p>

          <button
            type="button"
            onClick={() => setActiveTab('portrait')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-left font-medium transition-colors ${
              activeTab === 'portrait'
                ? 'bg-[#444B35] text-[#FAF9F5]'
                : 'text-[#382A22]/70 hover:bg-[#F3EFE4] hover:text-[#382A22]'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Portrait Photograph</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('partners')}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-xs text-left font-medium transition-colors ${
              activeTab === 'partners'
                ? 'bg-[#444B35] text-[#FAF9F5]'
                : 'text-[#382A22]/70 hover:bg-[#F3EFE4] hover:text-[#382A22]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Building2 className="w-4 h-4" />
              <span>Partnering With</span>
            </div>
            <span className="text-[10px] opacity-75 font-mono">({partnerList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('venture')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-left font-medium transition-colors ${
              activeTab === 'venture'
                ? 'bg-[#444B35] text-[#FAF9F5]'
                : 'text-[#382A22]/70 hover:bg-[#F3EFE4] hover:text-[#382A22]'
            }`}
          >
            <Globe className="w-4 h-4" />
            <span>Prime Culture Homes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-left font-medium transition-colors ${
              activeTab === 'profile'
                ? 'bg-[#444B35] text-[#FAF9F5]'
                : 'text-[#382A22]/70 hover:bg-[#F3EFE4] hover:text-[#382A22]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Editorial Bio & Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-xs text-left font-medium transition-colors ${
              activeTab === 'contact'
                ? 'bg-[#444B35] text-[#FAF9F5]'
                : 'text-[#382A22]/70 hover:bg-[#F3EFE4] hover:text-[#382A22]'
            }`}
          >
            <Phone className="w-4 h-4" />
            <span>Contact & WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inbox')}
            className={`w-full flex items-center justify-between px-3 py-2.5 text-xs text-left font-medium transition-colors ${
              activeTab === 'inbox'
                ? 'bg-[#444B35] text-[#FAF9F5]'
                : 'text-[#382A22]/70 hover:bg-[#F3EFE4] hover:text-[#382A22]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Inbox className="w-4 h-4" />
              <span>Inquiries Inbox</span>
            </div>
            {inquiries.length > 0 && (
              <span className="bg-[#444B35]/20 text-[#444B35] px-1.5 py-0.5 rounded-none text-[10px] font-mono">
                {inquiries.length}
              </span>
            )}
          </button>
        </aside>

        {/* Content Pane */}
        <main className="md:col-span-9 bg-[#FAF9F5] border border-[#B8AA91]/40 p-6 sm:p-8 shadow-xs">
          {/* TAB 1: PORTRAIT PHOTOGRAPH */}
          {activeTab === 'portrait' && (
            <div className="space-y-6">
              <div className="border-b border-[#382A22]/10 pb-4">
                <h2 className="font-serif text-2xl text-[#382A22]">
                  Personal Professional Photograph
                </h2>
                <p className="text-xs text-[#382A22]/70 leading-relaxed font-light mt-1">
                  Manage the portrait photograph shown in the Hero section of your website. It syncs immediately with the public site.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 p-6 bg-[#F3EFE4]/60 border border-[#B8AA91]/30">
                <div className="w-44 h-56 bg-white border border-[#B8AA91]/60 flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative">
                  {portraitUrl ? (
                    <img
                      src={portraitUrl}
                      alt="Current portrait"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <User className="w-10 h-10 text-[#B8AA91] mx-auto mb-2" />
                      <p className="font-serif text-sm text-[#382A22]">
                        Editorial Monogram
                      </p>
                      <p className="text-[10px] text-[#382A22]/50 font-sans mt-0.5">
                        Active on live site
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-4 flex-1 text-center sm:text-left">
                  <div>
                    <h3 className="font-serif text-lg text-[#382A22]">
                      {portraitUrl ? 'Custom Photograph Active' : 'No Custom Portrait Uploaded'}
                    </h3>
                    <p className="text-xs text-[#382A22]/70 leading-relaxed font-light mt-1">
                      Upload your real portrait photograph (JPG, PNG, WebP). The live frontend displays it with pristine editorial contrast and no public upload buttons.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                    <button
                      type="button"
                      onClick={() => portraitInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#444B35] text-[#FAF9F5] text-xs font-sans uppercase tracking-[0.14em] font-medium hover:bg-[#382A22] transition-colors shadow-xs"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{portraitUrl ? 'Replace Photograph' : 'Upload Photograph'}</span>
                    </button>

                    {portraitUrl && (
                      <button
                        type="button"
                        onClick={handleRemovePortrait}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 border border-red-300 text-red-700 text-xs font-sans uppercase tracking-[0.12em] hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove & Revert</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 border border-[#382A22]/10 bg-white text-xs text-[#382A22]/70 space-y-1">
                <p className="font-medium text-[#382A22]">Public Frontend Status:</p>
                <p>• The public frontend has zero edit or upload buttons.</p>
                <p>• When you upload here, your photo is saved and appears immediately on the live website.</p>
              </div>
            </div>
          )}

          {/* TAB 2: PARTNER BRANDS (PARTNERING WITH) */}
          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="border-b border-[#382A22]/10 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <h2 className="font-serif text-2xl text-[#382A22]">
                    Partnering With — Affiliated Company Logos
                  </h2>
                  <p className="text-xs text-[#382A22]/70 leading-relaxed font-light mt-1">
                    Upload, replace, and reorder the official logos of the real estate companies you represent or work alongside.
                  </p>
                </div>

                {partnerList.length > 0 && (
                  <button
                    type="button"
                    onClick={handleResetDefaultPartners}
                    className="text-xs text-[#444B35] hover:underline inline-flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset to 3 Initial Logos</span>
                  </button>
                )}
              </div>

              {/* Add New Partner Logo Form */}
              <div className="p-5 bg-[#F3EFE4]/70 border border-[#B8AA91]/40 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-base text-[#382A22]">
                    Add New Real Estate Brand Logo
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider text-[#444B35] font-semibold">
                    PNG / SVG / JPG
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div className="sm:col-span-8">
                    <input
                      type="text"
                      value={newPartnerName}
                      onChange={(e) => setNewPartnerName(e.target.value)}
                      placeholder="Company Name (e.g., PSP, Abode, Teamfocus)"
                      className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-xs focus:outline-none focus:border-[#444B35]"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <button
                      type="button"
                      onClick={() => partnerLogoInputRef.current?.click()}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload & Add</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#382A22]/75">
                  <input
                    type="checkbox"
                    id="adminPartnerShowName"
                    checked={newPartnerShowName}
                    onChange={(e) => setNewPartnerShowName(e.target.checked)}
                    className="accent-[#444B35]"
                  />
                  <label htmlFor="adminPartnerShowName" className="cursor-pointer">
                    Display company name text under logo on the website
                  </label>
                </div>
              </div>

              {/* List of displayed partners */}
              <div className="space-y-3">
                <h3 className="text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  Currently Displayed Brands ({partnerList.length})
                </h3>

                {partnerList.length === 0 ? (
                  <div className="p-8 text-center bg-white border border-dashed border-[#382A22]/20 text-xs text-[#382A22]/60">
                    No partner logos configured yet.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {partnerList.map((partner, index) => (
                      <div
                        key={partner.id}
                        className="p-3 bg-white border border-[#382A22]/15 flex flex-col sm:flex-row items-center gap-4 shadow-2xs"
                      >
                        {/* Logo Thumbnail */}
                        <div className="w-24 h-14 bg-[#FAF9F5] border border-[#B8AA91]/30 p-1 flex items-center justify-center shrink-0">
                          <img
                            src={partner.logoUrl}
                            alt={partner.name}
                            className="max-h-full max-w-full object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>

                        {/* Name Input */}
                        <div className="flex-1 w-full sm:w-auto">
                          <input
                            type="text"
                            value={partner.name}
                            onChange={(e) =>
                              handleUpdatePartnerName(partner.id, e.target.value)
                            }
                            className="w-full px-2.5 py-1.5 text-xs border border-[#382A22]/20 focus:outline-none focus:border-[#444B35]"
                            title="Edit company name"
                          />
                        </div>

                        {/* Controls */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleTogglePartnerShowName(partner.id)}
                            className={`p-1.5 border transition-colors ${
                              partner.showName
                                ? 'border-[#444B35] text-[#444B35] bg-[#F3EFE4]/40'
                                : 'border-[#382A22]/20 text-[#382A22]/40'
                            }`}
                            title={
                              partner.showName
                                ? 'Company name is visible on website'
                                : 'Company name is hidden'
                            }
                          >
                            {partner.showName ? (
                              <Eye className="w-3.5 h-3.5" />
                            ) : (
                              <EyeOff className="w-3.5 h-3.5" />
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMovePartner(index, 'up')}
                            className="p-1.5 border border-[#382A22]/20 text-[#382A22] hover:bg-[#F3EFE4] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move left/up in list"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            disabled={index === partnerList.length - 1}
                            onClick={() => handleMovePartner(index, 'down')}
                            className="p-1.5 border border-[#382A22]/20 text-[#382A22] hover:bg-[#F3EFE4] disabled:opacity-30 disabled:cursor-not-allowed"
                            title="Move right/down in list"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setReplacingPartnerId(partner.id);
                              replacePartnerInputRef.current?.click();
                            }}
                            className="p-1.5 border border-[#382A22]/20 text-[#382A22] hover:bg-[#F3EFE4]"
                            title="Replace logo image"
                          >
                            <Upload className="w-3.5 h-3.5" />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRemovePartner(partner.id, partner.name)}
                            className="p-1.5 border border-red-200 text-red-600 hover:bg-red-50"
                            title="Remove logo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: PRIME CULTURE HOMES (VENTURE) */}
          {activeTab === 'venture' && (
            <form onSubmit={handleSaveAllConfig} className="space-y-6">
              <div className="border-b border-[#382A22]/10 pb-4">
                <h2 className="font-serif text-2xl text-[#382A22]">
                  Prime Culture Homes — Venture & Business Portal
                </h2>
                <p className="text-xs text-[#382A22]/70 leading-relaxed font-light mt-1">
                  Configure the company's official logo, destination website URL, and leadership statements.
                </p>
              </div>

              {/* Logo upload */}
              <div className="p-4 bg-[#F3EFE4]/60 border border-[#B8AA91]/30 flex flex-col sm:flex-row items-center gap-5">
                <div className="p-3 bg-white border border-[#B8AA91]/40 shrink-0">
                  <PrimeCultureLogo
                    customLogoUrl={brandLogoUrl}
                    variant="light"
                    showWordmark={false}
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h3 className="font-serif text-base text-[#382A22]">
                    Official Company Logo
                  </h3>
                  <p className="text-xs text-[#382A22]/70 font-light">
                    Upload your official vector or raster logo (PNG, SVG, JPG). If none is uploaded, the site displays the architectural typographic insignia.
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => brandLogoInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{brandLogoUrl ? 'Replace Logo' : 'Upload Logo'}</span>
                    </button>
                    {brandLogoUrl && (
                      <button
                        type="button"
                        onClick={handleRemoveBrandLogo}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 border border-red-300 text-red-700 text-xs hover:bg-red-50"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Company Website URL */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  Official Company Website URL
                </label>
                <div className="relative">
                  <Globe className="w-4 h-4 text-[#444B35] absolute left-3 top-3" />
                  <input
                    type="url"
                    value={formData.companyUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, companyUrl: e.target.value })
                    }
                    placeholder="https://primeculturehomes.com"
                    className="w-full pl-9 pr-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                  />
                </div>
                <p className="text-[11px] text-[#382A22]/50">
                  Links in the Leadership and "Explore My Business" sections open this address in a new tab.
                </p>
              </div>

              {/* Title & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                    Leadership Title
                  </label>
                  <input
                    type="text"
                    value={formData.leadershipRole}
                    onChange={(e) =>
                      setFormData({ ...formData, leadershipRole: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) =>
                      setFormData({ ...formData, companyName: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                  />
                </div>
              </div>

              {/* Leadership Headline */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  Leadership Headline
                </label>
                <input
                  type="text"
                  value={formData.leadershipHeadline}
                  onChange={(e) =>
                    setFormData({ ...formData, leadershipHeadline: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              {/* Supporting Statement */}
              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  Supporting Statement
                </label>
                <textarea
                  rows={3}
                  value={formData.leadershipSupportingMessage}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      leadershipSupportingMessage: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors"
                >
                  Save Venture Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: PROFILE & EDITORIAL BIO */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSaveAllConfig} className="space-y-5">
              <div className="border-b border-[#382A22]/10 pb-4">
                <h2 className="font-serif text-2xl text-[#382A22]">
                  Consultancy Profile & Editorial Bio
                </h2>
                <p className="text-xs text-[#382A22]/70 leading-relaxed font-light mt-1">
                  Adjust hero copy, biography statement, and headings.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  Hero Headline
                </label>
                <input
                  type="text"
                  value={formData.headline}
                  onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  Hero Supporting Text
                </label>
                <textarea
                  rows={2}
                  value={formData.subheadline}
                  onChange={(e) => setFormData({ ...formData, subheadline: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  About Section Heading
                </label>
                <input
                  type="text"
                  value={formData.aboutHeading}
                  onChange={(e) => setFormData({ ...formData, aboutHeading: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  About Section Lead Statement
                </label>
                <textarea
                  rows={3}
                  value={formData.aboutLead}
                  onChange={(e) => setFormData({ ...formData, aboutLead: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {/* TAB 5: CONTACT & SOCIALS */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveAllConfig} className="space-y-5">
              <div className="border-b border-[#382A22]/10 pb-4">
                <h2 className="font-serif text-2xl text-[#382A22]">
                  Contact Channels & Social Links
                </h2>
                <p className="text-xs text-[#382A22]/70 leading-relaxed font-light mt-1">
                  Configure the direct WhatsApp button number, official email, and social networks.
                </p>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  WhatsApp Phone Number (International format, e.g. 2348012345678)
                </label>
                <input
                  type="text"
                  value={formData.whatsappNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappNumber: e.target.value })
                  }
                  placeholder="2348012345678"
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                  Default WhatsApp Greeting Message
                </label>
                <textarea
                  rows={2}
                  value={formData.whatsappWelcomeMessage}
                  onChange={(e) =>
                    setFormData({ ...formData, whatsappWelcomeMessage: e.target.value })
                  }
                  className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                    LinkedIn URL
                  </label>
                  <input
                    type="url"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, linkedinUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs uppercase tracking-wider text-[#382A22]/70 font-medium">
                    Instagram URL
                  </label>
                  <input
                    type="url"
                    value={formData.instagramUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, instagramUrl: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-white border border-[#382A22]/20 text-sm focus:outline-none focus:border-[#444B35]"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors"
                >
                  Save Contact Settings
                </button>
              </div>
            </form>
          )}

          {/* TAB 6: INQUIRIES INBOX */}
          {activeTab === 'inbox' && (
            <div className="space-y-5">
              <div className="border-b border-[#382A22]/10 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="font-serif text-2xl text-[#382A22]">
                    Inquiries Inbox ({inquiries.length})
                  </h2>
                  <p className="text-xs text-[#382A22]/70 leading-relaxed font-light mt-1">
                    Direct messages sent from the Contact section of your website.
                  </p>
                </div>

                {inquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={clearInquiries}
                    className="text-xs text-red-700 hover:underline"
                  >
                    Clear All Inquiries
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="py-16 text-center bg-white border border-dashed border-[#382A22]/20 p-6 space-y-2">
                  <Inbox className="w-10 h-10 text-[#B8AA91] mx-auto" />
                  <h3 className="font-serif text-lg text-[#382A22]">No Inquiries Yet</h3>
                  <p className="text-xs text-[#382A22]/60 max-w-sm mx-auto">
                    When visitors submit the consultation inquiry form on your live website, their submissions are securely logged and displayed here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 bg-white border border-[#382A22]/15 space-y-2.5 shadow-2xs"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-[#382A22]/10 pb-2">
                        <span className="font-semibold text-sm text-[#382A22]">
                          {inq.fullName}
                        </span>
                        <span className="text-[#382A22]/60 font-mono text-[11px]">
                          {inq.timestamp}
                        </span>
                      </div>

                      <p className="text-xs text-[#444B35] font-medium">
                        Subject: {inq.subject}
                      </p>

                      <p className="text-xs text-[#382A22]/85 leading-relaxed font-light whitespace-pre-wrap bg-[#FAF9F5] p-3 border border-[#382A22]/5">
                        {inq.message}
                      </p>

                      <div className="pt-1 flex items-center justify-between text-xs text-[#382A22]/60">
                        <span>
                          Email: <a href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`} className="text-[#444B35] font-medium underline">{inq.email}</a>
                        </span>
                        <a
                          href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                          className="px-3 py-1 bg-[#444B35] text-[#FAF9F5] text-[11px] uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors"
                        >
                          Reply to Client
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
