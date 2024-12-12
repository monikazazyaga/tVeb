export const BASE_URL = "http://localhost:3001";

export type LoginData = {
    login: string;
    password: string;
};

export type LoginResponse = {
    message: string;
    userType: string; 
    userId: number;
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
    const responseClone = response.clone();
    
    if (!response.ok) {
        let errorMessage = 'Ошибка';
        try {
            const responseData = await responseClone.json();
            errorMessage = responseData.message || errorMessage;
        } catch (e) {
            try {
                const text = await responseClone.text();
                errorMessage = text;
            } catch {
                errorMessage = 'Неизвестная ошибка';
            }
        }
        console.error('Произошла ошибка:', errorMessage); // Логируем ошибку
        throw new Error(errorMessage);
    }
};



export const API = {
    auth: {
        login: async (data: LoginData): Promise<LoginResponse> => {
            const response = await fetch(`${BASE_URL}/auth/login`, {
                method: "POST",
                credentials: "include", // Позволяет использовать куки
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            await errorHandler(response);
            const { token, userType , userId } = await response.json();
            localStorage.setItem('token', token); // Сохраняем токен в localStorage
            return { message: 'Успешный вход', userType, userId  };
        },
        logout: async () => {
            await fetch(`${BASE_URL}/auth/logout`, {
                method: "DELETE",
                credentials: "include",
            });
            localStorage.removeItem('token'); // Удаляем токен при выходе
        },
        getUserIdByToken: async () => {
            const response = await fetch(`${BASE_URL}/auth/me`, {
                method: "GET",
                credentials: "include",
            });
            await errorHandler(response);
            return await response.json(); // Возвращает { userId }
        }
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
    categories: {
        getAllCategories: async () => {
            const response = await fetch(`${BASE_URL}/categories`, { method: "GET" }); // Предполагается, что на сервере есть этот маршрут
            await errorHandler(response);
            return await response.json();
        },
    },
    orders: {
        createOrder: async (userId: number, total: number) => {
            const response = await fetch(`${BASE_URL}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId, total }),
            });
            if (!response.ok) {
                const errorData = await response.json(); 
                console.error('Ошибка при создании заказа:', errorData); 
                throw new Error(errorData.message || 'Ошибка при создании заказа');
            }
        
            return await response.json();
        },
        getAllOrders: async (userId: number) => {
            const response = await fetch(`${BASE_URL}/orders?userId=${userId}`, { method: "GET" }); 
            await errorHandler(response); 
            return await response.json(); 
        },
        getOrderItemsByOrderId: async (orderId: number) => {
            const response = await fetch(`${BASE_URL}/orders/${orderId}/items`, { method: "GET" });
            await errorHandler(response);
            return await response.json();
        },
        
    },
   
    orderItems: {
        addOrderItem: async (orderId: number, productId: number, quantity: number, price: number) => {
            const response = await fetch(`${BASE_URL}/order_items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderId, productId, quantity, price }),
            });
            if (!response.ok) {
                throw new Error(`Ошибка добавления товара: ${response.statusText}`);
            }
            return await response.json();
        },
        getOrderItems: async (orderId:number) => {
            const response = await fetch(`${BASE_URL}/order_items/${orderId}`, {
                method: "GET",
            });
            await errorHandler(response);
            return await response.json();
        },
    },

  
    cart: {
        createCart: async (userId: number) => {
            const response = await fetch(`${BASE_URL}/cart`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });
            console.log('Отправка userId:', userId);
    
            if (!response.ok) {
                const errorText = await response.text(); 
                throw new Error(`Ошибка: ${response.status} ${errorText}`); // Включаем текст ошибки
            }
            return await response.json(); 
        },
        addCartItem: async (cartId: number, productId: number, quantity: number) => { // Явно указываем типы для параметров
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ cartId, productId, quantity })
            });
            await errorHandler(response);
           
        },
        getCartItems: async (cartId: number) => { // Явно указываем тип для cartId
            const response = await fetch(`${BASE_URL}/cart/${cartId}/items`, { method: "GET" });
            await errorHandler(response);
            return await response.json();
        },
        clearCart: async (cartId: number) => { // Явно указываем тип для cartId
            await fetch(`${BASE_URL}/cart/${cartId}`, { method: "DELETE" });
        }
    },
};


