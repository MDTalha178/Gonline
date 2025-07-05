import React from 'react';
import { Edit3, ShoppingCart, Star, Clock, Filter, Truck, Shield, Headphones, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

// Editable wrapper component
const EditableSection = ({ children, sectionName }) => (
  <div className="relative group">
    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
      <button className="bg-purple-600 text-white p-2 rounded-full shadow-lg hover:bg-purple-700 transition-colors">
        <Edit3 className="w-4 h-4" />
      </button>
    </div>
    <div className="relative">
      {children}
    </div>
  </div>
);

// Banner Section Component
const BannerSection = () => (
  <EditableSection sectionName="banner">
    <div className="relative bg-gradient-to-r from-purple-100 to-pink-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Our
              <span className="block bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Amazing Store
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Discover premium products with unbeatable prices and exceptional quality. Your satisfaction is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Shop Now
              </button>
              <button className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors">
                View Catalog
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="w-full h-64 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl flex items-center justify-center">
                <ShoppingCart className="w-24 h-24 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </EditableSection>
);

// Sidebar Filter Component
const FilterSidebar = () => (
  <EditableSection sectionName="filters">
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Categories</h4>
        <div className="space-y-2">
          {['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'].map((category) => (
            <label key={category} className="flex items-center cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="ml-2 text-gray-700">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
        <div className="space-y-2">
          <input type="range" className="w-full accent-purple-600" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>$0</span>
            <span>$1000+</span>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Brand</h4>
        <div className="space-y-2">
          {['Brand A', 'Brand B', 'Brand C', 'Brand D'].map((brand) => (
            <label key={brand} className="flex items-center cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
              <span className="ml-2 text-gray-700">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all">
        Apply Filters
      </button>
    </div>
  </EditableSection>
);

// Deals of the Day Component
const DealsOfTheDay = () => (
  <EditableSection sectionName="deals-today">
    <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-10 text-white -mx-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h2 className="text-4xl font-bold mb-2">Deals of the Day</h2>
          <p className="text-orange-100">Limited time offers - Don't miss out!</p>
        </div>
        
        {/* Countdown Timer */}
        <div className="mt-6 lg:mt-0">
          <div className="text-center mb-4">
            <span className="text-sm font-medium opacity-90">Ends in:</span>
          </div>
          <div className="flex gap-2 justify-center">
            {[
              { label: 'Hours', value: '08' },
              { label: 'Minutes', value: '45' },
              { label: 'Seconds', value: '23' }
            ].map((time, index) => (
              <div key={time.label} className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center min-w-[60px]">
                <div className="text-2xl font-bold">{time.value}</div>
                <div className="text-xs opacity-80">{time.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((deal) => (
          <div key={deal} className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-colors">
            <div className="w-full h-40 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-white/70" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Amazing Product {deal}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold">$29.99</span>
              <span className="text-sm line-through opacity-70">$49.99</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">40% OFF</span>
            </div>
            <button className="w-full bg-white text-red-500 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Grab Deal Now
            </button>
          </div>
        ))}
      </div>
    </div>
  </EditableSection>
);

// Upcoming Deals with Timer Component
const UpcomingDeals = () => (
  <EditableSection sectionName="upcoming-deals">
    <div className="bg-gray-900 rounded-2xl p-10 text-white -mx-8">
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Upcoming Flash Sale</h2>
        <p className="text-gray-300 text-lg">Get ready for amazing deals coming soon!</p>
      </div>
      
      {/* Timer */}
      <div className="flex justify-center mb-10">
        <div className="grid grid-cols-4 gap-6 text-center">
          {[
            { label: 'Days', value: '05' },
            { label: 'Hours', value: '12' },
            { label: 'Minutes', value: '34' },
            { label: 'Seconds', value: '56' }
          ].map((time) => (
            <div key={time.label} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 min-w-[80px]">
              <div className="text-3xl font-bold">{time.value}</div>
              <div className="text-sm opacity-80">{time.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-full h-32 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <div className="text-sm font-medium mb-2">Product {item}</div>
            <div className="text-purple-400 font-bold text-lg">Up to 60% OFF</div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all text-lg">
          Notify Me
        </button>
      </div>
    </div>
  </EditableSection>
);

// Featured Products Component
const FeaturedProducts = () => (
  <EditableSection sectionName="featured-products">
    <div className="-mx-4">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Discover our handpicked selection of premium products that our customers love most
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((product) => (
          <div key={product} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            <div className="relative">
              <div className="w-full h-56 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <ShoppingCart className="w-20 h-20 text-gray-400" />
              </div>
              <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                NEW
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3 text-lg">Premium Product {product}</h3>
              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-2">(4.8)</span>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">$99.99</span>
                  <span className="text-sm text-gray-500 line-through ml-2">$129.99</span>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                  23% OFF
                </span>
              </div>
              
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-12">
        <button className="border-2 border-purple-600 text-purple-600 px-10 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors text-lg">
          View All Products
        </button>
      </div>
    </div>
  </EditableSection>
);

// Footer Component
const Footer = () => (
  <EditableSection sectionName="footer">
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
            <p className="text-gray-400 mb-4">
              Your trusted partner for quality products and exceptional service. Shop with confidence.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['About Us', 'Contact', 'FAQ', 'Shipping Info', 'Returns'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    {link}
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
                    {category}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-3">
                <Headphones className="w-5 h-5 text-purple-400" />
                <span className="text-gray-400">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-6">Subscribe to our newsletter for exclusive deals and updates</p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto gap-4">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-full bg-gray-800 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Your Store. All rights reserved. | Powered by GoLine
          </p>
        </div>
      </div>
    </footer>
  </EditableSection>
);

// Main Template Component
const ShopTemplate = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner Section */}
      <BannerSection />
      
      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <div className="lg:w-1/5">
            <FilterSidebar />
          </div>
          
          {/* Main Content */}
          <div className="lg:w-4/5 space-y-12">
            {/* Deals of the Day */}
            <DealsOfTheDay />
            
            {/* Upcoming Deals */}
            <UpcomingDeals />
            
            {/* Featured Products */}
            <FeaturedProducts />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ShopTemplate;