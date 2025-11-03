"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest('.menu-container')) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMenuOpen]);

  return (
    <div className="mb-6 flex items-center justify-between relative">
      {/* Left side: PG logo */}
      <Link href="/" className="text-2xl font-bold text-white sm:text-gray-900 dark:text-white hover:opacity-80 transition-opacity cursor-pointer">
        PG
      </Link>

      {/* Right side: View Website button and Burger menu */}
      <div className="flex items-center gap-2 sm:gap-4 menu-container relative">
        {/* Small View Website button - visible only on mobile when menu is closed */}
        {!isMenuOpen && (
          <a
            href="https://postgenius-flame.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex sm:hidden items-center gap-1 px-2 py-1.5 text-xs font-medium text-white bg-black border border-white rounded-full hover:opacity-80 transition-opacity"
          >
            <span>View Website</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}
        {/* View Website button - hidden when menu is open and hidden on mobile */}
        {!isMenuOpen && (
          <a
            href="https://postgenius-flame.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-lg font-medium text-white bg-black border border-white rounded-full hover:opacity-80 transition-opacity"
          >
            View Website
            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        )}

        {/* Burger menu button - hidden when menu is open */}
        {!isMenuOpen && (
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="absolute-fixed w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black border-0 flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Menu"
          >
            <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}

        {/* Dropdown menu - aligned with button position when open */}
        {isMenuOpen && (
          <div className="absolute right-0 top-0 w-[280px] sm:w-[21rem] bg-black rounded-t-2xl rounded-b-2xl shadow-lg z-50 overflow-hidden border border-white/10">
            {/* X button in top right */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-white rounded-full z-10 hover:bg-white/10 transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5 sm:w-7 sm:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="pb-4 pt-8 sm:pt-6 px-4 sm:pl-6">
              <Link
                href="/Contact"
                className="block px-3 sm:px-6 py-2.5 sm:py-3 text-base sm:text-xl font-sans text-white rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
              <Link
                href="/About"
                className="block px-3 sm:px-6 py-2.5 sm:py-3 text-base sm:text-xl font-sans text-white rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <a
                href="https://postgenius-flame.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 sm:px-6 py-2.5 sm:py-3 text-base sm:text-xl font-sans text-white rounded-lg hover:bg-white/5 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                View Website
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
