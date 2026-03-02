import React from "react";
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "./adminApi";

export default function AdminGuestRoute({ children }) {
    if (isAdminAuthenticated()) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
}
