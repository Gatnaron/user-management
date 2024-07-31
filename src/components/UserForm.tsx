import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Select, message, Card } from 'antd';
import { User, roles, workBorders } from '../models/User';

const { Option } = Select;

const UserForm: React.FC<{ users: User[], setUsers: React.Dispatch<React.SetStateAction<User[]>> }> = ({ users, setUsers }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            const user = users.find(user => user.id === id);
            if (user) {
                form.setFieldsValue(user);
            }
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    }, [id, users, form]);

    const handleFinish = (values: any) => {
        if (isEditMode) {
            const updatedUsers = users.map(user => user.id === id ? { ...user, ...values } : user);
            setUsers(updatedUsers);
            message.success('Пользователь успешно обновлен');
        } else {
            const newUser = { ...values, id: Math.random().toString(36).substring(2, 9) };
            setUsers([...users, newUser]);
            message.success('Пользователь успешно добавлен');
        }
        navigate('/');
    };

    const handleDelete = () => {
        const updatedUsers = users.filter(user => user.id !== id);
        setUsers(updatedUsers);
        message.success('Пользователь успешно удален');
        navigate('/');
    };

    const goBack = () => {
        navigate('/');
    };

    return (
        <Card style={{ width: '60%' }}>
            <Form form={form} onFinish={handleFinish} layout="vertical">
                <Form.Item name="username" label="Username" rules={[{ required: true, min: 3 }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password" rules={[{ required: true, min: 4 }]}>
                    <Input.Password />
                </Form.Item>
                <Form.Item name="firstName" label="First Name" rules={[{ required: true, min: 2 }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="lastName" label="Last Name">
                    <Input />
                </Form.Item>
                <Form.Item name="roles" label="Roles" rules={[{ required: true }]}>
                    <Select mode="multiple">
                        {roles.map(role => (
                            <Option key={role} value={role}>{role}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="workBorders" label="Work Borders" rules={[{ required: true }]}>
                    <Select mode="multiple">
                        {workBorders.map(border => (
                            <Option key={border.id} value={border.name}>{border.name}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Button onClick={goBack}>Вернуться к списку</Button>
                {isEditMode ? (
                    <>
                        <Button type="primary" htmlType="submit">Обновить информацию о пользователе</Button>
                        <Button danger onClick={handleDelete}>Удалить пользователя</Button>
                    </>
                ) : (
                    <Button type="primary" htmlType="submit">Создать пользователя</Button>
                )}
            </Form>
        </Card>
    );
};

export default UserForm;
