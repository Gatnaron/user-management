import React from 'react';
import { Layout, Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import './Header.scss';

const { Header: AntHeader } = Layout;

interface HeaderProps {
    onSearch: (value: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch }) => {
    const navigate = useNavigate();

    return (
        <AntHeader className="header">
            <div className="header-left" onClick={() => navigate('/')}>Пользователи</div>
            <div className="header-right">
                <Input.Search
                    placeholder="Поиск по Username"
                    onSearch={onSearch}
                    style={{ marginRight: '10px' }}
                />
                <Button type="primary" onClick={() => navigate('/user-form')}>
                    Добавить пользователя
                </Button>
            </div>
        </AntHeader>
    );
};

export default Header;
