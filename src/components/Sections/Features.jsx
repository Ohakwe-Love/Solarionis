import React, { useState } from 'react';
// import { Send, FileText, MessageCircle, Mail } from 'lucide-react';
import ReturnPolicySvg from '../../assets/icons/return-policy.svg?react';
import ChatSvg from '../../assets/icons/chat.svg';
import EmailSvg from '../../assets/icons/email.svg';
import Stores from '../../assets/icons/stores.svg';

const Features = () => {
    const features = [
        {
            icon: ReturnPolicySvg,
            title: "Return Policy",
            description: "Sodalesqu tellus hex par vestibulum intergue m."
        },
        {
            icon: ChatSvg,
            title: "Chat Helpdesk",
            description: "Cum maximus habitasse sociosqu placerat praesent."
        },
        {
            icon: EmailSvg,
            title: "Email Interaction",
            description: "Commodo selle volutpat fusce eu eros massa netus."
        },
        {
            icon: Stores,
            title: "Store Locations",
            description: "Commodo selle volutpat fusce eu eros massa netus."
        }
    ];

    return (
        <section className="relative bg-slate-900">
            {/* Features Section */}
            <div className="bg-slate-900 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="flex flex-row items-center sm:flex-row items-center sm:items-center gap-4 sm:gap-6 group cursor-pointer"
                            >
                                {/* Icon */}
                                <div className="w-15 h-15 sm:w-25 sm:h-25 flex-shrink-0 bg-slate-800 rounded-lg flex items-center sm-items-center justify-center border border-[var(--primary-color)]/30 group-hover:border-[var(--primary-color)] group-hover:bg-slate-700 transition-all duration-300">
                                    <img src={feature.icon} alt="" className='w-[75%] h-[75%]' />
                                </div>

                                {/* Text */}
                                <div className="flex-1 h-auto">
                                    <h3 className="text-white text-lg sm:text-xl font-semibold group-hover:text-[var(--primary-color)] transition-colors">
                                        {feature.title}
                                    </h3>
                                    {/* <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                                        {feature.description}
                                    </p> */}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
};

export default Features;