import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ShieldCheck, Wallet, UserPlus, Zap } from 'lucide-react';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const steps = [
    {
        icon: UserPlus,
        title: 'Create your account',
        description: 'Register with your email, verify your address with the code we send, and complete your basic investor profile.',
    },
    {
        icon: ShieldCheck,
        title: 'Complete KYC verification',
        description: 'Submit your identity details so Solarionis can verify your account before sensitive actions like withdrawals and investing.',
    },
    {
        icon: Wallet,
        title: 'Fund your wallet',
        description: 'Choose a supported funding method, follow the payment instructions exactly, and wait for confirmation before your balance updates.',
    },
    {
        icon: Zap,
        title: 'Review projects and invest',
        description: 'Compare offerings, minimums, expected returns, and timelines. When you are ready, use Invest Now from the project page or dashboard.',
    },
];

const checklist = [
    'Use an email address you control because verification and support replies are sent there.',
    'Keep your profile information accurate so KYC review does not get delayed.',
    'Read project details, investment duration, and risk notes before committing funds.',
    'Check your dashboard after funding to confirm wallet balance, activity, and portfolio updates.',
];

export default function GettingStartedPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            <section className="bg-(--deep-black) text-white pt-2">
                <Header />
                <div className="max-w-5xl mx-auto text-center py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
                    <div className="w-16 h-16 bg-(--solar-gold)/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <UserPlus className="w-8 h-8 text-(--solar-gold)" />
                    </div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
                        Getting Started Guide
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto">
                        The fastest path from registration to your first funded investment on Solarionis.
                    </p>
                </div>
            </section>

            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-12">
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            return (
                                <div key={step.title} className="rounded-2xl bg-white p-6 shadow-sm border border-gray-200">
                                    <div className="flex items-center justify-between mb-5">
                                        <div className="w-12 h-12 rounded-xl bg-(--solar-gold)/10 flex items-center justify-center">
                                            <Icon className="w-6 h-6 text-(--solar-gold)" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-400">Step {index + 1}</span>
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h2>
                                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                </div>
                            );
                        })}
                    </div>

                    <div className="grid gap-8 lg:grid-cols-[1.3fr_0.9fr]">
                        <div className="rounded-3xl bg-white p-8 shadow-sm border border-gray-200">
                            <h2 className="text-3xl font-bold text-gray-900 mb-5">What to do before your first investment</h2>
                            <p className="text-gray-600 leading-relaxed mb-6">
                                Solarionis is structured for users who want a clear flow: register, verify, fund, then invest. Taking a few minutes to set up your account correctly reduces support issues later, especially around KYC, deposits, and withdrawals.
                            </p>
                            <div className="space-y-4">
                                {checklist.map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                                        <p className="text-gray-700 leading-relaxed">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl bg-(--deep-black) p-8 text-white shadow-sm">
                            <h2 className="text-2xl font-bold mb-4">Next actions</h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                If your goal is to move from onboarding to active investing, use these two pages in order.
                            </p>
                            <div className="space-y-4">
                                <Link to="/register" className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 hover:bg-white/15 transition">
                                    <span className="font-semibold">Create account</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/investment-guide" className="flex items-center justify-between rounded-2xl bg-white/10 px-5 py-4 hover:bg-white/15 transition">
                                    <span className="font-semibold">Read investment guide</span>
                                    <ArrowRight className="w-5 h-5" />
                                </Link>
                                <Link to="/investment" className="flex items-center justify-between rounded-2xl bg-(--solar-gold) text-black px-5 py-4 hover:opacity-90 transition">
                                    <span className="font-semibold">Browse investment offerings</span>
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
