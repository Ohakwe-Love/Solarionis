import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { NavLink } from "react-router-dom";
import { DEFAULT_HOME_PAGE_CONTENT } from '../../content/defaultHomePageContent';

const NewsLetter = ({ content = DEFAULT_HOME_PAGE_CONTENT.newsletter }) => {
  return (
    <section className="relative bg-slate-900">

      {/* Hero Image Section */}
      <div className="relative h-[400px] sm:h-[500px] lg:h-[600px]">
        <img
          src="/images/portfolio/1.webp"
          alt="Luxury Watches"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-(--deep-black)/20"></div>

        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Zap className="w-4 h-4 text-(--solar-gold)" />
            </div>
            <span className="text-sm uppercase tracking-wider text-(--solar-gold)">{content.eyebrow}</span>
          </div>
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-serif mb-8 sm:mb-12 max-w-4xl">
            {content.title}
          </h2>

          {/* Newsletter Input */}
          <div className="w-full max-w-xl">
            <div className="relative">
              <NavLink to={content.button_href || DEFAULT_HOME_PAGE_CONTENT.newsletter.button_href} className="btn rounded btn-primary">
                {content.button_label || DEFAULT_HOME_PAGE_CONTENT.newsletter.button_label}
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
