import { useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoreThemeService } from "../service/store/storeSetupService";
import { FILTER_TYPE, THEME_TYPE_CONFIG } from "../utils/constant";

const useStoreFilter = (storeID) =>{
    const {toast} =  useToast();

     const filter =  {
        primary_filter:{
            filter:'category',
            filter_type:FILTER_TYPE.LIST,
            filter_list:['Electronics', 'Clothing', 'Accessories', 'Home Decor'],
            color:'',
            fontSize:'',
            tag:''
        },
        secondatry_filter:{
            filter:'Price Range',
            filter_type:FILTER_TYPE.RANGE,
            filter_list:[100, 19000],
            color:'',
            fontSize:'',
            tag:''
        },
        mainHeading:'Filter',
        bgColorFrom: "from-purple-100",
        bgColorTo: "to-pink-100",
        textColorFrom: "from-purple-600",
        textColorTo: "to-pink-600",
        buttonText:'Apply Filter'
    }

    const [data, setData] = useState(filter);
    
    useEffect(() => {
        const fetchBannerData = async () => {
          try {
            const response = await getStoreThemeService(toast, {store_id:storeID, name:THEME_TYPE_CONFIG.FILTER});
            if (response?.data?.config?.filter){
                setData(response.data.config.filter);
            } 
            else setData(filter);
          } catch (error) {
            toast.error(error.message || 'Failed to fetch Filter data');
          }
        };
    
        fetchBannerData();
      }, [storeID, setData]);
    return data;
}

export default useStoreFilter