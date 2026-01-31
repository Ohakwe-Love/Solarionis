import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowUpRight } from 'lucide-react';
import { NavLink } from "react-router-dom";
import logo from '../../assets/images/logo/logo.png';

const mobileNavLinkClass = ({ isActive }) =>
    `${isActive
        ? "text-(--primary-color)"
        : "text-white hover:text-(--primary-color)"
    } block font-medium uppercase tracking-wide py-2 border-b border-gray-700`;

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isResourcesOpen, setIsResourcesOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setMobileMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const resourcesLinks = [
        { name: 'FAQ', href: '/faq' },
        { name: 'Performance', href: '/performance' },
        { name: 'Articles', href: '/articles' },
        { name: 'Reviews', href: '/reviews' },
        { name: 'Annual Reports', href: '/annual-reports' },
        { name: 'Quarterly Webinars', href: '/webinars' },
        { name: 'Energy Infrastructure', href: '/energy-infrastructure' },
        { name: 'Private Markets', href: '/private-markets' },
        { name: 'IRA', href: '/ira' },
        { name: 'Films', href: '/films' }
    ];

    return (
        <header
            className={`left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-1 sm:py-1 transition-all duration-300 ${isScrolled ? 'fixed top-0 bg-(--deep-black) backdrop-blur-md shadow-lg' : 'relative top-0 bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* LOGO */}
                <NavLink to="/" className="z-50">
                    <img src={logo} alt="Logo" className='w-25 h-auto' />
                </NavLink>

                {/* Desktop Navigation */}
                <nav className="hidden lg:block">
                    <ul className='flex gap-4 items-center'>
                        <li>
                            <NavLink
                                to="/investment"
                                className='text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded hover:bg-[rgb(0,0,0,0.4)] transition'
                            >
                                Investment
                            </NavLink>
                        </li>

                        {/* Resources Dropdown */}
                        <li className="relative">
                            <button
                                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                                onMouseEnter={() => setIsResourcesOpen(true)}
                                className='text-white cursor-pointer nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded hover:bg-[rgb(0,0,0,0.4)] transition flex items-center gap-2'
                            >
                                Resources
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${isResourcesOpen ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Dropdown Menu */}
                            {isResourcesOpen && (
                                <div
                                    onMouseLeave={() => setIsResourcesOpen(false)}
                                    className="absolute top-full right-0 mt-2 w-[500px] bg-[#1a1a1a]/95 backdrop-blur-lg rounded-2xl shadow-2xl p-2 grid grid-cols-2 gap-1 translate-x-[-50%] left-[0%]"
                                >
                                    {resourcesLinks.map((link, index) => (
                                        <NavLink
                                            key={index}
                                            to={link.href}
                                            className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-[rgb(0,0,0,0.4)] transition-all group"
                                            onClick={() => setIsResourcesOpen(false)}
                                        >
                                            <span className="text-white font-medium group-hover:text-(--solar-gold) transition-colors">
                                                {link.name}
                                            </span>
                                            <div className="w-10 text-white h-10 bg-[rgb(0,0,0,0.25)] rounded-full flex items-center justify-center text-xl">
                                                <ArrowUpRight className='w-6 h-6' />
                                            </div>
                                        </NavLink>
                                    ))}
                                </div>
                            )}
                        </li>

                        <li>
                            <NavLink
                                to="/wealth"
                                className='text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded hover:bg-[rgb(0,0,0,0.4)] transition'
                            >
                                Wealth
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/about"
                                className='text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded hover:bg-[rgb(0,0,0,0.4)] transition'
                            >
                                About Us
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                {/* Desktop Right Side Buttons */}
                <div className='hidden lg:flex gap-3 items-center'>
                    <NavLink
                        to="/login"
                        className="text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded hover:bg-[rgb(0,0,0,0.4)] transition"
                    >
                        Login
                    </NavLink>
                    <NavLink
                        to="/register"
                        className="text-black nav-link uppercase bg-(--solar-gold) px-3 py-3 rounded hover:opacity-90 transition"
                    >
                        create account
                    </NavLink>
                    <NavLink
                        to="/help"
                        className="text-white nav-link uppercase bg-(--deep-black) px-3 py-3 rounded hover:bg-opacity-80 transition"
                    >
                        <svg fill="none" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" alt="Message question" title="Question message">
                            <path d="M12.75 13.8225H9.75L6.41249 16.0425C5.91749 16.3725 5.25 16.02 5.25 15.42V13.8225C3 13.8225 1.5 12.3225 1.5 10.0725V5.57249C1.5 3.32249 3 1.82249 5.25 1.82249H12.75C15 1.82249 16.5 3.32249 16.5 5.57249V10.0725C16.5 12.3225 15 13.8225 12.75 13.8225Z" stroke="currentColor" strokeWidth="1.125" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M9.00084 8.51999V8.36252C9.00084 7.85252 9.31586 7.58251 9.63086 7.36501C9.93836 7.15501 10.2458 6.88501 10.2458 6.39001C10.2458 5.70001 9.69084 5.14499 9.00084 5.14499C8.31084 5.14499 7.75586 5.70001 7.75586 6.39001" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8.99662 10.3125H9.00337" stroke="currentColor" strokeWidth="1.125" strokeLinecap="round" strokeLinejoin="round"></path>
                        </svg>
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden text-white cursor-pointer p-2 hover:text-(--solar-gold) transition z-50"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            <div
                className={`lg:hidden fixed top-0 left-0 right-0 bg-[#101010]/98 backdrop-blur-lg transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100 pt-24' : 'max-h-0 opacity-0'
                    }`}
            >
                <nav className="px-4 py-6 space-y-4 max-h-[calc(100vh-6rem)] overflow-y-auto">
                    <NavLink
                        to="/investment"
                        className={mobileNavLinkClass}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Investment
                    </NavLink>

                    {/* Mobile Resources Accordion */}
                    <div>
                        <button
                            onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                            className="w-full flex items-center cursor-pointer justify-between text-white font-medium uppercase tracking-wide py-2 border-b border-gray-700"
                        >
                            Resources
                            <ChevronDown
                                className={`w-5 h-5 transition-transform ${isResourcesOpen ? 'rotate-180' : ''
                                    }`}
                            />
                        </button>

                        {isResourcesOpen && (
                            <div className="mt-2 ml-4 space-y-2">
                                {resourcesLinks.map((link, index) => (
                                    <NavLink
                                        key={index}
                                        to={link.href}
                                        className="flex items-center gap-3 py-2 text-gray-300 hover:text-(--solar-gold) transition-colors"
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            setIsResourcesOpen(false);
                                        }}
                                    >
                                        <span className="text-lg">{link.icon}</span>
                                        <span className="text-sm">{link.name}</span>
                                    </NavLink>
                                ))}
                            </div>
                        )}
                    </div>

                    <NavLink
                        to="/wealth"
                        className={mobileNavLinkClass}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Wealth
                    </NavLink>
                    <NavLink
                        to="/about"
                        className={mobileNavLinkClass}
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        About Us
                    </NavLink>

                    <div className="pt-4 space-y-3 border-t border-gray-700">
                        <NavLink
                            to="/login"
                            className="block text-center text-white font-medium uppercase tracking-wide py-3 bg-[rgb(0,0,0,0.25)] rounded hover:bg-[rgb(0,0,0,0.4)] transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/signup"
                            className="block text-center text-black font-medium uppercase tracking-wide py-3 bg-(--solar-gold) rounded hover:opacity-90 transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Create Account
                        </NavLink>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;