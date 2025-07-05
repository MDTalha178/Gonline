import { useEffect, useState } from "react";
import FeatureProductComponent from "../../component/gonline/storeSetup/FearureProductComponent"
import { THEME_TYPE_CONFIG } from "../../utils/constant";
import { storeSetupService } from "../../service/store/storeSetupService";
import useStoreTheme from "../../hooks/useStoreTheme";
import { useToast } from "../../hooks/useToast";
import useFeatureProduct from "../../hooks/useFeatureProduct";

const FeatureProductSetup = ({storeId}) =>{

    const data = useFeatureProduct(storeId);

    const {toast} = useToast()
    const [featureProductData, setfeatureProductData] = useState(data);

    const updatefeatureProductData = (field, value) => {
        const payload = {
            ...featureProductData,
            [field]: value,

        }
        setfeatureProductData((prevData) => ({
          ...prevData,
          [field]: {...value},
        }));
        saveData(payload);
    };

    const saveData = async (data) =>{
        const payload = {
            store_id: storeId,
            config: {
                featured: data,
            },
            name:THEME_TYPE_CONFIG.FEATURED
        }
        try{
            const response = await storeSetupService(payload, toast);
            setfeatureProductData(response.data.config.featured);
        }catch(e){
            toast.error(e.message)
        }
    }


    useEffect(() => {
    setfeatureProductData(data);
    }, [data, storeId]);

    return (
        <FeatureProductComponent featuredData={featureProductData} updatefeatureProductData={updatefeatureProductData}/>
    )
}

export default FeatureProductSetup;