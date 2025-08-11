import CardLoader from "../../common/ComLoader";
import ProductCard from "../../common/ProductCard";

const ProductListComponent = ({productData, loading}) => {

  if (loading) return (
    <div>
      <CardLoader isLoading={loading} message="Loading products, please wait..."/>;
    </div> 
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
  );
};
export default ProductListComponent;