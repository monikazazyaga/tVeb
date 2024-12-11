const express = require('express');
const md5 = require('md5');
const { getUserByLogin, addUser } = require('../db/users');
const { addToken, deleteByToken } = require('../db/tokens');

const authRouter = express.Router();
const COOKIE_NAME = "token";

authRouter.post('/login', async (req, res) => {
    const user = await getUserByLogin(req.body.login);
    if (!user || user.password !== md5(req.body.password)) {
        return res.status(400).json({ message: 'Неправильный логин или пароль' });
    }
    const token = await addToken(user.id);
    res.cookie(COOKIE_NAME, token, { httpOnly: true });
    res.status(200).json({ ok: true });
});

authRouter.delete('/logout', async (req, res) => {
    const token = req.cookies[COOKIE_NAME];
    await deleteByToken(token);
    res.clearCookie(COOKIE_NAME);
    res.status(200).json({ ok: true });
});

module.exports = authRouter;
