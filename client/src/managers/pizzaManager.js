

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

