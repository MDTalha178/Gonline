import { 
  Search, 
  Filter, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye,
  ChevronDown,
  Calendar,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  ArrowUpDown,
  Download,
  Upload,
  X,
  Camera,
  Save,
  ImagePlus
} from "lucide-react";
import { useEffect, useState } from "react";
import AdminSidebar from "../Sidebar";
import InventoryHeader from "./InventoryHeader";
import SearchInventory from "./SearchProduct";
import CategoryFilter from "../Filter/Inventory/CategoryFilter";
import StockFilter from "../Filter/Inventory/StockFilter";
import DateRangeFilter from "../Filter/Inventory/DateRangeFilter";
import ProductStats from "./ProductStats";
import ProductList from "./ProductList";
import AddNewProduct from "./AddNewProduct";
import { getStoreproduct } from "../../../service/marketPlace/product_service";
import { useToast } from "../../../hooks/useToast";
import { deleteProductService } from "../../../service/admin/inventory/InventoryService";

const AdminInventory = () => {
  const {toast} = useToast()
  const [searchTerm, setSearchTerm] = useState("");
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const [showStockFilter, setShowStockFilter] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStock, setSelectedStock] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showNewCategoryModal, setShowNewCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [product, setProduct] = useState([]);
  const [dynamicCategories, setDynamicCategories] = useState(["Electronics", "Clothing", "Home & Garden", "Books", "Sports", "Health"]);

  const categories = ["All", ...dynamicCategories];
  const stockOptions = ["All", "In Stock", "Out of Stock", "Low Stock"];

   const fetchProduct = async () => {
      const response = await getStoreproduct(toast, null, {});
      if (response?.data){
          setProduct(response.data);
      }
    }

  const sampleProducts = [
    {
      id: "P001",
      name: "Samsung Galaxy S24",
      price: 89999,
      quantity: 45,
      inStock: true,
      category: "Electronics",
      unit: "Piece",
      sku: "SAM-S24-256",
      supplier: "Samsung India",
      lastUpdated: "2024-08-15"
    },
    {
      id: "P002",
      name: "Nike Air Max Shoes",
      price: 8999,
      quantity: 0,
      inStock: false,
      category: "Sports",
      unit: "Pair",
      sku: "NIK-AM-42",
      supplier: "Nike Store",
      lastUpdated: "2024-08-14"
    },
    {
      id: "P003",
      name: "Cotton T-Shirt",
      price: 799,
      quantity: 5,
      inStock: true,
      category: "Clothing",
      unit: "Piece",
      sku: "COT-TS-M",
      supplier: "Fashion Hub",
      lastUpdated: "2024-08-16"
    },
    {
      id: "P004",
      name: "Wireless Earbuds",
      price: 2999,
      quantity: 120,
      inStock: true,
      category: "Electronics",
      unit: "Piece",
      sku: "WRL-EB-BT",
      supplier: "Tech World",
      lastUpdated: "2024-08-15"
    },
    {
      id: "P005",
      name: "Yoga Mat",
      price: 1299,
      quantity: 8,
      inStock: true,
      category: "Sports",
      unit: "Piece",
      sku: "YOG-MAT-6MM",
      supplier: "Fitness Store",
      lastUpdated: "2024-08-13"
    }
  ];


  const handleAddNewCategory = () => {
    if (newCategoryName.trim() && !dynamicCategories.includes(newCategoryName.trim())) {
      setDynamicCategories(prev => [...prev, newCategoryName.trim()]);
      setNewProduct(prev => ({ ...prev, category: newCategoryName.trim() }));
      setNewCategoryName('');
      setShowNewCategoryModal(false);
    }
  };

  const filteredProducts = sampleProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    const matchesStock = selectedStock === "All" || 
                        (selectedStock === "In Stock" && product.quantity > 10) ||
                        (selectedStock === "Low Stock" && product.quantity > 0 && product.quantity <= 10) ||
                        (selectedStock === "Out of Stock" && product.quantity === 0);
    
    return matchesSearch && matchesCategory && matchesStock;
  });

  const handleOnDelete = async (productId) => {
    const response =  await deleteProductService(productId, toast);
        if (response?.success === true){
          fetchProduct();
        }
  }

  useEffect(() =>{
    fetchProduct();
  }, [showAddModal, setProduct])

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar placeholder */}
      <AdminSidebar currentPage="Inventory"/>
      
      {/* Main Inventory Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
       <InventoryHeader setShowAddModal={setShowAddModal}/>

        {/* Search and Filters */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            {/* Search */}
            <SearchInventory searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>


            {/* Category Filter */}
            <CategoryFilter selectedCategory={selectedCategory} setShowCategoryFilter={setShowCategoryFilter} setSelectedCategory={setSelectedCategory} categories={dynamicCategories}/>

            {/* Stock Filter */}
            <StockFilter selectedStock={selectedStock} setShowStockFilter={setShowStockFilter} setSelectedStock={setSelectedStock} stockOptions={stockOptions} showStockFilter={showStockFilter}/>

            {/* Date Range */}
            <DateRangeFilter dateRange={dateRange} setDateRange={setDateRange}/>
          </div>
        </div>

        {/* Stats Cards */}
        <ProductStats product={product}/>

        {/* Products Table */}
        <div className="bg-white rounded-none shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    <button className="flex items-center space-x-1 hover:text-gray-900 transition-colors">
                      <span>Product</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">SKU</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Stock Status</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Supplier</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Last Updated</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {product.map((product, index) => {
                  return (
                    <ProductList key={index} product={product} handleOnDelete={handleOnDelete}/>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
          <span>Showing {filteredProducts.length} of {sampleProducts.length} products</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 rounded-none">
              Previous
            </button>
            <span className="px-3 py-1 bg-gray-900 text-white rounded-none">1</span>
            <button className="px-3 py-1 border border-gray-300 hover:bg-gray-50 transition-colors duration-200 rounded-none">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
       <AddNewProduct setShowAddModal={setShowAddModal} dynamicCategories={dynamicCategories}/>
      )}

      {/* Add New Category Modal */}
      {showNewCategoryModal && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-60 p-4">
          <div className="bg-white rounded-none shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wider">Add New Category</h3>
              <button
                onClick={() => setShowNewCategoryModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                Category Name
              </label>
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                placeholder="Enter new category name"
                autoFocus
              />
            </div>
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowNewCategoryModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none"
              >
                Cancel
              </button>
              <button
                onClick={handleAddNewCategory}
                className="px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 rounded-none font-medium"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminInventory;