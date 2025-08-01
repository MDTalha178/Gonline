import React from 'react';

const FooterShimmer = () => {
  return (
    <footer className="w-full bg-gray-900 text-white">
      {/* Newsletter Section Shimmer */}
      <div className="w-full border-b border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Newsletter heading shimmer */}
            <div className="h-9 bg-gradient-to-r from-white/10 via-white/20 to-white/10 mb-4 mx-auto w-64 animate-pulse bg-[length:200%_100%] rounded"></div>
            
            {/* Newsletter description shimmer */}
            <div className="space-y-2 mb-8">
              <div className="h-5 bg-gradient-to-r from-white/10 via-white/20 to-white/10 mx-auto w-96 animate-pulse bg-[length:200%_100%] rounded"></div>
              <div className="h-5 bg-gradient-to-r from-white/10 via-white/20 to-white/10 mx-auto w-80 animate-pulse bg-[length:200%_100%] rounded"></div>
            </div>
            
            {/* Newsletter form shimmer */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="flex-1 h-12 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse bg-[length:200%_100%] rounded"></div>
              <div className="h-12 w-32 bg-gradient-to-r from-white/20 via-white/30 to-white/20 animate-pulse bg-[length:200%_100%] rounded"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content Shimmer */}
      <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Company Info Shimmer */}
          <div className="lg:col-span-1">
            {/* Company name shimmer */}
            <div className="h-8 bg-gradient-to-r from-white/10 via-white/20 to-white/10 mb-6 w-32 animate-pulse bg-[length:200%_100%] rounded"></div>
            
            {/* Company description shimmer */}
            <div className="space-y-2 mb-6">
              <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-full animate-pulse bg-[length:200%_100%] rounded"></div>
              <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-5/6 animate-pulse bg-[length:200%_100%] rounded"></div>
              <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-4/5 animate-pulse bg-[length:200%_100%] rounded"></div>
            </div>
            
            {/* Social icons shimmer */}
            <div className="flex space-x-4">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item}
                  className="w-10 h-10 bg-gradient-to-r from-white/10 via-white/20 to-white/10 animate-pulse bg-[length:200%_100%] rounded"
                ></div>
              ))}
            </div>
          </div>

          {/* Quick Links Shimmer */}
          <div>
            {/* Section title shimmer */}
            <div className="h-6 bg-gradient-to-r from-white/10 via-white/20 to-white/10 mb-6 w-24 animate-pulse bg-[length:200%_100%] rounded"></div>
            
            {/* Links shimmer */}
            <ul className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item}>
                  <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-20 animate-pulse bg-[length:200%_100%] rounded"></div>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service Shimmer */}
          <div>
            {/* Section title shimmer */}
            <div className="h-6 bg-gradient-to-r from-white/10 via-white/20 to-white/10 mb-6 w-32 animate-pulse bg-[length:200%_100%] rounded"></div>
            
            {/* Links shimmer */}
            <ul className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <li key={item}>
                  <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-24 animate-pulse bg-[length:200%_100%] rounded"></div>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Shimmer */}
          <div>
            {/* Section title shimmer */}
            <div className="h-6 bg-gradient-to-r from-white/10 via-white/20 to-white/10 mb-6 w-28 animate-pulse bg-[length:200%_100%] rounded"></div>
            
            {/* Contact items shimmer */}
            <div className="space-y-4">
              {/* Address shimmer */}
              <div className="flex items-start space-x-3">
                <div className="w-5 h-5 bg-gradient-to-r from-white/10 via-white/20 to-white/10 mt-0.5 flex-shrink-0 animate-pulse bg-[length:200%_100%] rounded"></div>
                <div className="space-y-1 flex-1">
                  <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-full animate-pulse bg-[length:200%_100%] rounded"></div>
                  <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-3/4 animate-pulse bg-[length:200%_100%] rounded"></div>
                </div>
              </div>
              
              {/* Phone shimmer */}
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gradient-to-r from-white/10 via-white/20 to-white/10 flex-shrink-0 animate-pulse bg-[length:200%_100%] rounded"></div>
                <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-32 animate-pulse bg-[length:200%_100%] rounded"></div>
              </div>
              
              {/* Email shimmer */}
              <div className="flex items-center space-x-3">
                <div className="w-5 h-5 bg-gradient-to-r from-white/10 via-white/20 to-white/10 flex-shrink-0 animate-pulse bg-[length:200%_100%] rounded"></div>
                <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-40 animate-pulse bg-[length:200%_100%] rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar Shimmer */}
      <div className="w-full border-t border-white/10">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-16 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Copyright shimmer */}
            <div className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-48 animate-pulse bg-[length:200%_100%] rounded"></div>
            
            {/* Legal links shimmer */}
            <div className="flex flex-wrap gap-6">
              {[1, 2, 3].map((item) => (
                <div 
                  key={item}
                  className="h-4 bg-gradient-to-r from-white/10 via-white/20 to-white/10 w-20 animate-pulse bg-[length:200%_100%] rounded"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
      `}</style>
    </footer>
  );
};

export default FooterShimmer;