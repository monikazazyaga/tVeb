const express = require('express');
const OrderItemsrouter = express.Router();
const OrderItems = require('../db/order_items');
const db = require('../db/db');

const orderItems = new OrderItems(db);

// Получение всех деталей заказов
OrderItemsrouter.get('/', async (req, res) => {
    try {
        const result = await orderItems.getAllOrderItems();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order items' });
    }
});

// Создание новой детали заказа
OrderItemsrouter.post('/', async (req, res) => {
    try {
        const { orderId, productId, quantity, price } = req.body;
        await orderItems.createOrderItem(orderId, productId, quantity, price);
        res.status(201).send('Order item created');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create order item' });
    }
});

// Получение деталей заказа по ID заказа
OrderItemsrouter.get('/order/:orderId', async (req, res) => {
    try {
        const { orderId } = req.params;
        const result = await orderItems.getOrderItemsByOrder(orderId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order items by order' });
    }
});

// Удаление детали заказа
OrderItemsrouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await orderItems.deleteOrderItem(id);
        res.status(200).send('Order item deleted');
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order item' });
    }
});

module.exports = OrderItemsrouter;
