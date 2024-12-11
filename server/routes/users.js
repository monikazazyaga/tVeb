const express = require('express');
const { addUser, getUserByLogin } = require('../db/users');

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res) => {
    const existingUser = await getUserByLogin(req.body.login);
    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }
    const newUser = await addUser(req.body.login, req.body.password, req.body.type);
    res.status(201).json(newUser);
});

module.exports = usersRouter;
