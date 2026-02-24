import laptopImg from "@/assets/laptop-repair.jpg";
import soundImg from "@/assets/sound-system.jpg";
import desktopImg from "@/assets/desktop-repair.jpg";
import gasImg from "@/assets/gas-appliance.jpg";
import purifierImg from "@/assets/water-purifier.jpg";
import cctvImg from "@/assets/cctv.jpg";

const desktopRepairs = [
  { img: laptopImg, label: "Laptop Repair" },
  { img: soundImg, label: "Sound System" },
  { img: desktopImg, label: "Desktop Repair" },
  { img: gasImg, label: "Gas Appliance" },
  { img: purifierImg, label: "Water Purifier" },
];

const mobileRepairs = [
  ...desktopRepairs,
  { img: cctvImg, label: "CCTV Installation" },
];

const RepairSection = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 pt-6 pb-12 md:py-12">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-gray-900">
          Repair & installation
        </h2>

        <button className="border border-gray-200 rounded-full px-4 py-1.5 text-xs md:text-sm font-medium text-gray-800 hover:bg-gray-100 transition">
          See all
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 md:hidden">
        {mobileRepairs.map((item, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-3 bg-gray-100">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <p className="text-xs font-medium text-gray-900">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      <div className="hidden md:grid md:grid-cols-5 gap-6">
        {desktopRepairs.map((item, i) => (
          <div key={i} className="group cursor-pointer">
            <div className="rounded-2xl overflow-hidden aspect-[4/3] mb-3 bg-gray-100">
              <img
                src={item.img}
                alt={item.label}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            <p className="text-xs md:text-sm font-medium text-gray-900">
              {item.label}
            </p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default RepairSection;
