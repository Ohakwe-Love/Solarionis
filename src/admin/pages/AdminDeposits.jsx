import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";
import {
    adminJson,
    adminRequest,
    clearAdminAuthenticated,
    normalizePaginatedRows,
} from "../adminApi";

function money(value) {
    return Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const STATUS_GROUPS = {
    all: () => true,
    new: (status) => ["waiting", "new"].includes(status),
    pending: (status) => ["confirming", "confirmed", "sending", "partially_paid", "pending"].includes(status),
    finished: (status) => status === "finished",
    failed: (status) => ["failed", "expired", "refunded"].includes(status),
};

export default function AdminDeposits() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionLoadingId, setActionLoadingId] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredRows = useMemo(() => {
        const predicate = STATUS_GROUPS[statusFilter] || STATUS_GROUPS.all;
        return rows.filter((row) => predicate(String(row.payment_status || "").toLowerCase()));
    }, [rows, statusFilter]);

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_DEPOSITS);
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }

            if (!response.ok) {
                throw new Error(data?.message || "Failed to load deposits.");
            }

            setRows(normalizePaginatedRows(data));
        } catch (err) {
            setError(err.message || "Failed to load deposits.");
        } finally {
            setLoading(false);
        }
    };

    const retryCredit = async (id) => {
        setActionLoadingId(id);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_DEPOSIT_RETRY_CREDIT(id), {
                method: "POST",
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Retry failed.");
            }
            await load();
        } catch (err) {
            setError(err.message || "Retry failed.");
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <h1 className="text-3xl font-bold text-white">Deposits</h1>
                <div className="flex gap-2 flex-wrap">
                    {["all", "new", "pending", "finished", "failed"].map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`rounded-lg px-3 py-1.5 text-sm capitalize ${
                                statusFilter === status
                                    ? "bg-[var(--solar-gold)] text-black font-semibold"
                                    : "bg-zinc-900 text-zinc-300"
                            }`}
                        >
                            {status}
                        </button>
                    ))}
                </div>
            </div>

            {error && (
                <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-zinc-800">
                            <th className="text-left py-3 text-sm text-zinc-400">ID</th>
                            <th className="text-left py-3 text-sm text-zinc-400">User</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Asset</th>
                            <th className="text-left py-3 text-sm text-zinc-400">USD</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Payment Ref</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Address / Extra ID</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading &&
                            filteredRows.map((row) => (
                                <tr key={row.id} className="border-b border-zinc-900">
                                    <td className="py-3 text-sm text-zinc-200">{row.id}</td>
                                    <td className="py-3 text-sm text-zinc-200">
                                        {row.user?.email || row.user?.name || `#${row.user_id}`}
                                    </td>
                                    <td className="py-3 text-sm text-zinc-200 uppercase">
                                        {row.asset?.code || row.pay_currency || "-"}
                                    </td>
                                    <td className="py-3 text-sm text-zinc-200">${money(row.price_amount)}</td>
                                    <td className="py-3 text-sm text-zinc-200 capitalize">{row.payment_status}</td>
                                    <td className="py-3 text-sm text-zinc-200">{row.payment_id || "-"}</td>
                                    <td className="py-3 text-xs text-zinc-300">
                                        <div className="max-w-[280px] truncate">{row.pay_address || "-"}</div>
                                        <div className="max-w-[280px] truncate text-zinc-500">{row.payin_extra_id || ""}</div>
                                    </td>
                                    <td className="py-3 text-sm">
                                        {String(row.payment_status).toLowerCase() === "finished" &&
                                        row.credited_at === null ? (
                                            <button
                                                onClick={() => retryCredit(row.id)}
                                                disabled={actionLoadingId === row.id}
                                                className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 bg-[var(--solar-gold)] text-black font-semibold disabled:opacity-60"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                                {actionLoadingId === row.id ? "Retrying..." : "Retry Credit"}
                                            </button>
                                        ) : (
                                            <span className="text-zinc-500">-</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {!loading && filteredRows.length === 0 && (
                <p className="text-zinc-500 text-sm">No deposits found for this filter.</p>
            )}
        </div>
    );
}
