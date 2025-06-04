export const getAllOrders = () => {
    return fetch("/api/Order").then((res) => res.json());
};

export const getOrderById = (id) => {
    return fetch(`/api/Order/${id}`).then((res)=>res.json());
};

export const cancelOrder = (orderId) => {
    return fetch(`/api/Order/${orderId}`,{
        method: "DELETE"
    });
};

export const createNewOrder = (order) => {
    return fetch("/api/Order",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(order)
    });
};