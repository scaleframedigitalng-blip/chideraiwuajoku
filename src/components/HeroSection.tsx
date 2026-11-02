import React, { useRef } from 'react';
import { ArrowDown, ArrowUpRight, Camera, Upload, MapPin } from 'lucide-react';
import { SiteConfig } from '../types/content';

interface HeroSectionProps {
  config: SiteConfig;
  portraitUrl: string | null;
  onUploadPortrait: (file: File) => void;
  onRemovePortrait?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  config,
  portraitUrl,
  onUploadPortrait,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onUploadPortrait(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onUploadPortrait(file);
    }
  };

  return (
    <section
      id="home"
      aria-label="Introduction & Hero"
      className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 md:py-32 flex flex-col justify-center border-b border-[#382A22]/10"
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
        aria-label="Upload personal portrait photograph"
      />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full">
        {/* Editorial Top Kicker & Subtle Location Indicator */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 md:pb-12 border-b border-[#382A22]/10 text-xs font-sans uppercase tracking-[0.2em] text-[#382A22]/70">
          <div className="flex items-center gap-2">
            <span className="font-medium text-[#444B35]">Advisory Practice</span>
            <span aria-hidden="true" className="text-[#B8AA91]">·</span>
            <span>Real Estate Consultant</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#382A22]/80">
            <MapPin className="w-3.5 h-3.5 text-[#444B35]" />
            <span>Nigeria</span>
          </div>
        </div>

        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center pt-8 md:pt-14">
          {/* Left Column: Typographic Presence */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6 md:space-y-8">
            <div className="space-y-3">
              <h1 className="sr-only">
                Chidera Iwuajoku — Real Estate Consultant Nigeria
              </h1>
              <p className="text-xs md:text-sm font-sans uppercase tracking-[0.25em] text-[#444B35] font-semibold">
                {config.personal.fullName}
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.4rem] leading-[1.12] font-serif font-normal text-[#382A22] max-w-2xl text-balance">
                {config.personal.headline}
              </h2>
            </div>

            <p className="text-base sm:text-lg font-sans text-[#382A22]/85 leading-relaxed max-w-xl font-light">
              {config.personal.subheadline}
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#444B35] text-[#FAF9F5] text-xs font-sans uppercase tracking-[0.16em] font-medium hover:bg-[#382A22] transition-all duration-200 shadow-sm"
              >
                <span>Contact Me</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href="#about"
                className="inline-flex items-center gap-2 px-5 py-3.5 border border-[#382A22]/20 text-[#382A22] text-xs font-sans uppercase tracking-[0.16em] font-medium hover:border-[#444B35] hover:text-[#444B35] transition-colors"
              >
                <span>About Me</span>
                <ArrowDown className="w-3.5 h-3.5 opacity-60" />
              </a>
            </div>

            {/* Quiet Editorial Footnote / Values */}
            <div className="pt-6 sm:pt-8 border-t border-[#382A22]/10 grid grid-cols-2 sm:grid-cols-3 gap-6 text-xs text-[#382A22]/75">
              <div>
                <p className="font-serif italic text-sm text-[#382A22]">Consultancy</p>
                <p className="font-sans text-[11px] text-[#382A22]/60 uppercase tracking-wider mt-0.5">
                  Private & Independent
                </p>
              </div>
              <div>
                <p className="font-serif italic text-sm text-[#382A22]">Focus</p>
                <p className="font-sans text-[11px] text-[#382A22]/60 uppercase tracking-wider mt-0.5">
                  Property Acquisition
                </p>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="font-serif italic text-sm text-[#382A22]">Orientation</p>
                <p className="font-sans text-[11px] text-[#382A22]/60 uppercase tracking-wider mt-0.5">
                  Research & Integrity
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Portrait Container */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              className="relative w-full max-w-md aspect-[3/4] bg-[#FAF9F5] border border-[#B8AA91]/40 shadow-[0_12px_36px_rgba(56,42,34,0.06)] p-3 md:p-4 group flex flex-col justify-between overflow-hidden"
            >
              {portraitUrl ? (
                /* Actual user-uploaded portrait */
                <div className="relative w-full h-full overflow-hidden bg-[#FAF9F5]">
                  <img
                    src={portraitUrl}
                    alt="Chidera Iwuajoku — Real Estate Consultant"
                    className="w-full h-full object-cover object-top filter contrast-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle editorial photo vignette */}
                  <div className="absolute inset-0 pointer-events-none border border-[#382A22]/10" />

                  {/* Hover action to change portrait */}
                  <div className="absolute inset-0 bg-[#382A22]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-6 text-center text-[#FAF9F5]">
                    <Camera className="w-8 h-8 mb-2 text-[#FAF9F5]/90" />
                    <p className="font-serif text-lg">Change Photograph</p>
                    <p className="text-xs text-[#FAF9F5]/70 font-sans mt-1">
                      Click to select a new portrait
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="mt-4 px-4 py-2 bg-[#FAF9F5] text-[#382A22] text-xs font-sans uppercase tracking-[0.14em] font-medium"
                    >
                      Browse Image
                    </button>
                  </div>
                </div>
              ) : (
                /* Bespoke editorial placeholder frame honoring user's instruction */
                <div className="w-full h-full border border-[#B8AA91]/30 bg-[#FAF9F5] p-6 sm:p-8 flex flex-col justify-between items-center text-center relative">
                  {/* Decorative vintage corner markers */}
                  <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t border-l border-[#444B35]/40" />
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t border-r border-[#444B35]/40" />
                  <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b border-l border-[#444B35]/40" />
                  <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b border-r border-[#444B35]/40" />

                  <div className="pt-2">
                    <span className="text-[10px] font-sans uppercase tracking-[0.25em] text-[#444B35] font-medium">
                      Official Portrait Space
                    </span>
                    <div className="w-8 h-[1px] bg-[#B8AA91] mx-auto mt-2" />
                  </div>

                  <div className="space-y-4 my-auto py-6">
                    <div className="w-20 h-20 mx-auto rounded-full border border-[#B8AA91]/60 flex items-center justify-center bg-[#F3EFE4]/60">
                      <span className="font-serif text-2xl text-[#382A22] tracking-wider">
                        CI
                      </span>
                    </div>

                    <div className="space-y-1.5 max-w-xs">
                      <p className="font-serif text-xl text-[#382A22] leading-tight">
                        Chidera Iwuajoku
                      </p>
                      <p className="text-xs font-sans text-[#382A22]/65 leading-relaxed">
                        Reserved for your official professional portrait. Click below or drag and drop your photograph here.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#444B35] text-[#FAF9F5] text-xs font-sans uppercase tracking-[0.14em] font-medium hover:bg-[#382A22] transition-colors shadow-sm"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Photograph</span>
                    </button>
                  </div>

                  <p className="text-[10px] font-sans uppercase tracking-[0.18em] text-[#382A22]/40 pb-1">
                    Editorial Archive · Nigeria
                  </p>
                </div>
              )}

              {/* Bottom frame caption */}
              <div className="mt-2.5 pt-2 border-t border-[#382A22]/10 flex items-center justify-between text-[11px] font-sans text-[#382A22]/60">
                <span className="font-serif italic">Chidera Iwuajoku</span>
                <span className="uppercase tracking-[0.15em] text-[10px]">Consultant</span>
              </div>
            </div>

            {/* Quick upload assistance note */}
            <p className="text-[11px] text-[#382A22]/50 font-sans mt-3 text-center">
              {portraitUrl
                ? 'Your portrait is saved and active on the site.'
                : 'Click above to upload your portrait anytime (JPG, PNG, WebP).'}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
