import React, { useState } from 'react';
import { Search, ChevronDown, ChevronUp, Mail, Phone, MessageCircle, Book, HelpCircle, FileText, DollarSign, Lock, CreditCard, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'

export default function HelpPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [expandedFAQ, setExpandedFAQ] = useState(null);

    const categories = [
        { id: 'all', name: 'All Topics', icon: Book },
        { id: 'getting-started', name: 'Getting Started', icon: HelpCircle },
        { id: 'investing', name: 'Investing', icon: DollarSign },
        { id: 'account', name: 'Account & Security', icon: Lock },
        { id: 'payments', name: 'Payments & Taxes', icon: CreditCard },
        { id: 'portfolios', name: 'Portfolios', icon: BarChart }
    ];

    const faqs = [
        {
            category: 'getting-started',
            question: 'What is Solarionis?',
            answer: 'Solarionis is an investment platform that provides access to solar energy infrastructure projects. We allow individual and institutional investors to participate in the renewable energy transition while earning stable, long-term returns through dividend-paying solar investments.'
        },
        {
            category: 'getting-started',
            question: 'Who can invest with Solarionis?',
            answer: 'Anyone 18 years or older can create an account. However, specific investment opportunities may have different requirements. Some investments are available to all investors with minimums as low as $100, while others are restricted to accredited investors. We verify investor qualifications during the investment process.'
        },
        {
            category: 'getting-started',
            question: 'What is an accredited investor?',
            answer: 'An accredited investor is someone who meets certain financial criteria set by the SEC. This includes individuals with annual income exceeding $200,000 ($300,000 with spouse) for the past two years, or net worth exceeding $1 million (excluding primary residence). Certain professional certifications and entity types also qualify.'
        },
        {
            category: 'investing',
            question: 'What are the minimum investment amounts?',
            answer: 'Minimum investments vary by project and investor type. Most retail opportunities start at $100-$500, while institutional offerings typically require $25,000-$100,000 minimum. Specific minimums are clearly displayed on each investment opportunity page.'
        },
        {
            category: 'investing',
            question: 'How do I make an investment?',
            answer: 'To invest: (1) Browse available opportunities on our Portfolios page, (2) Review the offering documents and project details, (3) Click "Invest Now" and enter your investment amount, (4) Review and sign the subscription agreement electronically, (5) Link your bank account and fund your investment via ACH transfer. Your investment will be confirmed once funds are received.'
        },
        {
            category: 'investing',
            question: 'What returns can I expect?',
            answer: 'Historical returns on our platform have averaged 7-14% IRR, with most projects targeting 8-12% annual returns. Returns vary by project, risk profile, and market conditions. All projected returns are estimates based on current assumptions and are not guaranteed. Past performance does not indicate future results.'
        },
        {
            category: 'investing',
            question: 'How often will I receive dividends?',
            answer: 'Most investments on our platform distribute dividends monthly or quarterly, depending on the project structure. Dividend schedules are specified in each offering document. Distributions are automatically deposited to your linked bank account or can be reinvested at your preference.'
        },
        {
            category: 'investing',
            question: 'What are the risks of investing?',
            answer: 'All investments carry risk, including potential loss of principal. Solar investments specifically face risks including: project development delays, equipment performance issues, changes in energy prices, regulatory changes, weather impacts, and counterparty credit risk. We conduct extensive due diligence, but cannot eliminate all risks. Review offering documents carefully and consult financial advisors.'
        },
        {
            category: 'account',
            question: 'How do I create an account?',
            answer: 'Click "Create Account" in the top navigation, choose your investor type, enter your email to verify, then complete your profile with personal information. You\'ll need to provide your name, address, date of birth, Social Security number, and link a bank account. We use this information for identity verification and regulatory compliance.'
        },
        {
            category: 'account',
            question: 'Is my information secure?',
            answer: 'Yes. We use bank-level 256-bit SSL encryption for all data transmission and storage. Your personal and financial information is encrypted and stored on secure servers. We never share your information with third parties except as required for investment processing or by law. Multi-factor authentication is available for added security.'
        },
        {
            category: 'account',
            question: 'How do I reset my password?',
            answer: 'Click "Forgot Password" on the login page, enter your registered email, and we\'ll send a password reset link. For security, the link expires after 24 hours. If you don\'t receive the email, check your spam folder or contact support.'
        },
        {
            category: 'account',
            question: 'Can I have multiple accounts?',
            answer: 'No, each individual is limited to one account. However, you can invest through different entity types (individual, IRA, business, trust, etc.) by registering separate legal entities. Contact our support team for assistance with entity accounts.'
        },
        {
            category: 'payments',
            question: 'How do I fund my investments?',
            answer: 'Investments are funded via ACH (bank transfer) from your linked bank account. After making an investment commitment, you\'ll receive instructions to complete the transfer. Funds typically clear within 3-5 business days. We do not accept credit cards, wire transfers, or cryptocurrency.'
        },
        {
            category: 'payments',
            question: 'When will I receive my dividends?',
            answer: 'Dividend payment schedules vary by investment. Most projects distribute monthly or quarterly. Specific payment dates are in your investment dashboard and offering documents. Dividends are sent via ACH to your linked bank account within 3-5 business days of the distribution date.'
        },
        {
            category: 'payments',
            question: 'How are investments taxed?',
            answer: 'Tax treatment depends on the investment structure. Most investments generate ordinary income, reported on Form 1099 or Schedule K-1. Some may have depreciation benefits or qualified dividend treatment. We provide tax documents by January 31st for the prior year. Consult your tax advisor for specific guidance.'
        },
        {
            category: 'payments',
            question: 'Can I invest through my IRA or 401(k)?',
            answer: 'Yes! We offer a self-directed IRA program that allows you to invest retirement funds in solar projects. You can transfer existing IRA/401(k) funds or make new contributions. Contact our IRA team at ira@solarionis.com for details on setup, custodian fees, and eligible account types.'
        },
        {
            category: 'payments',
            question: 'Are there any fees?',
            answer: 'Solarionis charges a platform fee (typically 0.5-1.5% annually) that varies by investment. Some projects may have acquisition, management, or performance fees. All fees are disclosed in offering documents before you invest. There are no fees to create an account or browse opportunities.'
        },
        {
            category: 'portfolios',
            question: 'How do I track my investments?',
            answer: 'Log into your dashboard to view all active investments, performance metrics, dividend history, and account statements. You can download detailed reports, tax documents, and offering materials at any time. We also send monthly/quarterly email updates on portfolio performance.'
        },
        {
            category: 'portfolios',
            question: 'Can I sell my investments?',
            answer: 'Solar infrastructure investments are generally illiquid with recommended hold periods of 5-10 years. However, we offer a secondary market where accredited investors may list shares for sale to other platform users. Availability is not guaranteed, and shares may sell at a discount. Early redemption fees may apply.'
        },
        {
            category: 'portfolios',
            question: 'What happens if a project underperforms?',
            answer: 'If a project generates less revenue than projected, dividend distributions may be reduced. We work with project sponsors to implement corrective measures. In severe cases, assets may be sold or restructured. While we conduct thorough due diligence, we cannot eliminate all performance risks. Diversifying across multiple projects can help mitigate single-project risk.'
        },
        {
            category: 'portfolios',
            question: 'How are projects selected?',
            answer: 'Our investment team conducts extensive due diligence on every opportunity, evaluating: (1) Project economics and revenue contracts, (2) Equipment quality and warranties, (3) Developer experience and track record, (4) Site conditions and energy production estimates, (5) Legal structure and documentation, (6) Insurance coverage, (7) Market and regulatory factors. Only projects meeting our strict criteria are offered on the platform.'
        }
    ];

    const contactOptions = [
        {
            icon: Mail,
            title: 'Email Support',
            description: 'Get help via email',
            contact: 'support@solarionis.com',
            availability: 'Response within 24 hours'
        },
        {
            icon: Phone,
            title: 'Phone Support',
            description: 'Speak with our team',
            contact: '1-800-SOLARIONIS',
            availability: 'Mon-Fri, 9 AM - 6 PM PST'
        },
        {
            icon: MessageCircle,
            title: 'Live Chat',
            description: 'Chat with an agent',
            contact: 'Available in dashboard',
            availability: 'Mon-Fri, 9 AM - 6 PM PST'
        }
    ];

    const filteredFAQs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = searchQuery === '' ||
            faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
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

                    {/* Search Bar */}
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

            {/* Main Content */}
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

                        {/* Sidebar - Categories */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
                                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                                <div className="space-y-2">
                                    {categories.map((category) => {
                                        const IconComponent = typeof category.icon === 'string' ? null : category.icon;
                                        return (
                                            <button
                                                key={category.id}
                                                onClick={() => setActiveCategory(category.id)}
                                                className={`w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left ${activeCategory === category.id
                                                    ? 'bg-(--solar-gold) text-black font-semibold'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                                    }`}
                                            >
                                                {IconComponent ? (
                                                    <IconComponent className="w-5 h-5" />
                                                ) : (
                                                    <span className="text-xl">{category.icon}</span>
                                                )}
                                                <span>{category.name}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Main Content - FAQs */}
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
                                            key={index}
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

            {/* Contact Support Section */}
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
                            return (
                                <div
                                    key={index}
                                    className="bg-gray-50 rounded-2xl p-6 lg:p-8 text-center hover:shadow-lg transition-all"
                                >
                                    <div className="w-16 h-16 bg-(--solar-gold)/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <IconComponent className="w-8 h-8 text-(--solar-gold)" />
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                                        {option.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {option.description}
                                    </p>
                                    <p className="text-(--solar-gold) font-semibold mb-2">
                                        {option.contact}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {option.availability}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Additional Resources */}
            <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Additional Resources
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <Link
                            to="/resources/getting-started"
                            className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <Book className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Getting Started Guide
                            </h3>
                            <p className="text-gray-600">
                                Learn the basics of investing with Solarionis
                            </p>
                        </Link>

                        <Link
                            to="/resources/investment-guide"
                            className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <FileText className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Investment Guide
                            </h3>
                            <p className="text-gray-600">
                                Understand solar infrastructure investments
                            </p>
                        </Link>

                        <Link
                            to="/resources/video-tutorials"
                            className="bg-white rounded-2xl p-6 hover:shadow-lg transition-all group"
                        >
                            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                <MessageCircle className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                Video Tutorials
                            </h3>
                            <p className="text-gray-600">
                                Watch step-by-step platform walkthroughs
                            </p>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}