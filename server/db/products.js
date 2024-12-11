const { getDb } = require("./db");

const TABLE_NAME = "products";

module.exports = {
    TABLE_NAME,
    addProduct: async (name, description, price, categoryId, stock) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (name, description, price, categoryId, stock) VALUES (?, ?, ?, ?, ?)`,
            name, description, price, categoryId, stock
        );
        return { id: result.lastID, name, description, price, categoryId, stock };
    },
    getAllProducts: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),
    deleteProduct: async (id) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
    },
};
