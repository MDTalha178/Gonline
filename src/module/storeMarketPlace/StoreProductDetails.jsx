import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useToast } from "../../hooks/useToast";
import { fetchProductDetails } from "../../service/marketPlace/product_service";
import NewProductDetailsPage from "../../component/marketplace/Product/ProductDetails";
import FullscreenLoader from "../../component/Loader/FullScreenLoader";
import StoreFooter from "../../component/marketplace/StoreHome/StoreFooter/StoreFooter";

const StoreProductDetails = () =>{

    const {productID} = useParams();
    const {toast} = useToast();
    const[data, setData] = useState();

   useEffect(() => {
    const fetchData = async () => {
        if (productID) {
            const response = await fetchProductDetails(productID, toast);
            setData(response?.data);
            console.log(response);
        }
    };
    productID && fetchData();
}, [productID]);


    if(!data) return <FullscreenLoader message="fetching product details please wait..."/>
    return(
        <>
        <NewProductDetailsPage productDetailsData={data}/>
        <StoreFooter storeId={data?.store}/>
        </>
        
    )
}

export default StoreProductDetails;