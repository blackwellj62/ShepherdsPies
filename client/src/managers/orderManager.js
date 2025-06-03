export const getAllOrders = () => {
    return fetch("/api/Order").then((res) => res.json());
};

export const getOrderById = (id) => {
    return fetch(`/api/Order/${id}`).then((res)=>res.json());
};

export const cancelOrder = (orderId) => {
    return fetch(`/api/orders/${orderId}`,{
        method: "DELETE"
    });
};

export const createOrder = (order) => {
    return fetch("/api/orders",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });
};