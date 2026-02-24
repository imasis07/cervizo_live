import { TrendingUp, Users, Shield } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Grow Your Business",
    desc: "Get access to thousands of potential customers in your area",
  },
  {
    icon: Users,
    title: "Regular Work",
    desc: "Consistent job opportunities to keep your schedule full",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    desc: "Guaranteed on-time payments directly to your account",
  },
];

const PartnerSection = () => {
  return (
    <section className="bg-[#f5f6f7] py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-start">

        {/* LEFT SIDE */}
        <div>
          <span className="inline-block bg-[#fdebd3] text-[#f97316] text-xs md:text-sm font-medium px-3 md:px-4 py-1.5 md:py-2 rounded-full mb-4 md:mb-6">
            Partner With Us
          </span>

          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4 md:mb-6">
            Grow Your Business With{" "}
            <span className="text-[#1f8f6a]">Cervizo</span>
          </h2>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 md:mb-8 max-w-xl">
            Are you a skilled professional? Join our network of trusted service
            providers and take your business to the next level. We bring
            customers to you!
          </p>

          {/* DESKTOP BUTTON (slightly smaller now) */}
          <button className="hidden md:inline-flex items-center gap-2 bg-[#1f8f6a] text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition shadow-sm">
            Become a Partner
            <span>→</span>
          </button>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4 md:space-y-5">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl md:rounded-2xl p-4 md:p-5 shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-3 md:gap-4">
                <div className="bg-[#e6f4ef] p-3 md:p-4 rounded-lg md:rounded-xl">
                  <feature.icon className="w-4 h-4 md:w-5 md:h-5 text-[#1f8f6a]" />
                </div>
                <div>
                  <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-snug">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* MOBILE BUTTON */}
          <button className="md:hidden inline-flex items-center gap-2 bg-[#1f8f6a] text-white px-6 py-3 rounded-full text-sm font-medium hover:opacity-90 transition shadow-sm">
            Become a Partner
            <span>→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PartnerSection;