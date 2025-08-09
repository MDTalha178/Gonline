import { ShoppingCart, Sparkles, Star, TrendingUp, Zap } from "lucide-react";

const ProductHeaderComponent = () => {
    return(
    <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-gray-400/10 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute bottom-20 left-32 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-20 right-1/3 w-24 h-24 bg-gray-600/5 rounded-full blur-2xl animate-pulse delay-700"></div>
        </div>
        
        {/* Header Content */}
        <div className="relative py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Icon and Sparkles */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="bg-white/10 backdrop-blur-sm p-4 rounded-sm shadow-2xl border border-gray-700">
                    <ShoppingCart className="w-12 h-12 text-white" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-gray-300 animate-pulse" />
                  <Sparkles className="absolute -bottom-1 -left-1 w-4 h-4 text-gray-400 animate-pulse delay-500" />
                  <Sparkles className="absolute top-1/2 -right-4 w-3 h-3 text-white animate-ping delay-1000" />
                </div>
              </div>

              {/* Main Title */}
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                All Products
              </h1>
              
              {/* Subtitle with Icons */}
              <div className="flex flex-wrap items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-sm shadow-lg border border-gray-700">
                  <TrendingUp className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-200 text-sm font-medium">Trending Now</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-sm shadow-lg border border-gray-700">
                  <Zap className="w-4 h-4 text-gray-300" />
                  <span className="text-gray-200 text-sm font-medium">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-sm shadow-lg border border-gray-700">
                  <Star className="w-4 h-4 text-white fill-current" />
                  <span className="text-white text-sm font-medium">Premium Quality</span>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-10">
                Discover our complete collection of premium products carefully selected for you. 
                <br className="hidden md:block" />
                <span className="text-gray-100 font-medium">Quality guaranteed, happiness delivered.</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-gray-900 px-8 py-4 rounded-sm font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 border border-gray-300">
                  🔥 Browse Hot Deals
                </button>
                <button className="bg-gray-700 text-white px-8 py-4 rounded-sm font-semibold hover:bg-gray-600 hover:scale-105 transition-all duration-300 border border-gray-600">
                  ✨ New Arrivals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
}

export default ProductHeaderComponent;