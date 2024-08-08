import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { User } from '../../../entities/User/model/types/User';
import UserCard from '../../../entities/User/ui/UserCard/UserCard';
import Loader from '../../../shared/ui/Loader/Loader';
import Header from '../../../shared/ui/Header/Header';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../../entities/User/model/store/userStore';
import './UserList.scss';

const { Content } = Layout;

const UserList: React.FC = () => {
    const { users } = useUserStore();
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

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
                            onClick={() => navigate(`/user-form/${user.id}`)}
                        />
                    ))}
                </div>
            </Content>
        </Layout>
    );
};

export default UserList;
