import React from 'react';

const ScrollingCarousel = () => {
  const slides = [
    "Timeless Elegance For Every Wrist",
    "Precision Crafted Luxury Timepieces",
    "Revamp Your Style Elegantly",
    "Swiss Mastery In Every Detail",
    "Horological Excellence Redefined"
  ];

  return (
    <div className="bg-[var(--primary-color)] py-6 px-8 relative overflow-hidden">
      <div className="relative">
        
        {/* Scrolling Content */}
        <div className="flex animate-scroll whitespace-nowrap">
          {/* First set */}
          {slides.map((slide, index) => (
            <div key={`first-${index}`} className="inline-flex items-center mx-8">
              <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-serif">
                {slide}
              </h2>
              <span className="mx-8 text-black text-2xl">•</span>
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {slides.map((slide, index) => (
            <div key={`second-${index}`} className="inline-flex items-center mx-8">
              <h2 className="text-black text-2xl md:text-3xl lg:text-4xl font-serif">
                {slide}
              </h2>
              <span className="mx-8 text-black text-2xl">•</span>
            </div>
          ))}
        </div>

      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
        }

        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default ScrollingCarousel;