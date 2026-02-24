import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import hero3 from "@/assets/hero-3.jpg";
import hero4 from "@/assets/hero-4.jpg";

import {
  Monitor,
  Refrigerator,
  Wind,
  Droplets,
  Car,
  Wrench
} from "lucide-react";

const services = [
  {
    icon: Monitor,
    title: "Gadgets",
    desc: "Laptop & TV repair",
    bg: "bg-blue-500"
  },
  {
    icon: Refrigerator,
    title: "Appliances",
    desc: "Fridge & washing machine",
    bg: "bg-pink-500"
  },
  {
    icon: Wind,
    title: "Cooling",
    desc: "AC installation & repair",
    bg: "bg-orange-500"
  },
  {
    icon: Droplets,
    title: "Purifier",
    desc: "RO service & filter change",
    bg: "bg-purple-500"
  },
  {
    icon: Car,
    title: "Auto Care",
    desc: "Car & bike service",
    bg: "bg-green-500"
  },
  {
    icon: Wrench,
    title: "Cleaning & Plumbing",
    desc: "Home cleaning & pipe fix",
    bg: "bg-cyan-500"
  }
];

const HeroSection = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 pt-8 pb-6 md:py-14">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

        {/* LEFT SIDE */}
        <div>
          <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-10 leading-tight">
            Smart Services for Smart <br /> Homes
          </h1>

          {/* 3 per row, 2 rows */}
          <div className="grid grid-cols-3 gap-4">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-all duration-300 cursor-pointer"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.bg} mb-4`}>
                  <s.icon className="w-6 h-6 text-white" />
                </div>

                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {s.title}
                </h3>

                <p className="hidden md:block text-xs text-gray-500 leading-tight">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE - UNTOUCHED */}
        <div className="hidden lg:grid grid-cols-2 gap-3">
          <img src={hero1} alt="Salon service" className="rounded-xl object-cover w-full h-56" />
          <img src={hero2} alt="Barber service" className="rounded-xl object-cover w-full h-56" />
          <img src={hero4} alt="Cleaning service" className="rounded-xl object-cover w-full h-56" />
          <img src={hero3} alt="AC repair service" className="rounded-xl object-cover w-full h-56" />
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
