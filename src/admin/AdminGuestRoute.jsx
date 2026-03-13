import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Sun } from "lucide-react";
import { isAdminAuthenticated } from "./adminApi";
import { validateUserSession } from "../utils/authGuards";

export default function AdminGuestRoute({ children }) {
    const [redirectPath, setRedirectPath] = useState(isAdminAuthenticated() ? "/admin/dashboard" : null);
    const [loading, setLoading] = useState(!isAdminAuthenticated());

    useEffect(() => {
        if (isAdminAuthenticated()) {
            return;
        }

        const checkUserAuth = async () => {
            const isUserAuthenticated = await validateUserSession();
            setRedirectPath(isUserAuthenticated ? "/dashboard" : null);
            setLoading(false);
        };

        checkUserAuth();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <Sun className="w-12 h-12 text-yellow-500 animate-spin mx-auto mb-4" />
                    <p className="text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (redirectPath) {
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}
