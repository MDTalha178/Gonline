import LoaderContent from "./Loader";

const ComponentLoader = ({ 
  isLoading = false,
  message = "Loading...",
  spinner = true,
  bouncingDots = true,
  overlay = true, // Whether to show overlay or inline
  size = "md", // sm, md, lg
  variant = "default", // default, minimal, elegant, card
  children,
  className = ""
}) => {
  if (!isLoading && children) {
    return children;
  }

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return {
          container: "p-4",
          text: "text-sm",
          title: "text-base",
          spinner: "sm",
          minHeight: "h-20"
        };
      case "lg":
        return {
          container: "p-8",
          text: "text-base",
          title: "text-xl",
          spinner: "lg",
          minHeight: "h-40"
        };
      default: // md
        return {
          container: "p-6",
          text: "text-sm",
          title: "text-lg",
          spinner: "md",
          minHeight: "h-32"
        };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "minimal":
        return {
          bg: "bg-white/80",
          border: "border border-gray-200",
          shadow: "shadow-sm",
          textColor: "text-gray-700",
          titleColor: "text-gray-900"
        };
      case "elegant":
        return {
          bg: "bg-gradient-to-br from-white via-gray-50 to-white",
          border: "border-2 border-gray-100",
          shadow: "shadow-xl",
          textColor: "text-gray-600",
          titleColor: "text-black"
        };
      case "card":
        return {
          bg: "bg-white",
          border: "border border-gray-200",
          shadow: "shadow-lg",
          textColor: "text-gray-600",
          titleColor: "text-gray-900"
        };
      default:
        return {
          bg: "bg-gradient-to-br from-gray-50 via-white to-gray-50",
          border: "border-2 border-dashed border-gray-200",
          shadow: "shadow-lg hover:shadow-xl",
          textColor: "text-gray-600",
          titleColor: "text-black"
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  // Overlay version - covers the component area
  if (overlay && children) {
    return (
      <div className={`relative ${className}`}>
        {children}
        {isLoading && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-lg transition-all duration-300">
            <LoaderContent 
              message={message}
              spinner={spinner}
              bouncingDots={bouncingDots}
              sizeStyles={sizeStyles}
              variantStyles={variantStyles}
              variant={variant}
            />
          </div>
        )}
      </div>
    );
  }

  // Standalone version - replaces the component
  return (
    <div className={`
      ${sizeStyles.container} ${sizeStyles.minHeight}
      ${variantStyles.bg} ${variantStyles.border} ${variantStyles.shadow}
      rounded-2xl transition-all duration-500
      flex items-center justify-center
      ${className}
    `}>
      <LoaderContent 
        message={message}
        spinner={spinner}
        bouncingDots={bouncingDots}
        sizeStyles={sizeStyles}
        variantStyles={variantStyles}
        variant={variant}
      />
    </div>
  );
};

export default ComponentLoader;