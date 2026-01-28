import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const testimonials = [
        {
            id: 1,
            name: 'dr',
            avatar: 'D',
            avatarColor: 'bg-red-600',
            timeAgo: '3 months ago',
            rating: 5,
            review: 'Thanks for the opportunity.'
        },
        {
            id: 2,
            name: 'Elicia',
            avatar: 'E',
            avatarColor: 'bg-[var(--deep-black)]',
            timeAgo: '3 months ago',
            rating: 5,
            review: 'Easy to use and good interest rate.'
        },
        {
            id: 3,
            name: 'Sam',
            avatar: 'S',
            avatarColor: 'bg-green-700',
            timeAgo: '3 months ago',
            rating: 5,
            review: 'Very good company for investment and for dividends'
        },
        {
            id: 4,
            name: 'Michael',
            avatar: 'M',
            avatarColor: 'bg-blue-700',
            timeAgo: '2 months ago',
            rating: 5,
            review: 'Great platform with transparent processes and excellent returns.'
        },
        {
            id: 5,
            name: 'Jennifer',
            avatar: 'J',
            avatarColor: 'bg-purple-700',
            timeAgo: '1 month ago',
            rating: 5,
            review: 'Love the mission and the consistent dividend payments!'
        }
    ];

    const visibleTestimonials = 3;

    const nextSlide = () => {
        setCurrentIndex((prev) =>
            prev + 1 >= testimonials.length - visibleTestimonials + 1 ? 0 : prev + 1
        );
    };

    const prevSlide = () => {
        setCurrentIndex((prev) =>
            prev - 1 < 0 ? testimonials.length - visibleTestimonials : prev - 1
        );
    };

    return (
        <div className="bg-gray-100 py-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-8">
                        See What Our Investors Are Saying
                    </h2>

                    {/* Google Rating */}
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <div className="w-8 h-8">
                            <svg viewBox="0 0 24 24" className="w-full h-full">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                        </div>
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            ))}
                        </div>
                        <span className="text-gray-900 font-medium">
                            <strong>5.0</strong> rating from <strong>135</strong> reviews
                        </span>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 text-lg max-w-4xl mx-auto leading-relaxed">
                        At Solarionis, we believe in delivering more than just returns. Our investors trust us to align their financial goals with their values, and we're committed to upholding that trust. Learn how our commitment to transparency and exceptional service has made a difference for our investors.
                    </p>
                </div>

                {/* Testimonials Carousel */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={prevSlide}
                        className="absolute cursor-pointer left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-[var(--deep-black)] rounded-full p-3 shadow-lg text-white transition-colors"
                        aria-label="Previous testimonials"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="absolute cursor-pointer right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-[var(--deep-black)] rounded-full p-3 shadow-lg text-white transition-colors"
                        aria-label="Next testimonials"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Testimonials Container */}
                    <div className="overflow-hidden">
                        <div
                            className="flex transition-transform duration-500 ease-in-out"
                            style={{
                                transform: `translateX(-${currentIndex * (100 / visibleTestimonials)}%)`
                            }}
                        >
                            {testimonials.map((testimonial) => (
                                <div
                                    key={testimonial.id}
                                    className="flex-shrink-0 px-3"
                                    style={{ width: `${100 / visibleTestimonials}%` }}
                                >
                                    <div className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                                        {/* Avatar */}
                                        <div className="flex flex-col items-center mb-6">
                                            <div
                                                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl mb-3 ${testimonial.avatarColor || 'bg-gray-200'
                                                    } text-white font-bold`}
                                            >
                                                {testimonial.avatar}
                                            </div>
                                            <h4 className="font-semibold text-gray-900 text-lg">
                                                {testimonial.name}
                                            </h4>
                                            <p className="text-sm text-gray-500">
                                                {testimonial.timeAgo}
                                            </p>
                                        </div>

                                        {/* Rating Stars */}
                                        <div className="flex justify-center gap-1 mb-6">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>

                                        {/* Review Text */}
                                        <p className="text-gray-700 text-center leading-relaxed">
                                            {testimonial.review}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Dots Indicator */}
                    {/* <div className="flex justify-center gap-2 mt-8">
                        {[...Array(testimonials.length - visibleTestimonials + 1)].map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`w-2 h-2 rounded-full transition-all ${i === currentIndex ? 'bg-gray-900 w-8' : 'bg-gray-300'
                                    }`}
                                aria-label={`Go to slide ${i + 1}`}
                            />
                        ))}
                    </div> */}
                </div>
            </div>
        </div>
    );
}