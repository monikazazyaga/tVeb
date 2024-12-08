const express = require('express');
const Orderrouter = express.Router();
const Orders = require('../db/orders');
const db = require('../db/db');

const orders = new Orders(db);

// Получение всех заказов
Orderrouter.get('/', async (req, res) => {
    try {
        const result = await orders.getAllOrders();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// Создание нового заказа
Orderrouter.post('/', async (req, res) => {
    try {
        const { userId, total } = req.body;
        await orders.createOrder(userId, total);
        res.status(201).send('Order created');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order' });
    }
});

// Получение заказов по пользователю
Orderrouter.get('/user/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const result = await orders.getOrdersByUser(userId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders by user' });
    }
});

// Удаление заказа
Orderrouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await orders.deleteOrder(id);
        res.status(200).send('Order deleted');
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

module.exports = Orderrouter;
