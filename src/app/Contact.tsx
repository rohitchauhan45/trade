"use client";

import { useState, useEffect } from "react";
import Navbar from "./Navbar";

export default function Contact() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-dvh px-2 sm:px-4 lg:px-12 pt-4 pb-4 sm:pb-6 lg:pb-8 bg-gradient-to-br from-[#0b0f17] to-[#0a0a0a] sm:from-[#f8fafc] sm:to-[#eef2ff] dark:from-[#0b0f17] dark:to-[#0a0a0a] text-white font-sans">
      <div className="mx-auto max-w-7xl">
        {/* Navbar */}
        <div className="mb-6">
          <Navbar/>
        </div>

        {/* Contact header aligns with content on the right */}
        <div className="mt-8 sm:mt-12 lg:mt-20 pl-0 sm:pl-4 lg:pl-10 grid grid-cols-1 lg:grid-cols-2 ">
          <div className="hidden lg:block" />
          <h1 className="text-[20px] sm:text-2xl lg:text-3xl font-sans lg:justify-self-start text-center lg:text-left">
            Contact Us
          </h1>
        </div>

        {/* Main Content Area */}
        <div className="mt-6 pl-20 sm:pl-0 sm:mt-8 lg:mt-10 grid gap-8 sm:gap-10 lg:gap-12 grid-cols-1 lg:grid-cols-2">
          {/* Left Column */}
          <div className="flex pt-8 sm:pt-12 lg:pt-15 items-center sm:items-start">
            <h2 className="leading-11 sm:leading-20">
              <span className="block text-[40px] sm:text-[50px] lg:text-[64px] xl:text-[70px] pl-8 sm:pl-8 lg:pl-15 font-bold text-white">Welcome to</span>
              <span className="block text-[40px] sm:text-[50px] lg:text-[64px] xl:text-[70px] pl-0 font-semibold text-white/40">our Postgenius</span>
            </h2>
          </div>

          {/* Right Column */}
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Core Verticals Section */}
            

            {/* Address Section */}
            <div>
              <h3 className="text-xl sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-3 pl-16 sm:pl-0">
                Address
              </h3>
              <p className="text-lg sm:text-base lg:text-lg text-gray-400 mb-2 pl-7 sm:pl-0">
                <span className="block lg:inline">Sun Builders Group,</span>
                <span className="block lg:inline lg:ml-1"> Sindhubhavan</span>
                <br className="hidden lg:block" />
                <span className="block lg:inline"> Ahmedabad,</span>
                <span className="block lg:inline lg:ml-1"> Gujarat 380059.</span>
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg sm:text-base lg:text-lg text-blue-300 pl-7 sm:pl-0"
              >
                Get Direction
              </a>
            </div>

            {/* Contact Numbers */}
            <div>
              <p className="text-lg sm:text-base lg:text-lg text-gray-200 mb-2 pl-7 sm:pl-0">
                +91 90813 39933
              </p>
              <p className="text-lg sm:text-base lg:text-lg text-gray-200 pl-7 sm:pl-0">
                +91 81288 28888
              </p>
            </div>

            {/* Email Addresses */}
            <div>
              <p className="text-lg sm:text-base lg:text-lg text-gray-200 mb-2 pl-7 sm:pl-0">
                postgenius@gmail.com
              </p>
              <p className="text-lg sm:text-base lg:text-lg text-gray-200 pl-7 sm:pl-0">
                nidhisai@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black border border-white flex items-center justify-center z-50 transition-opacity"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}

