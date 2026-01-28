import React, { useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { NavLink } from "react-router-dom";

const NewsLetter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (email) {
      console.log('Email submitted:', email);
      setEmail('');
    }
  };

  return (
    <section className="relative bg-slate-900">

      {/* Hero Image Section */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
        <img
          src="/src/assets/images/portfolio/1.webp"
          alt="Luxury Watches"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[var(--deep-black)]/20"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[var(--electric-blue)]" />
            </div>
            <span className="text-sm uppercase tracking-wider text-[var(--solar-gold)]">INVESTMENT OFFERINGS</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif mb-8 sm:mb-12 max-w-4xl">
            Questions about Solarionis? We would love to hear from you.
          </h2>

          {/* Newsletter Input */}
          <div className="w-full max-w-xl">
            <div className="relative">
              <NavLink className="btn rounded btn-primary">
                CONTACT US
                <ArrowRight className="w-5 h-5" />
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;