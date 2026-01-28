import React from 'react';
import { Check } from 'lucide-react';

const ShowcaseSection = () => {
    return (
        <section className="bg-linear-to-b from-slate-800 to-slate-900 text-white py-20 px-2 sm:px-8 lg:px-20">
            <div className="container">
                {/* Double Image Grid */}
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* Left Image */}
                    <div>
                        {/* Section Header */}
                        <div className="mb-7">
                            <p className="section-label">
                                Why Choose Solarionis
                            </p>
                            <h2 className="text-4xl md:text-5xl font-serif mb-6">
                                Exceptional Timepieces For Every & Occasion
                            </h2>
                            <p className="text-gray-400 max-w-2xl leading-relaxed">
                                Ut eleifend metus ligula, porttis finibus urna gravida et. Aenean vehicula
                                sodales arcu naa mettis. Integer dapibus ac dui pretium blandit. Class
                                aptent taciti sociosqu ad litora torquent per conubia nnostra, per inceptos
                                himenaeos.
                            </p>
                        </div>

                        <div className='relative group overflow-hidden rounded-lg mb-8'>
                            <img
                                src="/src/assets/images/product/1.webp"
                                alt="Modern Watch Display"
                                className="w-full h-[500px] rounded object-cover transition-transform duration-700 group-hover:scale-105"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div>
                        {/* Right Image */}
                        <div className="relative group overflow-hidden rounded-lg mb-8">
                            <img
                                src="/src/assets/images/product/3.webp"
                                alt="Luxury Watch Collection"
                                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        </div>

                        {/* Text Content */}
                        <div>
                            <h3 className="text-3xl font-serif mb-6">
                                Discover Endless Designs
                            </h3>
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Integer dapibus ac dui pretium blandit. Class aptent taciti sociosqu ad
                                litora torquent per conubia nostra, per inceptos himenaeos. Ut eleifend
                                mettis ligula, porttis finibus urna gravida et. Aenean vehicula sodales arcu
                                non mettis.
                            </p>

                            {/* Checkmark List */}
                            <ul className="space-y-4">
                                <li className="flex items-start">
                                    <Check className="w-5 h-5 primary-text mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-400">
                                        Ut eleifend mettis ligula, porttis finibus urna gravida et
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="w-5 h-5 primary-text mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-400">
                                        Aenean vehicula sodales arcu non mettis
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <Check className="w-5 h-5 primary-text mr-3 mt-1 flex-shrink-0" />
                                    <span className="text-gray-400">
                                        Integer dapibus ac dui pretium blanes aptent
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ShowcaseSection;