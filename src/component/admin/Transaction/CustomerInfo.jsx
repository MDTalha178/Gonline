import { Mail, Phone } from "lucide-react"

const CustomerInfo = ({customerData,amount}) => {
    return(
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wider">Customer Details</h2>
            <div className="space-y-4">
            <div className="flex items-center space-x-3">
                {customerData?.user?.avatar ?<img 
                src={customerData?.user?.avatar} 
                alt={customerData?.user?.first_name || 'Customer Not Provided'}
                className="w-12 h-12 rounded-none object-cover border border-gray-200"
                />:
                 <svg 
                    className="w-6 h-6 text-gray-400" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                    >
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>}
                <div>
                <h3 className="text-sm font-medium text-gray-900">{customerData?.user?.first_name || 'Details Not Added'}</h3>
                <p className="text-sm text-blue-600">{customerData?.loyalty_points}</p>
                </div>
            </div>
            
            <div className="space-y-3">
                <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{customerData?.user?.email || 'Details Not Added'}</span>
                </div>
                <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{customerData?.phone_number || customerData?.user?.phone || 'Details Not Added'}</span>
                </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
                <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                    <p className="text-gray-600">Total Orders</p>
                    <p className="font-medium text-gray-900">{1}</p>
                </div>
                <div>
                    <p className="text-gray-600">Total Spent</p>
                    <p className="font-medium text-gray-900">₹{amount}</p>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default CustomerInfo