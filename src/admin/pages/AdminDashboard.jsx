import React, { useEffect, useMemo, useState } from "react";
import { Users, ArrowDownCircle, ArrowUpCircle, Clock3, Copy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import {
    adminJson,
    clearAdminAuthenticated,
    normalizePaginatedRows,
} from "../adminApi";

function money(value) {
    return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

export default function AdminDashboard() {
    const navigate = useNavigate();
    const [metrics, setMetrics] = useState({
        activeUsers: 0,
        totalDeposits: 0,
        totalWithdrawals: 0,
        pendingRequests: 0,
    });
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const cards = useMemo(
        () => [
            { key: "users", label: "Active Users", value: metrics.activeUsers, icon: Users, color: "bg-[var(--solar-gold)]/15 text-[var(--solar-gold)]" },
            { key: "deposits", label: "Deposits", value: metrics.totalDeposits, icon: ArrowDownCircle, color: "bg-emerald-500/15 text-emerald-400" },
            { key: "withdrawals", label: "Withdrawals", value: metrics.totalWithdrawals, icon: ArrowUpCircle, color: "bg-sky-500/15 text-sky-400" },
            { key: "pending", label: "Pending Queue", value: metrics.pendingRequests, icon: Clock3, color: "bg-orange-500/15 text-orange-400" },
        ],
        [metrics]
    );

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const [depositsRes, withdrawalsRes] = await Promise.all([
                adminJson(API_ENDPOINTS.ADMIN_DEPOSITS),
                adminJson(API_ENDPOINTS.ADMIN_WITHDRAWALS),
            ]);

            if (
                depositsRes.response.status === 401 ||
                withdrawalsRes.response.status === 401
            ) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }

            const deposits = normalizePaginatedRows(depositsRes.data);
            const withdrawals = normalizePaginatedRows(withdrawalsRes.data);

            const uniqueUsers = new Set([
                ...deposits.map((item) => item.user_id),
                ...withdrawals.map((item) => item.user_id),
            ]);

            const pendingStatuses = new Set(["waiting", "requested", "processing", "pending"]);
            const pendingCount =
                deposits.filter((item) => pendingStatuses.has(String(item.payment_status).toLowerCase())).length +
                withdrawals.filter((item) => pendingStatuses.has(String(item.status).toLowerCase())).length;

            const txRows = [
                ...deposits.map((item) => ({
                    id: `dep_${item.id}`,
                    type: "Deposit",
                    user: item.user?.email || item.user?.name || `#${item.user_id}`,
                    status: item.payment_status,
                    amount: Number(item.price_amount || 0),
                    createdAt: item.created_at,
                })),
                ...withdrawals.map((item) => ({
                    id: `wd_${item.id}`,
                    type: "Withdrawal",
                    user: item.user?.email || item.user?.name || `#${item.user_id}`,
                    status: item.status,
                    amount: Number(item.amount_minor || 0),
                    createdAt: item.created_at,
                })),
            ]
                .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
                .slice(0, 10);

            setMetrics({
                activeUsers: uniqueUsers.size,
                totalDeposits: deposits.length,
                totalWithdrawals: withdrawals.length,
                pendingRequests: pendingCount,
            });
            setTransactions(txRows);
        } catch (err) {
            setError(err.message || "Failed to load admin dashboard.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white">Dashboard</h1>

            {error && (
                <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {cards.map((card) => {
                    const Icon = card.icon;
                    return (
                        <div key={card.key} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                            <div className="flex items-start justify-between">
                                <p className="text-zinc-400">{card.label}</p>
                                <span className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.color}`}>
                                    <Icon className="w-6 h-6" />
                                </span>
                            </div>
                            <p className="text-5xl font-bold text-zinc-100 mt-6">
                                {loading ? "-" : card.value}
                            </p>
                        </div>
                    );
                })}
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-3xl font-bold text-white mb-4">Recent Transactions</h2>
                {transactions.length === 0 ? (
                    <div className="h-72 rounded-xl border border-zinc-800 bg-black/40 flex flex-col items-center justify-center text-zinc-500">
                        <Copy className="w-12 h-12 mb-3" />
                        No transactions yet
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="text-left py-3 text-sm text-zinc-400">Type</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">User</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Amount</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((tx) => (
                                    <tr key={tx.id} className="border-b border-zinc-900">
                                        <td className="py-3 text-sm text-zinc-200">{tx.type}</td>
                                        <td className="py-3 text-sm text-zinc-200">{tx.user}</td>
                                        <td className="py-3 text-sm text-zinc-200">${money(tx.amount)}</td>
                                        <td className="py-3 text-sm text-zinc-200 capitalize">{tx.status}</td>
                                        <td className="py-3 text-sm text-zinc-400">
                                            {tx.createdAt ? new Date(tx.createdAt).toLocaleString() : "-"}
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
