

export const getPizzaSizes = () => {
    return fetch("/api/Size").then((res) => res.json());
};

export const getPizzaSauces = () => {
    return fetch("/api/Sauce").then((res)=>res.json());
};

export const getPizzaCheeses = () => {
    return fetch("/api/Cheese").then((res)=>res.json());
};

export const getToppings = () => {
    return fetch("/api/Topping").then((res)=> res.json());
};

export const createNewPizza = async (pizza) => {
    // First, create the pizza
    const pizzaResponse = await fetch("/api/Pizza", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sizeId: pizza.sizeId,
            sauceId: pizza.sauceId,
            cheeseId: pizza.cheeseId,
            orderId: pizza.orderId // make sure orderId is passed in!
        })
    });

    const newPizza = await pizzaResponse.json();

    // Then, create PizzaTopping entries
    for (const toppingId of pizza.toppingIds || []) {
        await fetch("/api/PizzaTopping", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                pizzaId: newPizza.id,
                toppingId: toppingId
            })
        });
    }

    return newPizza;
};

export const updatePizza = async (pizza) => {
    await fetch(`/api/Pizza/${pizza.id}`, {
        method: "PUT",
        headers: {
            "content-Type": "application/json"
        },
        body: JSON.stringify({
            id: pizza.id,
            sizeId: pizza.sizeId,
            sauceId: pizza.sauceId,
            cheeseId: pizza.cheeseId,
            orderId: pizza.orderId
        })
    })
};

export const deletePizzaToppingsByPizzaId = async (pizzaId) => {
    await fetch(`/api/PizzaTopping/pizza/${pizzaId}`, {
        method: "DELETE"
    });
};

export const deletePizza = async (pizzaId) => {
    await fetch(`/api/Pizza/${pizzaId}`, {
        method: "DELETE"
    })
}