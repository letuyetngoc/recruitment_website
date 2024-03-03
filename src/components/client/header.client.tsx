
'use client'
import React, { useState } from "react";
import { Layout, Button, Drawer, Dropdown, MenuProps } from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import './header.client.css'
import Link from "next/link";
const HeaderPage = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <nav className="navbar">
            <Layout>
                <Header className="nav-header" >
                    <div className="logo">
                        <Link href={'/home'} className="brand-font">ngCV</Link>
                    </div>
                    <div className="navbar-menu">
                        <div className="leftMenu">
                            <LeftMenu mode={"horizontal"} />
                        </div>
                        <Button className="menuButton" type="text" onClick={showDrawer}>
                            <MenuOutlined />
                        </Button>
                        <div className="rightMenu">
                            <RightMenu />
                        </div>
                        <Drawer
                            title={"ngCV"}
                            placement="right"
                            onClose={onClose}
                            open={open}
                        >
                            <LeftMenu mode={"inline"} />
                            <RightMenu />
                        </Drawer>
                    </div>
                </Header>
            </Layout>
        </nav>
    );
};
type MenuMode = 'horizontal' | 'vertical' | 'inline';
const LeftMenu = ({ mode }: { mode: MenuMode }) => {
    const items = [{ key: 1, label: <Link href={'/home'}>Trang chủ</Link> }, { key: 2, label: <Link href={'/job'}>Việc làm IT</Link> }, { key: 3, label: <Link href={'/company'}>Top công ty IT</Link> }]
    return (
        <Menu
            mode={mode}
            defaultSelectedKeys={['1']}
            items={items}
            style={{ flex: 1, minWidth: 0 }}
        />
    );
};
const RightMenu = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a target="_blank" >
                    Profile
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" >
                    2nd menu item
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a target="_blank" >
                    Logout
                </a>
            ),
        },
    ];
    return (
        <>
            <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} className="dropdown">
                <div className="avatar">
                    <Avatar icon={<UserOutlined />} />
                    <span className="username">John Doe</span>
                    <DownOutlined className="downOutlined-icon" />
                </div>
            </Dropdown>
            {/* <div className="avatar">
                <span>Đăng nhập/ Đăng kí</span>
            </div> */}
        </>
    );
};
export default HeaderPage;
