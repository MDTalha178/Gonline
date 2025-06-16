import Footer from '../component/common/Footer'
import Header from '../component/common/Header'
import { BrowserRouter } from "react-router-dom";
import AppRouter from '../Router/AppRouter';
import ToastProvider from '../context/toastContext/toastProvider';

function App() {
  // const history = createBrowserHistory();
  return (
    <>
    <div className='min-h-screen'>
    
    <BrowserRouter>
    <ToastProvider >
    <Header
      leftContent={["Gonline"]} 
      rightContent={["Features", "Explore Shops", "Pricing", "About"]} 
      leftbutton={[]} 
      rightbutton={["Start Your Shop", "Login"]}
    />
      <AppRouter />
       <Footer />
    </ToastProvider>
    </BrowserRouter>
    {/* <AuthPages /> */}
    </div>
      
    </>
  )
}

export default App
