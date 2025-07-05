 const BouncingDots = ({ className = '' }) => (
    <div className={`flex space-x-1 justify-center ${className}`}>
      <div className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
    </div>
  );


export default BouncingDots;