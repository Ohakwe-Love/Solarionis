import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import { DEFAULT_SITE_SETTINGS, normalizeSiteSettings } from "../../content/defaultSiteSettings";
import { adminJson, adminRequest, clearAdminAuthenticated } from "../adminApi";

export default function AdminSiteSettings() {
    const navigate = useNavigate();
    const [form, setForm] = useState(DEFAULT_SITE_SETTINGS);
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
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_SITE_SETTINGS);
            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load site settings.");
            }

            setForm(normalizeSiteSettings(data?.settings));
        } catch (err) {
            setError(err.message || "Failed to load site settings.");
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
            const response = await adminRequest(API_ENDPOINTS.ADMIN_SITE_SETTINGS, {
                method: "PUT",
                body: {
                    support_email: form.support_email.trim(),
                    support_phone: form.support_phone.trim() || null,
                    support_address: form.support_address.trim() || null,
                    working_hours_weekdays: form.working_hours_weekdays.trim() || null,
                    working_hours_weekends: form.working_hours_weekends.trim() || null,
                },
            });
            const data = await response.json().catch(() => ({}));

            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to save site settings.");
            }

            setForm(normalizeSiteSettings(data?.settings));
            setSuccess(data?.message || "Site settings updated successfully.");
        } catch (err) {
            setError(err.message || "Failed to save site settings.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-white">Site Settings</h1>
                <p className="mt-2 text-sm text-zinc-400">
                    Manage the support contact details used across public pages.
                </p>
            </div>

            {error && <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">{error}</div>}
            {success && <div className="rounded-xl border border-emerald-800 bg-emerald-950/30 p-3 text-sm text-emerald-200">{success}</div>}

            <form onSubmit={submit} className="max-w-3xl rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Support Email</label>
                    <input
                        value={form.support_email}
                        onChange={(event) => setForm((prev) => ({ ...prev, support_email: event.target.value }))}
                        className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-zinc-100"
                        placeholder="support@example.com"
                        required
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Support Phone</label>
                    <input
                        value={form.support_phone}
                        onChange={(event) => setForm((prev) => ({ ...prev, support_phone: event.target.value }))}
                        className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-zinc-100"
                        placeholder="Leave blank if not published yet"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-zinc-300">Support Address</label>
                    <input
                        value={form.support_address}
                        onChange={(event) => setForm((prev) => ({ ...prev, support_address: event.target.value }))}
                        className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-zinc-100"
                        placeholder="Office or mailing address"
                    />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-300">Weekday Hours</label>
                        <input
                            value={form.working_hours_weekdays}
                            onChange={(event) => setForm((prev) => ({ ...prev, working_hours_weekdays: event.target.value }))}
                            className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-zinc-100"
                            placeholder="Mon - Fri: 9AM - 6PM"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-zinc-300">Weekend Hours</label>
                        <input
                            value={form.working_hours_weekends}
                            onChange={(event) => setForm((prev) => ({ ...prev, working_hours_weekends: event.target.value }))}
                            className="w-full rounded-lg border border-zinc-700 bg-black px-3 py-2 text-zinc-100"
                            placeholder="Sat - Sun: 10AM - 4PM"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        type="submit"
                        disabled={saving || loading}
                        className="rounded-lg bg-[var(--solar-gold)] px-4 py-2.5 text-sm font-semibold text-black disabled:opacity-40"
                    >
                        {saving ? "Saving..." : "Save Site Settings"}
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
