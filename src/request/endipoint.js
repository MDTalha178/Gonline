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
        storeDelivery:'shop/shop/get-store-delivery-options'
    },
    marketPalce:{
        getStoreDetailsByName: 'store/',
        storeProduct: 'stores/product',
        storeDeals:"stores/product/store-deals",
        storeUser:"store-user/user/",
        storeCart:"store-user/store-cart/",
        storeProductList: 'stores/product/',
        userContact:'store-user/user-contact/',
        checkoutItem:'store-user/user-checkout/'
    },
    address:{
        address: 'address/'
    },
    order:{
        placeOrder: 'order/create-order/',
        getOrder: 'store-user/store-order/',
        getOrderById: 'store-user/store-order/',
        getOrderByUserId: 'store-user/store-order/user/',
        getOrderByStoreId: 'store-user/store-order/store/'
    }
}