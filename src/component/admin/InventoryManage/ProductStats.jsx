import { AlertTriangle, CheckCircle, Package, XCircle } from "lucide-react"
import { useEffect, useState } from "react";
import { getProductStats } from "../../../service/admin/inventory/InventoryService";

const ProductStats = ({product}) => {
    const [prdductStats, setproductStats] = useState({});

    useEffect(() =>{
    const fetchProductStats = async () => {
        const response = await getProductStats();
        console.log(response);
        if(response?.data){
            setproductStats(response?.data);
        }
    }

    fetchProductStats()
    },[setproductStats, product])
    return(
       <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-none flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-light uppercase tracking-wider">Total Products</p>
                <p className="text-xl font-light text-gray-900">{prdductStats?.total_product}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-none flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-light uppercase tracking-wider">In Stock</p>
                <p className="text-xl font-light text-gray-900">{prdductStats?.in_stock}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-yellow-100 rounded-none flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-light uppercase tracking-wider">Low Stock</p>
                <p className="text-xl font-light text-gray-900">{prdductStats?.low_stock}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-none shadow-sm border border-gray-200 p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-red-100 rounded-none flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 font-light uppercase tracking-wider">Out of Stock</p>
                <p className="text-xl font-light text-gray-900">{prdductStats?.out_of_stock} </p>
              </div>
            </div>
          </div>
        </div>  
    )
}

export default ProductStats