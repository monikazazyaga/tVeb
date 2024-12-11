const { getDb } = require("./db");

const TABLE_NAME = "order_items";

module.exports = {
    TABLE_NAME,
    addOrderItem: async (orderId, productId, quantity, price) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (orderId, productId, quantity, price) VALUES (?, ?, ?, ?)`,
            orderId, productId, quantity, price
        );
        return { id: result.lastID, orderId, productId, quantity, price };
    },
    getAllOrderItems: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),
    deleteOrderItem: async (id) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
    },
};
