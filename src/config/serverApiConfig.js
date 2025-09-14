

console.log('Store Service URL:',  import.meta.env.VITE_ADMIN_SERVICE_URL);

const SERVICE_CONFIGS = {
  USER_SERVICE: {
    baseURL: import.meta.env.VITE_USER_SERVICE_URL,
    timeout: 10000, // 10 seconds
  },
  STORE_SERVICE: {
    baseURL: import.meta.env.VITE_STORE_SERVICE_URL,
    timeout: 10000, 
  },
  ADMIN_SERVICE: {
    baseURL: import.meta.env.VITE_ADMIN_SERVICE_URL,
    timeout: 10000, 
  }
};


export default SERVICE_CONFIGS