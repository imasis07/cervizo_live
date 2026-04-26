import { Link } from "react-router-dom";
import { Clock3, X } from "lucide-react";
import coolerBanner from "@/assets/cooler.png";
import hero3 from "@/assets/hero-3.jpg";

type ServiceItem = {
  id: string;
  title: string;
  subtitle: string;
  startsAt: string;
  duration: string;
  image: string;
  reviews: string;
};

const services: ServiceItem[] = [
  {
    id: "ac-1",
    title: "Air Cooler Basic Service",
    subtitle: "Cleaning, water tank wash, airflow check",
    startsAt: "Rs 299",
    duration: "45 mins",
    image: hero3,
    reviews: "4.7 (27K reviews)",
  },
  {
    id: "ac-2",
    title: "Air Cooler Deep Cleaning",
    subtitle: "Full internal wash, fan cleaning, pad cleaning",
    startsAt: "Rs 499",
    duration: "60 mins",
    image: hero3,
    reviews: "4.6 (18K reviews)",
  },
  {
    id: "ac-3",
    title: "Air Cooler Repair Visit",
    subtitle: "Technician visit for cooling/noise issues",
    startsAt: "Rs 199",
    duration: "40 mins",
    image: hero3,
    reviews: "4.8 (11K reviews)",
  },
  {
    id: "ac-4",
    title: "Motor / Pump Check",
    subtitle: "Pump, motor, wiring inspection and testing",
    startsAt: "Rs 249",
    duration: "50 mins",
    image: hero3,
    reviews: "4.5 (9K reviews)",
  },
];

const AirCoolerServices = () => {
  return (
    <section className="min-h-screen bg-[#f5f6f7]">
      <Link
        to="/"
        aria-label="Close"
        className="hidden md:flex fixed top-4 right-4 z-30 w-10 h-10 rounded-full border border-gray-200 bg-white items-center justify-center text-gray-700 hover:bg-gray-100 transition"
      >
        <X className="w-5 h-5" />
      </Link>

      <div className="max-w-xl mx-auto bg-white min-h-screen border-x border-gray-200 w-full">
          <div className="sticky top-0 z-20 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900">Air Cooler Repair</h1>
            <Link
              to="/"
              aria-label="Close"
              className="md:hidden w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-700 hover:bg-gray-100 transition"
            >
              <X className="w-4 h-4" />
            </Link>
          </div>

          <div className="px-3 md:px-4 pt-4 pb-6">
            <div className="rounded-2xl bg-gradient-to-br from-[#dff4ff] to-[#f0fbff] border border-[#cdefff] overflow-hidden p-4 md:p-5 mb-5 md:max-w-lg md:mx-auto">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-[#1177a7] uppercase tracking-wide">Book Service</p>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900 mt-1">Air Cooler Repair</h2>
                  <p className="text-sm text-gray-600 mt-2">Fast doorstep service by verified technicians</p>
                </div>
                <img
                  src={coolerBanner}
                  alt="Air cooler service"
                  className="w-[86px] h-[112px] md:w-[90px] md:h-[148px] object-contain shrink-0"
                />
              </div>
            </div>

            <div className="space-y-3 md:max-w-lg md:mx-auto">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="rounded-xl border border-gray-200 bg-white p-3.5 md:p-4 shadow-[0_1px_0_rgba(0,0,0,0.03)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm md:text-base font-semibold text-gray-900">{service.title}</h3>

                      <p className="text-xs text-gray-500 mt-1">{service.reviews}</p>

                      <p className="text-sm text-gray-900 mt-2 flex items-center gap-2">
                        <span className="font-semibold">Starts at {service.startsAt}</span>
                        <span className="text-gray-400">|</span>
                        <Clock3 className="w-3.5 h-3.5" />
                        <span className="text-gray-600 text-xs">{service.duration}</span>
                      </p>

                      <div className="mt-3 h-px bg-gray-200" />

                      <p className="text-xs text-gray-600 mt-3">{service.subtitle}</p>

                      <button type="button" className="mt-3 text-[#5b34e6] text-sm font-medium hover:underline">
                        View details
                      </button>
                    </div>

                    <div className="w-20 md:w-24 shrink-0 flex flex-col items-center">
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-20 h-16 md:w-24 md:h-20 object-cover rounded-xl"
                      />
                      <button
                        type="button"
                        className="-mt-2.5 px-3 py-1 rounded-xl border border-[#b6a8ff] bg-white text-[#5b34e6] text-sm font-medium hover:scale-105 transition-transform"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>

    </section>
  );
};

export default AirCoolerServices;
