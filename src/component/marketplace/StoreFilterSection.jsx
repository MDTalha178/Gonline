import { Filter } from "lucide-react"
import RangeFilterComponent from "./Filter/RangeFilter"
import { FILTER_TYPE } from "../../utils/constant"

const StoreFilterSection = ({filterData}) =>{

    console.log(filterData, 'filterData')
    return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-purple-600" />
        <p className="text-lg font-semibold text-gray-900">{filterData?.mainHeading}</p>
      </div>
      
     {Object.entries(filterData).map(([key, filterValue]) => (
          <div className="mb-6" key={key}>
            {filterValue?.filter &&(
                <p className="font-medium text-gray-900 mb-2">{filterValue.filter}</p>
                )}
            <div className="space-y-2">
              {filterValue?.filter_type == FILTER_TYPE.LIST && (
                filterValue?.filter_list.map((category, index) => (
                  <p>{category}</p>
                ))
              )}
              {filterValue?.filter_type == FILTER_TYPE.RANGE && (
                 <RangeFilterComponent label={filterValue.filter} min={filterValue.filter_list[0]}  max={filterValue.filter_list[1]}/>
              )}
            </div>
          </div>
      ))}
        <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-full font-semibold hover:shadow-lg transition-all">
            {filterData.buttonText}
        </button>

    </div>
    )
}

export default StoreFilterSection