import DropdownFilter from "../../DropDrown/DropDownFilter";

const CategoryFilter = ({selectedCategory, setShowCategoryFilter, setSelectedCategory, categories, showCategoryFilter}) =>{
    return(
        <DropdownFilter
            label="Category"
            value={selectedCategory}
            options={categories}
            isOpen={showCategoryFilter}
            setIsOpen={setShowCategoryFilter}
            onChange={setSelectedCategory}
        />
    )
}

export default CategoryFilter;