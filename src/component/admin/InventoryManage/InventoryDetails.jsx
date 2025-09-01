import React, { useState } from 'react';
import { ArrowLeft, Edit2, Trash2, Package, DollarSign, TrendingUp, Calendar, User, MapPin, Tag, AlertCircle, CheckCircle, XCircle, Clock } from 'lucide-react';

const ProductDetailsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showEditModal, setShowEditModal] = useState(false);

  // Sample product data - in real app, this would come from props/API
  const product = {
    id: "P001",
    name: "Samsung Galaxy S24",
    price: 89999,
    quantity: 45,
    inStock: true,
    category: "Electronics",
    unit: "Piece",
    sku: "SAM-S24-256",
    supplier: "Samsung India",
    lastUpdated: "2024-08-15",
    description: "The latest flagship smartphone from Samsung featuring cutting-edge technology, premium design, and exceptional performance.",
    barcode: "8901234567890",
    weight: "168g",
    dimensions: "147.0 x 70.6 x 7.6 mm",
    color: "Phantom Black",
    warranty: "1 Year Manufacturer Warranty",
    minimumStock: 10,
    maximumStock: 100,
    reorderPoint: 15,
    costPrice: 75000,
    sellingPrice: 89999,
    profit: 14999,
    profitMargin: "16.67%",
    supplierContact: "+91 98765 43210",
    supplierEmail: "orders@samsung.in",
    location: "Warehouse A - Shelf B2",
    tags: ["Smartphone", "5G", "Premium", "Latest"],
    dateAdded: "2024-07-20",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400"
    ]
  };

  const stockMovements = [
    { date: "2024-08-15", type: "Stock In", quantity: +20, reason: "New shipment", balance: 45 },
    { date: "2024-08-14", type: "Sale", quantity: -5, reason: "Customer order #ORD001", balance: 25 },
    { date: "2024-08-13", type: "Sale", quantity: -3, reason: "Customer order #ORD002", balance: 30 },
    { date: "2024-08-12", type: "Adjustment", quantity: +3, reason: "Inventory correction", balance: 33 },
    { date: "2024-08-11", type: "Sale", quantity: -7, reason: "Bulk order #ORD003", balance: 30 }
  ];

  const getStockStatus = () => {
    if (product.quantity === 0) return { status: 'Out of Stock', color: 'text-red-600', bg: 'bg-red-100', icon: XCircle };
    if (product.quantity <= product.reorderPoint) return { status: 'Low Stock', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertCircle };
    return { status: 'In Stock', color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
  };

  const stockStatus = getStockStatus();
  const StatusIcon = stockStatus.icon;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'inventory', label: 'Inventory' },
    { id: 'supplier', label: 'Supplier' },
    { id: 'history', label: 'History' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft className="w-5 h-5 cursor-pointer" onClick={() => window.history.back()} />
            <span className="font-medium">Back to Inventory</span>
          </button>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setShowEditModal(true)}
              className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200 rounded-none"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Product</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 transition-colors duration-200 rounded-none">
              <Trash2 className="w-4 h-4" />
              <span>Delete</span>
            </button>
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2 uppercase tracking-wider">{product.name}</h1>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>SKU: {product.sku}</span>
              <span>•</span>
              <span>ID: {product.id}</span>
              <span>•</span>
              <span>Last updated: {product.lastUpdated}</span>
            </div>
          </div>
          <div className={`flex items-center space-x-2 px-3 py-2 ${stockStatus.bg} rounded-none`}>
            <StatusIcon className={`w-5 h-5 ${stockStatus.color}`} />
            <span className={`font-medium ${stockStatus.color} uppercase tracking-wider text-sm`}>
              {stockStatus.status}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Product Image and Quick Stats */}
        <div className="lg:col-span-1 space-y-6">
          {/* Product Image */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <Package className="w-20 h-20 text-gray-400" />
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                {product.images.slice(0, 3).map((img, index) => (
                  <div key={index} className="w-16 h-16 bg-gray-100 border border-gray-200 flex-shrink-0"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border border-gray-200 shadow-sm">
            <div className="p-6">
              <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wider mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-none">
                      <DollarSign className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-600 uppercase tracking-wider">Selling Price</span>
                  </div>
                  <span className="text-lg font-medium text-gray-900">{formatCurrency(product.sellingPrice)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 text-green-600 rounded-none">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-600 uppercase tracking-wider">Profit</span>
                  </div>
                  <span className="text-lg font-medium text-green-600">{formatCurrency(product.profit)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 text-purple-600 rounded-none">
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-gray-600 uppercase tracking-wider">Current Stock</span>
                  </div>
                  <span className="text-lg font-medium text-gray-900">{product.quantity} {product.unit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Detailed Information */}
        <div className="lg:col-span-2">
          {/* Tabs */}
          <div className="bg-white border border-gray-200 shadow-sm mb-6">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium uppercase tracking-wider transition-colors ${
                      activeTab === tab.id
                        ? 'text-gray-900 border-b-2 border-gray-900 bg-white'
                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-3">Product Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Category</label>
                          <p className="text-sm font-medium text-gray-900">{product.category}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Barcode</label>
                          <p className="text-sm font-medium text-gray-900">{product.barcode}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Weight</label>
                          <p className="text-sm font-medium text-gray-900">{product.weight}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Color</label>
                          <p className="text-sm font-medium text-gray-900">{product.color}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Dimensions</label>
                          <p className="text-sm font-medium text-gray-900">{product.dimensions}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Warranty</label>
                          <p className="text-sm font-medium text-gray-900">{product.warranty}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Location</label>
                          <p className="text-sm font-medium text-gray-900">{product.location}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Date Added</label>
                          <p className="text-sm font-medium text-gray-900">{product.dateAdded}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Description</label>
                    <p className="text-sm text-gray-700 mt-2 leading-relaxed">{product.description}</p>
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 uppercase tracking-wider">Tags</label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {product.tags.map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-none border border-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Inventory Tab */}
              {activeTab === 'inventory' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-3">Stock Management</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Current Stock</label>
                          <p className="text-2xl font-light text-gray-900">{product.quantity}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Unit</label>
                          <p className="text-sm font-medium text-gray-900">{product.unit}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Minimum Stock</label>
                          <p className="text-lg font-medium text-gray-900">{product.minimumStock}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Maximum Stock</label>
                          <p className="text-lg font-medium text-gray-900">{product.maximumStock}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Reorder Point</label>
                          <p className="text-lg font-medium text-yellow-600">{product.reorderPoint}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Stock Value</label>
                          <p className="text-lg font-medium text-green-600">{formatCurrency(product.quantity * product.costPrice)}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-3">Pricing</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Cost Price</label>
                        <p className="text-lg font-medium text-gray-900">{formatCurrency(product.costPrice)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Selling Price</label>
                        <p className="text-lg font-medium text-gray-900">{formatCurrency(product.sellingPrice)}</p>
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 uppercase tracking-wider">Profit Margin</label>
                        <p className="text-lg font-medium text-green-600">{product.profitMargin}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Supplier Tab */}
              {activeTab === 'supplier' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider mb-3">Supplier Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Supplier Name</label>
                          <p className="text-lg font-medium text-gray-900">{product.supplier}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Contact Number</label>
                          <p className="text-sm font-medium text-blue-600">{product.supplierContact}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Email</label>
                          <p className="text-sm font-medium text-blue-600">{product.supplierEmail}</p>
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 uppercase tracking-wider">Last Order Date</label>
                          <p className="text-sm font-medium text-gray-900">{product.lastUpdated}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* History Tab */}
              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">Stock Movement History</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Date</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Reason</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Balance</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {stockMovements.map((movement, index) => (
                          <tr key={index} className="hover:bg-gray-50">
                            <td className="px-4 py-3 text-sm text-gray-900">{movement.date}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-1 text-xs rounded-none ${
                                movement.type === 'Stock In' ? 'bg-green-100 text-green-600' :
                                movement.type === 'Sale' ? 'bg-blue-100 text-blue-600' :
                                'bg-yellow-100 text-yellow-600'
                              }`}>
                                {movement.type}
                              </span>
                            </td>
                            <td className={`px-4 py-3 text-sm font-medium ${
                              movement.quantity > 0 ? 'text-green-600' : 'text-red-600'
                            }`}>
                              {movement.quantity > 0 ? '+' : ''}{movement.quantity}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-600">{movement.reason}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">{movement.balance}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;