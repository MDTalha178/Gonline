import codeMessage from "./codeMessage";

const successHandler = (response, toast = null, options = {}) => {
    const { 
        showToast = true, 
        showSuccessToast = true,
        showWarningToast = true,
        customSuccessMessage = null,
        operation = null // e.g., 'login', 'update', 'create', 'delete'
    } = options;
    
    // Handle cases where response doesn't have expected data structure
    if (!response || !response.data) {
        const fallbackResponse = {
            status: 204,
            url: null,
            data: {
                status: response?.status || 404,
                success: true,
                result: null,
                message: codeMessage[1000] || "No data received from server",
            }
        };
        
        if (showToast && toast) {
            toast.error("No data received from server", {
                title: "Data Error",
                duration: 4000
            });
        }
        return fallbackResponse.data;
    }

    // Handle cases where result is missing or null
    if (!response.data.data && response.data.data !== false && response.data.data !== 0) {
        response = {
            ...response,
            status: 404,
            url: null,
            data: {
                success: false,
                result: null,
                message: codeMessage[1000] || "No result data found",
            }
        };
        
        if (showToast && toast) {
            toast.warning("No result data found", {
                title: "Missing Data",
                duration: 4000
            });
        }
        
        return response.data;
    }

    const { data } = response;
    const { status = 200 } = response;

    // Handle failed operations (success: false)
    if (data.success === false) {
        const message = data && data.message || codeMessage[status] || "Operation failed";
        
        if (showToast && showWarningToast && toast) {
            // Different messages based on status codes for failed operations
            if (status === 400) {
                toast.warning(message || "Bad request. Please check your input.", {
                    title: "Invalid Request",
                    duration: 5000
                });
            }
            else if (status === 404) {
                toast.warning(message || "The requested resource was not found.", {
                    title: "Not Found",
                    duration: 4000
                });
            }
            else if (status === 409) {
                toast.warning(message || "This action conflicts with existing data.", {
                    title: "Conflict",
                    duration: 5000
                });
            }
            else if (status === 429) {
                toast.warning(message || "Too many requests. Please try again later.", {
                    title: "Rate Limited",
                    duration: 6000
                });
            }
            else {
                toast.warning(message || "Operation completed with warnings.", {
                    title: "Warning",
                    duration: 4000
                });
            }
        }
        
        return data;
    }
    
    // Handle successful operations (success: true)
    else if (data.success === true || data.success === undefined) {
        const message = data && data.data.message;
        const successText = customSuccessMessage || message 
        
        if (showToast && showSuccessToast && toast && successText) {

            // Different success messages based on status codes
            if (status === 201) {
                toast.success(successText || "Resource created successfully!", {
                    title: "Created",
                    duration: 4000
                });
            }
            else if (status === 202) {
                toast.info(successText || "Request accepted and is being processed.", {
                    title: "Processing",
                    duration: 4000
                });
            }
            else if (status === 204) {
                toast.success(successText || "Operation completed successfully.", {
                    title: "Success",
                    duration: 3000
                });
            }
            else if (status === 200) {
                // Different messages based on operation type
                // const title = getOperationTitle(operation);
                toast.success(successText, {
                    title: "Success",
                    duration: 4000
                });
            }
            else {
                toast.success(successText || "Operation completed successfully!", {
                    title: "Success",
                    duration: 4000
                });
            }
        }

        // Handle special success scenarios
        // handleSpecialSuccessScenarios(data, status, toast, showToast, operation);
        
        return data.data;
    }
    
    // Handle unexpected response format
    else {
        const message = "Unexpected response format received";
        
        if (showToast && toast) {
            toast.warning(message, {
                title: "Unexpected Response",
                duration: 4000
            });
        }
        
        return {
            success: false,
            result: null,
            message: message,
            originalData: data
        };
    }
};

export default successHandler;