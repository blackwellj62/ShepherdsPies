export const getAllEmployees = () => {
    return fetch("/api/Employee").then((res)=>res.json());
};

