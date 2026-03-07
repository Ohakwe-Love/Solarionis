import React, { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { API_ENDPOINTS } from "../../config/api";

function getDisplayName(user) {
    if (!user) return "Investor";
    const full = `${user.first_name || ""} ${user.last_name || ""}`.trim();
    if (full) return full;
    return user.name || "Investor";
}

function getInitials(name) {
    return name
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
}

function getAvatarColor(name) {
    const colors = [
        "bg-blue-600",
        "bg-green-600",
        "bg-purple-600",
        "bg-red-600",
        "bg-indigo-600",
        "bg-pink-600",
        "bg-teal-600",
        "bg-orange-600",
    ];
    const index = name.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
}

function getTestimonialsPerView() {
    if (typeof window === "undefined") return 3;
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
}

function timeAgo(isoDate) {
    if (!isoDate) return "recently";
    const then = new Date(isoDate).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - then);
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins || 1} min ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
    const years = Math.floor(months / 12);
    return `${years} year${years > 1 ? "s" : ""} ago`;
}

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [testimonialsPerView, setTestimonialsPerView] = useState(getTestimonialsPerView());
    const [rows, setRows] = useState([]);
    const [stats, setStats] = useState({ average_rating: 0, reviews_count: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const run = async () => {
            setLoading(true);
            try {
                const [rowsRes, statsRes] = await Promise.all([
                    fetch(`${API_ENDPOINTS.TESTIMONIALS_PUBLIC}?limit=24`),
                    fetch(API_ENDPOINTS.TESTIMONIALS_STATS),
                ]);

                const rowsData = await rowsRes.json().catch(() => ({}));
                const statsData = await statsRes.json().catch(() => ({}));

                if (rowsRes.ok) {
                    setRows(Array.isArray(rowsData?.data) ? rowsData.data : []);
                }

                if (statsRes.ok) {
                    setStats({
                        average_rating: Number(statsData?.average_rating || 0),
                        reviews_count: Number(statsData?.reviews_count || 0),
                    });
                }
            } finally {
                setLoading(false);
            }
        };

        run();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setTestimonialsPerView(getTestimonialsPerView());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const testimonials = useMemo(
        () =>
            rows.map((row) => {
                const name = getDisplayName(row.user);
                return {
                    id: row.id,
                    name,
                    timeAgo: timeAgo(row.approved_at || row.created_at),
                    rating: Number(row.rating || 0),
                    review: row.message,
                };
            }),
        [rows]
    );

    const totalPages = Math.max(1, Math.ceil(testimonials.length / testimonialsPerView));

    useEffect(() => {
        if (currentIndex > totalPages - 1) {
            setCurrentIndex(0);
        }
    }, [currentIndex, totalPages]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
    };

    const getVisibleTestimonials = () => {
        const start = currentIndex * testimonialsPerView;
        const end = start + testimonialsPerView;
        return testimonials.slice(start, end);
    };

    return (
        <div className="bg-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
                        See What Our Investors Are Saying
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-8">
                        <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <Star key={`avg-star-${i}`} className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-gray-900 font-medium text-sm sm:text-base">
                            <strong>{stats.average_rating.toFixed(1)}</strong> rating from{" "}
                            <strong>{stats.reviews_count}</strong> reviews
                        </span>
                    </div>

                    <p className="text-gray-700 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed px-4">
                        Real feedback from verified investors. Testimonials are submitted by users and published after admin review.
                    </p>
                </div>

                {loading ? (
                    <div className="rounded-2xl bg-white p-8 text-center text-gray-600">Loading testimonials...</div>
                ) : testimonials.length === 0 ? (
                    <div className="rounded-2xl bg-white p-8 text-center text-gray-600">No approved testimonials yet.</div>
                ) : (
                    <div className="relative">
                        <button
                            onClick={prevSlide}
                            className="absolute cursor-pointer left-0 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors"
                            aria-label="Previous testimonials"
                        >
                            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                        </button>

                        <button
                            onClick={nextSlide}
                            className="absolute cursor-pointer right-0 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:bg-gray-50 transition-colors"
                            aria-label="Next testimonials"
                        >
                            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900" />
                        </button>

                        <div className="overflow-hidden px-8 sm:px-12 lg:px-16">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {getVisibleTestimonials().map((testimonial) => (
                                    <div
                                        key={testimonial.id}
                                        className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex flex-col items-center mb-6">
                                            <div
                                                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-3 ${getAvatarColor(testimonial.name)}`}
                                            >
                                                {getInitials(testimonial.name)}
                                            </div>
                                            <h4 className="font-semibold text-gray-900 text-base sm:text-lg">{testimonial.name}</h4>
                                            <p className="text-xs sm:text-sm text-gray-500">{testimonial.timeAgo}</p>
                                        </div>

                                        <div className="flex justify-center gap-1 mb-6">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Star
                                                    key={`${testimonial.id}-star-${i}`}
                                                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                                        i < testimonial.rating
                                                            ? "fill-yellow-400 text-yellow-400"
                                                            : "text-gray-300"
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <p className="text-gray-700 text-center text-sm sm:text-base leading-relaxed">
                                            {testimonial.review}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={`dot-${i}`}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`h-2 rounded-full cursor-pointer transition-all ${
                                        i === currentIndex ? "bg-gray-900 w-8" : "bg-gray-300 w-2 hover:bg-gray-400"
                                    }`}
                                    aria-label={`Go to page ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
