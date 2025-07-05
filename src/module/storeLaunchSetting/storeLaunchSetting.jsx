import { useEffect, useState } from "react";
import ShopLaunchSettingsComponent from "../../component/gonline/StoreLaunchSetting/StoreLaunchSetting";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { endPoint } from "../../request/endipoint";
import FullscreenLoader from "../../component/Loader/FullScreenLoader";
import { useToast } from "../../hooks/useToast";
import request from "../../request/request";
import { STORE_STATUS } from "../../utils/constant";

const StoreLaunchSetting = () =>{
    const { toast } = useToast();
    const navigate = useNavigate();

    const {storeId} = useParams();
    const [isLoading, setIsLoading] = useState(false);

    const [settings, setSettings] = useState({
            platformStatus: STORE_STATUS.DRAFT,
            paymentMethods: {
                upi: false,
                cod: false
            },
            currency: 'INR',
            store_id: storeId
        });
    
    console.log(storeId)
    
    const handleSettingChange = (key, value) => {
        setSettings(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const saveSetting = async () =>{
        setIsLoading(true);
        const payload ={
            store_id: storeId,
            store_access_url:{},
            online_status: settings.platformStatus
        }
        try {
            const response =  await request.create(endPoint.store.storeLaunchSetting, payload, toast);
            if (response.success === true)  navigate(`/shopregistration/storetemplate/${storeId}/launchsetting/creatingstore`)
           
        } catch (error) {
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false);
        }

    }

    useEffect(() => {
        if(storeId){
            handleSettingChange('store_id', storeId);
        }
    }, [storeId]);

    return(
        <>
            {isLoading && <FullscreenLoader  message='Loading..' />}
            <ShopLaunchSettingsComponent settings={settings}  handleSettingChange={handleSettingChange} saveSettings={saveSetting}/>
        </>
       
    )


}

export default StoreLaunchSetting