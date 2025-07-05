import { useEffect, useState } from "react";
import UpComingDealsComponent from "../../component/gonline/storeSetup/UpComingDealsComponent"
import { useToast } from "../../hooks/useToast";
import useUpComingSales from "../../hooks/useUpComing";
import { storeSetupService } from "../../service/store/storeSetupService";
import { THEME_TYPE_CONFIG } from "../../utils/constant";

const UpComingSalesSetup = ({storeId}) => {
    const {toast} = useToast();
    const data = useUpComingSales(storeId);


    const [salesData, setsalesData] = useState(data);

    const updateDealsData = (field, value) =>{
        const payload = {
            ...salesData,
            [field]: value,
        }
        setsalesData((prev) => {
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
                sales: data,
            },
            name:THEME_TYPE_CONFIG.SALES
        }
        try{
            const response = await storeSetupService(payload, toast);
            setsalesData(response.data.config.sales);
        }catch(e){
            toast.error(e.message)
        }
    }

    useEffect(() =>{
        setsalesData(data);
    },[data, storeId])

    return(
        <UpComingDealsComponent updateDealsData={updateDealsData} dealsData={salesData}/>
    )
}

export default UpComingSalesSetup