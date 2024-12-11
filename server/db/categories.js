const { getDb } = require("./db");

const TABLE_NAME = "categories";

module.exports = {
    TABLE_NAME,
    addCategory: async (name) => {
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (name) VALUES (?)`,
            name
        );
        return { id: result.lastID, name };
    },
    getAllCategories: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),
    updateCategory: async (id, name) => {
        await getDb().run(`UPDATE ${TABLE_NAME} SET name = ? WHERE id = ?`, name, id);
    },
    deleteCategory: async (id) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, id);
    },
};
