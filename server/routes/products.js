const express = require('express');
const {  addProduct, getAllProducts, deleteProduct, getProductById, updateProduct} = require('../db/products');

const productsRouter = express.Router();

productsRouter.get('/', async (req, res) => {
    const products = await getAllProducts();
    console.log('Полученные продукты:', products);
    res.status(200).json(products);
});

productsRouter.post('/', async (req, res) => {
    const newProduct = await addProduct(req.body.name, req.body.description, req.body.price, req.body.categoryId, req.body.stock);
    res.status(201).json(newProduct);
});

productsRouter.delete('/:id', async (req, res) => {
    await deleteProduct(req.params.id);
    res.status(204).send();
});

productsRouter.get('/:id', async (req, res) => {
    const product = await getProductById(req.params.id);
    if (product) {
        res.status(200).json(product);
    } else {
        res.status(404).json({ message: 'Товар не найден' }); // Обрабатываем случай, если товар не найден
    }
});

productsRouter.put('/:id', async (req, res) => {
    const { name, description, price, categoryId, stock } = req.body;
    const updatedProduct = await updateProduct(req.params.id, name, description, price, categoryId, stock);
    res.status(200).json(updatedProduct);
});

module.exports = productsRouter;
