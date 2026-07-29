import React from 'react';

interface LogoProps {
  variant?: 'full' | 'navbar' | 'markOnly' | 'hero';
  className?: string;
  subtext?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'navbar',
  className = '',
  subtext = true
}) => {
  const isHero = variant === 'hero' || variant === 'full';

  return (
    <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
      {/* Official BL Mark with sparkle & sub-label */}
      <div className="flex flex-col items-center justify-center shrink-0">
        <svg
          width={isHero ? '52' : '42'}
          height={isHero ? '44' : '34'}
          viewBox="0 0 126 96"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform group-hover:scale-105 duration-200"
        >
          {/* Main B character */}
          <path
            d="M 18 8 H 48 C 64 8, 74 17, 74 28 C 74 37, 67 42, 58 44 C 67 46, 75 52, 75 64 C 75 76, 63 84, 46 84 H 18 V 8 Z M 34 22 V 36 H 46 C 52 36, 56 34, 56 29 C 56 24, 52 22, 46 22 H 34 Z M 34 50 V 70 H 48 C 55 70, 59 67, 59 60 C 59 53, 55 50, 48 50 H 34 Z"
            fill="black"
          />

          {/* L character vertical bar */}
          <path
            d="M 82 8 H 98 V 84 H 82 V 8 Z"
            fill="black"
          />

          {/* L character bottom horizontal pill */}
          <rect
            x="82"
            y="66"
            width="38"
            height="18"
            rx="9"
            fill="black"
          />

          {/* Sparkle star positioned at bottom-left corner of letter B */}
          <path
            d="M 18 56 Q 18 76 38 76 Q 18 76 18 96 Q 18 76 -2 76 Q 18 76 18 56 Z"
            fill="black"
            stroke="white"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>

        {/* BONSAI Labs text directly under mark */}
        <span className="text-[8px] sm:text-[9px] font-extrabold tracking-tight text-black uppercase font-sans mt-0.5 leading-none">
          BONSAI Labs
        </span>
      </div>

      {/* Main Wordmark: bonsailabs.in */}
      {variant !== 'markOnly' && (
        <div className="flex flex-col leading-none justify-center">
          <div className="flex items-baseline">
            <span
              className={`font-black tracking-tight font-sans text-black ${
                isHero ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
              }`}
            >
              bonsailabs
            </span>
            <span
              className={`font-black tracking-tight font-sans text-gray-400 ${
                isHero ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'
              }`}
            >
              .in
            </span>
          </div>

          {/* Subtitle / Tagline */}
          {(subtext || isHero) && (
            <span
              className={`font-sans font-medium text-black tracking-tight mt-1 ${
                isHero ? 'text-xs sm:text-sm' : 'text-[11px]'
              }`}
            >
              The zero-fluff B2B technical encyclopedia
            </span>
          )}
        </div>
      )}
    </div>
  );
};
