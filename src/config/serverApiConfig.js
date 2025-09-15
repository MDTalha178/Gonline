

console.log('Store Service URL:',  import.meta.env.VITE_ADMIN_SERVICE_URL);

const SERVICE_CONFIGS = {
  USER_SERVICE: {
    baseURL: import.meta.env.VITE_USER_SERVICE_URL,
    timeout: 60000, // 60 seconds
  },
  STORE_SERVICE: {
    baseURL: import.meta.env.VITE_STORE_SERVICE_URL,
    timeout: 60000, // 60 seconds
  },
  ADMIN_SERVICE: {
    baseURL: import.meta.env.VITE_ADMIN_SERVICE_URL,
    timeout: 60000, // 60 seconds
  }
};


export default SERVICE_CONFIGS