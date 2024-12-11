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
    getProductById: async (id) => {
        const product = await getDb().get(`SELECT * FROM products WHERE id = ?`, id);
        return product;
    },

    updateProduct: async (id, name, description, price, categoryId, stock) => {
        await getDb().run(
            `UPDATE ${TABLE_NAME} SET name = ?, description = ?, price = ?, categoryId = ?, stock = ? WHERE id = ?`,
            name, description, price, categoryId, stock, id
        );
        return { id, name, description, price, categoryId, stock };
    },
};
