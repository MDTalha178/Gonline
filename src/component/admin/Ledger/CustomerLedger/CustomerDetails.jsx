import React, { use, useEffect, useState } from 'react';
import { Calendar, Download, IndianRupee, Phone, Plus, TrendingDown, TrendingUp, User, ArrowLeft, Bell, Edit } from "lucide-react";
import LedgerPayment from '../LedgerUtility/LedgerPaymentModal';
import SetReminderModal from '../LedgerUtility/Reminder';
import LedgerNextPayment from '../LedgerUtility/NextPayment';
import LedgerDetailsStats from '../LedgerUtility/LedgerDetailStats';
import { customerLedgerCash, getCustomerLedgermetaData, getCustomerLedgerTransaction } from '../../../../service/admin/ledger/CustomerLedegerService';
import { useParams } from 'react-router-dom';
import { useToast } from '../../../../hooks/useToast';
import { convertISOToDateTime } from '../../../../utils/utils';

const CustomerLedgerDetails = () => {
  const {toast} = useToast();
  const [activeTab, setActiveTab] = useState('all');
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState('CASH_IN');
  const [transactions, setTransaction] = useState(null);
  const [customer, setCustomer] = useState(null);

  const [ledgerPaymentFormdata, setLedgerPaymentFormdata] = useState({
    amount: '',
    date: '',
    trade_id: '',
  });
  const {ledgerId} = useParams()


  const fetchTransactions = async () => {
    const response = await getCustomerLedgerTransaction(ledgerId, toast);
    if(response?.data){
      setTransaction(response?.data?.results);
    }
  }

  const fetchCustomerMetaData = async () => {
    const response = await getCustomerLedgermetaData(ledgerId, toast);
    if(response?.data){
      setCustomer(response?.data);
    }
  }
  useEffect(() => {
    fetchTransactions();

    if(!customer){
      fetchCustomerMetaData();
    }
  },[setActiveTab])

  
  const handlePaymentChange = (field, value) =>{
    setLedgerPaymentFormdata({...ledgerPaymentFormdata, [field]: value})
  }

  const onSave = async () => {
    const payload = {
      ...ledgerPaymentFormdata,
      customer_id: customer?.customer_id?.id,
      transaction_type:paymentType,
      transaction_id: ledgerId
    }
    const response = await customerLedgerCash(payload, toast);
    if(response?.data){
      fetchTransactions();
      fetchCustomerMetaData()
      setShowPaymentModal(false);
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => window.history.back()}
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Back to Customers</span>
            </button>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setShowReminderModal(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors duration-200"
              >
                <Bell className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Set Reminder</span>
              </button>
              
              <button
                onClick={() => { setPaymentType('CASH_IN'); setShowPaymentModal(true); }}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 transition-colors duration-200"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Cash In</span>
              </button>
              
              <button
                onClick={() => { setPaymentType('CASH_OUT'); setShowPaymentModal(true); }}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 transition-colors duration-200"
              >
                <TrendingDown className="w-4 h-4" />
                <span className="text-sm font-medium uppercase tracking-wider">Cash Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Customer Header */}
        <div className="bg-white shadow-sm border border-gray-200 mb-6 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-gray-900 text-white flex items-center justify-center">
              <User className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-medium text-gray-900 uppercase tracking-wider">{customer?.customer_id?.customer_name}</h1>
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <Phone className="w-4 h-4 mr-1" />
                {customer?.customer_id?.customer_phone}
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <LedgerDetailsStats statsDetails={customer} />

        {/* Next Payment Due */}
        {customer?.nextPayment && (
         <LedgerNextPayment nextPayment={customer?.nextPayment} />
        )}

        {/* Transaction Section */}
        <div className="bg-white shadow-sm border border-gray-200">
          {/* Transaction Tabs */}
          <div className="border-b border-gray-200 px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`py-4 text-sm font-medium uppercase tracking-wider border-b-2 transition-colors duration-200 ${
                  activeTab === 'all'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                All Transactions
              </button>
              <button
                onClick={() => setActiveTab('cash_in')}
                className={`py-4 text-sm font-medium uppercase tracking-wider border-b-2 transition-colors duration-200 ${
                  activeTab === 'cash_in'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Cash In
              </button>
              <button
                onClick={() => setActiveTab('cash_out')}
                className={`py-4 text-sm font-medium uppercase tracking-wider border-b-2 transition-colors duration-200 ${
                  activeTab === 'cash_out'
                    ? 'border-gray-900 text-gray-900'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                Cash Out
              </button>
            </div>
          </div>

          {/* Transactions List */}
          <div className="p-6">
            <div className="space-y-4">
              {transactions && activeTab === 'all'? transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`w-12 h-12 flex items-center justify-center ${
                        transaction.cash_in? 'bg-green-100' : 'bg-red-100'
                      }`}>
                        {transaction.cash_in ? (
                          <TrendingUp className="w-6 h-6 text-green-600" />
                        ) : (
                          <TrendingDown className="w-6 h-6 text-red-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`text-xs font-medium uppercase tracking-wider ${
                            transaction?.cash_in ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {transaction?.cash_in ? 'Cash In' : 'Cash Out'}
                          </span>
                          {transaction?.orderId && (
                            <span className="text-xs text-gray-500">• {transaction?.orderId}</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-900 mb-2">{transaction?.note}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <Calendar className="w-3 h-3 mr-1" />
                          {convertISOToDateTime(transaction?.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <div className={`text-xl font-semibold ${
                        transaction?.cash_in  ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {transaction?.cash_in  ? '+' : '-'}₹{Number(transaction?.transaction)}
                      </div>
                    </div>
                  </div>
                </div>
              )):<div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gray-50 shadow-sm text-center">
              <span className="text-2xl font-semibold text-gray-800 mb-2">
                🚧 Coming Soon!
              </span>
              <p className="text-lg text-gray-600 max-w-md">
                “Cash In” and “Cash Out” tracking are on the way. <br />
                Meanwhile, you can view all your transactions under{" "}
                <span className="font-medium text-gray-800">All Transactions</span>.
              </p>
            </div>}
            </div>
          </div>

          {/* Export Button */}
          {activeTab === 'all' && <div className="border-t border-gray-200 bg-gray-50 p-6">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-100 transition-colors duration-200">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium uppercase tracking-wider">Export Transactions</span>
            </button>
          </div>}
        </div>
      </div>

      {/* Reminder Modal */}
      {showReminderModal && (
       <SetReminderModal customer={customer} onClose={handleCloseReminderModal} onSetReminder={handleSetReminder} />
      )}

      {/* Payment Modal */}
      {showPaymentModal && (
        <LedgerPayment paymentType={paymentType} setShowPaymentModal={setShowPaymentModal} formData={ledgerPaymentFormdata} handelInputChange={handlePaymentChange} onSave={onSave}/>
      )}
    </div>

  );
};

export default CustomerLedgerDetails;
