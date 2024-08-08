import React from 'react';
import { Card, Tag } from 'antd';
import { User } from '../../model/types/User';
import './UserCard.scss';

interface UserCardProps {
    user: User;
    onClick: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onClick }) => {
    return (
        <Card hoverable onClick={onClick} className="user-card">
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>First Name:</strong> {user.firstName}</p>
            <p><strong>Last Name:</strong> {user.lastName}</p>
            <p><strong>Roles:</strong> {user.roles.map(role => <Tag key={role} className="user-tag">{role}</Tag>)}</p>
            <p><strong>Work Borders:</strong> {user.workBorders.map(border => <Tag key={border.id} className="user-tag">{border.name}</Tag>)}</p>
        </Card>
    );
};

export default UserCard;
