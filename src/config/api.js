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
    TESTIMONIALS_PUBLIC: api("/api/testimonials"),
    TESTIMONIALS_STATS: api("/api/testimonials/stats"),
    TESTIMONIALS_ME: api("/api/testimonials/me"),
    TESTIMONIALS_SUBMIT: api("/api/testimonials"),
    ARTICLES: api("/api/articles"),
    ARTICLE_DETAIL: (slug) => api(`/api/articles/${slug}`),
    CONTACT_SUBMIT: api("/api/contact"),
    HOMEPAGE_CONTENT: api("/api/homepage-content"),
    SITE_SETTINGS: api("/api/site-settings"),
    FAQS: api("/api/faqs"),

    // Admin
    ADMIN_LOGIN: api("/api/admin/login"),
    ADMIN_ME: api("/api/admin/me"),
    ADMIN_LOGOUT: api("/api/admin/logout"),
    ADMIN_DASHBOARD_SUMMARY: api("/api/admin/dashboard/summary"),
    ADMIN_HOMEPAGE_CONTENT: api("/api/admin/homepage-content"),
    ADMIN_SITE_SETTINGS: api("/api/admin/site-settings"),
    ADMIN_DEPOSITS: api("/api/admin/deposits"),
    ADMIN_DEPOSIT_DETAIL: (id) => api(`/api/admin/deposits/${id}`),
    ADMIN_DEPOSIT_RETRY_CREDIT: (id) => api(`/api/admin/deposits/${id}/retry-credit`),
    ADMIN_WITHDRAWALS: api("/api/admin/withdrawals"),
    ADMIN_WITHDRAWAL_DETAIL: (id) => api(`/api/admin/withdrawals/${id}`),
    ADMIN_WITHDRAWAL_PROCESSING: (id) => api(`/api/admin/withdrawals/${id}/processing`),
    ADMIN_WITHDRAWAL_SENT: (id) => api(`/api/admin/withdrawals/${id}/sent`),
    ADMIN_WITHDRAWAL_FAILED: (id) => api(`/api/admin/withdrawals/${id}/failed`),
    ADMIN_LEDGER_TRANSACTIONS: api("/api/admin/ledger/transactions"),
    ADMIN_LEDGER_TRANSACTION_DETAIL: (id) => api(`/api/admin/ledger/transactions/${id}`),
    ADMIN_WALLET_BALANCES: api("/api/admin/wallet-balances"),
    ADMIN_ASSETS: api("/api/admin/assets"),
    ADMIN_USERS: api("/api/admin/users"),
    ADMIN_USER_DETAIL: (id) => api(`/api/admin/users/${id}`),
    ADMIN_USER_STATUS: (id) => api(`/api/admin/users/${id}/status`),
    ADMIN_INVESTMENTS: api("/api/admin/investments"),
    ADMIN_INVESTMENT_DETAIL: (id) => api(`/api/admin/investments/${id}`),
    ADMIN_PROJECTS: api("/api/admin/projects"),
    ADMIN_PROJECT_DETAIL: (id) => api(`/api/admin/projects/${id}`),
    ADMIN_PROJECT_OFFERINGS: (projectId) => api(`/api/admin/projects/${projectId}/offerings`),
    ADMIN_OFFERING_DETAIL: (offeringId) => api(`/api/admin/offerings/${offeringId}`),
    ADMIN_ARTICLES: api("/api/admin/articles"),
    ADMIN_ARTICLE_DETAIL: (id) => api(`/api/admin/articles/${id}`),
    ADMIN_ARTICLE_PUBLISH: (id) => api(`/api/admin/articles/${id}/publish`),
    ADMIN_FAQS: api("/api/admin/faqs"),
    ADMIN_FAQ_DETAIL: (id) => api(`/api/admin/faqs/${id}`),
    ADMIN_CONTACT_MESSAGES: api("/api/admin/contact-messages"),
    ADMIN_CONTACT_MESSAGE_DETAIL: (id) => api(`/api/admin/contact-messages/${id}`),
    ADMIN_CONTACT_MESSAGE_REPLY: (id) => api(`/api/admin/contact-messages/${id}/reply`),
    ADMIN_TESTIMONIALS: api("/api/admin/testimonials"),
    ADMIN_TESTIMONIAL_DETAIL: (id) => api(`/api/admin/testimonials/${id}`),
    ADMIN_TESTIMONIAL_APPROVE: (id) => api(`/api/admin/testimonials/${id}/approve`),
    ADMIN_TESTIMONIAL_REJECT: (id) => api(`/api/admin/testimonials/${id}/reject`),
    ADMIN_TESTIMONIAL_FEATURE: (id) => api(`/api/admin/testimonials/${id}/feature`),
};

export default API_BASE_URL;
