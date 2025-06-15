import CTASection from "./CTASection";
import ShopDiscoverySection from "./Discovery";
import FeaturesSection from "./Feature";
import {ShopLaunch} from "./Hero";
import TestimonialsSection from "./Testomonial";

// Main Homepage Component
const Homepage = () => {

  return (
    <div className="min-h-screen">
        <ShopLaunch />
        <FeaturesSection />
        <ShopDiscoverySection />
        <TestimonialsSection />
        <CTASection />

    </div>
  );

};

export default Homepage;