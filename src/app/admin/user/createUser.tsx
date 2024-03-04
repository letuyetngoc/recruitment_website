'use client'
import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Select, Button, Row, Col, Typography, message } from 'antd';
import { createUser, getAllCompanies, getAllRoles } from '../../../config/axios/api';
import { ICompany, IRole } from '../../../types/backend';
const { Title } = Typography

interface IProp {
    isOpenCreateModal: boolean;
    setIsOpenCreateModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface IUser {
    name: string;
    email: string;
    password: string;
    age: number;
    address: string;
    role: string;
    gender: string;
    company: string
}

export default function CreateUserModal(props: IProp) {
    const { isOpenCreateModal, setIsOpenCreateModal } = props
    const [companies, setCompanies] = useState<ICompany[]>()
    const [roles, setRoles] = useState<IRole[]>()
    const [form] = Form.useForm();

    const handleSubmit = async (values: any) => {
        const newUser = {
            ...values,
            company: {
                _id: values.company,
                name: companies?.find(company => company._id === values.company)?.name
            }
        }
        const res = await createUser(newUser)
        if (res.data.statusCode === 201) {
            form.resetFields()
            message.info('Create user success!');
            setIsOpenCreateModal(false);
        } else {
            message.info('An error occurred. Please try again!');
        }
    }

    const fetchListCompanies = async () => {
        const res = await getAllCompanies(1, 100)
        if (res.data.statusCode === 200) {
            const result = res.data.data?.result
            setCompanies(result)
        }
    }

    const fetchListRoles = async () => {
        const res = await getAllRoles(1, 100)
        if (res.data.statusCode === 200) {
            const result = res.data.data?.result
            setRoles(result)
        }
    }

    //get list companies and roles
    useEffect(() => {
        fetchListCompanies()
        fetchListRoles()
    }, [])

    return (
        <Modal title={<Title type="secondary" level={4} style={{ margin: '0 0 30px 0' }}>Create users</Title>}
            open={isOpenCreateModal}
            onCancel={() => setIsOpenCreateModal(false)}
            maskClosable={false}
            width={'60%'}
            footer={false}
        >
            <Form variant="filled" layout="vertical" onFinish={handleSubmit} form={form}>
                <Row gutter={20}>
                    <Col span={24} md={12} >
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input!' }, { type: 'email', message: 'Please enter valid email!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input.Password />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={12} md={6} >
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12} md={6}>
                        <Form.Item label="Age" name="age" rules={[{ required: true, message: 'Please input!' }]}>
                            <InputNumber style={{ width: '100%' }} />
                        </Form.Item>
                    </Col>
                    <Col span={12} md={6}>
                        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please input!' }]}>
                            <Select
                                options={[
                                    { value: 'male', label: 'Nam' },
                                    { value: 'female', label: 'Nữ' },
                                ]}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12} md={6}>
                        <Form.Item label="Role" name="role" rules={[{ required: true, message: 'Please input!' }]}>
                            <Select
                                options={roles?.map(role => ({ value: role._id, label: role.name }))}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={24} md={12} >
                        <Form.Item label="Company" name="company" rules={[{ required: true, message: 'Please input!' }]}>
                            <Select
                                options={companies?.map(company => ({ value: company._id, label: company.name }))}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <div style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                    <Button style={{ marginRight: '10px' }} onClick={() => setIsOpenCreateModal(false)}>
                        Cancel
                    </Button>
                    <Button type="primary" htmlType='submit'>
                        Submit
                    </Button>
                </div>
            </Form>
        </Modal >
    )
}
