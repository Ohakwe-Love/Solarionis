import NewsLetter from '../components/Sections/NewsLetter';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';
import image from '../assets/images/hero/about.webp';
import VisionMission from '../components/Sections/VisionMission';


export default function AboutPage() {
  return (
    <div>
      <section className="p-0 sm:5 w-full h-[100vh]">
        <div className="page-hero-content gradient relative rounded-4xl sm:rounded-t-none w-full h-full overflow-hidden z-1">
          <Header />
          <div className='absolute top-0 left-0 w-full h-full z-[-1]'>
            <img src={image} alt="" className='w-full h-full' />
          </div>

          <div className='max-w-[600px] ml-auto h-[400px] p-8 text-white'>
            <div className="flex items-center justify-start gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Zap className="w-4 h-4 text-[var(--electric-blue)]" />
              </div>
              <span className="text-sm uppercase tracking-wider">Investors For Everyone</span>
            </div>
            <h1 className="text-6xl sm:text-6xl font-bold mb-6">
              <span className='text-(--solar-gold)'>Powering</span> <br /> Sustainable <br /> Infrastructure
            </h1>
            <p className="text-lg max-w-3xl mx-auto mb-5">
              Whether you are an individual looking to start with $100 or an institution seeking significant allocations,
              Solarionis provides a pathway to renewable energy ownership.
            </p>
            <Link to='/contact' className='btn btn-primary rounded'>Contact</Link>
          </div>
        </div>
      </section>

      <VisionMission />

      <NewsLetter />

      <Footer />
    </div>
  );
}