import { ImagePlus, Save, X, User, Building2, Phone, Mail, MapPin, FileText, Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useToast } from "../../../hooks/useToast";
import { getProductSupplier, getProductUnits, saveSupplier, updateProduct } from "../../../service/admin/inventory/InventoryService";

const UpdateProduct = ({ setShowUpdateModal, productData, dynamicCategories }) => {
  const { toast } = useToast();
  const [productUnits, setProductUnits] = useState(
    ['Piece', 'Kg', 'Gram', 'Liter', 'Box', 'Packet', 'Dozen', 'Meter', 'Centimeter', 'Inch', 'Roll', 'Set', 'Pair']
  );

  const [suppliers, setSuppliers] = useState([]);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [updatedProduct, setUpdatedProduct] = useState({
    id: '',
    product_name: '',
    sku: '',
    images: [],
    product_price: '',
    original_price: '',
    product_quantity: '',
    category: '',
    brand: '',
    supplier_id: '',
    category_id: '',
    unit: '',
    product_description: '',
    low_stock_threshold: 0,
    dimensions: '',
    product_serial_no: '',
    weight: '',
    shipping_charge: 0,
  });

  const [newSupplier, setNewSupplier] = useState({
    supplier_name: '',
    company_name: '',
    supplier_contact: '',
    supplier_email: '',
    supplier_address: '',
    supplier_gst_number: ''
  });

  // Initialize product data when component mounts or productData changes
  useEffect(() => {
    if (productData) {
      setUpdatedProduct({
        id: productData.id || '',
        product_name: productData.product_name || '',
        sku: productData.sku || '',
        images: productData.images || [],
        product_price: productData.product_price || '',
        original_price: productData.original_price || '',
        product_quantity: productData.product_quantity || '',
        category: productData.category || '',
        category_id: productData.category?.id || '',
        brand: productData.brand || '',
        supplier_id: productData.supplier?.id || '',
        unit: productData.unit || '',
        product_description: productData.product_description || '',
        low_stock_threshold: productData.low_stock_threshold || 0,
        dimensions: productData.dimensions || '',
        product_serial_no: productData.product_serial_no || '',
        weight: productData.weight || '',
        shipping_charge: productData.shipping_charge || 0,
      });
    }
  }, [productData]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imagePromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve({
            file,
            url: event.target.result,
            name: file.name,
            isNew: true // Flag to identify new images
          });
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(imagePromises).then(images => {
      setUpdatedProduct(prev => ({
        ...prev,
        images: [...prev.images, ...images].slice(0, 5)
      }));
    });
  };

  const removeImage = (index) => {
    setUpdatedProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateProduct = async () => {
    setIsLoading(true);
    try {
      const payload = {
        ...updatedProduct,
        slug: updatedProduct.product_name.replace(/\s+/g, '-').toLowerCase(),
      };
      
      const response = await updateProduct(productData.id, payload, toast);
      if (response?.success === true) {
        setShowUpdateModal(false);
      }
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error('Failed to update product');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveSupplier = async () => {
    try {
      const response = await saveSupplier(newSupplier, toast);
      if (response?.data) {
        setSuppliers(prev => [...prev, response.data]);
        setUpdatedProduct(prev => ({ ...prev, supplier_id: response.data.id }));
        setNewSupplier({
          supplier_name: '',
          company_name: '',
          supplier_contact: '',
          supplier_email: '',
          supplier_address: '',
          supplier_gst_number: ''
        });
        setShowSupplierModal(false);
      }
    } catch (error) {
      console.error('Error saving supplier:', error);
    }
  };

  const fetchProductUnits = async () => {
    const response = await getProductUnits(toast);
    if (response?.data) {
      setProductUnits([...productUnits, ...response.data]);
    }
  };

  const fetchSuppliers = async () => {
    const response = await getProductSupplier(toast);
    if (response?.data) {
      setSuppliers(response.data);
    }
  };

  useEffect(() => {
    fetchProductUnits();
    fetchSuppliers();
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-none shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <Edit3 className="w-6 h-6 text-gray-600" />
              <h2 className="text-2xl font-light text-gray-900 tracking-tight uppercase">
                Update Product
              </h2>
            </div>
            <button
                onClick={() => setShowUpdateModal(false)}
                className="text-red-400/60 hover:text-red-500 hover:bg-red-50/50 transition-all duration-200 rounded-full p-1.5 group"
              >
                <X className="w-6 h-6 group-hover:rotate-90 transition-transform duration-200 cursor-pointer" />
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
                    value={updatedProduct.product_name}
                    onChange={(e) => setUpdatedProduct(prev => ({ ...prev, product_name: e.target.value }))}
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
                    value={updatedProduct.sku}
                    onChange={(e) => setUpdatedProduct(prev => ({ ...prev, sku: e.target.value.toUpperCase() }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-mono focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    placeholder="e.g., PROD-001-2024"
                    required
                  />
                </div>

                {/* Price & Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Cost Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={updatedProduct.original_price}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, original_price: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="0"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Selling Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={updatedProduct.product_price}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, product_price: e.target.value }))}
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
                      value={updatedProduct.unit}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, unit: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    >
                      <option value="">Select Unit</option>
                      {productUnits.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Dimensions
                    </label>
                    <input
                      type="text"
                      value={updatedProduct.dimensions}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, dimensions: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="10x5x3 cm"
                    />
                  </div>
                </div>

                {/* Quantity & Stock Levels */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Stock Qty *
                    </label>
                    <input
                      type="number"
                      value={updatedProduct.product_quantity}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, product_quantity: e.target.value }))}
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
                      value={updatedProduct.low_stock_threshold}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, low_stock_threshold: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="5"
                      min="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Shipping (₹) *
                    </label>
                    <input
                      type="number"
                      value={updatedProduct.shipping_charge}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, shipping_charge: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="0"
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
                      value={updatedProduct.category_id}
                      onChange={(e) => {
                        if (e.target.value === 'add_new') {
                          // Handle add new category if needed
                          console.log('Add new category functionality needed');
                        } else {
                          setUpdatedProduct(prev => ({ ...prev, category_id: e.target.value }));
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      required
                    >
                      <option value="">{updatedProduct.category.name}</option>
                      {dynamicCategories && dynamicCategories.map(category => (
                        <option key={category.id} value={category.id}>{category?.name}</option>
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
                  <div className="relative">
                    <select
                      value={updatedProduct.supplier_id}
                      onChange={(e) => {
                        if (e.target.value === 'add_new') {
                          setShowSupplierModal(true);
                        } else {
                          setUpdatedProduct(prev => ({ ...prev, supplier_id: e.target.value }));
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    >
                      <option value="">{updatedProduct?.supplier_name?.supplier_name || 'Select Supplier'}</option>
                      {suppliers.map(supplier => (
                        <option key={supplier.id} value={supplier.id}>
                          {supplier.supplier_name} - {supplier.company_name}
                        </option>
                      ))}
                      <option value="add_new" className="font-medium text-gray-900 border-t border-gray-200">
                        + Add New Supplier
                      </option>
                    </select>
                  </div>
                  {/* Show current supplier info as readonly info */}
                  {(productData?.supplier_name || productData?.company_name) && (
                    <div className="mt-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded border">
                      <div className="flex flex-col space-y-1">
                        {productData.supplier_name && (
                          <div><span className="font-medium">Current Supplier:</span> {productData.supplier_name}</div>
                        )}
                        {productData.company_name && (
                          <div><span className="font-medium">Company:</span> {productData.company_name}</div>
                        )}
                        {productData.supplier_contact && (
                          <div><span className="font-medium">Contact:</span> {productData.supplier_contact}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Brand */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    Brand
                  </label>
                  <input
                    type="text"
                    value={updatedProduct.brand}
                    onChange={(e) => setUpdatedProduct(prev => ({ ...prev, brand: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    placeholder="Enter brand name"
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
                  {updatedProduct.images.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-4">
                      {updatedProduct.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={image.url || image}
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
                    value={updatedProduct.product_description}
                    onChange={(e) => setUpdatedProduct(prev => ({ ...prev, product_description: e.target.value }))}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200 resize-none"
                    placeholder="Enter product description, features, specifications..."
                  />
                </div>

                {/* Additional Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Serial Number
                    </label>
                    <input
                      type="text"
                      value={updatedProduct.product_serial_no}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, product_serial_no: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="Enter serial number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                      Weight
                    </label>
                    <input
                      type="text"
                      value={updatedProduct.weight}
                      onChange={(e) => setUpdatedProduct(prev => ({ ...prev, weight: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                      placeholder="e.g., 2.5 kg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={() => setShowUpdateModal(false)}
              className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none font-medium"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              onClick={handleUpdateProduct}
              disabled={isLoading}
              className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 rounded-none font-medium uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              <span>{isLoading ? 'Updating...' : 'Update Product'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Add Supplier Modal */}
      {showSupplierModal && (
        <div className="fixed inset-0 bg-white bg-opacity-80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
          <div className="bg-white rounded-none shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Supplier Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-light text-gray-900 tracking-tight uppercase">Add New Supplier</h3>
              <button
                onClick={() => setShowSupplierModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Supplier Modal Body */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Supplier Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    <User className="w-4 h-4 inline mr-2" />
                    Supplier Name *
                  </label>
                  <input
                    type="text"
                    value={newSupplier.supplier_name}
                    onChange={(e) => setNewSupplier(prev => ({ ...prev, supplier_name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    placeholder="Enter supplier name"
                    required
                  />
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    <Building2 className="w-4 h-4 inline mr-2" />
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={newSupplier.company_name}
                    onChange={(e) => setNewSupplier(prev => ({ ...prev, company_name: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    placeholder="Enter company name"
                    required
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={newSupplier.supplier_contact}
                    onChange={(e) => setNewSupplier(prev => ({ ...prev, supplier_contact: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    placeholder="Enter phone number"
                    required
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={newSupplier.supplier_email}
                    onChange={(e) => setNewSupplier(prev => ({ ...prev, supplier_email: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    placeholder="Enter email address"
                  />
                </div>

                {/* GST Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    <FileText className="w-4 h-4 inline mr-2" />
                    GST Number
                  </label>
                  <input
                    type="text"
                    value={newSupplier.supplier_gst_number}
                    onChange={(e) => setNewSupplier(prev => ({ ...prev, supplier_gst_number: e.target.value.toUpperCase() }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-mono focus:ring-0 focus:border-gray-900 transition-colors duration-200"
                    placeholder="e.g., 29ABCDE1234F1Z5"
                  />
                </div>

                {/* Address */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
                    <MapPin className="w-4 h-4 inline mr-2" />
                    Address
                  </label>
                  <textarea
                    value={newSupplier.supplier_address}
                    onChange={(e) => setNewSupplier(prev => ({ ...prev, supplier_address: e.target.value }))}
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-none font-light focus:ring-0 focus:border-gray-900 transition-colors duration-200 resize-none"
                    placeholder="Enter complete address"
                  />
                </div>
              </div>
            </div>

            {/* Supplier Modal Footer */}
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => setShowSupplierModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSupplier}
                className="flex items-center space-x-2 px-6 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors duration-200 rounded-none font-medium uppercase tracking-wider"
              >
                <Save className="w-4 h-4" />
                <span>Save Supplier</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateProduct;