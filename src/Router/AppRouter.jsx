import { Routes, Route } from 'react-router-dom';
import { useDomainContext } from '../context/domainContext/domainContext';
import FullscreenLoader from '../component/Loader/FullScreenLoader';
import gonliesRoutes from './goOnlinesRouter';
import { ShopOfflineCard } from '../component/Loader/StoreStatus/OfflineStore';

export const AppRouter = () => {
  const  {domainInfo, storeData, loading} = useDomainContext();


  if (loading) return <FullscreenLoader  message='Fecting Domain Details plase wait....' />

  if(!domainInfo.isSubdomain) 
    return (
      <Routes>
         {gonliesRoutes.map((route,index) =>(
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
         ))}
      </Routes>
    );
  if(domainInfo.isSubdomain && !storeData) 
    return (
      <Routes>
        <Route
          path='*'
          element={<ShopOfflineCard/>}
        />
      </Routes>
    );
};

export default AppRouter;

