const express = require('express');
const { addOrderItem, getAllOrderItems, getOrderItems, deleteOrderItem } = require('../db/order_items');

const orderItemsRouter = express.Router();

orderItemsRouter.get('/', async (req, res) => {
    const items = await getAllOrderItems();
    res.status(200).json(items);
});

orderItemsRouter.post('/', async (req, res) => {
    const { orderId, productId, quantity, price } = req.body;
    try {
        const newItem = await addOrderItem(orderId, productId, quantity, price);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: 'Ошибка при добавлении товара в заказ', error });
    }
});


orderItemsRouter.delete('/:id', async (req, res) => {
    await deleteOrderItem(req.params.id);
    res.status(204).send();
});
orderItemsRouter.get('/:orderId', async (req, res) => {
    const orderId = req.params.orderId;
    const items = await getOrderItems(orderId);
    res.status(200).json(items);
});

module.exports = orderItemsRouter;
