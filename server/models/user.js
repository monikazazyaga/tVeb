const {getUserIdByToken} = require("../db/tokens");
const {AuthError} = require("../errors");
const {DataTypes} = require("sequelize");

const User = sequelize => sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = {
    User,
    checkAuth: async (token) => {
        const userId = await getUserIdByToken(token);
        if (!userId) {
            throw new AuthError("Пользователь не авторизован");
        }
        return userId;
    }
}