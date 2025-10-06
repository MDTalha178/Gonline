import React, { useEffect, useState } from 'react';
import {  User} from 'lucide-react';
import AdminSidebar from '../../Sidebar';
import CustomerCard from './CustomerCard';
import { getCustomerLedger } from '../../../../service/admin/ledger/CustomerLedegerService';
import { useToast } from '../../../../hooks/useToast';
import LedgerSearch from '../LedgerUtility/LedgerSearch';
import LedgerFilter from '../LedgerUtility/Ledgerfilter';
import LedgerStats from '../LedgerUtility/LedgerStats';import useDebounce from '../../../../hooks/useDebounce';
;

export default function CustomerLedger() {
  const {toast} = useToast()
  const [customerLedger, setcustomerLedger] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showStatusFilter, setShowStatusFilter] = useState(false);
  const [ledgerStats, setLedgerStats] = useState(null)
  const debouncedCustomerSearchTerm = useDebounce(searchTerm, 500);


  const fetchCustomerLedger = async () => {
    const response = await getCustomerLedger(toast, {search:searchTerm});

    if(response?.data){
      setcustomerLedger(response?.data?.ledger_data);
      setLedgerStats(response?.data?.ledger_stats);
      return
    }
    setcustomerLedger([])
  }

  useEffect(() => {
    if(debouncedCustomerSearchTerm){
      fetchCustomerLedger()
    }
    if(!customerLedger || !debouncedCustomerSearchTerm) fetchCustomerLedger();
  }, [setcustomerLedger, debouncedCustomerSearchTerm])

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'cleared', label: 'Cleared' }
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <AdminSidebar LedgerOpen={true} currentPage="Ledger" subPage="Customer Ledger"/>
      {/* Main Content */}
      <div className="flex-1 p-8 overflow-y-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2 uppercase tracking-wider">Customer Khatabook</h1>
          <p className="text-gray-600">Track customer payments, pending amounts, and transaction history</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-4 sm:p-6 mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            {/* Search */}
           <LedgerSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

            {/* Status Filter */}
            <LedgerFilter statusOptions={statusOptions} selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus} showStatusFilter={showStatusFilter} setShowStatusFilter={setShowStatusFilter} />
          </div>
        </div>

        {/* Stats Cards */}
        {ledgerStats && <LedgerStats totalPending={ledgerStats?.total_pending_amount} totalPaid={ledgerStats?.total_paid_amount} activeUser={ledgerStats?.total_active_user} tab="Customer" />}

        {/* Customer Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {customerLedger && customerLedger && customerLedger.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
            />
          ))}
        </div>

        {customerLedger && customerLedger.length === 0 && (
          <div className="bg-white border border-gray-200 rounded-lg p-12 sm:p-16 text-center shadow-sm">
            <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No customers found</h3>
            <p className="text-sm text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
