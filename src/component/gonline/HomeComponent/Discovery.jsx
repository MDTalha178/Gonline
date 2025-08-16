import { use, useEffect, useState } from "react";
import shops, { categories } from "../../../data/shopDiscovery";
import { MapPin, Search, Star } from "lucide-react";
import ComingSoonBanner from "../../common/ComingSoon";
import { useToast } from "../../../hooks/useToast";
import { getStore } from "../../../service/marketPlace/store";
import FullscreenLoader from "../../Loader/FullScreenLoader";
import InfoCard from "../../common/InfoCard";
import ComponentLoader from "../../common/ComponentLoader";
import CardLoader from "../../common/ComLoader";

const ShopDiscoverySection = () => {
  const {toast} = useToast();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [Search]
  const categories = ['All', 'Fashion', 'Electronic', 'Food', 'Beauty', 'Home'];


  useEffect(() =>{
    // Simulate fetching categories from an API or context
    // setCategories(['All', 'Fashion', 'Electronics', 'Food', 'Beauty', 'Home']);
    const fetchStore = async () => {
      // Simulate an API call to fetch shops
      setLoading(true);
      try{
        const response = await getStore(toast);
        if(response && response?.data) setShops(response.data);
      }catch(error){
        toast({
          type: 'error',
          message: 'Failed to fetch shops. Please try again later.'
        });
      }finally {
        setLoading(false);
      }
      
    }
    fetchStore();
  },[setShops])
  
  const filteredShops = selectedCategory === 'All' ? shops : shops.filter(shop => shop.category.name == selectedCategory);


  return (
    <section id="shops" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 text-lg"
              />
              <button className="cursor-pointer absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-200">
                Search
              </button>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`cursor-pointer px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Shop Grid */}
        {loading ? <CardLoader isLoading={loading} message="Hang tight! We're finding the perfect store near by you..."/> : 
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredShops && filteredShops.map((shop, index) => (
            <div
              key={index} 
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {shop.image}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{shop.store_name}</h3>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600 text-sm">{shop.location.city}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-gray-900 font-medium">{shop.rating}</span>
                </div>
              </div>
              <button onClick={() => window.location.href = `/store/${shop.slug}`} className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                Visit Shop
              </button>
            </div>
          ))}
          {filteredShops.length === 0 && <div className="col-span-full flex justify-center">
            <InfoCard
              message="No Shops Found"
              subtitle="Sorry No Shops Found. Change location or category and try again"
            />
          </div>}
          
        </div>
        }
        

        <div className="text-center mt-12">
          <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg border-2 border-purple-600 hover:bg-purple-600 hover:text-white transition-all duration-300 cursor-pointer">
            View All Shops
          </button>
        </div>
      </div>
    </section>
  );
};

export default ShopDiscoverySection;
