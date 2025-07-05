import { useState } from "react";
import Header from "../../common/Header";
import  LoginModal  from "../AuthCompoent/UserTypeModal";
import CTASection from "./CTASection";
import ShopDiscoverySection from "./Discovery";
import FeaturesSection from "./Feature";
import {ShopLaunch} from "./Hero";
import TestimonialsSection from "./Testomonial";

// Main Homepage Component
const Homepage = () => {
  
  const [UserTypeModal, setUserTypeModal] = useState(false);


  return (
    <div className="min-h-screen">
        <Header
          leftContent={["Gonline"]} 
          rightContent={["Features", "Explore Shops", "Pricing", "About"]} 
          leftbutton={[]} 
          rightbutton={["Login"]}
          options={{setUserTypeModal}}
        />
        {UserTypeModal && <LoginModal setUserTypeModal={setUserTypeModal} />}
        <ShopLaunch />
        <FeaturesSection />
        <ShopDiscoverySection />
        <TestimonialsSection />
        <CTASection />

    </div>
  );

};

export default Homepage;