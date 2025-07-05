import { useNavigate, useParams } from "react-router-dom";
import FullscreenLoader from "../../Loader/FullScreenLoader"
import { useEffect } from "react";
import useStoreDetail from "../../../hooks/useStoreDetail";

const SavingStoreSetting = () =>{
    const navigate = useNavigate();
    const {storeId} = useParams();

    const data  = useStoreDetail(storeId)

    useEffect(() => {
        if(data) setTimeout(() => {
            navigate(`/store/${data?.slug}`)
        }, 9000);
        
    }, [storeId, data]);
   
    return(
        <FullscreenLoader message="Setting Up your store"/>
    )
}

export default SavingStoreSetting