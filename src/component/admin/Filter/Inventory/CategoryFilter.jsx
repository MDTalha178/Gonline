import DropdownFilter from "../../DropDrown/DropDownFilter";

const CategoryFilter = ({selectedCategory, setShowCategoryFilter, setSelectedCategory, categories, showCategoryFilter}) =>{
    const categoryNames = categories.map(cat => cat.name);
    return(
        <DropdownFilter
            label="Category"
            value={selectedCategory}
            options={categoryNames}
            isOpen={showCategoryFilter}
            setIsOpen={setShowCategoryFilter}
            onChange={setSelectedCategory}
        />
    )
}

export default CategoryFilter;