import { Clock } from "lucide-react"
import EditableText from "./EditableTextComponent"
import EditableButton from "./EditableButton"

const UpComingDealsComponent = ({updateDealsData, dealsData}) => {
  if(!dealsData) return <div>Loading...</div>
  
    return(
    <div className={`${dealsData?.parentStyleColor} rounded-2xl p-10 text-white -mx-8`}>
      <div className="text-center mb-10">
        <EditableText value={dealsData.mainHeading.text} onChange={(value) => updateDealsData('mainHeading', value)} className="text-4xl font-bold mb-4" placeholder="Enter main heading" elementType="heading" />
        <EditableText value={dealsData.subHeading.text} onChange={(value) => updateDealsData('subHeading', value)} className="text-gray-300 text-lg" placeholder="Enter subheading" elementType="subheading" />
      </div>
      
      {/* Timer */}
      <div className="flex justify-center mb-10">
        <div className="grid grid-cols-4 gap-6 text-center">
          {[
            { label: 'Days', value: '05' },
            { label: 'Hours', value: '12' },
            { label: 'Minutes', value: '34' },
            { label: 'Seconds', value: '56' }
          ].map((time) => (
            <div key={time.label} className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 min-w-[80px]">
              <div className="text-3xl font-bold">{time.value}</div>
              <div className="text-sm opacity-80">{time.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Products */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className="bg-gray-800 rounded-xl p-6 text-center">
            <div className="w-full h-32 bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
              <Clock className="w-10 h-10 text-gray-400" />
            </div>
            <EditableText value={"Product " + item} onChange={(value) => updateDealsData('secondaryButtonText', value)} className="text-sm font-medium mb-2" placeholder="Enter main heading" elementType="feature" />
            <EditableText value="Up to 60% OFF" onChange={(value) => updateDealsData('secondaryButtonText', value)} className="text-purple-400 font-bold text-lg" placeholder="Enter main heading" elementType="feature" />
          </div>
        ))}
      </div>
      
      <div className="text-center mt-8">
        <EditableButton
            value={dealsData.button.text}
            onChange={(value) => updateDealsData('button', value)}
            buttonClassName="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-semibold hover:shadow-lg transition-all text-lg" 
        />
      </div>
    </div>
    )
}

export default UpComingDealsComponent