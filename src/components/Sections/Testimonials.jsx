import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Dr. Michael Thompson',
      timeAgo: '3 months ago',
      rating: 5,
      review: 'Thanks for the opportunity. The platform is incredibly user-friendly and the returns have exceeded my expectations.'
    },
    {
      id: 2,
      name: 'Elicia Rodriguez',
      timeAgo: '3 months ago',
      rating: 5,
      review: 'Easy to use and good interest rate. I appreciate the transparency and consistent communication from the team.'
    },
    {
      id: 3,
      name: 'Sam Williams',
      timeAgo: '3 months ago',
      rating: 5,
      review: 'Very good company for investment and for dividends. The monthly payouts are reliable and the customer service is excellent.'
    },
    {
      id: 4,
      name: 'Jennifer Chen',
      timeAgo: '2 months ago',
      rating: 5,
      review: 'Great platform with transparent processes and excellent returns. Love supporting clean energy while earning good returns.'
    },
    {
      id: 5,
      name: 'Robert Martinez',
      timeAgo: '1 month ago',
      rating: 5,
      review: 'Love the mission and the consistent dividend payments! This has become a core part of my investment portfolio.'
    },
    {
      id: 6,
      name: 'Patricia Anderson',
      timeAgo: '2 weeks ago',
      rating: 5,
      review: 'Outstanding investment opportunity. The team is professional and the platform makes it easy to track my investments.'
    }
  ];

  // Get initials from name
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate consistent color based on name
  const getAvatarColor = (name) => {
    const colors = [
      'bg-blue-600',
      'bg-green-600',
      'bg-purple-600',
      'bg-red-600',
      'bg-indigo-600',
      'bg-pink-600',
      'bg-teal-600',
      'bg-orange-600'
    ];
    const index = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  // Responsive testimonials per view
  const getTestimonialsPerView = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 768) return 1; // Mobile
    if (window.innerWidth < 1024) return 2; // Tablet
    return 3; // Desktop
  };

  const [testimonialsPerView, setTestimonialsPerView] = useState(getTestimonialsPerView());

  // Update testimonials per view on resize
  React.useEffect(() => {
    const handleResize = () => {
      setTestimonialsPerView(getTestimonialsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(testimonials.length / testimonialsPerView);

  // Navigate to next slide (infinite loop)
  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 1;
      return next >= totalPages ? 0 : next;
    });
  };

  // Navigate to previous slide (infinite loop)
  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const previous = prev - 1;
      return previous < 0 ? totalPages - 1 : previous;
    });
  };

  // Get visible testimonials for current page
  const getVisibleTestimonials = () => {
    const start = currentIndex * testimonialsPerView;
    const end = start + testimonialsPerView;
    return testimonials.slice(start, end);
  };

  return (
    <div className="bg-gray-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 sm:mb-8">
            See What Our Investors Are Saying
          </h2>

          {/* Google Rating */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6 sm:mb-8">
            <div className="w-8 h-8">
              <svg viewBox="0 0 24 24" className="w-full h-full">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="text-gray-900 font-medium text-sm sm:text-base">
              <strong>5.0</strong> rating from <strong>135</strong> reviews
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-700 text-base sm:text-lg max-w-4xl mx-auto leading-relaxed px-4">
            At Energea, we believe in delivering more than just returns. Our investors trust us to align their financial goals with their values, and we're committed to upholding that trust. Learn how our commitment to transparency and exceptional service has made a difference for our investors.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
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

          {/* Testimonials Container */}
          <div className="overflow-hidden px-8 sm:px-12 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {getVisibleTestimonials().map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow"
                >
                  {/* Avatar with Initials */}
                  <div className="flex flex-col items-center mb-6">
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center text-white font-bold text-xl sm:text-2xl mb-3 ${getAvatarColor(testimonial.name)}`}
                    >
                      {getInitials(testimonial.name)}
                    </div>
                    <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-500">
                      {testimonial.timeAgo}
                    </p>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex justify-center gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 sm:w-5 sm:h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review Text */}
                  <p className="text-gray-700 text-center text-sm sm:text-base leading-relaxed">
                    {testimonial.review}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full cursor-pointer transition-all ${
                  i === currentIndex 
                    ? 'bg-gray-900 w-8' 
                    : 'bg-gray-300 w-2 hover:bg-gray-400'
                }`}
                aria-label={`Go to page ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}