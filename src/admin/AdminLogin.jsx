import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Loader, ArrowRight } from "lucide-react";
import { API_ENDPOINTS } from "../config/api";
import { adminJson, setAdminAuthenticated } from "./adminApi";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { name, value } = event.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { response, data } = await adminJson(API_ENDPOINTS.ADMIN_LOGIN, {
                method: "POST",
                body: {
                    email: form.email.trim(),
                    password: form.password,
                },
            });

            if (!response.ok && !response.redirected) {
                throw new Error(data?.message || "Invalid admin credentials.");
            }

            setAdminAuthenticated(form.email.trim(), data?.token);
            navigate("/admin/dashboard");
        } catch (err) {
            setError(err.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
                <div className="mb-8 text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-(--solar-gold)/15 flex items-center justify-center mb-4">
                        <ShieldCheck className="w-7 h-7 text-(--solar-gold)" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Admin Panel</h1>
                    <p className="text-sm text-zinc-400 mt-2">
                        Sign in to manage deposits, withdrawals, and operations.
                    </p>
                </div>

                {error && (
                    <div className="mb-4 rounded-xl border border-red-800 bg-red-950/40 p-3 text-sm text-red-200">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-zinc-300 mb-1">Email</label>
                        <input
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-white outline-none focus:border-(--solar-gold)"
                            placeholder="admin@solarionis.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm text-zinc-300 mb-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={onChange}
                            className="w-full rounded-xl border border-zinc-700 bg-black px-3 py-2 text-white outline-none focus:border-(--solar-gold)"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-(--solar-gold) text-black font-semibold py-3 hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader className="w-4 h-4 animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                Sign In
                                <ArrowRight className="w-4 h-4" />
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
