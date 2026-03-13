import Features from '../components/Sections/Features';

import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import { MapPin, ChevronRight, Phone, Mail, Clock, Send } from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';
import { useSiteSettings } from '../hooks/useSiteSettings';


export default function ContactPage() {
    const settings = useSiteSettings();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        comment: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true);

        try {
            const response = await fetch(API_ENDPOINTS.CONTACT_SUBMIT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    phone: formData.phone,
                    email: formData.email,
                    message: formData.comment,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                throw new Error(data?.message || 'Failed to send your message. Please try again.');
            }

            setSubmitted(true);
            setFormData({ name: '', phone: '', email: '', comment: '' });
            setTimeout(() => setSubmitted(false), 3000);
        } catch (err) {
            setError(err.message || 'Failed to send your message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='bg-slate-900'>

            <Header />

            <section className="flex items-center page-hero justify-center h-110 group overflow-hidden relative ">
                <div className="text-center">
                    <h2 className='text-6xl text-white mb-3'>Contact Us</h2>

                    <p className='text-2xl'>
                        <Link to='/' className='text-white hover:text-(--primary-color) transition'>Home</Link>
                        <ChevronRight className='inline mx-2 text-white' />
                        <span className='text-(--primary-color)'>Contact Us</span>
                    </p>
                </div>
            </section>

            <section className="relative bg-slate-900">
                <div className="max-w-7xl mx-auto bg-gradient-to-b from-slate-800 to-slate-900 pt-20 px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                        <div>
                            <p className="section-label text-(--primary-color) mb-2">
                                TEXT US A NOTE
                            </p>
                            <h2 className="text-3xl sm:text-3xl lg:text-4xl font-serif text-white mb-4">
                                Never-Ending Customer Service
                            </h2>
                            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed mb-10">
                                Whether you have a question about our services, need assistance with your account, or just want to say hello, we're here for you. Our dedicated support team is available 24/7 to ensure you get the help you need, whenever you need it. Reach out to us through the form below, and we'll respond as quickly as possible.
                            </p>

                            {/* Contact Info Cards */}
                            <div className="grid sm:grid-cols-2 gap-4">

                                {/* Address */}
                                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-(--primary-color) transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-(--primary-color)/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-(--primary-color) transition-all duration-300">
                                        <MapPin className="w-6 h-6 text-(--primary-color) group-hover:text-white transition-all duration-300" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">Visit Us</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        {/* {settings.support_address} */}
                                        USA
                                    </p>
                                </div>

                                {/* Phone */}
                                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-(--primary-color) transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-(--primary-color)/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-(--primary-color) transition-all duration-300">
                                        <Phone className="w-6 h-6 text-(--primary-color) group-hover:text-white transition-all duration-300" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">Call Us</h3>
                                    <p className="text-gray-400 text-sm">{settings.support_phone || 'Phone support will be added here.'}</p>
                                </div>

                                {/* Email */}
                                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-(--primary-color) transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-(--primary-color)/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-(--primary-color) transition-all duration-300">
                                        <Mail className="w-6 h-6 text-(--primary-color) group-hover:text-white transition-all duration-300" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">Email Us</h3>
                                    <p className="text-gray-400 text-sm">{settings.support_email}</p>
                                </div>

                                {/* Hours */}
                                <div className="bg-slate-800 rounded-xl p-6 border border-slate-700 hover:border-(--primary-color) transition-all duration-300 group">
                                    <div className="w-12 h-12 bg-(--primary-color)/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-(--primary-color) transition-all duration-300">
                                        <Clock className="w-6 h-6 text-(--primary-color) group-hover:text-white transition-all duration-300" />
                                    </div>
                                    <h3 className="text-white font-semibold mb-2">Working Hours</h3>
                                    <p className="text-gray-400 text-sm">{settings.working_hours_weekdays}</p>
                                    <p className="text-gray-400 text-sm">{settings.working_hours_weekends}</p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="order-2 lg:order-1">
                            <div className="bg-slate-800 rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-700">
                                {submitted ? (
                                    <div className="text-center py-12">
                                        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                        <h3 className="text-2xl font-serif text-white mb-2">Thank You!</h3>
                                        <p className="text-gray-400">We'll get back to you soon.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        {error && (
                                            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                                                {error}
                                            </div>
                                        )}
                                        <div className="grid sm:grid-cols-2 gap-5">
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    placeholder="Name"
                                                    required
                                                    className="w-full text-white px-5 py-4 rounded-lg border bg-slate-800 border-slate-700 hover:border-(--primary-color)  focus:border-(--primary-color) focus:outline-none transition"
                                                />
                                                <span className="absolute right-4 top-4 text-red-500">*</span>
                                            </div>

                                            <div className="relative">
                                                <input
                                                    type="tel"
                                                    name="phone"
                                                    value={formData.phone}
                                                    onChange={handleChange}
                                                    placeholder="Call us anytime"
                                                    className="w-full text-white px-5 py-4 rounded-lg border bg-slate-800 border-slate-700 hover:border-(--primary-color)  focus:border-(--primary-color) focus:outline-none transition"
                                                />
                                            </div>
                                        </div>

                                        <div className="relative">
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="Email"
                                                required
                                                className="w-full text-white px-5 py-4 rounded-lg border bg-slate-800 border-slate-700 hover:border-(--primary-color)  focus:border-(--primary-color) focus:outline-none transition"
                                            />
                                            <span className="absolute right-4 top-4 text-red-500">*</span>
                                        </div>

                                        <div className="relative">
                                            <textarea
                                                name="comment"
                                                value={formData.comment}
                                                onChange={handleChange}
                                                placeholder="Comment"
                                                required
                                                rows="6"
                                                className="w-full text-white px-5 py-4 rounded-lg border bg-slate-800 border-slate-700 hover:border-(--primary-color)  focus:border-(--primary-color) focus:outline-none transition resize-none"
                                            ></textarea>
                                            <span className="absolute right-4 top-4 text-red-500">*</span>
                                        </div>

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full sm:w-auto px-10 py-4 bg-white text-black cursor-pointer hover:bg-(--primary-color) font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mx-auto"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                    <span>SENDING...</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Send className="w-5 h-5" />
                                                    <span>SUBMIT QUERY</span>
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map and Contact Info */}
                <div className="mt-20">
                    {/* Map */}
                    <div className="relative h-[400px] lg:h-[500px]  overflow-hidden mb-8 group">
                        {/* Dark Map Background */}
                        <iframe
                            title="Solarionis Location"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.119763973046!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng&maptype=roadmap&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.land_parcel%7Cvisibility:off&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:poi.park%7Celement:labels.text.stroke%7Ccolor:0x1b1b1b&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d"
                            width="100%"
                            height="100%"
                            style={{
                                border: 0,
                                filter: "invert(90%) hue-rotate(180deg) brightness(85%) contrast(120%)"
                            }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-(--deep-black)/20 group-hover:bg-(--deep-black)/10 transition-all duration-300"></div>

                        {/* Location Pin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full">
                            <div className="relative animate-bounce">
                                <MapPin className="w-12 h-12 text-(--primary-color) drop-shadow-lg" fill="currentColor" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Features />

            <Footer />
        </div>
    );
}
