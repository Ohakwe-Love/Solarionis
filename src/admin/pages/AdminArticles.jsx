import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import { adminJson, adminRequest, clearAdminAuthenticated, normalizePaginatedRows } from "../adminApi";

const TYPES = ["news", "blog", "update"];
const STATUSES = ["draft", "published"];

const EMPTY_FORM = {
    title: "",
    type: "news",
    excerpt: "",
    content: "",
    cover_image_url: "",
    status: "draft",
};

export default function AdminArticles() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [filter, setFilter] = useState("all");
    const [form, setForm] = useState(EMPTY_FORM);

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredRows = useMemo(() => {
        if (filter === "all") return rows;
        return rows.filter((row) => String(row.status || "").toLowerCase() === filter);
    }, [rows, filter]);

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_ARTICLES);
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load articles.");
            }
            setRows(normalizePaginatedRows(data));
        } catch (err) {
            setError(err.message || "Failed to load articles.");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setEditingId(null);
        setForm(EMPTY_FORM);
    };

    const startEdit = (row) => {
        setEditingId(row.id);
        setForm({
            title: row.title || "",
            type: row.type || "news",
            excerpt: row.excerpt || "",
            content: row.content || "",
            cover_image_url: row.cover_image_url || "",
            status: row.status || "draft",
        });
    };

    const submit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const payload = {
                title: form.title.trim(),
                type: form.type,
                excerpt: form.excerpt.trim() || null,
                content: form.content.trim(),
                cover_image_url: form.cover_image_url.trim() || null,
                status: form.status,
            };

            const response = await adminRequest(
                editingId ? API_ENDPOINTS.ADMIN_ARTICLE_DETAIL(editingId) : API_ENDPOINTS.ADMIN_ARTICLES,
                {
                    method: editingId ? "PUT" : "POST",
                    body: payload,
                }
            );
            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.message || "Failed to save article.");
            }

            resetForm();
            await load();
        } catch (err) {
            setError(err.message || "Failed to save article.");
        } finally {
            setSaving(false);
        }
    };

    const togglePublish = async (row) => {
        setSaving(true);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_ARTICLE_PUBLISH(row.id), {
                method: "POST",
                body: {
                    published: row.status !== "published",
                },
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Failed to update publish status.");
            }
            await load();
        } catch (err) {
            setError(err.message || "Failed to update publish status.");
        } finally {
            setSaving(false);
        }
    };

    const remove = async (id) => {
        setSaving(true);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_ARTICLE_DETAIL(id), { method: "DELETE" });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Failed to delete article.");
            }
            if (editingId === id) {
                resetForm();
            }
            await load();
        } catch (err) {
            setError(err.message || "Failed to delete article.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Articles</h1>

            {error && <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">{error}</div>}

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                <form onSubmit={submit} className="xl:col-span-2 rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
                    <h2 className="text-xl font-bold text-white">{editingId ? "Edit Article" : "Create Article"}</h2>
                    <input
                        value={form.title}
                        onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                        placeholder="Title"
                        className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        required
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <select
                            value={form.type}
                            onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value }))}
                            className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        >
                            {TYPES.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                        <select
                            value={form.status}
                            onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                            className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        >
                            {STATUSES.map((value) => (
                                <option key={value} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>

                    <input
                        value={form.cover_image_url}
                        onChange={(e) => setForm((prev) => ({ ...prev, cover_image_url: e.target.value }))}
                        placeholder="Cover image URL (optional)"
                        className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                    />
                    <textarea
                        value={form.excerpt}
                        onChange={(e) => setForm((prev) => ({ ...prev, excerpt: e.target.value }))}
                        placeholder="Short excerpt (optional)"
                        className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        rows={3}
                    />
                    <textarea
                        value={form.content}
                        onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value }))}
                        placeholder="Full content"
                        className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        rows={10}
                        required
                    />

                    <div className="flex gap-2">
                        <button
                            disabled={saving}
                            className="rounded-lg px-4 py-2 bg-(--solar-gold) text-black font-semibold disabled:opacity-50"
                        >
                            {saving ? "Saving..." : editingId ? "Update Article" : "Create Article"}
                        </button>
                        {editingId && (
                            <button
                                type="button"
                                onClick={resetForm}
                                className="rounded-lg px-4 py-2 bg-zinc-800 text-zinc-200"
                            >
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div className="xl:col-span-3 rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-2xl font-bold text-white">Published Content</h2>
                        <div className="flex gap-2">
                            {["all", ...STATUSES].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => setFilter(value)}
                                    className={`rounded-lg px-3 py-1.5 text-sm capitalize ${filter === value
                                        ? "bg-(--solar-gold) text-black font-semibold"
                                        : "bg-zinc-900 text-zinc-300"
                                        }`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[960px]">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="text-left py-3 text-sm text-zinc-400">Title</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Type</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Published</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading &&
                                    filteredRows.map((row) => (
                                        <tr key={row.id} className="border-b border-zinc-900">
                                            <td className="py-3 text-sm text-zinc-200">{row.title}</td>
                                            <td className="py-3 text-sm text-zinc-300 capitalize">{row.type}</td>
                                            <td className="py-3 text-sm text-zinc-300 capitalize">{row.status}</td>
                                            <td className="py-3 text-sm text-zinc-400">
                                                {row.published_at ? new Date(row.published_at).toLocaleString() : "-"}
                                            </td>
                                            <td className="py-3 text-sm">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => startEdit(row)}
                                                        className="rounded-md px-2 py-1 bg-zinc-800 text-zinc-200 text-xs"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => togglePublish(row)}
                                                        disabled={saving}
                                                        className="rounded-md px-2 py-1 bg-(--solar-gold)/20 text-(--solar-gold) text-xs disabled:opacity-40"
                                                    >
                                                        {row.status === "published" ? "Unpublish" : "Publish"}
                                                    </button>
                                                    <button
                                                        onClick={() => remove(row.id)}
                                                        disabled={saving}
                                                        className="rounded-md px-2 py-1 bg-red-500/20 text-red-300 text-xs disabled:opacity-40"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
