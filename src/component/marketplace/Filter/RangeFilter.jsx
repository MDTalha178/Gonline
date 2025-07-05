const RangeFilterComponent = ({label, min, max, handleInputChange}) => {
    return (
      <>
      <input type="range" className="w-full accent-purple-600" />
      <div className="flex justify-between text-sm text-gray-600">
        <p>value={"$" + min}</p>
        <p> value={"$" + max + "+"}</p>
      </div>
      </>
     
    );
}

export default RangeFilterComponent