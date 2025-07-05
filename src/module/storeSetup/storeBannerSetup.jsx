import { useEffect, useState } from "react";
import BannerSetupComponent from "../../component/gonline/storeSetup/BannerSetupComponent";
import { useToast } from "../../hooks/useToast";
import { storeSetupService } from "../../service/store/storeSetupService";
import useStoreTheme from "../../hooks/useStoreTheme";
import { THEME_TYPE_CONFIG } from "../../utils/constant";

const StoreBannerSetup = ({storeId}) => {

    const data = useStoreTheme(storeId);

    const {toast} = useToast()
    const [bannerData, setBannerData] = useState(data);

    const updateBannerData = (field, value) => {
        const payload = {
            ...bannerData,
            [field]: value,

        }
        setBannerData((prevData) => ({
          ...prevData,
          [field]: {...value},
        }));
        saveData(payload);
    };

    const saveData = async (data) =>{
        const payload = {
            store_id: storeId,
            config: {
                banner: data,
            },
            name:THEME_TYPE_CONFIG.BANNER
        }
        try{
            const response = await storeSetupService(payload, toast);
            setBannerData(response.data.config.banner);
        }catch(e){
            toast.error(e.message)
        }
    }

    

    const updateColors = (colors) => {
        setBannerData(prev => ({
        ...prev,
        bgColorFrom: colors.from,
        bgColorTo: colors.to
        }))
        saveData();
    };
    useEffect(() => {
    setBannerData(data);
    }, [data ,storeId]);



    return(
        <BannerSetupComponent  bannerData={bannerData}  updateBannerData={updateBannerData} updateColors={updateColors}/>
    )
}

export default StoreBannerSetup;