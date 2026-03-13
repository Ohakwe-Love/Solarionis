import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '../Layout/Header';
import { NavLink, Link } from 'react-router-dom';
import { DEFAULT_HOME_PAGE_CONTENT } from '../../content/defaultHomePageContent';

const DEFAULT_HERO = DEFAULT_HOME_PAGE_CONTENT.hero;

function splitHeroTitle(title, highlightText) {
    const safeTitle = String(title || DEFAULT_HERO.title);
    const safeHighlight = String(highlightText || DEFAULT_HERO.highlight_text);
    const highlightedPhrase = ` ${safeHighlight} `;

    if (safeTitle.includes(highlightedPhrase)) {
        const [before, after] = safeTitle.split(highlightedPhrase);
        return {
            before: `${before} `,
            highlight: safeHighlight,
            after,
        };
    }

    return {
        before: '',
        highlight: safeHighlight,
        after: safeTitle.replace(safeHighlight, '').trim() || 'Infrastructure',
    };
}

const Hero = ({ content = DEFAULT_HERO }) => {
    const stats = Array.isArray(content.stats) && content.stats.length > 0
        ? content.stats
        : DEFAULT_HERO.stats;
    const titleParts = splitHeroTitle(content.title, content.highlight_text);
    const [counts, setCounts] = useState(
        stats.reduce((acc, stat) => {
            acc[stat.key] = 0;
            return acc;
        }, {})
    );
    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    const animateCounters = useCallback(() => {
        stats.forEach((stat) => {
            let current = 0;
            const endValue = Number(stat.value || 0);
            const increment = endValue / 60;
            const decimals = Number(stat.decimals || 0);

            const timer = setInterval(() => {
                current += increment;
                if (current >= endValue) {
                    current = endValue;
                    clearInterval(timer);
                }

                setCounts((prev) => ({
                    ...prev,
                    [stat.key]: decimals > 0 ? Number(current.toFixed(decimals)) : Math.floor(current),
                }));
            }, 30);
        });
    }, [stats]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateCounters();
                }
            },
            { threshold: 0.3 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated, animateCounters]);

    const formatNumber = (num) => {
        return Number(num || 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    };

    return (
        <section className="relative w-full hero-wrapper overflow-hidden bg-white min-h-screen h-auto">
            <Header />

            <div className="hero-container flex justify-end items-end h-full ">
                <div className='flex items-start flex-col gap-10 h-[80%] justify-between w-full'>
                    <div className="hero-content px-0 sm:px-6 lg:px-8 text-white max-w-7xl h-[80%]">
                        <div className="max-w-5xl">
                            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight'>
                                {titleParts.before}
                                <span className='text-(--solar-gold)'>{titleParts.highlight}</span>
                                <br className="hidden sm:block" /> {titleParts.after}
                            </h1>
                            <p className='font-medium text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 text-gray-200'>
                                {content.subtitle || DEFAULT_HERO.subtitle}
                            </p>

                            <div className="cta-con flex flex-col sm:flex-row mt-8 sm:mt-10 gap-4">
                                <Link
                                    to={content.primary_cta_href || DEFAULT_HERO.primary_cta_href}
                                    className="btn rounded btn-primary flex items-center justify-center gap-2 px-6 py-4 text-base sm:text-lg font-semibold"
                                >
                                    {content.primary_cta_label || DEFAULT_HERO.primary_cta_label}
                                    <svg viewBox="0 0 8 10" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" alt="Play video" title="Play video">
                                        <path d="M6.745 3.79982L0.8 7.38482C0.45 7.59482 0 7.34482 0 6.93482V2.93482C0 1.18982 1.885 0.0998235 3.4 0.969824L5.695 2.28982L6.74 2.88982C7.085 3.09482 7.09 3.59482 6.745 3.79982Z" fill="#0E0F0C"></path>
                                        <path d="M7.04442 6.72982L5.01942 7.89982L2.99942 9.06482C2.27442 9.47982 1.45442 9.39482 0.859417 8.97482C0.569417 8.77482 0.604417 8.32982 0.909417 8.14982L7.26442 4.33982C7.56442 4.15982 7.95942 4.32982 8.01442 4.67482C8.13942 5.44982 7.81942 6.28482 7.04442 6.72982Z" fill="#0E0F0C"></path>
                                    </svg>
                                </Link>
                                <NavLink
                                    to={content.secondary_cta_href || DEFAULT_HERO.secondary_cta_href}
                                    className="btn rounded btn-border flex items-center justify-center gap-2 px-6 py-4 text-base sm:text-lg font-semibold"
                                >
                                    {content.secondary_cta_label || DEFAULT_HERO.secondary_cta_label}
                                    <ArrowRight className="w-5 h-5" />
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    <div ref={sectionRef} className="relative hero-stats w-full h-[20%]">
                        <div className="max-w-7xl mx-auto relative grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 lg:gap-8 py-8 sm:py-10 lg:py-6 px-4 sm:px-6 lg:px-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.key}
                                    className="text-center flex items-center justify-center flex-col sm:text-left group relative"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
                                        {stat.prefix}
                                        {Number(stat.decimals || 0) === 0
                                            ? formatNumber(counts[stat.key])
                                            : counts[stat.key]}
                                        {stat.suffix}
                                    </h3>

                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-medium tracking-wide">
                                            {stat.label}
                                        </p>
                                        <button
                                            className="text-gray-400 cursor-pointer hover:text-white transition-colors"
                                            aria-label={`Info about ${stat.label}`}
                                        >
                                            <svg
                                                className="w-4 h-4 sm:w-5 sm:h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                        </button>
                                    </div>

                                    {index === 0 && (
                                        <div className="hidden sm:block absolute top-1/2 -right-3 lg:-right-4 w-px h-16 sm:h-20 lg:h-24 bg-white/20 -translate-y-1/2"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
