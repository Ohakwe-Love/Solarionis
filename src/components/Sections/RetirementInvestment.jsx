import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_HOME_PAGE_CONTENT } from '../../content/defaultHomePageContent';

function splitRetirementTitle(title, highlightText) {
    const safeTitle = String(title || DEFAULT_HOME_PAGE_CONTENT.retirement.title);
    const safeHighlight = String(highlightText || DEFAULT_HOME_PAGE_CONTENT.retirement.highlight_text);
    const parts = safeTitle.split(safeHighlight).join('').trim();
    const lines = parts.split(' ');

    return {
        first: lines.slice(0, 1).join(' '),
        second: lines.slice(1).join(' '),
        highlight: safeHighlight,
    };
}

export default function RetirementInvestment({ content = DEFAULT_HOME_PAGE_CONTENT.retirement }) {
    const titleParts = splitRetirementTitle(content.title, content.highlight_text);
    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-gray-100 retirement-investment">

            {/* Content Container */}
            <div className="relative z-10 min-h-screen flex items-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full py-20">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-[1000px] mx-auto">

                        {/* Left Column - Main Heading */}
                        <div>
                            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white leading-tight">
                                {titleParts.first}
                                <br />
                                {titleParts.second}
                                <br />
                                <span className="text-(--solar-gold)">{titleParts.highlight}</span>
                            </h1>
                        </div>

                        {/* Right Column - Investment Cards and CTA */}
                        <div className="space-y-8">

                            {/* Description and CTA */}
                            <div className="bg-white/95 w-[100%] sm:w-[80%] lg:w-[80%] ml-auto backdrop-blur-sm rounded-2xl p-8 shadow-xl">
                                <p className="text-gray-800 text-lg mb-6 leading-relaxed">
                                    {content.description}
                                </p>
                                <Link to={content.button_href || DEFAULT_HOME_PAGE_CONTENT.retirement.button_href} className="w-full bg-(--solar-gold) hover:bg-(--deep-black) text-gray-900 font-bold py-4 px-8 rounded-full flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl text-lg group hover:text-white cursor-pointer">
                                    {content.button_label || DEFAULT_HOME_PAGE_CONTENT.retirement.button_label}
                                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
