import React from 'react';
import { Zap, User, Users, Building2, PiggyBank, TrendingUp, Landmark } from 'lucide-react';

export default function InvestorTypes() {
    const investorCategories = [
        {
            icon: User,
            title: 'Individual Investors',
            description: 'Start investing with as little as $100. No minimum net worth requirements.'
        },
        {
            icon: Users,
            title: 'Non-Accredited Investors',
            description: 'Everyone can participate. No SEC accreditation needed to own real renewable energy assets.'
        },
        {
            icon: Building2,
            title: 'Small Businesses',
            description: 'Diversify your business investments with stable, income-producing clean energy assets.'
        },
        {
            icon: PiggyBank,
            title: 'IRA & 401(k) Accounts',
            description: 'Invest through tax-advantaged retirement accounts with our Solarionis IRA program.'
        },
        {
            icon: TrendingUp,
            title: 'Wealth Managers',
            description: 'Access institutional-quality renewable energy investments for your clients.'
        },
        {
            icon: Landmark,
            title: 'Institutions',
            description: 'Large-scale allocations available for institutional investors seeking ESG-aligned assets.'
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-[var(--electric-blue)]" />
                        </div>
                        <span className="text-sm uppercase tracking-wider text-gray-600">Investors For Everyone</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                        Open to all investor types
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Whether you are an individual looking to start with $100 or an institution seeking significant allocations,
                        Solarionis provides a pathway to renewable energy ownership.
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {investorCategories.map((category, index) => {
                        const IconComponent = category.icon;
                        return (
                            <div
                                key={index}
                                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow duration-300"
                            >
                                <div className="w-14 h-14 bg-(--deep-black) rounded-full flex items-center justify-center mb-6">
                                    <IconComponent className="w-7 h-7 text-(--solar-gold)" strokeWidth={2} />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                    {category.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {category.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}