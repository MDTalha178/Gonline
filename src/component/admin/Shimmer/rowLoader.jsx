const OrderRowLoader = () => {
  return (
    <tr className="hover:bg-gray-50 transition-colors animate-pulse">
      {/* Order Number & Date */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">
          <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-32"></div>
        </div>
      </td>
      
      {/* Customer Info */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">
          <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-36 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-24"></div>
        </div>
      </td>
      
      {/* Amount & Items */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm">
          <div className="h-4 bg-gray-300 rounded w-20 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </td>
      
      {/* Order Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-6 bg-gray-300 rounded-full w-20"></div>
      </td>
      
      {/* Payment Status Badge */}
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="h-6 bg-gray-300 rounded-full w-16"></div>
      </td>
      
      {/* Payment Method */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="h-4 bg-gray-300 rounded w-16"></div>
      </td>
      
      {/* Tracking Number */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
        <div className="h-4 bg-gray-300 rounded w-28"></div>
      </td>
      
      {/* Shipping Address */}
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        <div className="text-xs">
          <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
          <div className="h-3 bg-gray-200 rounded w-20"></div>
        </div>
      </td>
      
      {/* Actions */}
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
          <div className="h-4 w-4 bg-gray-300 rounded"></div>
        </div>
      </td>
    </tr>
  );
};

const ResponsiveOrderTableLoader = ({ isLoading = true, rows = 8 }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tracking
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading && <OrderTableLoader rows={rows} />}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ResponsivRowLoader = ({ rows = 5 }) => {
    return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <ResponsiveOrderTableLoader key={index} />
      ))}
    </>
  );
}
export const RowLoader = ({ rows = 5 }) => {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <OrderRowLoader key={index} />
      ))}
    </>
  );
};
