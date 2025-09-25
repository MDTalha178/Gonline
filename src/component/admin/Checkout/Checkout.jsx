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
  LogOut
} from "lucide-react";
import AdminSidebar from "../Sidebar";
import { fetchProductList } from "../../../service/marketPlace/product_service";
import { useToast } from "../../../hooks/useToast";
import { checkoutService, customerCheckoutPos } from "../../../service/admin/Checkout/checkoutService";
import useDebounce from "../../../hooks/useDebounce";

const CheckoutComponent = () => {
  const {toast} = useToast()


  const [products, setproducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [customer, setCustomer] = useState(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [discountType, setDiscountType] = useState('percentage');
  const [discount, setDiscount] = useState(0);
  const [tax, setTax] = useState(18);
  const [amountReceived, setAmountReceived] = useState('');
  const [processing, setProcessing] = useState(false);
  const [loading, setLoading] = useState(false)
  const debouncedSearchTerm = useDebounce(searchQuery, 500); 
  const [customer_id, setcustomer_id] = useState(null);
  
  // Product search states
  const [showProductSearch, setShowProductSearch] = useState(false);
  const [barcodeInput, setBarcodeInput] = useState('');

  const [customerForm, setCustomerForm] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    address: '',
    gst_number: ''
  });

  // Filter products based on search query
  const filteredProducts = products?.filter(product =>
    product?.product_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product?.sku.toLowerCase().includes(searchQuery.toLowerCase()) 
  );

  const fetchProdouct = async () => {
    setLoading(true);
    try{
      const response = await fetchProductList(toast, {'search': searchQuery});
      if(response?.data?.results){
        setproducts(response?.data?.results);
      }
    }
    catch (error) {
      toast.error(error.message || 'Failed to fetch product list');
    }finally{
      setLoading(false);
    }
    
  }

  useEffect(() =>{
    if(debouncedSearchTerm){
      fetchProdouct();
    }
    
  },[debouncedSearchTerm, setProcessing])

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product_price * item.quantity), 0);
  const discountAmount = discountType === 'percentage' 
    ? (subtotal * discount / 100) 
    : discount;
  const taxAmount = ((subtotal - discountAmount) * tax / 100);
  const total = subtotal - discountAmount + taxAmount;
  const changeAmount = amountReceived ? Math.max(0, parseFloat(amountReceived) - total) : 0;


  const handleCheckout = async() => {
    // Implement checkout logic here
    setProcessing(true);
    const payload = {
      ...customer,
      sub_total: subtotal,
      discount_amount: Math.ceil(discountAmount),
      tax: Math.ceil(taxAmount),
      total_bill_amount: Math.ceil(total),
      total_items: cartItems.length,
      product_id:cartItems.map((item) => {
        return {product_id: item.id, quantity: item.quantity}
      }),
      pos_customer_id: customer_id
    }
    const response = await checkoutService(payload, toast);
    if(response?.data){
      setCartItems([]);
      setCustomer(null);
      setAmountReceived('');
      setDiscount(0);
      setTax(0);
      fetchProdouct();
      toast.success("Order placed successfully");
    }
    setProcessing(false);
  }

  // Add product to cart
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
      setTax(product?.tax_percentage || tax);
      setCartItems([...cartItems, { ...product, quantity }]);
    }
    setSearchQuery('');
    setShowProductSearch(false);
  };

  // Handle barcode scan
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
      if (newQuantity > product?.product_quantity) {
        console.log(newQuantity);
        toast.info(`Only ${product.product_quantity} items available in stock`, {
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

  const processPayment = () => {
    if (cartItems.length === 0) {
      alert('Please add items to cart');
      return;
    }
    
    if (paymentMethod === 'cash' && parseFloat(amountReceived) < total) {
      alert('Insufficient amount received');
      return;
    }
    
    const orderData = {
      customer,
      items: cartItems,
      subtotal,
      discount: discountAmount,
      tax: taxAmount,
      total,
      payment_method: paymentMethod,
      amount_received: amountReceived,
      change_amount: changeAmount,
      timestamp: new Date().toISOString()
    };
    
    console.log('Processing order:', orderData);
    alert('Order processed successfully!');
    
    // Reset cart after successful payment
    setCartItems([]);
    setCustomer(null);
    setAmountReceived('');
    setDiscount(0);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar currentPage="Checkout" />
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-4">POS - Point of Sale</h1>
              
              {/* Product Search Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Search by Name/SKU */}
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
                        fetchProdouct();
                      }}
                      onFocus={() => setShowProductSearch(true)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  
                  {/* Product Search Results */}
                  {showProductSearch && searchQuery && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-none shadow-lg max-h-64 overflow-y-auto">
                      {loading ? <div className="p-4">Loading...</div> : products.length > 0 ? (
                        products.map(product => (
                          <div
                            key={product.id}
                            onClick={() => addToCart(product)}
                            className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-gray-100 rounded-none flex items-center justify-center">
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
                              {product?.product_quantity > 0 && <button className="text-gray-600 hover:text-gray-700 text-sm font-medium cursor-pointer">
                                Add to Cart
                              </button>}
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
                
                {/* Barcode Scanner */}
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <Scan className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Scan or enter barcode..."
                      value={barcodeInput}
                      onChange={(e) => setBarcodeInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleBarcodeSubmit()}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={handleBarcodeSubmit}
                    className="px-6 py-3 bg-gray-800 text-white rounded-none hover:bg-gray-900 transition-colors font-medium"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Cart Items Section */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-none shadow-sm border border-gray-200">
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
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-none">
                            <div className="flex items-center space-x-4">
                              <div className="w-12 h-12 bg-gray-200 rounded-none flex items-center justify-center">
                                <Package className="w-6 h-6 text-gray-400" />
                              </div>
                              <div>
                                <h3 className="font-medium text-gray-900">{item?.product_name}</h3>
                                <p className="text-sm text-gray-500">SKU: {item?.sku}</p>
                                <p className="text-sm font-medium text-gray-700">₹{item?.product_price} each</p>
                                <p className="text-xs text-gray-500">Stock: {item.stock}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-1 rounded-none hover:bg-gray-200 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-1 rounded-none hover:bg-gray-200 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => updateQuantity(item.id, 0)}
                                className="p-1 rounded-none hover:bg-red-100 text-red-600 transition-colors ml-2"
                              >
                                <X className="w-4 h-4" />
                              </button>
                              <div className="text-right min-w-[4rem]">
                                <p className="font-semibold text-gray-900">
                                  ₹{(item?.product_price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Checkout Panel */}
              <div className="space-y-6">
                
                {/* Customer Selection */}
                <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2 text-gray-600" />
                    Customer Details
                  </h3>
                  
                  {customer ? (
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900">{customer.customer_name}</p>
                          <p className="text-sm text-gray-600">{customer.customer_phone}</p>
                          {customer.email && <p className="text-sm text-gray-600">{customer.customer_email}</p>}
                          {customer.address && <p className="text-sm text-gray-500">{customer.address}</p>}
                        </div>
                        <button
                          onClick={() => setCustomer(null)}
                          className="text-red-600 hover:bg-red-50 p-1 rounded-none"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        onClick={() => setShowCustomerForm(!showCustomerForm)}
                        className="w-full flex items-center justify-center px-4 py-2 border border-dashed border-gray-300 rounded-none text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add Customer (Optional)
                      </button>
                      
                      {showCustomerForm && (
                        <div className="space-y-3 mt-4 p-4 bg-gray-50 rounded-none">
                          <input
                            type="text"
                            placeholder="Customer Name*"
                            value={customerForm.name}
                            onChange={(e) => setCustomerForm({...customerForm, customer_name: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="tel"
                            placeholder="Phone Number*"
                            value={customerForm.phone}
                            onChange={(e) => setCustomerForm({...customerForm, customer_phone: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            required
                          />
                          <input
                            type="email"
                            placeholder="Email"
                            value={customerForm.email}
                            onChange={(e) => setCustomerForm({...customerForm, customer_email: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                          <textarea
                            placeholder="Address"
                            value={customerForm.address}
                            onChange={(e) => setCustomerForm({...customerForm, address: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                            rows="2"
                          />
                          <input
                            type="text"
                            placeholder="GST Number (Optional)"
                            value={customerForm.gst_number}
                            onChange={(e) => setCustomerForm({...customerForm, gst_number: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          />
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={handleCustomerSubmit}
                              className="flex-1 bg-gray-800 text-white px-4 py-2 rounded-none hover:bg-gray-900 transition-colors"
                            >
                              Add Customer
                            </button>
                            <button
                              type="button"
                              onClick={() => setShowCustomerForm(false)}
                              className="px-4 py-2 border border-gray-300 text-gray-600 rounded-none hover:bg-gray-50 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Discount & Tax */}
                <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-gray-600" />
                    Discount & Tax
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Discount</label>
                      <div className="flex space-x-2">
                        <select
                          value={discountType}
                          onChange={(e) => setDiscountType(e.target.value)}
                          className="px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500"
                        >
                          <option value="percentage">%</option>
                          <option value="fixed">₹</option>
                        </select>
                        <input
                          type="number"
                          value={discount}
                          onChange={(e) => setDiscount(parseFloat(e.target.value) || 0)}
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                          placeholder="0"
                          min="0"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Tax Rate (%)</label>
                      <input
                        type="number"
                        value={tax}
                        onChange={(e) => setTax(parseFloat(e.target.value) || 0)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                        placeholder="18"
                        min="0"
                        step="0.1"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-white rounded-none shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-₹{Math.ceil(discountAmount).toLocaleString()}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-gray-600">
                      <span>Tax ({tax}%)</span>
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
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0 || processing}
                    className="w-max bg-green-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
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

export default CheckoutComponent