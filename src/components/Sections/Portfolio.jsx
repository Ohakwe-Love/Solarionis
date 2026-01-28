import React from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import Image1 from '../../assets/images/portfolio/1.webp';
import Image2 from '../../assets/images/portfolio/2.webp';
import Image3 from '../../assets/images/portfolio/3.webp';
import Image4 from '../../assets/images/portfolio/4.webp';

export default function Portfolio() {
    const portfolios = [
        {
            id: 1,
            name: 'Solarionis Core',
            images: [Image1, Image2, Image3],
            returnRate: '7-14%',
            returnType: 'Est. IRR',
            isCore: true,
            buttonText: 'BUILD PORTFOLIO',
            buttonStyle: 'white'
        },
        {
            id: 2,
            name: 'Community Solar in Brazil',
            images: [Image4],
            returnRate: '13.9%',
            returnType: 'Realized IRR',
            isCore: false,
            buttonText: 'VIEW PORTFOLIO',
            buttonStyle: 'green'
        },
        {
            id: 3,
            name: 'Solarize Africa',
            images: [Image3],
            returnRate: '9.8%',
            returnType: 'Realized IRR',
            isCore: false,
            buttonText: 'VIEW PORTFOLIO',
            buttonStyle: 'green'
        },
        {
            id: 4,
            name: 'Solar in the USA',
            images: [Image2],
            returnRate: '7.2%',
            returnType: 'Realized IRR',
            isCore: false,
            buttonText: 'VIEW PORTFOLIO',
            buttonStyle: 'green'
        }
    ];

    return (
        <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-start justify-between mb-12">
                    <div>
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-[var(--electric-blue)]" />
                            </div>
                            <span className="text-sm uppercase tracking-wider text-gray-600">INVESTMENT OFFERINGS</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900">
                            Open Portfolios
                        </h2>
                    </div>
                    <button className="hidden md:flex items-center gap-2 text-gray-900 font-medium hover:gap-4 transition-all">
                        EXPLORE ALL INVESTMENT OFFERINGS
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Portfolio Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {portfolios.map((portfolio) => (
                        <div
                            key={portfolio.id}
                            className={`rounded-3xl p-8 ${portfolio.isCore
                                ? 'bg-[var(--deep-black)]'
                                : 'bg-white'
                                } shadow-sm hover:shadow-lg transition-shadow duration-300`}
                        >
                            {/* Images */}
                            <div className="flex gap-2 mb-8 ">
                                {portfolio.images.map((img, idx) => (
                                    <div
                                        key={idx}
                                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-2xl shadow-md border-2 border-[var(--solar-gold)] overflow-hidden"
                                    >
                                        <img src={img} alt="Portfolio" className='w-full h-full' />
                                    </div>
                                ))}
                            </div>

                            {/* Portfolio Name */}
                            <h3 className={`text-xl font-semibold ${portfolio.isCore ? 'text-white' : 'text-gray-900'} mb-8 min-h-[3rem]`}>
                                {portfolio.name}
                            </h3>

                            {/* Return Rate */}
                            <div className="mb-8">
                                <div className={`text-5xl font-bold ${portfolio.isCore ? 'text-white' : 'text-gray-900'} mb-2`}>
                                    {portfolio.returnRate}
                                </div>
                                <div className={`text-sm font-medium ${portfolio.isCore ? 'text-gray-300' : 'text-gray-600'}`}>
                                    {portfolio.returnType}
                                </div>
                            </div>

                            {/* CTA Button */}
                            <button
                                className={`w-full py-4 px-6 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 group text-[12px] cursor-pointer ${portfolio.buttonStyle === 'white'
                                    ? 'bg-white text-gray-900 hover:bg-[var(--solar-gold)] hover:text-black'
                                    : 'bg-black text-white hover:bg-[var(--solar-gold)] hover:text-black'
                                    }`}
                            >
                                {portfolio.buttonText}
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <button className="md:hidden mt-8 w-full flex items-center justify-center gap-2 text-gray-900 font-medium py-4">
                    EXPLORE ALL INVESTMENT OFFERINGS
                    <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}