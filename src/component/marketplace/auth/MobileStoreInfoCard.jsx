import { Store } from "lucide-react";

const ResponsiveStoreInfoCard = ({ storeData }) => {
    return(
         <div className="lg:hidden mb-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center">
                <Store className="w-5 h-5 text-white" />
                </div>
                <div>
                <h3 className="font-medium text-gray-900">{storeData?.name}</h3>
                <p className="text-sm text-gray-600">{storeData?.category}</p>
                </div>
            </div>
        </div>
    )
}

export default ResponsiveStoreInfoCard;