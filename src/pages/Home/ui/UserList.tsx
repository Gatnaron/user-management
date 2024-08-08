import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { User } from '../../../entities/User/model/types/User';
import UserCard from '../../../entities/User/ui/UserCard/UserCard';
import Loader from '../../../shared/ui/Loader/Loader';
import Header from '../../../shared/ui/Header/Header';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../entities/User/model/store/userStore';
import { generateFakeUsers } from '../../../shared/lib/fakeData';
import './UserList.scss';

const { Content } = Layout;

const UserList: React.FC = () => {
    const { users: storedUsers } = useUserStore();
    const [users, setUsers] = useState<User[]>([]);
    const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Load stored users and combine with fake users
        const fakeUsers = generateFakeUsers(10);
        const combinedUsers = [...storedUsers, ...fakeUsers];
        setUsers(combinedUsers);
        setFilteredUsers(combinedUsers);
        setLoading(false);
    }, [storedUsers]);

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
                            onClick={() => navigate(`/user-form/${user.id}`)}
                        />
                    ))}
                </div>
            </Content>
        </Layout>
    );
};

export default UserList;
