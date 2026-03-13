import React, { useEffect, useState } from 'react';
import { ArrowRight, Zap } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { API_ENDPOINTS } from '../../config/api';

const PENDING_PROJECT_KEY = 'pending_invest_project_id';

export default function Portfolio() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await fetch(API_ENDPOINTS.PROJECTS, {
                    headers: { Accept: 'application/json' },
                });
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(data?.message || 'Failed to load portfolios.');
                }
                const rows = Array.isArray(data?.projects) ? data.projects : [];
                setProjects(rows.slice(0, 4));
            } catch (err) {
                setError(err.message || 'Failed to load portfolios.');
            } finally {
                setLoading(false);
            }
        };

        run();
    }, []);

    const handleOpenProject = (project) => {
        const token = localStorage.getItem('auth_token');
        if (!token) {
            sessionStorage.setItem(PENDING_PROJECT_KEY, String(project.id));
            navigate('/login');
            return;
        }
        navigate(`/dashboard/invest?project=${project.id}`);
    };

    return (
        <div className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex items-start justify-between mb-12">
                    <div>
                        <div className="flex items-center justify-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <Zap className="w-4 h-4 text-[var(--electric-blue)]" />
                            </div>
                            <span className="text-sm uppercase tracking-wider text-gray-600">INVESTMENT OFFERINGS</span>
                        </div>
                        <h2 className="text-5xl sm:text-6xl font-bold text-gray-900">
                            Open Portfolios
                        </h2>
                    </div>
                    <Link to="/investment" className="hidden md:flex cursor-pointer items-center gap-2 text-gray-900 font-medium hover:gap-4 transition-all">
                        EXPLORE ALL INVESTMENT OFFERINGS
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>

                {error && (
                    <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                        {error}
                    </div>
                )}

                {loading ? (
                    <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center text-gray-500">
                        Loading portfolios...
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project) => (
                            <div
                                key={project.id}
                                className="rounded-3xl p-8 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
                            >
                                <h3 className="text-xl font-semibold text-gray-900 mb-6 min-h-12">
                                    {project.name}
                                </h3>

                                <div className="mb-6">
                                    <div className="text-5xl font-bold text-gray-900 mb-2">
                                        {Number(project.expected_return || 0).toFixed(1)}%
                                    </div>
                                    <div className="text-sm font-medium text-gray-600">
                                        Annual Target Return
                                    </div>
                                </div>

                                <div className="text-sm text-gray-600 mb-6 space-y-1">
                                    <p>Type: <span className="capitalize font-medium">{project.type}</span></p>
                                    <p>Duration: {project.duration_label || `${project.duration_months} months`}</p>
                                </div>

                                <button
                                    onClick={() => handleOpenProject(project)}
                                    className="w-full py-4 px-6 rounded-full font-bold flex items-center justify-center gap-2 transition-all duration-300 group text-[12px] cursor-pointer bg-(--deep-black) text-white hover:bg-(--solar-gold) hover:text-black"
                                >
                                    INVEST NOW
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Mobile CTA */}
                <Link to="/investment" className="md:hidden mt-8 w-full cursor-pointer flex items-center justify-center gap-2 text-gray-900 font-medium py-4">
                    EXPLORE ALL INVESTMENT OFFERINGS
                    <ArrowRight className="w-5 h-5" />
                </Link>
            </div>
        </div>
    );
}
