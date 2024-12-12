import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import BuyerPage from './components/BuyerPage';
import AdminPage from './components/AdminPage';
import AddProductForm from './components/AddProductForm';
import EditProduct from './components/EditProduct';
import CartPage from './components/CartPage';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/home" element={<BuyerPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/add-product" element={<AddProductForm />} />
                <Route path="/edit-product/:id" element={<EditProduct/>} />
            </Routes>
        </div>
    );
};

export default App;





