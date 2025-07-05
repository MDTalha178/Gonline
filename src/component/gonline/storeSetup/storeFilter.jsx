import { Edit, Filter } from "lucide-react"
import EditableText from "./EditableTextComponent"
import EditableButton from "./EditableButton"
import EidtbaleListFilter from "./EditableListFilter"
import EditableRangeFilterComponent from "./RangeFilter"
import { FILTER_TYPE } from "../../../utils/constant"

const StoreFilter = ({filterData, updateFilterData}) =>{

   if(!filterData){
    return <div>Loading...</div>
   }

   const updateData = (field, value) =>{
      if(field == 'mainHeading'){
        const {text} = value
        updateFilterData('mainHeading', text)
      }
      else if(field == 'buttonText'){
        const {text} = value
        updateFilterData('buttonText', text)
      }
   }
    return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-purple-600" />
        <EditableText 
          value={filterData.mainHeading} 
          onChange={(value) => {
            updateData('mainHeading', value);
          }}
          className="text-lg font-semibold text-gray-900" placeholder="Enter filter" elementType="filter" 
        />
      </div>
      
     {Object.entries(filterData).map(([key, filterValue]) => (
          <div className="mb-6" key={key}>
            {filterValue.filter &&(<EditableText 
              value={filterValue.filter} 
              onChange={(value) => updateFilterData(key, {...filterValue, filter: value.text})} 
              className="font-medium text-gray-900 mb-2" placeholder="Enter filter" elementType="filter" 
            />)}
            <div className="space-y-2">
              {filterValue?.filter_type == FILTER_TYPE.LIST && (
                filterValue?.filter_list.map((category, index) => (
                  <EidtbaleListFilter key={index} category={category} updateFilterData={updateFilterData} filterDataKey={key} value={filterValue}/>
                ))
              )}
              {filterValue.filter_type == FILTER_TYPE.RANGE && (
                 <EditableRangeFilterComponent label={filterValue.filter} min={filterValue.filter_list[0]}  max={filterValue.filter_list[1]}/>
              )}
            </div>
          </div>
      ))}
        <EditableButton
          value={filterData.buttonText}
          onChange={(value) => updateData('buttonText', value)}
          buttonClassName="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all" 
        />

    </div>
    )
}

export default StoreFilter