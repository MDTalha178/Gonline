import { useState } from "react";
import shops, { categories } from "./data/shopDiscovery";
import { MapPin, Search, Star } from "lucide-react";
import ComingSoonBanner from "../common/ComingSoon";

const ShopDiscoverySection = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  

  return (
    <section id="shops" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 blur-sm relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Discover Amazing 
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Local Shops</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore thousands of unique shops from merchants around the world. Find exactly what you're looking for.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search shops, products, or locations..."
                disabled
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg cursor-not-allowed opacity-70"
              />
              <button 
                disabled
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full transition-all duration-200 cursor-not-allowed opacity-70"
              >
                Search
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                disabled
                className={`px-6 py-3 rounded-full font-medium cursor-not-allowed opacity-70 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Shop Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shops.map((shop, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 group opacity-70"
            >
              <div className="text-4xl mb-4 transition-transform duration-300">
                {shop.image}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{shop.name}</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">{shop.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-900 font-medium">{shop.rating}</span>
                </div>
              </div>
              <button 
                disabled
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold transition-all duration-200 cursor-not-allowed opacity-70"
              >
                Visit Shop
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            disabled
            className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-purple-600 transition-all duration-300 cursor-not-allowed opacity-70"
          >
            View All Shops
          </button>
        </div>
      </div>

      {/* Coming Soon Overlay */}
      <ComingSoonBanner 
            text1={"We're putting the finishing touches on our amazing shop discovery platform"} 
            text2={"Get ready to explore thousands of unique local shops"}
        />
      
    </section>
  );
};

export default ShopDiscoverySection;