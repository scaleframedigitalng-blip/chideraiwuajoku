import React from 'react';

interface PrimeCultureLogoProps {
  customLogoUrl?: string | null;
  variant?: 'light' | 'dark' | 'card';
  showWordmark?: boolean;
  className?: string;
}

export const PrimeCultureLogo: React.FC<PrimeCultureLogoProps> = ({
  customLogoUrl,
  variant = 'light',
  showWordmark = true,
  className = '',
}) => {
  if (customLogoUrl) {
    return (
      <div className={`flex items-center gap-3.5 ${className}`}>
        <img
          src={customLogoUrl}
          alt="Prime Culture Homes"
          className="h-10 sm:h-12 w-auto object-contain"
          referrerPolicy="no-referrer"
        />
        {showWordmark && (
          <div className="text-left">
            <span
              className={`block font-serif text-base tracking-[0.18em] uppercase ${
                variant === 'dark' ? 'text-[#FAF9F5]' : 'text-[#382A22]'
              }`}
            >
              Prime Culture Homes
            </span>
            <span
              className={`block font-sans text-[10px] tracking-[0.25em] uppercase ${
                variant === 'dark' ? 'text-[#B8AA91]' : 'text-[#444B35]'
              }`}
            >
              Real Estate
            </span>
          </div>
        )}
      </div>
    );
  }

  // Bespoke architectural insignia & wordmark adhering to the vintage editorial Apple aesthetic
  const isDark = variant === 'dark';

  return (
    <div className={`inline-flex items-center gap-3.5 ${className}`}>
      {/* Insignia Mark */}
      <div
        className={`w-11 h-11 sm:w-12 sm:h-12 shrink-0 border flex items-center justify-center relative transition-colors ${
          isDark
            ? 'border-[#B8AA91]/40 bg-[#FAF9F5]/5 text-[#FAF9F5]'
            : 'border-[#382A22]/20 bg-[#FAF9F5] text-[#382A22]'
        }`}
        aria-hidden="true"
      >
        {/* Subtle architectural hairline geometry */}
        <div className="absolute inset-1 border border-current opacity-20" />
        <div className="relative flex flex-col items-center justify-center">
          <span className="font-serif text-sm tracking-widest font-normal">
            PCH
          </span>
          <span className="w-3 h-[1px] bg-current opacity-40 mt-0.5" />
        </div>
      </div>

      {/* Brand Wordmark */}
      {showWordmark && (
        <div className="text-left">
          <span
            className={`block font-serif text-base sm:text-lg tracking-[0.18em] uppercase leading-tight font-normal ${
              isDark ? 'text-[#FAF9F5]' : 'text-[#382A22]'
            }`}
          >
            Prime Culture Homes
          </span>
          <span
            className={`block font-sans text-[10px] tracking-[0.22em] uppercase mt-0.5 ${
              isDark ? 'text-[#B8AA91]' : 'text-[#444B35] font-medium'
            }`}
          >
            Property Ownership · Nigeria
          </span>
        </div>
      )}
    </div>
  );
};
