import React from 'react';
import { Settings } from 'lucide-react';

export default function UserSettings() {
    return (
        <div className="text-center py-12">
            <Settings className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Settings</h2>
            <p className="text-gray-600">Manage your account preferences and security</p>
        </div>
    );
}