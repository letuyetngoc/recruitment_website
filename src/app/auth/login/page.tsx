'use client'
import React from 'react';
import { Button, Card, Divider, Form, Input } from 'antd';
import Link from 'next/link';
import { FacebookOutlined, GithubOutlined, GooglePlusOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { callLogin } from '../../../config/axios/api';

export type LoginType = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const router = useRouter()

  /**
   * handle submit form login
   */
  const onFinish = async (values: LoginType) => {
    const res = await callLogin(values);
    if (res.data.statusCode === 201) {
      router.push('/home');
      localStorage.setItem('access_token', res.data.data?.access_token!);
    }
  };

  return (
    <div style={{ background: '#f0f2f5', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Login">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, background: '#fff' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<LoginType>
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form.Item>
        </Form>
        <Divider>Or</Divider>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
          <Button shape="circle" icon={<GooglePlusOutlined />} />
          <Button shape="circle" icon={<FacebookOutlined />} />
          <Button shape="circle" icon={<GithubOutlined />} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p className="text text-normal">Chưa có tài khoản ?
            <span>
              <Link href='/register' > Đăng Ký </Link>
            </span>
          </p>
        </div>
      </Card>
    </div>
  )
}

export default LoginPage;