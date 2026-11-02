import React from 'react';
import { SiteConfig } from '../types/content';

interface ApproachSectionProps {
  config: SiteConfig;
}

export const ApproachSection: React.FC<ApproachSectionProps> = ({ config }) => {
  return (
    <section
      id="approach"
      aria-label="How I Approach Real Estate"
      className="py-20 md:py-32 border-b border-[#382A22]/10"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl space-y-3 pb-12 md:pb-16 border-b border-[#382A22]/10">
          <span className="text-xs font-sans uppercase tracking-[0.25em] text-[#444B35] font-semibold">
            Guiding Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#382A22] font-normal leading-[1.15] text-balance">
            {config.approach.heading}
          </h2>
          <p className="text-base sm:text-lg font-sans font-light text-[#382A22]/80 leading-relaxed pt-2">
            {config.approach.subheading}
          </p>
        </div>

        {/* Three Core Principles — Refined Monograph List with Generous Whitespace */}
        <div className="divide-y divide-[#382A22]/10 pt-4">
          {config.approach.principles.map((principle) => (
            <article
              key={principle.number}
              className="py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              {/* Subtle Editorial Index */}
              <div className="lg:col-span-2 flex items-baseline gap-3">
                <span className="font-serif text-3xl sm:text-4xl text-[#444B35] font-normal tabular-nums">
                  {principle.number}
                </span>
                <span className="text-xs font-sans uppercase tracking-[0.2em] text-[#382A22]/40">
                  Principle
                </span>
              </div>

              {/* Title & Core Principle */}
              <div className="lg:col-span-5 space-y-3">
                <h3 className="text-2xl sm:text-3xl font-serif font-normal text-[#382A22] leading-snug">
                  {principle.title}
                </h3>
                <p className="text-base sm:text-lg font-sans font-normal text-[#382A22]/90 leading-relaxed">
                  {principle.description}
                </p>
              </div>

              {/* In-depth Advisory Detail */}
              <div className="lg:col-span-5 lg:pl-6 text-sm sm:text-base font-sans font-light text-[#382A22]/70 leading-relaxed space-y-2">
                <p>{principle.detail}</p>
              </div>
            </article>
          ))}
        </div>

        {/* Full-width Architectural Supporting Visual Break */}
        <div className="mt-12 md:mt-20 border border-[#B8AA91]/40 bg-[#FAF9F5] p-3 md:p-4 shadow-sm">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] overflow-hidden">
            <img
              src="/src/assets/images/arch_minimalist_facade_1793650824717.jpg"
              alt="Contemporary Nigerian minimalist architectural facade"
              className="w-full h-full object-cover filter contrast-[1.02]"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 pointer-events-none border border-[#382A22]/10" />
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between text-xs font-sans text-[#382A22]/65 gap-2 px-1">
            <span className="font-serif italic text-sm text-[#382A22]">
              Architectural Context & Modern Living Spaces
            </span>
            <span className="uppercase tracking-[0.18em] text-[10px] text-[#444B35] font-medium">
              Property Landscape · Nigeria
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
