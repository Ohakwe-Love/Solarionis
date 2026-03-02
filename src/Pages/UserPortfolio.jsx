import React, { useState, useEffect, useMemo } from 'react';
import { Sun, ArrowUpRight, ArrowDownRight, Loader } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

function safeJson(response) {
    return response.json().catch(() => ({}));
}

function formatMoney(value) {
    return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function UserPortfolio() {
    const [portfolioData, setPortfolioData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = useMemo(() => localStorage.getItem('auth_token'), []);

    useEffect(() => {
        fetchPortfolio();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPortfolio = async () => {
        setLoading(true);
        setError('');

        try {
            if (!token) {
                throw new Error('Please log in again.');
            }

            const response = await fetch(API_ENDPOINTS.DASHBOARD_PORTFOLIO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            });

            if (response.status === 401) {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
                return;
            }

            const data = await safeJson(response);

            if (!response.ok) {
                throw new Error(data?.message || 'Failed to fetch portfolio.');
            }

            setPortfolioData(Array.isArray(data?.investments) ? data.investments : []);
        } catch (err) {
            setError(err.message || 'Failed to load portfolio.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="w-12 h-12 text-yellow-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Portfolio</h2>
            {error && (
                <div className="mb-4 bg-red-50 border border-red-200 rounded-xl p-3 text-sm text-red-700">
                    {error}
                </div>
            )}

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
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-xs text-gray-500 mb-1">Capacity</p>
                                <p className="text-sm font-bold text-gray-900">{project.capacity} MW</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-xs text-gray-500 mb-1">Status</p>
                                <p className="text-sm font-bold text-green-600 capitalize">{project.status}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Your Investment</span>
                                <span className="text-sm font-bold text-gray-900">${formatMoney(project.invested)}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Current Value</span>
                                <span className="text-sm font-bold text-gray-900">${formatMoney(project.current_value)}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                <span className="text-sm text-gray-600">Total Returns</span>
                                <span className={`text-sm font-bold flex items-center gap-1 ${Number(project.returns_percentage || 0) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                    {Number(project.returns_percentage || 0) >= 0 ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                                    {Number(project.returns_percentage || 0) >= 0 ? '+' : ''}{Number(project.returns_percentage || 0).toFixed(2)}%
                                </span>
                            </div>
                        </div>

                        <div className="w-full bg-gray-50 text-gray-700 font-semibold py-3 rounded-xl text-center text-sm">
                            Invested {project.invested_at ? new Date(project.invested_at).toLocaleDateString() : '-'}
                        </div>
                    </div>
                ))}
            </div>

            {portfolioData.length === 0 && !error && (
                <div className="text-center py-12">
                    <Sun className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No investments found yet.</p>
                </div>
            )}
        </div>
    );
}
