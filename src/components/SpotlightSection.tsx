import spotlight1 from "@/assets/spotlight-1.jpg";
import spotlight2 from "@/assets/spotlight-2.jpg";
import spotlight3 from "@/assets/spotlight-3.jpg";

const SpotlightSection = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 py-12">
      
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
        In the spotlight
      </h2>

      {/* Banner Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Banner 1 */}
        <div className="group cursor-pointer rounded-2xl overflow-hidden">
          <img
            src={spotlight1}
            alt="Banner 1"
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Banner 2 */}
        <div className="group cursor-pointer rounded-2xl overflow-hidden">
          <img
            src={spotlight2}
            alt="Banner 2"
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Banner 3 */}
        <div className="group cursor-pointer rounded-2xl overflow-hidden">
          <img
            src={spotlight3}
            alt="Banner 3"
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

      </div>
    </section>
  );
};

export default SpotlightSection;