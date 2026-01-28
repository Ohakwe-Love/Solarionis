import React from 'react';
import { Zap, UserRound, BrainCircuit, Layers } from 'lucide-react';


const HowItWorks = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 text-black bg-white">
            <div className="flex items-center justify-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-[var(--electric-blue)]" />
                </div>
                <span className="text-sm uppercase tracking-wider text-gray-600">How It Works</span>
            </div>
            <h2 className='text-center max-w-3xl m-auto'>Streamlined to Access Renewable energy investments</h2>

            <div className="grid mt-10 lg:grid-cols-3 gap-8 lg:gap-12 items-center">
                <div className='p-5 bg-gray-100 rounded-full flex items-center gap-3 streamlined-step'>
                    <span className="rounded-full w-15 h-15 bg-gray-200 flex items-center justify-center"><UserRound className='text-[var(--electric-blue)]' /></span>
                    <h3 className='text-2xl  flex-1 font-bold mb-4'>Create your Solarionis account</h3>
                </div>
                <div className='p-5 bg-[var(--deep-black)] rounded-full flex items-center gap-3 streamlined-step'>
                    <span className="rounded-full w-15 h-15 bg-slate-800 flex items-center justify-center"><Layers className='text-[var(--solar-gold)]' /></span>
                    <h3 className='text-2xl  flex-1 text-[var(--solar-gold)] font-bold mb-4'>Build your Solarionis portfolio</h3>
                </div>
                <div className='p-5 bg-gray-100 rounded-full flex items-center gap-3 streamlined-step'>
                    <span className="rounded-full w-15 h-15 bg-gray-200 flex items-center justify-center"><BrainCircuit className='text-[var(--electric-blue)]' /></span>
                    <h3 className='text-2xl  flex-1 font-bold mb-4'>Earn monthly dividends</h3>
                </div>
            </div>

        </div>
    )
}

export default HowItWorks