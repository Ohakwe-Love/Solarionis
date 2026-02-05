import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '../Layout/Header';
import { NavLink, Link } from 'react-router-dom';

const Hero = () => {
    const [counts, setCounts] = useState({
        invest: 0,
        return: 0,
    });

    const [hasAnimated, setHasAnimated] = useState(false);
    const sectionRef = useRef(null);

    const stats = [
        { key: 'invest', end: 462545600, suffix: '', prefix: '$', label: 'Total Invested' },
        { key: 'return', end: 12.06, suffix: '%', prefix: '', label: 'Realized Return (IRR)' }
    ];

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
    }, [hasAnimated]);

    const animateCounters = () => {
        stats.forEach((stat) => {
            let current = 0;
            const increment = stat.end / 60;
            const timer = setInterval(() => {
                current += increment;
                if (current >= stat.end) {
                    current = stat.end;
                    clearInterval(timer);
                }
                setCounts((prev) => ({
                    ...prev,
                    [stat.key]: stat.key === 'return' ? current.toFixed(2) : Math.floor(current)
                }));
            }, 30);
        });
    };

    // Format large numbers with commas
    const formatNumber = (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <section className="relative w-full hero-wrapper overflow-hidden bg-white min-h-screen h-auto">
            <Header />

            {/* Hero Content */}
            <div className="hero-container flex justify-end items-end h-[100%] ">
                <div className='flex items-start flex-col gap-10 h-[80%] justify-between w-full'>
                    <div className="hero-content px-0 sm:px-6 lg:px-8 text-white max-w-7xl h-[80%]">
                        <div className="max-w-5xl">
                            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight'>
                                Invest in <span className='text-(--solar-gold)'>Energy</span><br className="hidden sm:block" /> Infrastructure
                            </h1>
                            <p className='font-medium text-lg sm:text-xl md:text-2xl mt-4 sm:mt-6 text-gray-200'>
                                Diversify with direct access to private markets
                            </p>

                            <div className="cta-con flex flex-col sm:flex-row mt-8 sm:mt-10 gap-4">
                                <Link
                                    to="/login"
                                    className="btn rounded btn-primary flex items-center justify-center gap-2 px-6 py-4 text-base sm:text-lg font-semibold"
                                >
                                    Get Started
                                    <svg viewBox="0 0 8 10" width="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" alt="Play video" title="Play video">
                                        <path d="M6.745 3.79982L0.8 7.38482C0.45 7.59482 0 7.34482 0 6.93482V2.93482C0 1.18982 1.885 0.0998235 3.4 0.969824L5.695 2.28982L6.74 2.88982C7.085 3.09482 7.09 3.59482 6.745 3.79982Z" fill="#0E0F0C"></path>
                                        <path d="M7.04442 6.72982L5.01942 7.89982L2.99942 9.06482C2.27442 9.47982 1.45442 9.39482 0.859417 8.97482C0.569417 8.77482 0.604417 8.32982 0.909417 8.14982L7.26442 4.33982C7.56442 4.15982 7.95942 4.32982 8.01442 4.67482C8.13942 5.44982 7.81942 6.28482 7.04442 6.72982Z" fill="#0E0F0C"></path>
                                    </svg>
                                </Link>
                                <NavLink
                                    to="/learn-more"
                                    className="btn rounded btn-border flex items-center justify-center gap-2 px-6 py-4 text-base sm:text-lg font-semibold"
                                >
                                    Learn More
                                    <ArrowRight className="w-5 h-5" />
                                </NavLink>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div ref={sectionRef} className="relative hero-stats w-full h-[20%]">
                        <div className="max-w-7xl mx-auto relative grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-6 lg:gap-8 py-8 sm:py-10 lg:py-6 px-4 sm:px-6 lg:px-8">
                            {stats.map((stat, index) => (
                                <div
                                    key={stat.key}
                                    className="text-center flex items-center justify-center flex-col sm:text-left group relative"
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {/* Number */}
                                    <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white mb-2 sm:mb-3">
                                        {stat.prefix}
                                        {stat.key === 'invest' ? formatNumber(counts[stat.key]) : counts[stat.key]}
                                        {stat.suffix}
                                    </h3>

                                    {/* Label */}
                                    <div className="flex items-center justify-center sm:justify-start gap-2">
                                        <p className="text-gray-300 text-sm sm:text-base lg:text-lg font-medium tracking-wide">
                                            {stat.label}
                                        </p>
                                        {/* Info Icon */}
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

                                    {/* Divider (desktop only, between stats) */}
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