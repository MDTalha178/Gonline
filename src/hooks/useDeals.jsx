import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoreThemeService } from "../service/store/storeSetupService";
import { FILTER_TYPE, THEME_TYPE_CONFIG } from "../utils/constant";

const useDeals = (storeID) =>{
    const {toast} =  useToast();

     const deals =  {
        mainHeading:{
            text:'Deals of the Day',
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
            button:{
                text:'Grab Deal now',
                color:'',
                fontSize:'',
                tag:''
            },
            backgroundColor:'"bg-white/10',
            onhoverBackgroundColor:'"bg-white/20',
            productHeadingTextStyle:{
                text:'',
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
        timerHeading:{
            text:'Time Remaining',
            color:'',
            fontSize:'',
            tag:''
        },

        parentStyleColor:"bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-10",
        bgColorFrom: "from-purple-100",
        bgColorTo: "to-pink-100",
        textColorFrom: "from-purple-600",
        textColorTo: "to-pink-600",
        buttonText:'Apply Filter'
    }

    const [data, setData] = useState(deals);
    
    useEffect(() => {
        const fetchBannerData = async () => {
          try {
            const response = await getStoreThemeService(toast, {store_id:storeID, name:THEME_TYPE_CONFIG.DEALS});
            if (response?.data?.config?.deals){
                setData(response.data.config.deals);
            } 
            else setData(deals);
          } catch (error) {
            toast.error(error.message || 'Failed to fetch Deals data');
          }
        };
    
        fetchBannerData();
      }, [storeID, setData]);
    return data;
}

export default useDeals;