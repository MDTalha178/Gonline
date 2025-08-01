import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchSimilarProducts } from "../../../service/marketPlace/product_service";
import { useToast } from "../../../hooks/useToast";
import { CURRENCY_ICON_CODE } from "../../../utils/constant";

const SimilarProducts = ({productId, storeId}) => {

  const {toast} = useToast()
    const[prdoductData, setprdoductData] = useState([]);
  
    useEffect(()=>{
      // Fetch reviews from API or perform any necessary setup
      // This is a placeholder for actual data fetching logic
      const fetchReviews = async () => {
        try {
          const response = await fetchSimilarProducts(productId, toast);
          setprdoductData(response?.data);
        } catch (error) {
          toast.error("Error fetching reviews:", error);
        }
      }
      productId && fetchReviews();
      
    },[productId])

  return (
    <div className="bg-white rounded-none shadow-sm p-6">
      <h2 className="text-3xl font-light text-gray-900 mb-8 tracking-tight">Similar Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {prdoductData.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-square overflow-hidden rounded-none border border-gray-200 group-hover:shadow-md transition-all duration-300">
              <img 
                src={"https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300&h=300&fit=crop"} 
                alt={product.product_name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="font-light text-gray-900 group-hover:text-gray-600 transition-colors duration-200">
                {product.name}
              </h3>
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.average_rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="text-sm text-gray-600">({product.total_reviews})</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-light text-gray-900">{CURRENCY_ICON_CODE.INR}{parseInt(product.discount_price)}</span>
                <span className="text-sm text-gray-500 line-through">{CURRENCY_ICON_CODE.INR}{parseInt(product.product_price)}</span>
              </div>
              <button className="w-full bg-gray-900 text-white py-3 px-4 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-sm cursor-pointer">
                Quick View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;