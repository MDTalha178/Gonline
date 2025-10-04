import { Bell, BellOff, Eye, Phone, TrendingDown, TrendingUp, User } from "lucide-react";
import SetReminderModal from "../LedgerUtility/Reminder";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CustomerCard = ({ customer, onViewDetails, onSetReminder }) => {
  const navigate = useNavigate();
  const [showReminderModal, setShowReminderModal] = useState(false);
  return (
    <>
      <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-200">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-900 text-white flex items-center justify-center rounded-lg">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-medium text-gray-900">{customer?.customer_id?.customer_name}</h3>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Phone className="w-3 h-3 mr-1" />
                {customer?.customer_id?.customer_phone}
              </div>
            </div>
          </div>
          <span className={`px-3 py-1 text-xs font-medium uppercase tracking-wider rounded-md ${
            customer?.status === 'cleared' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {customer.status}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="flex items-center text-xs text-gray-600 mb-1 uppercase tracking-wider">
              <TrendingDown className="w-3 h-3 mr-1" />
              Pending
            </div>
            <div className="text-lg font-semibold text-red-600">
              ₹{customer?.total_pending_amount?.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center text-xs text-gray-600 mb-1 uppercase tracking-wider">
              <TrendingUp className="w-3 h-3 mr-1" />
              Paid
            </div>
            <div className="text-lg font-semibold text-green-600">
              ₹{customer?.total_amount_paid?.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {customer?.nextPayment && (
          <div className="bg-blue-50 p-3 mb-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Next Payment</div>
                <div className="font-semibold text-blue-600">₹{customer.nextPayment.amount.toLocaleString('en-IN')}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-600 uppercase tracking-wider mb-1">Due Date</div>
                <div className="text-sm font-medium">{new Date(customer.nextPayment.date).toLocaleDateString('en-IN')}</div>
              </div>
            </div>
          </div>
        )}

        {/* Reminder Section */}
        {customer.reminder ? (
          <div className="bg-purple-50 border border-purple-200 p-3 mb-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Bell className="w-4 h-4 text-purple-600" />
                <div>
                  <div className="text-xs text-gray-600 uppercase tracking-wider">Reminder Set</div>
                  <div className="text-sm font-medium text-purple-600">
                    {new Date(customer.reminder.date).toLocaleDateString('en-IN')} at {customer.reminder.time}
                  </div>
                </div>
              </div>
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded uppercase tracking-wider">
                {customer.reminder.type}
              </span>
            </div>
          </div>
        ) : customer.nextPayment && (
          <button
            onClick={() => setShowReminderModal(true)}
            className="w-full flex items-center justify-center space-x-2 py-2 mb-4 border border-dashed border-gray-400 rounded-md text-gray-600 hover:border-gray-900 hover:text-gray-900 transition-colors duration-200"
          >
            <BellOff className="w-4 h-4" />
            <span className="text-xs font-medium uppercase tracking-wider">Set Reminder</span>
          </button>
        )}

        <button
          onClick={() => navigate(`/customer-ledger/${customer.id}`)}
          className="w-full flex items-center justify-center space-x-2 py-2 border border-gray-900 rounded-md text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-200"
        >
          <Eye className="w-4 h-4" />
          <span className="text-sm font-medium uppercase tracking-wider">View Details</span>
        </button>
      </div>

      {/* Set Reminder Modal */}
      {showReminderModal && (
        <SetReminderModal
          customer={customer}
          onClose={() => setShowReminderModal(false)}
          onSetReminder={(reminderData) => {
            onSetReminder(customer.id, reminderData);
            setShowReminderModal(false);
          }}
        />
      )}
    </>
  );
};

export default CustomerCard;
