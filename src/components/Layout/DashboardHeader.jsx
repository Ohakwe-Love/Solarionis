import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';

export default function DashboardHeader({ user, onMenuClick, title, subtitle }) {
    return (
        <header className="h-25 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden cursor-pointer"
                >
                    <Menu className="w-6 h-6 text-gray-600" />
                </button>
                <div className="hidden md:block pb-2">
                    <h1 className="text-xl font-bold text-gray-900">
                        {title || 'Dashboard'}
                    </h1>
                    <p className="text-sm text-gray-500">
                        {subtitle || `Welcome back, ${user?.first_name}!`}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2">
                    <Search className="w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search projects..."
                        className="bg-transparent border-none outline-none text-sm w-48"
                    />
                </div>
                <button className="relative p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
            </div>
        </header>
    );
}