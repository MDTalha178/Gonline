import { Grid3X3, List, Search, SlidersHorizontal, X } from "lucide-react";

const ProductSearchComponent = ({searchQuery, setSearchQuery}) => {
return (
    <div className="bg-white rounded-none shadow-sm p-6 mb-6 border border-gray-200">
      {/* Search Bar */}
      <div className="flex flex-col lg:flex-row gap-4 mb-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-none focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>
        <button className="bg-gray-900 text-white px-8 py-3 rounded-none font-semibold hover:bg-gray-800 transition-all duration-200 whitespace-nowrap">
          Search
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-gray-600 font-medium">1,247 Products Found</span>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Show:</span>
            <select className="border border-gray-300 rounded-none px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
              <option>12 per page</option>
              <option>24 per page</option>
              <option>48 per page</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-gray-600" />
            <span className="text-sm text-gray-600">Sort by:</span>
            <select className="border border-gray-300 rounded-none px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-500">
              <option>Relevance</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
              <option>Newest First</option>
              <option>Best Selling</option>
            </select>
          </div>

          {/* View Toggle */}
          <div className="flex items-center bg-gray-100 rounded-none p-1">
            <button className="p-2 rounded-none bg-white shadow-sm">
              <Grid3X3 className="w-4 h-4 text-gray-900" />
            </button>
            <button className="p-2 rounded-none hover:bg-white transition-colors">
              <List className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Filters */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <span className="text-sm text-gray-600">Active Filters:</span>
        <div className="flex flex-wrap gap-2">
          {['Electronics', 'Under ₹100', 'In Stock'].map((filter) => (
            <span key={filter} className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-none text-sm">
              {filter}
              <X className="w-3 h-3 cursor-pointer hover:text-gray-900" />
            </span>
          ))}
        </div>
      </div>
    </div>
);
}

export default ProductSearchComponent;