import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { UserProvider } from './services/UserContext';

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2',
        },
    },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
        <UserProvider>
            <App />
            </UserProvider>
        </BrowserRouter>
    </ThemeProvider>
);
