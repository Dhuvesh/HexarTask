import  { useState, useEffect } from 'react';
import BgVideo from '../assets/B4B.mp4';
const BASE_URL = 'https://hexartask.onrender.com';
import Logo from '../assets/hexar-logo1.png';


export default function Banner({ data }) {
  const [current, setCurrent] = useState(0);

  // If no data, show a loading state
  if (!data || data.length === 0) {
    return <div className="h-screen bg-gray-900 animate-pulse" />;
  }

  // Slider controls
  const nextSlide = () => {
    setCurrent(current === data.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? data.length - 1 : current - 1);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [current, data.length]);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover "
      >
        <source src={BgVideo} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/60 to-transparent"></div>

      {/* 2. FIXED TOP NAVBAR */}
      <header className="absolute top-0 left-0 w-full px-4 sm:px-6 md:px-8 py-4 md:py-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-2">
          <img src={Logo} className='h-12 sm:h-20 md:h-32'/>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <button className="border border-red-600 text-red-600 px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 rounded font-medium text-xs sm:text-base hover:bg-red-600 hover:text-white transition-colors">
            Contact Us
          </button>
          <button className="text-white hover:text-red-500 transition-colors">
            <svg width="22" height="22" className="sm:w-7 sm:h-7 md:w-8 md:h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </header>

      <div 
        className="absolute inset-0 z-10 flex w-full h-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {data.map((slide, index) => (
          <div key={index} className="min-w-full h-full flex items-center">
            
            {/* 2-Column Grid inside EVERY slide */}
            <div className="w-full h-full flex flex-col md:grid md:grid-cols-2 md:container md:mx-auto px-4 sm:px-6 md:px-8 items-center pt-16 md:pt-0 pb-28 sm:pb-24 md:pb-0">
              
              {/* RIGHT/TOP ON MOBILE — Sliding Image */}
              <div className="w-full flex items-center justify-center md:justify-end order-1 md:order-2 basis-[38%] md:basis-auto md:h-[80%] shrink-0">
                <img 
                  src={`${BASE_URL}${slide.backgroundImage || slide.imageUrl}`} 
                  alt={slide.title}
                  className="max-h-full max-w-full object-contain drop-shadow-2xl"
                  onError={(e) => e.target.src = "https://via.placeholder.com/600x800?text=No+Image"}
                />
              </div>

              {/* LEFT/BOTTOM ON MOBILE — Sliding Text */}
              <div className="flex flex-col justify-center order-2 md:order-1 flex-1 md:flex-none md:h-screen text-center md:text-left items-center md:items-start">
                <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-6 leading-tight drop-shadow-lg">
                  {slide.title}
                </h1>
                <div className="flex items-center gap-3 md:gap-4">
                  <span className="w-8 md:w-12 h-[2px] bg-white shadow-lg"></span>
                  <p className="text-sm sm:text-lg md:text-2xl text-white font-medium drop-shadow-md">
                    {slide.subtitle || 'Take A Look'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        ))}
      </div>

      {/* 4. FIXED ARROWS (Sits on top of the slider, never moves) */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-24 left-0 w-full z-20 pointer-events-none">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 flex justify-center md:grid md:grid-cols-2">
          {/* Aligned to the left column */}
          <div className="flex justify-center md:justify-start gap-3 md:gap-4 pointer-events-auto">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-red-600 hover:bg-gray-200 transition-transform hover:scale-110 shadow-xl"
            >
              <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>

            <button 
              onClick={nextSlide}
              className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-full flex items-center justify-center text-red-600 hover:bg-gray-200 transition-transform hover:scale-110 shadow-xl"
            >
              <svg width="20" height="20" className="md:w-6 md:h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}