import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from '../pages/Home/ui/UserList';
import UserForm from '../features/UserForm/ui/UserForm';
import useUserStore from '../entities/User/model/store/userStore';


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
