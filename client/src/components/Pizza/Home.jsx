import { useState } from "react"

export const Home = () => {
    const [orders, setOrders] = useState([])

    return(
        <div>
            <h2>All Orders</h2>
            {orders.map((order)=>
                <div class="card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">Order #{order.id}</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card’s content.</p>
                        <a href="#" class="card-link">Card link</a>
                        <a href="#" class="card-link">Another link</a>
                    </div>
                </div>
            )}
        </div>
    )
}