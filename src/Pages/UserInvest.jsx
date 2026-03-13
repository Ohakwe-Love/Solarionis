import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sun, Loader, X } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

function safeJson(response) {
    return response.json().catch(() => ({}));
}

function formatMoney(value) {
    return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function UserInvest() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);
    const [amount, setAmount] = useState('');
    const [preview, setPreview] = useState(null);
    const [investError, setInvestError] = useState('');
    const [investSuccess, setInvestSuccess] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const token = useMemo(() => localStorage.getItem('auth_token'), []);

    useEffect(() => {
        fetchProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const requestedProjectId = Number(searchParams.get('project') || 0);
        if (!requestedProjectId || projects.length === 0 || selectedProject) {
            return;
        }

        const matched = projects.find((row) => row.id === requestedProjectId);
        if (!matched) {
            return;
        }

        const min = Number(matched?.min_deposit || matched?.active_offering?.min_investment || 0);
        setSelectedProject(matched);
        setAmount(min > 0 ? String(min) : '');
        setPreview(null);
        setInvestError('');
        setInvestSuccess('');
        const next = new URLSearchParams(searchParams);
        next.delete('project');
        setSearchParams(next, { replace: true });
    }, [projects, searchParams, selectedProject, setSearchParams]);

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

    const openInvestModal = (project) => {
        const min = Number(project?.min_deposit || project?.active_offering?.min_investment || 0);
        setSelectedProject(project);
        setAmount(min > 0 ? String(min) : '');
        setPreview(null);
        setInvestError('');
        setInvestSuccess('');
    };

    const closeInvestModal = () => {
        setSelectedProject(null);
        setAmount('');
        setPreview(null);
        setInvestError('');
    };

    const previewInvestment = async () => {
        if (!selectedProject?.active_offering?.id) {
            setInvestError('This project is not currently open for investment.');
            return;
        }

        const parsedAmount = Number(amount);
        if (!parsedAmount || parsedAmount <= 0) {
            setInvestError('Enter a valid amount.');
            return;
        }

        setInvestError('');
        setSubmitting(true);
        try {
            const response = await fetch(API_ENDPOINTS.INVESTMENT_PREVIEW, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    offering_id: selectedProject.active_offering.id,
                    amount: parsedAmount,
                }),
            });

            if (response.status === 401) {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
                return;
            }

            const data = await safeJson(response);
            if (!response.ok) {
                throw new Error(data?.message || 'Failed to preview investment.');
            }

            setPreview(data?.preview || null);
        } catch (err) {
            setInvestError(err.message || 'Failed to preview investment.');
        } finally {
            setSubmitting(false);
        }
    };

    const confirmInvestment = async () => {
        if (!selectedProject?.active_offering?.id) {
            setInvestError('This project is not currently open for investment.');
            return;
        }

        const parsedAmount = Number(amount);
        if (!parsedAmount || parsedAmount <= 0) {
            setInvestError('Enter a valid amount.');
            return;
        }

        setInvestError('');
        setSubmitting(true);
        try {
            const idempotencyKey =
                typeof crypto !== 'undefined' && crypto.randomUUID
                    ? crypto.randomUUID()
                    : `invest-${Date.now()}-${Math.random().toString(36).slice(2)}`;

            const response = await fetch(API_ENDPOINTS.INVESTMENT_CONFIRM, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Idempotency-Key': idempotencyKey,
                },
                body: JSON.stringify({
                    offering_id: selectedProject.active_offering.id,
                    amount: parsedAmount,
                }),
            });

            if (response.status === 401) {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
                return;
            }

            const data = await safeJson(response);
            if (!response.ok) {
                throw new Error(data?.message || 'Failed to complete investment.');
            }

            setInvestSuccess(data?.message || 'Investment successful.');
            closeInvestModal();
            await fetchProjects();
        } catch (err) {
            setInvestError(err.message || 'Failed to complete investment.');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold text-gray-900">Investment Plans</h2>
                <p className="text-sm text-gray-600">Projects created by admin and currently available for funding.</p>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            {investSuccess && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-sm text-green-700">
                    {investSuccess}
                </div>
            )}

            {projects.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <Sun className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-600">No projects available right now.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {projects.map((project) => {
                        const minDeposit = Number(project.min_deposit || 0);
                        const maxDeposit = Number(project.max_deposit || 0);
                        const canInvest = Boolean(project?.active_offering?.id && project?.active_offering?.is_active);
                        return (
                        <div key={project.id} className="rounded-2xl border border-gray-200 bg-gray-200 p-6 text-center shadow-sm">
                            <p className="text-4xl font-bold text-[#86b979] mb-3">
                                ${formatMoney(minDeposit)} - ${formatMoney(maxDeposit)}
                            </p>
                            <h3 className="text-xl font-semibold text-gray-800 mb-5">{project.name}</h3>
                            <div className="space-y-2 text-lg text-gray-600">
                                <p>{Number(project.daily_return || 0).toFixed(2)}% daily Return</p>
                                <p>Min Deposit: ${formatMoney(minDeposit)}</p>
                                <p>Max Deposit: ${formatMoney(maxDeposit)}</p>
                                <p>Investment Duration: {project.duration_label || '-'}</p>
                                <p>{project.automated_payout ? 'Automated Payout' : 'Manual Payout'}</p>
                                <p>{project.ai_integrated_trading ? 'A.I integrated Trading' : 'Manual Trading'}</p>
                                <p>{Number(project.referral_bonus_percent || 0)}% Referral Bonus</p>
                                <p>{project.renewable ? 'Renewable' : 'Not Renewable'}</p>
                            </div>
                            <button
                                onClick={() => openInvestModal(project)}
                                disabled={!canInvest}
                                className="mt-6 px-7 py-2 rounded-lg border-2 border-[#86b979] text-[#86b979] text-2xl font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Invest Now
                            </button>
                        </div>
                    );})}
                </div>
            )}

            {selectedProject && (
                <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
                    <div className="w-full max-w-lg rounded-2xl bg-white p-6 relative">
                        <button
                            onClick={closeInvestModal}
                            className="absolute top-3 right-3 p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                            <X className="w-4 h-4 text-gray-600" />
                        </button>

                        <h3 className="text-xl font-bold text-gray-900 mb-2">Invest in {selectedProject.name}</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Enter amount between ${formatMoney(selectedProject.min_deposit)} and $
                            {formatMoney(selectedProject.max_deposit)}.
                        </p>

                        {investError && (
                            <div className="mb-3 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                {investError}
                            </div>
                        )}

                        <div className="space-y-3">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <input
                                    type="number"
                                    min={selectedProject.min_deposit || 0}
                                    max={selectedProject.max_deposit || undefined}
                                    step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    className="w-full rounded-xl border border-gray-300 px-3 py-2"
                                />
                            </div>

                            {preview && (
                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm">
                                    <p><span className="text-gray-500">Project:</span> {preview.project_name}</p>
                                    <p><span className="text-gray-500">Shares:</span> {preview.shares}</p>
                                    <p><span className="text-gray-500">Expected Monthly Income:</span> ${formatMoney(preview.expected_monthly_income)}</p>
                                    <p><span className="text-gray-500">Total:</span> ${formatMoney(preview.total)}</p>
                                </div>
                            )}

                            <div className="flex gap-2">
                                <button
                                    onClick={previewInvestment}
                                    disabled={submitting}
                                    className="flex-1 rounded-xl px-4 py-2 bg-gray-900 text-white font-semibold disabled:opacity-50"
                                >
                                    {submitting ? 'Processing...' : 'Preview'}
                                </button>
                                <button
                                    onClick={confirmInvestment}
                                    disabled={submitting}
                                    className="flex-1 rounded-xl px-4 py-2 bg-yellow-400 text-black font-semibold disabled:opacity-50"
                                >
                                    {submitting ? 'Processing...' : 'Confirm Invest'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
