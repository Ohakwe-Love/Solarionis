import React, { useMemo, useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, MessageCircle, Book, HelpCircle, FileText, DollarSign, Lock, CreditCard, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';
import { FAQ_CATEGORIES } from '../content/defaultFaqs';
import { usePublicFaqs } from '../hooks/usePublicFaqs';
import { useSiteSettings } from '../hooks/useSiteSettings';

const categoryIconMap = {
    all: Book,
    'getting-started': HelpCircle,
    investing: DollarSign,
    account: Lock,
    payments: CreditCard,
    portfolios: BarChart,
};

export default function HelpPage() {
    const settings = useSiteSettings();
    const faqs = usePublicFaqs();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const contactOptions = [
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Get help via email',
            contact: settings.support_email,
            availability: 'Response within 24 hours',
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak with our team',
            contact: settings.support_phone || 'Phone number not published yet',
            availability: `${settings.working_hours_weekdays} ${settings.working_hours_weekends}`.trim(),
        },
        {
            icon: MessageCircle,
            title: 'Contact Page',
            description: 'Send a direct message to the team',
            contact: '/contact',
            availability: 'Use the site contact form anytime',
        },
    ];

    const filteredFAQs = useMemo(() => {
        return faqs.filter((faq) => {
            const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
            const query = searchQuery.trim().toLowerCase();
            const matchesSearch = query === ''
                || faq.question.toLowerCase().includes(query)
                || faq.answer.toLowerCase().includes(query);

            return matchesCategory && matchesSearch;
        });
    }, [activeCategory, faqs, searchQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-(--deep-black) text-white pt-2">
                <Header />
                <div className="max-w-4xl mx-auto text-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                    <div className="w-16 h-16 bg-(--solar-gold)/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <HelpCircle className="w-8 h-8 text-(--solar-gold)" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        How Can We Help?
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 mb-8">
                        Find answers to common questions or get in touch with our support team
                    </p>

                    <div className="max-w-2xl mx-auto">
                        <div className="relative -z-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-white z-1" />
                            <input
                                type="text"
                                placeholder="Search for help..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-14 pr-4 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl text-white placeholder-gray-400 focus:border-(--solar-gold) focus:outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {FAQ_CATEGORIES.map((category) => {
                                        const IconComponent = categoryIconMap[category.id] || Book;
                                        return (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                                className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeCategory === category.id
                                                    ? 'bg-(--solar-gold) text-black font-semibold'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                <IconComponent className="w-5 h-5" />
                                                <span>{category.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="lg:col-span-3">
                            <div className="mb-8">
                                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-gray-600">
                                    {filteredFAQs.length} {filteredFAQs.length === 1 ? 'result' : 'results'} found
                                </p>
                            </div>

                            {filteredFAQs.length === 0 ? (
                                <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                                    <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        No results found
                                    </h3>
                                    <p className="text-gray-600">
                                        Try adjusting your search or browse by category
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {filteredFAQs.map((faq, index) => (
                                        <div
                                            key={faq.id}
                                            className="bg-white rounded-2xl shadow-sm overflow-hidden"
                                        >
                                            <button
                                                onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                                                className="w-full cursor-pointer flex items-start justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                                            >
                                                <span className="font-semibold text-gray-900 pr-4 flex-1">
                                                    {faq.question}
                                                </span>
                                                {expandedFAQ === index ? (
                                                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                                                ) : (
                                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 mt-1" />
                                                )}
                                            </button>
                                            {expandedFAQ === index && (
                                                <div className="px-6 pb-6">
                                                    <p className="text-gray-700 leading-relaxed">
                                                        {faq.answer}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Still Need Help?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Our support team is here to assist you
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {contactOptions.map((option, index) => {
                            const IconComponent = option.icon;
                            const isContactRoute = option.contact.startsWith('/');

                            return (
                                <div
                                    key={index}
                                    className="bg-(--deep-black) rounded-2xl p-6 lg:p-8 text-center hover:shadow-lg transition-all"
                                >
                                    <div className="w-16 h-16 bg-(--solar-gold)/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="w-8 h-8 text-(--solar-gold)" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">
                                        {option.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {option.description}
                                    </p>
                                    {isContactRoute ? (
                                        <Link to={option.contact} className="text-(--solar-gold) font-semibold mb-2 inline-block">
                                            Open Contact Page
                                        </Link>
                                    ) : (
                                        <p className="text-(--solar-gold) font-semibold mb-2">
                                            {option.contact}
                                        </p>
                                    )}
                                    <p className="text-sm text-gray-500">
                                        {option.availability}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Additional Resources
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 m-auto gap-6">
                        <Link
                            to="/getting-started"
                            className="bg-(--deep-black) rounded-2xl p-6 hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Book className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Getting Started Guide
                            </h3>
                            <p className="text-gray-600">
                                Learn the basics of investing with Solarionis
                            </p>
                        </Link>

                        <Link
                            to="/investment-guide"
                            className="bg-(--deep-black) rounded-2xl p-6 hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">
                                Investment Guide
                            </h3>
                            <p className="text-gray-600">
                                Understand solar infrastructure investments
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
