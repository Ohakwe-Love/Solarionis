import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Wallet,
    TrendingUp,
    FileText,
    Settings,
    LogOut,
    Sun,
    X,
    PieChart
} from 'lucide-react';
import Logo from '../../assets/images/logo/logo.png';

export default function Sidebar({ user, isOpen, onClose }) {
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
        { path: '/dashboard/portfolio', icon: PieChart, label: 'Portfolio' },
        { path: '/dashboard/invest', icon: TrendingUp, label: 'Invest' },
        { path: '/dashboard/wallet', icon: Wallet, label: 'Wallet' },
        { path: '/dashboard/documents', icon: FileText, label: 'Documents' },
        { path: '/dashboard/settings', icon: Settings, label: 'Settings' }
    ];

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            await fetch('https://solarionis.test/api/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        } catch (error) {
            console.error('Logout error:', error);
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        }
    };

    return (
        <>
            {/* Mobile Sidebar Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-(--deep-black) border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo */}
                <div className="h-25 flex items-center justify-between px-6 border-b border-gray-200 bg-(--deep-black)">
                    <Link to="/dashboard" className="flex items-center gap-2">
                        <img src={Logo} alt="Solarionis Logo" className="w-12 h-12" />
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={onClose}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${
                                    isActive
                                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-100'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* User Profile & Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold">
                            {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                                {user?.first_name} {user?.last_name}
                            </p>
                            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all cursor-pointer"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
}