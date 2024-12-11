import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Typography, Box, Link } from '@mui/material';
import { API } from '../services/api';

const LoginForm = () => {
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const validationSchema = Yup.object().shape({
        login: Yup.string().required('Логин обязателен').min(2).max(15),
        password: Yup.string().required('Пароль обязателен'),
    });

    const handleSubmit = async (values) => {
        console.log('Form submitted:', values);
        const { login, password } = values;
        try {
            const response = await API.auth.login({ login, password });
            setMessage('Успешный вход');
            setMessageType('success');
            console.log('API response:', response);
            const userType = response.userType; 
        

            if (userType === '1') {
                window.location.href = '/home';
            } else if (userType === '2') {
                window.location.href = '/admin';
            } else {
                throw new Error('Не удалось определить тип пользователя');
            }
        } catch (error) {
            console.error(error);
            setMessage(error.message);
            setMessageType('error');
        }
    };
    
    

    return (
        <Box>
            <Typography variant="h5">Вход</Typography>
            <Formik
                initialValues={{ login: '', password: '' }}
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
                        <Button type="submit">Войти</Button>
                        {message && (
                            <Typography color={messageType === 'error' ? 'red' : 'green'}>
                                {message}
                            </Typography>
                        )}
                        <Typography variant="body2" style={{ marginTop: '16px' }}>
                            Нет аккаунта?{' '}
                            <Link href="/register" underline="hover">
                                Зарегистрироваться
                            </Link>
                        </Typography>
                    </Form>
                )}
            </Formik>
        </Box>
    );
};

export default LoginForm;