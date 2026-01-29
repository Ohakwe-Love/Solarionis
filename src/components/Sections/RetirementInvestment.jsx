import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

export default function RetirementInvestment() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gray-100 retirement-investment">

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1000px] mx-auto">

                        {/* Left Column - Main Heading */}
                        <div>
                            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight">
                                Retirement
                                <br />
                                Investing Now
                                <br />
                                <span className="text-[var(--solar-gold)]">Available</span>
                            </h1>
                        </div>

                        {/* Right Column - Investment Cards and CTA */}
                        <div className="space-y-8">

                            {/* Description and CTA */}
                            <div className="bg-white/95 w-[100%] sm:w-[80%] lg:w-[80%] ml-auto backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                                    Diversify your IRA by owning premium, dividend-producing clean energy projects backed by long-term contracts.
                                </p>
                                <button className="w-full bg-[var(--solar-gold)] hover:bg-[var(--deep-black)] text-gray-900 font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group hover:text-white">
                                    LEARN MORE
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}