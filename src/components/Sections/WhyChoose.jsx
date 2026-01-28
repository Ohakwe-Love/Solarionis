import React from 'react';
import { TrendingUp, Globe, Shield, Calendar, Leaf } from 'lucide-react';

export default function WhyChoose() {
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
      color: "#052C05E7"
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
    <div className="min-h-screen bg-gradient-to-br from-[#0B1F1A] via-[#052C05] to-[#0B1F1A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Side - Features */}
          <div className="space-y-8 lg:space-y-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
                style={{ fontFamily: 'Marcellus, serif' }}>
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
                    <p className="text-gray-300 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button className="group bg-white text-[#052C05] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#FDBA4D] hover:text-[#0B0F1A] transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl">
              LEARN MORE
              <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
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
                        className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                          index === 0 ? 'bg-[#FDBA4D]/10' : ''
                        }`}
                      >
                        <td className="px-4 sm:px-6 py-4 sm:py-5 text-sm sm:text-base font-bold text-gray-800">
                          {row.year}
                        </td>
                        <td className={`px-4 sm:px-6 py-4 sm:py-5 text-center text-base sm:text-lg font-bold ${
                          index === 0 ? 'text-[#052C05] text-xl sm:text-2xl' : 'text-green-600'
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

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Mulish:wght@400;700;900&display=swap');
        
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </div>
  );
}