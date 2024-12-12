const express = require('express');
const md5 = require('md5');
const { getUserByLogin, addUser } = require('../db/users');
const { addToken, deleteByToken, getUserIdByToken } = require('../db/tokens'); // добавьте функцию получения userId по токену
const authRouter = express.Router();
const COOKIE_NAME = "token";

// Логика для входа пользователя
authRouter.post('/login', async (req, res) => {
    const { login, password } = req.body;
    console.log('Login attempt:', { login, password }); // Логируем входные данные

    const user = await getUserByLogin(login);
    console.log('User found:', user); // Логируем информацию о пользователе

    if (!user) {
        console.log('User not found');
        return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }

    const hashedPassword = md5(password);
    console.log('Hashed password:', hashedPassword); // Логируем хеш пароля
    console.log('Stored password:', user.password); // Логируем сохраненный хеш пароля

    if (user.password !== hashedPassword) {
        console.log('Password mismatch');
        return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }

    const token = await addToken(user.id);
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(200).json({ token, userId: user.id, userType: user.type });
    // Возвращаем токен и тип пользователя
});

// Логика для выхода пользователя
authRouter.delete('/logout', async (req, res) => {
    const token = req.cookies[COOKIE_NAME];
    await deleteByToken(token);
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ ok: true });
});

// Логика для получения информации о пользователе по токену
authRouter.get('/me', async (req, res) => {
    const token = req.cookies[COOKIE_NAME];
    const userId = await getUserIdByToken(token);
    
    if (!userId) {
        return res.status(401).json({ message: 'Не авторизован' });
    }

    res.status(200).json({ userId }); // Возвращаем userId
});

module.exports = authRouter;

