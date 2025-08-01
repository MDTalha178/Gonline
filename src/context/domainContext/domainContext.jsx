import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDomainInfo } from '../../utils/domain';
import setDoummntTitle from '../../utils/utils';
import { useToast } from '../../hooks/useToast';
import { getStoreService } from '../../service/marketPlace/store';

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


    useEffect(() =>{
        const intialize = async () => {
            try{
                const domainInfo = getDomainInfo();
                setDomainInfo(domainInfo);

                if(domainInfo.storeSlug){
                    const response = await getStoreService(domainInfo.storeSlug);
                    if(response.ok){
                        const data = await response.json();
                        setStoreData(data);
                        setDoummntTitle(document, domainInfo.storeSlug);
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
    },[]);
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
        <DomainContext.Provider value={{ domainInfo, storeData, loading, setStoreDataByStoreName }}>
            {children}
        </DomainContext.Provider>
    )
}