const express = require('express');
const { createOrder, getAllOrders, deleteOrder, getOrderItemsByOrderId } = require('../db/orders');
const { getCartItems, getCartByUserId } = require('../db/cart');
const { addOrderItem } = require('../db/order_items');
const ordersRouter = express.Router();

ordersRouter.get('/', async (req, res) => {
    const userId = req.query.userId; 
    const orders = await getAllOrders(userId);
    res.status(200).json(orders);
});

ordersRouter.get('/:id/items', async (req, res) => {
    const orderId = req.params.id;
    const orderItems = await getOrderItemsByOrderId(orderId);
    res.status(200).json(orderItems);
});
ordersRouter.post('/', async (req, res) => {
    const newOrder = await createOrder(req.body.userId, req.body.total);
    res.status(201).json(newOrder);
});



ordersRouter.delete('/:id', async (req, res) => {
    await deleteOrder(req.params.id);
    res.status(204).send();
});

module.exports = ordersRouter;

