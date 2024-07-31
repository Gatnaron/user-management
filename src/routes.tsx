import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';

const AppRoutes: React.FC = () => (
    <Router>
        <Routes>
            <Route path="/user-form/:id?" element={<UserForm />} />
            <Route path="/" element={<UserList />} />
        </Routes>
    </Router>
);

export default AppRoutes;
