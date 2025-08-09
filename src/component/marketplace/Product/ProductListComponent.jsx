import ProductCard from "../../common/ProductCard";

const ProductListComponent = ({productData}) => {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {productData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
  );
};
export default ProductListComponent;