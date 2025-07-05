import { ShoppingCart } from "lucide-react";
import EditableText from "./EditableTextComponent"
import EditableButton from "./EditableButton";

const DealsOfTheDayComponent = ({dealsData, updateDealsData}) =>{
  const handleInputChange = (field, value) => {

    if(field == 'dealsButton'){
      const {product_cart} = dealsData
      const data = {
        ...product_cart,
        button: {...value}
      }
      updateDealsData('product_cart', data)
    }
    
  }
  if(!dealsData) return <div>Loading...</div>
    return(
    <div className={`${dealsData.parentStyleColor} rounded-2xl p-10 text-white -mx-8`}>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <EditableText value={dealsData.mainHeading.text} onChange={(value) => updateDealsData('mainHeading', value)} className="text-4xl font-bold mb-2" placeholder="Enter main heading" elementType="heading" />
          <EditableText value={dealsData.subHeading.text} onChange={(value) => updateDealsData('subHeading', value)} className="text-orange-100" placeholder="Enter subheading" elementType="subheading" />
        </div>
        
        {/* Countdown Timer */}
        <div className="mt-6 lg:mt-0">
          <div className="text-center mb-4">
            <EditableText value={dealsData.timerHeading?.text} onChange={(value) => updateDealsData('timerHeading', value)} className="text-sm font-medium opacity-90" placeholder="Enter timer heading" elementType="timer" />
          </div>
          <div className="flex gap-2 justify-center">
            {[
              { label: 'Hours', value: '08' },
              { label: 'Minutes', value: '45' },
              { label: 'Seconds', value: '23' }
            ].map((time, index) => (
              <div key={time.label} className="bg-white/20 backdrop-blur-md rounded-xl p-3 text-center min-w-[60px]">
                <div className="text-2xl font-bold">{time.value}</div>
                <div className="text-xs opacity-80">{time.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[1, 2, 3].map((deal) => (
          <div key={deal} className="bg-white/10 backdrop-blur-md rounded-xl p-6 hover:bg-white/20 transition-colors">
            <div className="w-full h-40 bg-white/20 rounded-lg mb-4 flex items-center justify-center">
              <ShoppingCart className="w-16 h-16 text-white/70" />
            </div>
            <h3 className="font-semibold mb-2 text-lg">Amazing Product {deal}</h3>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl font-bold">$29.99</span>
              <span className="text-sm line-through opacity-70">$49.99</span>
              <span className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">40% OFF</span>
            </div>
             <EditableButton
                value={dealsData.product_cart.button?.text}
                onChange={(value) => handleInputChange('dealsButton', value)}
                buttonClassName="w-full bg-white text-red-500 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors" 
            />
          </div>
        ))}
      </div>
    </div>
    )
}

export default DealsOfTheDayComponent;