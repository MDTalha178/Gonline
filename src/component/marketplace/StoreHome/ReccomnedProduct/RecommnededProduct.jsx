const RecommendedProducts = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Mouse Pro",
      price: 49.99,
      originalPrice: 69.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
      rating: 4.5
    },
    {
      id: 2,
      name: "USB-C Cable",
      price: 19.99,
      originalPrice: 29.99,
      image: "https://images.unsplash.com/photo-1558618047-e7c061d5acf6?w=200&h=200&fit=crop",
      rating: 4.8
    },
    {
      id: 3,
      name: "Phone Stand",
      price: 24.99,
      image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?w=200&h=200&fit=crop",
      rating: 4.3
    }
  ];

  return (
    <div className="bg-white rounded-none shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">You might also like</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <div className="aspect-square rounded-none overflow-hidden border border-gray-200 mb-3">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <h4 className="font-medium text-gray-900 text-sm mb-1">{product.name}</h4>
            <div className="flex items-center space-x-2">
              <span className="font-medium text-gray-900">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-500 line-through">${product.originalPrice}</span>
              )}
            </div>
            <button className="w-full mt-2 bg-gray-100 text-gray-700 py-1 px-3 rounded-none text-sm font-medium hover:bg-gray-200 transition-colors duration-200 uppercase tracking-wider">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedProducts;