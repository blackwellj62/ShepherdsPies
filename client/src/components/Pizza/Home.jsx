import { useEffect, useState } from "react"
import { cancelOrder, getAllOrders } from "../../managers/orderManager.js"

export const Home = () => {
    const [orders, setOrders] = useState([])

    const loadOrders = async () => {
    const orderArray = await getAllOrders();
    setOrders(orderArray);
}

useEffect(() => {
    loadOrders();
}, []);

const handleDelete = async (orderId) => {
    await cancelOrder(orderId);
    loadOrders();
}
   

    return(
        <div>
            <h2>All Orders</h2>
            {orders.map((order)=>
                <div key={order.id} className="card" style={{width: "18rem,"}}>
                    <div className="card-body">
                        <h5 className="card-title">Order #{order.id}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">Order Date: {order.orderDateTime}</h6>
                        <p className="card-text"># of Pizzas: {order.pizzas.length}</p>
                        <a href={order.id} className="card-link">Order Details</a>
                        <a href={order.id} className="card-link">Update Order</a>
                    </div>
                        <button type="button" className="btn btn-danger mt-3 ms-2" onClick={()=>{handleDelete(order.id)}} >
                            Cancel Order
                        </button>
                </div>
            )}
        </div>
    )
}