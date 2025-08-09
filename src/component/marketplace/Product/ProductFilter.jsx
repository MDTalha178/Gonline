import { ChevronDown, Filter, Star } from "lucide-react";

const ProductFilter = ({filter, setFilter}) => {
    const handleCategoryChange = (event) => {
        const category = event.target.name;
        const isChecked = event.target.checked;

        if(isChecked) {
            setFilter({...filter, category: [...filter.category, category]});
        }else{
            const filterCategories = filter.category.filter((item) =>(
                item !== category
            ))
            setFilter({...filter, category: filterCategories});
        }
    }
return (
    <div className="bg-white rounded-none shadow-sm p-6 sticky top-6 border border-gray-200">
      <div className="flex items-center gap-2 mb-6">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
        <button className="ml-auto text-sm text-gray-600 hover:text-gray-900 font-medium">
          Clear All
        </button>
      </div>
      
      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
          Categories
          <ChevronDown className="w-4 h-4" />
        </h4>
        <div className="space-y-3">
          {[
            { name: 'Electronics', count: 245 },
            { name: 'Clothing & Fashion', count: 189 },
            { name: 'Home & Garden', count: 156 },
            { name: 'Sports & Outdoors', count: 123 },
            { name: 'Books & Media', count: 89 },
            { name: 'Health & Beauty', count: 67 }
          ].map((category) => (
            <label key={category.name} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input  name={category.name} onChange={(e) => handleCategoryChange(e)} type="checkbox" className="rounded border-gray-300 text-gray-800 focus:ring-gray-500" />
                <span className="ml-2 text-gray-700 group-hover:text-gray-900">{category.name}</span>
              </div>
              <span className="text-sm text-gray-500">({category.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
          Price Range
          <ChevronDown className="w-4 h-4" />
        </h4>
        <div className="space-y-4">
          <div className="flex gap-2">
            <input 
              type="number" 
              placeholder="Min" 
              className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
            <input 
              type="number" 
              placeholder="Max" 
              className="w-full px-3 py-2 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            />
          </div>
          <input type="range" className="w-full accent-gray-600" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>₹0</span>
            <span>₹1000+</span>
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
          Brand
          <ChevronDown className="w-4 h-4" />
        </h4>
        <div className="space-y-3">
          {[
            { name: 'Apple', count: 45 },
            { name: 'Samsung', count: 38 },
            { name: 'Nike', count: 29 },
            { name: 'Adidas', count: 24 },
            { name: 'Sony', count: 19 }
          ].map((brand) => (
            <label key={brand.name} className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-gray-800 focus:ring-gray-500" />
                <span className="ml-2 text-gray-700 group-hover:text-gray-900">{brand.name}</span>
              </div>
              <span className="text-sm text-gray-500">({brand.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3 flex items-center justify-between">
          Customer Rating
          <ChevronDown className="w-4 h-4" />
        </h4>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <label key={rating} className="flex items-center cursor-pointer group">
              <input type="checkbox" className="rounded border-gray-300 text-gray-800 focus:ring-gray-500" />
              <div className="flex items-center ml-2">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">& up</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-900 mb-3">Availability</h4>
        <div className="space-y-2">
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-gray-800 focus:ring-gray-500" />
            <span className="ml-2 text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input type="checkbox" className="rounded border-gray-300 text-gray-800 focus:ring-gray-500" />
            <span className="ml-2 text-gray-700">On Sale</span>
          </label>
        </div>
      </div>

      <button className="w-full bg-gray-900 text-white py-3 rounded-none font-semibold hover:bg-gray-800 transition-all duration-200">
        Apply Filters
      </button>
    </div>
);
}

export default ProductFilter;