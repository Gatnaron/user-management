import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Select, message, Card, Layout } from 'antd';
import { User, roles, workBorders } from '../models/User';
import Header from '../components/Header';
import useUserStore from '../store/userStore';
import './UserForm.scss';

const { Option } = Select;
const { Content } = Layout;

const UserForm: React.FC = () => {
    const { users, addUser, updateUser, deleteUser } = useUserStore();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            const user = users.find(user => user.id === id);
            if (user) {
                form.setFieldsValue({
                    ...user,
                    workBorders: user.workBorders.map(border => border.id),
                });
            }
        } else {
            setIsEditMode(false);
            form.resetFields();
        }
    }, [id, users, form]);

    const handleFinish = (values: any) => {
        const selectedWorkBorders = values.workBorders.map((id: string) => workBorders.find(border => border.id === id));

        if (isEditMode) {
            const updatedUser = { ...values, id, workBorders: selectedWorkBorders };
            updateUser?.(updatedUser as User);
            message.success('Пользователь успешно обновлен');
        } else {
            const newUser = { ...values, id: Math.random().toString(36).substring(2, 9), workBorders: selectedWorkBorders };
            addUser?.(newUser as User);
            message.success('Пользователь успешно добавлен');
        }
        navigate('/');
    };

    const handleDelete = () => {
        if (id) {
            deleteUser?.(id);
            message.success('Пользователь успешно удален');
            navigate('/');
        }
    };

    const goBack = () => {
        navigate('/');
    };

    return (
        <Layout>
            <Header onSearch={() => {}} />
            <Content className="user-form-content">
                <Card className="user-form-card">
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
                                    <Option key={border.id} value={border.id}>{border.name}</Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Button onClick={goBack} style={{ marginRight: '10px' }}>Вернуться к списку</Button>
                        {isEditMode ? (
                            <>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Обновить</Button>
                                <Button danger onClick={handleDelete}>Удалить пользователя</Button>
                            </>
                        ) : (
                            <Button type="primary" htmlType="submit">Создать пользователя</Button>
                        )}
                    </Form>
                </Card>
            </Content>
        </Layout>
    );
};

export default UserForm;
