import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UserList from './pages/UserList';
import UserForm from './pages/UserForm';
import { User } from './models/User';

interface RoutersProps {
    users: User[];
    setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Routers: React.FC<RoutersProps> = ({ users, setUsers }) => {
    const UserListWrapper = (props: any) => <UserList {...props} users={users} setUsers={setUsers} />;
    const UserFormWrapper = (props: any) => <UserForm {...props} users={users} setUsers={setUsers} />;

    return (
        <Routes>
            <Route path="/" element={<UserListWrapper />} />
            <Route path="/user-form/:id?" element={<UserFormWrapper />} />
        </Routes>
    );
};

export default Routers;
