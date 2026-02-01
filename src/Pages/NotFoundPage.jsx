import React from 'react';
import { Home, Search, ArrowRight, Clock } from 'lucide-react';

const NotFoundPage = () => {
    const popularLinks = [
        { label: 'Home', path: '/' },
        { label: 'Investment', path: '/investment' },
        { label: 'About Us', path: '/about' },
        { label: 'FAQ', path: '/faq' }
    ];

    return (
        <div className="min-h-screen bg-(--deep-black) relative overflow-hidden">
            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
                <div className="max-w-6xl mx-auto w-full">

                    {/* <div className="grid lg:grid-cols-2 gap-12 items-center place-items-center"> */}
                    <div className="flex flex-col lg:flex-row justify-center items-center">
                        <div className="text-center">
                            {/* 404 Number */}
                            <div className="mb-8">
                                <h1 className="text-[180px] sm:text-[200px] lg:text-[250px] font-bold leading-none bg-gradient-to-br from-(--solar-gold) via-orange-400 to-orange-600 bg-clip-text text-transparent">
                                    404
                                </h1>
                            </div>

                            {/* Message */}
                            <h2 className="text-4xl sm:text-5xl font-serif text-white mb-4">
                                Solarionis
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">                             The page you're looking does not exit or it may have been moved.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                                <a
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-(--primary-color) text-white rounded-lg font-medium hover:bg-(--primary-color)/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                                >
                                    <Home className="w-5 h-5" />
                                    <span>Back to Home</span>
                                </a>
                                <a
                                    href="/shop"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 backdrop-blur-sm transition-all duration-300 border border-white/20"
                                >
                                    <Search className="w-5 h-5" />
                                    <span>Browse Shop</span>
                                </a>
                            </div>

                            {/* Popular Links */}
                            <div>
                                <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                                    Popular Pages
                                </h3>
                                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                                    {popularLinks.map((link, index) => (
                                        <a
                                            key={index}
                                            href={link.path}
                                            className="px-4 py-2 bg-[#1a1a1a] text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm border border-gray-800 hover:border-(--primary-color)"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* Help Text */}
                    <div className="text-center mt-12">
                        <p className="text-gray-500 text-sm">
                            Error Code: 404 | Page Not Found | Need help? {' '}
                            <a href="/contact" className="text-(--primary-color) hover:underline">
                                Contact Support
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;