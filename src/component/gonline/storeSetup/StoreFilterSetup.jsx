import colorOptions from "../../../data/colorOptions"
import StoreFilter from "./storeFilter"
import ColorPicker from "./ColorPickerComponent"

const StoreFilterSetupComponent = ({filterData, updateFilterData}) =>{
    return (
        <StoreFilter filterData={filterData}  updateFilterData={updateFilterData}/>
    )
}

export default StoreFilterSetupComponent