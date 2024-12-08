export const BASE_URL = "http://localhost:3001";

export type LoginData = {
  login: string;
  password: string;
};

export type RegistrationData = {
  login: string;
  password: string;
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
      const response = await fetch(`${BASE_URL}/auth`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      await errorHandler(response);
    },
    logout: async () => {
      const response = await fetch(`${BASE_URL}/auth`, {
        method: "DELETE",
        credentials: "include",
      });
      await errorHandler(response);
    },
  },
  user: {
    register: async (data: RegistrationData) => {
      const response = await fetch(`${BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      await errorHandler(response);
    },
    getCurrentUser: async () => {
      const response = await fetch(`${BASE_URL}/user`, {
        credentials: "include",
        method: "GET"
      });
      await errorHandler(response);
      return await response.json();
    },
  },
  categories: {
    createCategory: async (name: string) => {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name })
      });
      await errorHandler(response);
    },
    getAllCategories: async () => {
      const response = await fetch(`${BASE_URL}/categories`, {
        method: "GET",
      });
      await errorHandler(response);
      return await response.json();
    },
    updateCategory: async (id: number, newName: string) => {
      const response = await fetch(`${BASE_URL}/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName })
      });
      await errorHandler(response);
    },
    deleteCategory: async (id: number) => {
      const response = await fetch(`${BASE_URL}/categories/${id}`, {
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
        body: JSON.stringify({ userId, total })
      });
      await errorHandler(response);
    },
    getAllOrders: async () => {
      const response = await fetch(`${BASE_URL}/orders`, {
        method: "GET",
      });
      await errorHandler(response);
      return await response.json();
    },
    deleteOrder: async (id: number) => {
      const response = await fetch(`${BASE_URL}/orders/${id}`, {
        method: "DELETE",
      });
      await errorHandler(response);
    },
  },
  products: {
    createProduct: async (name: string, description: string, price: number, categoryId: number, stock: number) => {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price, categoryId, stock })
      });
      await errorHandler(response);
    },
    getAllProducts: async () => {
      const response = await fetch(`${BASE_URL}/products`, {
        method: "GET",
      });
      await errorHandler(response);
      return await response.json();
    },
    updateProduct: async (id: number, name: string, price: number, stock: number) => {
      const response = await fetch(`${BASE_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, stock })
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
  orderItems: {
    createOrderItem: async (orderId: number, productId: number, quantity: number, price: number) => {
      const response = await fetch(`${BASE_URL}/order_items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, productId, quantity, price })
      });
      await errorHandler(response);
    },
    getAllOrderItems: async () => {
      const response = await fetch(`${BASE_URL}/order_items`, {
        method: "GET",
      });
      await errorHandler(response);
      return await response.json();
    },
    deleteOrderItem: async (id: number) => {
      const response = await fetch(`${BASE_URL}/order_items/${id}`, {
        method: "DELETE",
      });
      await errorHandler(response);
    },
  },
};

