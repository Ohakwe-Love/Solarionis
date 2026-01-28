import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "For Watch Purchases, Do You Have Financing Options?",
      answer: "Dolor sit amet consectetur adipisicing. Elit duis tristique sollicitudin nibh sit amet. Ultricies nisi in cursus turpis. Ultricies tristique nulla aliquet enim tortor at auctor urna num. Vulputate enim sit venenatis tellus. Consectetur adipiscing elit duis tristique nibh sit amet."
    },
    {
      question: "Do You Have Eco-Friendly Timepieces?",
      answer: "Yes, we offer a curated selection of sustainably crafted watches. Our eco-friendly collection features timepieces made with recycled materials, vegan leather straps, and solar-powered movements. We partner with brands committed to reducing environmental impact while maintaining luxury quality standards."
    },
    {
      question: "Is It Possible To Follow The Delivery Of My Watch?",
      answer: "Absolutely! Once your order ships, you'll receive a tracking number via email. You can monitor your watch's journey in real-time through our website or the carrier's tracking portal. We provide full transparency from our facility to your doorstep, with estimated delivery dates and notifications at each checkpoint."
    },
    {
      question: "Do You Offer Design Consultations?",
      answer: "Yes, our expert consultants are available for personalized appointments. Whether you're selecting your first luxury timepiece or adding to your collection, we provide one-on-one guidance to help you find the perfect watch that matches your style, lifestyle, and preferences."
    },
    {
      question: "Are Custom Orders Accepted For Watches That Isn't In Stock?",
      answer: "We absolutely accept custom orders! If a specific model isn't currently in stock, we can source it for you or explore customization options including dial colors, strap materials, and engravings. Our team will work directly with manufacturers to fulfill your unique requirements."
    }
  ];

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section className="bg-gradient-to-b from-slate-800 to-slate-900 py-20 lg:px-8 px-2 border-t border-slate-700">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Left Side - FAQ */}
          <div>
            <p className="section-label">
              PRODUCT RELATED QUERIES
            </p>
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-8">
              Products & Service
            </h2>

            {/* FAQ Accordion */}
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="border-b border-slate-700 pb-4"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full flex items-start cursor-pointer justify-between text-left group"
                  >
                    <span className={`text-lg font-medium transition-colors ${openIndex === index ? 'text-[var(--primary-color)]' : 'text-white group-hover:[var(--primary-color)]'
                      }`}>
                      {faq.question}
                    </span>
                    <div className={`flex-shrink-0 ml-4 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-[var(--primary-color)]' : 'bg-slate-700 group-hover:bg-slate-600'
                      }`}>
                      {openIndex === index ? (
                        <Minus className="w-4 h-4 text-white" />
                      ) : (
                        <Plus className="w-4 h-4 text-white  " />
                      )}
                    </div>
                  </button>

                  <div
                    className={`overflow-hidden transition-all duration-500 ${openIndex === index ? 'max-h-96 mt-4 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                  >
                    <p className="text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative group lg:sticky lg:top-8">
            <div className="relative overflow-hidden rounded-lg">
              <img
                src="/src/assets/images/product/5.webp"
                alt="Luxury Watch Display"
                className="w-full h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

              {/* Overlay Text */}
              <div className="absolute bottom-8 left-8 right-8">
                <h3 className="text-white text-3xl font-serif mb-2">
                  Crafted Excellence
                </h3>
                <p className="text-gray-300">
                  Every timepiece tells a story
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;