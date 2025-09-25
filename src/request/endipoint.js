

export const endPoint = {
    auth:{
        login: '/auth/login/',
        signup: '/auth/signup/',
        verification: '/auth/verify-otp/'
    },
    store:{
        createStore: '/shop/shop/create-store/',
        storeLocation: '/shop/shop/create-store-address/',
        storeDomain: '/shop/shop/create-store-domain/',
        storeSetup: '/shop/shop/create-store-theme/',
        getStoreTheme:'/shop/shop/get-store-theme/',
        getStoreDetailsByName: 'store/',
        getStoreDetails:'shop/shop/',
        storeLaunchSetting: 'shop/shop/create-store-setting/',
        checkStoreDomainAvailability: 'shop/shop/check-domain-available/',
        getStore:'shop/shop/get-store/',
        storeDelivery:'shop/shop/get-store-delivery-options',
        category:'shop/category/'
    },
    marketPalce:{
        getStoreDetailsByName: 'store/',
        storeProduct: 'stores/product',
        storeDeals:"stores/product/store-deals",
        storeUser:"store-user/user/",
        storeCart:"store-user/store-cart/",
        storeProductList: 'stores/product/',
        userContact:'store-user/user-contact/',
        checkoutItem:'store-user/user-checkout/',
        product_category:'stores/product/get-store-product-category/'
    },
    address:{
        address: 'address/'
    },
    order:{
        placeOrder: 'order/create-order/',
        getOrder: '/order/order',
        getOrderById: (orderId) => `order/${orderId}/success-order/`,
        getOrderByUserId: 'store-user/store-order/user/',
        getOrderByStoreId: 'store-user/store-order/store/'
    },
    admin: {
        dashboard: 'admin/dashboard/',
        inventory: 'admin/inventory/',
        saveProduct: '/stores/product/',
        productStats:'/stores/product/product-stats/',
        deleteProduct: (productId) => `stores/product/${productId}/`,
        transaction: '/transaction/',
        transactionStats: '/transaction/transaction-stats/',
        transactionSummary: 'transaction/get-invoice/',
        transactionDetails: (transactionId) => `transaction/${transactionId}/`,
        order: 'order/',
        orderDetails: (orderId) => `order/${orderId}/`,
        adminLogin: '/admin-login/',
        productUnits: '/utility/product-unit/',
        productSuppliers: '/stores/product/create-supplier/',
        getProductSupplier: '/stores/product/get-supplier/',
        productUpdate: (productId) => `stores/product/${productId}/`,
        checkout: 'order/pos-checkout/',
        dashboardStats: 'dashboard/dashboard-analytics/',
        activity: 'dashboard/dashboard-analytics/activity/',
        customerPos: 'order/pos-checkout-customer/'

    }
}