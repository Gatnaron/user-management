import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import useUserStore from './store/userStore';
import { User } from './models/User';

const App: React.FC = () => {
    const { users, addUser, updateUser, deleteUser } = useUserStore();

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            useUserStore.setState({ users: JSON.parse(storedUsers) });
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route
                    path="/user-form"
                    element={<UserForm/>}
                />
                <Route
                    path="/user-form/:id"
                    element={<UserForm/>}
                />
            </Routes>
        </Router>
    );
};

export default App;
