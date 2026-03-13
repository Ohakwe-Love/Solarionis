import React, { useEffect, useMemo, useState } from "react";
import {
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    ChevronRight,
    Sun,
    Wallet,
    FileText,
    Activity as ActivityIcon,
    Zap,
    Wind,
    Battery,
    Droplet,
    AlertCircle,
} from "lucide-react";
import { API_ENDPOINTS } from "../config/api";
import { useNavigate } from "react-router-dom";

const PROJECT_META = {
    solar: { Icon: Sun, bg: "bg-yellow-100", text: "text-yellow-600" },
    wind: { Icon: Wind, bg: "bg-blue-100", text: "text-blue-600" },
    battery: { Icon: Battery, bg: "bg-green-100", text: "text-green-600" },
    hydro: { Icon: Droplet, bg: "bg-purple-100", text: "text-purple-600" },
    default: { Icon: Zap, bg: "bg-gray-100", text: "text-gray-600" },
};

function formatMoney(value) {
    const n = Number(value || 0);
    return n.toLocaleString(undefined, { maximumFractionDigits: 2 });
}

function safeJson(res) {
    return res.json().catch(() => ({}));
}

export default function UserOverview() {
    const navigate = useNavigate();

    const handleKycVerify = () => {
        navigate("/dashboard/kyc");
    };
    const goToInvest = () => navigate("/dashboard/invest");
    const goToWallet = () => navigate("/dashboard/wallet");
    const goToDocuments = () => navigate("/dashboard/documents");
    const goToPortfolio = () => navigate("/dashboard/portfolio");

    const [metrics, setMetrics] = useState(null);
    const [portfolio, setPortfolio] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [kycStatus, setKycStatus] = useState(null);

    const [incomeMode, setIncomeMode] = useState("projected");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = useMemo(() => localStorage.getItem("auth_token"), []);
    const headers = useMemo(
        () => ({
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
        }),
        [token]
    );

    useEffect(() => {
        fetchAllData(incomeMode);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [incomeMode]);

    const fetchAllData = async (mode) => {
        setLoading(true);
        setError(null);

        try {
            const metricsUrl = `${API_ENDPOINTS.DASHBOARD_METRICS}?income_mode=${encodeURIComponent(mode)}`;

            const [metricsRes, portfolioRes, activityRes, kycRes] = await Promise.all([
                fetch(metricsUrl, { headers }),
                fetch(API_ENDPOINTS.DASHBOARD_PORTFOLIO, { headers }),
                fetch(`${API_ENDPOINTS.DASHBOARD_ACTIVITY}?limit=5`, { headers }),
                fetch(API_ENDPOINTS.KYC_STATUS, { headers }),
            ]);

            // Handle 401 globally
            if ([metricsRes, portfolioRes, activityRes, kycRes].some((r) => r.status === 401)) {
                localStorage.removeItem("auth_token");
                navigate('/login');
                throw new Error("Session expired. Please log in again.");
            }

            const [metricsData, portfolioData, activityData, kycData] = await Promise.all([
                safeJson(metricsRes),
                safeJson(portfolioRes),
                safeJson(activityRes),
                safeJson(kycRes),
            ]);

            // Metrics is required for the page
            if (!metricsRes.ok) {
                throw new Error(metricsData?.message || "Failed to load dashboard metrics.");
            }

            setMetrics(metricsData);
            setPortfolio(portfolioRes.ok ? portfolioData.investments || [] : []);
            setRecentActivity(activityRes.ok ? activityData.transactions || [] : []);
            setKycStatus(kycRes.ok ? kycData : null);

        } catch (e) {
            console.error("Dashboard fetch error:", e);
            setError(e.message || "Failed to load dashboard data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const income = useMemo(() => {
        if (metrics?.income) return metrics.income;

        return {
            mode: incomeMode,
            monthly: metrics?.monthly_income ?? 0,
            projected_monthly: metrics?.monthly_income ?? 0,
            paid_monthly: 0,
        };
    }, [metrics, incomeMode]);

    const monthlyIncomeDisplay = income?.monthly ?? 0;

    // Determine if KYC banner should show
    const kycNeedsAction = useMemo(() => {
        if (!kycStatus) return true; // Show if we don't know status yet
        return kycStatus.status !== 'verified';
    }, [kycStatus]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Sun className="w-12 h-12 text-yellow-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600 mb-4">{error}</p>
                <button
                    onClick={() => fetchAllData(incomeMode)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors cursor-pointer"
                >
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div>
            {/* KYC Banner */}
            {kycNeedsAction && (
                <div className="bg-(--deep-black) rounded-2xl p-6 mb-6 text-white">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold mb-1">Verify Your Identity</h3>
                                <p className="text-blue-100 text-sm">
                                    Complete KYC verification to start investing in renewable energy projects.
                                </p>
                                {kycStatus?.status && kycStatus.status !== 'not_started' && (
                                    <p className="text-blue-100/80 text-xs mt-2">
                                        Status:{" "}
                                        <span className="font-semibold capitalize">
                                            {kycStatus.status}
                                        </span>
                                        {kycStatus.status === 'pending' && ' - Continue where you left off'}
                                        {kycStatus.status === 'failed' && ' - Please try again'}
                                    </p>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={handleKycVerify}
                            className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-colors cursor-pointer whitespace-nowrap"
                        >
                            {kycStatus?.status === 'pending' ? 'Continue KYC' : 
                             kycStatus?.status === 'failed' ? 'Retry KYC' : 
                             'Start KYC'}
                        </button>
                    </div>
                </div>
            )}

            {/* Income Mode Toggle */}
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h2 className="text-lg font-bold text-gray-900">Overview</h2>
                    <p className="text-sm text-gray-600">Projected vs paid income toggle</p>
                </div>

                <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl p-1">
                    <button
                        onClick={() => setIncomeMode("projected")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                            incomeMode === "projected"
                                ? "bg-yellow-400 text-black"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        Projected
                    </button>
                    <button
                        onClick={() => setIncomeMode("paid")}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                            incomeMode === "paid"
                                ? "bg-yellow-400 text-black"
                                : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                        Paid
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                {/* Total Invested */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                            <DollarSign className="w-6 h-6 text-blue-600" />
                        </div>
                        <span
                            className={`text-sm font-semibold flex items-center gap-1 ${
                                (metrics?.return_percentage ?? 0) >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {(metrics?.return_percentage ?? 0) >= 0 ? (
                                <ArrowUpRight className="w-4 h-4" />
                            ) : (
                                <ArrowDownRight className="w-4 h-4" />
                            )}
                            {Math.abs(metrics?.return_percentage || 0).toFixed(2)}%
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-1">Total Invested</p>
                    <p className="text-2xl font-bold text-gray-900">
                        ${formatMoney(metrics?.total_invested)}
                    </p>
                </div>

                {/* Current Value */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" />
                            Growth
                        </span>
                    </div>
                    <p className="text-gray-500 text-sm mb-1">Current Value</p>
                    <p className="text-2xl font-bold text-gray-900">
                        ${formatMoney(metrics?.current_value)}
                    </p>
                </div>

                {/* Total Returns */}
                <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-white text-sm font-semibold flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" />
                            Profit
                        </span>
                    </div>
                    <p className="text-yellow-100 text-sm mb-1">Total Returns</p>
                    <p className="text-2xl font-bold text-white">
                        ${formatMoney(metrics?.total_returns)}
                    </p>
                </div>

                {/* Active Projects + Income */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                            <ActivityIcon className="w-6 h-6 text-purple-600" />
                        </div>
                        <span className="text-gray-400 text-sm">Live</span>
                    </div>
                    <p className="text-gray-500 text-sm mb-1">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">
                        {metrics?.active_projects_count || 0}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                        ${formatMoney(monthlyIncomeDisplay)}/mo{" "}
                        <span className="font-semibold">{incomeMode}</span> income
                    </p>

                    {metrics?.income && (
                        <p className="text-xs text-gray-400 mt-1">
                            Projected: ${formatMoney(metrics.income.projected_monthly)} • Paid: $
                            {formatMoney(metrics.income.paid_monthly)}
                        </p>
                    )}
                </div>
            </div>

            {/* Portfolio Performance & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Portfolio Performance Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-gray-900">Portfolio Performance</h2>
                            <p className="text-sm text-gray-600">Track your investment growth</p>
                        </div>
                    </div>

                    <div className="h-64 flex items-end justify-between gap-2">
                        {metrics?.performance_series?.length ? (
                            metrics.performance_series.map((data, index) => {
                                const maxValue = Math.max(...metrics.performance_series.map((d) => d.value));
                                const height = maxValue > 0 ? (data.value / maxValue) * 100 : 0;

                                return (
                                    <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                        <div className="w-full relative group">
                                            <div
                                                className="w-full bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-lg transition-all hover:from-yellow-500 hover:to-yellow-400 cursor-pointer"
                                                style={{ height: `${height * 2}px` }}
                                            />
                                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                                ${formatMoney(data.value)}
                                            </div>
                                        </div>
                                        <span className="text-xs text-gray-400">{data.month}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <div className="text-center">
                                    <p className="text-gray-400 mb-2">No performance data yet</p>
                                    <p className="text-sm text-gray-500">Start investing to see your growth</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {metrics?.performance_series?.length ? (
                        <div className="mt-6 pt-6 border-t border-gray-100">
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">Average Return</p>
                                    <p className="text-lg font-bold text-gray-900">
                                        {(metrics.return_percentage || 0).toFixed(1)}%
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">Total Growth</p>
                                    <p className="text-lg font-bold text-gray-900">
                                        ${formatMoney(metrics.total_returns)}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-600 mb-1">Monthly Income</p>
                                    <p className="text-lg font-bold text-gray-900">
                                        ${formatMoney(monthlyIncomeDisplay)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="space-y-3">
                        <button
                            onClick={goToInvest}
                            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <TrendingUp className="w-5 h-5" />
                            New Investment
                        </button>
                        <button
                            onClick={goToWallet}
                            className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:border-yellow-400 hover:text-yellow-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <Wallet className="w-5 h-5" />
                            Add Funds
                        </button>
                        <button
                            onClick={goToDocuments}
                            className="w-full border-2 border-gray-200 text-gray-700 font-semibold py-3 rounded-xl hover:border-yellow-400 hover:text-yellow-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                            <FileText className="w-5 h-5" />
                            View Reports
                        </button>
                    </div>

                    <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                        <p className="text-sm font-semibold text-gray-900 mb-1">Referral Bonus</p>
                        <p className="text-xs text-gray-600 mb-3">
                            Invite friends and earn $100 for each successful referral
                        </p>
                        <button className="text-sm text-blue-600 font-semibold hover:underline cursor-pointer">
                            Get Referral Link →
                        </button>
                    </div>
                </div>
            </div>

            {/* Active Investments */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Active Investments</h2>
                    <button
                        onClick={goToPortfolio}
                        className="text-sm text-yellow-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {portfolio.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {portfolio.slice(0, 3).map((investment) => {
                            const meta = PROJECT_META[investment.type] || PROJECT_META.default;
                            const Icon = meta.Icon;

                            const returnsPct = investment.returns_percentage ?? investment.returns ?? 0;
                            const isPositive = Number(returnsPct) >= 0;

                            return (
                                <div
                                    key={investment.id}
                                    className="border border-gray-200 rounded-xl p-4 hover:border-yellow-400 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className={`w-12 h-12 rounded-full ${meta.bg} flex items-center justify-center`}>
                                            <Icon className={`w-6 h-6 ${meta.text}`} />
                                        </div>

                                        <span
                                            className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                                investment.status === "active"
                                                    ? "bg-green-100 text-green-700"
                                                    : investment.status === "completed"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : "bg-gray-100 text-gray-700"
                                            }`}
                                        >
                                            {investment.status}
                                        </span>
                                    </div>

                                    <h3 className="font-bold text-gray-900 mb-1 group-hover:text-yellow-600 transition-colors">
                                        {investment.name}
                                    </h3>

                                    <p className="text-xs text-gray-500 mb-3">
                                        {investment.location} • {investment.capacity} MW
                                    </p>

                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-gray-500">Invested</span>
                                        <span className="text-sm font-bold text-gray-900">
                                            ${formatMoney(investment.invested)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs text-gray-500">Current Value</span>
                                        <span className="text-sm font-bold text-green-600">
                                            ${formatMoney(investment.current_value)}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <span className="text-xs text-gray-500">Returns</span>
                                        <span
                                            className={`text-sm font-bold flex items-center gap-1 ${
                                                isPositive ? "text-green-600" : "text-red-600"
                                            }`}
                                        >
                                            {isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                            {isPositive ? "+" : ""}
                                            {Number(returnsPct).toFixed(2)}%
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <Sun className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">No active investments yet</p>
                        <button
                            onClick={goToInvest}
                            className="px-6 py-3 bg-yellow-400 text-black font-semibold rounded-xl hover:bg-yellow-500 transition-colors cursor-pointer"
                        >
                            Browse Projects
                        </button>
                    </div>
                )}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-gray-900">Recent Activity</h2>
                    <button
                        onClick={goToWallet}
                        className="text-sm text-yellow-600 font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        View All
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {recentActivity.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[720px]">
                            <thead>
                                <tr className="border-b border-gray-200">
                                    <th className="text-left text-xs font-semibold text-gray-500 pb-3">Type</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 pb-3">Project</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 pb-3">Amount</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 pb-3">Date</th>
                                    <th className="text-left text-xs font-semibold text-gray-500 pb-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentActivity.map((transaction) => (
                                    <tr key={transaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                                        <td className="py-4">
                                            <span
                                                className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                                                    transaction.type === "investment"
                                                        ? "bg-blue-100 text-blue-700"
                                                        : transaction.type === "dividend"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-purple-100 text-purple-700"
                                                }`}
                                            >
                                                {transaction.type === "investment" ? (
                                                    <ArrowUpRight className="w-3 h-3" />
                                                ) : (
                                                    <ArrowDownRight className="w-3 h-3" />
                                                )}
                                                {transaction.type}
                                            </span>
                                        </td>
                                        <td className="py-4 text-sm text-gray-900">{transaction.project_name}</td>
                                        <td className="py-4 text-sm font-semibold text-gray-900">
                                            ${formatMoney(transaction.amount)}
                                        </td>
                                        <td className="py-4 text-sm text-gray-500">
                                            {transaction.occurred_at ? new Date(transaction.occurred_at).toLocaleDateString() : "-"}
                                        </td>
                                        <td className="py-4">
                                            <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-1 rounded-full">
                                                {transaction.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-600">No transactions yet</p>
                    </div>
                )}
            </div>
        </div>
    );
}
