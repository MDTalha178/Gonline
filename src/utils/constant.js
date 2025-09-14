export const ACCESS_TOKEN_NAME = 'Authorization';

export const SUBSCRIPTION_PLAN = {
    FREE: 'free',
    PREMIUM: 'premium',
    BASIC: 'basic',
    PROFESSIONAL: 'professional',
    ENTERPRISE: 'enterprise'
}

export const DOMAIN_TYPE = {
    basic: 'SLUGDOMAIN',
    professional: 'SUBDOMAIN',
    enterprise: 'CUSTOM'
}

export const DOMAIN_TYPE_TEXT = {
    SLUGDOMAIN: 'SLUGDOMAIN',
    SUBDOMAIN: 'SUBDOMAIN',
    ENTERPRISE: 'CUSTOM'
}

export const COLOR_OPTIONS  = [
    '#000000', '#374151', '#6B7280', '#EF4444', '#F97316', 
    '#F59E0B', '#10B981', '#06B6D4', '#3B82F6', '#8B5CF6', 
    '#EC4899', '#FFFFFF'
]

export const FONT_SIZE  = [12, 14, 16, 18, 20, 24, 28, 32, 36, 48];

export const THEME_TYPE_CONFIG = {
    BANNER:'banner',
    HEADER:'header',
    FOOTER:'footer',
    FILTER:'filter',
    DEALS:'deals',
    SALES:'sales',
    FEATURED:'featured'
}

export const FILTER_TYPE = {
    RANGE:'RANGE',
    LIST:'LIST',
    FOOTER:'footer',
    FILTER:'filter'
}

export const STORE_STATUS = {
    PUBLISHED:'PUBLISHED',
    UNPUBLISHED:'UNPUBLISHED',
    DRAFT:'DRAFT',
    NOT_FOUND:'NOT_FOUND',
    OFFLINE:'OFFLINE',
    ONLINE:'ONLINE',
    SUSPENDED:'SUSPENDED',
    MAINTENANCE:'MAINTENANCE',
    TEMPORARILY_UNAVAILABLE:'TEMPORARILY_UNAVAILABLE'
}

export const ROLE_TYPE = {
    ADMIN:'ADMIN',
    CUSTOMER:'CUSTOMER',
    VENDOR:'VENDOR'
}

export const CURRENCY_ICON_CODE = {
    INR: '\u20B9'
}

export const REVIEWS_ANALYTICS_TYPE ={
    5: 'five_star_count',
    4: 'four_star_count',
    3: 'three_star_count',
    2: 'two_star_count',    
    1: 'one_star_count'
}

export const SUPPORTED_ADDRESS = {
    STORE_CONTACT:'STORE_CONTACT',
    CUSTOMER_ADDRESS:'CUSTOMER_ADDRESS',
    VENDOR_ADDRESS:'VENDOR_ADDRESS'
}

export const ORDER_STATUS_CONFIG = {
    PENDING: {
        statusColor: 'text-yellow-600',
        statusBg: 'bg-yellow-100',
        status: 'Pending',
        server_status:'PENDING'

    },
    CONFIRMED: {
        statusColor: 'text-green-600',
        statusBg: 'bg-green-100',
        status: 'Confirmed',
        server_status:'CONFIRMED'
    },
    CANCELLED: {
        statusColor: 'text-red-600',
        statusBg: 'bg-red-100',
        status: 'Cancelled',
        server_status:'CANCELLED'
    },
    DELIVERED: {
        statusColor: 'text-green-600',
        statusBg: 'bg-green-100',
        status: 'Delivered',
        server_status:'DELIVERED'
    },
    SHIPPED: {
        statusColor: 'text-blue-600',
        statusBg: 'bg-blue-100',
        status: 'Shipped',
        server_status:'SHIPPED'
    },
    RETURNED:{
        statusColor: 'text-red-600',
        statusBg: 'bg-red-100',
        status: 'Returned',
        server_status:'RETURNED'
    },
    REJECTED: {
        statusColor: 'text-red-600',
        statusBg: 'bg-red-100',
        status: 'Rejected',
        server_status:'REJECTED'
    },
    FAILED:{
        statusColor: 'text-red-600',
        statusBg: 'bg-red-100',
        status: 'Failed',
        server_status:'FAILED'

    }
}

export const PAYMENT = {
    'COD':'Cash on Delivery',
    'ONLINE':'Online Payment',
    'WALLET':'Wallet Payment',
    'UPI':'UPI Payment',
    'CARD':'Card Payment'
}