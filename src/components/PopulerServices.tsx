import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

import plumbing from "@/assets/plumbing.jpg";
import bathroom from "@/assets/bathroom-cleaning.jpg";
import electrical from "@/assets/electrical.jpg";
import cctv from "@/assets/cctv.jpg";

import { ArrowRight } from "lucide-react";

const items = [
  { img: hero3, label: "AC Service & Repair", badge: "NEW" },
  { img: hero4, label: "Deep Cleaning", badge: "Upcoming" },
  { img: hero1, label: "Hair Care for Women", badge: "Upcoming" },
  { img: hero2, label: "Men's Style Studio", badge: "Upcoming" },
];

const items2 = [
  { img: plumbing, label: "Plumbing", badge: "Upcoming" },
  { img: bathroom, label: "Bathroom Cleaning", badge: "Upcoming" },
  { img: electrical, label: "Electrical Consultation", badge: "Upcoming" },
  { img: cctv, label: "CCTV Installation", badge: "Upcoming" },
];

const PopulerServices = () => {
  return (
    <section className="container mx-auto pl-4 pr-0 md:px-8 py-10">

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Our Popular Services
        </h2>
        <button className="p-2 border border-gray-200 rounded-full hover:bg-gray-100 transition">
          <ArrowRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      {/* First Row (Hero Images) */}
      <div
        className="flex md:grid md:grid-cols-4 gap-3 md:gap-6 mb-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items.map((item, i) => (
          <div key={i} className="group cursor-pointer min-w-[36%] max-w-[132px] md:min-w-0 md:max-w-none flex-shrink-0 md:flex-shrink snap-start">
            <div className="relative rounded-xl overflow-hidden aspect-square mb-3">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {item.badge && (
                <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-gray-900">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Second Row (New Images) */}
      <div
        className="flex md:grid md:grid-cols-4 gap-3 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {items2.map((item, i) => (
          <div key={i} className="group cursor-pointer min-w-[36%] max-w-[132px] md:min-w-0 md:max-w-none flex-shrink-0 md:flex-shrink snap-start">
            <div className="relative rounded-xl overflow-hidden aspect-square mb-3">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="text-sm font-medium text-gray-900">
              {item.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default PopulerServices;
