import { Award, Heart, RotateCcw, Share, Shield, ShoppingCart, Star, Truck } from "lucide-react";
import { useState } from "react";
import { CURRENCY_ICON_CODE } from "../../../utils/constant";

const ProductInfo = ({prdoductData}) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const images = [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&h=600&fit=crop'
  ];

  return (
    <div className="bg-white rounded-none shadow-sm p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-none border border-gray-200">
            <img 
              src={images[selectedImage]} 
              alt="Product" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`aspect-square rounded-none overflow-hidden border-2 transition-all duration-200 ${
                  selectedImage === index ? 'border-gray-900' : 'border-gray-200 hover:border-gray-400'
                }`}
              >
                <img src={img} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
              {prdoductData?.product_name}
            </h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(Math.floor(prdoductData?.average_rating))].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-600">{parseFloat(prdoductData?.average_rating.toString())} Total:{prdoductData?.total_reviews} reviews</span>
              </div>
            </div>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-light text-gray-900">{CURRENCY_ICON_CODE.INR}{parseInt(prdoductData.product_price)}</span>
              <span className="text-xl text-gray-500 line-through">{CURRENCY_ICON_CODE.INR}{parseInt(prdoductData?.discount_price)}</span>
              <span className="bg-gray-900 text-white px-3 py-1 rounded-none text-sm font-medium uppercase tracking-wider">
                20% OFF
              </span>
            </div>
          </div>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 font-light leading-relaxed">
              {prdoductData.product_description || 'No description available for this product.'}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Truck className="w-4 h-4 text-gray-600" />
             <span className="text-gray-700">
                {prdoductData.free_shipping ? (
                    'Free shipping'
                ) : (
                    <span style={{ color: 'red' }}>❌ Free Shipping</span>
                )}
            </span>

            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">2-year warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">30-day returns</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-gray-600" />
              <span className="text-gray-700">Premium quality</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border border-gray-300 rounded-none">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                -
              </button>
              <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                +
              </button>
            </div>
            <button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-none font-medium hover:bg-gray-800 transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-wider">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <Heart className="w-5 h-5" />
              <span>Add to Wishlist</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
              <Share className="w-5 h-5" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;