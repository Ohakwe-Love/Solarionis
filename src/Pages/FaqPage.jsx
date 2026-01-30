
import React, { useState } from 'react';
import { Plus, Minus, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

export default function FaqPage() {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "Are There Any Hidden Charges When I Purchase A Product?",
            answer: "Absolutely not. At Solarionis, transparency is our priority. The price you see is the price you pay. There are no hidden fees, taxes, or surprise charges at checkout. All applicable taxes and shipping costs are clearly displayed before you complete your purchase."
        },
        {
            question: "Is There A Way To Track The Delivery Of My Watch?",
            answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can monitor your watch's journey in real-time through our website or the carrier's tracking portal. We provide full transparency from our facility to your doorstep, with estimated delivery dates and notifications at each checkpoint."
        },
        {
            question: "Do You Offer Custom Signature Designs?",
            answer: "Indeed we do. Our master craftsmen can create bespoke timepieces tailored to your exact specifications. Whether it's custom dial colors, personalized engravings, unique strap materials, or special complications, we work directly with you to bring your vision to life. Contact our concierge team to begin your custom journey."
        },
        {
            question: "Is It Possible To Make A Special Piece Of Furniture?",
            answer: "While Solarionis specializes in luxury timepieces and watch accessories, we can create custom watch display cases, watch boxes, and storage solutions crafted from premium materials. These pieces combine functionality with aesthetic excellence, perfect for showcasing your collection."
        },
        {
            question: "Can I Purchase An Extended Warranty For My Watch?",
            answer: "Yes, extended warranty options are available for all our timepieces. Beyond our standard manufacturer's warranty, you can purchase additional coverage that extends protection for up to 10 years. This comprehensive plan covers mechanical failures, water resistance testing, and regular maintenance services."
        },
        {
            question: "Is There Any Chance For Me To Buy An Extended Furniture Warranty?",
            answer: "For watch accessories and storage furniture, we offer extended protection plans covering materials, craftsmanship, and mechanisms. Our premium care packages include annual maintenance, refinishing services, and priority repair scheduling."
        },
        {
            question: "How Can I Obtain A Pricing Quote For A Certain Set Of Furniture?",
            answer: "For custom watch storage solutions or display cases, simply contact our design team through the website, email, or phone. Provide details about your requirements, dimensions, materials, and any special features. We'll provide a detailed quote within 48 hours, including 3D renderings of your custom piece."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen bg-gray-100">


            <Header />

            <div className="max-w-7xl mx-auto py-8 px-12 pt-20">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600">
                        Clean, Contracted, Monthly Dividends
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24">
                            <p className="text-(--primary-color) text-sm font-medium tracking-widest mb-4">
                                NEED HELP?
                            </p>
                            <h1 className="text-4xl sm:text-5xl font-serif text-(--deep-black) mb-6">
                                Products & Service
                            </h1>

                            {/* Contact Info */}
                            <div className="bg-gray-200 rounded-xl p-6 border border-gray-300 mb-6">
                                <h3 className="text-(--deep-black) font-semibold mb-4">Contact Us</h3>
                                <div className="space-y-3 text-gray-600 text-sm">
                                    <p>123 Fifth Avenue, New York, NY 10160, USA</p>
                                    <p>+1 (555) 123-4567</p>
                                    <p>info@Solarionis.com</p>
                                </div>
                            </div>

                            {/* Image */}
                            <div className="rounded-xl overflow-hidden">
                                <img
                                    src="/src/assets/images/portfolio/2.webp"
                                    alt="Luxury Watch"
                                    className="w-full h-80 object-cover"
                                />
                            </div>
                        </div>
                    </div>

                    {/* FAQ Content */}
                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-200 rounded-xl border border-gray-300 overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center cursor-pointer justify-between p-6 text-left group"
                                    >
                                        <span className="text-lg font-medium pr-4  text-(--primary-color)transition-colors">
                                            {faq.question}
                                        </span>
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-(--primary-color)' : 'bg-(--deep-black)'
                                            }`}>
                                            {openIndex === index ? (
                                                <Minus className="w-5 h-5 text-black bg-[var(--primary-color)" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-white " />
                                            )}
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                            }`}
                                    >
                                        <div className="px-6 pb-6">
                                            <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    );
};