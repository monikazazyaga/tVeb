export const BASE_URL = "http://localhost:3001";

export type LoginData = {
    login: string;
    password: string;
};

export type RegistrationData = {
    login: string;
    password: string;
};

export type Product = {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
};

export type Order = {
    id: number;
    userId: number;
    total: number;
    date: string;
};

const errorHandler = async (response: Response) => {
    if (response.status !== 200) {
        const responseData = await response.json();
        throw Error(responseData.message);
    }
};

export const API = {
    auth: {
        login: async (data: LoginData) => {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            await errorHandler(response);
        },
        logout: async () => {
            await fetch(`${BASE_URL}/auth/logout`, {
                method: "DELETE",
                credentials: "include",
            });
        },
    },
    user: {
        register: async (data: RegistrationData) => {
            const response = await fetch(`${BASE_URL}/users/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            await errorHandler(response);
        },
    },
    products: {
        getAllProducts: async () => {
            const response = await fetch(`${BASE_URL}/products`, { method: "GET" });
            await errorHandler(response);
            return await response.json();
        },
        createProduct: async (data: Product) => {
            const response = await fetch(`${BASE_URL}/products`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            await errorHandler(response);
        },
        deleteProduct: async (id: number) => {
            const response = await fetch(`${BASE_URL}/products/${id}`, {
                method: "DELETE",
            });
            await errorHandler(response);
        },
    },
    orders: {
        createOrder: async (userId: number, total: number) => {
            const response = await fetch(`${BASE_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, total }),
            });
            await errorHandler(response);
        },
        getAllOrders: async (userId: number) => {
            const response = await fetch(`${BASE_URL}/orders?userId=${userId}`, { method: "GET" });
            await errorHandler(response);
            return await response.json();
        },
    },
};


