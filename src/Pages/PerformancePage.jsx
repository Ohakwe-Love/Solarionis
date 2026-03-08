import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, ShieldCheck } from "lucide-react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";

const performanceRows = [
    { year: "2025", solarionis: "11.7%", reits: "2.3%", sp500: "17.4%" },
    { year: "2024", solarionis: "12.2%", reits: "4.3%", sp500: "25.0%" },
    { year: "2023", solarionis: "13.1%", reits: "11.5%", sp500: "26.3%" },
    { year: "2022", solarionis: "13.7%", reits: "-25.1%", sp500: "-18.1%" },
    { year: "2021", solarionis: "13.7%", reits: "39.9%", sp500: "28.7%" },
    { year: "2020", solarionis: "11.3%", reits: "-5.9%", sp500: "18.4%" },
];

export default function PerformancePage() {
    return (
        <div className="min-h-screen bg-white text-gray-900">
            <Header forceSolid />

            <section className="bg-(--deep-black) text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <p className="text-sm uppercase tracking-[0.2em] text-(--solar-gold) mb-3">Performance</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                        Historical Investment Performance
                    </h1>
                    <p className="text-gray-300 max-w-3xl text-lg">
                        Snapshot of annual performance comparisons and long-term return profile across our energy
                        infrastructure strategies.
                    </p>
                </div>
            </section>

            <section className="py-14 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                    <div className="rounded-2xl border border-gray-200 p-5">
                        <TrendingUp className="w-8 h-8 text-(--solar-gold) mb-3" />
                        <p className="text-sm text-gray-500 mb-1">Realized IRR</p>
                        <p className="text-3xl font-bold">12.0%</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-5">
                        <ShieldCheck className="w-8 h-8 text-(--solar-gold) mb-3" />
                        <p className="text-sm text-gray-500 mb-1">Asset Class</p>
                        <p className="text-3xl font-bold">Private Energy</p>
                    </div>
                    <div className="rounded-2xl border border-gray-200 p-5">
                        <TrendingUp className="w-8 h-8 text-(--solar-gold) mb-3" />
                        <p className="text-sm text-gray-500 mb-1">Track Record</p>
                        <p className="text-3xl font-bold">6+ Years</p>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto rounded-3xl border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[640px]">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Year</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Solarionis</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">Public REITs</th>
                                    <th className="text-left px-5 py-4 text-sm font-semibold text-gray-600">S&amp;P 500</th>
                                </tr>
                            </thead>
                            <tbody>
                                {performanceRows.map((row) => (
                                    <tr key={row.year} className="border-t border-gray-100">
                                        <td className="px-5 py-4 font-semibold">{row.year}</td>
                                        <td className="px-5 py-4 font-bold text-green-700">{row.solarionis}</td>
                                        <td className="px-5 py-4">{row.reits}</td>
                                        <td className="px-5 py-4">{row.sp500}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto mt-4 text-xs text-gray-500">
                    Past performance is not a guarantee of future results. Returns shown are illustrative historical
                    figures and may not represent future outcomes.
                </div>
            </section>

            <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">Want deeper market updates?</h2>
                    <p className="text-gray-600 mb-8">
                        Read our latest energy market articles and platform updates published by the admin team.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/articles" className="btn rounded bg-black text-white">
                            View Articles
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link to="/login" className="btn rounded btn-primary">
                            Get Started
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
