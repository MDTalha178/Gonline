export const Spinner = ({ size = 'md', className = '' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-8 h-8',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16'
    };

    return (
      <div className={`${sizeClasses[size]} ${className}`}>
        <div className="relative w-full h-full pointer-events-none">
          <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-transparent border-t-purple-600 rounded-full animate-spin"></div>
          <div className="absolute inset-1 border-2 border-transparent border-t-pink-500 rounded-full animate-spin " style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
        </div>
      </div>
    );
  };

const ButtonLoader = (
    {   loading = true, 
        children = "Submit", 
        disabled = false, 
        type = "button",
        className='',
        handleSubmit={handleSubmit}
    }) => (
    <button 
      disabled={disabled || loading}
      className={className}
      type={type}
      onClick={handleSubmit}
    >
      {loading ? (
        <>
          <Spinner size="sm" className="mr-2" />
          Loading...
        </>
      ) : (
        children
      )}
    </button>
  );
export default ButtonLoader