import React, { useState } from 'react';
import { AlertCircle, Database, RefreshCw, Search, Sparkles, Zap } from 'lucide-react';

const InfoCard = ({ 
  message = "Data not available",
  subtitle = "No information found for this section",
  icon: CustomIcon = null,
  showRefreshButton = false,
  onRefresh = null,
  variant = "default", // "default", "empty", "error", "search"
  size = "medium" // "small", "medium", "large"
}) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Icon selection based on variant
  const getIcon = () => {
    if (CustomIcon) return CustomIcon;
    
    switch (variant) {
      case "error":
        return AlertCircle;
      case "empty":
        return Database;
      case "search":
        return Search;
      default:
        return Sparkles;
    }
  };

  // Enhanced styling with gradients and animations
  const getVariantStyles = () => {
    switch (variant) {
      case "error":
        return {
          bg: "bg-gradient-to-br from-red-50 via-pink-50 to-red-100",
          iconColor: "text-red-500",
          titleColor: "text-red-900",
          subtitleColor: "text-red-600",
          border: "border-red-200",
          glow: "shadow-red-200/50",
          accent: "from-red-400 to-pink-500"
        };
      case "empty":
        return {
          bg: "bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100",
          iconColor: "text-blue-500",
          titleColor: "text-blue-900",
          subtitleColor: "text-blue-600",
          border: "border-blue-200",
          glow: "shadow-blue-200/50",
          accent: "from-blue-400 to-indigo-500"
        };
      case "search":
        return {
          bg: "bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-100",
          iconColor: "text-amber-500",
          titleColor: "text-amber-900",
          subtitleColor: "text-amber-700",
          border: "border-amber-200",
          glow: "shadow-amber-200/50",
          accent: "from-amber-400 to-orange-500"
        };
      default:
        return {
          bg: "bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100",
          iconColor: "text-slate-500",
          titleColor: "text-slate-900",
          subtitleColor: "text-slate-600",
          border: "border-slate-200",
          glow: "shadow-slate-200/50",
          accent: "from-slate-400 to-gray-500"
        };
    }
  };

  // Size configurations
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return {
          container: "p-6",
          icon: "w-10 h-10",
          title: "text-base font-bold",
          subtitle: "text-sm",
          button: "text-sm px-4 py-2"
        };
      case "large":
        return {
          container: "p-10",
          icon: "w-20 h-20",
          title: "text-2xl font-bold",
          subtitle: "text-lg",
          button: "text-base px-6 py-3"
        };
      default: // medium
        return {
          container: "p-8",
          icon: "w-16 h-16",
          title: "text-xl font-bold",
          subtitle: "text-base",
          button: "text-sm px-5 py-2.5"
        };
    }
  };

  const handleRefresh = async () => {
    if (!onRefresh) return;
    
    setIsRefreshing(true);
    try {
      await onRefresh();
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000); // Minimum animation time
    }
  };

  const Icon = getIcon();
  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <div className={`
      relative overflow-hidden
      ${variantStyles.bg} 
      border-2 border-dashed 
      ${variantStyles.border}
      rounded-2xl 
      ${sizeStyles.container} 
      text-center 
      transition-all 
      duration-500 
      hover:shadow-xl
      hover:${variantStyles.glow}
      hover:-translate-y-1
      hover:border-solid
      max-w-md 
      mx-auto
      group
      backdrop-blur-sm
    `}>
      
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className={`absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r ${variantStyles.accent} rounded-full opacity-10 animate-pulse group-hover:animate-bounce`}></div>
        <div className={`absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-l ${variantStyles.accent} rounded-full opacity-10 animate-pulse delay-1000 group-hover:animate-bounce`}></div>
        <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-radial ${variantStyles.accent} rounded-full opacity-5 animate-spin duration-[20s] group-hover:duration-[10s]`}></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className={`absolute top-1/4 left-1/4 w-2 h-2 bg-gradient-to-r ${variantStyles.accent} rounded-full opacity-30 animate-float`}></div>
        <div className={`absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-gradient-to-r ${variantStyles.accent} rounded-full opacity-40 animate-float delay-500`}></div>
        <div className={`absolute top-1/2 right-1/3 w-1 h-1 bg-gradient-to-r ${variantStyles.accent} rounded-full opacity-50 animate-float delay-1000`}></div>
      </div>

      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Animated Icon Container */}
        <div className={`
          relative
          ${variantStyles.iconColor} 
          transform transition-all duration-500 
          group-hover:scale-110 
          group-hover:rotate-12
        `}>
          {/* Icon Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${variantStyles.accent} rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
          
          <div className={`
            relative bg-white/80 backdrop-blur-sm rounded-full p-4 
            shadow-lg border border-white/50
            animate-pulse group-hover:animate-none
            transition-all duration-500
          `}>
            <Icon className={`${sizeStyles.icon} drop-shadow-sm`} />
          </div>

          {/* Sparkle Effects */}
          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-spin" />
          </div>
          <div className="absolute -bottom-1 -left-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-400">
            <Zap className="w-3 h-3 text-blue-400 animate-bounce" />
          </div>
        </div>
        
        {/* Animated Text */}
        <div className="space-y-2">
          <h3 className={`
            ${variantStyles.titleColor} 
            ${sizeStyles.title}
            transform transition-all duration-300
            group-hover:scale-105
            drop-shadow-sm
          `}>
            {message}
          </h3>
          
          <p className={`
            ${variantStyles.subtitleColor} 
            ${sizeStyles.subtitle}
            opacity-80
            transform transition-all duration-300 delay-100
            group-hover:opacity-100
          `}>
            {subtitle}
          </p>
        </div>
        
        {/* Enhanced Refresh Button */}
        {showRefreshButton && onRefresh && (
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`
              relative overflow-hidden
              inline-flex items-center space-x-2 
              bg-white/80 backdrop-blur-sm
              hover:bg-white
              text-gray-700
              rounded-xl 
              ${sizeStyles.button}
              transition-all 
              duration-300 
              border 
              border-white/50
              shadow-lg
              hover:shadow-xl
              hover:-translate-y-0.5
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:transform-none
              group/button
            `}
          >
            {/* Button Glow Effect */}
            <div className={`absolute inset-0 bg-gradient-to-r ${variantStyles.accent} opacity-0 group-hover/button:opacity-10 transition-opacity duration-300`}></div>
            
            <RefreshCw className={`
              w-4 h-4 transition-transform duration-500
              ${isRefreshing ? 'animate-spin' : 'group-hover/button:rotate-180'}
            `} />
            <span className="relative z-10 font-medium">
              {isRefreshing ? 'Refreshing...' : 'Try Again'}
            </span>
            
            {/* Button Shine Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          </button>
        )}
      </div>

      {/* Card Border Glow Animation */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
        bg-gradient-to-r ${variantStyles.accent} blur-xl -z-10 scale-105
      `}></div>
    </div>
  );
};

export default InfoCard;