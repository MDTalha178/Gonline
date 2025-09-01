import { ImagePlus, Save, X } from "lucide-react";
import { useState } from "react";
import { saveProduct } from "../../../service/admin/inventory/InventoryService";
import { useToast } from "../../../hooks/useToast";

const AddNewProduct = ({setShowAddModal, dynamicCategories}) =>{
    const {toast} =  useToast();
    const [newProduct, setNewProduct] = useState({
        product_name: '',
        sku:'',
        images: [],
        product_price: '',
        product_quantity: '',
        category: '',
        sku: '',
        brand: '',
        unit: 'Piece',
        product_description: '',
        minStock: '',
        maxStock: '',
        
    });


    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const imagePromises = files.map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => {
            resolve({
                file,
                url: event.target.result,
                name: file.name
            });
            };
            reader.readAsDataURL(file);
        });
        });

        Promise.all(imagePromises).then(images => {
        setNewProduct(prev => ({
            ...prev,
            images: [...prev.images, ...images].slice(0, 5) 
        }));
        });
    };

    const removeImage = (index) => {
        setNewProduct(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
        }));
    };

    const handleSaveProduct = async () =>{
        // Here you would typically save to your backend
        const payload = {
            ...newProduct,
            slug: newProduct.product_name.replace(/\s+/g, '-').toLowerCase(),
            category_id:'c241529a-17e4-418a-8309-c11cb19387b7'
        }
        const response =  await saveProduct(payload, toast);
        if(response.success === true) setShowAddModal(false)
    }


    return (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-none shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-light text-gray-900 tracking-tight uppercase">Add New Product</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Product Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Product Name *
                    </label>
                    <input
                      type="text"
                      value={newProduct.product_name}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, product_name: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  {/* SKU */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      SKU *
                    </label>
                    <input
                      type="text"
                      value={newProduct.sku}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, sku: e.target.value.toUpperCase() }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-mono focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="e.g., PROD-001-2024"
                      required
                    />
                  </div>

                  {/* Price & Unit */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        value={newProduct.product_price}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, product_price: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                        placeholder="0"
                        min="0"
                        step="0.01"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                        Unit *
                      </label>
                      <select
                        value={newProduct.unit}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, unit: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      >
                        {/* {units.map(unit => (
                          <option key={unit} value={unit}>{unit}</option>
                        ))} */}
                      </select>
                    </div>
                  </div>

                  {/* Quantity & Stock Levels */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                        Initial Qty *
                      </label>
                      <input
                        type="number"
                        value={newProduct.product_quantity}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, product_quantity: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                        placeholder="0"
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                        Min Stock
                      </label>
                      <input
                        type="number"
                        value={newProduct.minStock}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, minStock: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                        placeholder="5"
                        min="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                        Max Stock
                      </label>
                      <input
                        type="number"
                        value={newProduct.maxStock}
                        onChange={(e) => setNewProduct(prev => ({ ...prev, maxStock: e.target.value }))}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                        placeholder="100"
                        min="0"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        value={newProduct.category}
                        onChange={(e) => {
                          if (e.target.value === 'add_new') {
                            setShowNewCategoryModal(true);
                          } else {
                            setNewProduct(prev => ({ ...prev, category: e.target.value }));
                          }
                        }}
                        className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                        required
                      >
                        <option value="">Select Category</option>
                        {dynamicCategories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                        <option value="add_new" className="font-medium text-gray-900 border-t border-gray-200">
                          + Add New Category
                        </option>
                      </select>
                    </div>
                  </div>

                  {/* Supplier */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Supplier
                    </label>
                    <input
                      type="text"
                      value={newProduct.brand}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="Enter supplier name"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Product Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Product Images (Max 5)
                    </label>
                    
                    {/* Image Upload Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-none p-6 hover:border-gray-400 transition-colors duration-200">
                      <div className="text-center">
                        <ImagePlus className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                        <div className="text-sm text-gray-600 mb-4">
                          <label htmlFor="image-upload" className="cursor-pointer font-medium text-gray-900 hover:text-gray-700">
                            Click to upload images
                          </label>
                          <p className="text-gray-500 font-light">or drag and drop</p>
                        </div>
                        <input
                          id="image-upload"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                      </div>
                    </div>

                    {/* Image Preview Grid */}
                    {newProduct.images.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        {newProduct.images.map((image, index) => (
                          <div key={index} className="relative group">
                            <img
                              src={image.url}
                              alt={`Product ${index + 1}`}
                              className="w-full h-24 object-cover border border-gray-200 rounded-none"
                            />
                            <button
                              onClick={() => removeImage(index)}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Description
                    </label>
                    <textarea
                      value={newProduct.product_description}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, product_description: e.target.value }))}
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200 resize-none"
                      placeholder="Enter product description, features, specifications..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 rounded-none font-medium uppercase tracking-wider"
              >
                <Save className="w-4 h-4" />
                <span>Save Product</span>
              </button>
            </div>
          </div>
        </div>
    )
}

export default AddNewProduct