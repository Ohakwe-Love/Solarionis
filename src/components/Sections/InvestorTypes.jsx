import React from 'react';
import { Zap, User, Users, Building2, PiggyBank, TrendingUp, Landmark } from 'lucide-react';
import { DEFAULT_HOME_PAGE_CONTENT } from '../../content/defaultHomePageContent';

const iconMap = {
    user: User,
    users: Users,
    'building-2': Building2,
    'piggy-bank': PiggyBank,
    'trending-up': TrendingUp,
    landmark: Landmark,
};

export default function InvestorTypes({ content = DEFAULT_HOME_PAGE_CONTENT.investor_types }) {
    const investorCategories = Array.isArray(content.items) ? content.items : DEFAULT_HOME_PAGE_CONTENT.investor_types.items;

    return (
        <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Zap className="w-4 h-4 text-(--solar-gold)" />
                        </div>
                        <span className="text-sm uppercase tracking-wider text-gray-600">{content.eyebrow}</span>
                    </div>
                    <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                        {content.title}
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        {content.description}
                    </p>
                </div>

                {/* Grid Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {investorCategories.map((category, index) => {
                        const IconComponent = iconMap[category.icon_key] || User;
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
