import React, { useState } from 'react';
import { ArrowRight, Plus, Minus } from 'lucide-react';
import { Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/logo/logo.png';

export default function Footer() {
    const [openSection, setOpenSection] = useState(null);

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const currentYear = new Date().getFullYear();

    const footerSections = {
        product: {
            title: 'PRODUCT',
            links: [
                { name: 'Investments', href: '#' },
                { name: 'Referral Program', href: '#' },
                { name: 'Solarionis IRA', href: '#' },
                { name: 'Wealth Advisors', href: '#' },
                { name: 'Performance', href: '#' },
                { name: 'Liquidity', href: '#' }
            ]
        },
        company: {
            title: 'COMPANY',
            links: [
                { name: 'About Us', href: '#' },
                { name: 'Contact', href: '#' },
                { name: 'Project Developers', href: '#' },
                { name: 'Careers', href: '#' },
                { name: 'Reviews', href: '#' },
                { name: 'Solarionis Apparel', href: '#' }
            ]
        },
        resources: {
            title: 'RESOURCES',
            links: [
                { name: 'FAQ', href: '#' },
                { name: 'Articles', href: '#' },
                { name: 'Quarterly Webinars', href: '#' },
                { name: 'Films', href: '#' },
                { name: 'Annual Reports', href: '#' },
                { name: 'Glossary', href: '#' }
            ]
        }
    };

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

                <div className="grid grid-cols-2 gap-3">
                    <div className="mb-12 lg:mb-16">
                        {/* Logo */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-6">
                                <NavLink to="/">
                                    <img src={logo} alt="" className='w-25 h-auto' />
                                </NavLink>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Invest in <span className="text-[var(--solar-gold)]">Energy</span>
                                <br />
                                Infrastructure
                            </h2>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <NavLink className="btn rounded btn-primary">
                                GET STARTED
                                <ArrowRight className="w-5 h-5" />
                            </NavLink>
                            <NavLink className="btn rounded btn-border">
                                CONTACT US
                                <ArrowRight className="w-5 h-5" />
                            </NavLink>
                        </div>

                        {/* App Store Badges */}
                        {/* <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <a href="#" className="bg-black rounded-lg px-6 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors border border-gray-700">
                            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="white">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs">Download on the</div>
                                <div className="text-lg font-semibold">App Store</div>
                            </div>
                        </a>
                        <a href="#" className="bg-black rounded-lg px-6 py-3 flex items-center gap-3 hover:bg-gray-800 transition-colors border border-gray-700">
                            <svg className="w-8 h-8" viewBox="0 0 24 24">
                                <path fill="#34A853" d="M3.609 3.609L13.5 13.5V22l-9.891-9.891z" />
                                <path fill="#FBBC05" d="M3.609 3.609L13.5 13.5l9.891-9.891L13.5 0z" />
                                <path fill="#4285F4" d="M13.5 13.5l9.891 9.891V3.609z" />
                                <path fill="#EA4335" d="M3.609 20.391L13.5 13.5v8.5z" />
                            </svg>
                            <div className="text-left">
                                <div className="text-xs">GET IT ON</div>
                                <div className="text-lg font-semibold">Google Play</div>
                            </div>
                        </a>
                    </div> */}

                        {/* Social Media Icons */}
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-[var(--solar-gold)] transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-[var(--solar-gold)] transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-[var(--solar-gold)] transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-[var(--solar-gold)] transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-[var(--solar-gold)] transition-colors">
                                <Youtube className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    <div className="hidden lg:grid lg:grid-cols-3 gap-12 mb-12 pb-12 border-b border-gray-800">
                        {Object.entries(footerSections).map(([key, section]) => (
                            <div key={key}>
                                <h3 className="text-gray-400 text-sm font-semibold mb-6 tracking-wider">
                                    {section.title}
                                </h3>
                                <ul className="space-y-4">
                                    {section.links.map((link, idx) => (
                                        <li key={idx}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-[var(--solar-gold)] transition-colors flex items-center justify-between group"
                                            >
                                                <span>{link.name}</span>
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>



                {/* Mobile Accordion - Visible on Mobile Only */}
                <div className="lg:hidden mb-8 border-t border-gray-800">
                    {Object.entries(footerSections).map(([key, section]) => (
                        <div key={key} className="border-b border-gray-800">
                            <button
                                onClick={() => toggleSection(key)}
                                className="w-full py-6 flex items-center justify-between text-left"
                            >
                                <h3 className="text-2xl font-semibold">{section.title.charAt(0) + section.title.slice(1).toLowerCase()}</h3>
                                {openSection === key ? (
                                    <Minus className="w-6 h-6 text-orange-400" />
                                ) : (
                                    <Plus className="w-6 h-6 text-orange-400" />
                                )}
                            </button>

                            {openSection === key && (
                                <ul className="pb-6 space-y-4 animate-slideDown">
                                    {section.links.map((link, idx) => (
                                        <li key={idx}>
                                            <a
                                                href={link.href}
                                                className="text-gray-300 hover:text-[var(--solar-gold)] transition-colors block"
                                            >
                                                {link.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>

                {/* Legal Disclaimer */}
                <div className="text-gray-400 text-xs leading-relaxed mb-8 space-y-4">
                    <p>
                        Solarionis Global LLC ("Solarionis") operates a website at www.Solarionis.com (the "Site"). By creating an account, you accept our{' '}
                        <a href="#" className="text-[var(--solar-gold)] hover:underline">Terms of Service</a> and{' '}
                        <a href="#" className="text-[var(--solar-gold)] hover:underline">Privacy Policy</a> as well as our partner Dwolla's{' '}
                        <a href="#" className="text-[var(--solar-gold)] hover:underline">Terms of Service</a> and{' '}
                        <a href="#" className="text-[var(--solar-gold)] hover:underline">Privacy Policy</a>. Creating an account on the Site simultaneously creates a Dwolla account to handle ACH transfers when making investments or receiving dividends. For more information on Dwolla, please reference our FAQ. Past performance is no guarantee of future returns, nor of profitability. investments may not reflect future performance and are not intended to reflect the future return of Solarionis, its projects, or historical performance may not reflect the real or probabilistic properties and/or in partial or in total loss. Neither Solarionis nor any of its affiliates provide tax advice and do not represent in any manner that the outcome described herein will result in any particular tax consequence. Prospective investors should confer with their personal tax advisors regarding the tax consequences of an investment based on their particular circumstances. Neither Solarionis nor any of its affiliates assume responsibility for the tax consequences of any investment for any investor. Additionally, neither Solarionis nor any of its affiliates provide investment advice in any manner. We can only provide information about our offerings and how to use our platform. Any investment decisions based on the information we provide are purely that of the investor.
                    </p>
                    <p>
                        Solarionis does not in any way sell personal information. In compliance with the California Consumer Compliancy Act (CCPA) you may request to retrieve or delete any data that we have collected about you by{' '}
                        <a href="#" className="text-[var(--solar-gold)] hover:underline">filling out this form</a>.
                    </p>
                    <p>
                        For questions or assistance, please reach out:{' '}
                        <a href="mailto:info@Solarionis.com" className="text-[var(--solar-gold)] hover:underline">info@Solarionis.com</a>
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-800 text-gray-400 text-sm">
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-[var(--solar-gold)] transition-colors">PRIVACY POLICY</a>
                        <a href="#" className="hover:text-[var(--solar-gold)] transition-colors">TERMS OF SERVICE</a>
                    </div>
                    <div>© {currentYear} Solarionis. All Rights Reserved.</div>
                </div>
            </div>
        </footer>
    );
}