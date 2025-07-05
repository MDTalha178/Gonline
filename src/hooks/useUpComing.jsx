import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoreThemeService } from "../service/store/storeSetupService";
import { FILTER_TYPE, THEME_TYPE_CONFIG } from "../utils/constant";

const useUpComingSales = (storeID) =>{
    const {toast} =  useToast();

    const salesData =  {
        mainHeading:{
            text:'Upcoming Flash Sale',
            color:'',
            fontSize:'',
            tag:''
        },
        subHeading :{
            text:'Get the best deals on our products.',
            color:'',
            fontSize:'',
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
            }
        },
        button:{
            text:'Notify Me',
            color:'',
            fontSize:'',
            tag:''
        },

        parentStyleColor:"bg-gray-900",
        bgColorFrom: "bg-gray-900",
        bgColorTo: "to-pink-100",
        textColorFrom: "from-purple-600",
        textColorTo: "to-pink-600",
        buttonText:'Apply Filter'
    }

    const [data, setData] = useState(salesData);
    
    useEffect(() => {
        const fetchBannerData = async () => {
          try {
            const response = await getStoreThemeService(toast, {store_id:storeID, name:THEME_TYPE_CONFIG.SALES});
            if (response?.data?.config?.sales){
                setData(response.data.config.sales);
            } 
            else setData(salesData);
          } catch (error) {
            toast.error(error.message || 'Failed to fetch Sales data');
          }
        };
    
        fetchBannerData();
      }, [storeID, setData]);
    return data;
}

export default useUpComingSales