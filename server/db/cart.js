const { getDb } = require("./db");

const TABLE_NAME = "cart";
const CART_ITEMS_TABLE_NAME = "cart_items";

module.exports = {
    createCart: async (userId) => {
        try {
            const result = await getDb().run(
                `INSERT INTO ${TABLE_NAME} (userId) VALUES (?)`,
                userId
            );
            return { id: result.lastID, userId };
        } catch (error) {
            console.error('Ошибка при вставке в БД:', error); // Логируем ошибку
            throw new Error('Ошибка при работе с БД'); // Пробрасываем ошибку дальше
        }
    },
    addCartItem: async (cartId, productId, quantity) => {
        const existingItem = await getDb().get(`SELECT * FROM ${CART_ITEMS_TABLE_NAME} WHERE cartId = ? AND productId = ?`, cartId, productId);
        
        if (existingItem) {
            await getDb().run(
                `UPDATE ${CART_ITEMS_TABLE_NAME} SET quantity = quantity + ? WHERE cartId = ? AND productId = ?`,
                quantity, cartId, productId
            );
        } else {
            await getDb().run(
                `INSERT INTO ${CART_ITEMS_TABLE_NAME} (cartId, productId, quantity) VALUES (?, ?, ?)`,
                cartId, productId, quantity
            );
        }
    }
    ,

    getCartItems: async (cartId) => {
        const items = await getDb().all(`
            SELECT ci.*, p.name, p.price FROM ${CART_ITEMS_TABLE_NAME} ci
            JOIN products p ON ci.productId = p.id
            WHERE ci.cartId = ?`, cartId);
        return items;
    },

    getCartByUserId: async (userId) => {
        const cart = await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE userId = ?`, userId);
        return cart;
    },
    

    clearCart: async (cartId) => {
        await getDb().run(`DELETE FROM ${CART_ITEMS_TABLE_NAME} WHERE cartId = ?`, cartId);
    }
};
