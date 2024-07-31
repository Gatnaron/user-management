import React from 'react';
import { Card } from 'antd';
import { User } from '../models/User';

interface UserCardProps {
    user: User;
    onClick: (id: string) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
    return (
        <Card onClick={() => onClick(user.id)} style={{ marginBottom: '16px' }}>
            <p>Username: {user.username}</p>
            <p>First Name: {user.firstName}</p>
            <p>Last Name: {user.lastName}</p>
        </Card>
    );
};

export default UserCard;
