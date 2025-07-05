import { ShoppingCart } from "lucide-react";

const DealsOfTheDayComponent = ({dealsData}) => {
  
    return(
        <>
          <div className={`${dealsData?.parentStyleColor || 'bg-gray-900'} p-12 text-white -mx-8`}>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
                <div>
                    <h2 className="text-5xl font-light mb-4 tracking-tight">
                        {dealsData?.mainHeading?.text || "Deals of the Day"}
                    </h2>
                    <p className="text-gray-300 text-lg font-light">
                        {dealsData?.subHeading?.text || "Limited time offers on premium products"}
                    </p>
                </div>
                
                {/* Countdown Timer */}
                <div className="mt-8 lg:mt-0">
                    <div className="text-center mb-6">
                        <p className="text-sm font-medium text-gray-300 uppercase tracking-wider">
                            {dealsData?.timerHeading?.text || "Ends In"}
                        </p>
                    </div>
                    <div className="flex gap-4 justify-center">
                        {[
                            { label: 'Hours', value: '08' },
                            { label: 'Minutes', value: '45' },
                            { label: 'Seconds', value: '23' }
                        ].map((time, index) => (
                            <div key={time.label} className="bg-white/10 backdrop-blur-sm border border-white/20 p-4 text-center min-w-[70px]">
                                <div className="text-2xl font-light">{time.value}</div>
                                <div className="text-xs text-gray-300 uppercase tracking-wider mt-1">{time.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[1, 2, 3].map((deal) => (
                    <div key={deal} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 hover:bg-white/10 transition-all duration-500 group">
                        <div className="w-full h-48 bg-white/10 mb-6 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                            <ShoppingCart className="w-20 h-20 text-white/50 group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <h3 className="font-medium mb-4 text-lg text-white">Amazing Product {deal}</h3>
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-3xl font-light">$29.99</span>
                            <span className="text-sm line-through text-gray-400">$49.99</span>
                            <span className="bg-white/20 px-3 py-1 text-sm font-medium tracking-wider">40% OFF</span>
                        </div>
                        <button className="w-full bg-white text-gray-900 py-3 font-medium hover:bg-gray-100 transition-colors duration-300 uppercase tracking-wider text-sm">
                            {dealsData?.product_cart?.button?.text || "Add to Cart"}
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </>
        
    )
}

export default DealsOfTheDayComponent;