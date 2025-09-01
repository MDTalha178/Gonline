const BillingAddress = ({billingAddress, addressType="Billing"}) =>{
    return (
    <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4 uppercase tracking-wider">{addressType} Address</h2>
            <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Street: </strong>{billingAddress?.address_line1 || 'Not Specified'}</p>
            <p><strong>City and State: </strong>{billingAddress?.city || 'Not Specified'}, {billingAddress?.state}</p>
            <p><strong>Pincode: </strong>{billingAddress?.postal_code || 'Not Specified'}</p>
            <p><strong>Country: </strong>{billingAddress?.country || 'Not Specified'}</p>
            </div>
    </div>
    );

}

export default BillingAddress;