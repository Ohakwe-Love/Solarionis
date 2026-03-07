import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, ShieldCheck, Loader, Star } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

function safeJson(response) {
    return response.json().catch(() => ({}));
}

function kycStatusClass(status) {
    const value = String(status || '').toLowerCase();
    if (value === 'verified') return 'bg-green-100 text-green-700';
    if (value === 'failed') return 'bg-red-100 text-red-700';
    if (value === 'pending') return 'bg-yellow-100 text-yellow-700';
    return 'bg-gray-100 text-gray-700';
}

export default function UserSettings() {
    const [user, setUser] = useState(null);
    const [kyc, setKyc] = useState(null);
    const [testimonial, setTestimonial] = useState(null);
    const [testimonialForm, setTestimonialForm] = useState({
        rating: 5,
        message: '',
    });
    const [testimonialSaving, setTestimonialSaving] = useState(false);
    const [testimonialNotice, setTestimonialNotice] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const token = useMemo(() => localStorage.getItem('auth_token'), []);

    useEffect(() => {
        fetchProfile();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchProfile = async () => {
        setLoading(true);
        setError('');

        try {
            if (!token) {
                throw new Error('Please log in again.');
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            };

            const [userRes, kycRes, testimonialRes] = await Promise.all([
                fetch(API_ENDPOINTS.USER, { headers }),
                fetch(API_ENDPOINTS.KYC_STATUS, { headers }),
                fetch(API_ENDPOINTS.TESTIMONIALS_ME, { headers }),
            ]);

            if ([userRes, kycRes, testimonialRes].some((r) => r.status === 401)) {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
                return;
            }

            const [userData, kycData, testimonialData] = await Promise.all([
                safeJson(userRes),
                safeJson(kycRes),
                safeJson(testimonialRes),
            ]);

            if (!userRes.ok) {
                throw new Error(userData?.message || 'Failed to load user profile.');
            }

            setUser(userData?.user || null);
            setKyc(kycRes.ok ? kycData : null);
            const existing = testimonialRes.ok ? (testimonialData?.testimonial || null) : null;
            setTestimonial(existing);
            if (existing) {
                setTestimonialForm({
                    rating: Number(existing.rating || 5),
                    message: String(existing.message || ''),
                });
            }
        } catch (err) {
            setError(err.message || 'Failed to load settings.');
        } finally {
            setLoading(false);
        }
    };

    const submitTestimonial = async (event) => {
        event.preventDefault();
        setTestimonialNotice('');
        setError('');

        if (!token) {
            setError('Please log in again.');
            return;
        }

        const message = testimonialForm.message.trim();
        if (message.length < 20) {
            setError('Testimonial message must be at least 20 characters.');
            return;
        }

        setTestimonialSaving(true);
        try {
            const response = await fetch(API_ENDPOINTS.TESTIMONIALS_SUBMIT, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating: Number(testimonialForm.rating),
                    message,
                }),
            });

            const data = await safeJson(response);
            if (!response.ok) {
                throw new Error(data?.message || 'Failed to submit testimonial.');
            }

            setTestimonial(data?.testimonial || null);
            setTestimonialNotice(data?.message || 'Testimonial submitted and pending review.');
        } catch (err) {
            setError(err.message || 'Failed to submit testimonial.');
        } finally {
            setTestimonialSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader className="w-10 h-10 text-yellow-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900">Account Settings</h2>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Profile</h3>
                    <div className="space-y-3 text-sm">
                        <div>
                            <p className="text-gray-500">Full Name</p>
                            <p className="font-semibold text-gray-900">
                                {user?.first_name} {user?.last_name}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Email</p>
                            <p className="font-semibold text-gray-900">{user?.email || '-'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Phone</p>
                            <p className="font-semibold text-gray-900">{user?.phone || '-'}</p>
                        </div>
                        <div>
                            <p className="text-gray-500">Investment Type</p>
                            <p className="font-semibold text-gray-900 capitalize">
                                {String(user?.investment_type || '-').replace('-', ' ')}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500">Address</p>
                            <p className="font-semibold text-gray-900">
                                {user?.address ? `${user.address}, ${user.city || ''}, ${user.state || ''} ${user.zip_code || ''}` : '-'}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <ShieldCheck className="w-5 h-5 text-yellow-600" />
                        <h3 className="text-lg font-bold text-gray-900">Verification</h3>
                    </div>

                    <div className="space-y-3 text-sm">
                        <div className="flex items-center justify-between">
                            <p className="text-gray-500">KYC Status</p>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${kycStatusClass(kyc?.status)}`}>
                                {kyc?.status || 'not_started'}
                            </span>
                        </div>
                        <div>
                            <p className="text-gray-500">Verified At</p>
                            <p className="font-semibold text-gray-900">
                                {kyc?.verified_at ? new Date(kyc.verified_at).toLocaleString() : '-'}
                            </p>
                        </div>
                        {kyc?.failure_reason && (
                            <div>
                                <p className="text-gray-500">Reason</p>
                                <p className="font-semibold text-red-700">{kyc.failure_reason}</p>
                            </div>
                        )}
                    </div>

                    <Link
                        to="/dashboard/kyc"
                        className="inline-block mt-5 bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 transition-colors"
                    >
                        Manage KYC
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Your Testimonial</h3>
                <p className="text-sm text-gray-600 mb-4">
                    Submit your review. Testimonials are moderated by admin before appearing publicly.
                </p>

                {testimonial && (
                    <div className="mb-4 rounded-xl border border-gray-200 bg-gray-50 p-4 text-sm">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-gray-500">Current Status:</span>
                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-200 text-gray-700 capitalize">
                                {testimonial.status}
                            </span>
                            {testimonial.featured && (
                                <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                                    Featured
                                </span>
                            )}
                        </div>
                        <p className="text-gray-700">Last submitted: {testimonial.updated_at ? new Date(testimonial.updated_at).toLocaleString() : '-'}</p>
                    </div>
                )}

                {testimonialNotice && (
                    <div className="mb-4 rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">
                        {testimonialNotice}
                    </div>
                )}

                <form onSubmit={submitTestimonial} className="space-y-4">
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">Rating</p>
                        <div className="flex items-center gap-2">
                            {Array.from({ length: 5 }).map((_, i) => {
                                const value = i + 1;
                                const selected = Number(testimonialForm.rating) >= value;
                                return (
                                    <button
                                        type="button"
                                        key={`rating-${value}`}
                                        onClick={() => setTestimonialForm((prev) => ({ ...prev, rating: value }))}
                                        className="p-1"
                                        aria-label={`Rate ${value} star${value > 1 ? 's' : ''}`}
                                    >
                                        <Star className={`w-6 h-6 ${selected ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                            rows={4}
                            value={testimonialForm.message}
                            onChange={(e) => setTestimonialForm((prev) => ({ ...prev, message: e.target.value }))}
                            className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                            placeholder="Share your experience with Solarionis..."
                            minLength={20}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={testimonialSaving}
                        className="bg-yellow-400 text-black font-semibold px-4 py-2 rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {testimonialSaving ? 'Submitting...' : 'Submit Testimonial'}
                    </button>
                </form>
            </div>
        </div>
    );
}
