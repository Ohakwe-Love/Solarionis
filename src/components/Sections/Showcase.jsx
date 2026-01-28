import React, { useState } from 'react';
import { Watch, Gem, Shield, Package, Clock, Award } from 'lucide-react';

const Showcase = () => {

  const categories = [
    { icon: Watch, label: 'Chronograph Watches', description: 'Precision timing for the modern professional' },
    { icon: Gem, label: 'Luxury Accessories', description: 'Elevate your style with premium additions' },
    { icon: Shield, label: 'Watch Protection', description: 'Premium cases and protective solutions' },
    { icon: Package, label: 'Watch Boxes', description: 'Elegant storage for your collection' },
    { icon: Clock, label: 'Vintage Collection', description: 'Timeless pieces with historic charm' },
    { icon: Award, label: 'Limited Editions', description: 'Exclusive timepieces for collectors' }
  ];

  return (
    <section className="bg-[var(--deep-black)] py-20 lg:px-8 px-2">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <div className="mb-12">
          <p className="section-label">
            SLEEK AND STYLISH
          </p>
          <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Stylish Watch Designs
          </h2>
          <p className="text-gray-400 max-w-3xl">
            Ut Eleifend Mettis Ligula, Porttis Finibus Urna Gravida At. Aenean Vehiculas
            Arcunam Mettis. Integer Dapibus Ac Dui Pretium Blandit. Class Aptent Taciti
          </p>
        </div>

        {/* Interactive Image */}
        <div className="relative mb-16 group">
          <div className="relative overflow-hidden rounded-2xl">
            {/* <img
              src="/src/assets/images/product/1.webp"
              alt="Luxury Watch Showcase"
              className="w-full h-[500px] object-cover"
            /> */}

            <video src="/src/assets/images/clips/1.mp4" className="w-full h-[500px] object-cover" loop muted autoPlay
            ></video>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20"></div>

          </div>
        </div>

        {/* Category Icons Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group cursor-pointer"
            >
              {/* Icon Circle */}
              <div className="relative mb-4">
                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Icon Container */}
                <div className="relative w-20 h-20  rounded-full flex items-center justify-center border border-[var(--primary-color)]/30 group-hover:border-[var(--primary-color)] transition-all duration-300 group-hover:scale-110">
                  <category.icon className="w-8 h-8 text-[var(--primary-color)] group-hover:text-orange-400 transition-colors" strokeWidth={1.5} />
                </div>
              </div>

              {/* Label */}
              <h3 className="text-white font-medium mb-1 group-hover:text-[var(--primary-color)] transition-colors">
                {category.label}
              </h3>

              {/* Description (hidden by default, shows on hover) */}
              <p className="text-gray-500 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 max-w-[150px]">
                {category.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Showcase;