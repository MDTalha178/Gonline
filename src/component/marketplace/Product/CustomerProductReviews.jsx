import { useEffect, useState } from "react";
import { fetchProductReviews } from "../../../service/marketPlace/productReviewsService";
import { useToast } from "../../../hooks/useToast";
import { Star } from "lucide-react";
import { convertISOToDateTime } from "../../../utils/utils";

const CustomerProductReviews = ({ productId, storeId = null }) => {
    const {toast} = useToast()
      const[reviewsData, setreviewsData] = useState([]);
    
      useEffect(()=>{
        // Fetch reviews from API or perform any necessary setup
        // This is a placeholder for actual data fetching logic
        const fetchReviews = async () => {
          try {
            const response = await fetchProductReviews(productId, toast);
            setreviewsData(response?.data);
          } catch (error) {
            toast.error("Error fetching reviews:", error);
          }
        }
        productId && fetchReviews();
        
    },[productId])
    return(
    <div className="space-y-6">
        {reviewsData && reviewsData.map((review, index) => (
          <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-medium">
                {"Talha"}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  {review.is_verified_customer && (
                    <span className="bg-gray-900 text-white px-2 py-1 rounded-none text-xs uppercase tracking-wider">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(review.start_rating)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < review.start_rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{convertISOToDateTime(review.created_at)}</span>
                </div>
                <p className="text-gray-600 font-light leading-relaxed">{review.description}</p>
              </div>
            </div>
          </div>
        ))}
    </div>
    )
}

export default CustomerProductReviews;