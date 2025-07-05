import { useParams } from "react-router-dom";
import useStoreDetails from "../../hooks/useStoreDetails";
import { useEffect } from "react";
import getComponentOrder from "../../utils/Sorting";
import StoreHome from "../../component/marketplace/StoreHome";
import Header from "../../component/marketplace/StoreHeader";

const StoreHomeMarketPlace = () => {
    const { storeName } = useParams();
    const data = useStoreDetails(storeName);

    useEffect(() => {
        
    }, [data, storeName])

    if(!data) return <div>Loading</div>;

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
        </div>
    );
}

export default StoreHomeMarketPlace;