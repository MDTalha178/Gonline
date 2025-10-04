import { clearStorage } from "../utils/utils";
import codeMessage from "./codeMessage";

// Enhanced error handler with toast integration
const errorHandler = (error, toast = null, options = {}) => {
    const { response } = error;
    const { showToast = true, redirectOnUnauth = true } = options;
    console.log(options);
    if (!response) {
        const message = codeMessage[503] || "Network error occurred";
        
        // Show toast notification
        if (showToast && toast) {
            toast.error(message, {
                title: "Network Error",
                duration: 5000
            });
        }
        
        return {
            success: false,
            result: null,
            message: message
        };
    }
    else if (response && response.status) {
        // response?.data?.data?.non_field_errors[0]
        const message = response?.data?.message || response?.data?.detail || response?.data?.error || response?.data?.data?.non_field_errors[0] || response?.data?.non_field_errors[0]||  response?.data?.error || response.data && response.data.message ||response?.data[0]|| codeMessage[response.status];
        const { status } = response;

        // Show toast notification based on status
        console.log(message, 'message', status, 'status', toast, 'toast');
        if (showToast && toast) {
            if (status === 401) {
                toast.error("Your session has expired. Please login again.", {
                    title: "Session Expired",
                    duration: 6000
                });
            }
            else if (status === 403) {
                toast.error(message || "You don't have permission to perform this action.", {
                    title: "Access Denied",
                    duration: 5000
                });
            }
            else if (status === 404) {
                toast.error("The requested resource was not found.", {
                    title: "Not Found",
                    duration: 4000
                });
            }
            else if (status === 422) {
                toast.warning(message || "Please check your input data.", {
                    title: "Validation Error",
                    duration: 5000
                });
            }
            else if (status >= 500) {
                toast.error("Something went wrong on our end. Please try again later.", {
                    title: "Server Error",
                    duration: 6000
                });
            }
            else if (status === 400) {
                toast.error(message || "Something went wrong on our end. Please try again later.", {
                    title: 'Request failed',
                    duration: 6000
                });
            }
            else {
                toast.error(message || "An error occurred", {
                    title: "Error",
                    duration: 4000
                });
            }
        }

        // Handle unauthorized access
        if (error.response.status === 401 && redirectOnUnauth) {
            clearStorage()
            setTimeout(() => {
                window.location.reload();
            }, 2000); // Give time for user to read the toast
        }
        
        return response.data;
    }
    else {
        const message = codeMessage[1000] || "Unknown error occurred";
        
        // Show toast notification
        if (showToast && toast) {
            toast.error(message, {
                title: "Unknown Error",
                duration: 5000
            });
        }
        
        return {
            success: false,
            result: null,
            message: message
        };
    }
};

export default errorHandler;