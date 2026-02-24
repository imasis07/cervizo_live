import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AppliancesSection from "@/components/AppliancesSection";
import PopulerServices from "@/components/PopulerServices";
import RepairSection from "@/components/RepairSection";
import Footer from "@/components/Footer";
/*import SpotlightSection from "@/components/SpotlightSection";*/
import AutoCareSection from "@/components/AutoCareSection";
import PartnerSection from "@/components/PartnerSection";
import FinalCTASection from "@/components/FinalCTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <div className="h-2 bg-gray-100 w-full" />
        <AppliancesSection />
        {/*<SpotlightSection />*/}
        <RepairSection />
        <div className="h-2 bg-gray-100 w-full" />
        <AutoCareSection />
        <div className="h-2 bg-gray-100 w-full" />
        <PopulerServices />
      <PartnerSection />
      <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
