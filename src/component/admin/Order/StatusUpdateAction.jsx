const StatusUpdateActions = ({ order, onStatusUpdate }) => {
  const getAvailableActions = (currentStatus) => {
    const actions = {
      'PENDING': [
        { label: 'Mark as Processing', status: 'Processing', variant: 'blue' },
        { label: 'Cancel Order', status: 'Cancelled', variant: 'red' }
      ],
      'PROCESSING': [
        { label: 'Mark as Shipped', status: 'Shipped', variant: 'purple' },
        { label: 'Cancel Order', status: 'Cancelled', variant: 'red' }
      ],
      'SHIPPED': [
        { label: 'Mark as Delivered', status: 'Delivered', variant: 'green' }
      ],
      'DELIVERED': [
        { label: 'Process Return', status: 'Returned', variant: 'gray' }
      ],
      'CANCELLED': [],
      'RETUTURED': []
    };
    return actions[currentStatus] || [];
  };

  const availableActions = getAvailableActions(order?.status);

  if (availableActions.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Order Status</h3>
      <div className="flex flex-wrap gap-3">
        {availableActions.map((action, index) => {
          const variantClasses = {
            blue: 'bg-blue-600 hover:bg-blue-700 text-white',
            purple: 'bg-purple-600 hover:bg-purple-700 text-white',
            green: 'bg-green-600 hover:bg-green-700 text-white',
            red: 'bg-red-600 hover:bg-red-700 text-white',
            gray: 'bg-gray-600 hover:bg-gray-700 text-white'
          };
          
          return (
            <button
              key={index}
              onClick={() => onStatusUpdate(action.status)}
              className={`px-4 py-2 font-medium transition-colors cursor-pointer ${variantClasses[action.variant]}`}
            >
              {action.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StatusUpdateActions;