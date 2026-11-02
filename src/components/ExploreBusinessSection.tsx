import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { SiteConfig } from '../types/content';
import { PrimeCultureLogo } from './PrimeCultureLogo';

interface ExploreBusinessSectionProps {
  config: SiteConfig;
  brandLogoUrl: string | null;
}

export const ExploreBusinessSection: React.FC<ExploreBusinessSectionProps> = ({
  config,
  brandLogoUrl,
}) => {
  const { exploreBusiness } = config;

  return (
    <section
      id="explore-business"
      aria-label="Explore Prime Culture Homes"
      className="py-20 md:py-28 bg-[#382A22] text-[#FAF9F5] relative overflow-hidden border-b border-[#444B35]/40"
    >
      {/* Background Architectural Scrim & Texture */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <img
          src="/src/assets/images/prime_culture_architecture_1793660522399.jpg"
          alt=""
          className="w-full h-full object-cover filter grayscale contrast-125"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-[#382A22]/90" />
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Logo Badge */}
          <div className="flex justify-center">
            <PrimeCultureLogo
              customLogoUrl={brandLogoUrl}
              variant="dark"
              showWordmark={true}
              className="px-6 py-3 border border-[#B8AA91]/30 bg-[#382A22]/80 backdrop-blur-xs"
            />
          </div>

          {/* Heading */}
          <div className="space-y-3">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#B8AA91] font-medium block">
              {exploreBusiness.eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-normal text-[#FAF9F5] leading-tight text-balance">
              {exploreBusiness.headline}
            </h2>
          </div>

          {/* Supporting Text */}
          <p className="text-base sm:text-lg md:text-xl font-sans font-light text-[#FAF9F5]/85 leading-relaxed max-w-2xl mx-auto text-balance">
            {exploreBusiness.supportingText}
          </p>

          {/* CTAs: Prominent Button + Secondary Text Link */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-8">
            {/* Primary Action Button */}
            <a
              href={exploreBusiness.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#FAF9F5] text-[#382A22] text-xs font-sans uppercase tracking-[0.18em] font-semibold hover:bg-[#F3EFE4] hover:text-[#444B35] transition-all duration-200 shadow-md group"
            >
              <span>{exploreBusiness.primaryCtaText}</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#444B35]" />
            </a>

            {/* Secondary Text Link */}
            <a
              href={exploreBusiness.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-[0.16em] text-[#B8AA91] hover:text-[#FAF9F5] transition-colors py-2 group"
            >
              <span>{exploreBusiness.secondaryCtaText}</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          {/* Subtitle / Company URL Indicator */}
          <p className="text-[11px] font-sans text-[#FAF9F5]/40 tracking-wider pt-4">
            Official Corporate Portal · {exploreBusiness.companyUrl.replace(/^https?:\/\//, '')}
          </p>
        </div>
      </div>
    </section>
  );
};
