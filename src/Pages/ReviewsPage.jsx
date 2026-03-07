import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Testimonials from "../components/Sections/Testimonials";

export default function ReviewsPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <div className="pt-10 sm:pt-14 lg:pt-16">
                <Testimonials />
            </div>
            <Footer />
        </div>
    );
}
