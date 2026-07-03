import React from "react";

const BASE_URL = "https://hexartask.onrender.com";
const VIDEO_URL = "https://www.w3schools.com/html/mov_bbb.mp4";

export default function Mission({ data }) {
  if (!data) return null;

  return (
    <section className="relative bg-black py-12 sm:py-16 md:py-24 overflow-hidden">
      {/* Cross Background — unchanged */}
      <img
        src={`${BASE_URL}${data.imageUrl}`}
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover opacity-90"
      />
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 max-w-full mx-auto ">
        <div className="grid lg:grid-cols-2 items-center gap-6 sm:gap-8 lg:gap-12">
          {/* LEFT — SVG mask + foreignObject, single video, scales naturally via viewBox */}
          <div className="w-full max-w-[480px] sm:max-w-[600px] lg:max-w-none mx-auto">
            <svg width="100%" height="100%" viewBox="0 0 1200 1200">
              <defs>
                <mask id="diamondMask">
                  <rect width="1200" height="1200" fill="black" />

                  <rect
                    x="-460"
                    y="80"
                    width="1020"
                    height="1020"
                    rx="50"
                    ry="50"
                    fill="white"
                    transform="rotate(45 -80 380)"
                  />

                  <rect
                    x="535.5"
                    y="120"
                    width="280"
                    height="280"
                    rx="25"
                    ry="25"
                    fill="white"
                    transform="rotate(45 480 285)"
                  />

                  <rect
                    x="650.5"
                    y="500.5"
                    width="280"
                    height="280"
                    rx="25"
                    ry="25"
                    fill="white"
                    transform="rotate(45 480 565)"
                  />

                  <rect
                    x="800.5"
                    y="270.5"
                    width="280"
                    height="280"
                    rx="25"
                    ry="25"
                    fill="white"
                    transform="rotate(45 670 455)"
                  />
                </mask>
              </defs>

              <foreignObject width="1200" height="1200" mask="url(#diamondMask)">
                <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                  <source src={VIDEO_URL} type="video/mp4" />
                </video>
              </foreignObject>
            </svg>
          </div>

          {/* RIGHT — unchanged, still fully backend-driven */}
          <div className="text-white px-5 sm:px-8 md:px-12 lg:px-20">
            <div className="mb-10 sm:mb-14 lg:mb-20 ">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-5 lg:mb-6">{data.missionTitle}</h2>
              <p className="text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 lg:leading-10 text-gray-300">{data.missionDescription}</p>
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-5 lg:mb-6">{data.visionTitle}</h2>
              <p className="text-base sm:text-lg lg:text-xl leading-7 sm:leading-8 lg:leading-10 text-gray-300">{data.visionDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}