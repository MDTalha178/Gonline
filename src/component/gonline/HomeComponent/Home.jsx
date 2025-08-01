import { useEffect, useState } from "react";
import Header from "../../common/Header";
import  LoginModal  from "../AuthCompoent/UserTypeModal";
import CTASection from "./CTASection";
import ShopDiscoverySection from "./Discovery";
import FeaturesSection from "./Feature";
import {ShopLaunch} from "./Hero";
import TestimonialsSection from "./Testomonial";
import Footer from "./Footer";
import getSubdomain from "../../../utils/domain";
import setDoummntTitle from "../../../utils/utils";
import FullscreenLoader from "../../Loader/FullScreenLoader";
import StoreHomeMarketPlace from "../../../module/storeMarketPlace/StoreHomeMarketPlace";

// Main Homepage Component
const Homepage = () => {
  
  const [UserTypeModal, setUserTypeModal] = useState(false);
  const [subDomain, setSubDomain] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    setLoading(true);

    const subDomainName = getSubdomain()

    if(subDomainName){
      setSubDomain(subDomainName);
      setDoummntTitle(document,subDomainName)
    }
    setLoading(false);

  },[subDomain])

   if(loading) return <FullscreenLoader  message='Loading..' />

   if(subDomain) return <StoreHomeMarketPlace />

  return (
    <>
      {subDomain}
      <div className="min-h-screen">
        <Header
          leftContent={["Gonline"]} 
          rightContent={["Features", "Explore Shops", "Pricing", "About"]} 
          leftbutton={[]} 
          rightbutton={["Login"]}
          options={{setUserTypeModal}}
        />
        {UserTypeModal && <LoginModal setUserTypeModal={setUserTypeModal} />}
        <ShopLaunch setUserTypeModal={setUserTypeModal} />
        <FeaturesSection />
        <ShopDiscoverySection />
        <TestimonialsSection />
        <CTASection />
        <Footer />

      </div>
    </>
  
  );

};

export default Homepage;