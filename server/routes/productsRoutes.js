const express = require('express');
const Productrouter = express.Router();
const Products = require('../db/products');
const db = require('../db/db');

const products = new Products(db);

// Получение всех продуктов
Productrouter.get('/', async (req, res) => {
    try {
        const result = await products.getAllProducts();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// Создание нового продукта
Productrouter.post('/', async (req, res) => {
    try {
        const { name, description, price, categoryId, stock } = req.body;
        await products.createProduct(name, description, price, categoryId, stock);
        res.status(201).send('Product created');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// Получение продуктов по категории
Productrouter.get('/category/:categoryId', async (req, res) => {
    try {
        const { categoryId } = req.params;
        const result = await products.getProductsByCategory(categoryId);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products by category' });
    }
});

// Обновление продукта
Productrouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, stock } = req.body;
        await products.updateProduct(id, name, price, stock);
        res.status(200).send('Product updated');
    } catch (error) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// Удаление продукта
Productrouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await products.deleteProduct(id);
        res.status(200).send('Product deleted');
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = Productrouter;
