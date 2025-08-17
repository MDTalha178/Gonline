import { MapPin } from "lucide-react"
import { ORDER_STATUS_CONFIG } from "../../../utils/constant"

const OrderStatus = ({order}) =>{
    return(
        <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>{order?.shipping_address?.address_line1 + ', ' + order?.shipping_address?.city}</span>
            </div>
            {order?.status === ORDER_STATUS_CONFIG.DELIVERED.server_status && (
                <span>Delivered on {order?.deliveryDate}</span>
            )}
            {(order?.status == ORDER_STATUS_CONFIG.SHIPPED.server_status || order?.status == ORDER_STATUS_CONFIG.PENDING.server_status) && (
                <span>Expected by {order?.delivery_type?.estimated_time}</span>
            )}
            {order?.status === ORDER_STATUS_CONFIG.CANCELLED.server_status  && (
                <span>Cancelled on {order?.cancelledDate}</span>
            )}
        </div>
    )
}

export default OrderStatus