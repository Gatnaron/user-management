import React from 'react';
import { Spin } from 'antd';

const Loader: React.FC = () => (
    <div style={{ textAlign: 'center', padding: '30px' }}>
        <Spin size="large" />
    </div>
);

export default Loader;
