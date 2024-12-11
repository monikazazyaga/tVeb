const { getDb } = require("./db");
const nanoid = require("nanoid");

const TABLE_NAME = "tokens";

module.exports = {
    TABLE_NAME,
    addToken: async (userId) => {
        const token = nanoid();
        await getDb().run(`INSERT INTO ${TABLE_NAME} (token, userId) VALUES (?, ?)`, token, userId);
        return token;
    },
    getUserIdByToken: async (token) => {
        const result = await getDb().get(`SELECT userId FROM ${TABLE_NAME} WHERE token = ?`, token);
        return result ? result.userId : null;
    },
    deleteByToken: async (token) => {
        await getDb().run(`DELETE FROM ${TABLE_NAME} WHERE token = ?`, token);
    },
};
