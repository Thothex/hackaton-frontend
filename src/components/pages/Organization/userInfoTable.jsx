import React from 'react';
import { Table, Avatar } from 'antd';

const UserInfoTable = ({ users }) => {
    const columns = [
        {
            title: 'Avatar',
            dataIndex: 'avatar',
            align: 'center',
            render: (avatar, userInfo) => <Avatar src={`${import.meta.env.VITE_BASE_URL_AVATAR}/${userInfo.id}/${avatar}`} />,
        },
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            align: 'center',
        },
        {
            title: 'Score',
            dataIndex: 'score',
            key: 'score',
            align: 'center',
        }
    ];

    return <Table columns={columns} dataSource={users} rowKey="id" />;
};

export default UserInfoTable;
