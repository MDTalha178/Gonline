import {useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoredeals } from "../service/marketPlace/product_service";

const useStoreDeal = (storeId) =>{
    const {toast} =  useToast();


    const [data, seData] = useState(null);
    
    useEffect(() => {
        const fetchStoreData = async () => {
          try {
            const response = await getStoredeals(toast, storeId);
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
      }, [storeId, seData]);
    return data;
}

export default useStoreDeal;