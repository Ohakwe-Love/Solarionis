import React, { useState } from 'react';
import { ArrowRight, Plus, Minus, Instagram, Facebook, Linkedin, Youtube } from 'lucide-react';
import { NavLink, Link } from "react-router-dom";
import { useSiteSettings } from "../../hooks/useSiteSettings";

export default function Footer() {
    const [openSection, setOpenSection] = useState(null);
    const settings = useSiteSettings();

    const toggleSection = (section) => {
        setOpenSection(openSection === section ? null : section);
    };

    const currentYear = new Date().getFullYear();
    const isInternalLink = (href) => typeof href === 'string' && href.startsWith('/') && !href.startsWith('//');

    const footerSections = {
        product: {
            title: 'PRODUCT',
            links: [
                { name: 'Investments', href: '/investment' },
                { name: 'Referral Program', href: '#' },
                { name: 'Solarionis IRA', href: '#' },
                { name: 'Wealth Advisors', href: '#' },
                { name: 'Performance', href: '/performance' },
                { name: 'Liquidity', href: '#' }
            ]
        },
        company: {
            title: 'COMPANY',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Project Developers', href: '#' },
                { name: 'Careers', href: '#' },
                { name: 'Reviews', href: '/reviews' },
                { name: 'Solarionis Apparel', href: '#' }
            ]
        },
        resources: {
            title: 'RESOURCES',
            links: [
                { name: 'FAQ', href: '/faq' },
                { name: 'Getting Started Guide', href: '/getting-started' },
                { name: 'Investment Guide', href: '/investment-guide' },
                { name: 'Articles', href: '/articles' },
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

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-1 lg:grid-cols-2">
                    <div className="mb-12 lg:mb-16">
                        {/* Logo */}
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-6">
                                <NavLink to="/">
                                    <img src="/images/logo/logo.png" alt="" className='w-25 h-auto' />
                                </NavLink>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                                Invest in <span className="text-(--solar-gold)">Energy</span>
                                <br />
                                Infrastructure
                            </h2>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <NavLink to="/getting-started" className="btn rounded btn-primary">
                                GET STARTED
                                <ArrowRight className="w-5 h-5" />
                            </NavLink>
                            <NavLink to="/contact" className="btn rounded btn-border">
                                CONTACT US
                                <ArrowRight className="w-5 h-5" />
                            </NavLink>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-(--solar-gold) transition-colors">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-(--solar-gold) transition-colors">
                                <Facebook className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-(--solar-gold) transition-colors">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>
                            <a href="#" className="hover:text-(--solar-gold) transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="#" className="hover:text-(--solar-gold) transition-colors">
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
                                            {isInternalLink(link.href) ? (
                                                <Link
                                                    to={link.href}
                                                    className="text-gray-300 hover:text-(--solar-gold) transition-colors flex items-center justify-between group"
                                                >
                                                    <span>{link.name}</span>
                                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </Link>
                                            ) : (
                                                <a
                                                    href={link.href}
                                                    className="text-gray-300 hover:text-(--solar-gold) transition-colors flex items-center justify-between group"
                                                >
                                                    <span>{link.name}</span>
                                                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </a>
                                            )}
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
                                className="w-full py-6 flex items-center cursor-pointer justify-between text-left"
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
                                            {isInternalLink(link.href) ? (
                                                <Link
                                                    to={link.href}
                                                    className="text-gray-300 hover:text-(--solar-gold) transition-colors block"
                                                >
                                                    {link.name}
                                                </Link>
                                            ) : (
                                                <a
                                                    href={link.href}
                                                    className="text-gray-300 hover:text-(--solar-gold) transition-colors block"
                                                >
                                                    {link.name}
                                                </a>
                                            )}
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
                        Solarionis Global LLC ("Solarionis") operates a website at https://www.solarionis.net (the "Site"). By creating an account, you accept our{' '}
                        <Link to="/terms" className="text-(--solar-gold) hover:underline">Terms of Service</Link> and{' '}
                        <Link to="/privacy-policy" className="text-(--solar-gold) hover:underline">Privacy Policy</Link> as well as our partner Dwolla's{' '}
                        <Link to="#" className="text-(--solar-gold) hover:underline">Terms of Service</Link> and{' '}
                        <Link to="#" className="text-(--solar-gold) hover:underline">Privacy Policy</Link>. Creating an account on the Site simultaneously creates a Dwolla account to handle ACH transfers when making investments or receiving dividends. For more information on Dwolla, please reference our FAQ. Past performance is no guarantee of future returns, nor of profitability. investments may not reflect future performance and are not intended to reflect the future return of Solarionis, its projects, or historical performance may not reflect the real or probabilistic properties and/or in partial or in total loss. Neither Solarionis nor any of its affiliates provide tax advice and do not represent in any manner that the outcome described herein will result in any particular tax consequence. Prospective investors should confer with their personal tax advisors regarding the tax consequences of an investment based on their particular circumstances. Neither Solarionis nor any of its affiliates assume responsibility for the tax consequences of any investment for any investor. Additionally, neither Solarionis nor any of its affiliates provide investment advice in any manner. We can only provide information about our offerings and how to use our platform. Any investment decisions based on the information we provide are purely that of the investor.
                    </p>
                    <p>
                        For questions or assistance, please reach out:{' '}
                        <a href={`mailto:${settings.support_email}`} className="text-(--solar-gold) hover:underline">{settings.support_email}</a>
                    </p>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-gray-800 text-gray-400 text-sm">
                    <div className="flex gap-6">
                        <Link to="/privacy-policy" className="hover:text-(--solar-gold) transition-colors">PRIVACY POLICY</Link>
                        <Link to="/terms" className="hover:text-(--solar-gold) transition-colors">TERMS OF SERVICE</Link>
                    </div>
                    <div>© {currentYear} Solarionis. All Rights Reserved.</div>
                </div>
            </div>
        </footer>
    );
}
