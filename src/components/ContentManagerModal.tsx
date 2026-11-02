import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Upload,
  Camera,
  Trash2,
  Check,
  Inbox,
  User,
  Phone,
  Layers,
  Sparkles,
  Building2,
  Globe,
} from 'lucide-react';
import { SiteConfig, ContactInquiry } from '../types/content';
import { PrimeCultureLogo } from './PrimeCultureLogo';

interface ContentManagerModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: SiteConfig;
  onSaveConfig: (newConfig: SiteConfig) => void;
  portraitUrl: string | null;
  onUploadPortrait: (file: File) => void;
  onRemovePortrait: () => void;
  brandLogoUrl: string | null;
  onUploadBrandLogo: (file: File) => void;
  onRemoveBrandLogo: () => void;
}

export const ContentManagerModal: React.FC<ContentManagerModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  portraitUrl,
  onUploadPortrait,
  onRemovePortrait,
  brandLogoUrl,
  onUploadBrandLogo,
  onRemoveBrandLogo,
}) => {
  const [activeTab, setActiveTab] = useState<
    'portrait' | 'brand' | 'contact' | 'inquiries' | 'expansion'
  >('portrait');

  const [formData, setFormData] = useState({
    fullName: config.personal.fullName,
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
  });

  const [inquiries, setInquiries] = useState<ContactInquiry[]>([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const brandLogoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      try {
        const stored = localStorage.getItem('chidera_inquiries_v1');
        if (stored) {
          setInquiries(JSON.parse(stored));
        }
      } catch (err) {
        console.warn('Could not read inquiries:', err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: SiteConfig = {
      ...config,
      personal: {
        ...config.personal,
        fullName: formData.fullName,
        email: formData.email,
        whatsappNumber: formData.whatsappNumber,
        whatsappWelcomeMessage: formData.whatsappWelcomeMessage,
        linkedinUrl: formData.linkedinUrl,
        instagramUrl: formData.instagramUrl,
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
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadPortrait(file);
    }
  };

  const handleBrandLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadBrandLogo(file);
    }
  };

  const clearInquiries = () => {
    if (window.confirm('Clear all stored inquiries?')) {
      localStorage.removeItem('chidera_inquiries_v1');
      setInquiries([]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#382A22]/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF9F5] border border-[#B8AA91]/60 w-full max-w-2xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Top Bar */}
        <div className="px-6 py-4 bg-[#F3EFE4] border-b border-[#382A22]/10 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-xl text-[#382A22]">
              Site & Profile Preferences
            </h3>
            <p className="text-[11px] font-sans text-[#382A22]/60 uppercase tracking-wider">
              Chidera Iwuajoku · Direct Settings & Brand
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#382A22]/60 hover:text-[#382A22] transition-colors focus-visible:outline-none"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#382A22]/10 bg-[#FAF9F5] px-6 text-xs font-sans overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('portrait')}
            className={`py-3 px-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'portrait'
                ? 'border-[#444B35] text-[#444B35]'
                : 'border-transparent text-[#382A22]/60 hover:text-[#382A22]'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Portrait</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('brand')}
            className={`py-3 px-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'brand'
                ? 'border-[#444B35] text-[#444B35]'
                : 'border-transparent text-[#382A22]/60 hover:text-[#382A22]'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Prime Culture Homes</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            className={`py-3 px-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'contact'
                ? 'border-[#444B35] text-[#444B35]'
                : 'border-transparent text-[#382A22]/60 hover:text-[#382A22]'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Contact & Links</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('inquiries')}
            className={`py-3 px-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'inquiries'
                ? 'border-[#444B35] text-[#444B35]'
                : 'border-transparent text-[#382A22]/60 hover:text-[#382A22]'
            }`}
          >
            <Inbox className="w-3.5 h-3.5" />
            <span>Inquiries ({inquiries.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('expansion')}
            className={`py-3 px-3 border-b-2 font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
              activeTab === 'expansion'
                ? 'border-[#444B35] text-[#444B35]'
                : 'border-transparent text-[#382A22]/60 hover:text-[#382A22]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Expansion</span>
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 font-sans text-sm text-[#382A22] space-y-6">
          {/* TAB 1: PORTRAIT PHOTO */}
          {activeTab === 'portrait' && (
            <div className="space-y-6">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept="image/*"
                className="hidden"
                aria-label="Upload personal photo"
              />

              <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-[#F3EFE4]/60 border border-[#B8AA91]/30">
                <div className="w-32 h-40 bg-[#FAF9F5] border border-[#B8AA91]/60 flex items-center justify-center overflow-hidden shrink-0 shadow-sm relative">
                  {portraitUrl ? (
                    <img
                      src={portraitUrl}
                      alt="Chidera Iwuajoku portrait preview"
                      className="w-full h-full object-cover object-top"
                    />
                  ) : (
                    <div className="text-center p-3">
                      <User className="w-8 h-8 text-[#B8AA91] mx-auto mb-1" />
                      <p className="text-[10px] text-[#382A22]/50 font-serif">
                        Placeholder
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3 text-center sm:text-left flex-1">
                  <h4 className="font-serif text-lg text-[#382A22]">
                    Personal Professional Photograph
                  </h4>
                  <p className="text-xs text-[#382A22]/70 leading-relaxed font-light">
                    Upload your personal portrait photograph. It will display on the hero section and about card with zero compression distortion.
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 pt-1">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{portraitUrl ? 'Replace Photo' : 'Upload Photo'}</span>
                    </button>

                    {portraitUrl && (
                      <button
                        type="button"
                        onClick={onRemovePortrait}
                        className="inline-flex items-center gap-1.5 px-3 py-2 border border-red-300 text-red-700 text-xs uppercase tracking-wider hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PRIME CULTURE HOMES (BRAND & LEADERSHIP) */}
          {activeTab === 'brand' && (
            <form onSubmit={handleSaveSettings} className="space-y-6">
              <input
                type="file"
                ref={brandLogoInputRef}
                onChange={handleBrandLogoSelect}
                accept="image/*"
                className="hidden"
                aria-label="Upload company logo"
              />

              {/* Brand Logo Upload Box */}
              <div className="p-4 bg-[#F3EFE4]/60 border border-[#B8AA91]/30 flex flex-col sm:flex-row items-center gap-5">
                <div className="p-3 bg-white border border-[#B8AA91]/40 shrink-0">
                  <PrimeCultureLogo
                    customLogoUrl={brandLogoUrl}
                    variant="light"
                    showWordmark={false}
                  />
                </div>

                <div className="space-y-2 text-center sm:text-left flex-1">
                  <h4 className="font-serif text-base text-[#382A22]">
                    Prime Culture Homes Official Logo
                  </h4>
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
                        onClick={onRemoveBrandLogo}
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
                  Both the Leadership section and "Explore My Business" button direct visitors to this link in a new tab.
                </p>
              </div>

              {/* Leadership Role & Title */}
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

              {/* Headline & Supporting Statement */}
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

              <div className="pt-2 flex items-center justify-between border-t border-[#382A22]/10">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors inline-flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Brand Settings</span>
                </button>

                {saveSuccess && (
                  <span className="text-xs text-[#444B35] font-medium">
                    Saved successfully!
                  </span>
                )}
              </div>
            </form>
          )}

          {/* TAB 3: CONTACT & LINKS */}
          {activeTab === 'contact' && (
            <form onSubmit={handleSaveSettings} className="space-y-4">
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
                  WhatsApp Phone Number (e.g. 2348012345678)
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
                  WhatsApp Default Pre-filled Message
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
                    LinkedIn Profile URL
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
                    Instagram Profile URL
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

              <div className="pt-4 flex items-center justify-between border-t border-[#382A22]/10">
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-wider font-medium hover:bg-[#382A22] transition-colors inline-flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save Contact Settings</span>
                </button>

                {saveSuccess && (
                  <span className="text-xs text-[#444B35] font-medium">
                    Settings saved successfully!
                  </span>
                )}
              </div>
            </form>
          )}

          {/* TAB 4: INQUIRIES INBOX */}
          {activeTab === 'inquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-xs text-[#382A22]/70">
                  Form submissions sent from the Contact section are logged here.
                </p>
                {inquiries.length > 0 && (
                  <button
                    type="button"
                    onClick={clearInquiries}
                    className="text-xs text-red-700 hover:underline"
                  >
                    Clear All
                  </button>
                )}
              </div>

              {inquiries.length === 0 ? (
                <div className="py-12 text-center border border-dashed border-[#382A22]/20 bg-[#F3EFE4]/40 p-6 space-y-2">
                  <Inbox className="w-8 h-8 text-[#B8AA91] mx-auto" />
                  <p className="font-serif text-base text-[#382A22]">No Inquiries Yet</p>
                  <p className="text-xs text-[#382A22]/60">
                    When visitors submit the contact form, their inquiries appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {inquiries.map((inq) => (
                    <div
                      key={inq.id}
                      className="p-4 bg-white border border-[#382A22]/10 space-y-2 shadow-xs"
                    >
                      <div className="flex items-center justify-between text-xs text-[#382A22]/60 border-b border-[#382A22]/10 pb-2">
                        <span className="font-semibold text-[#382A22] text-sm">
                          {inq.fullName}
                        </span>
                        <span>{inq.timestamp}</span>
                      </div>
                      <p className="text-xs text-[#444B35] font-medium">
                        Subject: {inq.subject}
                      </p>
                      <p className="text-xs text-[#382A22]/80 leading-relaxed font-light whitespace-pre-wrap">
                        {inq.message}
                      </p>
                      <div className="pt-2 text-xs text-[#382A22]/60 flex items-center justify-between">
                        <span>Reply: <a href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`} className="text-[#444B35] underline">{inq.email}</a></span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: FUTURE EXPANSION ARCHITECTURE */}
          {activeTab === 'expansion' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h4 className="font-serif text-lg text-[#382A22]">
                  Future Expansion Architecture
                </h4>
                <p className="text-xs text-[#382A22]/70 leading-relaxed">
                  Extensible schemas and components are ready in the codebase.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  {
                    title: 'Property Listings',
                    desc: 'Curated exclusive residential & commercial portfolios.',
                    status: 'Ready in Codebase',
                  },
                  {
                    title: 'Real Estate Projects',
                    desc: 'Development advisory & master-planned communities.',
                    status: 'Ready in Codebase',
                  },
                  {
                    title: 'Property Inspection Videos',
                    desc: 'Cinematic on-site property walkthroughs & tours.',
                    status: 'Ready in Codebase',
                  },
                  {
                    title: 'Client Testimonials',
                    desc: 'Verified advisory feedback and client outcomes.',
                    status: 'Ready in Codebase',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 bg-white border border-[#382A22]/10 space-y-1"
                  >
                    <div className="flex items-center gap-1.5 text-[#444B35]">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span className="font-serif text-sm font-medium text-[#382A22]">
                        {item.title}
                      </span>
                    </div>
                    <p className="text-xs text-[#382A22]/65 leading-relaxed font-light">
                      {item.desc}
                    </p>
                    <span className="inline-block text-[10px] uppercase tracking-wider text-[#444B35]/70 pt-1 font-medium">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3.5 bg-[#F3EFE4] border-t border-[#382A22]/10 flex items-center justify-between text-xs text-[#382A22]/60">
          <span>Chidera Iwuajoku · Personal Website</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-[#382A22] text-[#FAF9F5] text-xs uppercase tracking-wider hover:bg-[#444B35] transition-colors"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
