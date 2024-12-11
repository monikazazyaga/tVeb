const { getDb } = require("./db");

const TABLE_NAME = "orders";

module.exports = {
    TABLE_NAME,
    addOrder: async (userId, total) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (userId, total) VALUES (?, ?)`,
            userId, total
        );
        return { id: result.lastID, userId, total };
    },
    getAllOrders: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),
    deleteOrder: async (id) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
    },
};
