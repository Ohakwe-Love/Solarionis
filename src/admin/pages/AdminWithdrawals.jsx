import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import {
    adminJson,
    adminRequest,
    clearAdminAuthenticated,
    getPagination,
    normalizePaginatedRows,
} from "../adminApi";

function formatMinor(minor, decimals = 2) {
    return (Number(minor || 0) / (10 ** Number(decimals || 2))).toLocaleString(undefined, {
        maximumFractionDigits: Math.max(2, Number(decimals || 2)),
    });
}

export default function AdminWithdrawals() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionId, setActionId] = useState(null);
    const [page, setPage] = useState(1);
    const [statusFilter, setStatusFilter] = useState("all");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        perPage: 25,
        total: 0,
    });

    useEffect(() => {
        load(page, statusFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, statusFilter]);

    const load = async (targetPage = 1, targetStatus = "all") => {
        setLoading(true);
        setError("");

        try {
            const url = new URL(API_ENDPOINTS.ADMIN_WITHDRAWALS);
            url.searchParams.set("page", String(targetPage));
            url.searchParams.set("per_page", "25");
            if (targetStatus !== "all") {
                url.searchParams.set("status", targetStatus);
            }

            const { response, data } = await adminJson(url.toString());
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load withdrawals.");
            }
            setRows(normalizePaginatedRows(data));
            setPagination(getPagination(data));
        } catch (err) {
            setError(err.message || "Failed to load withdrawals.");
        } finally {
            setLoading(false);
        }
    };

    const runAction = async (id, action) => {
        setActionId(id);
        setError("");
        try {
            let endpoint = API_ENDPOINTS.ADMIN_WITHDRAWAL_PROCESSING(id);
            let body = undefined;

            if (action === "sent") {
                endpoint = API_ENDPOINTS.ADMIN_WITHDRAWAL_SENT(id);
                const txHash = window.prompt("TX hash (optional):", "") || "";
                const note = window.prompt("Note (optional):", "") || "";
                body = { tx_hash: txHash, note };
            }

            if (action === "failed") {
                endpoint = API_ENDPOINTS.ADMIN_WITHDRAWAL_FAILED(id);
                const reason = window.prompt("Failure reason:", "manual_review_failed");
                if (!reason) {
                    setActionId(null);
                    return;
                }
                body = { reason };
            }

            const response = await adminRequest(endpoint, {
                method: "POST",
                body,
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Action failed.");
            }

            await load(page, statusFilter);
        } catch (err) {
            setError(err.message || "Action failed.");
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                <h1 className="text-3xl font-bold text-white">Withdrawals</h1>
                <select
                    value={statusFilter}
                    onChange={(e) => {
                        setStatusFilter(e.target.value);
                        setPage(1);
                    }}
                    className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm text-zinc-200"
                >
                    <option value="all">All statuses</option>
                    <option value="requested">Requested</option>
                    <option value="processing">Processing</option>
                    <option value="sent">Sent</option>
                    <option value="failed">Failed</option>
                </select>
            </div>

            {error && (
                <div className="mb-4 rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full min-w-[960px]">
                    <thead>
                        <tr className="border-b border-zinc-800">
                            <th className="text-left py-3 text-sm text-zinc-400">ID</th>
                            <th className="text-left py-3 text-sm text-zinc-400">User</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Asset</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Amount</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Destination</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading &&
                            rows.map((row) => {
                                const status = String(row.status || "").toLowerCase();
                                const canProcess = status === "requested";
                                const canSend = status === "requested" || status === "processing";
                                const canFail = status === "requested" || status === "processing";

                                return (
                                    <tr key={row.id} className="border-b border-zinc-900">
                                        <td className="py-3 text-sm text-zinc-200">{row.id}</td>
                                        <td className="py-3 text-sm text-zinc-200">
                                            {row.user?.email || row.user?.name || `#${row.user_id}`}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200 uppercase">
                                            {row.asset?.code || "-"}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200">
                                            {formatMinor(row.amount_minor, row.asset?.decimals)} {row.asset?.symbol || ""}
                                        </td>
                                        <td className="py-3 text-xs text-zinc-300 max-w-[260px] truncate">
                                            {row.destination}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200 capitalize">{row.status}</td>
                                        <td className="py-3 text-sm">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => runAction(row.id, "processing")}
                                                    disabled={!canProcess || actionId === row.id}
                                                    className="rounded-lg px-3 py-1.5 bg-zinc-800 text-zinc-200 disabled:opacity-40"
                                                >
                                                    Processing
                                                </button>
                                                <button
                                                    onClick={() => runAction(row.id, "sent")}
                                                    disabled={!canSend || actionId === row.id}
                                                    className="rounded-lg px-3 py-1.5 bg-(--solar-gold) text-black font-semibold disabled:opacity-40"
                                                >
                                                    Mark Sent
                                                </button>
                                                <button
                                                    onClick={() => runAction(row.id, "failed")}
                                                    disabled={!canFail || actionId === row.id}
                                                    className="rounded-lg px-3 py-1.5 bg-red-500/20 text-red-300 disabled:opacity-40"
                                                >
                                                    Mark Failed
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {!loading && rows.length === 0 && (
                <p className="text-zinc-500 text-sm mt-4">No withdrawals found.</p>
            )}

            <div className="mt-4 flex items-center justify-between gap-3 text-sm text-zinc-400">
                <p>
                    Showing page {pagination.currentPage} of {pagination.lastPage} ({pagination.total} total withdrawals)
                </p>
                <div className="flex gap-2">
                    <button
                        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                        disabled={loading || page <= 1}
                        className="rounded-lg border border-zinc-700 px-3 py-1.5 disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <button
                        onClick={() => setPage((prev) => Math.min(prev + 1, Math.max(1, pagination.lastPage)))}
                        disabled={loading || page >= pagination.lastPage}
                        className="rounded-lg border border-zinc-700 px-3 py-1.5 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
}
