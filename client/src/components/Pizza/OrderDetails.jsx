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

    const calculatePizzaPrice = (pizza) => {
        const sizePrice = pizza.size?.price || 0
        const toppingsTotal = pizza.pizzaToppings.reduce((sum, pt) => sum + (pt.topping?.price || 0), 0)
        return sizePrice + toppingsTotal
    }

    const totalBasePrice = order.pizzas.reduce((sum, p) => sum + calculatePizzaPrice(p), 0)
    const deliveryFee = order.isDelivery ? 5 : 0
    const tip = order.tip || 0
    const totalOrderPrice = totalBasePrice + deliveryFee + tip

    return (
        <div>
            <h1>Order #{order.id}</h1>

            <p>Order Taker: {order.taker?.name || "N/A"}</p>
            <p>Delivery or Dine-In: {order.isDelivery ? "Delivery" : "Dine-In"}</p>
            <p>Deliverer: {order.deliver?.name || "N/A"}</p>
            <p>Table Number: {order.tableNumber || "N/A"}</p>
            <h3>Pizzas:</h3>
            {order.pizzas.map((pizza, index) => (
                <div>
                <h5>Pizza #{index + 1}</h5>
                <p>Size: {pizza.size?.name}</p>
                <p>Sauce: {pizza.sauce?.name}</p>
                <p>Cheese: {pizza.cheese?.name}</p>
                <h5>Toppings:</h5>
                {pizza.pizzaToppings.map(pt => (
                    <p key={pt.id}>{pt.topping?.name}</p>
                ))}
                <p>Pizza Total: ${calculatePizzaPrice(pizza).toFixed(2)}</p>
                </div>
            ))}
            <h4>Total Before Tip: ${totalBasePrice.toFixed(2)}</h4>
            <h4>Delivery Fee: ${deliveryFee.toFixed(2)}</h4>
            <h3>Total: ${totalOrderPrice.toFixed(2)}</h3>
        </div>
    )

}