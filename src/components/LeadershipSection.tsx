import React from 'react';
import { ArrowUpRight, Building2, ShieldCheck, Compass } from 'lucide-react';
import { SiteConfig } from '../types/content';
import { PrimeCultureLogo } from './PrimeCultureLogo';

interface LeadershipSectionProps {
  config: SiteConfig;
  brandLogoUrl: string | null;
}

export const LeadershipSection: React.FC<LeadershipSectionProps> = ({
  config,
  brandLogoUrl,
}) => {
  const { leadership } = config;

  return (
    <section
      id="leadership"
      aria-label="Leadership & Entrepreneurship"
      className="py-20 md:py-32 border-b border-[#382A22]/10 bg-[#FAF9F5]/30"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Editorial Section Kicker & Brand Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 md:pb-16 border-b border-[#382A22]/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-sans uppercase tracking-[0.25em] text-[#444B35] font-semibold">
              <span>{leadership.eyebrow}</span>
              <span aria-hidden="true" className="text-[#B8AA91]">·</span>
              <span>Founder Perspective</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#382A22] font-normal leading-[1.15] text-balance">
              {leadership.headline}
            </h2>
          </div>

          <div className="pt-2 md:pt-0">
            <PrimeCultureLogo customLogoUrl={brandLogoUrl} variant="light" />
          </div>
        </div>

        {/* 2-Column Editorial Grid: Narrative vs. Visual & Leadership Lockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-12 md:pt-16 items-start">
          {/* Left Column: Narrative Prose */}
          <div className="lg:col-span-7 space-y-8">
            {/* Leadership Role Callout */}
            <div className="border-l-2 border-[#444B35] pl-5 space-y-1 py-1">
              <p className="font-serif text-2xl sm:text-3xl text-[#382A22] font-normal">
                {config.personal.fullName}
              </p>
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#444B35] font-semibold">
                {leadership.role}, {leadership.companyName}
              </p>
            </div>

            {/* Lead Editorial Statement */}
            <p className="text-xl sm:text-2xl font-serif text-[#382A22] leading-relaxed font-normal">
              "{leadership.supportingMessage}"
            </p>

            {/* Contextual Paragraphs */}
            <div className="space-y-5 text-base sm:text-[17px] font-sans font-light leading-relaxed text-[#382A22]/85">
              {leadership.paragraphs.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>

            {/* Brand Core Pillars */}
            <div className="pt-6 border-t border-[#382A22]/10 space-y-5">
              <p className="text-xs font-sans uppercase tracking-[0.2em] text-[#444B35] font-semibold">
                Foundation of Prime Culture Homes
              </p>

              <div className="space-y-4">
                {leadership.corePillars.map((pillar, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 pb-3 border-b border-[#382A22]/5"
                  >
                    <span className="sm:col-span-4 font-serif text-base text-[#382A22] font-normal">
                      {pillar.title}
                    </span>
                    <span className="sm:col-span-8 text-xs sm:text-sm font-sans font-light text-[#382A22]/70 leading-relaxed">
                      {pillar.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Link to Company Website */}
            <div className="pt-2">
              <a
                href={leadership.companyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#444B35] text-[#FAF9F5] text-xs font-sans uppercase tracking-[0.16em] font-medium hover:bg-[#382A22] transition-colors shadow-sm group"
              >
                <span>Visit {leadership.companyName}</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {/* Right Column: Refined Editorial Visual & Brand Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Architectural Brand Image */}
            <div className="relative aspect-[4/3] bg-[#FAF9F5] border border-[#B8AA91]/40 overflow-hidden shadow-sm">
              <img
                src="/src/assets/images/prime_culture_architecture_1793660522399.jpg"
                alt="Prime Culture Homes architectural standard and residential quality"
                className="w-full h-full object-cover filter contrast-[1.02]"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 pointer-events-none border border-[#382A22]/10" />
            </div>

            {/* Photo Caption */}
            <div className="flex items-center justify-between text-xs text-[#382A22]/65 font-sans border-b border-[#382A22]/10 pb-3">
              <span className="font-serif italic text-sm text-[#382A22]">
                Architectural Integrity & Vision
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#444B35] font-medium">
                Prime Culture Homes
              </span>
            </div>

            {/* Dual Identity Editorial Note */}
            <div className="p-6 bg-[#FAF9F5] border border-[#B8AA91]/30 space-y-3">
              <div className="flex items-center gap-2 text-[#444B35]">
                <Building2 className="w-4 h-4" />
                <span className="text-xs font-sans uppercase tracking-[0.18em] font-semibold">
                  Dual Capacity
                </span>
              </div>
              <p className="text-xs font-sans text-[#382A22]/75 leading-relaxed font-light">
                Consultancy offers personalized, confidential advisory for specific property mandates. Prime Culture Homes provides access to organized property development, investment vehicles, and institutional ownership opportunities in Nigeria.
              </p>
            </div>

            {/* Trust & Transparency Commitments */}
            <div className="p-5 border border-[#382A22]/10 bg-[#F3EFE4]/60 space-y-2 text-xs text-[#382A22]/75">
              <div className="flex items-center gap-1.5 text-[#382A22] font-serif italic text-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-[#444B35]" />
                <span>Foundational Standard</span>
              </div>
              <p className="leading-relaxed font-light">
                Both the personal advisory and corporate practice adhere strictly to factual verification, legal title confirmation, and zero ambiguity in client dealings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
