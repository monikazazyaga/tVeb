const express = require('express');
const Categoriesrouter = express.Router();
const Categories = require('../db/categories');
const db = require('../db/db');

const categories = new Categories(db);

// Получение всех категорий
Categoriesrouter.get('/', async (req, res) => {
    try {
        const result = await categories.getAllCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
});

// Создание новой категории
Categoriesrouter.post('/', async (req, res) => {
    try {
        const { name } = req.body;
        await categories.createCategory(name);
        res.status(201).send('Category created');
    } catch (error) {
        res.status(500).json({ error: 'Failed to create category' });
    }
});

// Обновление категории
Categoriesrouter.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await categories.updateCategory(id, name);
        res.status(200).send('Category updated');
    } catch (error) {
        res.status(500).json({ error: 'Failed to update category' });
    }
});

// Удаление категории
Categoriesrouter.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await categories.deleteCategory(id);
        res.status(200).send('Category deleted');
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
});

module.exports = Categoriesrouter;
