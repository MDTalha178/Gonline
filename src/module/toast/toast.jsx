import { useEffect } from "react";
import { ToastCompoent } from "../../component/toast/toast";

const Toast = ({ toast, onRemove }) => {
  
    useEffect(() => {
        const timer = setTimeout(() => {
        onRemove(toast.id);
        }, toast.duration || 4000);

        return () => clearTimeout(timer);
    }, [toast.id, toast.duration, onRemove]);


    return(
        <ToastCompoent  toast={toast} onRemove={onRemove}/>
    )
}


export const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 pointer-events-none">
      <div className="space-y-3 pointer-events-auto">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            toast={toast}
            onRemove={removeToast}
          />
        ))}
      </div>
    </div>
  );
};

export default Toast;