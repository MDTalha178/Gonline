import { useEffect, useState } from "react";
import { 
  ShoppingCart, 
  User, 
  Plus, 
  Minus, 
  X, 
  Search,
  CreditCard,
  Banknote,
  Smartphone,
  Receipt,
  UserPlus,
  Phone,
  Mail,
  MapPin,
  Calculator,
  Scan,
  Package,
  Eye,
  Edit,
  LayoutDashboard, 
  FileCheck,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Percent,
  Tag
} from "lucide-react";
import PaymentModal from "./PaymentModal";
import AdminSidebar from "../Sidebar";
import { useToast } from "../../../hooks/useToast";
import { checkoutService, customerCheckoutPos, getPosCustomer } from "../../../service/admin/Checkout/checkoutService";
import useDebounce from "../../../hooks/useDebounce";
import { getAdminStoreproduct } from "../../../service/admin/inventory/InventoryService";

const CheckoutComponent = () => {
  const {toast} = useToast();
  const [products, setproducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customer, setCustomer] = useState(false);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discountType, setDiscountType] = useState('percentage');
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(18);
  const [amountReceived, setAmountReceived] = useState('');
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [customer_id, setcustomer_id] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchCustomer, setsearchCustomer] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');
  const [editingItemId, setEditingItemId] = useState(null);

  const [customerForm, setCustomerForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    address: '',
    gst_number: ''
  });

  const [paymentCheckout, setPaymentCheckout] = useState({
    payment_method: 'CASH',
    payment_type: 'FULL_PAYMENT',
    received_amount: 0,
    generate_invoice: true,
    is_notification: false
  });

  const fetchProdouct = async () => {
    setLoading(true);
    try {
      const response = await getAdminStoreproduct(toast, {'search': searchQuery});
      if(response?.data?.results){
        setproducts(response?.data?.results);
      }
    } catch (error) {
      toast.error(error.message || 'Failed to fetch product list');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomer = async() => {
    setIsSearching(true);
    const response = await getPosCustomer(toast, {'search': searchCustomer});
    if(response?.data){
      setSearchResults(response?.data);
      setShowSearchResults(true);
    }
    setIsSearching(false);
  };


  const handleProcessPayment = (field, value) =>{
    setPaymentCheckout({...paymentCheckout, [field]: value})
  }

  useEffect(() => {
    if(searchQuery){
      fetchProdouct();
    }
    if(searchCustomer){
      fetchCustomer();
    }
  }, [searchQuery, searchCustomer]);

  // Calculate per-item amounts
  const calculateItemAmounts = (item) => {
    const itemSubtotal = item.product_price * item.quantity;
    
    // Calculate discount
    const itemDiscountAmount = item.discount_type === 'percentage' 
      ? (itemSubtotal * (item.discount || 0) / 100)
      : ((item.discount || 0) * item.quantity);
    
    const afterDiscount = itemSubtotal - itemDiscountAmount;
    
    // Calculate tax on discounted amount
    const itemTaxAmount = (afterDiscount * (item.tax || 0) / 100);
    
    const itemTotal = afterDiscount + itemTaxAmount;
    
    return {
      subtotal: itemSubtotal,
      discountAmount: itemDiscountAmount,
      taxAmount: itemTaxAmount,
      total: itemTotal
    };
  };

  // Calculate cart totals
  const calculateCartTotals = () => {
    const totals = cartItems.reduce((acc, item) => {
      const amounts = calculateItemAmounts(item);
      return {
        subtotal: acc.subtotal + amounts.subtotal,
        discountAmount: acc.discountAmount + amounts.discountAmount,
        taxAmount: acc.taxAmount + amounts.taxAmount,
        total: acc.total + amounts.total
      };
    }, { subtotal: 0, discountAmount: 0, taxAmount: 0, total: 0 });
    
    return totals;
  };

  const { subtotal, discountAmount, taxAmount, total } = calculateCartTotals();
  const changeAmount = amountReceived ? Math.max(0, parseFloat(amountReceived) - total) : 0;


  const handleCheckout = async() => {
    setProcessing(true);
    const payload = {
      ...customer,
      sub_total: Math.ceil(subtotal),
      discount_amount: Math.ceil(discountAmount),
      tax: Math.ceil(taxAmount),
      total_bill_amount: Math.ceil(total),
      total_items: cartItems.length,
      product_id: cartItems.map((item) => {
        return {
          product_id: item.id,
          quantity: item.quantity,
          tax_percentage: item.tax || 0,
          discount_percentage: item.discount_type === 'percentage' ? (item.discount || 0) : 0,
          discount_amount: item.discount_type === 'fixed' ? (item.discount || 0) : 0,
          discount_type: item.discount_type || 'percentage',
          tax_amount:calculateItemAmounts(item)?.taxAmount
        }
      }),
      pos_customer_id: customer_id,
      ...paymentCheckout,
      received_amount: paymentCheckout.payment_type === 'FULL_PAYMENT' ? total : paymentCheckout.received_amount
    };

    const response = await checkoutService(payload, toast);

    if(response?.data){
      setCartItems([]);
      setCustomer(null);
      setAmountReceived('');
      setDiscount(0);
      setTax(0);
      fetchProdouct();
      toast.success("Order placed successfully");
      setPaymentSuccess(true);
      setShowPaymentModal(false);
    }
    setProcessing(false);
    setPaymentSuccess(false);
  };

  // Add product to cart with tax and discount from product data
  const addToCart = (product, quantity = 1) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (newQuantity > product?.product_quantity) {
        toast.info(`Only ${product.product_quantity} items available in stock`, {
          title: "Stock Limit",
          duration: 6000
        });
        return;
      }
      setCartItems(cartItems.map(item => 
        item.id === product.id 
          ? { ...item, quantity: newQuantity }
          : item
      ));
    } else {
      if (quantity > product.product_quantity) {
        toast.info(`Only ${product?.product_quantity} items available in stock`, {
          title: "Stock Limit",
          duration: 6000
        });
        return;
      }
      
      // Add product with its tax and discount from server
      setCartItems([...cartItems, { 
        ...product, 
        quantity,
        tax: product?.tax_percentage || 0,
        discount: product?.discount_percentage || 0,
        discount_type: 'percentage',
      }]);
    }
    setSearchQuery('');
    setShowProductSearch(false);
  };

  const handleBarcodeSubmit = () => {
    if (!barcodeInput.trim()) return;
    
    const product = products.find(p => p.barcode === barcodeInput.trim());
    if (product) {
      addToCart(product, 1);
      setBarcodeInput('');
    } else {
      alert('Product not found with this barcode');
    }
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      const product = products.find(p => p.id === id);
      const cartItem = cartItems.find(item => item.id === id);
      const maxQuantity = product?.product_quantity || cartItem?.product_quantity || 0;
      
      if (newQuantity > maxQuantity) {
        toast.info(`Only ${maxQuantity} items available in stock`, {
          title: "Stock Limit",
          duration: 6000
        });
        return;
      }
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Update item tax
  const updateItemTax = (id, newTax) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, tax: parseFloat(newTax) || 0 } : item
    ));
  };

  // Update item discount
  const updateItemDiscount = (id, newDiscount, discountType) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { 
        ...item, 
        discount: parseFloat(newDiscount) || 0,
        discount_type: discountType || item.discount_type
      } : item
    ));
  };

 const handleCustomerSubmit = async () => {
    if (!customerForm.customer_name || !customerForm.customer_phone) {
      toast.error('Name and phone number and email are required');
      return;
    }
    const response = await customerCheckoutPos(customerForm, toast);
    if(response?.data){
      setcustomer_id(response?.data?.customer_id);
      setCustomer(customerForm);
      setShowCustomerForm(false);
      setCustomerForm({ name: '', phone: '', email: '', address: '', gst_number: '' });
    }
    
  };

  const handleSelectCUstomer = (customer) => {
    setCustomerForm({
      customer_name: customer?.customer_name,
      customer_phone: customer?.customer_phone,
      customer_email: customer?.customer_email,
      address: customer?.address,
      gst_number: customer?.gst_number
    });
    setShowSearchResults(false);
    setsearchCustomer('');
    setCustomer({
      customer_name: customer?.customer_name,
      customer_phone: customer?.customer_phone, 
      customer_email: customer?.customer_email,
      address: customer?.address,
      gst_number: customer?.gst_number
    });
    setcustomer_id(customer.id);
  };

  return (
    <div className="flex h-screen bg-gray-50">
        <AdminSidebar currentPage="Checkout" /> 
      
      {showPaymentModal &&<PaymentModal isOpen={true} setShowPaymentModal={setShowPaymentModal} total={total} onProcessPayment={handleCheckout} paymentCheckout={paymentCheckout} handleProcessPayment={handleProcessPayment} paymentSuccess={paymentSuccess} setPaymentSuccess={setPaymentSuccess} customer={customer}/>}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white shadow-sm border border-gray-200 p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">POS - Point of Sale</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products by name or SKU..."
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowProductSearch(true);
                      }}
                      onFocus={() => setShowProductSearch(true)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  
                  {showProductSearch && searchQuery && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 shadow-lg max-h-64 overflow-y-auto">
                      {loading ? <div className="p-4">Loading...</div> : products.length > 0 ? (
                        products.map(product => (
                          <div
                            key={product.id}
                            onClick={() => addToCart(product)}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center">
                                <Package className="w-5 h-5 text-gray-400" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{product?.product_name}</p>
                                <p className="text-sm text-gray-500">
                                  SKU: {product?.sku} | Stock: 
                                  <span className={`ml-1 font-medium ${
                                    product?.product_quantity < 10 ? 'text-red-500' : 'text-green-600'
                                  }`}>
                                    {product?.product_quantity}
                                  </span>
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">₹{product?.product_price}</p>
                              {product?.product_quantity > 0 && (
                                <button className="text-gray-600 hover:text-gray-700 text-sm font-medium cursor-pointer">
                                  Add to Cart
                                </button>
                              )}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="p-4 text-center text-gray-500">
                          No products found
                        </div>
                      )}
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Scan or enter barcode..."
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleBarcodeSubmit()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleBarcodeSubmit}
                    className="px-6 py-3 bg-gray-800 text-white hover:bg-gray-900 transition-colors font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Cart Items Section */}
              <div className="lg:col-span-2">
                <div className="bg-white shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                      <ShoppingCart className="w-6 h-6 mr-2 text-gray-600" />
                      Cart Items ({cartItems.length})
                    </h2>
                  </div>
                  
                  <div className="p-6">
                    {cartItems.length === 0 ? (
                      <div className="text-center py-12">
                        <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">Cart is empty</p>
                        <p className="text-gray-400">Search and add products to start billing</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cartItems.map((item) => {
                          const amounts = calculateItemAmounts(item);
                          const isEditing = editingItemId === item.id;
                          
                          return (
                            <div key={item.id} className="border border-gray-200 p-4 bg-gray-50">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-4">
                                  <div className="w-12 h-12 bg-gray-200 flex items-center justify-center">
                                    <Package className="w-6 h-6 text-gray-400" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium text-gray-900">{item?.product_name}</h3>
                                    <p className="text-sm text-gray-500">SKU: {item?.sku}</p>
                                    <p className="text-sm font-medium text-gray-700">₹{item?.product_price} each</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    className="p-1 hover:bg-gray-200 transition-colors"
                                  >
                                    <Minus className="w-4 h-4" />
                                  </button>
                                  <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    className="p-1 hover:bg-gray-200 transition-colors"
                                  >
                                    <Plus className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => setEditingItemId(isEditing ? null : item.id)}
                                    className="p-1 hover:bg-blue-100 text-blue-600 transition-colors ml-2"
                                  >
                                    <Edit className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => updateQuantity(item.id, 0)}
                                    className="p-1 hover:bg-red-100 text-red-600 transition-colors"
                                  >
                                    <X className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>

                              {/* Tax and Discount Controls */}
                              {isEditing && (
                                <div className="grid grid-cols-2 gap-3 mb-3 p-3 bg-white border border-gray-200">
                                  {/* Tax Input */}
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                                      <Percent className="w-3 h-3 mr-1" />
                                      Tax (%)
                                    </label>
                                    <input
                                      type="number"
                                      value={item.tax || 0}
                                      onChange={(e) => updateItemTax(item.id, e.target.value)}
                                      className="w-full px-2 py-1.5 border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                      min="0"
                                      step="0.1"
                                    />
                                  </div>

                                  {/* Discount Input */}
                                  <div>
                                    <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center">
                                      <Tag className="w-3 h-3 mr-1" />
                                      Discount
                                    </label>
                                    <div className="flex space-x-1">
                                      <select
                                        value={item.discount_type || 'percentage'}
                                        onChange={(e) => updateItemDiscount(item.id, item.discount, e.target.value)}
                                        className="px-2 py-1.5 border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500"
                                      >
                                        <option value="percentage">%</option>
                                        <option value="fixed">₹</option>
                                      </select>
                                      <input
                                        type="number"
                                        value={item.discount || 0}
                                        onChange={(e) => updateItemDiscount(item.id, e.target.value, item.discount_type)}
                                        className="flex-1 px-2 py-1.5 border border-gray-300 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        min="0"
                                        step="0.1"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Item Calculation Summary */}
                              <div className="grid grid-cols-2 gap-2 text-sm pt-3 border-t border-gray-200">
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Subtotal:</span>
                                  <span className="font-medium">₹{amounts.subtotal.toFixed(2)}</span>
                                </div>
                                {amounts.discountAmount > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-green-600">Discount:</span>
                                    <span className="font-medium text-green-600">-₹{amounts.discountAmount.toFixed(2)}</span>
                                  </div>
                                )}
                                {amounts.taxAmount > 0 && (
                                  <div className="flex justify-between">
                                    <span className="text-gray-600">Tax ({item.tax}%):</span>
                                    <span className="font-medium">₹{amounts.taxAmount.toFixed(2)}</span>
                                  </div>
                                )}
                                <div className="flex justify-between col-span-2 pt-2 border-t border-gray-300">
                                  <span className="font-semibold text-gray-900">Item Total:</span>
                                  <span className="font-semibold text-gray-900">₹{amounts.total.toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Checkout Panel */}
              <div className="space-y-6">
                
                {/* Customer Selection */}
                <div className="bg-white shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-600" />
                    Customer Details
                  </h3>
                  
                  {customer ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">Name: {customer?.customer_name}</p>
                          <p className="text-sm text-gray-600">Phone: {customer?.customer_phone}</p>
                          {customer.customer_email && <p className="text-sm text-gray-600">Email: {customer.customer_email}</p>}
                          {customer.address && <p className="text-sm text-gray-500">Address: {customer.address}</p>}
                          {customer.gst_number && <p className="text-sm text-gray-500">GST: {customer.gst_number}</p>}
                        </div>
                        <button
                          onClick={() => {
                            setCustomer(null);
                            setcustomer_id(null);
                            setCustomerForm({
                              customer_name: '',
                              customer_phone: '',
                              customer_email: '',
                              address: '',
                              gst_number: ''
                            });
                          }}
                          className="text-red-600 hover:bg-red-50 p-1"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="relative">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <input
                            type="text"
                            placeholder="Search customer..."
                            value={searchCustomer}
                            onChange={(e) => setsearchCustomer(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                        </div>

                        {showSearchResults && searchResults.length > 0 && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                            {searchResults.map((result) => (
                              <div
                                key={result.id}
                                onClick={() => handleSelectCUstomer(result)}
                                className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                              >
                                <p className="font-medium text-gray-900">{result.customer_name}</p>
                                <p className="text-sm text-gray-600">{result.customer_phone}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <div className="px-4 text-xs text-gray-500 bg-white">OR</div>
                        <div className="flex-1 border-t border-gray-200"></div>
                      </div>

                      <button
                        onClick={() => setShowCustomerForm(!showCustomerForm)}
                        className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add New Customer
                      </button>
                      
                      {showCustomerForm && (
                        <div className="space-y-3 mt-4 p-4 bg-gray-50">
                          <input
                            type="text"
                            placeholder="Customer Name*"
                            value={customerForm.customer_name}
                            onChange={(e) => setCustomerForm({...customerForm, customer_name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number*"
                            value={customerForm.customer_phone}
                            onChange={(e) => setCustomerForm({...customerForm, customer_phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={customerForm.customer_email}
                            onChange={(e) => setCustomerForm({...customerForm, customer_email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                          <textarea
                            placeholder="Address"
                            value={customerForm.address}
                            onChange={(e) => setCustomerForm({...customerForm, address: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            rows="2"
                          />
                          <input
                            type="text"
                            placeholder="GST Number (Optional)"
                            value={customerForm.gst_number}
                            onChange={(e) => setCustomerForm({...customerForm, gst_number: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={handleCustomerSubmit}
                              disabled={!customerForm.customer_name || !customerForm.customer_phone}
                              className="flex-1 bg-gray-800 text-white px-4 py-2 hover:bg-gray-900 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                            >
                              Add Customer
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowCustomerForm(false);
                                setCustomerForm({
                                  customer_name: '',
                                  customer_phone: '',
                                  customer_email: '',
                                  address: '',
                                  gst_number: ''
                                });
                              }}
                              className="px-4 py-2 border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Order Summary */}
                <div className="bg-white shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{Math.ceil(subtotal).toLocaleString()}</span>
                    </div>
                    
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Total Discount</span>
                        <span>-₹{Math.ceil(discountAmount).toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Total Tax</span>
                      <span>₹{Math.ceil(taxAmount).toLocaleString()}</span>
                    </div>
                    
                    <div className="border-t pt-3">
                      <div className="flex justify-between text-xl font-bold text-gray-900">
                        <span>Total</span>
                        <span>₹{Math.ceil(total).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setShowPaymentModal(true)}
                  disabled={cartItems.length === 0 || processing}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {cartItems.length === 0 ? 'Add Items to Cart' : !processing ? `Process Payment (₹${Math.ceil(total).toLocaleString()})` : 'Processing...'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutComponent;