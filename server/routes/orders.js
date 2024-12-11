const express = require('express');
const { addOrder, getAllOrders, deleteOrder } = require('../db/orders');

const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
    const orders = await getAllOrders();
    res.status(200).json(orders);
});

ordersRouter.post('/', async (req, res) => {
    const newOrder = await addOrder(req.body.userId, req.body.total);
    res.status(201).json(newOrder);
});

ordersRouter.delete('/:id', async (req, res) => {
    await deleteOrder(req.params.id);
    res.status(204).send();
});

module.exports = ordersRouter;

