const express = require('express');
const { addUser, getUserByLogin } = require('../db/users');
const md5 = require('md5');

const usersRouter = express.Router();

usersRouter.post('/register', async (req, res) => {
    const existingUser = await getUserByLogin(req.body.login);
    if (existingUser) {
        return res.status(400).json({ message: 'Пользователь уже существует' });
    }
  
    const userType = '1'; 
    const newUser = await addUser(req.body.login, req.body.password, userType);
    res.status(201).json(newUser);
});


usersRouter.post('/login', async (req, res) => {
    const { login, password } = req.body;
    console.log('Login attempt:', { login, password }); // печатаем для отладки

    const user = await getUserByLogin(login);
    if (!user || user.password !== md5(password)) {
        console.log('Login failed:', user); // печатаем для отладки
        return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }
    // Возвращаем успешный ответ
    res.status(200).json({ message: 'Успешный вход' });
});

module.exports = usersRouter;
