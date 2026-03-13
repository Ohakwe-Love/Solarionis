import { API_ENDPOINTS } from "../config/api";

export function isAdminSessionActive() {
    return localStorage.getItem("admin_auth") === "1" || !!localStorage.getItem("admin_token");
}

export async function validateUserSession() {
    const token = localStorage.getItem("auth_token");

    if (!token) {
        return false;
    }

    try {
        const response = await fetch(API_ENDPOINTS.USER, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        if (response.ok) {
            return true;
        }
    } catch (error) {
        console.error("Auth check failed:", error);
    }

    localStorage.removeItem("auth_token");
    return false;
}
