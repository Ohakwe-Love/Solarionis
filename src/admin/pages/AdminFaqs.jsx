import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import { FAQ_CATEGORIES } from "../../content/defaultFaqs";
import { adminJson, adminRequest, clearAdminAuthenticated, normalizePaginatedRows } from "../adminApi";

const EMPTY_FORM = {
    category: "getting-started",
    question: "",
    answer: "",
    sort_order: 0,
    is_active: true,
};

export default function AdminFaqs() {
    const navigate = useNavigate();
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [filter, setFilter] = useState("all");
    const [form, setForm] = useState(EMPTY_FORM);

    useEffect(() => {
        void load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredRows = useMemo(() => {
        if (filter === "all") return rows;
        if (filter === "active") return rows.filter((row) => row.is_active);
        if (filter === "inactive") return rows.filter((row) => !row.is_active);
        return rows.filter((row) => row.category === filter);
    }, [filter, rows]);

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_FAQS);
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load FAQs.");
            }

            setRows(normalizePaginatedRows(data));
        } catch (err) {
            setError(err.message || "Failed to load FAQs.");
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
            category: row.category || "getting-started",
            question: row.question || "",
            answer: row.answer || "",
            sort_order: Number(row.sort_order || 0),
            is_active: !!row.is_active,
        });
    };

    const submit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");

        try {
            const payload = {
                category: form.category,
                question: form.question.trim(),
                answer: form.answer.trim(),
                sort_order: Number(form.sort_order || 0),
                is_active: !!form.is_active,
            };

            const response = await adminRequest(
                editingId ? API_ENDPOINTS.ADMIN_FAQ_DETAIL(editingId) : API_ENDPOINTS.ADMIN_FAQS,
                {
                    method: editingId ? "PUT" : "POST",
                    body: payload,
                }
            );
            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to save FAQ.");
            }

            resetForm();
            await load();
        } catch (err) {
            setError(err.message || "Failed to save FAQ.");
        } finally {
            setSaving(false);
        }
    };

    const remove = async (id) => {
        setSaving(true);
        setError("");

        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_FAQ_DETAIL(id), { method: "DELETE" });
            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to delete FAQ.");
            }

            if (editingId === id) {
                resetForm();
            }
            await load();
        } catch (err) {
            setError(err.message || "Failed to delete FAQ.");
        } finally {
            setSaving(false);
        }
    };

    const moveRow = async (id, direction) => {
        const orderedRows = [...rows].sort((a, b) => Number(a.sort_order || 0) - Number(b.sort_order || 0));
        const currentIndex = orderedRows.findIndex((row) => row.id === id);

        if (currentIndex === -1) {
            return;
        }

        const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
        if (targetIndex < 0 || targetIndex >= orderedRows.length) {
            return;
        }

        const currentRow = orderedRows[currentIndex];
        const targetRow = orderedRows[targetIndex];

        setSaving(true);
        setError("");

        try {
            const currentResponse = await adminRequest(API_ENDPOINTS.ADMIN_FAQ_DETAIL(currentRow.id), {
                method: "PUT",
                body: { sort_order: Number(targetRow.sort_order || 0) },
            });
            const currentData = await currentResponse.json().catch(() => ({}));

            if (currentResponse.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!currentResponse.ok) {
                throw new Error(currentData?.message || "Failed to reorder FAQ.");
            }

            const targetResponse = await adminRequest(API_ENDPOINTS.ADMIN_FAQ_DETAIL(targetRow.id), {
                method: "PUT",
                body: { sort_order: Number(currentRow.sort_order || 0) },
            });
            const targetData = await targetResponse.json().catch(() => ({}));

            if (!targetResponse.ok) {
                throw new Error(targetData?.message || "Failed to reorder FAQ.");
            }

            await load();
        } catch (err) {
            setError(err.message || "Failed to reorder FAQ.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">FAQs</h1>

            {error && <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">{error}</div>}

            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
                <form onSubmit={submit} className="xl:col-span-2 rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
                    <h2 className="text-xl font-bold text-white">{editingId ? "Edit FAQ" : "Create FAQ"}</h2>

                    <select
                        value={form.category}
                        onChange={(event) => setForm((prev) => ({ ...prev, category: event.target.value }))}
                        className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                    >
                        {FAQ_CATEGORIES.filter((item) => item.id !== "all").map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <input
                        value={form.question}
                        onChange={(event) => setForm((prev) => ({ ...prev, question: event.target.value }))}
                        placeholder="Question"
                        className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        required
                    />

                    <textarea
                        value={form.answer}
                        onChange={(event) => setForm((prev) => ({ ...prev, answer: event.target.value }))}
                        placeholder="Answer"
                        className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        rows={8}
                        required
                    />

                    <div className="grid grid-cols-2 gap-2">
                        <input
                            type="number"
                            min="0"
                            value={form.sort_order}
                            onChange={(event) => setForm((prev) => ({ ...prev, sort_order: event.target.value }))}
                            placeholder="Sort order"
                            className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        />

                        <select
                            value={form.is_active ? "active" : "inactive"}
                            onChange={(event) => setForm((prev) => ({ ...prev, is_active: event.target.value === "active" }))}
                            className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button
                            disabled={saving}
                            className="rounded-lg px-4 py-2 bg-(--solar-gold) text-black font-semibold disabled:opacity-50"
                        >
                            {saving ? "Saving..." : editingId ? "Update FAQ" : "Create FAQ"}
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
                    <div className="flex items-center justify-between mb-4 gap-3">
                        <h2 className="text-2xl font-bold text-white">Published FAQ Data</h2>
                        <div className="flex flex-wrap gap-2">
                            {["all", "active", "inactive", ...FAQ_CATEGORIES.filter((item) => item.id !== "all").map((item) => item.id)].map((value) => (
                                <button
                                    key={value}
                                    onClick={() => setFilter(value)}
                                    className={`rounded-lg px-3 py-1.5 text-sm capitalize ${filter === value
                                        ? "bg-(--solar-gold) text-black font-semibold"
                                        : "bg-zinc-900 text-zinc-300"
                                        }`}
                                >
                                    {value.replace("-", " ")}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[960px]">
                            <thead>
                                <tr className="border-b border-zinc-800">
                                    <th className="text-left py-3 text-sm text-zinc-400">Question</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Category</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Order</th>
                                    <th className="text-left py-3 text-sm text-zinc-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading &&
                                    filteredRows.map((row) => (
                                        <tr key={row.id} className="border-b border-zinc-900 align-top">
                                            <td className="py-3 text-sm text-zinc-200 max-w-[360px]">
                                                <div className="font-medium">{row.question}</div>
                                                <div className="mt-1 text-xs text-zinc-400 line-clamp-2">{row.answer}</div>
                                            </td>
                                            <td className="py-3 text-sm text-zinc-300 capitalize">{String(row.category || "").replace("-", " ")}</td>
                                            <td className="py-3 text-sm text-zinc-300">{row.is_active ? "Active" : "Inactive"}</td>
                                            <td className="py-3 text-sm text-zinc-400">{row.sort_order}</td>
                                            <td className="py-3 text-sm">
                                                <div className="flex flex-wrap gap-2">
                                                    <button
                                                        onClick={() => startEdit(row)}
                                                        className="rounded-md px-2 py-1 bg-zinc-800 text-zinc-200 text-xs"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => moveRow(row.id, "up")}
                                                        disabled={saving}
                                                        className="rounded-md px-2 py-1 bg-zinc-800 text-zinc-200 text-xs disabled:opacity-40"
                                                    >
                                                        Up
                                                    </button>
                                                    <button
                                                        onClick={() => moveRow(row.id, "down")}
                                                        disabled={saving}
                                                        className="rounded-md px-2 py-1 bg-zinc-800 text-zinc-200 text-xs disabled:opacity-40"
                                                    >
                                                        Down
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
