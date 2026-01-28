import Hero from '../components/Sections/Hero';
import HowItWorks from '../components/Sections/HowItWorks';
import RetirementInvestment from '../components/Sections/RetirementInvestment';
import Portfolio from '../components/Sections/Portfolio';
import Testimonials from '../components/Sections/Testimonials';
import NewsLetter from '../components/Sections/NewsLetter';
import Footer from '../components/Layout/Footer';
import InvestorTypes from '../components/Sections/InvestorTypes';

import { TrendingUp, Globe, Shield, Calendar, ArrowRight, Check, Leaf } from 'lucide-react';
import Icon from '../assets/images/logo/icon.png'

export default function HomePage() {
  const features = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "High-Yield Returns",
      description: "Invest in top-tier solar projects worldwide. Earn double digit returns.",
      color: "#FDBA4D"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Diversify with Real Assets",
      description: "Tap into global markets uncorrelated with stocks, across multiple currencies and economies.",
      color: "#38BDF8"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Inflation Protection",
      description: "Cash flows secured by long-term contracts, typically indexed to inflation.",
      color: "#F97316"
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: "Monthly Cash Dividends",
      description: "Enjoy steady, revenue-based payouts.",
      color: "#7C3AED"
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Impact",
      description: "Invest in the energy transition.",
      color: "#052CE7"
    }
  ];

  const performanceData = [
    { year: '2025', solarionis: '11.7%', reits: '2.3%', sp500: '17.4%' },
    { year: '2024', solarionis: '12.2%', reits: '4.3%', sp500: '25.0%' },
    { year: '2023', solarionis: '13.1%', reits: '11.5%', sp500: '26.3%' },
    { year: '2022', solarionis: '13.7%', reits: '-25.1%', sp500: '-18.1%' },
    { year: '2021', solarionis: '13.7%', reits: '39.9%', sp500: '28.7%' },
    { year: '2020', solarionis: '11.3%', reits: '-5.9%', sp500: '18.4%' }
  ];

  const getValueColor = (value) => {
    const numValue = parseFloat(value);
    if (numValue < 0) return 'text-red-500';
    if (numValue > 10) return 'text-green-600';
    return 'text-gray-700';
  };
  return (
    <div>


      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-[var(--deep-black)] text-white">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Features */}
          <div className="space-y-8 lg:space-y-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
      >
              Why Choose<br />Solarionis
            </h1>

            <div className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4 items-start group hover:translate-x-2 transition-transform duration-300">
                  <div
                    className="flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    <div style={{ color: feature.color }}>
                      {feature.icon}
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

            <button className="btn btn-primary rounded">
              LEARN MORE
              <ArrowRight />
            </button>
          </div>

          {/* Right Side - Performance Table */}
          <div className="w-full">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
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
                          <span className="text-[10px] text-gray-500">¹</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-gray-800">Public REITs</span>
                          <span className="text-[10px] text-gray-500">²</span>
                        </div>
                      </th>
                      <th className="px-4 sm:px-6 py-4 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold text-gray-800">S&P 500</span>
                          <span className="text-[10px] text-gray-500">³</span>
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {performanceData.map((row, index) => (
                      <tr
                        key={row.year}
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${index === 0 ? 'bg-[#FDBA4D]/10' : ''
                          }`}
                      >
                        <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-bold text-gray-800">
                          {row.year}
                        </td>
                        <td className={`px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold ${index === 0 ? 'text-[#052C05] text-xl sm:text-2xl' : 'text-green-600'
                          }`}>
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
                  Learn more about the assumptions.
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
            <span className="text-sm uppercase tracking-wider text-gray-600">Two Powerful Trends</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6"
    >
            Converging Market Trends
          </h2>

          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
            Two powerful trends are converging: the urgent need for energy infrastructure and the rise of direct access to private markets. Together, they're unlocking a rare opportunity for today's investors.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 relative bg-white rounded-4xl p-8">
          {/* Energy Infrastructure Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-[#FDBA4D]/50 transition-all duration-300 hover:bg-white/10 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FDBA4D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-1 px-4 py-2 bg-green-500/20 rounded text-sm font-bold text-green-600">
                  <Check  className='w-6 h-6'/> STABLE
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#FDBA4D]/20 rounded text-sm font-bold text-[#f99b04]">
                  <Check  className='w-6 h-6'/> INFLATION-HEDGED YIELD
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold mb-4"
        >
                Energy<br />Infrastructure
              </h3>

              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Solar assets deliver contracted, inflation-linked cash flows that keep portfolios steady—even when public markets swing.
              </p>

              <button className="cursor-pointer group/btn flex items-center gap-2 text-black font-bold hover:text-[#FDBA4D] transition-colors duration-300">
                LEARN MORE
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Private Markets Card */}
          <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 lg:p-10 border border-white/10 hover:border-[#38BDF8]/50 transition-all duration-300 hover:bg-white/10 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#F97316]/20 rounded text-sm font-bold text-[#F97316]">
                  <Check  className='w-6 h-6'/> HIGHER RETURNS
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#7C3AED]/20 rounded text-sm font-bold text-[#7C3AED]">
                  <Check  className='w-6 h-6'/> DIVERSIFICATION
                </span>
              </div>

              <h3 className="text-3xl lg:text-4xl font-bold mb-4">
                Private<br />Markets
              </h3>

              <p className="text-gray-600 text-base leading-relaxed mb-8">
                Private equity, credit, and infrastructure have outperformed public markets for decades. Tech-enabled access now puts these returns within reach.
              </p>

              <button className="group/btn flex items-center gap-2 text-black font-bold hover:text-[#38BDF8] transition-colors duration-300 cursor-pointer">
                LEARN MORE
                <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          {/* Center Icon */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-20 h-20 rounded-full border-4 border-[var(--violet)] bg-white flex items-center justify-center shadow-2xl">
                <img src={Icon} alt="" />
            </div>
          </div>
        </div>
      </div>

      <HowItWorks />

      <InvestorTypes   />

      <RetirementInvestment />

      <Portfolio />

      <Testimonials />

      <NewsLetter />

      <Footer />
    </div>
  );
}