import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sun, Loader, ArrowUpRight } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

function safeJson(response) {
    return response.json().catch(() => ({}));
}

function formatMoney(value) {
    return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function UserInvest() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = useMemo(() => localStorage.getItem('auth_token'), []);

    useEffect(() => {
        fetchProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        setError('');

        try {
            if (!token) {
                throw new Error('Please log in again.');
            }

            const response = await fetch(API_ENDPOINTS.PROJECTS, {
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
                throw new Error(data?.message || 'Failed to load projects.');
            }

            setProjects(Array.isArray(data?.projects) ? data.projects : []);
        } catch (err) {
            setError(err.message || 'Failed to load projects.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="w-10 h-10 text-yellow-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Invest Opportunities</h2>
                    <p className="text-sm text-gray-600">Active and funding renewable projects.</p>
                </div>
                <Link
                    to="/investment"
                    className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 transition-colors"
                >
                    Open Marketplace
                </Link>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {projects.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <Sun className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No projects available right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {projects.map((project) => (
                        <div key={project.id} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
                            <div className="flex items-center justify-between mb-2">
                                <p className="text-sm font-semibold text-yellow-700 capitalize">{project.type}</p>
                                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                                    {project.status}
                                </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{project.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{project.location}</p>

                            <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-500">Expected Return</p>
                                    <p className="font-semibold text-gray-900">{project.expected_return}%</p>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-gray-500">Funding Goal</p>
                                    <p className="font-semibold text-gray-900">${formatMoney(project.funding_goal)}</p>
                                </div>
                            </div>

                            <div className="mb-4">
                                <div className="flex justify-between text-xs text-gray-600 mb-1">
                                    <span>Progress</span>
                                    <span>{Number(project.funding_progress || 0).toFixed(1)}%</span>
                                </div>
                                <div className="w-full h-2 rounded-full bg-gray-100">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"
                                        style={{ width: `${Math.min(100, Number(project.funding_progress || 0))}%` }}
                                    />
                                </div>
                            </div>

                            <Link
                                to="/investment"
                                className="inline-flex items-center gap-1 text-sm font-semibold text-yellow-700 hover:underline"
                            >
                                View in Marketplace <ArrowUpRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
