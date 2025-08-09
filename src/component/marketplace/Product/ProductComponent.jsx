import ProductFilter from "./ProductFilter";
import ProductHeaderComponent from "./ProductHeader";
import ProductListComponent from "./ProductListComponent";
import ProductSearchComponent from "./ProductSearchComponent";

const ProductComponent = ({productData, setSearchQuery, searchQuery, filter, setFilter}) => {
  return (
   <div className="min-h-screen bg-gray-50">
        <ProductHeaderComponent/>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <ProductSearchComponent searchQuery={searchQuery}  setSearchQuery={setSearchQuery}/>

            <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-1/5">
                    <ProductFilter filter={filter} setFilter={setFilter}/>
                </div>

                 {/* Product Grid */}
                <div className="lg:w-4/5">
                    <ProductListComponent productData={productData}/>
                </div>
            </div>
        </div>
    </div>
  );
}

export default ProductComponent;