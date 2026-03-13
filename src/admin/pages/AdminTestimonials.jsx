import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";
import { adminJson, adminRequest, clearAdminAuthenticated, normalizePaginatedRows } from "../adminApi";

const FILTERS = ["all", "pending", "approved", "rejected"];

export default function AdminTestimonials() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionId, setActionId] = useState(null);
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredRows = useMemo(() => {
        if (statusFilter === "all") return rows;
        return rows.filter((row) => String(row.status || "").toLowerCase() === statusFilter);
    }, [rows, statusFilter]);

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_TESTIMONIALS);
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load testimonials.");
            }
            setRows(normalizePaginatedRows(data));
        } catch (err) {
            setError(err.message || "Failed to load testimonials.");
        } finally {
            setLoading(false);
        }
    };

    const approve = async (id) => {
        setActionId(id);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_TESTIMONIAL_APPROVE(id), {
                method: "POST",
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Approval failed.");
            }
            await load();
        } catch (err) {
            setError(err.message || "Approval failed.");
        } finally {
            setActionId(null);
        }
    };

    const reject = async (id) => {
        setActionId(id);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_TESTIMONIAL_REJECT(id), {
                method: "POST",
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Rejection failed.");
            }
            await load();
        } catch (err) {
            setError(err.message || "Rejection failed.");
        } finally {
            setActionId(null);
        }
    };

    const toggleFeature = async (row) => {
        setActionId(row.id);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_TESTIMONIAL_FEATURE(row.id), {
                method: "POST",
                body: { featured: !row.featured },
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Feature update failed.");
            }
            await load();
        } catch (err) {
            setError(err.message || "Feature update failed.");
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <h1 className="text-3xl font-bold text-white">Testimonials</h1>
                <div className="flex gap-2 flex-wrap">
                    {FILTERS.map((status) => (
                        <button
                            key={status}
                            onClick={() => setStatusFilter(status)}
                            className={`rounded-lg px-3 py-1.5 text-sm capitalize ${statusFilter === status
                                    ? "bg-(--solar-gold) text-black font-semibold"
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
                <table className="w-full min-w-[960px]">
                    <thead>
                        <tr className="border-b border-zinc-800">
                            <th className="text-left py-3 text-sm text-zinc-400">User</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Rating</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Message</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Featured</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Submitted</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading &&
                            filteredRows.map((row) => {
                                const status = String(row.status || "").toLowerCase();
                                return (
                                    <tr key={row.id} className="border-b border-zinc-900">
                                        <td className="py-3 text-sm text-zinc-200">
                                            {row.user?.email || row.user?.name || `#${row.user_id}`}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200">
                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((_, i) => (
                                                    <Star
                                                        key={`${row.id}-star-${i}`}
                                                        className={`w-4 h-4 ${i < Number(row.rating || 0)
                                                                ? "fill-yellow-400 text-yellow-400"
                                                                : "text-zinc-600"
                                                            }`}
                                                    />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200 max-w-md">
                                            <p className="line-clamp-3">{row.message}</p>
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200 capitalize">{row.status}</td>
                                        <td className="py-3 text-sm text-zinc-200">
                                            {row.featured ? "Yes" : "No"}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-400">
                                            {row.created_at ? new Date(row.created_at).toLocaleString() : "-"}
                                        </td>
                                        <td className="py-3 text-sm">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => approve(row.id)}
                                                    disabled={actionId === row.id || status === "approved"}
                                                    className="rounded-lg px-3 py-1.5 bg-(--solar-gold) text-black font-semibold disabled:opacity-40"
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => reject(row.id)}
                                                    disabled={actionId === row.id || status === "rejected"}
                                                    className="rounded-lg px-3 py-1.5 bg-red-500/20 text-red-300 disabled:opacity-40"
                                                >
                                                    Reject
                                                </button>
                                                <button
                                                    onClick={() => toggleFeature(row)}
                                                    disabled={actionId === row.id || status !== "approved"}
                                                    className="rounded-lg px-3 py-1.5 bg-zinc-800 text-zinc-200 disabled:opacity-40"
                                                >
                                                    {row.featured ? "Unfeature" : "Feature"}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            {!loading && filteredRows.length === 0 && (
                <p className="text-zinc-500 text-sm">No testimonials found for this filter.</p>
            )}
        </div>
    );
}
