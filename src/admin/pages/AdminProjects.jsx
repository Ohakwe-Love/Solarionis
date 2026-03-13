import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import { adminJson, adminRequest, clearAdminAuthenticated, normalizePaginatedRows } from "../adminApi";

function majorFromMinor(minor) {
    return (Number(minor || 0) / 100).toLocaleString(undefined, { maximumFractionDigits: 2 });
}

const PROJECT_TYPES = ["solar", "wind", "hydro", "battery"];
const PROJECT_STATUSES = ["draft", "funding", "active", "completed", "paused"];
const OFFERING_STATUSES = ["open", "paused", "closed"];

export default function AdminProjects() {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [assets, setAssets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const [projectForm, setProjectForm] = useState({
        name: "",
        type: "solar",
        description: "",
        location: "",
        location_state: "",
        capacity: "",
        total_cost: "",
        expected_annual_return: "",
        funding_goal: "",
        duration_months: "120",
        status: "draft",
    });

    const [offeringForm, setOfferingForm] = useState({
        project_id: "",
        asset_id: "",
        share_price: "",
        min_investment: "",
        status: "open",
    });

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const load = async () => {
        setLoading(true);
        setError("");
        try {
            const [projectsRes, assetsRes] = await Promise.all([
                adminJson(API_ENDPOINTS.ADMIN_PROJECTS),
                adminJson(API_ENDPOINTS.ADMIN_ASSETS),
            ]);

            if (projectsRes.response.status === 401 || assetsRes.response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }

            if (!projectsRes.response.ok) {
                throw new Error(projectsRes.data?.message || "Failed to load projects.");
            }

            if (!assetsRes.response.ok) {
                throw new Error(assetsRes.data?.message || "Failed to load assets.");
            }

            const projectRows = normalizePaginatedRows(projectsRes.data);
            const assetRows = Array.isArray(assetsRes.data?.data) ? assetsRes.data.data : [];
            setProjects(projectRows);
            setAssets(assetRows);
            setOfferingForm((prev) => ({
                ...prev,
                project_id: prev.project_id || String(projectRows[0]?.id || ""),
                asset_id: prev.asset_id || String(assetRows[0]?.id || ""),
            }));
        } catch (err) {
            setError(err.message || "Failed to load projects.");
        } finally {
            setLoading(false);
        }
    };

    const createProject = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_PROJECTS, {
                method: "POST",
                body: {
                    ...projectForm,
                    capacity: Number(projectForm.capacity),
                    total_cost: Number(projectForm.total_cost),
                    expected_annual_return: Number(projectForm.expected_annual_return),
                    funding_goal: Number(projectForm.funding_goal),
                    duration_months: Number(projectForm.duration_months),
                },
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Failed to create project.");
            }
            setProjectForm({
                name: "",
                type: "solar",
                description: "",
                location: "",
                location_state: "",
                capacity: "",
                total_cost: "",
                expected_annual_return: "",
                funding_goal: "",
                duration_months: "120",
                status: "draft",
            });
            await load();
        } catch (err) {
            setError(err.message || "Failed to create project.");
        } finally {
            setSaving(false);
        }
    };

    const createOffering = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_PROJECT_OFFERINGS(offeringForm.project_id), {
                method: "POST",
                body: {
                    asset_id: Number(offeringForm.asset_id),
                    share_price: Number(offeringForm.share_price),
                    min_investment: Number(offeringForm.min_investment || 0),
                    status: offeringForm.status,
                },
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Failed to create offering.");
            }
            setOfferingForm((prev) => ({ ...prev, share_price: "", min_investment: "" }));
            await load();
        } catch (err) {
            setError(err.message || "Failed to create offering.");
        } finally {
            setSaving(false);
        }
    };

    const updateProjectStatus = async (projectId, status) => {
        setSaving(true);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_PROJECT_DETAIL(projectId), {
                method: "PUT",
                body: { status },
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Failed to update project.");
            }
            await load();
        } catch (err) {
            setError(err.message || "Failed to update project.");
        } finally {
            setSaving(false);
        }
    };

    const updateOfferingStatus = async (offeringId, status) => {
        setSaving(true);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_OFFERING_DETAIL(offeringId), {
                method: "PUT",
                body: { status },
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Failed to update offering.");
            }
            await load();
        } catch (err) {
            setError(err.message || "Failed to update offering.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-white">Projects & Offerings</h1>

            {error && (
                <div className="rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <form onSubmit={createProject} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
                    <h2 className="text-xl font-bold text-white">Create Project</h2>
                    <input value={projectForm.name} onChange={(e) => setProjectForm((p) => ({ ...p, name: e.target.value }))} placeholder="Project name" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                    <select value={projectForm.type} onChange={(e) => setProjectForm((p) => ({ ...p, type: e.target.value }))} className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2">
                        {PROJECT_TYPES.map((type) => <option key={type} value={type}>{type}</option>)}
                    </select>
                    <textarea value={projectForm.description} onChange={(e) => setProjectForm((p) => ({ ...p, description: e.target.value }))} placeholder="Description" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                    <div className="grid grid-cols-2 gap-2">
                        <input value={projectForm.location} onChange={(e) => setProjectForm((p) => ({ ...p, location: e.target.value }))} placeholder="Location" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                        <input value={projectForm.location_state} onChange={(e) => setProjectForm((p) => ({ ...p, location_state: e.target.value }))} placeholder="State" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="number" step="0.01" value={projectForm.capacity} onChange={(e) => setProjectForm((p) => ({ ...p, capacity: e.target.value }))} placeholder="Capacity" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                        <input type="number" step="0.01" value={projectForm.total_cost} onChange={(e) => setProjectForm((p) => ({ ...p, total_cost: e.target.value }))} placeholder="Total cost" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="number" step="0.01" value={projectForm.funding_goal} onChange={(e) => setProjectForm((p) => ({ ...p, funding_goal: e.target.value }))} placeholder="Funding goal (USD)" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                        <input type="number" step="0.01" value={projectForm.expected_annual_return} onChange={(e) => setProjectForm((p) => ({ ...p, expected_annual_return: e.target.value }))} placeholder="Expected annual return %" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="number" value={projectForm.duration_months} onChange={(e) => setProjectForm((p) => ({ ...p, duration_months: e.target.value }))} placeholder="Duration months" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                        <select value={projectForm.status} onChange={(e) => setProjectForm((p) => ({ ...p, status: e.target.value }))} className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2">
                            {PROJECT_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                        </select>
                    </div>
                    <button disabled={saving} className="rounded-lg px-4 py-2 bg-[var(--solar-gold)] text-black font-semibold disabled:opacity-50">
                        {saving ? "Saving..." : "Create Project"}
                    </button>
                </form>

                <form onSubmit={createOffering} className="rounded-xl border border-zinc-800 bg-zinc-950 p-6 space-y-3">
                    <h2 className="text-xl font-bold text-white">Create Offering</h2>
                    <select value={offeringForm.project_id} onChange={(e) => setOfferingForm((p) => ({ ...p, project_id: e.target.value }))} className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required>
                        {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
                    </select>
                    <select value={offeringForm.asset_id} onChange={(e) => setOfferingForm((p) => ({ ...p, asset_id: e.target.value }))} className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required>
                        {assets.map((asset) => <option key={asset.id} value={asset.id}>{asset.symbol} ({asset.code})</option>)}
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                        <input type="number" step="0.000001" value={offeringForm.share_price} onChange={(e) => setOfferingForm((p) => ({ ...p, share_price: e.target.value }))} placeholder="Share price" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" required />
                        <input type="number" step="0.000001" value={offeringForm.min_investment} onChange={(e) => setOfferingForm((p) => ({ ...p, min_investment: e.target.value }))} placeholder="Minimum investment" className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2" />
                    </div>
                    <select value={offeringForm.status} onChange={(e) => setOfferingForm((p) => ({ ...p, status: e.target.value }))} className="w-full rounded-lg bg-black border border-zinc-700 px-3 py-2">
                        {OFFERING_STATUSES.map((status) => <option key={status} value={status}>{status}</option>)}
                    </select>
                    <button disabled={saving} className="rounded-lg px-4 py-2 bg-zinc-200 text-black font-semibold disabled:opacity-50">
                        {saving ? "Saving..." : "Create Offering"}
                    </button>
                </form>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                <h2 className="text-2xl font-bold text-white mb-4">Project Registry</h2>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[960px]">
                        <thead>
                            <tr className="border-b border-zinc-800">
                                <th className="text-left py-3 text-sm text-zinc-400">Project</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Type</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Funding</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Active Offering</th>
                                <th className="text-left py-3 text-sm text-zinc-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!loading &&
                                projects.map((project) => (
                                    <tr key={project.id} className="border-b border-zinc-900">
                                        <td className="py-3 text-sm text-zinc-200">{project.name}</td>
                                        <td className="py-3 text-sm text-zinc-200 capitalize">{project.type}</td>
                                        <td className="py-3 text-sm text-zinc-200">
                                            ${majorFromMinor(project.current_funding_minor)} / ${majorFromMinor(project.funding_goal_minor)}
                                        </td>
                                        <td className="py-3 text-sm text-zinc-200 capitalize">{project.status}</td>
                                        <td className="py-3 text-sm text-zinc-300">
                                            {project.active_offering ? (
                                                <div>
                                                    <div>{project.active_offering.asset?.symbol || "-"} | {project.active_offering.status}</div>
                                                    <div className="text-zinc-500 text-xs">
                                                        Share: {project.active_offering.share_price?.toLocaleString?.() ?? "-"}
                                                    </div>
                                                </div>
                                            ) : (
                                                "-"
                                            )}
                                        </td>
                                        <td className="py-3 text-sm">
                                            <div className="flex flex-wrap gap-2">
                                                {PROJECT_STATUSES.map((status) => (
                                                    <button
                                                        key={`${project.id}-${status}`}
                                                        onClick={() => updateProjectStatus(project.id, status)}
                                                        disabled={saving || project.status === status}
                                                        className="rounded-md px-2 py-1 bg-zinc-800 text-zinc-200 text-xs disabled:opacity-40"
                                                    >
                                                        {status}
                                                    </button>
                                                ))}
                                                {project.active_offering &&
                                                    OFFERING_STATUSES.map((status) => (
                                                        <button
                                                            key={`${project.active_offering.id}-${status}`}
                                                            onClick={() => updateOfferingStatus(project.active_offering.id, status)}
                                                            disabled={saving || project.active_offering.status === status}
                                                            className="rounded-md px-2 py-1 bg-[var(--solar-gold)]/20 text-[var(--solar-gold)] text-xs disabled:opacity-40"
                                                        >
                                                            Offering: {status}
                                                        </button>
                                                    ))}
                                            </div>
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
