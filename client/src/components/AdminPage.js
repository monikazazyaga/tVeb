import React, { useEffect, useState } from 'react';
import { API } from '../services/api';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const AdminPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const products = await API.products.getAllProducts();
            setProducts(products);
        };
        fetchProducts();
    }, []);

    const deleteProduct = async (id) => {
        await API.products.deleteProduct(id);
        setProducts(products.filter(product => product.id !== id));
    };

    return (
        <Box>
            <Typography variant="h4">Управление товарами</Typography>
            <Button variant="contained" onClick={() => window.location.href = '/add-product'}>Добавить товар</Button>
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
                                    <Button variant="contained" onClick={() => deleteProduct(product.id)}>Удалить</Button>
                                    <Button variant="contained" onClick={() => window.location.href = `/edit-product/${product.id}`}>Редактировать</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminPage;
