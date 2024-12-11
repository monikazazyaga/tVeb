import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';
import { API } from '../services/api';

const AddProductForm = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Название обязательно'),
        price: Yup.number().required('Цена обязательна').min(0, 'Цена должна быть положительной'),
    });

    const handleSubmit = async (values) => {
        try {
            await API.products.createProduct(values);
            setMessage('Товар добавлен успешно');
            setMessageType('success');
            window.location.href = '/admin'; // Перенаправление на страницу администратора
        } catch (error) {
            setMessage(error.message);
            setMessageType('error');
        }
    };

    return (
        <Box>
            <Typography variant="h5">Добавить товар</Typography>
            <Formik
                initialValues={{ name: '', description: '', price: 0 }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleBlur }) => (
                    <Form>
                        <Field name="name">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Название"
                                    variant="outlined"
                                    fullWidth
                                    error={!!(field.touched && field.error)}
                                    helperText={<ErrorMessage name="name" />}
                                    onBlur={handleBlur}
                                />
                            )}
                        </Field>
                        <Field name="description">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Описание"
                                    variant="outlined"
                                    fullWidth
                                    onBlur={handleBlur}
                                />
                            )}
                        </Field>
                        <Field name="price">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Цена"
                                    type="number"
                                    variant="outlined"
                                    fullWidth
                                    error={!!(field.touched && field.error)}
                                    helperText={<ErrorMessage name="price" />}
                                    onBlur={handleBlur}
                                />
                            )}
                        </Field>
                        <Button type="submit">Добавить</Button>
                        {message && <Typography color={messageType === 'error' ? 'red' : 'green'}>{message}</Typography>}
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default AddProductForm;
