
'use client'
import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer, Dropdown, MenuProps, message } from "antd";
import { DownOutlined, MenuOutlined } from "@ant-design/icons";
import { Menu, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Header } from "antd/es/layout/layout";
import './header.client.css'
import Link from "next/link";
import { callLogout, getAccount } from "../../config/axios/api";
import { useRouter } from "next/navigation";
import { ADMIN_ROLE } from "../../config/constants";

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
export const RightMenu = () => {
    const router = useRouter()
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        ; (async function () {
            setIsLogged(localStorage.getItem('access_token') ? true : false)
            if (localStorage.getItem('access_token')) {
                const res = await getAccount()
                if (res.data && res.data.data) {
                    setIsAdmin(res.data.data.role.name === ADMIN_ROLE ? true : false)
                }
            }
        })()
    }, [localStorage.getItem('access_token')])

    //check adminUser

    const handleLogout = async () => {
        const res = await callLogout();
        if (res && res.data) {
            localStorage.removeItem('access_token')
            message.success('Logout success');
            router.push('/')
            setIsLogged(false)
        } else {
            message.error('An error occurred, please try again!')
        }
    }

    const items: MenuProps['items'] = isAdmin ?
        [
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
                    <Link href='/admin' >
                        Admin page
                    </Link>
                ),
            },
            {
                key: '3',
                label: (
                    <span style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
                        Logout
                    </span>
                ),
            },
        ]
        :
        [
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
                    <span style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>
                        Logout
                    </span>
                ),
            },
        ]

    return (
        <>
            {
                isLogged
                    ?
                    <Dropdown menu={{ items }} placement="bottomRight" trigger={['click']} className="dropdown">
                        <div className="avatar">
                            <Avatar icon={<UserOutlined />} />
                            <span className="username">John Doe</span>
                            <DownOutlined className="downOutlined-icon" />
                        </div>
                    </Dropdown>
                    :
                    <div className="avatar">
                        <Link href={'/login'}>Đăng nhập/ Đăng kí</Link>
                    </div>
            }
        </>
    );
};
export default HeaderPage;
