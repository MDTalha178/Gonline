import { Routes, Route } from 'react-router-dom';
import { useDomainContext } from '../context/domainContext/domainContext';
import FullscreenLoader from '../component/Loader/FullScreenLoader';
import gonliesRoutes from './goOnlinesRouter';
import subDomainRoutes from './subDomainRouter';
import ShopStatusCardsDemo from '../component/common/StoreStatus';
import AdminRoutes from './adminRouter';

export const AppRouter = () => {
  const  {domainInfo, storeData, loading, error} = useDomainContext();

  if (loading) return <FullscreenLoader  message='Fecting Domain Details plase wait....' />

  if(error) return  <ShopStatusCardsDemo  data={error} />

  if(domainInfo.isMainDomain) 
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
  if(domainInfo.isSubdomain) 
    return (
      <Routes>
         {subDomainRoutes.map((route,index) =>(
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
         ))}
      </Routes>
    );
  
  if(domainInfo.isAdmin) 
    return (
      <Routes>
         {AdminRoutes.map((route,index) =>(
          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
         ))}
      </Routes>
    );
};

export default AppRouter;
