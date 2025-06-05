import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getOrderById } from "../../managers/orderManager"

export const OrderDetails = () => {
    const { id } = useParams()
    const [order, setOrder] = useState(null)

    useEffect(() => {
        getOrderById(id).then(setOrder)
    },[id])

    if (!order) return <p>Loading order...</p>

    return (
        <div>
            <h1>Order #{order.id}</h1>
            <p>Order Taker: {order.taker?.name || "N/A"}</p>
            <p>Delivery or Dine-In: {order.isDelivery ? "Delivery" : "Dine-In"}</p>
            <p>Deliverer: {order.deliver?.name || "N/A"}</p>
        </div>
    )

}