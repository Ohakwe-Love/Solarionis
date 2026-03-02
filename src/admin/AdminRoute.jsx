import React from "react";
import { Navigate } from "react-router-dom";
import { isAdminAuthenticated } from "./adminApi";

export default function AdminRoute({ children }) {
    if (!isAdminAuthenticated()) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
}
