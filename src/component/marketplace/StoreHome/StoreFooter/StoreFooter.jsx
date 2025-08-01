import { ArrowRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import FullscreenLoader from "../../../Loader/FullScreenLoader";
import useStoreDetails from "../../../../hooks/useStoreDetails";
import { useEffect } from "react";
import useStoreDetail from "../../../../hooks/useStoreDetail";
import FooterShimmer from "../../Shimmer/FooterShimmer";

const StoreFooter = ({ storeId, footerData }) => {
    const data  = useStoreDetail(storeId);


    useEffect(() =>{
        console.log(data)
    },[data])
    console.log(data);

    if(!data) return <FooterShimmer/>

    return (
        <footer className="w-full bg-gray-900 text-white">
            {/* Newsletter Section */}
            <div className="w-full border-b border-white/10">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-16">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl font-light mb-4 tracking-tight">
                            {footerData?.newsletter?.heading || "Stay Updated"}
                        </h3>
                        <p className="text-white/70 text-lg font-light leading-relaxed mb-8">
                            {footerData?.newsletter?.description || "Subscribe to our newsletter for exclusive offers and the latest product updates"}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="flex-1 bg-white/10 border border-white/20 rounded-none px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-white/40 transition-colors duration-300"
                            />
                            <button className="bg-white text-gray-900 px-8 py-3 rounded-none font-medium hover:bg-gray-100 transition-all duration-300 uppercase tracking-wider text-sm flex items-center justify-center space-x-2">
                                <span>Subscribe</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <h4 className="text-2xl font-light mb-6 tracking-tight">
                            {data?.store_name|| "Store"}
                        </h4>
                        <p className="text-white/70 font-light leading-relaxed mb-6">
                            {data?.description || "its's and Online store we are happy to server you"}
                        </p>
                        <div className="flex space-x-4">
                            {[
                                { icon: Facebook, href: "#" },
                                { icon: Twitter, href: "#" },
                                { icon: Instagram, href: "#" },
                                { icon: Youtube, href: "#" }
                            ].map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.href}
                                    className="w-10 h-10 bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 hover:border-white/30 transition-all duration-300 group"
                                >
                                    <social.icon className="w-4 h-4 text-white/70 group-hover:text-white transition-colors duration-300" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h5 className="text-lg font-medium mb-6 tracking-wide">
                            {footerData?.quickLinks?.title || "Quick Links"}
                        </h5>
                        <ul className="space-y-3">
                            {(footerData?.quickLinks?.links || [
                                { text: "About Us", href: "#" },
                                { text: "Products", href: "#" },
                                { text: "Services", href: "#" },
                                { text: "Contact", href: "#" },
                                { text: "Blog", href: "#" }
                            ]).map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors duration-300 font-light"
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h5 className="text-lg font-medium mb-6 tracking-wide">
                            {footerData?.customerService?.title || "Customer Service"}
                        </h5>
                        <ul className="space-y-3">
                            {(footerData?.customerService?.links || [
                                { text: "Help Center", href: "#" },
                                { text: "Shipping Info", href: "#" },
                                { text: "Returns", href: "#" },
                                { text: "Size Guide", href: "#" },
                                { text: "Track Order", href: "#" }
                            ]).map((link, index) => (
                                <li key={index}>
                                    <a 
                                        href={link.href}
                                        className="text-white/70 hover:text-white transition-colors duration-300 font-light"
                                    >
                                        {link.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h5 className="text-lg font-medium mb-6 tracking-wide">
                            {footerData?.contact?.title || "Contact Info"}
                        </h5>
                        <div className="space-y-4">
                            <div className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-white/70 mt-0.5 flex-shrink-0" />
                                <p className="text-white/70 font-light">
                                    {data?.location?.address_line_1 + " " + data?.location?.address_line_2 + " " + data?.location?.state}
                                </p>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-white/70 flex-shrink-0" />
                                <a 
                                    href={`tel:${data?.contacts[0].phone_number || ""}`}
                                    className="text-white/70 hover:text-white transition-colors duration-300 font-light"
                                >
                                    {data?.contacts[0].phone_number || ""}
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-white/70 flex-shrink-0" />
                                <a 
                                    href={`mailto:${footerData?.contact?.email || "info@yourstore.com"}`}
                                    className="text-white/70 hover:text-white transition-colors duration-300 font-light"
                                >
                                    {footerData?.contact?.email || "info@yourstore.com"}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="w-full border-t border-white/10">
                <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
                        <p className="text-white/60 text-sm font-light">
                            {footerData?.copyright || `© ${new Date().getFullYear()} Your Store. All rights reserved.`}
                        </p>
                        <div className="flex flex-wrap gap-6">
                            {(footerData?.legal || [
                                { text: "Privacy Policy", href: "#" },
                                { text: "Terms of Service", href: "#" },
                                { text: "Cookie Policy", href: "#" }
                            ]).map((link, index) => (
                                <a 
                                    key={index}
                                    href={link.href}
                                    className="text-white/60 hover:text-white transition-colors duration-300 text-sm font-light"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default StoreFooter;