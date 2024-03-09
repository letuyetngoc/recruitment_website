'use client'
import React from 'react';
import { Button, Card, Divider, Form, Input, Select } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { callRegister } from '../../../config/axios/api';

export type RegisterType = {
  name: string;
  email: string;
  password: string;
  age: number;
  gender: string;
  address: string;
};

const LoginPage: React.FC = () => {
  const router = useRouter()

  /**
   * handle submit form login
   */
  const onFinish = async (values: RegisterType) => {
    const res = await callRegister(values);
    if (res.data.statusCode === 201) {
      router.push('/login');
    }
  };

  return (
    <div style={{ background: '#f0f2f5', width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Card title="Register">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, background: '#fff' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<RegisterType>
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<RegisterType>
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<RegisterType>
            label="Age"
            name="age"
            rules={[{ required: true, message: 'Please input your age!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please input your gender!' }]}>
            <Select>
              <Select.Option value="MALE">Nam</Select.Option>
              <Select.Option value="FEMALE">Nữ</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item<RegisterType>
            label="Adress"
            name="address"
            rules={[{ required: true, message: 'Please input your adress!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
        <Divider>Or</Divider>
        <div style={{ textAlign: 'center' }}>
          <p className="text text-normal">Đã có có tài khoản ?
            <span>
              <Link href='/login' > Đăng nhập </Link>
            </span>
          </p>
        </div>
      </Card>
    </div>
  )
};

export default LoginPage;