import React, { createContext, useContext, useEffect, useState } from 'react';
import { getDomainInfo } from '../../utils/domain';
import setDoummntTitle from '../../utils/utils';
import { useToast } from '../../hooks/useToast';

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
    },[])

    return(
        <DomainContext.Provider value={{ domainInfo, storeData, loading }}>
            {children}
        </DomainContext.Provider>
    )
}