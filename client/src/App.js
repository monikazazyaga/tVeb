import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import BuyerPage from './components/BuyerPage';
import AdminPage from './components/AdminPage';
import AddProductForm from './components/AddProductForm';

const App = () => {
    return (
        <div>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/home" element={<BuyerPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/add-product" element={<AddProductForm />} />
            </Routes>
        </div>
    );
};

export default App;





