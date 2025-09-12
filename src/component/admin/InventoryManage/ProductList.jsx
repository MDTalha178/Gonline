import { AlertTriangle, CheckCircle, Edit3, Eye, Trash2, XCircle } from "lucide-react"
import { convertISOToDateTime } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../../common/ConformationModal";
import { useToast } from "../../../hooks/useToast";
import UpdateProduct from "./updateProduct";

const ProductList = ({product, handleOnDelete, handleUpdateProduct}) =>{
    const{toast} = useToast();
    const navigate = useNavigate();
    const [isDelete, setIsDelete] = useState(false);

    const handleDelete = async() => {
        handleOnDelete(product.id)
        setIsDelete(false)

    };

    const getStockStatus = (quantity) => {
        if (quantity === 0) return { status: "Out of Stock", color: "text-red-600 bg-red-50", icon: XCircle };
        if (quantity < 10) return { status: "Low Stock", color: "text-yellow-600 bg-yellow-50", icon: AlertTriangle };
        return { status: "In Stock", color: "text-green-600 bg-green-50", icon: CheckCircle };
    };
    const status = getStockStatus(product?.product_quantity);
    const StatusIcon = status?.icon;
    return(
        <>
         {/* Add Supplier Modal */}
        {isDelete && <ConfirmationModal isOpen={isDelete} type="danger" title="Delete Product" message="Are you sure you want to delete this product?" onClose={() => setIsDelete(false)} onConfirm={() => handleDelete()} />}
        <tr key={product.id} className="hover:bg-gray-50 transition-colors duration-200">
            <td className="px-6 py-4 whitespace-nowrap">
            <div>
                <div className="text-sm font-medium text-gray-900">{product?.product_name}</div>
                <div className="text-sm text-gray-500 font-light">{product?.unit}</div>
            </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-mono">{product?.sku}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">₹{product?.product_price.toLocaleString('en-IN')}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{product?.product_quantity}</td>
            <td className="px-6 py-4 whitespace-nowrap">
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-none text-xs font-medium ${status?.color}`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {status?.status}
            </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-light">{product.category?.name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-light">{product?.supplier?.supplier_name}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-light">{convertISOToDateTime(product.updated_at)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-2">
                <button onClick={() => navigate(`/inventory/${product.id}`)} className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <Eye className="w-4 h-4 cursor-pointer" />
                </button>
                <button className="text-gray-400 hover:text-green-600 transition-colors duration-200">
                <Edit3   className="w-4 h-4 cursor-pointer"  onClick={() => handleUpdateProduct(product)}/>
                </button>
                <button className="text-gray-400 hover:text-red-600 transition-colors duration-200">
                <Trash2 onClick={() => setIsDelete(true)} className="w-4 h-4 cursor-pointer" />
                </button>
            </div>
            </td>
        </tr> 
        </>
       
    )
}

export const ProductCard = ({ product, handleOnDelete, handleUpdateProduct }) => {
  const [isDelete, setIsDelete] = useState(false);

  const navigate = useNavigate();

  const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: "Out of Stock", color: "text-red-600 bg-red-50", icon: XCircle };
    if (quantity < 10) return { status: "Low Stock", color: "text-yellow-600 bg-yellow-50", icon: AlertTriangle };
    return { status: "In Stock", color: "text-green-600 bg-green-50", icon: CheckCircle };
  };

  const status = getStockStatus(product?.product_quantity);
  const StatusIcon = status?.icon;

  const handleDelete = async () => {
    handleOnDelete(product.id);
    setIsDelete(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow-sm">
      {/* Product Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold text-gray-900 truncate">{product?.product_name}</h3>
          <p className="text-sm text-gray-500 font-mono">{product?.sku}</p>
        </div>
        <div className="flex items-center space-x-2 ml-3">
          <button onClick={() => navigate(`/inventory/${product.id}`)} className="text-gray-400 hover:text-blue-600 transition-colors p-1">
            <Eye className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleUpdateProduct(product)}
            className="text-gray-400 hover:text-green-600 transition-colors p-1"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setIsDelete(true)}
            className="text-gray-400 hover:text-red-600 transition-colors p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
          <p className="text-lg font-bold text-gray-900">₹{product?.product_price?.toLocaleString('en-IN')}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide">Quantity</p>
          <p className="text-lg font-bold text-gray-900">{product?.product_quantity}</p>
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-3">
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${status?.color}`}>
          <StatusIcon className="w-3 h-3 mr-1" />
          {status?.status}
        </span>
      </div>

      {/* Additional Info */}
      <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Category:</span>
          <span className="font-medium">{product.category?.name || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span>Supplier:</span>
          <span className="font-medium">{product?.supplier?.supplier_name || 'N/A'}</span>
        </div>
        <div className="flex justify-between">
          <span>Updated:</span>
          <span className="font-medium">{new Date(product.updated_at).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Confirmation Modal */}
      {isDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Delete Product</h3>
            <p className="text-gray-600 mb-4">Are you sure you want to delete this product?</p>
            <div className="flex space-x-3">
              <button
                onClick={() => setIsDelete(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList