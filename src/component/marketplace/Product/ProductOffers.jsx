const OfferDetails = () => {
  const offers = [
    {
      title: "Bank Offer",
      description: "10% instant discount with HDFC Bank Credit Cards",
      code: "HDFC10",
      validity: "Valid till Dec 31, 2024"
    },
    {
      title: "Exchange Offer",
      description: "Up to ₹5,000 off on exchange of old headphones",
      code: "EXCHANGE",
      validity: "T&C Apply"
    },
    {
      title: "Cashback Offer",
      description: "Get 5% cashback with Goline Wallet",
      code: "WALLET5",
      validity: "Valid on first purchase"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Offers</h2>
      <div className="space-y-4">
        {offers.map((offer, index) => (
          <div key={index} className="border border-green-200 rounded-lg p-4 bg-green-50">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">{offer.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{offer.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="bg-gray-100 px-3 py-1 rounded text-sm font-mono">
                    {offer.code}
                  </span>
                  <span className="text-xs text-gray-500">{offer.validity}</span>
                </div>
              </div>
              <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                Apply
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfferDetails;