import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import {
    adminJson,
    clearAdminAuthenticated,
    normalizePaginatedRows,
} from "../adminApi";

function formatMinor(minor, decimals = 2) {
    return (Number(minor || 0) / (10 ** Number(decimals || 2))).toLocaleString(undefined, {
        maximumFractionDigits: Math.max(2, Number(decimals || 2)),
    });
}

export default function AdminInvestments() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const summary = useMemo(() => {
        const active = rows.filter((r) => String(r.status).toLowerCase() === "active").length;
        const total = rows.length;
        const byProject = new Map();
        for (const row of rows) {
            const key = row.project?.name || "Unknown";
            const current = byProject.get(key) || { count: 0, amountMinor: 0, decimals: row.asset?.decimals ?? 2 };
            current.count += 1;
            current.amountMinor += Number(row.amount_minor || 0);
            byProject.set(key, current);
        }
        return { active, total, byProject: Array.from(byProject.entries()).slice(0, 5) };
    }, [rows]);

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_INVESTMENTS);
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load investments.");
            }
            setRows(normalizePaginatedRows(data));
        } catch (err) {
            setError(err.message || "Failed to load investments.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Investments</h1>

            {error && (
                <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                    <p className="text-zinc-400 text-sm">Total Investments</p>
                    <p className="text-4xl font-bold text-zinc-100 mt-2">{summary.total}</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                    <p className="text-zinc-400 text-sm">Active Investments</p>
                    <p className="text-4xl font-bold text-zinc-100 mt-2">{summary.active}</p>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                    <p className="text-zinc-400 text-sm">Projects Funded (Top 5)</p>
                    <p className="text-4xl font-bold text-zinc-100 mt-2">{summary.byProject.length}</p>
                </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">All Investments</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="text-left py-3 text-sm text-zinc-400">ID</th>
                                <th className="text-left py-3 text-sm text-zinc-400">User</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Project</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Asset</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Amount</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Shares</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Invested At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading &&
                                rows.map((row) => (
                                    <tr key={row.id} className="border-b border-zinc-900">
                                        <td className="py-3 text-sm text-zinc-200">{row.id}</td>
                                        <td className="py-3 text-sm text-zinc-200">
                                            {row.user?.email || row.user?.name || `#${row.user_id}`}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200">{row.project?.name || "-"}</td>
                                        <td className="py-3 text-sm text-zinc-200 uppercase">
                                            {row.asset?.code || "-"}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200">
                                            {formatMinor(row.amount_minor, row.asset?.decimals)} {row.asset?.symbol || ""}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200">{row.shares}</td>
                                        <td className="py-3 text-sm text-zinc-200 capitalize">{row.status}</td>
                                        <td className="py-3 text-sm text-zinc-400">
                                            {row.invested_at ? new Date(row.invested_at).toLocaleString() : "-"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>

                {!loading && rows.length === 0 && (
                    <p className="text-zinc-500 text-sm mt-4">No investments found.</p>
                )}
            </div>
        </div>
    );
}
