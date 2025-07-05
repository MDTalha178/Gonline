import {useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoreDetailsService } from "../service/marketPlace/store";

const useStoreDetail = (storeName) =>{
    const {toast} =  useToast();


    const [data, seData] = useState(null);
    
    useEffect(() => {
        const fetchStoreData = async () => {
          try {
            const response = await getStoreDetailsService(toast, storeName);
            if (response?.data){
                console.log(response.data);
                seData(response.data);
            } 
            else seData(data);
          } catch (error) {
            toast.error(error.message || 'Failed to fetch store data');
          }
        };
    
        fetchStoreData();
      }, [storeName, seData]);
    return data;
}

export default useStoreDetail;