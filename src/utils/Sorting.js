import { THEME_TYPE_CONFIG } from "./constant";

// Sort data based on desired order
const getComponentOrder = (componentName) => {
        const order = {
            [THEME_TYPE_CONFIG.BANNER]: 1,
            [THEME_TYPE_CONFIG.FEATURED]: 2,
            [THEME_TYPE_CONFIG.DEALS]: 3,
            // Add more components here with their desired order
        };
        return order[componentName] || 999; // Default to 999 for unknown components (renders last)
    };
export default getComponentOrder

