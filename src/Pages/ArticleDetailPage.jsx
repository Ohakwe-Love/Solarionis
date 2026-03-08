import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { API_ENDPOINTS } from "../config/api";

function formatDate(value) {
    if (!value) return "-";
    return new Date(value).toLocaleDateString();
}

export default function ArticleDetailPage() {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            setError("");
            try {
                const response = await fetch(API_ENDPOINTS.ARTICLE_DETAIL(slug));
                const data = await response.json().catch(() => ({}));
                if (!response.ok) {
                    throw new Error(data?.message || "Article not found.");
                }
                setArticle(data?.article || null);
            } catch (err) {
                setError(err.message || "Article not found.");
            } finally {
                setLoading(false);
            }
        };

        if (slug) run();
    }, [slug]);

    return (
        <div className="min-h-screen bg-white">
            <Header />

            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <Link to="/articles" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-8">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Articles
                    </Link>

                    {loading ? (
                        <div className="rounded-xl border border-gray-200 p-8 text-center text-gray-500">Loading article...</div>
                    ) : error ? (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
                    ) : article ? (
                        <article className="space-y-6">
                            <div>
                                <p className="text-xs uppercase tracking-wider text-(--solar-gold) mb-2">{article.type}</p>
                                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{article.title}</h1>
                                <p className="text-sm text-gray-500">Published {formatDate(article.published_at)}</p>
                            </div>

                            {article.excerpt && <p className="text-lg text-gray-700">{article.excerpt}</p>}

                            {article.cover_image_url && (
                                <img
                                    src={article.cover_image_url}
                                    alt={article.title}
                                    className="w-full h-72 sm:h-96 object-cover rounded-2xl border border-gray-200"
                                />
                            )}

                            <div className="prose prose-gray max-w-none whitespace-pre-wrap text-gray-800">
                                {article.content}
                            </div>
                        </article>
                    ) : null}
                </div>
            </section>

            <Footer />
        </div>
    );
}
