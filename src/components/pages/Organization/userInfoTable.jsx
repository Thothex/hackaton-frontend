import React from 'react';
import { Table, Avatar } from 'antd';

const UserInfoTable = ({ users }) => {
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            render: (avatar, userInfo) => <Avatar src={`${import.meta.env.VITE_BASE_URL_AVATAR}/${userInfo.id}/${avatar}`} />,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
        }
    ];

    return <Table columns={columns} dataSource={users} rowKey="id" />;
};

export default UserInfoTable;
