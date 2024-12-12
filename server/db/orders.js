const { getDb } = require("./db");

const TABLE_NAME = "orders";

module.exports = {
    TABLE_NAME,
    createOrder: async (userId, total) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (userId, total) VALUES (?, ?)`,
            userId, total
        );
        return { id: result.lastID, userId, total };
    },
   
    getAllOrders: async (userId) => {
        return await getDb().all(`SELECT * FROM ${TABLE_NAME} WHERE userId = ?`, userId);
    },
    
    getOrderItemsByOrderId: async (orderId) => {
        const items = await getDb().all(`SELECT * FROM order_items WHERE orderId = ?`, orderId);
        return items;
    },

    deleteOrder: async (id) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
    },
};
