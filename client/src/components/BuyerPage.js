import React, { useEffect, useState } from 'react';
import { API } from '../services/api';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const BuyerPage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await API.products.getAllProducts();
                setProducts(products);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };
        fetchProducts();
    }, []);
    

    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const placeOrder = async () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        // Замените на id пользователя
        await API.orders.createOrder(1, total);
        setCart([]);
        alert('Заказ успешно размещен!');
    };

    return (
        <Box>
            <Typography variant="h4">Товары</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Цена</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>{product.name}</TableCell>
                                <TableCell>{product.price}</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => addToCart(product)}>+</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" onClick={placeOrder}>Заказать</Button>
        </Box>
    );
};

export default BuyerPage;
