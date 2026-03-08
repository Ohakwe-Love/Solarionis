import React, { useState } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
    Menu,
    LayoutDashboard,
    Users,
    Landmark,
    ArrowDownCircle,
    ArrowUpCircle,
    BriefcaseBusiness,
    FolderKanban,
    Newspaper,
    MessageSquareQuote,
    UserCircle2,
    LogOut,
    X,
    Globe,
} from "lucide-react";
import { adminLogout } from "./adminApi";

const navItems = [
    { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { to: "/admin/deposits", label: "Deposits", icon: ArrowDownCircle },
    { to: "/admin/withdrawals", label: "Withdrawals", icon: ArrowUpCircle },
    { to: "/admin/investments", label: "Investments", icon: BriefcaseBusiness },
    { to: "/admin/projects", label: "Projects", icon: FolderKanban },
    { to: "/admin/articles", label: "Articles", icon: Newspaper },
    { to: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
    { to: "/admin/users", label: "Users & KYC", icon: Users },
    { to: "/admin/ledger", label: "Ledger", icon: Landmark },
    { to: "/admin/profile", label: "Profile", icon: UserCircle2 },
];

export default function AdminLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const current = navItems.find((item) => location.pathname.startsWith(item.to));

    const signOut = async () => {
        await adminLogout();
        navigate("/admin/login");
    };

    return (
        <div className="min-h-screen bg-black text-zinc-100">
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/70 z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <aside
                className={`fixed top-0 left-0 z-50 h-full w-64 bg-zinc-950 border-r border-zinc-800 transform transition-transform duration-300 ${
                    sidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0`}
            >
                <div className="h-24 flex items-center justify-between px-5 border-b border-zinc-800">
                    <p className="text-xl font-bold text-white">Admin Panel</p>
                    <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
                        <X className="w-5 h-5 text-zinc-400" />
                    </button>
                </div>

                <nav className="p-4 space-y-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                                        isActive
                                            ? "bg-[var(--solar-gold)] text-black"
                                            : "text-zinc-300 hover:bg-zinc-900"
                                    }`
                                }
                                onClick={() => setSidebarOpen(false)}
                            >
                                <Icon className="w-5 h-5" />
                                {item.label}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-zinc-800">
                    <button
                        onClick={signOut}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-950/40"
                    >
                        <LogOut className="w-5 h-5" />
                        Sign Out
                    </button>
                </div>
            </aside>

            <div className="lg:ml-64">
                <header className="h-24 bg-[var(--solar-gold)] text-black border-b border-zinc-800 px-4 md:px-6 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                            <Menu className="w-6 h-6" />
                        </button>
                        <p className="text-2xl font-bold">{current?.label || "Admin Panel"}</p>
                    </div>

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-black/10 hover:bg-black/20"
                    >
                        <Globe className="w-4 h-4" />
                        View Site
                    </Link>
                </header>

                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
