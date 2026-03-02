import React, { useState, useEffect, useCallback } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Shield, CheckCircle, AlertCircle, Loader, ArrowRight } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

export default function KycVerification({ onVerified }) {
    const CS_KEY = 'kyc_client_secret';
    const SID_KEY = 'kyc_session_id';

    const saveKycSession = (sessionId, clientSecret) => {
        if (clientSecret) localStorage.setItem(CS_KEY, clientSecret);
        if (sessionId) localStorage.setItem(SID_KEY, sessionId);
    };

    const clearKycSession = () => {
        localStorage.removeItem(CS_KEY);
        localStorage.removeItem(SID_KEY);
    };

    const [kycStatus, setKycStatus] = useState(null);
    const [loading, setLoading] = useState(true);
    const [verifying, setVerifying] = useState(false);
    const [error, setError] = useState(null);

    const checkKycStatus = useCallback(async () => {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                setError('Please log in to continue');
                setLoading(false);
                return;
            }

            const response = await fetch(API_ENDPOINTS.KYC_STATUS, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                },
            });

            if (response.status === 401) {
                localStorage.removeItem('auth_token');
                setError('Session expired. Please log in again.');
                setLoading(false);
                return;
            }

            if (!response.ok) {
                throw new Error('Failed to check KYC status');
            }

            const data = await response.json();
            setKycStatus(data);

            // Clear session storage if verified or failed
            if (data?.status === 'verified' || data?.status === 'failed') {
                clearKycSession();
            }

            if (data?.is_verified && onVerified) {
                onVerified();
            }
        } catch (err) {
            console.error('Error checking KYC status:', err);
            setError('Failed to load verification status');
        } finally {
            setLoading(false);
        }
    }, [onVerified]);

    useEffect(() => {
        checkKycStatus();
    }, [checkKycStatus]);

    const startVerification = async () => {
        setVerifying(true);
        setError(null);

        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                throw new Error('Authentication required');
            }

            const response = await fetch(API_ENDPOINTS.KYC_START, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.error || data?.message || 'Failed to start verification');
            }

            const kyc = data?.kyc;

            if (!kyc) {
                throw new Error('Invalid response from server');
            }

            // Save session info
            if (kyc.session_id) {
                saveKycSession(kyc.session_id, kyc.client_secret);
            }

            // For development (http://localhost), prefer hosted flow
            // Embedded requires HTTPS due to Stripe's CSP
            const isLocalDev = window.location.protocol === 'http:' && 
                              window.location.hostname === 'localhost';

            // If hosted URL exists, redirect
            if (kyc.verification_url && (isLocalDev || !kyc.client_secret)) {
                window.location.href = kyc.verification_url;
                return;
            }

            // Embedded flow (only works with HTTPS)
            if (kyc.client_secret) {
                await openEmbeddedVerification(kyc.client_secret);
                return;
            }

            throw new Error('Backend did not return verification_url or client_secret');
        } catch (err) {
            console.error('Verification error:', err);
            setError(err.message || 'Failed to start verification. Please try again.');
            setVerifying(false);
        }
    };

    const openEmbeddedVerification = async (clientSecret) => {
        try {
            // Try multiple possible env var names
            const publishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
            
            if (!publishableKey) {
                console.error('Stripe key missing. Checked:', {
                    vite: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
                    allEnv: import.meta.env
                });
                throw new Error('Stripe configuration missing. Please contact support.');
            }

            const stripe = await loadStripe(publishableKey);

            const result = await stripe.verifyIdentity(clientSecret);

            if (result?.error) {
                setError(result.error.message);
                setVerifying(false);
                return;
            }

            // User completed/closed - refresh status
            await checkKycStatus();
            setVerifying(false);
        } catch (err) {
            console.error('Embedded verification error:', err);
            setError(err.message || 'Verification failed. Please try again.');
            setVerifying(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8">
                <Loader className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    // Already verified
    if (kycStatus?.is_verified) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-green-900">Identity Verified</h3>
                        <p className="text-sm text-green-700">
                            Your identity was verified on{' '}
                            {kycStatus.verified_at 
                                ? new Date(kycStatus.verified_at).toLocaleDateString()
                                : 'recently'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Pending verification
    if (kycStatus?.status === 'pending') {
        const savedSecret = localStorage.getItem(CS_KEY);

        return (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                        <Loader className="w-6 h-6 text-yellow-600 animate-spin" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-yellow-900">Verification in Progress</h3>
                        <p className="text-sm text-yellow-700">
                            Your identity verification is being processed.
                        </p>
                    </div>
                </div>

                <div className="space-y-3">
                    {savedSecret && (
                        <button
                            onClick={() => openEmbeddedVerification(savedSecret)}
                            disabled={verifying}
                            className="w-full px-4 py-2 bg-yellow-600 text-white font-semibold rounded-lg hover:bg-yellow-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {verifying ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Loading...
                                </>
                            ) : (
                                <>
                                    Continue Verification
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    )}

                    <button
                        onClick={checkKycStatus}
                        disabled={verifying}
                        className="w-full px-4 py-2 border-2 border-yellow-200 text-yellow-700 font-semibold rounded-lg hover:border-yellow-400 transition-colors disabled:opacity-50"
                    >
                        Check Status
                    </button>
                </div>
            </div>
        );
    }

    // Failed verification
    if (kycStatus?.status === 'failed') {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                        <AlertCircle className="w-6 h-6 text-red-600" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-red-900">Verification Failed</h3>
                        <p className="text-sm text-red-700">
                            {kycStatus.failure_reason || 'Unable to verify your identity. Please try again.'}
                        </p>
                    </div>
                </div>
                <button
                    onClick={startVerification}
                    disabled={verifying}
                    className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {verifying ? (
                        <span className="flex items-center justify-center gap-2">
                            <Loader className="w-5 h-5 animate-spin" />
                            Starting...
                        </span>
                    ) : (
                        'Try Again'
                    )}
                </button>
            </div>
        );
    }

    // Not started
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
            <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6" />
                </div>
                <div>
                    <h3 className="text-lg font-bold mb-2">Verify Your Identity</h3>
                    <p className="text-blue-100 text-sm mb-4">
                        To comply with regulations and protect our community, we need to verify your identity before you can invest.
                    </p>
                    <ul className="space-y-2 text-sm text-blue-100 mb-6">
                        <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Takes less than 2 minutes
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Secure and encrypted
                        </li>
                        <li className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Government-issued ID required
                        </li>
                    </ul>
                </div>
            </div>

            {error && (
                <div className="bg-red-500/20 border border-red-300 rounded-lg p-3 mb-4">
                    <p className="text-sm text-white">{error}</p>
                </div>
            )}

            <button
                onClick={startVerification}
                disabled={verifying}
                className="w-full bg-white text-blue-600 font-semibold py-3 rounded-xl hover:bg-blue-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {verifying ? (
                    <span className="flex items-center justify-center gap-2">
                        <Loader className="w-5 h-5 animate-spin" />
                        Starting Verification...
                    </span>
                ) : (
                    'Start Verification'
                )}
            </button>

            <p className="text-xs text-blue-100 text-center mt-4">
                Powered by Stripe Identity - Your data is secure and never shared without your consent
            </p>
        </div>
    );
}
