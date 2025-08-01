
const AnimatedButton = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = "relative px-8 py-4 rounded-lg font-medium uppercase tracking-wider transition-all duration-300 overflow-hidden group";
  const variants = {
    primary: "bg-gray-900 text-white hover:bg-gray-800 hover:shadow-xl hover:scale-105 active:scale-95",
    secondary: "border-2 border-gray-200 text-gray-700 hover:border-gray-800 hover:text-gray-900 hover:shadow-lg"
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} onClick={onClick}>
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </button>
  );
};

export default AnimatedButton;