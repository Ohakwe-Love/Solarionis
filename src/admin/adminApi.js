import { API_ENDPOINTS } from "../config/api";
import { isAdminSessionActive } from "../utils/authGuards";

export const ADMIN_AUTH_KEY = "admin_auth";
export const ADMIN_EMAIL_KEY = "admin_email";
export const ADMIN_TOKEN_KEY = "admin_token";

export function isAdminAuthenticated() {
    return isAdminSessionActive();
}

export function setAdminAuthenticated(email, token) {
    localStorage.setItem(ADMIN_AUTH_KEY, "1");
    if (email) {
        localStorage.setItem(ADMIN_EMAIL_KEY, email);
    }
    if (token) {
        localStorage.setItem(ADMIN_TOKEN_KEY, token);
    }
}

export function clearAdminAuthenticated() {
    localStorage.removeItem(ADMIN_AUTH_KEY);
    localStorage.removeItem(ADMIN_EMAIL_KEY);
    localStorage.removeItem(ADMIN_TOKEN_KEY);
}

export function getAdminToken() {
    return localStorage.getItem(ADMIN_TOKEN_KEY) || "";
}

export async function adminRequest(url, options = {}) {
    const { body, headers, ...rest } = options;
    const token = getAdminToken();
    const config = {
        credentials: "include",
        headers: {
            Accept: "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(headers || {}),
        },
        ...rest,
    };

    if (body !== undefined) {
        config.body = typeof body === "string" ? body : JSON.stringify(body);
        if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
        }
    }

    return fetch(url, config);
}

export async function adminJson(url, options = {}) {
    const response = await adminRequest(url, options);
    const data = await response.json().catch(() => ({}));
    return { response, data };
}

export function normalizePaginatedRows(payload) {
    if (Array.isArray(payload?.data)) {
        return payload.data;
    }
    if (Array.isArray(payload)) {
        return payload;
    }
    return [];
}

export function getPagination(payload) {
    if (!payload || typeof payload !== "object") {
        return {
            currentPage: 1,
            lastPage: 1,
            perPage: 0,
            total: 0,
        };
    }

    return {
        currentPage: Number(payload.current_page || 1),
        lastPage: Number(payload.last_page || 1),
        perPage: Number(payload.per_page || 0),
        total: Number(payload.total || 0),
    };
}

export function getAdminEmail() {
    return localStorage.getItem(ADMIN_EMAIL_KEY) || "";
}

export async function adminLogout() {
    try {
        await adminRequest(API_ENDPOINTS.ADMIN_LOGOUT, { method: "POST" });
    } catch {
        // no-op
    } finally {
        clearAdminAuthenticated();
    }
}
