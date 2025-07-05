import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoreThemeService, storeSetupService } from "../service/store/storeSetupService";
import { Key } from "lucide-react";
import { THEME_TYPE_CONFIG } from "../utils/constant";

const useStoreTheme = (storeID) =>{
    const {toast} =  useToast();
     const banner =  {
        mainHeading: {
            text:'Welcome to Our',
            color:'',
            fontSize:'',
            tag:''
        },
        highlightedText: {
            text:'Amazing Store',
            color:'',
            fontSize:'',
            tag:''
        },
        description: {
            text:'Discover premium products with unbeatable prices and exceptional quality. Your satisfaction is our priority.',
            color:'',
            fontSize:'',
            tag:''
        },
        primaryButtonText: {
            text:'Shop Now',
            color:'',
            fontSize:'',
            tag:''
        },
        secondaryButtonText: {
            text:'View Catalog',
            color:'',
            fontSize:'',
            tag:''
        },
        bannerImage: null,
        bgColorFrom: "from-purple-100",
        bgColorTo: "to-pink-100",
        textColorFrom: "from-purple-600",
        textColorTo: "to-pink-600"
    }

    const [data, seData] = useState(banner);
    
    useEffect(() => {
        const fetchBannerData = async () => {
          try {
            const response = await getStoreThemeService(toast, {store_id:storeID, name:THEME_TYPE_CONFIG.BANNER});
            if (response?.data?.config?.banner){
                seData(response.data.config.banner);
            } 
            else seData(banner);
          } catch (error) {
            toast.error(error.message || 'Failed to fetch banner data');
          }
        };
    
        fetchBannerData();
      }, [storeID, seData]);
    return data;
}

export default useStoreTheme