import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { User } from '../models/User';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import './UserList.css';

const { Content } = Layout;

interface UserListProps {
    users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate(); // Добавляем хук useNavigate

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
            setFilteredUsers(users);
        }, 1000);
    }, [users]);

    const handleSearch = (value: string) => {
        const filtered = users.filter(user =>
            user.username.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredUsers(filtered);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Layout className="user-list-layout">
            <Header onSearch={handleSearch} />
            <Content className="user-list-content">
                <div className="user-grid">
                    {filteredUsers.map(user => (
                        <UserCard
                            key={user.id}
                            user={user}
                            onClick={() => navigate(`/user-form/${user.id}`)} // Используем navigate для навигации
                        />
                    ))}
                </div>
            </Content>
        </Layout>
    );
};

export default UserList;
