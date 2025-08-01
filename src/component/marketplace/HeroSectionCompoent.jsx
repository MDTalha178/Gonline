const HeroSectionCompoent = ({bannerData}) => {

   return (
    <div className="relative overflow-hidden">
      <div className={`relative bg-gradient-to-br ${bannerData?.bgColorFromn || 'from-gray-50'} ${bannerData?.bgColorTod || 'to-white'} overflow-hidden min-h-screen`}>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large geometric shapes */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-gray-200/20 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-gray-300/15 to-transparent rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-gradient-to-r from-gray-100/10 to-transparent rounded-full blur-2xl animate-float-slow"></div>
          
          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-gray-400/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${4 + Math.random() * 4}s`
              }}
            ></div>
          ))}
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-grid-pattern animate-grid-slide"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-left min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 px-4 py-2 rounded-full text-sm font-medium text-gray-700 animate-fade-in-up">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>New Collection Available</span>
              </div>
              
              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-7xl font-thin text-gray-900 leading-tight animate-fade-in-up delay-200">
                  <span className="block">{bannerData?.mainHeading?.text || "Discover"}</span>
                  <span className={`block bg-gradient-to-r ${bannerData?.textColorFroms || 'from-gray-800'} ${bannerData?.textColorTos || 'to-gray-600'} bg-clip-text text-transparent font-light animate-shimmer-text`}>
                    {bannerData?.highlightedText?.text || "Premium Products"}
                  </span>
                </h1>
                
                {/* Animated underline */}
                <div className="w-32 h-1 bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 animate-expand-line"></div>
              </div>
              
              {/* Description */}
              <p className="text-xl text-gray-600 leading-relaxed font-light animate-fade-in-up delay-400 max-w-lg">
                {bannerData?.description?.text || "Explore our carefully curated selection of premium products designed to elevate your lifestyle and exceed your expectations."}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-600">
                <button className={`group bg-gradient-to-r ${bannerData?.textColorFroms || 'from-gray-800'} ${bannerData?.textColorTos || 'to-gray-700'} text-white px-10 py-4 font-medium hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 cursor-pointer relative overflow-hidden`}>
                  <span className="relative z-10">{bannerData?.primaryButtonText?.text || "Shop Now"}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-10 py-4 font-medium hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 cursor-pointer relative overflow-hidden group">
                  <span className="relative z-10">{bannerData?.secondaryButtonText?.text || "Learn More"}</span>
                  <div className="absolute inset-0 bg-gray-50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </button>
              </div>
              
              {/* Stats */}
              <div className="flex space-x-8 pt-8 animate-fade-in-up delay-800">
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 animate-count-up">10k+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 animate-count-up">500+</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-light text-gray-900 animate-count-up">24/7</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wider">Support</div>
                </div>
              </div>
            </div>
            
            {/* Right Content - Image */}
            <div className="relative animate-fade-in-up delay-300">
              {/* Floating elements around image */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center shadow-lg animate-float">
                <div className="w-6 h-6 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full flex items-center justify-center shadow-lg animate-float delay-500">
                <div className="text-2xl">✨</div>
              </div>
              
              {/* Main image container */}
              <div className="relative bg-white/80 backdrop-blur-sm border border-gray-200/50 shadow-2xl p-8 transform hover:scale-105 transition-all duration-700 group">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <img 
                  className="w-full h-80 bg-gradient-to-br from-gray-100 to-gray-200 object-cover relative z-10" 
                  alt="Banner image" 
                  src={bannerData?.bannerImage || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='200' y='150' font-family='Arial' font-size='18' fill='%23888' text-anchor='middle' dy='6'%3EProduct Image%3C/text%3E%3C/svg%3E"}
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-8 left-8 w-full h-full bg-gradient-to-br from-gray-200/30 to-gray-300/30 blur-xl"></div>
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.1); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes expand-line {
          0% { width: 0; }
          100% { width: 128px; }
        }
        
        @keyframes shimmer-text {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes bounce-slow {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
        
        @keyframes grid-slide {
          0% { transform: translateX(0) translateY(0); }
          100% { transform: translateX(20px) translateY(20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 8s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-expand-line {
          animation: expand-line 1s ease-out forwards;
        }
        
        .animate-shimmer-text {
          background-size: 200% 100%;
          animation: shimmer-text 3s ease-in-out infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        
        .animate-grid-slide {
          animation: grid-slide 20s linear infinite;
        }
        
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
        
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
        .delay-500 { animation-delay: 0.5s; }
        .delay-600 { animation-delay: 0.6s; }
        .delay-800 { animation-delay: 0.8s; }
        .delay-1000 { animation-delay: 1s; }
      `}</style>
    </div>
  );
}

export default HeroSectionCompoent