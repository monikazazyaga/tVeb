const nanoid = require("nanoid");
const {getDb} = require("./db");
const md5 = require('md5');
const TABLE_NAME = "users";
module.exports = {
    addUser: async (login, password) => {
        return await getDb().models.User.create({
            login,
            password: md5(password)
        });
    },
    getUsers: async () => await getDb().all(`SELECT * FROM ${TABLE_NAME}`),
    getUserByLogin: async (login) => await getDb().get('SELECT * FROM users WHERE login = ?', [login]),
    getUserById: async (id) => await getDb().get('SELECT * FROM users WHERE id = ?', [id]),
};