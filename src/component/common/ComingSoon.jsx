const ComingSoonBanner = ({text1, text2}) =>{
    return(
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl px-12 py-8 shadow-2xl border border-purple-200 text-center max-w-lg mx-4">
          <div className="text-6xl mb-4">🚀</div>
          <h3 className="text-3xl font-bold text-gray-900 mb-3">Coming Soon!</h3>
          <p className="text-lg text-gray-600 mb-4">
            {text1}
          </p>
          <p className="text-sm text-purple-600 font-medium">
           {text2}
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
            <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
          </div>
        </div>
    </div>
    )
}

export default ComingSoonBanner

//  We're putting the finishing touches on our amazing shop discovery platform.
//  Get ready to explore thousands of unique local shops