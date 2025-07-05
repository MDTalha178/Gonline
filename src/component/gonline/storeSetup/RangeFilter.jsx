import EditableText from "./EditableTextComponent";

const EditableRangeFilterComponent = ({label, min, max, handleInputChange}) => {
    return (
      <>
      <input type="range" className="w-full accent-purple-600" />
      <div className="flex justify-between text-sm text-gray-600">
        <EditableText value={"$" + min} onChange={(value) => handleInputChange('price', value)} className="block ml-2" placeholder="Enter price" elementType="price" />
        <EditableText value={"$" + max + "+"} onChange={(value) => handleInputChange('price', value)} className="block ml-2" placeholder="Enter price" elementType="price" />
      </div>
      </>
     
    );
}

export default EditableRangeFilterComponent