

console.log('Store Service URL:',  import.meta.env.VITE_STORE_SERVICE_URL);

const SERVICE_CONFIGS = {
    USER_SERVICE: {
        baseURL:import.meta.env.VITE_USER_SERVICE_URL,
        timeout: 3000,
    },
    STORE_SERVICE: {
        baseURL: import.meta.env.VITE_STORE_SERVICE_URL,
        timeout: 10000, // Longer timeout for payment processing
    },
};

export default SERVICE_CONFIGS