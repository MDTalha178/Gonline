export const ENV_CONFIG = {
    // API Base URLs
    USER_SERVICE_URL: getEnvVar('USER_SERVICE_URL', 'http://127.0.0.1:8000/api/v1'),
    STORE_SERVICE_URL: getEnvVar('STORE_SERVICE_URL', 'http://127.0.0.1:8000/api/v1'),
    
    // Other environment variables
    NODE_ENV: getEnvVar('NODE_ENV', 'development'),
    API_TIMEOUT: parseInt(getEnvVar('REACT_APP_API_TIMEOUT', '5000')),
    
    // Authentication
    ACCESS_TOKEN_NAME: getEnvVar('REACT_APP_ACCESS_TOKEN_NAME', 'access_token'),
    
    // Feature flags
    ENABLE_ANALYTICS: getEnvVar('REACT_APP_ENABLE_ANALYTICS', 'false') === 'true',
};