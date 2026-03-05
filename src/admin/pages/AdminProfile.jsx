import React, { useEffect, useState } from "react";
import { UserCircle2, ShieldCheck, Activity } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";
import { adminJson, getAdminEmail } from "../adminApi";

export default function AdminProfile() {
    const [email] = useState(() => getAdminEmail());
    const [status, setStatus] = useState("Checking session...");

    useEffect(() => {
        const checkSession = async () => {
            try {
                const { response } = await adminJson(API_ENDPOINTS.ADMIN_DEPOSITS);
                if (response.status === 200) {
                    setStatus("Active admin session");
                } else if (response.status === 401) {
                    setStatus("Session expired");
                } else {
                    setStatus(`Session check returned ${response.status}`);
                }
            } catch {
                setStatus("Session check unavailable");
            }
        };

        checkSession();
    }, []);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="w-14 h-14 rounded-full bg-[var(--solar-gold)]/15 text-[var(--solar-gold)] flex items-center justify-center mb-4">
                    <UserCircle2 className="w-8 h-8" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Profile</h1>
                <div className="space-y-3 text-sm">
                    <div>
                        <p className="text-zinc-400">Role</p>
                        <p className="text-zinc-100 font-semibold">Administrator</p>
                    </div>
                    <div>
                        <p className="text-zinc-400">Email</p>
                        <p className="text-zinc-100 font-semibold">{email || "-"}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-6">
                <div className="flex items-center gap-2 mb-4">
                    <ShieldCheck className="w-5 h-5 text-[var(--solar-gold)]" />
                    <h2 className="text-2xl font-bold text-white">Security</h2>
                </div>
                <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                    <p className="text-sm text-zinc-400 mb-2">Current Session</p>
                    <p className="text-zinc-100 font-semibold flex items-center gap-2">
                        <Activity className="w-4 h-4 text-[var(--solar-gold)]" />
                        {status}
                    </p>
                </div>
            </div>
        </div>
    );
}
