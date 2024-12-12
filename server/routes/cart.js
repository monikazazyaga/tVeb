const express = require('express');
const { createCart, getCartByUserId, addCartItem, getCartItems, clearCart } = require('../db/cart');

const cartRouter = express.Router();

cartRouter.post('/', async (req, res) => {
    const { userId } = req.body;
    console.log('Получен запрос на создание корзины для userId:', userId);
    try {
        if (!userId) {
            return res.status(400).json({ message: 'Пользователь не указан' });
        }

        
        const existingCart = await getCartByUserId(userId);
        if (existingCart) {
            console.log('Корзина уже существует для userId:', userId);
            return  res.status(200).json(existingCart);
           
        }

        const newCart = await createCart(userId); 
        console.log('Создана новая корзина с ID:', newCart.id);
        res.status(201).json(newCart);
    } catch (error) {
        console.error('Ошибка при создании корзины:', error.message);
        res.status(500).json({ message: 'Неизвестная ошибка' });
    }
});

// Добавить товар в корзину
cartRouter.post('/items', async (req, res) => {
    const { cartId, productId, quantity } = req.body;

    if (!cartId || !productId || typeof quantity !== 'number') {
        return res.status(400).json({ message: 'Все поля обязательны' });
    }

    try {
        await addCartItem(cartId, productId, quantity);
        res.status(204).send(); // Успех без контента
    } catch (error) {
        console.error('Ошибка добавления товара в корзину:', error);
        res.status(500).json({ message: 'Ошибка при добавлении товара в корзину' });
    }
});

// Получить товары в корзине
cartRouter.get('/:cartId/items', async (req, res) => {
    const cartId = req.params.cartId;
    if (!cartId) {
        return res.status(400).json({ message: 'Cart ID is required' });
    }

    try {
        const items = await getCartItems(cartId);
        res.status(200).json(items);
    } catch (error) {
        console.error('Ошибка получения товаров в корзине:', error);
        res.status(500).json({ message: 'Ошибка при получении товаров из корзины' });
    }
});

// Очистить корзину
cartRouter.delete('/:cartId', async (req, res) => {
    const cartId = req.params.cartId;

    if (!cartId) {
        return res.status(400).json({ message: 'Cart ID is required' });
    }

    try {
        await clearCart(cartId);
        res.status(204).send();
    } catch (error) {
        console.error('Ошибка очистки корзины:', error);
        res.status(500).json({ message: 'Ошибка при очистке корзины' });
    }
});

module.exports = cartRouter;


