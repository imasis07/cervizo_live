import { useEffect, useRef, useState } from "react";
import { Hand } from "lucide-react";

import acImg from "@/assets/cooler.png";
import washingImg from "@/assets/washing-machine.png";
import fridgeImg from "@/assets/refrigerator.png";
import tvImg from "@/assets/tv.png";

const appliances = [
  { img: acImg, label: "Air Cooler" },
  { img: washingImg, label: "Washing Machine" },
  { img: fridgeImg, label: "Refrigerator" },
  { img: tvImg, label: "Television" },
];

const AppliancesSection = () => {
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const hasShownHintRef = useRef(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isDesktop || reduceMotion) return;

    const section = sectionRef.current;
    if (!section) return;

    let hideTimeout: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting || hasShownHintRef.current) return;

        hasShownHintRef.current = true;
        setShowSwipeHint(true);

        hideTimeout = window.setTimeout(() => {
          setShowSwipeHint(false);
        }, 1800);
      },
      { threshold: 0.45 },
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (hideTimeout) window.clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <section ref={sectionRef} className="container mx-auto px-4 md:px-8 pt-6 pb-10 md:py-10">
      <h2 className="text-xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
        Home appliances
      </h2>

      <div className="relative">
        {showSwipeHint && (
          <div className="absolute inset-0 z-20 pointer-events-none md:hidden">
            <div className="absolute top-1/2 -translate-y-1/2 right-6 animate-[swipeHintRtl_1.2s_ease-in-out_1]">
              <div className="w-11 h-11 rounded-full bg-black/60 text-white flex items-center justify-center shadow-lg">
                <Hand className="w-5 h-5" />
              </div>
            </div>
          </div>
        )}

        <div
          className="flex md:grid md:grid-cols-4 gap-4 md:gap-6 overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none pb-2 md:pb-0 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {appliances.map((a) => (
            <div
              key={a.label}
              className="rounded-2xl p-4 md:p-6 bg-gradient-to-b from-gray-100 to-[#dfe9e4]
                       hover:shadow-md transition-all duration-300 cursor-pointer
                       flex flex-col justify-between h-36 md:h-48 min-w-[150px] md:min-w-0
                       flex-shrink-0 md:flex-shrink snap-start"
            >
              {/* Service Name - Top Left */}
              <span className="text-xs md:text-sm font-semibold text-gray-800">
                {a.label}
              </span>

              {/* Center Image */}
              <div className="flex items-center justify-center flex-1">
                <img
                  src={a.img}
                  alt={a.label}
                  className="h-20 md:h-28 object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AppliancesSection;
