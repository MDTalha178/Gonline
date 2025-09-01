import { Download, Plus, Upload } from "lucide-react"

const InventoryHeader = ({setShowAddModal}) =>{
    return(
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-light text-gray-900 mb-2 tracking-tight">Inventory Management</h1>
            <p className="text-gray-600 font-light">Manage your products, stock levels, and inventory data</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 rounded-none">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Export</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors duration-200 rounded-none">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Import</span>
            </button>
            <button 
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-2 bg-gray-900 hover:bg-gray-800 text-white transition-colors duration-200 rounded-none"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Add Product</span>
            </button>
          </div>
        </div>
    )
}

export default InventoryHeader