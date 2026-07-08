import { ArrowRight, Download } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="bg-[#f5f6f7] py-14">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="bg-gradient-to-r from-[#1f8f6a] to-[#23867d] 
                        rounded-3xl px-8 md:px-14 py-12 
                        flex flex-col md:flex-row 
                        items-start md:items-center 
                        justify-between gap-8">

          {/* LEFT CONTENT */}
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-5">
              Ready to Experience <br />
              Premium Home Services?
            </h2>

            <p className="text-white/80 text-base leading-relaxed">
              Download our app or book directly from the website. Your home
              deserves the best care.
            </p>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4">

            {/* Primary Button */}
            <button className="bg-[#f97316] hover:opacity-95 
                               text-white px-6 py-3 
                               rounded-xl text-base font-semibold 
                               flex items-center gap-2 transition">
              Book a Service
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Secondary Button */}
            <button className="border border-white/40 
                               text-white px-6 py-3 
                               rounded-xl text-base font-medium 
                               flex items-center gap-2 
                               hover:bg-white/10 transition">
              <Download className="w-4 h-4" />
              Download App
            </button>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FinalCTASection;