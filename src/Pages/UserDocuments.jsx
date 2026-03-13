import React, { useEffect, useMemo, useState } from 'react';
import { FileText, Loader } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

function safeJson(response) {
    return response.json().catch(() => ({}));
}

function formatMoney(value) {
    return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function UserDocuments() {
    const [summary, setSummary] = useState(null);
    const [distributions, setDistributions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = useMemo(() => localStorage.getItem('auth_token'), []);

    useEffect(() => {
        fetchDocumentsData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchDocumentsData = async () => {
        setLoading(true);
        setError('');

        try {
            if (!token) {
                throw new Error('Please log in again.');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            };

            const [summaryRes, distributionsRes] = await Promise.all([
                fetch(API_ENDPOINTS.DASHBOARD_DISTRIBUTIONS_SUMMARY, { headers }),
                fetch(API_ENDPOINTS.DASHBOARD_DISTRIBUTIONS, { headers }),
            ]);

            if ([summaryRes, distributionsRes].some((r) => r.status === 401)) {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
                return;
            }

            const [summaryData, distributionsData] = await Promise.all([
                safeJson(summaryRes),
                safeJson(distributionsRes),
            ]);

            if (!summaryRes.ok) {
                throw new Error(summaryData?.message || 'Failed to load distribution summary.');
            }

            setSummary(summaryData);
            setDistributions(Array.isArray(distributionsData?.distributions) ? distributionsData.distributions : []);
        } catch (err) {
            setError(err.message || 'Failed to load documents.');
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
            <div className="flex items-center gap-3">
                <FileText className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900">Documents & Reports</h2>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">This Month</p>
                    <p className="text-2xl font-bold text-gray-900">${formatMoney(summary?.current_month)}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Last Month</p>
                    <p className="text-2xl font-bold text-gray-900">${formatMoney(summary?.last_month)}</p>
                </div>
                <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
                    <p className="text-sm text-gray-500 mb-1">Year To Date</p>
                    <p className="text-2xl font-bold text-gray-900">${formatMoney(summary?.year_to_date)}</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Distribution History</h3>

                {distributions.length === 0 ? (
                    <p className="text-sm text-gray-600">No distribution records found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px]">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left text-xs text-gray-500 pb-3">Project</th>
                                    <th className="text-left text-xs text-gray-500 pb-3">Period</th>
                                    <th className="text-left text-xs text-gray-500 pb-3">Paid At</th>
                                    <th className="text-left text-xs text-gray-500 pb-3">Amount</th>
                                    <th className="text-left text-xs text-gray-500 pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {distributions.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-100">
                                        <td className="py-3 text-sm text-gray-900">{item.project_name || '-'}</td>
                                        <td className="py-3 text-sm text-gray-600">
                                            {item.period_start ? new Date(item.period_start).toLocaleDateString() : '-'} to{' '}
                                            {item.period_end ? new Date(item.period_end).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="py-3 text-sm text-gray-600">
                                            {item.paid_at ? new Date(item.paid_at).toLocaleDateString() : '-'}
                                        </td>
                                        <td className="py-3 text-sm font-semibold text-gray-900">
                                            ${formatMoney(item.amount)}
                                        </td>
                                        <td className="py-3">
                                            <span className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-100 text-gray-700 capitalize">
                                                {item.status || '-'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
