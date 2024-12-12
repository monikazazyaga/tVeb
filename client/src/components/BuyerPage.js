import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { API } from '../services/api';
import { useUser } from '../services/UserContext'; 

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

const BuyerPage = () => {
    const { user } = useUser(); 
    const [products, setProducts] = useState([]);
    const [cartId, setCartId] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [openErrorSnackbar, setOpenErrorSnackbar] = useState(false);
    const [confirmationLogout, setConfirmationLogout] = useState(false);
    const [orders, setOrders] = useState([]);
  
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await API.products.getAllProducts();
                setProducts(fetchedProducts);
            } catch (error) {
                console.error('Ошибка при получении продуктов:', error);
            }
        };

        const fetchCart = async () => {
            if (!user || !user.userId) {
                console.error('Пользователь не найден. Корзина не может быть создана.');
                return; 
            }
        
            try {
                const newCart = await API.cart.createCart(user.userId);
                setCartId(newCart.id);
                localStorage.setItem('cartId', newCart.id);
            } catch (error) {
                console.error('Ошибка при создании корзины:', error);
                setOpenErrorSnackbar(true);
            }
        };
        
        fetchProducts();
        fetchCart();
    }, [user]); 

    const handleAddToCart = async (product) => {
        if (!cartId) {
            console.error('Корзина не создана');
            return;
        }

        try {
            await API.cart.addCartItem(cartId, product.id, 1);
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Ошибка при добавлении товара в корзину:', error);
            setOpenErrorSnackbar(true);
        }
    };

   
const fetchOrders = async () => {
    if (!user || !user.userId) return; 
    
    const ordersResponse = await API.orders.getAllOrders(user.userId);
    
    const ordersWithItems = await Promise.all(ordersResponse.map(async (order) => {
       
        const itemsResponse = await API.orders.getOrderItemsByOrderId(order.id);
        return { ...order, items: itemsResponse };
    }));

    setOrders(ordersWithItems);
};


    // Обработчик для выхода
    const handleLogout = () => {
        setConfirmationLogout(true);
    };

    const confirmLogout = async () => {
        await API.auth.logout(); // вызываем метод выхода
        localStorage.removeItem('userId'); // убираем userId из localStorage
        navigate('/'); // перенаправляем на главную страницу
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
        setOpenErrorSnackbar(false);
    };

    return (
        <Box>
            <Typography variant="h4">Товары</Typography>
            <Button variant="contained" onClick={handleLogout}>Выход</Button>
            <Button variant="contained" onClick={fetchOrders}>Мои заказы</Button>
            <Button variant="contained" onClick={() => navigate('/cart')}>Корзина</Button>

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
                                <TableCell>{product.price} ₽</TableCell>
                                <TableCell>
                                    <Button variant="contained" onClick={() => handleAddToCart(product)}>+</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Товар добавлен в корзину!
                </Alert>
            </Snackbar>

            <Snackbar open={openErrorSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="error">
                    Ошибка при добавлении товара в корзину!
                </Alert>
            </Snackbar>

            <Dialog open={confirmationLogout} onClose={() => setConfirmationLogout(false)}>
                <DialogTitle>Выход</DialogTitle>
                <DialogContent>
                    <Typography>Вы уверены, что хотите выйти?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmationLogout(false)} color="primary">Отмена</Button>
                    <Button onClick={confirmLogout} color="secondary">Выйти</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={orders.length > 0} onClose={() => setOrders([])}>
                <DialogTitle>Мои заказы</DialogTitle>
                <DialogContent>
                    {orders.map(order => (
                        <div key={order.id}>
                            <Typography variant="h6">Номер заказа: {order.id}</Typography>
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>ID товара</TableCell>
                                            <TableCell>Количество</TableCell>
                                            <TableCell>Цена</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {order.items.map(item => (
                                            <TableRow key={item.productId}>
                                                <TableCell>{item.productId}</TableCell>
                                                <TableCell>{item.quantity}</TableCell>
                                                <TableCell>{item.price} ₽</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    ))}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOrders([])}>Закрыть</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default BuyerPage;

