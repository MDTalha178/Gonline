import { AlertTriangle, CheckCircle, Edit3, Eye, Trash2, XCircle } from "lucide-react"
import { convertISOToDateTime } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ConfirmationModal from "../../common/ConformationModal";
import { useToast } from "../../../hooks/useToast";

const ProductList = ({product, handleOnDelete}) =>{
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
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-light">{product?.brand}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-light">{convertISOToDateTime(product.updated_at)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
            <div className="flex items-center space-x-2">
                <button onClick={() => navigate(`/inventory/${product.id}`)} className="text-gray-400 hover:text-blue-600 transition-colors duration-200">
                <Eye className="w-4 h-4 cursor-pointer" />
                </button>
                <button className="text-gray-400 hover:text-green-600 transition-colors duration-200">
                <Edit3   className="w-4 h-4 cursor-pointer" />
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

export default ProductList