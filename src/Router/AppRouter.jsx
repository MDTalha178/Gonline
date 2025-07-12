import { Routes, Route } from 'react-router-dom';
import { useDomainContext } from '../context/domainContext/domainContext';
import FullscreenLoader from '../component/Loader/FullScreenLoader';
import gonliesRoutes from './goOnlinesRouter';

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
};

export default AppRouter;

