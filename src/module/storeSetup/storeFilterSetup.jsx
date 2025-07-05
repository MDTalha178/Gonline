import { useEffect, useState } from "react";
import StoreFilterSetupComponent from "../../component/gonline/storeSetup/StoreFilterSetup";
import useStoreFilter from "../../hooks/useStoreFilter";
import { THEME_TYPE_CONFIG } from "../../utils/constant";
import { storeSetupService } from "../../service/store/storeSetupService";
import { useToast } from "../../hooks/useToast";


const StoreFilterSetup = ({storeId}) => {

    const {toast} = useToast();

    const data = useStoreFilter(storeId);

    const [filterData, setFilterData] = useState(data);

    const updateFilterData = (field, value) =>{
        const payload = {
            ...filterData,
            [field]: value,
        }
        setFilterData((prev) => {
            return{
                ...prev,
                [field]: value
            }
        });
        saveData(payload);
    }

    const saveData = async (data) =>{
        const payload = {
            store_id: storeId,
            config: {
                filter: data,
            },
            name:THEME_TYPE_CONFIG.FILTER
        }
        try{
            const response = await storeSetupService(payload, toast);
            setFilterData(response.data.config.filter);
        }catch(e){
            toast.error(e.message)
        }
    }

    useEffect(() =>{
        setFilterData(data);
    },[data, storeId])

    const handleInputChange = () =>{
        console.log('input changed')    
    }

    return (
        <StoreFilterSetupComponent filterData={filterData}  updateFilterData={updateFilterData}/>
    );
}

export default StoreFilterSetup;