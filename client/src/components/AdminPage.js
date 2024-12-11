import React, { useEffect, useState } from 'react';
import { API } from '../services/api';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false); // Состояние для диалогового окна
    const [productIdToDelete, setProductIdToDelete] = useState(null); // ID продукта для удаления

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await API.products.getAllProducts();
                setProducts(products);
            } catch (error) {
                console.error("Ошибка при получении продуктов:", error);
            }
        };
        fetchProducts();
    }, []);

    const handleDeleteClick = (id) => {
        setProductIdToDelete(id);
        setOpen(true); // Открытие диалогового окна
    };

    const deleteProduct = async () => {
        if (productIdToDelete) {
            try {
                await API.products.deleteProduct(productIdToDelete);
                setProducts(products.filter(product => product.id !== productIdToDelete));
                handleClose(); // Закрытие диалогового окна
            } catch (error) {
                console.error('Ошибка при удалении продукта:', error);
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
        setProductIdToDelete(null);
    };

    const handleLogout = async () => {
        try {
            await API.auth.logout();
            window.location.href = '/'; // Переход на главную страницу после выхода
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    return (
        <Box>
            <Typography variant="h4">Управление товарами</Typography>
            <Button variant="contained" onClick={() => window.location.href = '/add-product'}>Добавить товар</Button>
            <Button variant="contained" onClick={() => handleLogout()} style={{ marginLeft: '16px' }}>Выход</Button>
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
                                    <Button variant="contained" onClick={() => handleDeleteClick(product.id)}>Удалить</Button>
                                    <Button variant="contained" onClick={() => window.location.href = `/edit-product/${product.id}`}>Редактировать</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Диалоговое окно для подтверждения удаления */}
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    <Typography>Вы уверены, что хотите удалить этот товар?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={deleteProduct} color="secondary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminPage;

