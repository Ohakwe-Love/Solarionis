import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, RefreshCcw, Send } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";
import {
    adminJson,
    adminRequest,
    clearAdminAuthenticated,
    getPagination,
    normalizePaginatedRows,
} from "../adminApi";

const FILTERS = ["all", "new", "replied"];

export default function AdminMessages() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [reply, setReply] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [pagination, setPagination] = useState({
        currentPage: 1,
        lastPage: 1,
        perPage: 25,
        total: 0,
    });
    const [page, setPage] = useState(1);

    useEffect(() => {
        void load(page, statusFilter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, statusFilter]);

    useEffect(() => {
        if (!selectedId && rows.length > 0) {
            void loadDetail(rows[0].id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rows, selectedId]);

    const load = async (targetPage = 1, filter = "all") => {
        setLoading(true);
        setError("");

        try {
            const url = new URL(API_ENDPOINTS.ADMIN_CONTACT_MESSAGES);
            url.searchParams.set("page", String(targetPage));
            url.searchParams.set("per_page", "25");
            if (filter !== "all") {
                url.searchParams.set("status", filter);
            }

            const { response, data } = await adminJson(url.toString());
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load contact messages.");
            }

            const nextRows = normalizePaginatedRows(data);
            setRows(nextRows);
            setPagination(getPagination(data));

            if (nextRows.length === 0) {
                setSelectedId(null);
                setSelectedMessage(null);
                setReply("");
                return;
            }

            if (!nextRows.some((row) => row.id === selectedId)) {
                void loadDetail(nextRows[0].id);
            }
        } catch (err) {
            setError(err.message || "Failed to load contact messages.");
        } finally {
            setLoading(false);
        }
    };

    const loadDetail = async (id) => {
        setDetailLoading(true);
        setError("");
        setSuccess("");

        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_CONTACT_MESSAGE_DETAIL(id));
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load message details.");
            }

            setSelectedId(id);
            setSelectedMessage(data);
            setReply(data?.admin_reply || "");
        } catch (err) {
            setError(err.message || "Failed to load message details.");
        } finally {
            setDetailLoading(false);
        }
    };

    const sendReply = async (event) => {
        event.preventDefault();
        if (!selectedId) {
            return;
        }

        setSending(true);
        setError("");
        setSuccess("");

        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_CONTACT_MESSAGE_REPLY(selectedId), {
                method: "POST",
                body: { reply },
            });
            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to send reply.");
            }

            setSelectedMessage(data.contact_message);
            setReply(data.contact_message?.admin_reply || reply);
            setSuccess(data?.message || "Reply sent successfully.");
            void load(page, statusFilter);
        } catch (err) {
            setError(err.message || "Failed to send reply.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="grid gap-6 xl:grid-cols-[420px_minmax(0,1fr)]">
            <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Messages</h1>
                        <p className="text-sm text-zinc-400">
                            {pagination.total} contact messages
                        </p>
                    </div>
                    <button
                        onClick={() => void load(page, statusFilter)}
                        className="rounded-lg border border-zinc-700 p-2 text-zinc-300 hover:bg-zinc-900"
                        aria-label="Refresh messages"
                    >
                        <RefreshCcw className="w-4 h-4" />
                    </button>
                </div>

                <div className="flex gap-2 flex-wrap">
                    {FILTERS.map((status) => (
                        <button
                            key={status}
                            onClick={() => {
                                setStatusFilter(status);
                                setPage(1);
                            }}
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

                {error && (
                    <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <div className="space-y-3">
                    {!loading && rows.length === 0 && (
                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 text-sm text-zinc-500">
                            No contact messages found.
                        </div>
                    )}

                    {rows.map((row) => (
                        <button
                            key={row.id}
                            onClick={() => void loadDetail(row.id)}
                            className={`w-full rounded-xl border p-4 text-left transition ${
                                selectedId === row.id
                                    ? "border-[var(--solar-gold)] bg-zinc-900"
                                    : "border-zinc-800 bg-zinc-950 hover:bg-zinc-900/80"
                            }`}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-white">{row.name}</p>
                                    <p className="truncate text-xs text-zinc-400">{row.email}</p>
                                </div>
                                <span
                                    className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
                                        row.status === "replied"
                                            ? "bg-emerald-500/15 text-emerald-300"
                                            : "bg-amber-500/15 text-amber-300"
                                    }`}
                                >
                                    {row.status}
                                </span>
                            </div>
                            <p className="mt-3 line-clamp-2 text-sm text-zinc-300">{row.message}</p>
                            <p className="mt-3 text-xs text-zinc-500">
                                {row.created_at ? new Date(row.created_at).toLocaleString() : "-"}
                            </p>
                        </button>
                    ))}
                </div>

                <div className="flex items-center justify-between gap-3 text-sm text-zinc-400">
                    <p>
                        Page {pagination.currentPage} of {pagination.lastPage}
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
            </section>

            <section className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                {!selectedMessage && !detailLoading && (
                    <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-dashed border-zinc-800 text-zinc-500">
                        Select a message to view details.
                    </div>
                )}

                {selectedMessage && (
                    <div className="space-y-6">
                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-zinc-400">
                                    <Mail className="w-4 h-4" />
                                    <span className="text-sm">{selectedMessage.email}</span>
                                </div>
                                <h2 className="mt-2 text-2xl font-bold text-white">{selectedMessage.name}</h2>
                                <p className="mt-1 text-sm text-zinc-500">
                                    {selectedMessage.phone || "No phone provided"}
                                </p>
                            </div>
                            <div className="text-sm text-zinc-400">
                                <p>Received: {selectedMessage.created_at ? new Date(selectedMessage.created_at).toLocaleString() : "-"}</p>
                                <p>Status: <span className="capitalize text-zinc-200">{selectedMessage.status}</span></p>
                                <p>
                                    Replied by: {selectedMessage.replied_by_admin?.name || selectedMessage.repliedByAdmin?.name || "-"}
                                </p>
                            </div>
                        </div>

                        {success && (
                            <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 p-3 text-sm text-emerald-200">
                                {success}
                            </div>
                        )}

                        <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-5">
                            <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                                Original Message
                            </p>
                            <p className="whitespace-pre-line text-sm leading-7 text-zinc-200">
                                {selectedMessage.message}
                            </p>
                        </div>

                        <form onSubmit={sendReply} className="space-y-4">
                            <div>
                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Reply Email
                                </label>
                                <textarea
                                    value={reply}
                                    onChange={(event) => setReply(event.target.value)}
                                    rows={10}
                                    required
                                    minLength={5}
                                    className="w-full rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-white outline-none transition focus:border-[var(--solar-gold)]"
                                    placeholder="Write your reply to the contact message here."
                                />
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={sending || detailLoading}
                                    className="inline-flex items-center gap-2 rounded-lg bg-[var(--solar-gold)] px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-40"
                                >
                                    <Send className="w-4 h-4" />
                                    {sending ? "Sending..." : "Send Reply"}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </section>
        </div>
    );
}
