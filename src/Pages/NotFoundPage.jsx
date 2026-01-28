import React from 'react';
import { Home, Search, ArrowRight, Clock } from 'lucide-react';

const NotFoundPage = () => {
    const popularLinks = [
        { label: 'Home', path: '/' },
        { label: 'Shop', path: '/shop' },
        { label: 'About Us', path: '/about' },
        { label: 'Contact', path: '/contact' }
    ];

    const featuredProducts = [
        {
            name: 'Classic Chronograph',
            price: '$3,800',
            image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop'
        },
        {
            name: 'Heritage Automatic',
            price: '$4,300',
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=300&fit=crop'
        },
        {
            name: 'Elegant Dress Watch',
            price: '$3,400',
            image: 'https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=300&h=300&fit=crop'
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--deep-black)] relative overflow-hidden">

            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[var(--primary-color)]/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--primary-color)]/5 rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-10">
                <div className="max-w-6xl mx-auto w-full">

                    {/* <div className="grid lg:grid-cols-2 gap-12 items-center place-items-center"> */}
                    <div className="flex flex-col lg:flex-row justify-center items-center">
                        {/* Left Side - Error Message */}
                        <div className="text-center lg:text-left">

                            {/* 404 Number */}
                            <div className="mb-8">
                                <h1 className="text-[180px] sm:text-[200px] lg:text-[250px] font-bold leading-none bg-gradient-to-br from-[var(--primary-color)] via-orange-400 to-orange-600 bg-clip-text text-transparent">
                                    404
                                </h1>
                                <div className="flex items-center justify-center lg:justify-start gap-3 -mt-12">
                                    <div className="h-1 w-16 bg-[var(--primary-color)]"></div>
                                    <Clock className="w-8 h-8 text-[var(--primary-color)] animate-pulse" />
                                    <div className="h-1 w-16 bg-[var(--primary-color)]"></div>
                                </div>
                            </div>

                            {/* Message */}
                            <h2 className="text-4xl sm:text-5xl font-serif text-white mb-4">
                                Time Lost in Space
                            </h2>
                            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-md mx-auto lg:mx-0">
                                The page you're looking for seems to have vanished into time.
                                Don't worry, even the finest timepieces need recalibration sometimes.
                            </p>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12">
                                <a
                                    href="/"
                                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[var(--primary-color)] text-white rounded-lg font-medium hover:bg-[var(--primary-color)]/90 transition-all duration-300 shadow-lg hover:shadow-xl"
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
                                            className="px-4 py-2 bg-[#1a1a1a] text-gray-400 rounded-lg hover:bg-gray-800 hover:text-white transition-all duration-300 text-sm border border-gray-800 hover:border-[var(--primary-color)]"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                        </div>

                        {/* Right Side - Featured Products */}
                        {/* <div className="hidden lg:block">
                            <div className="bg-[#1a1a1a] rounded-2xl p-8 border border-gray-800">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-white text-2xl font-serif">While You're Here...</h3>
                                    <Clock className="w-8 h-8 text-[var(--primary-color)]" />
                                </div>
                                <p className="text-gray-400 mb-8">
                                    Explore our latest timepieces and find the perfect watch for your collection
                                </p>

                                <div className="space-y-6">
                                    {featuredProducts.map((product, index) => (
                                        <div
                                            key={index}
                                            className="group flex items-center gap-4 p-4 bg-[var(--deep-black)]/50 rounded-lg hover:bg-[var(--deep-black)]/70 transition-all duration-300 cursor-pointer border border-gray-800 hover:border-[var(--primary-color)]"
                                        >
                                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="text-white font-semibold mb-1 group-hover:text-[var(--primary-color)] transition-colors">
                                                    {product.name}
                                                </h4>
                                                <p className="text-[var(--primary-color)] font-bold text-lg">
                                                    {product.price}
                                                </p>
                                            </div>
                                            <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-[var(--primary-color)] transition-colors" />
                                        </div>
                                    ))}
                                </div>

                                <a
                                    href="/shop"
                                    className="block w-full mt-6 text-center px-6 py-3 bg-[var(--primary-color)] text-white rounded-lg font-medium hover:bg-[var(--primary-color)]/90 transition-all duration-300"
                                >
                                    View All Products
                                </a>
                            </div>
                        </div> */}

                    </div>

                    {/* Search Bar */}
                    {/* <div className="mt-16 max-w-2xl mx-auto">
                        <div className="bg-[#1a1a1a] rounded-xl p-6 border border-gray-800">
                            <h3 className="text-white font-semibold mb-4 text-center">
                                Can't find what you're looking for?
                            </h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search for watches, accessories, or guides..."
                                    className="w-full bg-[var(--deep-black)] text-white px-6 py-4 pr-12 rounded-lg border border-gray-800 focus:border-[var(--primary-color)] focus:outline-none transition"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[var(--primary-color)] rounded-lg flex items-center justify-center hover:bg-[var(--primary-color)]/90 transition">
                                    <Search className="w-5 h-5 text-white" />
                                </button>
                            </div>
                        </div>
                    </div> */}

                    {/* Help Text */}
                    <div className="text-center mt-12">
                        <p className="text-gray-500 text-sm">
                            Error Code: 404 | Page Not Found | Need help? {' '}
                            <a href="/contact" className="text-[var(--primary-color)] hover:underline">
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