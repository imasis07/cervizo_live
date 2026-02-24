import { useRef, useState } from "react";

import carService from "@/assets/car-service.jpg";
import bikeRepair from "@/assets/bike-repair.jpg";
import carWash from "@/assets/car-washing.jpg";

const autoCareServices = [
  { img: carService, label: "Car Service on the Road" },
  { img: bikeRepair, label: "Bike Repair on the Road" },
  { img: carWash, label: "Car Washing Anywhere" },
];

const AutoCareSection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const maxScroll = slider.scrollWidth - slider.clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      return;
    }

    setScrollProgress(slider.scrollLeft / maxScroll);
  };

  const indicatorMaxTravel = 44;
  const indicatorX = indicatorMaxTravel * scrollProgress;

  return (
    <section className="container mx-auto px-4 md:px-8 py-10 md:py-12">
      
      {/* Heading */}
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
        Auto Care
      </h2>

      {/* Cards */}
      <div
        ref={sliderRef}
        onScroll={handleScroll}
        className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {autoCareServices.map((service, i) => (
          <div key={i} className="group cursor-pointer min-w-full max-w-full md:min-w-0 md:max-w-none flex-shrink-0 md:flex-shrink">
            
            {/* Banner Image */}
            <div className="rounded-2xl overflow-hidden aspect-[16/9] bg-gray-100">
              <img
                src={service.img}
                alt={service.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="md:hidden mt-3 flex justify-center">
        <div className="w-16 h-1 rounded-full bg-gray-200">
          <div
            className="w-5 h-1 rounded-full bg-gray-600 transition-transform duration-150"
            style={{ transform: `translateX(${indicatorX}px)` }}
          />
        </div>
      </div>

    </section>
  );
};

export default AutoCareSection;
