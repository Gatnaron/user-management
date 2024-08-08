import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, Button, Select, message, Card, Layout } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IFormValues } from '../models/IFormValues';
import { User, roles, workBorders } from '../models/User';
import formValuesSchema from '../validation/formValuesSchema';
import Header from '../components/Header';
import useUserStore from '../store/userStore';
import './UserForm.scss';

const { Option } = Select;
const { Content } = Layout;

const UserForm: React.FC = () => {
    const { users, addUser, updateUser, deleteUser } = useUserStore();
    const { control, handleSubmit, setValue, reset } = useForm<IFormValues>({
        resolver: yupResolver(formValuesSchema),
    });
    const navigate = useNavigate();
    const { id } = useParams<{ id?: string }>();
    const [isEditMode, setIsEditMode] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setIsEditMode(true);
            const user = users.find(user => user.id === id);
            if (user) {
                reset({
                    ...user,
                    workBorders: user.workBorders.map(border => border.id),
                });
            }
        } else {
            setIsEditMode(false);
            reset({});
        }
    }, [id, users, reset]);

    const onSubmit = (values: IFormValues) => {
        const selectedWorkBorders = values.workBorders.map((id: string) => workBorders.find(border => border.id === id)!);

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
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="username"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <Form.Item
                                    label="Username"
                                    validateStatus={error ? 'error' : ''}
                                    help={error?.message}
                                >
                                    <Input {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <Form.Item
                                    label="Password"
                                    validateStatus={error ? 'error' : ''}
                                    help={error?.message}
                                >
                                    <Input.Password {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name="firstName"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <Form.Item
                                    label="First Name"
                                    validateStatus={error ? 'error' : ''}
                                    help={error?.message}
                                >
                                    <Input {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <Form.Item
                                    label="Last Name"
                                    validateStatus={error ? 'error' : ''}
                                    help={error?.message}
                                >
                                    <Input {...field} />
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name="roles"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <Form.Item
                                    label="Roles"
                                    validateStatus={error ? 'error' : ''}
                                    help={error?.message}
                                >
                                    <Select mode="multiple" {...field}>
                                        {roles.map(role => (
                                            <Option key={role} value={role}>{role}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            )}
                        />
                        <Controller
                            name="workBorders"
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                                <Form.Item
                                    label="Work Borders"
                                    validateStatus={error ? 'error' : ''}
                                    help={error?.message}
                                >
                                    <Select mode="multiple" {...field}>
                                        {workBorders.map(border => (
                                            <Option key={border.id} value={border.id}>{border.name}</Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            )}
                        />
                        <Button onClick={goBack} style={{ marginRight: '10px' }}>Вернуться к списку</Button>
                        {isEditMode ? (
                            <>
                                <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Обновить</Button>
                                <Button danger onClick={handleDelete}>Удалить пользователя</Button>
                            </>
                        ) : (
                            <Button type="primary" htmlType="submit">Создать пользователя</Button>
                        )}
                    </form>
                </Card>
            </Content>
        </Layout>
    );
};

export default UserForm;
