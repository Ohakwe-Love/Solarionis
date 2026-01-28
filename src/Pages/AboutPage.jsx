import StorySection from '../components/Sections/StorySection';
import About from '../components/Sections/AboutSection';
import Showcase from '../components/Sections/Showcase';
import Carousel from '../components/Sections/Carousel';
import Testimonials from '../components/Sections/Testimonials';
import NewsLetter from '../components/Sections/NewsLetter';
import Features from '../components/Sections/Features';

import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <Header />

      <section className="flex items-center page-hero justify-center h-110 group overflow-hidden relative ">
        <div className="text-center">
          <h2 className='text-6xl text-white mb-3'>About</h2>

          <p className='text-2xl'>
            <Link to='/' className='text-white hover:text-[var(--primary-color)] transition'>Home</Link>
            <ChevronRight className='inline mx-2 text-white' />
            <span className='text-[var(--primary-color)]'>About</span>
          </p>
        </div>
      </section>

      <StorySection />

      <About />

      <Carousel />

      <Showcase />

      <Features />

      <NewsLetter />

      <Footer />
    </div>
  );
}