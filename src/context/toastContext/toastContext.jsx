import { AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";
import { createContext } from "react";

// Toast types
export const TOAST_TYPES = {
  success: {
    icon: CheckCircle,
    bgColor: 'bg-gradient-to-r from-emerald-500 to-green-600',
    iconColor: 'text-white'
  },
  error: {
    icon: XCircle,
    bgColor: 'bg-gradient-to-r from-red-500 to-rose-600',
    iconColor: 'text-white'
  },
  warning: {
    icon: AlertCircle,
    bgColor: 'bg-gradient-to-r from-amber-500 to-orange-600',
    iconColor: 'text-white'
  },
  info: {
    icon: Info,
    bgColor: 'bg-gradient-to-r from-blue-500 to-indigo-600',
    iconColor: 'text-white'
  }
};

// Toast Context
const ToastContext = createContext();

export default ToastContext;