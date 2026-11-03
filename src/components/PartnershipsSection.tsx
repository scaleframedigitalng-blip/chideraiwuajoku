import React from 'react';
import { Building2 } from 'lucide-react';
import { PartnerBrand, SiteConfig } from '../types/content';

interface PartnershipsSectionProps {
  config: SiteConfig;
  partners: PartnerBrand[];
}

export const PartnershipsSection: React.FC<PartnershipsSectionProps> = ({
  config,
  partners,
}) => {
  const { partnerships } = config;

  return (
    <section
      id="affiliations"
      aria-label="Professional Affiliations & Partnerships"
      className="py-16 md:py-24 border-b border-[#382A22]/10 bg-[#FAF9F5]/60"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="pb-10 md:pb-12 border-b border-[#382A22]/10">
          <div className="space-y-2">
            <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#444B35] font-semibold">
              Professional Representation
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-[#382A22] font-normal tracking-tight">
              {partnerships.heading}
            </h2>
          </div>
        </div>

        {/* Logos Display Grid / Horizontal Arrangement */}
        {partners.length > 0 ? (
          <div className="pt-10 md:pt-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="group relative flex flex-col items-center justify-center p-8 sm:p-10 bg-[#FAF9F5] border border-[#B8AA91]/35 transition-all duration-200 hover:border-[#444B35]/40 hover:shadow-[0_4px_20px_rgba(56,42,34,0.04)]"
                >
                  {/* Logo Container: preserving natural aspect ratio, proportions and colours without distortion */}
                  <div className="w-full h-24 sm:h-28 flex items-center justify-center">
                    <img
                      src={partner.logoUrl}
                      alt={partner.name || 'Affiliated Real Estate Company Logo'}
                      className="max-h-full max-w-full object-contain filter contrast-[1.02] transition-transform duration-200 group-hover:scale-[1.02]"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  {/* Optional Company Name */}
                  {partner.showName && partner.name && (
                    <div className="mt-5 pt-3 border-t border-[#382A22]/10 w-full text-center">
                      <span className="font-serif text-sm text-[#382A22]/85 tracking-wide block">
                        {partner.name}
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Quiet Contextual Footnote */}
            <p className="text-[11px] font-sans text-[#382A22]/50 text-center mt-8 font-light">
              Showcasing established real estate companies and property developments professionally represented or worked alongside.
            </p>
          </div>
        ) : (
          <div className="pt-12 pb-8 text-center max-w-lg mx-auto space-y-3">
            <div className="w-12 h-12 mx-auto border border-[#B8AA91]/50 flex items-center justify-center bg-[#F3EFE4]">
              <Building2 className="w-5 h-5 text-[#444B35]" />
            </div>
            <p className="text-xs font-sans text-[#382A22]/60 font-light">
              Professional affiliations and brand representations.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
