import React from 'react';
import { Sun } from 'lucide-react';

export default function UserInvest() {
    return (
        <div className="text-center py-12">
            <Sun className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Browse Investment Opportunities</h2>
            <p className="text-gray-600">This section will show available solar projects for investment</p>
        </div>
    );
}