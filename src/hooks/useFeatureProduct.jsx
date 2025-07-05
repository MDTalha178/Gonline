import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoreThemeService } from "../service/store/storeSetupService";
import { FILTER_TYPE, THEME_TYPE_CONFIG } from "../utils/constant";

const useFeatureProduct = (storeID) =>{
    const {toast} =  useToast();

    const fatureProduct =  {
        mainHeading:{
            text:'Featured Products',
            color:'text-gray-900',
            fontSize:'text-4xl',
            tag:''
        },
        subHeading :{
            text:'Discover our handpicked selection of premium products that our customers love most',
            color:'text-gray-600',
            fontSize:'text-lg',
            tag:''
        },
        product_cart:{
            productHeadingTextStyle:{
                text:'',
                color:'',
                fontSize:'',
                tag:''
            },
            productSubHeadingTextStyle:{
                text:'',
                color:'',
                fontSize:'',
                tag:''
            },
            
            backgroundColor:'bg-gray-800',
            productHeadingTextStyle:{
                text:'Up to 60% OFF',
                color:'',
                fontSize:'',
                tag:''
            },
            productPriceTextStyle:{
                text:'',
                color:'',
                fontSize:'',
                tag:''
            },
            button:{
                text:'Add to Cart',
                color:'text-purple-600',
                fontSize:'text-lg',
                tag:''
            },
            product_tag:{
                text:'NEW',
                color:'text-white',
                fontSize:'',
                tag:''
            }

            
        },
        parentStyleColor:"bg-white-100",
        button:{
            text:'View all',
            color:'text-purple-600',
            fontSize:'text-lg',
            tag:''
        }
    }

    const [data, setData] = useState(fatureProduct);
    
    useEffect(() => {
        const fetchBannerData = async () => {
          try {
            const response = await getStoreThemeService(toast, {store_id:storeID, name:THEME_TYPE_CONFIG.FEATURED});
            if (response?.data?.config?.featured){
                setData(response.data.config.featured);
            } 
            else setData(fatureProduct);
          } catch (error) {
            toast.error(error.message || 'Failed to fetch Featured data');
          }
        };
    
        fetchBannerData();
      }, [storeID, setData]);
    return data;
}

export default useFeatureProduct