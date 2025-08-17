const OrderFilterTab = ({ filter, setFilter }) => {
    return(
     <div className="mb-6">
        <div className="flex space-x-1 bg-white rounded-none border border-gray-200 p-1 ">
            <button onClick={() => setFilter('ALL')} className={`cursor-pointer px-4 py-2 text-sm font-medium ${filter === 'ALL' ? 'bg-blue-600 rounded-none text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              All Orders
            </button>
            <button onClick={() => setFilter('Delivered')} className={`cursor-pointer px-4 py-2 text-sm font-medium ${filter === 'Delivered' ? 'bg-blue-600 rounded-none text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Delivered
            </button>
            <button onClick={() => setFilter('Shipped')} className={`cursor-pointer px-4 py-2 text-sm font-medium ${filter === 'Shipped' ? 'bg-blue-600 rounded-none text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Shipped
            </button>
            <button  onClick={() => setFilter('Processing')} className={` cursor-pointer px-4 py-2 text-sm font-medium ${filter === 'Processing' ? 'bg-blue-600 rounded-none text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Processing
            </button>
            <button onClick={() => setFilter('Cancelled')} className={`cursor-pointer px-4 py-2 text-sm font-medium ${filter === 'Cancelled' ? 'bg-blue-600 rounded-none text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Cancelled
            </button>
        </div>
    </div>
    );
}

export default OrderFilterTab;