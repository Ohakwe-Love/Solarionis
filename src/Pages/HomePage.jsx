import React from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Sections/Hero';
import HowItWorks from '../components/Sections/HowItWorks';
import RetirementInvestment from '../components/Sections/RetirementInvestment';
import Portfolio from '../components/Sections/Portfolio';
import Testimonials from '../components/Sections/Testimonials';
import NewsLetter from '../components/Sections/NewsLetter';
import Footer from '../components/Layout/Footer';
import InvestorTypes from '../components/Sections/InvestorTypes';
import { API_ENDPOINTS } from '../config/api';
import { DEFAULT_HOME_PAGE_CONTENT, normalizeHomePageContent } from '../content/defaultHomePageContent';
import { TrendingUp, Globe, Shield, Calendar, ArrowRight, Check, Leaf } from 'lucide-react';

const featureIconMap = {
  'trending-up': <TrendingUp className="w-6 h-6" />,
  globe: <Globe className="w-6 h-6" />,
  shield: <Shield className="w-6 h-6" />,
  calendar: <Calendar className="w-6 h-6" />,
  leaf: <Leaf className="w-6 h-6" />,
};

const badgeToneClasses = {
  green: 'bg-green-500/20 text-green-600',
  gold: 'bg-[#FDBA4D]/20 text-[#f99b04]',
  orange: 'bg-[#F97316]/20 text-[#F97316]',
  violet: 'bg-[#7C3AED]/20 text-[#7C3AED]',
};

export default function HomePage() {
  const [content, setContent] = React.useState(DEFAULT_HOME_PAGE_CONTENT);

  React.useEffect(() => {
    const run = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.HOMEPAGE_CONTENT, {
          headers: { Accept: 'application/json' },
        });
        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          setContent(normalizeHomePageContent(data?.content));
        }
      } catch {
        // keep defaults
      }
    };

    run();
  }, []);

  const getValueColor = (value) => {
    const numValue = parseFloat(value);
    if (numValue < 0) return 'text-red-500';
    if (numValue > 10) return 'text-green-600';
    return 'text-gray-700';
  };

  return (
    <div>
      <Hero content={content.hero} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-(--deep-black) text-white">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <div className="space-y-8 lg:space-y-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
              {content.why_choose.title}
            </h1>

            <div className="space-y-6">
              {content.why_choose.items.map((feature, index) => (
                <div key={`${feature.title}-${index}`} className="flex gap-4 items-start group hover:translate-x-2 transition-transform duration-300">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <div style={{ color: feature.color }}>
                      {featureIconMap[feature.icon_key] || featureIconMap['trending-up']}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: 'Mulish, sans-serif' }}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <Link to={content.why_choose.button_href || '/about'} className="btn btn-primary rounded">
              {String(content.why_choose.button_label || 'Learn More').toUpperCase()}
              <ArrowRight />
            </Link>
          </div>

          <div className="w-full">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px]">
                  <thead>
                    <tr className="border-b-2 border-gray-200">
                      <th className="px-4 sm:px-6 py-4 text-left text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-wider">
                        Year
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-[#FDBA4D]"></div>
                            <span className="text-xs sm:text-sm font-bold text-gray-800">Solarionis</span>
                          </div>
                          <span className="text-[10px] text-gray-500">1</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-gray-800">Public REITs</span>
                          <span className="text-[10px] text-gray-500">2</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-gray-800">S&amp;P 500</span>
                          <span className="text-[10px] text-gray-500">3</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.performance.rows.map((row, index) => (
                      <tr
                        key={row.year}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index === 0 ? 'bg-[#FDBA4D]/10' : ''}`}
                      >
                        <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-bold text-gray-800">
                          {row.year}
                        </td>
                        <td className={`px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold ${index === 0 ? 'text-[#052C05] text-xl sm:text-2xl' : 'text-green-600'}`}>
                          {row.solarionis}
                        </td>
                        <td className={`px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold ${getValueColor(row.reits)}`}>
                          {row.reits}
                        </td>
                        <td className={`px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold ${getValueColor(row.sp500)}`}>
                          {row.sp500}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
                <p className="text-xs text-gray-600 text-center">
                  {content.performance.footnote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-black bg-gray-100">
        <div className="text-center mb-12 lg:mb-16">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-[#FDBA4D]" />
            </div>
            <span className="text-sm uppercase tracking-wider text-gray-600">{content.market_trends.eyebrow}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            {content.market_trends.title}
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            {content.market_trends.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 relative bg-white rounded-4xl p-4">
          {content.market_trends.cards.map((card, cardIndex) => {
            const isGold = card.accent === 'gold';
            const borderColor = isGold ? 'border-[#FDBA4D]/50' : 'border-[#38BDF8]/50';
            const overlayColor = isGold ? 'from-[#FDBA4D]/5' : 'from-[#38BDF8]/5';
            const hoverText = isGold ? 'hover:text-[#FDBA4D]' : 'hover:text-[#38BDF8]';
            const titleParts = String(card.title || '').split(' ');

            return (
              <div
                key={`${card.title}-${cardIndex}`}
                className={`bg-white/5 backdrop-blur-sm rounded-3xl p-6 lg:p-10 border sm:border-white/10 lg:border-white/10 ${borderColor} transition-all duration-300 hover:bg-white/10 group relative overflow-hidden`}
              >
                <div className={`absolute inset-0 bg-linear-to-br ${overlayColor} to-transparent opacity-100 sm:opacity-0 lg:opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  <div className="flex flex-wrap gap-3 mb-6">
                    {card.badges.map((badge, badgeIndex) => (
                      <span
                        key={`${badge.label}-${badgeIndex}`}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-bold ${badgeToneClasses[badge.tone] || 'bg-zinc-200 text-zinc-800'}`}
                      >
                        <Check className='w-6 h-6' /> {String(badge.label).toUpperCase()}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                    {titleParts[0]}<br />{titleParts.slice(1).join(' ')}
                  </h3>

                  <p className="text-gray-600 text-base leading-relaxed mb-8">
                    {card.description}
                  </p>

                  <Link to={card.button_href || '/about'} className={`group/btn flex items-center gap-2 text-black font-bold ${hoverText} transition-colors duration-300 cursor-pointer`}>
                    {String(card.button_label || 'Learn More').toUpperCase()}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>
              </div>
            );
          })}

          <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-20 h-20 rounded-full border-4 border-(--violet) bg-white flex items-center justify-center shadow-2xl">
              <img src="/images/logo/icon.png" alt="" />
            </div>
          </div>
        </div>
      </div>

      <HowItWorks content={content.how_it_works} />

      <InvestorTypes content={content.investor_types} />

      <RetirementInvestment content={content.retirement} />

      <Portfolio />

      <Testimonials />

      <NewsLetter content={content.newsletter} />

      <Footer />
    </div>
  );
}
