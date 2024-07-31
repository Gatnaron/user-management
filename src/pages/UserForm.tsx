import React, { useState } from 'react';
import { User } from '../models/User';
import UserForm from '../components/UserForm';

const UserFormPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', minHeight: '100vh' }}>
            <UserForm users={users} setUsers={setUsers} />
        </div>
    );
};

export default UserFormPage;
