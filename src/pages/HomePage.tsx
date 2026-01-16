import AppShowcase from "@/components/AppShowcase";
import DriftoBanner from "@/components/DriftoBanner";
import DriftoCTA from "@/components/DriftoCTA";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import HeroComponent from "@/components/HeroComponent";
import Pricing from "@/components/Pricing";
import Navbar from "@/components/ui/navbar";
import WhyDrifto from "@/components/WhyDrifto";

const HomePage = () => {
  return (
    <div>
      <HeroComponent />
      <WhyDrifto />
      <Pricing />
      <AppShowcase />
      <FAQ />
      <DriftoCTA />
      <Footer />
      <DriftoBanner />
    </div>
  );
};

export default HomePage;
