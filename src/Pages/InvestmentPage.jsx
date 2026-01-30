import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Layout/Header';
import NewsLetter from '../components/Sections/NewsLetter';
import Footer from '../components/Layout/Footer';
import { Link } from 'react-router-dom';
import image1 from '../assets/images/portfolio/1.webp';
import image2 from '../assets/images/portfolio/2.webp';
import image3 from '../assets/images/portfolio/3.webp';
import image4 from '../assets/images/portfolio/4.webp';


const InvestmentPage = () => {
    const portfolios = [
        {
            id: 1,
            type: 'core',
            title: 'Energea Core',
            description: 'Diversify your portfolio across our three core markets to minimize risk and maximize returns.',
            returnRate: null,
            buttonText: 'BUILD PORTFOLIO',
            buttonStyle: 'white',
            image: image1,
            darkOverlay: true
        },
        {
            id: 2,
            type: 'regular',
            title: 'Community Solar in Brazil',
            description: 'A portfolio of solar plants serving energy to thousands of small businesses and household subscribers.',
            returnRate: '13.9',
            returnType: 'Realized IRR',
            buttonText: 'VIEW PORTFOLIO',
            buttonStyle: 'green',
            image: image2,
            darkOverlay: false
        },
        {
            id: 3,
            type: 'regular',
            title: 'Solarize Africa',
            description: 'An assortment of rooftop projects and utility-scale projects that employ a range of risk-mitigating strategies.',
            returnRate: '9.8',
            returnType: 'Realized IRR',
            buttonText: 'VIEW PORTFOLIO',
            buttonStyle: 'green',
            image: image3,
            darkOverlay: false
        },
        {
            id: 4,
            type: 'regular',
            title: 'Solar in the USA',
            description: 'A portfolio of solar projects backed by long-term energy contracts with U.S. businesses and utility companies.',
            returnRate: '7.2',
            returnType: 'Realized IRR',
            buttonText: 'VIEW PORTFOLIO',
            buttonStyle: 'green',
            image: image4,
            darkOverlay: false
        }
    ];

    return (
        <div>
            <section className='relative w-full'>
                <Header />

                <div className="max-w-7xl mx-auto py-8 px-12 pt-20">
                    <div className="text-center mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                            Access the Power of Renewable Energy
                        </h2>
                        <p className="text-base sm:text-lg text-gray-600">
                            Clean, Contracted, Monthly Dividends
                        </p>
                    </div>

                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {portfolios.map((portfolio) => (
                            <div
                                key={portfolio.id}
                                className={`rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ${portfolio.type === 'core' ? 'md:col-span-1' : ''
                                    }`}
                            >
                                <div className="relative h-full flex items-start justify-between">
                                    {/* Image Section */}
                                    <div className="relative h-full w-[50%] overflow-hidden">
                                        <img
                                            src={portfolio.image}
                                            alt={portfolio.title}
                                            className="w-full h-full object-cover"
                                        />
                                        {portfolio.darkOverlay && (
                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-900/90"></div>
                                        )}
                                    </div>

                                    {/* Content Section */}
                                    {portfolio.type === 'core' ? (
                                        // Energea Core - Dark overlay content
                                        <div className="w-[65%] h-full inset-0 flex flex-col justify-center bg-(--deep-black) items-end pl-2 pr-4 sm:pr-6 lg:pr-8 text-white">
                                            <div className="max-w-sm text-right">
                                                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                                                    {portfolio.title}
                                                </h3>
                                                <p className="text-sm sm:text-base text-gray-200 mb-6 sm:mb-8 leading-relaxed">
                                                    {portfolio.description}
                                                </p>
                                                <button className="bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-100 transition-all ml-auto group">
                                                    {portfolio.buttonText}
                                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        // Regular Portfolios - White card content
                                        <div className="bg-white w-[65%] p-4 sm:p-5">
                                            {/* Return Rate */}
                                            {portfolio.returnRate && (
                                                <div className="mb-4">
                                                    <div className="text-4xl sm:text-5xl font-bold text-gray-900">
                                                        {portfolio.returnRate}%
                                                    </div>
                                                    <div className="text-xs sm:text-sm text-gray-600 mt-1">
                                                        {portfolio.returnType}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Title */}
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                                                {portfolio.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm sm:text-base text-gray-600 mb-6 leading-relaxed">
                                                {portfolio.description}
                                            </p>

                                            {/* CTA Button */}
                                            <button className="btn btn-primary rounded cursor-pointer">
                                                {portfolio.buttonText}
                                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </section>

            <NewsLetter />

            <Footer />
        </div>
    );
};

export default InvestmentPage;