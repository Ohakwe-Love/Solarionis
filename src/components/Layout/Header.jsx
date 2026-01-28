import React, { useState } from 'react';
import { User, Menu} from 'lucide-react';
import { NavLink } from "react-router-dom";
import { useCart } from '../../context/CartContext';
import logo from '../../assets/images/logo/logo.png';



const linkClass = ({ isActive }) =>
    `uppercase tracking-wide transition ${isActive
        ? "text-[var(--primary-color)]"
        : "text-white hover:text-[var(--primary-color)]"
    }`;

const mobileNavLinkClass = ({ isActive }) =>
    `${isActive
        ? "text-[var(--primary-color)]"
        : "text-white hover:text-[var(--primary-color)]"
    } block font-medium uppercase tracking-wide py-2 border-b border-gray-700`;

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-[#101010] sticky top-0">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* LOGO */}
                <NavLink to="/">
                    <img src={logo} alt="" className='w-25 h-auto' />
                </NavLink>

                <nav>
                    <ul className='flex gap-4'>
                        <li><NavLink className='text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded'>Investment</NavLink></li>
                        <li><NavLink className='text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded'>Resources</NavLink></li>
                        <li><NavLink className='text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded'>Wealth</NavLink></li>
                        <li><NavLink className='text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded'>About Us</NavLink></li>
                    </ul>
                </nav>

                <div className='flex gap-3 items-center'>
                    <NavLink className="text-white nav-link uppercase bg-[rgb(0,0,0,0.25)] px-3 py-3 rounded">Login</NavLink>
                    <NavLink className="text-black nav-link uppercase bg-[var(--solar-gold)] px-3 py-3 rounded">create account</NavLink>
                    <NavLink className="text-white nav-link uppercase bg-[var(--deep-black)] px-3 py-3 rounded"><svg fill="none" width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" alt="Message question" title="Question message"><path d="M12.75 13.8225H9.75L6.41249 16.0425C5.91749 16.3725 5.25 16.02 5.25 15.42V13.8225C3 13.8225 1.5 12.3225 1.5 10.0725V5.57249C1.5 3.32249 3 1.82249 5.25 1.82249H12.75C15 1.82249 16.5 3.32249 16.5 5.57249V10.0725C16.5 12.3225 15 13.8225 12.75 13.8225Z" stroke="currentColor" stroke-width="1.125" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.00084 8.51999V8.36252C9.00084 7.85252 9.31586 7.58251 9.63086 7.36501C9.93836 7.15501 10.2458 6.88501 10.2458 6.39001C10.2458 5.70001 9.69084 5.14499 9.00084 5.14499C8.31084 5.14499 7.75586 5.70001 7.75586 6.39001" stroke="currentColor" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8.99662 10.3125H9.00337" stroke="currentColor" stroke-width="1.125" stroke-linecap="round" stroke-linejoin="round"></path></svg></NavLink>
                </div>


                {/* Mobile Menu Button */}
                {/* <button
                    onClick={toggleMobileMenu}
                    className="lg:hidden text-white p-2 hover:text-[var(--primary-color)] transition"
                    aria-label="Toggle menu"
                >
                    {mobileMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button> */}

            </div>

            {/* Mobile Menu */}
            {/* <div
                className={`lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                    }`}
            >
                <nav className="px-4 py-6 space-y-4">
                    <NavLink to="/" className={mobileNavLinkClass}> Home </NavLink>
                    <NavLink to="/" className={mobileNavLinkClass}> About </NavLink>
                    <NavLink to="/" className={mobileNavLinkClass}> Shop </NavLink>
                    <NavLink to="/" className={mobileNavLinkClass}> Faq </NavLink>
                    <NavLink to="/" className={mobileNavLinkClass}> Contact </NavLink>

                    <div className="flex items-center justify-center space-x-6 pt-4 sm:hidden">
                        <Heart className="w-6 h-6 text-white cursor-pointer hover:text-[var(--primary-color)] transition" />
                        <NavLink to='/cart' className="relative cursor-pointer hover:text-[var(--primary-color)] transition text-white">
                            <ShoppingCart className="w-5 h-5" />
                            <span className="absolute -top-2 -right-2 bg-[var(--primary-color)] text-black text-[10px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                                {getCartCount()}
                            </span>
                        </NavLink>
                        <a href="#"><User className="w-6 h-6 text-white cursor-pointer hover:text-[var(--primary-color)] transition" /></a>
                    </div>
                </nav>
            </div> */}
        </header>
    );
};

export default Header;