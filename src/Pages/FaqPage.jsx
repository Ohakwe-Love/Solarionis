import React, { useMemo, useState } from 'react';
import { Plus, Minus, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { FAQ_CATEGORIES } from '../content/defaultFaqs';
import { usePublicFaqs } from '../hooks/usePublicFaqs';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function FaqPage() {
    const faqs = usePublicFaqs();
    const settings = useSiteSettings();
    const [openIndex, setOpenIndex] = useState(0);
    const [activeCategory, setActiveCategory] = useState('all');

    const filteredFaqs = useMemo(() => {
        if (activeCategory === 'all') {
            return faqs;
        }

        return faqs.filter((faq) => faq.category === activeCategory);
    }, [activeCategory, faqs]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <Header />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pt-24">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600">
                        Clear answers about accounts, funding, investments, and support.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            <div>
                                <p className="text-(--primary-color) text-sm font-medium tracking-widest mb-4">
                                    NEED HELP?
                                </p>
                                <h1 className="text-4xl sm:text-5xl text-(--deep-black) font-bold mb-4">
                                    Browse by topic
                                </h1>
                                <p className="text-gray-600">
                                    Admin can update these answers from the FAQ manager, so this page stays in sync with the actual platform.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-4 border border-gray-200 space-y-2">
                                {FAQ_CATEGORIES.map((category) => (
                                    <button
                                        key={category.id}
                                        onClick={() => {
                                            setActiveCategory(category.id);
                                            setOpenIndex(-1);
                                        }}
                                        className={`w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition ${activeCategory === category.id
                                            ? 'bg-(--solar-gold) text-black'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>

                            <div className="bg-gray-200 rounded-xl p-6 border border-gray-300">
                                <h3 className="text-(--deep-black) font-semibold mb-4">Contact Us</h3>
                                <div className="space-y-3 text-gray-600 text-sm">
                                    <div>{settings.support_address}</div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-(--primary-color)" />
                                        <a href={`mailto:${settings.support_email}`} className="hover:text-black">
                                            {settings.support_email}
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-(--primary-color)" />
                                        <span>{settings.support_phone || 'Phone support will be published here.'}</span>
                                    </div>
                                    <div>
                                        {settings.working_hours_weekdays}
                                        <br />
                                        {settings.working_hours_weekends}
                                    </div>
                                    <Link to="/contact" className="inline-flex pt-2 font-semibold text-black hover:underline">
                                        Go to contact page
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-2">
                        <div className="space-y-4">
                            {filteredFaqs.map((faq, index) => (
                                <div
                                    key={faq.id}
                                    className="bg-gray-200 rounded-xl border border-gray-300 overflow-hidden transition-all duration-300"
                                >
                                    <button
                                        onClick={() => toggleFAQ(index)}
                                        className="w-full flex items-center cursor-pointer justify-between p-6 text-left group"
                                    >
                                        <span className="text-lg font-medium pr-4 text-(--deep-black)">
                                            {faq.question}
                                        </span>
                                        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-(--primary-color)' : 'bg-(--deep-black)'
                                            }`}>
                                            {openIndex === index ? (
                                                <Minus className="w-5 h-5 text-black" />
                                            ) : (
                                                <Plus className="w-5 h-5 text-white" />
                                            )}
                                        </div>
                                    </button>

                                    <div className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96' : 'max-h-0'}`}>
                                        <div className="px-6 pb-6">
                                            <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {filteredFaqs.length === 0 && (
                                <div className="rounded-xl border border-gray-300 bg-white p-8 text-center text-gray-600">
                                    No FAQs found in this category yet.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
}
