import Footer from '../component/common/Footer'
import Header from '../component/common/Header'
import { BrowserRouter } from "react-router-dom";
import AppRouter from '../Router/AppRouter';
import ToastProvider from '../context/toastContext/toastProvider';
import AuthProvider from '../context/authContext/authContext';
function App() {
  return (
    <div className='min-h-screen'>
      <BrowserRouter>
        <AuthProvider> 
          <ToastProvider> 
            <AppRouter />
          </ToastProvider>
        </AuthProvider> 
      </BrowserRouter>
    </div>
  );
}


export default App
