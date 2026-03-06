import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import { adminJson, clearAdminAuthenticated, normalizePaginatedRows } from "../adminApi";

function formatMinor(minor, decimals = 2) {
    return (Number(minor || 0) / (10 ** Number(decimals || 2))).toLocaleString(undefined, {
        maximumFractionDigits: Math.max(2, Number(decimals || 2)),
    });
}

export default function AdminLedger() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    const [wallets, setWallets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const [ledgerRes, walletRes] = await Promise.all([
                adminJson(API_ENDPOINTS.ADMIN_LEDGER_TRANSACTIONS),
                adminJson(`${API_ENDPOINTS.ADMIN_WALLET_BALANCES}?non_zero=true`),
            ]);

            if (ledgerRes.response.status === 401 || walletRes.response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }

            if (!ledgerRes.response.ok) {
                throw new Error(ledgerRes.data?.message || "Failed to load ledger transactions.");
            }

            if (!walletRes.response.ok) {
                throw new Error(walletRes.data?.message || "Failed to load wallet balances.");
            }

            setTransactions(normalizePaginatedRows(ledgerRes.data));
            setWallets(normalizePaginatedRows(walletRes.data));
        } catch (err) {
            setError(err.message || "Failed to load ledger.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Ledger & Financial Oversight</h1>

            {error && (
                <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Wallet Balances (Non-zero)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="text-left py-3 text-sm text-zinc-400">User</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Asset</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Bucket</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading &&
                                wallets.map((row) => (
                                    <tr key={row.id} className="border-b border-zinc-900">
                                        <td className="py-3 text-sm text-zinc-200">
                                            {row.user?.email || row.user?.name || `#${row.user_id}`}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200 uppercase">
                                            {row.asset?.code || "-"}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200 capitalize">{row.bucket}</td>
                                        <td className="py-3 text-sm text-zinc-200">
                                            {formatMinor(row.balance_minor, row.asset?.decimals)} {row.asset?.symbol || ""}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Ledger Transactions</h2>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="text-left py-3 text-sm text-zinc-400">TX ID</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Type</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Reference</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Entries</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading &&
                                transactions.map((row) => (
                                    <tr key={row.id} className="border-b border-zinc-900">
                                        <td className="py-3 text-sm text-zinc-200">{row.id}</td>
                                        <td className="py-3 text-sm text-zinc-200">{row.type || "-"}</td>
                                        <td className="py-3 text-sm text-zinc-200">{row.reference || "-"}</td>
                                        <td className="py-3 text-sm text-zinc-200">{row.entries?.length || 0}</td>
                                        <td className="py-3 text-sm text-zinc-400">
                                            {row.created_at ? new Date(row.created_at).toLocaleString() : "-"}
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
