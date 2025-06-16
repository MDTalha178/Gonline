import { useContext } from "react";
import ToastContext from "../context/toastContext/toastContext";

export const useToast = () => {
  const context = useContext(ToastContext);
  
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }

  const { addToast, removeToast, removeAllToasts } = context;

  return {
    toast: {
      success: (message, options = {}) => addToast({ ...options, message, type: 'success' }),
      error: (message, options = {}) => addToast({ ...options, message, type: 'error' }),
      warning: (message, options = {}) => addToast({ ...options, message, type: 'warning' }),
      info: (message, options = {}) => addToast({ ...options, message, type: 'info' }),
      custom: (options) => addToast(options)
    },
    removeToast,
    removeAllToasts
  };
};