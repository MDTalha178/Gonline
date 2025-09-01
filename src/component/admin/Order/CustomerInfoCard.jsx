import { ExternalLink, Mail, MapPin, Phone, User } from "lucide-react";

const CustomerInfoCard = ({ order }) => {

  if(!order){
    return <div>Loading...</div>
  }

  const {user, shipping_address} = order
return(
  <div className="bg-white border border-gray-200 shadow-sm p-6">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
        <User className="w-5 h-5 mr-2 text-gray-600" />
        Customer Information
      </h3>
      <button className="text-blue-600 hover:text-blue-800 transition-colors">
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <User className="w-4 h-4 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{user?.first_name} {user?.last_name}</p>
            <p className="text-sm text-gray-600">Customer</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <Mail className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-gray-900">{user?.email}</p>
            <p className="text-sm text-gray-600">Email</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-gray-900">{user?.phone}</p>
            <p className="text-sm text-gray-600">Phone</p>
          </div>
        </div>
      </div>
      <div>
        <div className="flex items-start space-x-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-1" />
          <div>
            <p className="font-medium text-gray-900 mb-1">Shipping Address</p>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{shipping_address?.address_line1}</p>
              <p>{shipping_address?.city}, {shipping_address?.state}</p>
              <p>{shipping_address?.postal_code}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default CustomerInfoCard;
