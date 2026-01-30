import React, { useState } from 'react';
import { Plus, Minus, Calendar, User, ArrowRight, Tag, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';


export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Reviews', 'Guides', 'News', 'Lifestyle'];

  const blogPosts = [
    {
      id: 1,
      title: "Elegant & Exquisite Detailing That Elevates Your Style",
      excerpt: "Discover how the finest details in watchmaking create timeless pieces that transcend fashion trends and become heirlooms.",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=600&fit=crop",
      category: "Lifestyle",
      author: "James Wilson",
      date: "Jan 15, 2024",
      featured: true
    },
    {
      id: 2,
      title: "Advantages Of Choosing Custom-Built Timepieces",
      excerpt: "Explore the unparalleled benefits of commissioning a bespoke watch tailored to your exact specifications and style preferences.",
      image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&h=600&fit=crop",
      category: "Guides",
      author: "Sarah Martinez",
      date: "Jan 12, 2024",
      featured: false
    },
    {
      id: 3,
      title: "How To Match Your Watch With Your Wardrobe",
      excerpt: "Master the art of pairing luxury timepieces with different outfits and occasions for maximum impact and sophistication.",
      image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&h=600&fit=crop",
      category: "Lifestyle",
      author: "Michael Chen",
      date: "Jan 10, 2024",
      featured: false
    },
    {
      id: 4,
      title: "The Modern Twist: A Luxury Watch Revolution",
      excerpt: "Contemporary innovations in classic watchmaking are redefining what it means to wear a luxury timepiece in the modern era.",
      image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=800&h=600&fit=crop",
      category: "News",
      author: "Emma Roberts",
      date: "Jan 8, 2024",
      featured: false
    },
    {
      id: 5,
      title: "Decide What Pieces Will Increase Your Home's Worth",
      excerpt: "Investment-grade watches that not only enhance your collection but also appreciate in value over time.",
      image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&h=600&fit=crop",
      category: "Guides",
      author: "David Kim",
      date: "Jan 5, 2024",
      featured: false
    },
    {
      id: 6,
      title: "The Ultimate Guide To Buying Luxury Timepieces",
      excerpt: "Everything you need to know before investing in your first or next luxury watch, from movements to maintenance.",
      image: "https://images.unsplash.com/photo-1594534475808-b18fc33b045e?w=800&h=600&fit=crop",
      category: "Guides",
      author: "Lisa Anderson",
      date: "Jan 3, 2024",
      featured: false
    },
    {
      id: 7,
      title: "Top For Designing Readings And Door Locally",
      excerpt: "Create the perfect display setup for your watch collection with expert interior design tips and storage solutions.",
      image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=800&h=600&fit=crop",
      category: "Lifestyle",
      author: "Tom Harris",
      date: "Jan 1, 2024",
      featured: false
    }
  ];

  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-(--deep-black)">
      <Header />
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-(--primary-color) text-sm font-medium tracking-widest mb-4">
            OUR BLOG
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-white mb-6">
            Latest Stories & Insights
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore expert advice, industry news, and lifestyle content from the world of luxury timepieces
          </p>
        </div>

        {/* Search & Categories */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${selectedCategory === cat
                  ? 'bg-(--primary-color) text-white'
                  : 'bg-slate-800 text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-slate-800 text-white px-4 py-2 pl-10 rounded-lg border border-gray-800 focus:border-(--primary-color) focus:outline-none"
            />
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-500" />
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article
              key={post.id}
              className={`group bg-slate-800 rounded-xl overflow-hidden border border-gray-800 hover:border-(--primary-color) transition-all duration-300 ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
            >
              <div className={`relative overflow-hidden ${index === 0 ? 'h-96' : 'h-64'}`}>
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-(--primary-color) text-white text-xs font-bold rounded-full">
                    {post.category}
                  </span>
                </div>

                {index === 0 && (
                  <div className="absolute bottom-6 left-6 right-6">
                    <h2 className="text-white text-3xl font-serif mb-3 group-hover:text-(--primary-color) transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{post.date}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {index !== 0 && (
                <div className="p-6">
                  <h3 className="text-white text-xl font-serif mb-2 group-hover:text-(--primary-color) transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-2 mt-12">
          <button className="w-10 h-10 rounded-full bg-(--primary-color) text-white flex items-center justify-center hover:bg-(--primary-color)/90 transition">
            1
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-800 text-gray-400 flex items-center justify-center hover:bg-gray-800 hover:text-white transition">
            2
          </button>
          <button className="w-10 h-10 rounded-full bg-slate-800 text-gray-400 flex items-center justify-center hover:bg-gray-800 hover:text-white transition">
            3
          </button>
        </div>

        {/* Sidebar Widget - Hot Deals */}
        <div className="mt-16 bg-slate-800 rounded-xl p-8 border border-gray-800">
          <h3 className="text-white text-2xl font-serif mb-6">Hot Deals</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop"
                alt="Product"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-white font-semibold mb-2">Classic Timepiece</h4>
              <p className="text-(--primary-color) text-xl font-bold">$3,299</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&h=300&fit=crop"
                alt="Product"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-white font-semibold mb-2">Sport Watch</h4>
              <p className="text-(--primary-color) text-xl font-bold">$4,199</p>
            </div>
            <div className="text-center">
              <img
                src="https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=300&h=300&fit=crop"
                alt="Product"
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h4 className="text-white font-semibold mb-2">Luxury Edition</h4>
              <p className="text-(--primary-color) text-xl font-bold">$5,999</p>
            </div>
          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
};