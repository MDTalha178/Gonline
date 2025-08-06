import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getComponentOrder from "../../utils/Sorting";
import StoreHome from "../../component/marketplace/StoreHome";
import Header from "../../component/marketplace/StoreHeader";
import FullscreenLoader from "../../component/Loader/FullScreenLoader";
import StoreFooter from "../../component/marketplace/StoreHome/StoreFooter/StoreFooter";
import { useDomainContext } from "../../context/domainContext/domainContext";
import { getStoreService } from "../../service/marketPlace/store";
import { useToast } from "../../hooks/useToast";
import ShopStatusCardsDemo from "../../component/common/StoreStatus";

const StoreHomeMarketPlace = () => {
    const{toast} = useToast();
    const  {domainInfo, storeData, loading} = useDomainContext();
    const { storeName } = useParams();
    const[data, setData] = useState(storeData);
    const[error, setError] = useState(null);

    const fetchStoreData = async (storeName) => {
        const response = await getStoreService(toast, storeName, {}, document);
        if(response?.data){
            setData(response.data);
        } 
        if(response?.error){
            setError(response.error);
        }
        else {
            toast.error('Failed to fetch store datandnnd', response);
        }
    }

    useEffect(() => {
        if(!domainInfo.isSubdomain) {
            fetchStoreData(storeName);
        }
        if(domainInfo.isSubdomain) {
            console.log('Subdomain detected:', domainInfo.storeSlug);
            fetchStoreData(domainInfo.storeSlug);
        }
        
    }, []);



    if(loading) return <FullscreenLoader  message='Loading..' />

    if(error) {
        return <ShopStatusCardsDemo data={error} />
    }

    const sortedData = data ? [...data].sort((a, b) => {
        return getComponentOrder(a.name) - getComponentOrder(b.name);
    }) : [];


    return(
        <div className="min-h-screen bg-gray-50">
            <Header
                storeLogo={null}
                storeName={storeName}
                leftContent={[storeName]} 
                rightContent={["Explore Product", "Shop now", "About"]} 
                leftbutton={[]} 
                rightbutton={["Login"]}
            />
            {sortedData.length > 0 && sortedData.map((item, index) => (
                <StoreHome key={index} data={item} />
            ))}
            {sortedData.length > 0 && <StoreFooter storeId={sortedData[0].store_id}/>}
        </div>
    );
}

export default StoreHomeMarketPlace;