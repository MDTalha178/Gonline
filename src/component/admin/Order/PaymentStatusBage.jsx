const PaymentStatusBadge = ({ status }) => {
  const statusConfig = {
    'PAID': { bg: 'bg-green-100', text: 'text-green-800' },
    'PENDING': { bg: 'bg-orange-100', text: 'text-orange-800' },
    'FAILED': { bg: 'bg-red-100', text: 'text-red-800' },
    'REFUNDED': { bg: 'bg-gray-100', text: 'text-gray-800' },
    'SUCCESS': { bg: 'bg-green-100', text: 'text-green-800' },
    'CANCELLED': { bg: 'bg-red-100', text: 'text-red-800' },
    'CHARGEBACK': { bg: 'bg-purple-100', text: 'text-purple-800' },
    'EXPIRED': { bg: 'bg-yellow-100', text: 'text-yellow-800' },
    'DECLINED': { bg: 'bg-red-100', text: 'text-red-800' },
    'PARTIALLY_REFUNDED': { bg: 'bg-blue-100', text: 'text-blue-800' },
  };

  const config = statusConfig[status] || statusConfig['Pending'];

  return (
    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium ${config?.bg} ${config?.text} rounded-full`}>
      {status}
    </span>
  );
};

export default PaymentStatusBadge;