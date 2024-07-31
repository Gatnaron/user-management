import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card } from 'antd';
import { User } from '../models/User';
import UserCard from '../components/UserCard';
import Loader from '../components/Loader';

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Имитируем загрузку данных
        setTimeout(() => {
            setLoading(false);
            // Пример данных для пользователей
            setUsers([
                { id: '1', username: 'user1', firstName: 'John', lastName: 'Doe', password: '', roles: ['DEVELOPER'], workBorders: [{ id: '1', name: 'Белгатой' }] },
                { id: '2', username: 'user2', firstName: 'Jane', lastName: 'Smith', password: '', roles: ['ANT_MANAGER'], workBorders: [{ id: '2', name: 'Шали' }] }
            ]);
        }, 1000);
    }, []);

    const addUser = () => {
        navigate('/user-form');
    };

    const editUser = (id: string) => {
        navigate(`/user-form/${id}`);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh' }}>
            <Card style={{ width: '60%', textAlign: 'center' }}>
                <Button type="primary" onClick={addUser} style={{ marginBottom: '16px' }}>Добавить нового пользователя</Button>
                <div>
                    {users.map(user => (
                        <UserCard key={user.id} user={user} onClick={() => editUser(user.id)} />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default UserList;
