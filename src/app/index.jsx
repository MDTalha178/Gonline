import Footer from '../component/common/Footer'
import Header from '../component/common/Header'
import { BrowserRouter } from "react-router-dom";
import AppRouter from '../Router/AppRouter';
import ToastProvider from '../context/toastContext/toastProvider';
import AuthProvider from '../context/authContext/authContext';
import { DomainProvider } from '../context/domainContext/domainContext';
function App() {
  return (
    <div className='min-h-screen'>
      <BrowserRouter>
      <ToastProvider> 
        <DomainProvider>
        <AuthProvider> 
            <AppRouter />
        </AuthProvider> 
        </DomainProvider>
          </ToastProvider>
      </BrowserRouter>
    </div>
  );
}


export default App
