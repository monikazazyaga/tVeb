const express = require('express');
const {getUserIdByToken} = require("../db/tokens");
const {getUserByLogin, addUser, getUserById} = require("../db/users");
const {checkAuth} = require("../models/user");
const {BadRequestError} = require("../errors");
const userRouter = express.Router();

userRouter.get("/", async (req, res, next) => {
    try {
        const token = req.cookies.token;
        const userId = await checkAuth(token);

        const user = await getUserById(userId);
        res.status(200).json(user);
    } catch (err) {
        next(err);
    }

});

userRouter.post("/", async (req, res, next) => {
    try {
        const user = await getUserByLogin(req.body.login);
        if (user) {
            throw new BadRequestError("Такой пользователь уже есть");
        }

        const newUser = await addUser(req.body.login, req.body.password);
        res.status(200).json(newUser);
    } catch (err) {
        next(err);
    }
});

module.exports = userRouter;