import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { API_ENDPOINTS } from "../config/api";

const TYPES = ["all", "news", "blog", "update"];

function formatDate(value) {
    if (!value) return "-";
    return new Date(value).toLocaleDateString();
}

export default function ArticlesPage() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [type, setType] = useState("all");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setError("");
            try {
                const params = new URLSearchParams();
                params.set("limit", "50");
                if (type !== "all") params.set("type", type);
                if (query.trim()) params.set("q", query.trim());
                const response = await fetch(`${API_ENDPOINTS.ARTICLES}?${params.toString()}`);
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(data?.message || "Failed to load articles.");
                }
                setRows(Array.isArray(data?.data) ? data.data : []);
            } catch (err) {
                setError(err.message || "Failed to load articles.");
            } finally {
                setLoading(false);
            }
        };

        run();
    }, [query, type]);

    const featured = useMemo(() => rows[0] || null, [rows]);
    const others = useMemo(() => (rows.length > 1 ? rows.slice(1) : []), [rows]);

    return (
        <div className="min-h-screen bg-white">
            <Header forceSolid />

            <section className="bg-(--deep-black) text-white py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <p className="text-sm uppercase tracking-[0.2em] text-(--solar-gold) mb-3">Articles</p>
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Energy News, Blogs, and Platform Updates</h1>
                    <p className="text-gray-300 max-w-3xl">
                        Published by the Solarionis admin team to keep investors informed on energy trends and company
                        progress.
                    </p>
                </div>
            </section>

            <section className="py-10 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
                        <div className="flex flex-wrap gap-2">
                            {TYPES.map((value) => (
                                <button
                                    key={value}
                                    onClick={() => setType(value)}
                                    className={`px-4 py-2 rounded-full text-sm capitalize ${
                                        type === value
                                            ? "bg-(--solar-gold) text-black font-semibold"
                                            : "bg-gray-100 text-gray-700"
                                    }`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full md:w-80">
                            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full border border-gray-300 rounded-xl pl-9 pr-3 py-2 text-sm"
                            />
                        </div>
                    </div>

                    {error && <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}

                    {loading ? (
                        <div className="rounded-2xl border border-gray-200 p-8 text-center text-gray-500">Loading articles...</div>
                    ) : rows.length === 0 ? (
                        <div className="rounded-2xl border border-gray-200 p-8 text-center text-gray-500">No articles yet.</div>
                    ) : (
                        <>
                            {featured && (
                                <Link
                                    to={`/articles/${featured.slug}`}
                                    className="block rounded-3xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
                                >
                                    <p className="text-xs uppercase tracking-wider text-(--solar-gold) mb-2">Featured</p>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{featured.title}</h2>
                                    <p className="text-gray-600 mb-3">{featured.excerpt || "Read more about this update."}</p>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <span className="capitalize">{featured.type}</span>
                                        <span>{formatDate(featured.published_at)}</span>
                                    </div>
                                </Link>
                            )}

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {others.map((article) => (
                                    <Link
                                        to={`/articles/${article.slug}`}
                                        key={article.id}
                                        className="rounded-2xl border border-gray-200 p-5 hover:shadow-sm transition-shadow"
                                    >
                                        <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">{article.type}</p>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{article.title}</h3>
                                        <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                            {article.excerpt || "Open this article to read the full update."}
                                        </p>
                                        <div className="flex items-center justify-between text-sm text-gray-500">
                                            <span>{formatDate(article.published_at)}</span>
                                            <span className="inline-flex items-center gap-1 text-(--solar-gold)">
                                                Read
                                                <ArrowRight className="w-4 h-4" />
                                            </span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </section>

            <Footer />
        </div>
    );
}
