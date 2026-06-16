"use client";

import Link from "next/link";

export function Logo({ size = 34, showText = true, onClick }: { size?: number; showText?: boolean; onClick?: (e: React.MouseEvent) => void }) {
  const content = (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Uychi Hub"
      >
        <path
          d="M20 1.5L37 11.25V28.75L20 38.5L3 28.75V11.25L20 1.5Z"
          fill="url(#lg1)"
        />
        <path
          d="M20 5.5L33.5 13.25V26.75L20 34.5L6.5 26.75V13.25L20 5.5Z"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.2"
        />
        <path
          d="M13.5 13.5V22.5C13.5 26.642 16.858 30 21 30C25.142 30 28.5 26.642 28.5 22.5V13.5"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="13.5" cy="13.5" r="2" fill="white" opacity="0.9" />
        <circle cx="28.5" cy="13.5" r="2" fill="white" opacity="0.9" />
        <line x1="13.5" y1="13.5" x2="9" y2="13.5" stroke="white" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
        <circle cx="8" cy="13.5" r="1" fill="white" opacity="0.4" />
        <line x1="28.5" y1="13.5" x2="33" y2="13.5" stroke="white" strokeWidth="1" strokeOpacity="0.4" strokeLinecap="round" />
        <circle cx="34" cy="13.5" r="1" fill="white" opacity="0.4" />

        <defs>
          <linearGradient id="lg1" x1="3" y1="1.5" x2="37" y2="38.5" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
      </svg>

      {showText && (
        <span className="text-[15px] font-bold tracking-tight text-foreground">
          Uychi<span className="text-accent">.Hub</span>
        </span>
      )}
    </>
  );

  if (onClick) {
    return <div onClick={onClick} className="flex items-center gap-2.5 select-none cursor-pointer">{content}</div>;
  }

  return <Link href="/" className="flex items-center gap-2.5 select-none">{content}</Link>;
}
