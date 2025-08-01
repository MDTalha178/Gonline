import ProductInfo from './ProductInfo';
import ReviewsComponent from './PoroductReviews';
import SimilarProducts from './SimilarProduct';
import OfferDetails from './ProductOffers';

const NewProductDetailsPage = ({productDetailsData}) => {

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
            <span>Home</span>
            <span>/</span>
            <span>{productDetailsData.category.name}</span>
            <span>/</span>
            <span>{productDetailsData?.sub_category?.name || "SubCategory"}</span>
            <span>/</span>
            <span className="text-gray-900 font-medium">{productDetailsData?.product_name}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-16">
          {/* Product Information */}
          <ProductInfo  prdoductData={productDetailsData}/>
          
          {/* Offer Details */}
          <OfferDetails  productId={productDetailsData?.id}/>
          
          {/* Reviews */}
          <ReviewsComponent productId={productDetailsData?.id}/>
          
          {/* Similar Products */}
          <SimilarProducts productId={productDetailsData?.id}/>
        </div>
      </div>
    </div>
  );
};

export default NewProductDetailsPage;