export const BASE_URL = "http://localhost:3001";

export type LoginData = {
    login: string;
    password: string;
};

export type LoginResponse = {
    message: string;
    userType: string; 
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
    if (!response.ok) { 
        let errorMessage = 'Ошибка';
        try {
            const responseData = await response.json(); // Если не удается получить JSON, это вызовет ошибку
            errorMessage = responseData.message || errorMessage;
        } catch (e) {
            // Ошибки JSON могут происходить, если ответ HTML
            const text = await response.text(); // Получение текста ответа
            console.error('Ошибка парсинга:', text);
            throw new Error('Произошла ошибка при загрузке данных.'); // Общее сообщение об ошибке для пользователя
        }
        throw new Error(errorMessage);
    }
};



export const API = {
    auth: {
        login: async (data: LoginData): Promise<LoginResponse> => {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            await errorHandler(response);
            return await response.json(); // Возвращаем ответ API
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
        getProductById: async (id: number) => {
            const response = await fetch(`${BASE_URL}/products/${id}`, { method: "GET" });
            await errorHandler(response);
            return await response.json();
        },
        updateProduct: async (id: number, product: Product) => { // Указаны типы для id и product
            const response = await fetch(`${BASE_URL}/products/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product),
            });
            await errorHandler(response);
            return await response.json(); // Вернуть обновленный продукт
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


