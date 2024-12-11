const { getDb } = require("./db");
const md5 = require("md5");

const TABLE_NAME = "users";

module.exports = {
    TABLE_NAME,
    addUser: async (login, password, type) => {
        const newUser = {
            login,
            password: md5(password),
            type
        };
        const result = await getDb().run(
            `INSERT INTO ${TABLE_NAME} (login, password, type) VALUES (?, ?, ?)`,
            newUser.login, newUser.password, newUser.type
        );
        newUser.id = result.lastID;
        return newUser;
    },
    getUserByLogin: async (login) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE login = ?`, login),
    getUserById: async (id) => await getDb().get(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, id),
};
