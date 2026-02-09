import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import DashboardHeader from './DashboardHeader';
import { Sun } from 'lucide-react';
import Logo from '../../assets/images/logo/icon.png';


export default function DashboardLayout() {
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            const token = localStorage.getItem('auth_token');
            
            if (!token) {
                window.location.href = '/login';
                return;
            }

            const response = await fetch('https://solarionis.test/api/auth/user', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            } else {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            localStorage.removeItem('auth_token');
            window.location.href = '/login';
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <img src={Logo} alt=""  className="animate-spin w-25"/>
                    <p className="text-gray-600">Loading your data...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Sidebar 
                user={user} 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)} 
            />

            {/* Main Content */}
            <div className="lg:ml-64">
                <DashboardHeader 
                    user={user} 
                    onMenuClick={() => setSidebarOpen(true)} 
                />

                <main className="p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}