const express = require('express');
const { addProduct, getAllProducts, deleteProduct } = require('../db/products');

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

module.exports = productsRouter;
