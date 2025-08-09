import {useEffect, useState } from "react";
import { useToast } from "./useToast";
import { getStoreService } from "../service/marketPlace/store";
import { getStoreproduct } from "../service/marketPlace/product_service";

const useStorePorducts = (storeId, storeName=null) =>{
    const {toast} =  useToast();


    const [data, setData] = useState(null);
    
    useEffect(() => {
        const fetchStoreProductData = async () => {
          try {
            const response = await getStoreproduct(toast, storeId, {}, storeName);
            if (response?.data){
                setData(response.data);
            } 
            else setData(data);
          } catch (error) {
            toast.error(error.message || 'Failed to fetch store Products');
          }
        };
    
        fetchStoreProductData();
      }, [storeId, setData]);
    return data;
}

export default useStorePorducts;