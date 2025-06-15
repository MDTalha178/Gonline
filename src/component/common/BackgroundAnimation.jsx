const BackgroundAnimation = () => {
  return (
     <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-60 animate-bounce"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-orange-200 rounded-full opacity-60 animate-bounce delay-1000"></div>
        <div className="absolute bottom-40 right-10 w-12 h-12 bg-blue-200 rounded-full opacity-60 animate-pulse delay-500"></div>
      </div>
  );
}

export default BackgroundAnimation;