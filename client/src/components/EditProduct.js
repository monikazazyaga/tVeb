import React, { useEffect, useState } from 'react';
import { API } from '../services/api';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, TextField, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const EditProduct = () => {
    const { id } = useParams();
    const idNumber = parseInt(id, 10);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false); // Состояние для Snackbar

    const navigate = useNavigate(); // Хук для навигации

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const fetchedProduct = await API.products.getProductById(idNumber);
                setProduct(fetchedProduct);
                setLoading(false);
            } catch (error) {
                setError("Ошибка при загрузке товара.");
                setLoading(false);
            }
        };
        fetchProduct();
    }, [idNumber]);

    const handleSave = async () => {
        try {
            await API.products.updateProduct(idNumber, product); // Обновляем продукт
            setOpenSnackbar(true); // Показать Snackbar
        } catch (error) {
            setError("Ошибка при сохранении товара.");
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Товар не найден.</div>;

    return (
        <div>
            <h1>Редактировать товар</h1>
            <TextField label="Название" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
            <TextField label="Цена" type="number" value={product.price} onChange={(e) => setProduct({ ...product, price: Number(e.target.value) })} />
            <Button onClick={handleSave}>Сохранить</Button>
            <Button onClick={() => navigate('/admin')} style={{ marginLeft: '10px' }}>К товарам</Button> {/* Кнопка для перехода к товарам */}
            
            {/* Snackbar для уведомления */}
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Изменения сохранены!
                </Alert>
            </Snackbar>
        </div>
    );
};

export default EditProduct;

