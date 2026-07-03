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

      {/* Grid: mobile stacks in DOM order (heading -> image -> description). 
          Desktop uses explicit grid placement so heading+description sit in the left column 
          and the image spans the full right column, matching the original layout. */}
      <div className="w-full grid grid-cols-1 lg:grid-cols-2">
        
        {/* Heading */}
        <div className="lg:col-start-1 lg:row-start-1 px-5 sm:px-6 md:px-12 lg:pl-24 lg:pr-16 pt-10 sm:pt-12 md:pt-16 lg:pt-32 lg:pb-4 flex flex-col justify-end">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
            {data.heading || 'About Hexar Family'}
          </h2>
        </div>

        {/* Image (Flush to the right edge on desktop & Brightened) */}
        <div className="lg:col-start-2 lg:row-start-1 lg:row-span-2 relative min-h-[260px] sm:min-h-[340px] md:min-h-[420px] lg:min-h-[800px] flex">
          
          {/* Fade Gradient: Blends the left edge of the image smoothly into the black background */}
          <div className="absolute top-0 bottom-0 left-0 w-32 lg:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 hidden lg:block"></div>
          
          <img 
            src={`${BASE_URL}${data.imageUrl}`} 
            alt={data.heading || "About Hexar"} 
            // object-center on mobile so the subject isn't cropped oddly, object-right on desktop keeps the original composed crop
            className="w-full h-full object-cover object-center lg:object-right brightness-125 contrast-110"
            onError={(e) => e.target.src = "https://via.placeholder.com/800x800?text=About+Image"}
          />
        </div>

        {/* Description */}
        <div className="lg:col-start-1 lg:row-start-2 px-5 sm:px-6 md:px-12 lg:pl-24 lg:pr-16 pt-6 sm:pt-8 md:pt-10 lg:pt-6 pb-12 sm:pb-16 md:pb-20 lg:pb-32 flex flex-col justify-start">
          {/* Changed text to white and kept whitespace-pre-line for paragraph spacing */}
          <div className="text-white text-base sm:text-lg md:text-xl leading-[1.7] md:leading-[1.8] font-light whitespace-pre-line opacity-95">
            {data.description}
          </div>
        </div>

      </div>
    </section>
  );
}