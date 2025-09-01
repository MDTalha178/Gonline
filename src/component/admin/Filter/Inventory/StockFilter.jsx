import DropdownFilter from "../../DropDrown/DropDownFilter";

const StockFilter = ({selectedStock, setShowStockFilter, setSelectedStock, stockOptions, showStockFilter}) =>{
    return(
        <DropdownFilter
            label="Stock"
            value={selectedStock}
            options={stockOptions}
            isOpen={showStockFilter}
            setIsOpen={setShowStockFilter}
            onChange={setSelectedStock}
        />
    )
}

export default StockFilter;