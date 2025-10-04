import { X } from "lucide-react";

const SetReminderModal = ({ customer, onClose, onSetReminder }) => {
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [reminderType, setReminderType] = useState('whatsapp');

  const handleSubmit = () => {
    if (reminderDate && reminderTime) {
      onSetReminder({
        date: reminderDate,
        time: reminderTime,
        type: reminderType
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="flex items-center justify-between p-5 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 uppercase tracking-wider">Set Reminder</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
              Date
            </label>
            <input
              type="date"
              value={reminderDate}
              onChange={(e) => setReminderDate(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-gray-900 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
              Time
            </label>
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-0 focus:border-gray-900 transition-colors duration-200"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider">
              Reminder Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setReminderType('whatsapp')}
                className={`px-3 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-colors duration-200 ${
                  reminderType === 'whatsapp'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                WhatsApp
              </button>
              <button
                onClick={() => setReminderType('sms')}
                className={`px-3 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-colors duration-200 ${
                  reminderType === 'sms'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                SMS
              </button>
              <button
                onClick={() => setReminderType('call')}
                className={`px-3 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-colors duration-200 ${
                  reminderType === 'call'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Call
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-5 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
          >
            Set Reminder
          </button>
        </div>
      </div>
    </div>
  );
};

export default SetReminderModal;