import { useEffect, useState } from "react";
import DealsOfTheDayComponent from "../../component/gonline/storeSetup/DealsOfTheDay"
import useDeals from "../../hooks/useDeals";
import { storeSetupService } from "../../service/store/storeSetupService";
import { THEME_TYPE_CONFIG } from "../../utils/constant";
import { useToast } from "../../hooks/useToast";

const DealsOfTheDaySetup = ({storeId}) =>{
    const {toast} = useToast();
    const data = useDeals(storeId);

    const [dealsData, setdealsData] = useState(data);

    const updateDealsData = (field, value) =>{
        const payload = {
            ...dealsData,
            [field]: value,
        }
        setdealsData((prev) => {
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
                deals: data,
            },
            name:THEME_TYPE_CONFIG.DEALS
        }
        try{
            const response = await storeSetupService(payload, toast);
            setdealsData(response.data.config.deals);
        }catch(e){
            toast.error(e.message)
        }
    }

    useEffect(() =>{
        setdealsData(data);
    },[data, storeId])

    return (
        <DealsOfTheDayComponent dealsData={dealsData} updateDealsData={updateDealsData}/>
    )
}

export default DealsOfTheDaySetup