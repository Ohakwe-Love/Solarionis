import React from 'react';
import { FileText } from 'lucide-react';

export default function UserDocuments() {
    return (
        <div className="text-center py-12">
            <FileText className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Documents & Reports</h2>
            <p className="text-gray-600">Access your investment documents and reports</p>
        </div>
    );
}