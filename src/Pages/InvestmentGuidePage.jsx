import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CircleDollarSign, Landmark, ShieldAlert, WalletCards } from 'lucide-react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const pillars = [
    {
        icon: CircleDollarSign,
        title: 'Understand the economics',
        description: 'Review target return, duration, minimum deposit, expected payout style, and the project funding goal before investing.',
    },
    {
        icon: WalletCards,
        title: 'Fund correctly',
        description: 'Only send funds through the provided wallet flow or supported payment instructions. In crypto funding, the exact asset and address matter.',
    },
    {
        icon: Landmark,
        title: 'Track the lifecycle',
        description: 'Use your dashboard to monitor wallet balance, active investments, distributions, and investment-related activity over time.',
    },
    {
        icon: ShieldAlert,
        title: 'Treat risk seriously',
        description: 'Projected returns are not guaranteed. Duration, liquidity, operational execution, and market conditions can all affect outcomes.',
    },
];

const principles = [
    'Invest only amounts that fit your time horizon and risk tolerance.',
    'Diversify across projects instead of concentrating your entire exposure in a single offer.',
    'Read project details and offering terms before using Invest Now.',
    'Expect admin review around withdrawals and some operational events.',
    'Use the platform dashboard as your source for balances, documents, and recent activity.',
];

export default function InvestmentGuidePage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-(--deep-black) text-white pt-2">
                <Header />
                <div className="max-w-5xl mx-auto text-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                    <div className="w-16 h-16 bg-(--solar-gold)/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <CircleDollarSign className="w-8 h-8 text-(--solar-gold)" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        Investment Guide
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        A practical guide to evaluating Solarionis opportunities, funding your account, and managing investment activity with fewer mistakes.
                    </p>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {pillars.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.title} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                                    <div className="w-12 h-12 rounded-xl bg-(--solar-gold)/10 flex items-center justify-center mb-5">
                                        <Icon className="w-6 h-6 text-(--solar-gold)" />
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h2>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-900 mb-5">How to evaluate a Solarionis project</h2>
                            <div className="space-y-5 text-gray-700 leading-relaxed">
                                <p>
                                    Start with the basics: minimum investment, maximum allocation, duration, target return, funding progress, and whether the project is currently open for investment. Those metrics tell you whether the opportunity even fits your size and timeline.
                                </p>
                                <p>
                                    Then look at structure. A shorter-duration opportunity may behave differently from a longer hold. A higher projected return usually comes with higher execution or liquidity risk. Use the project data as a decision framework, not a guarantee.
                                </p>
                                <p>
                                    Finally, think operationally. If you plan to fund using crypto, double-check the asset, address, and status updates. If you plan to withdraw later, understand that manual review and admin processing can be part of the flow.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-3xl bg-(--deep-black) p-8 text-white shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">Core principles</h2>
                            <div className="space-y-4">
                                {principles.map((item) => (
                                    <div key={item} className="rounded-2xl bg-white/10 px-4 py-4 text-gray-200">
                                        {item}
                                    </div>
                                ))}
                            </div>
                            <div className="mt-8 space-y-4">
                                <Link to="/investment" className="flex items-center justify-between rounded-2xl bg-(--solar-gold) text-black px-5 py-4 hover:opacity-90 transition">
                                    <span className="font-semibold">View projects</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/dashboard/invest" className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 hover:bg-white/15 transition">
                                    <span className="font-semibold">Go to invest dashboard</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
