import {useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoreService } from "../service/marketPlace/store";

const useStoreDetails = (storeName) =>{
    const {toast} =  useToast();


    const [data, seData] = useState(null);
    
    useEffect(() => {
        const fetchBannerData = async () => {
          try {
            const response = await getStoreService(toast, storeName);
            if (response?.data){
                seData(response.data);
            } 
            else seData(data);
          } catch (error) {
            toast.error(error.message || 'Failed to fetch store data');
          }
        };
    
        fetchBannerData();
      }, [storeName, seData]);
    return data;
}

export default useStoreDetails;