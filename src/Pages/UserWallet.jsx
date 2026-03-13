import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ArrowDownLeft, ArrowUpRight, Loader } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

function safeJson(response) {
    return response.json().catch(() => ({}));
}

function statusBadgeClass(status) {
    const value = String(status || '').toLowerCase();
    if (['completed', 'confirmed', 'sent'].includes(value)) {
        return 'bg-green-100 text-green-700';
    }
    if (['failed', 'expired'].includes(value)) {
        return 'bg-red-100 text-red-700';
    }
    if (['processing', 'requested', 'pending', 'waiting'].includes(value)) {
        return 'bg-yellow-100 text-yellow-700';
    }
    return 'bg-gray-100 text-gray-700';
}

function formatMajor(minor, decimals = 2) {
    const d = Number.isFinite(Number(decimals)) ? Number(decimals) : 2;
    const value = Number(minor || 0) / (10 ** d);
    return value.toLocaleString(undefined, { maximumFractionDigits: Math.max(2, d) });
}

export default function UserWallet() {
    const [wallets, setWallets] = useState([]);
    const [deposits, setDeposits] = useState([]);
    const [withdrawals, setWithdrawals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [depositSubmitting, setDepositSubmitting] = useState(false);
    const [withdrawSubmitting, setWithdrawSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [kycRequired, setKycRequired] = useState(false);
    const [depositInstructions, setDepositInstructions] = useState(null);
    const [depositForm, setDepositForm] = useState({
        assetCode: '',
        priceAmount: '',
    });
    const [withdrawForm, setWithdrawForm] = useState({
        assetCode: '',
        amount: '',
        destination: '',
    });

    const token = useMemo(() => localStorage.getItem('auth_token'), []);

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
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

            const [walletRes, depositRes, withdrawalRes] = await Promise.all([
                fetch(API_ENDPOINTS.WALLET, { headers }),
                fetch(API_ENDPOINTS.DEPOSITS, { headers }),
                fetch(API_ENDPOINTS.WITHDRAWALS, { headers }),
            ]);

            if ([walletRes, depositRes, withdrawalRes].some((r) => r.status === 401)) {
                localStorage.removeItem('auth_token');
                window.location.href = '/login';
                return;
            }

            const [walletData, depositData, withdrawalData] = await Promise.all([
                safeJson(walletRes),
                safeJson(depositRes),
                safeJson(withdrawalRes),
            ]);

            if (!walletRes.ok) {
                throw new Error(walletData?.message || 'Failed to load wallet.');
            }

            const walletRows = walletData?.wallets || [];
            setWallets(walletRows);
            setDeposits(Array.isArray(depositData?.data) ? depositData.data : []);
            setWithdrawals(Array.isArray(withdrawalData?.data) ? withdrawalData.data : []);

            if (walletRows.length > 0) {
                const defaultAsset = walletRows[0].asset_code;
                setDepositForm((prev) => ({ ...prev, assetCode: prev.assetCode || defaultAsset }));
                setWithdrawForm((prev) => ({ ...prev, assetCode: prev.assetCode || defaultAsset }));
            }
        } catch (err) {
            setError(err.message || 'Failed to load wallet data.');
        } finally {
            setLoading(false);
        }
    };

    const submitDeposit = async (event) => {
        event.preventDefault();
        setDepositSubmitting(true);
        setError('');
        setSuccess('');

        try {
            if (!token) {
                throw new Error('Please log in again.');
            }

            const amount = Number(depositForm.priceAmount);
            if (!Number.isFinite(amount) || amount < 5) {
                throw new Error('Minimum deposit is $5.');
            }

            const response = await fetch(API_ENDPOINTS.DEPOSITS, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    asset_code: depositForm.assetCode,
                    price_amount: amount,
                }),
            });

            const data = await safeJson(response);
            if (!response.ok) {
                throw new Error(data?.message || data?.error || 'Deposit request failed.');
            }

            setDepositInstructions(data);
            setSuccess('Deposit created. Send funds to the generated address.');
            setDepositForm((prev) => ({ ...prev, priceAmount: '' }));
            await fetchData();
        } catch (err) {
            setError(err.message || 'Failed to create deposit.');
        } finally {
            setDepositSubmitting(false);
        }
    };

    const submitWithdrawal = async (event) => {
        event.preventDefault();
        setWithdrawSubmitting(true);
        setError('');
        setSuccess('');
        setKycRequired(false);

        try {
            if (!token) {
                throw new Error('Please log in again.');
            }

            const selectedWallet = wallets.find((w) => w.asset_code === withdrawForm.assetCode);
            if (!selectedWallet) {
                throw new Error('Select a valid asset.');
            }

            const amount = Number(withdrawForm.amount);
            if (!Number.isFinite(amount) || amount <= 0) {
                throw new Error('Enter a valid amount.');
            }

            const decimals = Number(selectedWallet.decimals || 2);
            const amountMinor = Math.round(amount * (10 ** decimals));

            if (!withdrawForm.destination || withdrawForm.destination.trim().length < 10) {
                throw new Error('Enter a valid destination address.');
            }

            const response = await fetch(API_ENDPOINTS.WITHDRAWALS, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    asset_code: withdrawForm.assetCode,
                    amount_minor: amountMinor,
                    destination: withdrawForm.destination.trim(),
                }),
            });

            const data = await safeJson(response);

            if (!response.ok) {
                const message =
                    data?.message ||
                    data?.error ||
                    data?.errors?.amount_minor?.[0] ||
                    'Withdrawal failed.';

                if (String(message).toLowerCase().includes('kyc')) {
                    setKycRequired(true);
                }

                throw new Error(message);
            }

            setSuccess('Withdrawal requested successfully.');
            setWithdrawForm((prev) => ({ ...prev, amount: '', destination: '' }));
            await fetchData();
        } catch (err) {
            setError(err.message || 'Failed to request withdrawal.');
        } finally {
            setWithdrawSubmitting(false);
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
                <Wallet className="w-6 h-6 text-yellow-600" />
                <h2 className="text-2xl font-bold text-gray-900">Wallet</h2>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm">
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 text-sm">
                    {success}
                </div>
            )}

            {kycRequired && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-sm text-yellow-800">
                    Withdrawal requires verified KYC. Continue here:{' '}
                    <Link to="/dashboard/kyc" className="font-semibold underline">
                        Complete KYC
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">Balances</h3>
                    {wallets.length === 0 ? (
                        <p className="text-sm text-gray-600">No wallet balances yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {wallets.map((wallet) => (
                                <div key={wallet.asset_code} className="border border-gray-200 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-3">
                                        <p className="font-semibold text-gray-900">
                                            {wallet.symbol} <span className="text-gray-500">({wallet.asset_code})</span>
                                        </p>
                                        <p className="font-bold text-gray-900">
                                            {formatMajor(wallet.visible_minor, wallet.decimals)}
                                        </p>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 text-xs">
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-gray-500">Available</p>
                                            <p className="font-semibold text-gray-900">
                                                {formatMajor(wallet.buckets?.available || 0, wallet.decimals)}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-gray-500">Hold</p>
                                            <p className="font-semibold text-gray-900">
                                                {formatMajor(wallet.buckets?.hold || 0, wallet.decimals)}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-3">
                                            <p className="text-gray-500">Invested</p>
                                            <p className="font-semibold text-gray-900">
                                                {formatMajor(wallet.buckets?.invested || 0, wallet.decimals)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-6">
                    <form onSubmit={submitDeposit} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Create Deposit</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
                                <select
                                    value={depositForm.assetCode}
                                    onChange={(e) => setDepositForm((prev) => ({ ...prev, assetCode: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                                    required
                                >
                                    {wallets.length === 0 && <option value="">No assets</option>}
                                    {wallets.map((wallet) => (
                                        <option key={wallet.asset_code} value={wallet.asset_code}>
                                            {wallet.symbol} ({wallet.asset_code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount (USD)</label>
                                <input
                                    type="number"
                                    min="5"
                                    step="any"
                                    value={depositForm.priceAmount}
                                    onChange={(e) => setDepositForm((prev) => ({ ...prev, priceAmount: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                                    placeholder="Minimum 5"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={depositSubmitting || wallets.length === 0}
                                className="w-full bg-green-600 text-white font-semibold py-3 rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {depositSubmitting ? 'Creating...' : 'Create Deposit'}
                            </button>
                        </div>
                    </form>

                    {depositInstructions && (
                        <div className="bg-green-50 rounded-2xl p-4 border border-green-200 text-sm text-green-900 space-y-1">
                            <p className="font-semibold">Payment instructions</p>
                            <p>Payment ID: {depositInstructions.payment_id || '-'}</p>
                            <p>Address: {depositInstructions.pay_address || '-'}</p>
                            {depositInstructions.payin_extra_id ? <p>Extra ID: {depositInstructions.payin_extra_id}</p> : null}
                            <p>
                                Amount: {depositInstructions.pay_amount || 0}{' '}
                                {String(depositInstructions.pay_currency || '').toUpperCase()}
                            </p>
                            <p>Status: {depositInstructions.status || '-'}</p>
                        </div>
                    )}

                    <form onSubmit={submitWithdrawal} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-900 mb-4">Request Withdrawal</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Asset</label>
                                <select
                                    value={withdrawForm.assetCode}
                                    onChange={(e) => setWithdrawForm((prev) => ({ ...prev, assetCode: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                                    required
                                >
                                    {wallets.length === 0 && <option value="">No assets</option>}
                                    {wallets.map((wallet) => (
                                        <option key={wallet.asset_code} value={wallet.asset_code}>
                                            {wallet.symbol} ({wallet.asset_code})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
                                <input
                                    type="number"
                                    min="0"
                                    step="any"
                                    value={withdrawForm.amount}
                                    onChange={(e) => setWithdrawForm((prev) => ({ ...prev, amount: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                                    placeholder="0.00"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Destination Address</label>
                                <textarea
                                    rows={3}
                                    value={withdrawForm.destination}
                                    onChange={(e) => setWithdrawForm((prev) => ({ ...prev, destination: e.target.value }))}
                                    className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm"
                                    placeholder="Wallet address"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={withdrawSubmitting || wallets.length === 0}
                                className="w-full bg-yellow-400 text-black font-semibold py-3 rounded-xl hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {withdrawSubmitting ? 'Submitting...' : 'Submit Withdrawal'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <ArrowDownLeft className="w-5 h-5 text-green-600" />
                        <h3 className="text-lg font-bold text-gray-900">Recent Deposits</h3>
                    </div>
                    {deposits.length === 0 ? (
                        <p className="text-sm text-gray-600">No deposits yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {deposits.slice(0, 8).map((deposit) => (
                                <div key={deposit.id} className="border border-gray-200 rounded-xl p-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="font-semibold text-sm text-gray-900">
                                            {deposit.pay_amount || 0} {String(deposit.pay_currency || '').toUpperCase()}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusBadgeClass(deposit.payment_status)}`}>
                                            {deposit.payment_status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        {deposit.created_at ? new Date(deposit.created_at).toLocaleString() : '-'}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <ArrowUpRight className="w-5 h-5 text-yellow-700" />
                        <h3 className="text-lg font-bold text-gray-900">Recent Withdrawals</h3>
                    </div>
                    {withdrawals.length === 0 ? (
                        <p className="text-sm text-gray-600">No withdrawals yet.</p>
                    ) : (
                        <div className="space-y-3">
                            {withdrawals.slice(0, 8).map((withdrawal) => (
                                <div key={withdrawal.id} className="border border-gray-200 rounded-xl p-3">
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="font-semibold text-sm text-gray-900">
                                            {formatMajor(withdrawal.amount_minor, withdrawal.asset?.decimals || 2)}{' '}
                                            {withdrawal.asset?.symbol || withdrawal.asset?.code || ''}
                                        </p>
                                        <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusBadgeClass(withdrawal.status)}`}>
                                            {withdrawal.status}
                                        </span>
                                    </div>
                                    <p className="text-xs text-gray-500 truncate">{withdrawal.destination}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
