import { Mail, Phone } from "lucide-react"

const CustomerInfo = ({customerData,amount}) => {
    return(
        <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wider">Customer Details</h2>
            <div className="space-y-4">
            <div className="flex items-center space-x-3">
                <img 
                src={customerData?.user?.avatar} 
                alt={customerData?.user?.first_name || 'Customer Not Provided'}
                className="w-12 h-12 rounded-none object-cover border border-gray-200"
                />
                <div>
                <h3 className="text-sm font-medium text-gray-900">{customerData?.user?.first_name || 'Customer Name Not Provided' + " " + customerData?.user?.last_name || ''}</h3>
                <p className="text-sm text-blue-600">{customerData?.loyalty_points}</p>
                </div>
            </div>
            
            <div className="space-y-3">
                <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{customerData?.user?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-900">{customerData?.phone_number || customerData?.user?.phone}</span>
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