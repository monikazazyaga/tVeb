const express = require('express');
const { addOrderItem, getAllOrderItems, deleteOrderItem } = require('../db/order_items');

const orderItemsRouter = express.Router();

orderItemsRouter.get('/', async (req, res) => {
    const items = await getAllOrderItems();
    res.status(200).json(items);
});

orderItemsRouter.post('/', async (req, res) => {
    const newItem = await addOrderItem(req.body.orderId, req.body.productId, req.body.quantity, req.body.price);
    res.status(201).json(newItem);
});

orderItemsRouter.delete('/:id', async (req, res) => {
    await deleteOrderItem(req.params.id);
    res.status(204).send();
});

module.exports = orderItemsRouter;
