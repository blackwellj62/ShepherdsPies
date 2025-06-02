

export const getPizzaSizes = () => {
    return fetch("/api/sizes").then((res) => res.json());
};

export const getPizzaSauces = () => {
    return fetch("/api/sauce").then((res)=>res.json());
};

export const getPizzaCheeses = () => {
    return fetch("/api/cheese").then((res)=>res.json());
};

export const getToppings = () => {
    return fetch("/api/toppings").then((res)=> res.json());
};

