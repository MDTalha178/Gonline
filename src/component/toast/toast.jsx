import { X } from "lucide-react";
import { TOAST_TYPES } from "../../context/toastContext/toastContext";

export const ToastCompoent = ({ toast, onRemove }) => {
  const { icon: Icon, bgColor, iconColor } = TOAST_TYPES[toast.type];

  return (
    <div
      className={`
        ${bgColor} 
        text-white p-4 rounded-2xl shadow-2xl 
        transform transition-all duration-500 ease-out
        animate-in slide-in-from-right-full
        backdrop-blur-sm border border-white/20
        max-w-sm w-full
        hover:scale-105 hover:shadow-3xl
        relative overflow-hidden
      `}
    >
      {/* Animated background shimmer */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-pulse"></div>
      
      <div className="relative flex items-start space-x-3">
        <div className="flex-shrink-0">
          <Icon className={`w-6 h-6 ${iconColor} drop-shadow-sm`} />
        </div>
        
        <div className="flex-1 min-w-0">
          {toast.title && (
            <h4 className="text-sm font-semibold text-white/95 mb-1">
              {toast.title}
            </h4>
          )}
          <p className="text-sm text-white/90 leading-relaxed">
            {toast.message}
          </p>
        </div>
        
        <button
          onClick={() => onRemove(toast.id)}
          className="flex-shrink-0 ml-4 text-white/70 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-white/30 w-full">
        <div 
          className="h-full bg-white/60 rounded-full transition-all duration-100 ease-linear"
          style={{
            animation: `shrink ${toast.duration || 4000}ms linear forwards`
          }}
        ></div>
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
        
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateX(100%);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};