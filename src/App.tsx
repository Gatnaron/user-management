import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import { User } from './models/User';

const App: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        const storedUsers = localStorage.getItem('users');
        if (storedUsers) {
            setUsers(JSON.parse(storedUsers));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const addUser = (user: User) => {
        setUsers([...users, user]);
    };

    const updateUser = (updatedUser: User) => {
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
    };

    const deleteUser = (userId: string) => {
        setUsers(users.filter(user => user.id !== userId));
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList users={users} />} />
                <Route
                    path="/user-form"
                    element={<UserForm users={users} addUser={addUser} updateUser={updateUser} />}
                />
                <Route
                    path="/user-form/:id"
                    element={<UserForm users={users} updateUser={updateUser} deleteUser={deleteUser} />}
                />
            </Routes>
        </Router>
    );
};

export default App;
