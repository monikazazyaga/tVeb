const express = require('express');
const md5 = require('md5');
const { getUserByLogin, addUser } = require('../db/users');
const { addToken, deleteByToken } = require('../db/tokens');

const authRouter = express.Router();
const COOKIE_NAME = "token";

authRouter.post('/login', async (req, res) => {
    const { login, password } = req.body;
    console.log('Login attempt:', { login, password }); // Логируем входные данные

    const user = await getUserByLogin(login);
    console.log('User found:', user); // Логируем информацию о пользователе

    if (!user) {
        console.log('User not found'); // Логируем, если пользователь не найден
        return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }

    const hashedPassword = md5(password);
    console.log('Hashed password:', hashedPassword); // Логируем хеш пароля
    console.log('Stored password:', user.password); // Логируем сохраненный хеш пароля

    if (user.password !== hashedPassword) {
        console.log('Password mismatch'); // Логируем несоответствие паролей
        return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }

    const token = await addToken(user.id);
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(200).json({ ok: true, userType: user.type });
});


authRouter.delete('/logout', async (req, res) => {
    const token = req.cookies[COOKIE_NAME];
    await deleteByToken(token);
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ ok: true });
});

module.exports = authRouter;
