import React from 'react';
import { SiteConfig } from '../types/content';

interface AboutSectionProps {
  config: SiteConfig;
  portraitUrl: string | null;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ config, portraitUrl }) => {
  return (
    <section
      id="about"
      aria-label="About Chidera Iwuajoku"
      className="py-20 md:py-32 border-b border-[#382A22]/10 bg-[#FAF9F5]/40"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 md:pb-16 border-b border-[#382A22]/10">
          <div className="space-y-2">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#444B35] font-semibold">
              Biography & Perspective
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#382A22] font-normal leading-[1.15] text-balance">
              {config.about.heading}
            </h2>
          </div>

          <p className="text-xs font-sans uppercase tracking-[0.18em] text-[#382A22]/50">
            Advisory Focus · Nigeria
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 md:pt-16 items-start">
          {/* Left Column: Visual Composition (Editorial Architectural Photo + Optional Portrait Accent) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[4/3] bg-[#FAF9F5] border border-[#B8AA91]/40 overflow-hidden shadow-sm">
              <img
                src="/src/assets/images/arch_interior_editorial_1793650824382.jpg"
                alt="Contemporary architectural interior with understated natural textures"
                className="w-full h-full object-cover filter contrast-[1.02]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 pointer-events-none border border-[#382A22]/10" />
            </div>

            {/* Editorial Caption with authentic context */}
            <div className="flex items-center justify-between text-xs text-[#382A22]/65 font-sans border-b border-[#382A22]/10 pb-3">
              <span className="font-serif italic text-sm text-[#382A22]">
                Architectural Form & Context
              </span>
              <span className="text-[10px] uppercase tracking-[0.15em] text-[#382A22]/50">
                Spatial Study
              </span>
            </div>

            {/* Profile Detail Badge if portrait uploaded */}
            {portraitUrl && (
              <div className="p-4 bg-[#FAF9F5] border border-[#B8AA91]/30 flex items-center gap-4">
                <img
                  src={portraitUrl}
                  alt="Chidera Iwuajoku detail"
                  className="w-14 h-14 object-cover object-top border border-[#382A22]/15"
                />
                <div className="text-xs">
                  <p className="font-serif font-medium text-sm text-[#382A22]">Chidera Iwuajoku</p>
                  <p className="text-[#382A22]/60 mt-0.5">Real Estate Consultant · Nigeria</p>
                </div>
              </div>
            )}

            {/* Note on Transparency & Standards */}
            <div className="p-5 border border-[#382A22]/10 bg-[#F3EFE4]/60 text-xs text-[#382A22]/75 space-y-2">
              <p className="font-serif italic text-sm text-[#382A22]">Professional Transparency</p>
              <p className="leading-relaxed font-light">
                Every consultation is conducted with complete confidentiality, independent property analysis, and fiduciary dedication to the client’s long-term objectives.
              </p>
            </div>
          </div>

          {/* Right Column: Editorial Text Body */}
          <div className="lg:col-span-7 space-y-8 text-[#382A22]">
            {/* Lead paragraph in larger editorial serif */}
            <p className="text-xl sm:text-2xl font-serif text-[#382A22] leading-relaxed font-normal">
              {config.about.leadParagraph}
            </p>

            {/* Secondary paragraphs in crisp, readable sans-serif */}
            <div className="space-y-5 text-base sm:text-[17px] font-sans font-light leading-relaxed text-[#382A22]/85">
              {config.about.paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Areas of Practice (Unboxed, elegant typography with separators) */}
            <div className="pt-6 border-t border-[#382A22]/10 space-y-4">
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#444B35] font-semibold">
                Core Consultation Areas
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm font-sans text-[#382A22]/80">
                {config.about.focusAreas.map((area, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 py-1">
                    <span className="w-1.5 h-1.5 bg-[#444B35]/70" />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Editable Profile Note Placeholder (per instructions: "Use editable placeholder text wherever additional personal information is required") */}
            <div className="pt-6 border-t border-[#382A22]/10 text-xs text-[#382A22]/60 italic font-serif">
              <span>
                "Real estate in Nigeria is continually redefined by evolving infrastructure and shifting demographics. The only reliable anchor is meticulous inquiry."
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
