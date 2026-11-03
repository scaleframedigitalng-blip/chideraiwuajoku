import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'approach', 'affiliations', 'leadership', 'contact'];
      const current = sections.find((section) => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 220 && rect.bottom >= 220;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'My Approach', href: '#approach', id: 'approach' },
    { label: 'Affiliations', href: '#affiliations', id: 'affiliations' },
    { label: 'Leadership', href: '#leadership', id: 'leadership' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F3EFE4]/95 backdrop-blur-md border-b border-[#382A22]/10 py-3.5 shadow-[0_2px_12px_rgba(56,42,34,0.03)]'
            : 'bg-transparent py-5 md:py-6 border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#home"
            className="text-lg md:text-xl font-serif tracking-[0.18em] font-medium text-[#382A22] uppercase whitespace-nowrap shrink-0 transition-opacity hover:opacity-80"
          >
            Chidera Iwuajoku
          </a>

          {/* Zone 2: 5 clean single-line text navigation links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-7 text-xs font-sans uppercase tracking-[0.15em] text-[#382A22]/75"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`transition-colors whitespace-nowrap shrink-0 pb-1 relative hover:text-[#382A22] ${
                    isActive ? 'text-[#382A22] font-semibold' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#444B35]" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-sans tracking-[0.12em] uppercase font-medium text-[#FAF9F5] bg-[#444B35] rounded-none hover:bg-[#382A22] transition-colors whitespace-nowrap shrink-0 shadow-sm"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-80" />
            </a>

            {/* Mobile / Tablet hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#382A22] hover:text-[#444B35] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#444B35]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile navigation overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#F3EFE4] pt-24 px-6 pb-10 flex flex-col justify-between lg:hidden transition-opacity duration-200"
          role="dialog"
          aria-modal="true"
        >
          <div className="space-y-6">
            <p className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#382A22]/50 pb-2 border-b border-[#382A22]/10">
              Navigation
            </p>
            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-serif tracking-wide py-2 transition-colors ${
                    activeSection === link.id
                      ? 'text-[#444B35] font-medium pl-2 border-l border-[#444B35]'
                      : 'text-[#382A22] hover:text-[#444B35]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="pt-8 border-t border-[#382A22]/10 space-y-4">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 px-5 bg-[#444B35] text-[#FAF9F5] text-xs uppercase tracking-[0.15em] font-medium"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <div className="flex items-center justify-between text-xs text-[#382A22]/60 pt-2 font-serif italic">
              <span>Chidera Iwuajoku</span>
              <span>Founder & CEO, Prime Culture Homes</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
