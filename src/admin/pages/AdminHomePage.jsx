import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import { adminJson, adminRequest, clearAdminAuthenticated } from "../adminApi";
import { DEFAULT_HOME_PAGE_CONTENT } from "../../content/defaultHomePageContent";

export default function AdminHomePage() {
    const navigate = useNavigate();
    const [value, setValue] = useState(JSON.stringify(DEFAULT_HOME_PAGE_CONTENT, null, 2));
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        void load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const load = async () => {
        setLoading(true);
        setError("");
        setSuccess("");

        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_HOMEPAGE_CONTENT);
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load homepage content.");
            }

            setValue(JSON.stringify(data?.content || DEFAULT_HOME_PAGE_CONTENT, null, 2));
        } catch (err) {
            setError(err.message || "Failed to load homepage content.");
        } finally {
            setLoading(false);
        }
    };

    const submit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        setSuccess("");

        try {
            const payload = JSON.parse(value);
            const response = await adminRequest(API_ENDPOINTS.ADMIN_HOMEPAGE_CONTENT, {
                method: "PUT",
                body: payload,
            });
            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to save homepage content.");
            }

            setValue(JSON.stringify(data?.content || payload, null, 2));
            setSuccess(data?.message || "Homepage content updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to save homepage content.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Homepage Content</h1>
                <p className="mt-2 text-sm text-zinc-400">
                    Edit homepage sections as JSON. This controls hero stats, performance rows, section copy, and homepage CTAs.
                </p>
            </div>

            {error && (
                <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            {success && (
                <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 p-3 text-sm text-emerald-200">
                    {success}
                </div>
            )}

            <form onSubmit={submit} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <h2 className="text-xl font-bold text-white">Content Payload</h2>
                    <button
                        type="button"
                        onClick={() => setValue(JSON.stringify(DEFAULT_HOME_PAGE_CONTENT, null, 2))}
                        className="rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-300"
                    >
                        Reset To Default Template
                    </button>
                </div>

                <textarea
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    className="min-h-[720px] w-full rounded-xl border border-zinc-800 bg-black px-4 py-3 font-mono text-sm text-zinc-100 outline-none focus:border-[var(--solar-gold)]"
                    spellCheck={false}
                />

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={saving || loading}
                        className="rounded-lg bg-[var(--solar-gold)] px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-40"
                    >
                        {saving ? "Saving..." : "Save Homepage Content"}
                    </button>
                    <button
                        type="button"
                        onClick={() => void load()}
                        disabled={saving}
                        className="rounded-lg border border-zinc-700 px-4 py-2.5 text-sm text-zinc-300 disabled:opacity-40"
                    >
                        Reload From Server
                    </button>
                </div>
            </form>
        </div>
    );
}
