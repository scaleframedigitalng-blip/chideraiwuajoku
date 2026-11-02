import React from 'react';
import { Settings2, ArrowUp, ArrowUpRight } from 'lucide-react';
import { SiteConfig } from '../types/content';

interface FooterProps {
  config: SiteConfig;
  onOpenSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenSettings }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#382A22] text-[#FAF9F5] pt-16 pb-12 font-sans border-t border-[#444B35]/30">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-14 border-b border-[#FAF9F5]/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-serif text-2xl tracking-[0.14em] uppercase font-light text-[#FAF9F5]">
              {config.personal.fullName}
            </h4>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B8AA91]">
              Real Estate Consultant · Nigeria
            </p>
            <p className="text-xs text-[#FAF9F5]/65 leading-relaxed max-w-sm font-light pt-1">
              Independent advisory, comprehensive research, and client-first representation for property acquisition throughout Nigeria.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B8AA91] font-medium">
              Navigation
            </p>
            <ul className="space-y-2 text-xs text-[#FAF9F5]/75">
              <li>
                <a href="#home" className="hover:text-[#FAF9F5] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-[#FAF9F5] transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#approach" className="hover:text-[#FAF9F5] transition-colors">
                  My Approach
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-[#FAF9F5] transition-colors">
                  Leadership
                </a>
              </li>
              <li>
                <a
                  href={config.leadership.companyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF9F5] transition-colors inline-flex items-center gap-1 text-[#B8AA91]"
                >
                  <span>Prime Culture Homes</span>
                  <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FAF9F5] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[#B8AA91] font-medium">
              Direct Contact
            </p>
            <div className="space-y-2 text-xs text-[#FAF9F5]/75">
              <a
                href={`mailto:${config.personal.email}`}
                className="block hover:text-[#FAF9F5] transition-colors break-all"
              >
                {config.personal.email}
              </a>
              <p className="text-[11px] text-[#FAF9F5]/50">
                Operating in Lagos, Abuja & Regional Nigeria
              </p>
              <div className="pt-2 flex items-center gap-4 text-[#B8AA91]">
                <a
                  href={config.personal.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF9F5] transition-colors inline-flex items-center gap-1"
                >
                  <span>LinkedIn</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
                <span aria-hidden="true">·</span>
                <a
                  href={config.personal.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#FAF9F5] transition-colors inline-flex items-center gap-1"
                >
                  <span>Instagram</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF9F5]/50">
          <div className="flex flex-wrap items-center gap-2">
            <span>© {new Date().getFullYear()} Chidera Iwuajoku. All rights reserved.</span>
            <span aria-hidden="true" className="hidden sm:inline">·</span>
            <span>Real Estate Consultant & Founder, Prime Culture Homes · Nigeria</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Site & Portrait Management Modal Trigger */}
            <button
              type="button"
              onClick={onOpenSettings}
              className="inline-flex items-center gap-1.5 text-xs text-[#B8AA91] hover:text-[#FAF9F5] transition-colors focus-visible:outline-none"
              title="Manage site information and portrait"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span>Portrait & Site Settings</span>
            </button>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-xs text-[#FAF9F5]/60 hover:text-[#FAF9F5] transition-colors"
              aria-label="Scroll to top of page"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
