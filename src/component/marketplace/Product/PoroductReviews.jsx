import { Star } from "lucide-react";
import { use, useEffect, useState } from "react";
import { fetchProductReviewsAnalytics } from "../../../service/marketPlace/productReviewsService";
import { useToast } from "../../../hooks/useToast";
import { REVIEWS_ANALYTICS_TYPE } from "../../../utils/constant";
import CustomerProductReviews from "./CustomerProductReviews";

const ReviewsComponent = ({productId, storeId=null}) => {

  const {toast} = useToast()
  const[reviewsData, setreviewsData] = useState({});

  useEffect(()=>{
    // Fetch reviews from API or perform any necessary setup
    // This is a placeholder for actual data fetching logic
    const fetchReviews = async () => {
      try {
        const response = await fetchProductReviewsAnalytics(productId, toast);
        setreviewsData(response?.data);
      } catch (error) {
        toast.error("Error fetching reviews:", error);
      }
    }
    productId && fetchReviews();
    
  },[productId])

  return (
    <div className="bg-white rounded-none shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-light text-gray-900 tracking-tight">Customer Reviews</h2>
        <button className="bg-gray-900 text-white px-6 py-3 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider text-sm cursor-pointer">
          Write a Review
        </button>
      </div>

      {reviewsData && <div className="mb-6 p-6 bg-gray-50 rounded-none">
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-4xl font-light text-gray-900">{parseFloat(reviewsData?.average_rating || 0).toFixed(1)}</div>
            <div className="flex items-center justify-center">
              {[...Array(parseInt(reviewsData?.average_rating || 0))].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <div className="text-sm text-gray-600">{reviewsData?.total_reviews} reviews</div>
          </div>
          <div className="flex-1 space-y-2">
            {[5, 4, 3, 2, 1].map((stars) => (
              <div key={stars} className="flex items-center space-x-2">
                <span className="text-sm w-3">{stars}</span>
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gray-900 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${reviewsData[REVIEWS_ANALYTICS_TYPE[stars]]}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-600 w-8">
                  {reviewsData[REVIEWS_ANALYTICS_TYPE[stars]]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
  }

     <CustomerProductReviews productId={productId} storeId={storeId}/>
    </div>
  );
};

export default  ReviewsComponent