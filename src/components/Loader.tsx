import React from 'react';
import { Spin } from 'antd';
import './Loader.scss';

const Loader: React.FC = () => {
    return (
        <div className="loader">
            <Spin size="large" />
        </div>
    );
};

export default Loader;
