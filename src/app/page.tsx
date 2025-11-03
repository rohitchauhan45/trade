"use client";

import Home from "./Home";
import Navbar from "./Navbar";

// Add CSS to hide scrollbars and typing effect
const hideScrollbarCSS = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .typing-text {
    animation: typing 2s steps(25, end), blink-caret 0.75s step-end infinite;
    white-space: nowrap;
    overflow: hidden;
    border-right: 2px solid white;
  }
  
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  
  @keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: white; }
  }
  
  .hover\\:rotateY-5:hover {
    transform: rotateY(5deg);
  }
  
  .hover\\:rotateX-5:hover {
    transform: rotateX(5deg);
  }

  /* Loading animations */
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(180deg); }
  }

  @keyframes float-delayed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-8px) rotate(-180deg); }
  }

  @keyframes float-slow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-12px) rotate(90deg); }
  }

  .animate-shimmer {
    animation: shimmer 2s infinite;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 3.5s ease-in-out infinite;
    animation-delay: 0.5s;
  }

  .animate-float-slow {
    animation: float-slow 4s ease-in-out infinite;
    animation-delay: 1s;
  }
`;

// Inject CSS
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = hideScrollbarCSS;
  document.head.appendChild(style);
}

export default function Page() {
  return (
    <div className="min-h-dvh px-2 sm:px-4 lg:px-12 py-4 sm:py-6 lg:py-8 bg-gradient-to-br from-[#0b0f17] to-[#0a0a0a] sm:from-[#f8fafc] sm:to-[#eef2ff] dark:from-[#0b0f17] dark:to-[#0a0a0a]">
      <div className="mx-auto max-w-8xl">
        {/* Header */}
        <Navbar />
        <Home />
      </div>
    </div>
  );
}
