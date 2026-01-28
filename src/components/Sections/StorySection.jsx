import React, { useState, useEffect, useRef } from 'react';
import { Award, Clock, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AboutStatsSection = () => {
  const [counts, setCounts] = useState({
    products: 0,
    years: 0,
    outlets: 0,
    customers: 0
  });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    { key: 'products', end: 10000, suffix: 'K', label: 'Products Sold', icon: Award },
    { key: 'years', end: 35, suffix: '', label: 'Years Service', icon: Clock },
    { key: 'outlets', end: 450, suffix: '', label: 'Outlets Worldwide', icon: MapPin },
    { key: 'customers', end: 1000, suffix: '+', label: 'Satisfied Customers', icon: Users }
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

  const formatNumber = (num, suffix) => {
    if (suffix === 'K') return (num / 1000).toFixed(0) + 'K';
    return num + suffix;
  };

  return (
    <section className="bg-[var(--deep-black)] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* About Section */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Left - Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl">
              <img
                src="/src/assets/images/about/1.jpg"
                alt="Luxury Watches"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 lg:-right-6 bg-[var(--primary-color)] text-white p-8 rounded-2xl shadow-2xl -right-2">
              <p className="text-5xl font-bold mb-1">35+</p>
              <p className="text-sm font-medium">Years Experience</p>
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <p className="text-[var(--primary-color)] text-sm font-medium tracking-widest mb-4">
              ABOUT Solarionis
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6">
              Crafting Time Since 1989
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-6">
              Solarionis has been at the forefront of luxury timepiece craftsmanship for over three decades. Our commitment to excellence and precision has made us a trusted name among watch enthusiasts worldwide.
            </p>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Each watch in our collection represents the perfect fusion of Swiss engineering and contemporary design. We don't just sell watches; we offer timeless companions that mark life's most precious moments.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Swiss Movement</h4>
                  <p className="text-gray-400 text-sm">Precision engineering</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Lifetime Warranty</h4>
                  <p className="text-gray-400 text-sm">Complete protection</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Premium Materials</h4>
                  <p className="text-gray-400 text-sm">Finest craftsmanship</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-[var(--primary-color)] rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Expert Service</h4>
                  <p className="text-gray-400 text-sm">Dedicated support</p>
                </div>
              </div>
            </div>

            <Link to='/contact' className="btn btn-primary text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl">
              Contact
            </Link>
          </div>

        </div>

        {/* Stats Counter Section */}
        <div ref={sectionRef} className="relative">
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <img
              src="/src/assets/images/about/2.jpg"
              alt="Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[var(--deep-black)]/70"></div>
          </div>

          <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 py-16 px-8">
            {stats.map((stat, index) => (
              <div
                key={stat.key}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-16 h-16 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-[var(--primary-color)] transition-all duration-300">
                  <stat.icon className="w-8 h-8 text-[var(--primary-color)] group-hover:text-white transition-colors" strokeWidth={1.5} />
                </div>

                {/* Number */}
                <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-2">
                  {formatNumber(counts[stat.key], stat.suffix)}
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

export default AboutStatsSection;