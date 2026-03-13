import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Sun } from 'lucide-react';
import { isAdminSessionActive, validateUserSession } from '../utils/authGuards';

export default function GuestRoute({ children }) {
    const [redirectPath, setRedirectPath] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        if (isAdminSessionActive()) {
            setRedirectPath('/admin/dashboard');
            setLoading(false);
            return;
        }

        const isAuthenticated = await validateUserSession();
        setRedirectPath(isAuthenticated ? '/dashboard' : null);
        setLoading(false);
    };

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

    // If user is authenticated, redirect to dashboard
    if (redirectPath) {
        return <Navigate to={redirectPath} replace />;
    }

    // If not authenticated, show the guest page (login/register)
    return children;
}
