import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Award, Clock, MapPin, Users } from 'lucide-react';
import Header from '../Layout/Header';
import { NavLink } from 'react-router-dom';

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
                    [stat.key]: Math.floor(current)
                }));
            }, 30);
        });
    };

    return (
        <section className="relative w-full hero-wrapper overflow-hidden bg-white">
            <div className="relative w-full h-full">
                <Header />
                
                <div className="hero-content px-4 sm:px-6 lg:px-8 pt-3 pb-5 text-white">
                    <h1 className='text-7xl'>Invest in <span className='text-[var(--solar-gold)]'>Energy</span> Infrastructure</h1>
                    <p className='font-medium text-2xl mt-1.5'>Diversify with direct access to private markets</p>

                    <div className="cta-con flex mt-8 gap-4">
                        <NavLink className="btn rounded btn-primary ">Get Started <svg viewBox="0 0 8 10" widths="20" height="20" fill="none" xmlns="http://www.w3.org/2000/svg" alt="Play video" title="Play video"><path d="M6.745 3.79982L0.8 7.38482C0.45 7.59482 0 7.34482 0 6.93482V2.93482C0 1.18982 1.885 0.0998235 3.4 0.969824L5.695 2.28982L6.74 2.88982C7.085 3.09482 7.09 3.59482 6.745 3.79982Z" fill="#0E0F0C"></path><path d="M7.04442 6.72982L5.01942 7.89982L2.99942 9.06482C2.27442 9.47982 1.45442 9.39482 0.859417 8.97482C0.569417 8.77482 0.604417 8.32982 0.909417 8.14982L7.26442 4.33982C7.56442 4.15982 7.95942 4.32982 8.01442 4.67482C8.13942 5.44982 7.81942 6.28482 7.04442 6.72982Z" fill="#0E0F0C"></path></svg></NavLink>
                        <NavLink className="btn rounded btn-border">Learn More <ArrowRight /></NavLink>
                    </div>
                </div>

                <div ref={sectionRef} className="relative hero-stats">

                    <div className="relative grid grid-cols-2 gap-6 lg:gap-8 py-8 px-8">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.key}
                                className="text-center group"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >

                                {/* Number */}
                                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                                    {stat.prefix}{counts[stat.key]}{stat.suffix}
                                </h3>

                                {/* Label */}
                                <p className="text-gray-300 text-sm sm:text-base font-medium tracking-wide">
                                    {stat.label}
                                </p>

                                {/* Divider (except last item on desktop) */}
                                {index < stats.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-4 w-px h-24 bg-white/20 -translate-y-1/2"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;