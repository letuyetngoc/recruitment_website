'use client'
import React, { useState } from 'react';
import {
    AliwangwangOutlined,
    ApiOutlined,
    AppstoreOutlined,
    BankOutlined,
    ExceptionOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    ScheduleOutlined,
    UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import './admin.page.css'
import Link from 'next/link';

interface RootLayoutProps {
    children: React.ReactNode;
}

const { Header, Sider, Content } = Layout;

const AdminPage = ({ children }: RootLayoutProps) => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    return (
        <Layout style={{ height: '100vh' }}>
            <Sider trigger={null} collapsible collapsed={collapsed} style={{ padding: 0, background: colorBgContainer }}>
                <Link href='/home' className='logo'>ngCV</Link>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={[
                        {
                            key: '1',
                            icon: <AppstoreOutlined />,
                            label: <Link href='/admin'>Dashboard</Link>,
                        },
                        {
                            key: '2',
                            icon: <BankOutlined />,
                            label: <Link href='/admin/company'>Company</Link>,
                        },
                        {
                            key: '3',
                            icon: <UserOutlined />,
                            label: <Link href='/admin/user'>User</Link>,
                        },
                        {
                            key: '4',
                            icon: <ScheduleOutlined />,
                            label: <Link href='/admin/job'>Job</Link>,
                        },
                        {
                            key: '5',
                            icon: <AliwangwangOutlined />,
                            label: <Link href='/admin/resume'>Resume</Link>,
                        },
                        {
                            key: '6',
                            icon: <ApiOutlined />,
                            label: <Link href='/admin/permission'>Permission</Link>,
                        },
                        {
                            key: '7',
                            icon: <ExceptionOutlined />,
                            label: <Link href='/admin/role'>Role</Link>,
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        height: '100%',
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
};
export default AdminPage;