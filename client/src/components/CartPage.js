import React, { useEffect, useState } from 'react';
import { API } from '../services/api';
import {
    Button,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            const cartId = localStorage.getItem('cartId'); 
            if (!cartId) {
                console.error('Корзина не найдена');
                setIsLoading(false);
                return;
            }

            try {
                const response = await API.cart.getCartItems(cartId);
                setCartItems(response);
                setIsLoading(false);
            } catch (error) {
                console.error('Ошибка при загрузке товаров из корзины:', error);
                setIsLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    // Функция для оформления заказа
    const handleOrder = async () => {
        const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const cartId = localStorage.getItem('cartId'); // Получите cartId правильно
        const userId = 1; // Вам здесь нужно использовать реальный ID пользователя

        try {
            await API.orders.createOrder(userId, total); // Создаем новый заказ
            await API.cart.clearCart(cartId); // Очищаем корзину с правильным cartId
            setCartItems([]); // Очистите локально
            setOpenSnackbar(true); // Показываем уведомление об успешном заказе
        } catch (error) {
            console.error('Ошибка при оформлении заказа:', error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleBackToProducts = () => {
        navigate('/home'); // Переход обратно на страницу товаров
    };

    if (isLoading) {
        return <div>Загрузка...</div>;
    }

    return (
        <Box>
            <Typography variant="h4">Корзина</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Название</TableCell>
                            <TableCell>Цена</TableCell>
                            <TableCell>Количество</TableCell>
                            <TableCell>Итого</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cartItems.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">Ваша корзина пуста.</TableCell>
                            </TableRow>
                        ) : (
                            cartItems.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price} ₽</TableCell>
                                    <TableCell>{item.quantity}</TableCell>
                                    <TableCell>{item.price * item.quantity} ₽</TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mt={2}>
                <Button variant="contained" onClick={handleBackToProducts}>Назад к товарам</Button>
                {cartItems.length > 0 && (
                    <Button variant="contained" onClick={handleOrder} style={{ marginLeft: '10px' }}>
                        Заказать
                    </Button>
                )}
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Заказ успешно оформлен!
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default CartPage;

