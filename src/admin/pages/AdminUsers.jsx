import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import {
    adminJson,
    adminRequest,
    clearAdminAuthenticated,
    normalizePaginatedRows,
} from "../adminApi";

export default function AdminUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [actionId, setActionId] = useState(null);

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_USERS);

            if (response.status === 401) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }
            if (!response.ok) {
                throw new Error(data?.message || "Failed to load users.");
            }
            setUsers(normalizePaginatedRows(data));
        } catch (err) {
            setError(err.message || "Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    const setUserStatus = async (id, isActive) => {
        setActionId(id);
        setError("");
        try {
            const response = await adminRequest(API_ENDPOINTS.ADMIN_USER_STATUS(id), {
                method: "POST",
                body: { is_active: isActive },
            });
            const data = await response.json().catch(() => ({}));
            if (!response.ok) {
                throw new Error(data?.message || "Failed to update user status.");
            }
            await load();
        } catch (err) {
            setError(err.message || "Failed to update user status.");
        } finally {
            setActionId(null);
        }
    };

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <h1 className="text-3xl font-bold text-white mb-4">Users & KYC</h1>

            {error && (
                <div className="mb-4 rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                    {error}
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="border-b border-zinc-800">
                            <th className="text-left py-3 text-sm text-zinc-400">ID</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Name</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Email</th>
                            <th className="text-left py-3 text-sm text-zinc-400">KYC</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Status</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Deposits</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Withdrawals</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Investments</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading &&
                            users.map((user) => (
                                <tr key={user.id} className="border-b border-zinc-900">
                                    <td className="py-3 text-sm text-zinc-200">{user.id}</td>
                                    <td className="py-3 text-sm text-zinc-200">{user.name}</td>
                                    <td className="py-3 text-sm text-zinc-200">{user.email}</td>
                                    <td className="py-3 text-sm text-zinc-200 capitalize">
                                        {user.current_kyc?.status || "not_started"}
                                    </td>
                                    <td className="py-3 text-sm text-zinc-200">
                                        {user.is_active ? "Active" : "Disabled"}
                                    </td>
                                    <td className="py-3 text-sm text-zinc-200">{user.deposits_count || 0}</td>
                                    <td className="py-3 text-sm text-zinc-200">{user.withdrawals_count || 0}</td>
                                    <td className="py-3 text-sm text-zinc-200">{user.investments_count || 0}</td>
                                    <td className="py-3 text-sm">
                                        {user.is_active ? (
                                            <button
                                                onClick={() => setUserStatus(user.id, false)}
                                                disabled={actionId === user.id}
                                                className="rounded-lg px-3 py-1.5 bg-red-500/20 text-red-300 disabled:opacity-40"
                                            >
                                                Disable
                                            </button>
                                        ) : (
                                            <button
                                                onClick={() => setUserStatus(user.id, true)}
                                                disabled={actionId === user.id}
                                                className="rounded-lg px-3 py-1.5 bg-emerald-500/20 text-emerald-300 disabled:opacity-40"
                                            >
                                                Enable
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {!loading && users.length === 0 && (
                <p className="text-zinc-500 text-sm mt-4">No users found.</p>
            )}
        </div>
    );
}
