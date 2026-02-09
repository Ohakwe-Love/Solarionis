import React, { useState, useEffect } from 'react';
import {
    LayoutDashboard,
    Wallet,
    TrendingUp,
    FileText,
    Settings,
    LogOut,
    Sun,
    DollarSign,
    ArrowUpRight,
    ArrowDownRight,
    MoreVertical,
    ChevronRight,
    Bell,
    Search,
    Menu,
    X,
    PieChart,
    Activity,
    Zap
} from 'lucide-react';

import { API_ENDPOINTS } from '../config/api';


// // Mock API endpoint - replace with your actual API
// const API_BASE_URL = 'https://solarionis.test';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({
        totalInvested: 0,
        currentValue: 0,
        totalReturns: 0,
        activeProjects: 0
    });
    const [portfolioData, setPortfolioData] = useState([]);
    const [recentTransactions, setRecentTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const token = localStorage.getItem('auth_token');

            // Fetch user data
            const userResponse = await fetch(`${API_BASE_URL.USER}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            if (userResponse.ok) {
                const userData = await userResponse.json();
                setUser(userData.user);
            }

            // Mock data - replace with actual API calls
            setStats({
                totalInvested: 50000,
                currentValue: 58750,
                totalReturns: 8750,
                activeProjects: 5
            });

            setPortfolioData([
                {
                    id: 1,
                    name: 'Solar Farm Alpha',
                    invested: 15000,
                    currentValue: 17250,
                    returns: 15,
                    status: 'active',
                    location: 'California',
                    capacity: '5.2 MW'
                },
                {
                    id: 2,
                    name: 'Community Solar Grid',
                    invested: 20000,
                    currentValue: 23400,
                    returns: 17,
                    status: 'active',
                    location: 'Texas',
                    capacity: '8.5 MW'
                },
                {
                    id: 3,
                    name: 'Residential Solar Project',
                    invested: 10000,
                    currentValue: 11500,
                    returns: 15,
                    status: 'active',
                    location: 'Arizona',
                    capacity: '3.8 MW'
                },
                {
                    id: 4,
                    name: 'Industrial Solar Installation',
                    invested: 5000,
                    currentValue: 6600,
                    returns: 32,
                    status: 'completed',
                    location: 'Nevada',
                    capacity: '2.1 MW'
                }
            ]);

            setRecentTransactions([
                { id: 1, type: 'investment', project: 'Solar Farm Alpha', amount: 5000, date: '2026-02-01', status: 'completed' },
                { id: 2, type: 'return', project: 'Community Solar Grid', amount: 850, date: '2026-01-28', status: 'completed' },
                { id: 3, type: 'investment', project: 'Residential Solar Project', amount: 3000, date: '2026-01-25', status: 'completed' },
                { id: 4, type: 'return', project: 'Industrial Solar Installation', amount: 420, date: '2026-01-20', status: 'completed' },
                { id: 5, type: 'investment', project: 'Community Solar Grid', amount: 7500, date: '2026-01-15', status: 'completed' }
            ]);

            setLoading(false);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    };

    const navItems = [
        { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
        { id: 'portfolio', icon: PieChart, label: 'Portfolio' },
        { id: 'invest', icon: TrendingUp, label: 'Invest' },
        { id: 'wallet', icon: Wallet, label: 'Wallet' },
        { id: 'documents', icon: FileText, label: 'Documents' },
        { id: 'settings', icon: Settings, label: 'Settings' }
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Sun className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                        <Sun className="w-8 h-8 text-yellow-500" />
                        <span className="text-xl font-bold text-gray-900">Solarionis</span>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="lg:hidden"
                    >
                        <X className="w-6 h-6 text-gray-600" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="p-4">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.id}
                                onClick={() => {
                                    setActiveTab(item.id);
                                    setSidebarOpen(false);
                                }}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-2 transition-all ${activeTab === item.id
                                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold shadow-lg'
                                        : 'text-gray-600 hover:bg-gray-100'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* User Profile & Logout */}
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 flex items-center justify-center text-black font-bold">
                            {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                                {user?.first_name} {user?.last_name}
                            </p>
                            <p className="text-xs text-gray-500">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <div className="lg:ml-64">
                {/* Top Header */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden"
                        >
                            <Menu className="w-6 h-6 text-gray-600" />
                        </button>
                        <div className="hidden md:block">
                            <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-sm text-gray-500">Welcome back, {user?.first_name}!</p>
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
                        <button className="relative p-2 hover:bg-gray-100 rounded-full">
                            <Bell className="w-5 h-5 text-gray-600" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                    </div>
                </header>

                {/* Dashboard Content */}
                <main className="p-6">
                    {activeTab === 'overview' && (
                        <>
                            {/* Stats Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                                            <DollarSign className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                                            <ArrowUpRight className="w-4 h-4" />
                                            12.5%
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-1">Total Invested</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${stats.totalInvested.toLocaleString()}
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                                            <TrendingUp className="w-6 h-6 text-green-600" />
                                        </div>
                                        <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                                            <ArrowUpRight className="w-4 h-4" />
                                            17.5%
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-1">Current Value</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        ${stats.currentValue.toLocaleString()}
                                    </p>
                                </div>

                                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-lg">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                                            <Zap className="w-6 h-6 text-white" />
                                        </div>
                                        <span className="text-white text-sm font-semibold flex items-center gap-1">
                                            <ArrowUpRight className="w-4 h-4" />
                                            Active
                                        </span>
                                    </div>
                                    <p className="text-yellow-100 text-sm mb-1">Total Returns</p>
                                    <p className="text-2xl font-bold text-white">
                                        ${stats.totalReturns.toLocaleString()}
                                    </p>
                                </div>

                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                                            <Activity className="w-6 h-6 text-purple-600" />
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm mb-1">Active Projects</p>
                                    <p className="text-2xl font-bold text-gray-900">
                                        {stats.activeProjects}
                                    </p>
                                </div>
                            </div>

                            {/* Portfolio Performance */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-lg font-bold text-gray-900">Portfolio Performance</h2>
                                        <select className="text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none">
                                            <option>Last 30 days</option>
                                            <option>Last 90 days</option>
                                            <option>Last year</option>
                                        </select>
                                    </div>

                                    {/* Simple Chart Placeholder */}
                                    <div className="h-64 flex items-end justify-between gap-2">
                                        {[65, 75, 60, 80, 70, 85, 75, 90, 85, 95, 88, 100].map((height, i) => (
                                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                                <div
                                                    className="w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg transition-all hover:from-yellow-500 hover:to-yellow-400 cursor-pointer"
                                                    style={{ height: `${height}%` }}
                                                />
                                                <span className="text-xs text-gray-400">
                                                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Quick Actions */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                    <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
                                    <div className="space-y-3">
                                        <button className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                            <TrendingUp className="w-5 h-5" />
                                            New Investment
                                        </button>
                                        <button className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:border-yellow-400 hover:text-yellow-600 transition-all flex items-center justify-center gap-2">
                                            <Wallet className="w-5 h-5" />
                                            Add Funds
                                        </button>
                                        <button className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:border-yellow-400 hover:text-yellow-600 transition-all flex items-center justify-center gap-2">
                                            <FileText className="w-5 h-5" />
                                            View Reports
                                        </button>
                                    </div>

                                    <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                                        <p className="text-sm font-semibold text-gray-900 mb-1">Referral Bonus</p>
                                        <p className="text-xs text-gray-600 mb-3">Invite friends and earn $100 for each successful referral</p>
                                        <button className="text-sm text-blue-600 font-semibold hover:underline">
                                            Get Referral Link →
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Active Investments */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">Active Investments</h2>
                                    <button className="text-sm text-yellow-600 font-semibold hover:underline flex items-center gap-1">
                                        View All
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {portfolioData.slice(0, 3).map((project) => (
                                        <div key={project.id} className="border border-gray-200 rounded-xl p-4 hover:border-yellow-400 transition-all cursor-pointer group">
                                            <div className="flex items-start justify-between mb-3">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                                                    <Sun className="w-6 h-6 text-white" />
                                                </div>
                                                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${project.status === 'active'
                                                        ? 'bg-green-100 text-green-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {project.status}
                                                </span>
                                            </div>

                                            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
                                                {project.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 mb-3">{project.location} • {project.capacity}</p>

                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-xs text-gray-500">Invested</span>
                                                <span className="text-sm font-bold text-gray-900">
                                                    ${project.invested.toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between mb-3">
                                                <span className="text-xs text-gray-500">Current Value</span>
                                                <span className="text-sm font-bold text-green-600">
                                                    ${project.currentValue.toLocaleString()}
                                                </span>
                                            </div>

                                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                                <span className="text-xs text-gray-500">Returns</span>
                                                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                                                    <ArrowUpRight className="w-3 h-3" />
                                                    +{project.returns}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Recent Transactions */}
                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-gray-900">Recent Transactions</h2>
                                    <button className="text-sm text-yellow-600 font-semibold hover:underline flex items-center gap-1">
                                        View All
                                        <ChevronRight className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="border-b border-gray-200">
                                                <th className="text-left text-xs font-semibold text-gray-500 pb-3">Type</th>
                                                <th className="text-left text-xs font-semibold text-gray-500 pb-3">Project</th>
                                                <th className="text-left text-xs font-semibold text-gray-500 pb-3">Amount</th>
                                                <th className="text-left text-xs font-semibold text-gray-500 pb-3">Date</th>
                                                <th className="text-left text-xs font-semibold text-gray-500 pb-3">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentTransactions.map((transaction) => (
                                                <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                                    <td className="py-4">
                                                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${transaction.type === 'investment'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-green-100 text-green-700'
                                                            }`}>
                                                            {transaction.type === 'investment' ? (
                                                                <ArrowUpRight className="w-3 h-3" />
                                                            ) : (
                                                                <ArrowDownRight className="w-3 h-3" />
                                                            )}
                                                            {transaction.type}
                                                        </span>
                                                    </td>
                                                    <td className="py-4 text-sm text-gray-900">{transaction.project}</td>
                                                    <td className="py-4 text-sm font-semibold text-gray-900">
                                                        ${transaction.amount.toLocaleString()}
                                                    </td>
                                                    <td className="py-4 text-sm text-gray-500">{transaction.date}</td>
                                                    <td className="py-4">
                                                        <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                                                            {transaction.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    )}

                    {activeTab === 'portfolio' && (
                        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Portfolio</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {portfolioData.map((project) => (
                                    <div key={project.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-yellow-400 transition-all">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                                                    <Sun className="w-7 h-7 text-white" />
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
                                                    <p className="text-sm text-gray-500">{project.location}</p>
                                                </div>
                                            </div>
                                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                                <MoreVertical className="w-5 h-5 text-gray-400" />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-xs text-gray-500 mb-1">Capacity</p>
                                                <p className="text-sm font-bold text-gray-900">{project.capacity}</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-xl p-3">
                                                <p className="text-xs text-gray-500 mb-1">Status</p>
                                                <p className="text-sm font-bold text-green-600 capitalize">{project.status}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3 mb-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Your Investment</span>
                                                <span className="text-sm font-bold text-gray-900">${project.invested.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-600">Current Value</span>
                                                <span className="text-sm font-bold text-gray-900">${project.currentValue.toLocaleString()}</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                                <span className="text-sm text-gray-600">Total Returns</span>
                                                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                                                    <ArrowUpRight className="w-4 h-4" />
                                                    +{project.returns}%
                                                </span>
                                            </div>
                                        </div>

                                        <button className="w-full bg-gray-100 hover:bg-yellow-400 hover:text-black text-gray-700 font-semibold py-3 rounded-xl transition-all">
                                            View Details
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'invest' && (
                        <div className="text-center py-12">
                            <Sun className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Investment Opportunities</h2>
                            <p className="text-gray-600">This section will show available solar projects for investment</p>
                        </div>
                    )}

                    {activeTab === 'wallet' && (
                        <div className="text-center py-12">
                            <Wallet className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet & Transactions</h2>
                            <p className="text-gray-600">Manage your funds and view transaction history</p>
                        </div>
                    )}

                    {activeTab === 'documents' && (
                        <div className="text-center py-12">
                            <FileText className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents & Reports</h2>
                            <p className="text-gray-600">Access your investment documents and reports</p>
                        </div>
                    )}

                    {activeTab === 'settings' && (
                        <div className="text-center py-12">
                            <Settings className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
                            <p className="text-gray-600">Manage your account preferences and security</p>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}