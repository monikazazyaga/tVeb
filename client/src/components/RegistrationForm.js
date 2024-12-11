import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box } from '@mui/material';
import { API } from '../services/api';

const RegistrationForm = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const validationSchema = Yup.object().shape({
        login: Yup.string().required('Логин обязателен').min(2).max(15),
        password: Yup.string().required('Пароль обязателен'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Пароли должны совпадать').required('Пароль обязателен'),
    });

    const handleSubmit = async (values) => {
        const { login, password } = values;
        try {
            await API.user.register({ login, password });
            setMessage('Успех! Пожалуйста, войдите в свой аккаунт.');
            setMessageType('success');
        } catch (error) {
            console.error('Ошибка:', error);
            setMessage(error.message);
            setMessageType('error');
        }
    };

    return (
        <Box>
            <Typography variant="h5">Регистрация</Typography>
            <Formik
                initialValues={{ login: '', password: '', confirmPassword: '' }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ handleBlur }) => (
                    <Form>
                        <Field name="login">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Логин"
                                    variant="outlined"
                                    fullWidth
                                    error={!!(field.touched && field.error)}
                                    helperText={<ErrorMessage name="login" />}
                                    onBlur={handleBlur}
                                />
                            )}
                        </Field>
                        <Field name="password">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Пароль"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    error={!!(field.touched && field.error)}
                                    helperText={<ErrorMessage name="password" />}
                                    onBlur={handleBlur}
                                />
                            )}
                        </Field>
                        <Field name="confirmPassword">
                            {({ field }) => (
                                <TextField
                                    {...field}
                                    label="Повторите пароль"
                                    type="password"
                                    variant="outlined"
                                    fullWidth
                                    error={!!(field.touched && field.error)}
                                    helperText={<ErrorMessage name="confirmPassword" />}
                                    onBlur={handleBlur}
                                />
                            )}
                        </Field>
                        <Button type="submit">Зарегистрироваться</Button>
                        {message && <Typography color={messageType === 'error' ? 'red' : 'green'}>{message}</Typography>}
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default RegistrationForm;
