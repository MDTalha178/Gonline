import CTASection from "./CTASection";
import ShopDiscoverySection from "./Discovery";
import FeaturesSection from "./Feature";
import HeroComponent from "./Hero";
import TestimonialsSection from "./Testomonial";

// Main Homepage Component
const Homepage = () => {

  return (
    <div className="min-h-screen">
        <HeroComponent />
        <FeaturesSection />
        <ShopDiscoverySection />
        <TestimonialsSection />
        <CTASection />

    </div>
  );

};

export default Homepage;