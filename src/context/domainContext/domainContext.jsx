import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDomainInfo } from '../../utils/domain';
import setDoummntTitle from '../../utils/utils';
import { useToast } from '../../hooks/useToast';
import { getStoreService } from '../../service/marketPlace/store';
import { STORE_STATUS } from '../../utils/constant';

const DomainContext = createContext();


export const useDomainContext = () => {
        const context = useContext(DomainContext);
    if (!context) {
        throw new Error('useDomain must be used within a DomainProvider');
    }
    return context;
};

export const DomainProvider = ({ children }) => {
    const {toast} = useToast()
    const[domainInfo, setDomainInfo] = useState(null);
    const[storeData, setStoreData] = useState(null);
    const[loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() =>{
        const intialize = async () => {
            try{
                const domainInfo = getDomainInfo();
                setDomainInfo(domainInfo);
                if(domainInfo.storeSlug){
                    const response = await getStoreService(toast, domainInfo.storeSlug);
                    if(response?.data && response.data?.online_status){
                        if(response.data?.online_status == STORE_STATUS.OFFLINE || response.data?.online_status == STORE_STATUS.SUSPENDED || response.data?.online_status == STORE_STATUS.TEMPORARILY_UNAVAILABLE || response.data?.online_status == STORE_STATUS.MAINTENANCE || response.data?.online_status == STORE_STATUS.DRAFT){
                            setError({
                                status: 403,
                                store_status: response.data?.online_status
                            });
                            toast.error(`Store is currently ${response.data?.online_status}`);
                        }
                        setStoreData(response.data);
                        setDoummntTitle(document, domainInfo.storeSlug);
                    }
                    else if(response.status == 204){
                        setError({
                            status: 204,
                            store_status:STORE_STATUS.NOT_FOUND
                        })
                    }
                }else{
                    setDoummntTitle(document, 'Gonlines - Build Your Online Store');
                }
            }catch(error) {
                toast.error('Error fetching domain info:', error);
            }
            finally{
                setLoading(false);
            }
        }
        intialize();
    },[storeData]);
    const setStoreDataByStoreName = async (storeSlug) => {
        try {
            setLoading(true);
            const response = await getStoreService(storeSlug);
            if (response.ok) {
                const data = await response.json();
                setStoreData(data);
                setDoummntTitle(document, storeSlug);
            } else {
                toast.error('Failed to fetch store data');
            }
        } catch (error) {
            toast.error('Error fetching store data:', error);
        } finally {
            setLoading(false);
        }
    };

    return(
        <DomainContext.Provider value={{ domainInfo, storeData, loading, setStoreDataByStoreName, error }}>
            {children}
        </DomainContext.Provider>
    )
}