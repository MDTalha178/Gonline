import EditableText from "./EditableTextComponent"

const EidtbaleListFilter = ({category, updateFilterData, filterDataKey, value}) => {
    const updateFilterList = (newValue) =>{
       const {text} = newValue
        const filterList = [...value.filter_list]
        filterList.pop(category);
        updateFilterData(filterDataKey, {...value, filter_list: [...filterList, text]})
    }
    return (
        <>
         <label key={category} className="flex items-center cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 text-purple-600 focus:ring-purple-500" />
               <EditableText value={category} onChange={(value) => updateFilterList(value)} className="block ml-2" placeholder="Enter category" elementType="category" />
              {/* <span className="ml-2 text-gray-700">{category}</span> */}
        </label>
        </>
    )
}

export default EidtbaleListFilter