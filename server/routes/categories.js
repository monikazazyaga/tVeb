const express = require('express');
const { addCategory, getAllCategories, updateCategory, deleteCategory } = require('../db/categories');

const categoriesRouter = express.Router();

categoriesRouter.get('/', async (req, res) => {
    const categories = await getAllCategories();
    res.status(200).json(categories);
});

categoriesRouter.post('/', async (req, res) => {
    const newCategory = await addCategory(req.body.name);
    res.status(201).json(newCategory);
});

categoriesRouter.put('/:id', async (req, res) => {
    await updateCategory(req.params.id, req.body.name);
    res.status(204).send();
});

categoriesRouter.delete('/:id', async (req, res) => {
    await deleteCategory(req.params.id);
    res.status(204).send();
});

module.exports = categoriesRouter;

