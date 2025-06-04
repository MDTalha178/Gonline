import Homepage from '../component/gonline/Home'
import Footer from '../component/common/Footer'
import Header from '../component/common/Header'

function App() {

  return (
    <>
    <div className='min-h-screen'>
    <Header
      leftContent={["Gonline"]} 
      rightContent={["Features", "Explore Shops", "Pricing", "About"]} 
      leftbutton={[]} 
      rightbutton={["Start Your Shop"]}
    />
    <Homepage />
    <Footer />
    </div>
      
    </>
  )
}

export default App
