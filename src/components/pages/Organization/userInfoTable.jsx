import React from 'react';
import {Table, Avatar, ConfigProvider} from 'antd';
import './index.css'
import {useTranslation} from "react-i18next";
const UserInfoTable = ({ users }) => {
    const {t} = useTranslation();

    const columns = [
        {
            title: `${t(`OrgPage.Avatar`)}`,
            dataIndex: 'avatar',
            align: 'center',
            render: (avatar, userInfo) => <Avatar src={`${import.meta.env.VITE_BASE_URL_AVATAR}/${userInfo.id}/${avatar}`} />,
        },
        {
            title: `${t(`OrgPage.userName`)}`,
            dataIndex: 'username',
            key: 'username',
            align: 'center',
        },
        {
            title: `${t(`OrgPage.email`)}`,
            dataIndex: 'email',
            key: 'email',
            align: 'center',
        },
        {
            title: `${t(`OrgPage.role`)}`,
            dataIndex: 'role',
            key: 'role',
            align: 'center',
        },
        {
            title: `${t(`OrgPage.score`)}`,
            dataIndex: 'score',
            key: 'score',
            align: 'center',
        }
    ];

    return <ConfigProvider
        theme={{
            token: {
                colorPrimary: "#2D3748",
                backgroundColor: "#f5f7fa",
                colorBgContainer: "white",
                margin: "0",
                borderRadius:"20",
                colorFillQuaternary: "rgba(150, 171, 223, 0.25)",
                colorTextBase: "rgba(113, 128, 150, 1)",
                fontFamily:'Geologica',
                color:'#2D3748',
                fontSizeBase: '20px',
            },
        }}
    >
        <Table columns={columns}
                  headerStyle={{ borderRadius: '15px', background:'#f8f8fa' }}
                  dataSource={users} rowKey="id" className='custom-table' />
        </ConfigProvider>
};

export default UserInfoTable;
