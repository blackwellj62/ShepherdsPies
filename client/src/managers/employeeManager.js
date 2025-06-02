export const getAllEmployees = () => {
    return fetch("/api/employees").then((res)=>res.json());
};

