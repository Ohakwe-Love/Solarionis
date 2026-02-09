import React from 'react';
import { Wallet } from 'lucide-react';

export default function UserWallet() {
    return (
        <div className="text-center py-12">
            <Wallet className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Wallet & Transactions</h2>
            <p className="text-gray-600">Manage your funds and view transaction history</p>
        </div>
    );
}