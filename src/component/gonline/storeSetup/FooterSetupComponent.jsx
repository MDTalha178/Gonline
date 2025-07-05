import { Facebook, Headphones, Instagram, Shield, ShoppingCart, Truck, Twitter, Youtube } from "lucide-react"
import EditableText from "./EditableTextComponent"
import EditableButton from "./EditableButton"

const FooterSetupComponent = ({handleInputChange}) => {
    return(
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Your Store
              </span>
            </div>
            <EditableText value="Your trusted partner for quality products and exceptional service. Shop with confidence." onChange={(value) => handleOnChange('brand', value)} className="text-gray-400 mb-4" placeholder="Enter brand name" elementType="brand" />
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <EditableText value="Quick Links" onChange={(value) => handleInputChange('quickLinks', value)} className="text-lg font-semibold mb-4" placeholder="Enter quick links heading" elementType="quickLinks" />
            <ul className="space-y-2">
              {['About Us', 'Contact', 'FAQ', 'Shipping Info', 'Returns'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <EditableText value={link} onChange={(value) => handleInputChange('quickLinks', value)}  placeholder="Enter quick link" elementType="quickLinks" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'].map((category) => (
                <li key={category}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <EditableText value={category} onChange={(value) => handleInputChange('category', value)} placeholder="Enter category" elementType="category" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <EditableText value={"Customer Service"} onChange={(value) => handleInputChange('customerService', value)} className="text-lg font-semibold mb-4" placeholder="Enter customer service heading" elementType="customerService" />
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-purple-400" />
                <EditableText value={"Free Shipping"} onChange={(value) => handleInputChange('freeShipping', value)} className="text-gray-400" placeholder="Enter free shipping text" elementType="freeShipping" />
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <EditableText value={"Secure Payment"} onChange={(value) => handleInputChange('securePayment', value)} className="text-gray-400" placeholder="Enter secure payment text" elementType="securePayment" />
              </div>
              <div className="flex items-center space-x-3">
                <Headphones className="w-5 h-5 text-purple-400" />
                <EditableText value={"24/7 Support"} onChange={(value) => handleInputChange('support', value)} className="text-gray-400" placeholder="Enter 24/7 support text" elementType="support" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <EditableText value={"Stay Updated"} onChange={(value) => handleInputChange('subscribe', value)} className="text-xl font-semibold mb-4" placeholder="Enter subscribe heading" elementType="subscribe" />
            <EditableText value={"Subscribe to our newsletter for exclusive deals and updates"} onChange={(value) => handleOnChange('subscribe', value)} className="text-gray-400 mb-6" placeholder="Enter subscribe subheading" elementType="subscribe" />    
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
               <EditableButton
                    value=" Subscribe"
                    onChange={(value) => handleInputChange('secondaryButtonText', value)}
                    buttonClassName="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all" 
                />
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            <EditableText value={"© 2024 Your Store. All rights reserved. | Powered by GoLine"} onChange={(value) => handleOnChange('copyright', value)} className="font-semibold" placeholder="Enter copyright" elementType="copyright" />
          </p>
        </div>
      </div>
    </footer>
    )
}

export default FooterSetupComponent