import React, { useState } from 'react';
import Header from '../components/Layout/Header';
import image from '../assets/images/hero/wealth.webp';
import Footer from '../components/Layout/Footer';

import { ArrowRight, TrendingUp, Shield, Users, BarChart3, Clock, Award, CheckCircle, FileText, DollarSign, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WealthPage() {
    const benefits = [
        {
            icon: TrendingUp,
            title: 'Proven Track Record',
            description: 'Our portfolios have delivered consistent returns with a 12% realized IRR since inception.'
        },
        {
            icon: Shield,
            title: 'Institutional-Grade Due Diligence',
            description: 'Every project undergoes rigorous technical, financial, and legal review before approval.'
        },
        {
            icon: DollarSign,
            title: 'Multiple Share Classes',
            description: 'Flexible advisor compensation models to fit your business needs.'
        },
        {
            icon: BarChart3,
            title: 'Real-Time Reporting',
            description: 'Technology-first platform with transparent pricing and automated compliance.'
        },
        {
            icon: Clock,
            title: 'Inflation-Linked Returns',
            description: 'Long-term contracted cash flows with built-in inflation protection.'
        },
        {
            icon: Users,
            title: 'Dedicated Support',
            description: 'White-glove service for advisors and their clients throughout the investment lifecycle.'
        }
    ];

    const portfolios = [
        {
            title: 'Community Solar in Brazil',
            irr: '13.9%',
            description: 'A portfolio of solar plants serving energy to thousands of small businesses and household subscribers.',
            risk: 'Medium'
        },
        {
            title: 'Solarize Africa',
            irr: '9.8%',
            description: 'An assortment of rooftop projects and utility-scale projects that employ a range of risk-mitigating strategies.',
            risk: 'Medium-High'
        },
        {
            title: 'Solar in the USA',
            irr: '7.2%',
            description: 'A portfolio of solar projects backed by long-term energy contracts with U.S. businesses and utility companies.',
            risk: 'Low-Medium'
        }
    ];

    const stats = [
        { value: '$500M+', label: 'Assets Under Management' },
        { value: '12%', label: 'Realized IRR' },
        { value: '5,000+', label: 'Investors Served' },
        { value: '60+', label: 'Solar Projects' }
    ];

    const process = [
        {
            step: '01',
            title: 'Initial Consultation',
            description: 'Schedule a call with our team to discuss your clients\' needs and our investment offerings.'
        },
        {
            step: '02',
            title: 'Platform Access',
            description: 'Get onboarded to our advisor portal with full access to investment materials and reporting tools.'
        },
        {
            step: '03',
            title: 'Client Investment',
            description: 'Your clients complete their investment through our streamlined digital platform.'
        },
        {
            step: '04',
            title: 'Ongoing Support',
            description: 'Receive continuous updates, performance reports, and dedicated advisor support.'
        }
    ];

    return (
        <div className="bg-white">

            {/* Hero Section */}
            <section className="relative text-white  overflow-hidden z-1 bg-red-500">
                <Header />
                <div className='absolute top-0 left-0 w-full h-full z-[-2]'>
                    <img src={image} alt="" className='w-full h-full' />
                </div>

                <div className='absolute top-0 left-0 w-full h-full z-[-1] bg-[rgb(0,0,0,0.4)]'>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 py-20 sm:py-20 lg:py-18 px-4 sm:px-6 lg:px-8 ">
                    <div className="max-w-4xl">
                        <div className="inline-flex items-center gap-2 bg-(--solar-gold)/20 px-4 py-2 rounded-full mb-6">
                            <Award className="w-4 h-4 text-(--solar-gold)" />
                            <span className="text-sm font-semibold text-(--solar-gold) uppercase tracking-wide">
                                For Wealth Advisors & Financial Professionals
                            </span>
                        </div>

                        <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-tight">
                            Offer Your Clients Access to{' '}
                            <span className="text-(--solar-gold)">Infrastructure</span> Investing
                        </h1>

                        <p className="text-xl sm:text-2xl text-gray-300 mb-10 leading-relaxed">
                            Partner with Solarionis to provide institutional-quality solar energy investments with stable returns and meaningful impact.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/contact"
                                className="bg-(--solar-gold) btn-primary btn text-black font-bold rounded flex items-center justify-center gap-2"
                            >
                                Schedule a Call
                                <ArrowRight className="w-5 h-5" />
                            </Link>

                            <Link
                                to="/resources"
                                className="btn-border btn font-bold rounded hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20"
                            >
                                Download Materials
                                <FileText className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-sm sm:text-base text-gray-600 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Partner Section */}
            <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Why Partner with Solarionis?
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            As portfolio models evolve beyond traditional stocks and bonds, infrastructure investments offer stable, long-term returns with inflation protection.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            return (
                                <div
                                    key={index}
                                    className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100"
                                >
                                    <div className="w-14 h-14 bg-(--solar-gold)/10 rounded-xl flex items-center justify-center mb-6">
                                        <IconComponent className="w-7 h-7 text-(--solar-gold)" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Investment Opportunities Section */}
            <section className="bg-gray-50 py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Current Investment Opportunities
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Diversified global infrastructure portfolios designed for long-term income generation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        {portfolios.map((portfolio, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                            >
                                <div className="p-6 lg:p-8">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="text-4xl font-bold text-gray-900 mb-1">
                                                {portfolio.irr}
                                            </div>
                                            <div className="text-sm text-gray-600">Realized IRR</div>
                                        </div>
                                        <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-semibold text-gray-700">
                                            {portfolio.risk}
                                        </span>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {portfolio.title}
                                    </h3>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {portfolio.description}
                                    </p>

                                    <Link
                                        to="/portfolios"
                                        className="text-(--solar-gold) font-semibold flex items-center gap-2 hover:gap-3 transition-all"
                                    >
                                        Learn More
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                            Simple Onboarding Process
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                            Get started in four easy steps and begin offering solar infrastructure investments to your clients.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
                        {process.map((item, index) => (
                            <div key={index} className="relative">
                                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm hover:shadow-lg transition-all border border-gray-100 h-full">
                                    <div className="text-6xl font-bold text-(--solar-gold)/20 mb-4">
                                        {item.step}
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {item.description}
                                    </p>
                                </div>

                                {index < process.length - 1 && (
                                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-(--solar-gold)/30"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="bg-gray-900 text-white py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 lg:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                            Built for Advisors
                        </h2>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                            Our technology-first platform provides everything you need to serve your clients effectively.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                            <CheckCircle className="w-12 h-12 text-(--solar-gold) mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Comprehensive Due Diligence</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Access detailed investment memorandums, financial models, and third-party reports for every project.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                            <LineChart className="w-12 h-12 text-(--solar-gold) mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Real-Time Performance Tracking</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Monitor portfolio performance, cash flows, and distributions through our intuitive dashboard.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                            <FileText className="w-12 h-12 text-(--solar-gold) mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Automated Reporting</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Receive quarterly statements, tax documents, and performance reports automatically generated for you and your clients.
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10">
                            <Users className="w-12 h-12 text-(--solar-gold) mb-4" />
                            <h3 className="text-2xl font-bold mb-3">Dedicated Relationship Manager</h3>
                            <p className="text-gray-300 leading-relaxed">
                                Work with a dedicated team member who understands your practice and supports your clients.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-(--solar-gold) to-yellow-500">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                        Ready to Get Started?
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-800 mb-8">
                        Join the growing network of advisors offering their clients access to institutional-quality infrastructure investments.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/contact"
                            className="bg-gray-900 text-white font-bold px-8 py-4 rounded-full hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                        >
                            Schedule a Consultation
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/resources"
                            className="bg-white text-gray-900 font-bold px-8 py-4 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
                        >
                            Download Fact Sheet
                            <FileText className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-12 text-center">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-6">
                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                What types of clients are these investments suitable for?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our offerings are designed for accredited investors seeking alternative investments with stable, inflation-linked returns. They're particularly suitable for clients looking to diversify beyond traditional stocks and bonds.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                What are the minimum investment amounts?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Minimum investments vary by portfolio and share class, typically ranging from $25,000 to $100,000. Contact our team for specific details on current offerings.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                How are advisors compensated?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                We offer multiple share classes with different fee structures to accommodate various advisor compensation models, including upfront commissions and ongoing trails.
                            </p>
                        </div>

                        <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                What is the liquidity profile of these investments?
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                These are long-term investments with a recommended hold period of 5-10 years. Limited liquidity options may be available through our secondary market, subject to availability and certain restrictions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}