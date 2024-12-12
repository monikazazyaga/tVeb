import React, { useEffect, useState } from 'react';
import { API } from '../services/api';
import { Button, Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AdminPage = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]); // Для хранения категорий
    const [selectedCategory, setSelectedCategory] = useState(''); // Для отслеживания выбранной категории
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // Открытие диалога удаления
    const [openLogoutDialog, setOpenLogoutDialog] = useState(false); // Открытие диалога выхода
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

        const fetchCategories = async () => {
            try {
                const categories = await API.categories.getAllCategories(); // Запрос категорий
                setCategories(categories);
            } catch (error) {
                console.error("Ошибка при получении категорий:", error);
            }
        };

        fetchProducts();
        fetchCategories();
    }, []);

    // Фильтрация продуктов по выбранной категории
    const filteredProducts = selectedCategory
        ? products.filter(product => product.categoryId === Number(selectedCategory))
        : products;

    const handleDeleteClick = (id) => {
        setProductIdToDelete(id);
        setOpenDeleteDialog(true);
    };

    const deleteProduct = async () => {
        if (productIdToDelete) {
            try {
                await API.products.deleteProduct(productIdToDelete);
                setProducts(products.filter(product => product.id !== productIdToDelete));
                handleCloseDeleteDialog();
            } catch (error) {
                console.error('Ошибка при удалении продукта:', error);
            }
        }
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setProductIdToDelete(null);
    };

    const handleLogout = async () => {
        try {
            await API.auth.logout();
            window.location.href = '/'; 
        } catch (error) {
            console.error('Ошибка при выходе:', error);
        }
    };

    const handleOpenLogoutDialog = () => setOpenLogoutDialog(true);
    const handleCloseLogoutDialog = () => setOpenLogoutDialog(false);

    return (
        <Box>
            <Typography variant="h4">Управление товарами</Typography>
            <Button variant="contained" onClick={() => window.location.href = '/add-product'}>Добавить товар</Button>
            <Button variant="contained" onClick={handleOpenLogoutDialog} style={{ marginLeft: '16px' }}>Выход</Button>

            {/* Выпадающий список для выбора категории */}
            <FormControl variant="outlined" style={{ marginTop: '1px', width: '200px', marginLeft: '20px'}}>
                <InputLabel>Категория</InputLabel>
                <Select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    label="Категория"
                >
                    <MenuItem value="">
                        <em>Все категории</em>
                    </MenuItem>
                    {categories.map((category) => (
                        <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TableContainer component={Paper} style={{ marginTop: '16px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Цена</TableCell>
                            <TableCell>Действия</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts.map((product) => (
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
            <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Подтверждение удаления</DialogTitle>
                <DialogContent>
                    <Typography>Вы уверены, что хотите удалить этот товар?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={deleteProduct} color="secondary">
                        Удалить
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Диалоговое окно для подтверждения выхода */}
            <Dialog open={openLogoutDialog} onClose={handleCloseLogoutDialog}>
                <DialogTitle>Выход</DialogTitle>
                <DialogContent>
                    <Typography>Вы уверены, что хотите выйти?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseLogoutDialog} color="primary">
                        Отмена
                    </Button>
                    <Button onClick={handleLogout} color="secondary">
                        Выйти
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminPage;

