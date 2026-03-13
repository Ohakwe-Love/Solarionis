import React from 'react';
import { Zap, UserRound, BrainCircuit, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DEFAULT_HOME_PAGE_CONTENT } from '../../content/defaultHomePageContent';

const iconMap = {
    'user-round': UserRound,
    'brain-circuit': BrainCircuit,
    layers: Layers,
};

const HowItWorks = ({ content = DEFAULT_HOME_PAGE_CONTENT.how_it_works }) => {
    const steps = Array.isArray(content.steps) ? content.steps : DEFAULT_HOME_PAGE_CONTENT.how_it_works.steps;
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-black bg-white">
            <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[var(--electric-blue)]" />
                </div>
                <span className="text-sm uppercase tracking-wider text-gray-600">{content.eyebrow}</span>
            </div>
            <h2 className='text-center max-w-3xl m-auto'>{content.title}</h2>

            <div className="grid mt-10 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                {steps.map((step, index) => {
                    const IconComponent = iconMap[step.icon_key] || UserRound;
                    const isDark = step.theme === 'dark';
                    const classes = `p-5 rounded-full flex items-center gap-3 streamlined-step ${isDark ? 'bg-(--deep-black)' : 'bg-gray-100'}`;
                    const iconClasses = isDark ? 'text-(--solar-gold)' : 'text-[var(--electric-blue)]';
                    const labelClasses = `text-2xl flex-1 font-bold mb-4 ${isDark ? 'text-(--solar-gold)' : ''}`;

                    const inner = (
                        <>
                            <span className={`rounded-full w-15 h-15 flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-gray-200'}`}>
                                <IconComponent className={iconClasses} />
                            </span>
                            <h3 className={labelClasses}>{step.title}</h3>
                        </>
                    );

                    if (step.href) {
                        return (
                            <Link key={`${step.title}-${index}`} to={step.href} className={classes}>
                                {inner}
                            </Link>
                        );
                    }

                    return (
                        <div key={`${step.title}-${index}`} className={classes}>
                            {inner}
                        </div>
                    );
                })}
            </div>

        </div>
    )
}

export default HowItWorks
