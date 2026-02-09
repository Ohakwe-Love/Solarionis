import React, { useState, useEffect } from 'react';
import { Sun, MoreVertical, ArrowUpRight } from 'lucide-react';

export default function UserPortfolio() {
    const [portfolioData, setPortfolioData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            // Mock data - replace with actual API call
            setPortfolioData([
                {
                    id: 1,
                    name: 'Solar Farm Alpha',
                    invested: 15000,
                    currentValue: 17250,
                    returns: 15,
                    status: 'active',
                    location: 'California',
                    capacity: '5.2 MW'
                },
                {
                    id: 2,
                    name: 'Community Solar Grid',
                    invested: 20000,
                    currentValue: 23400,
                    returns: 17,
                    status: 'active',
                    location: 'Texas',
                    capacity: '8.5 MW'
                },
                {
                    id: 3,
                    name: 'Residential Solar Project',
                    invested: 10000,
                    currentValue: 11500,
                    returns: 15,
                    status: 'active',
                    location: 'Arizona',
                    capacity: '3.8 MW'
                },
                {
                    id: 4,
                    name: 'Industrial Solar Installation',
                    invested: 5000,
                    currentValue: 6600,
                    returns: 32,
                    status: 'completed',
                    location: 'Nevada',
                    capacity: '2.1 MW'
                }
            ]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching portfolio:', error);
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Sun className="w-12 h-12 text-yellow-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Portfolio</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioData.map((project) => (
                    <div key={project.id} className="border-2 border-gray-200 rounded-2xl p-6 hover:border-yellow-400 transition-all">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center">
                                    <Sun className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-lg">{project.name}</h3>
                                    <p className="text-sm text-gray-500">{project.location}</p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-full cursor-pointer">
                                <MoreVertical className="w-5 h-5 text-gray-400" />
                            </button>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-xs text-gray-500 mb-1">Capacity</p>
                                <p className="text-sm font-bold text-gray-900">{project.capacity}</p>
                            </div>
                            <div className="bg-gray-50 rounded-xl p-3">
                                <p className="text-xs text-gray-500 mb-1">Status</p>
                                <p className="text-sm font-bold text-green-600 capitalize">{project.status}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Your Investment</span>
                                <span className="text-sm font-bold text-gray-900">${project.invested.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-600">Current Value</span>
                                <span className="text-sm font-bold text-gray-900">${project.currentValue.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                                <span className="text-sm text-gray-600">Total Returns</span>
                                <span className="text-sm font-bold text-green-600 flex items-center gap-1">
                                    <ArrowUpRight className="w-4 h-4" />
                                    +{project.returns}%
                                </span>
                            </div>
                        </div>

                        <button className="w-full bg-gray-100 hover:bg-yellow-400 hover:text-black text-gray-700 font-semibold py-3 rounded-xl transition-all cursor-pointer">
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}