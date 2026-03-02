import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../../config/api";
import {
    adminJson,
    clearAdminAuthenticated,
    normalizePaginatedRows,
} from "../adminApi";

export default function AdminUsers() {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const load = async () => {
        setLoading(true);
        setError("");

        try {
            const [depositsRes, withdrawalsRes] = await Promise.all([
                adminJson(API_ENDPOINTS.ADMIN_DEPOSITS),
                adminJson(API_ENDPOINTS.ADMIN_WITHDRAWALS),
            ]);

            if (
                depositsRes.response.status === 401 ||
                withdrawalsRes.response.status === 401
            ) {
                clearAdminAuthenticated();
                navigate("/admin/login");
                return;
            }

            const deposits = normalizePaginatedRows(depositsRes.data);
            const withdrawals = normalizePaginatedRows(withdrawalsRes.data);
            const userMap = new Map();

            for (const row of deposits) {
                const key = String(row.user_id || row.user?.id || "");
                if (!key) continue;
                const existing = userMap.get(key) || {
                    id: row.user_id || row.user?.id,
                    name: row.user?.name || "-",
                    email: row.user?.email || "-",
                    deposits: 0,
                    withdrawals: 0,
                };
                existing.deposits += 1;
                userMap.set(key, existing);
            }

            for (const row of withdrawals) {
                const key = String(row.user_id || row.user?.id || "");
                if (!key) continue;
                const existing = userMap.get(key) || {
                    id: row.user_id || row.user?.id,
                    name: row.user?.name || "-",
                    email: row.user?.email || "-",
                    deposits: 0,
                    withdrawals: 0,
                };
                existing.withdrawals += 1;
                userMap.set(key, existing);
            }

            setUsers(Array.from(userMap.values()));
        } catch (err) {
            setError(err.message || "Failed to load users.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
            <h1 className="text-3xl font-bold text-white mb-4">Users</h1>

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
                            <th className="text-left py-3 text-sm text-zinc-400">Deposits</th>
                            <th className="text-left py-3 text-sm text-zinc-400">Withdrawals</th>
                        </tr>
                    </thead>
                    <tbody>
                        {!loading &&
                            users.map((user) => (
                                <tr key={user.id} className="border-b border-zinc-900">
                                    <td className="py-3 text-sm text-zinc-200">{user.id}</td>
                                    <td className="py-3 text-sm text-zinc-200">{user.name}</td>
                                    <td className="py-3 text-sm text-zinc-200">{user.email}</td>
                                    <td className="py-3 text-sm text-zinc-200">{user.deposits}</td>
                                    <td className="py-3 text-sm text-zinc-200">{user.withdrawals}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

            {!loading && users.length === 0 && (
                <p className="text-zinc-500 text-sm mt-4">No users found from admin activity yet.</p>
            )}
        </div>
    );
}
