const DEFAULT_API_BASE_URL = "http://localhost:8000";
const rawBaseUrl = import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL;
const API_BASE_URL = rawBaseUrl.replace(/\/+$/, "");

const api = (path) => `${API_BASE_URL}${path}`;

export const API_CONFIG = {
    baseUrl: API_BASE_URL,
    timeoutMs: Number(import.meta.env.VITE_API_TIMEOUT_MS || 15000),
};

export const API_ENDPOINTS = {
    // Auth
    SEND_VERIFICATION: api("/api/auth/send-verification"),
    VERIFY_CODE: api("/api/auth/verify-code"),
    REGISTER: api("/api/auth/register"),
    LOGIN: api("/api/auth/login"),
    LOGOUT: api("/api/auth/logout"),
    USER: api("/api/auth/user"),
    ME: api("/api/me"),

    // KYC (Stripe Identity)
    KYC_STATUS: api("/api/kyc/status"),
    KYC_START: api("/api/kyc/start"),
    KYC_CHECK: api("/api/kyc/check"),

    // Projects
    PROJECTS: api("/api/projects"),
    PROJECT_DETAIL: (slug) => api(`/api/projects/${slug}`),
    ACTIVE_OFFERING: (projectId) => api(`/api/offerings/${projectId}/active`),

    // Investments
    INVESTMENT_PREVIEW: api("/api/investments/preview"),
    INVESTMENT_CONFIRM: api("/api/investments/confirm"),

    // Dashboard
    DASHBOARD_METRICS: api("/api/dashboard/metrics"),
    DASHBOARD_PORTFOLIO: api("/api/portfolio"),
    DASHBOARD_ACTIVITY: api("/api/activity"),
    DASHBOARD_DISTRIBUTIONS: api("/api/distributions"),
    DASHBOARD_DISTRIBUTIONS_SUMMARY: api("/api/distributions/summary"),

    // Wallet / Funding
    WALLET: api("/api/wallet"),
    DEPOSITS: api("/api/deposits"),
    WITHDRAWALS: api("/api/withdrawals"),

    // Admin
    ADMIN_LOGIN: api("/api/admin/login"),
    ADMIN_ME: api("/api/admin/me"),
    ADMIN_LOGOUT: api("/api/admin/logout"),
    ADMIN_DEPOSITS: api("/api/admin/deposits"),
    ADMIN_WITHDRAWALS: api("/api/admin/withdrawals"),
    ADMIN_LEDGER_TRANSACTIONS: api("/api/admin/ledger/transactions"),
};

export default API_BASE_URL;
