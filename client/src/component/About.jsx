import React from 'react';

const BASE_URL = 'https://hexartask.onrender.com';

export default function About({ data }) {
  if (!data) return null;

  // The list of services for the ticker
  const services = [
    "3D Characters", "Concept Art 3D", "Technical Art", 
    "Hair Assets", "Animation", "Environment Art"
  ];

  return (
    <section className="bg-[#050505] overflow-hidden w-full">
      
      {/* Custom Style for Flawless Infinite Marquee */}
      <style>
        {`
          @keyframes infinite-scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-infinite-scroll {
            display: flex;
            width: max-content;
            animation: infinite-scroll 30s linear infinite;
          }
          @media (max-width: 768px) {
            .animate-infinite-scroll {
              animation-duration: 18s;
            }
          }
        `}
      </style>

      
      <div className="border-y border-gray-800 py-3 md:py-4 bg-[#0a0a0a] w-full overflow-hidden flex">
        <div className="animate-infinite-scroll">
          {/* We render the list twice inside the scrolling container for a seamless loop */}
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center">
              {services.map((service, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-white text-base sm:text-lg md:text-2xl px-4 sm:px-6 md:px-8 lg:px-16 whitespace-nowrap">
                    {service}
                  </span>
                  {/* The Dot Separator */}
                  <span className="text-white text-sm sm:text-base md:text-xl">•</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      
      <div className="w-full flex flex-col lg:flex-row items-stretch justify-between">
        
        {/* Left Side: Text Content (Padded) */}
        <div className="lg:w-1/2 w-full px-5 sm:px-6 md:px-12 lg:pl-24 lg:pr-16 py-12 sm:py-16 md:py-20 lg:py-32 flex flex-col justify-center">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight mb-5 sm:mb-6 md:mb-8">
            {data.heading || 'About Hexar Family'}
          </h2>
          
          {/* Changed text to white and kept whitespace-pre-line for paragraph spacing */}
          <div className="text-white text-base sm:text-lg md:text-xl leading-[1.7] md:leading-[1.8] font-light whitespace-pre-line opacity-95">
            {data.description}
          </div>
        </div>

        {/* Right Side: Image (Flush to the right edge & Brightened) */}
        <div className="lg:w-1/2 w-full relative min-h-[300px] sm:min-h-[400px] lg:min-h-[800px] flex">
          
          {/* Fade Gradient: Blends the left edge of the image smoothly into the black background */}
          <div className="absolute top-0 bottom-0 left-0 w-32 lg:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 hidden lg:block"></div>
          {/* Top fade for mobile/tablet stacked layout */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-[#050505] to-transparent z-10 lg:hidden"></div>
          
          <img 
            src={`${BASE_URL}${data.imageUrl}`} 
            alt={data.heading || "About Hexar"} 
            // object-right keeps it aligned right, brightness-125 contrast-110 makes the image pop
            className="w-full h-full object-cover object-right brightness-125 contrast-110"
            onError={(e) => e.target.src = "https://via.placeholder.com/800x800?text=About+Image"}
          />
        </div>

      </div>
    </section>
  );
}