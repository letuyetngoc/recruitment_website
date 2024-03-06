'use client'
import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Select, Button, Row, Col, Typography, message } from 'antd';
import { createUser, getAllCompanies, getAllRoles, updateUser } from '../../../config/axios/api';
import { IUser } from '../../../types/backend';
import { useHasMounted } from '../../../utils/customHook';
const { Title } = Typography

interface IProp {
    isOpenModal: boolean;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void;
    userInit: IUser | null;
    setUserInit: React.Dispatch<React.SetStateAction<IUser | null>>;
}

interface ICompanySelect {
    label: string;
    value: string;
}

interface IRoleSelect {
    label: string;
    value: string;
}

interface IForm {
    email: string;
    password?: string;
    name: string;
    age: number;
    gender: string;
    role: string;
    company: string;
    address: string
}

export default function UserModal(props: IProp) {
    const { isOpenModal, setIsOpenModal, userInit, setUserInit, fetchData } = props;
    const hasMounted = useHasMounted()
    const [companies, setCompanies] = useState<ICompanySelect[]>();
    const [roles, setRoles] = useState<IRoleSelect[]>();
    const [form] = Form.useForm<IForm>();

    //handle case edit user
    useEffect(() => {
        (async function getRoleAndCompany() {
            const listCompanise = await fetchListCompanies()
            const listRoles = await fetchListRoles()
            setCompanies(listCompanise)
            setRoles(listRoles)

            if (userInit?._id) {
                const { email, password, name, age, gender, role, company, address } = userInit
                form.setFieldsValue({
                    email,
                    password,
                    name,
                    age,
                    gender,
                    role: role as string,
                    company: company?._id,
                    address
                })
            }
        })();
    }, [userInit]);

    const handleSubmit = async (values: IForm) => {
        const { name, email, password, address, age, gender, role, company } = values;
        if (userInit?._id) {
            //update user
            const user = {
                _id: userInit._id,
                name,
                email,
                password,
                age,
                gender,
                address,
                role: role,
                company: {
                    _id: values.company,
                    name: companies?.find(company => company.value === values.company)?.label as string
                }
            }
            const res = await updateUser(user)
            if (res?.data?.statusCode === 200) {
                message.info('Update user success!');
                handleReset()
                fetchData()
            } else {
                message.info('An error occurred. Please try again!');
            }
        } else {
            //create user
            const user = {
                name,
                email,
                age,
                gender,
                address,
                role: role,
                company: {
                    _id: values.company,
                    name: companies?.find(company => company.value === values.company)?.label as string
                }
            }
            const res = await createUser(user);
            if (res?.data) {
                message.info('Create user success!');
                handleReset()
                fetchData()
            } else {
                // @ts-ignore
                message.error(res?.message)
            }
        }
    }

    const handleReset = async () => {
        form.resetFields();
        setUserInit(null);
        setCompanies([]);
        setRoles([]);
        setIsOpenModal(false);
    }

    const fetchListCompanies = async () => {
        const res = await getAllCompanies(1, 100)
        if (res.data && res.data.data) {
            const list = res.data.data?.result
            const result = list?.map(item => ({
                label: item.name as string,
                value: item._id as string
            }))
            return result
        } else return []
    }

    const fetchListRoles = async () => {
        const res = await getAllRoles(1, 100);
        if (res.data && res.data.data) {
            const list = res.data.data?.result;
            const result = list.map(item => {
                return {
                    label: item.name as string,
                    value: item._id as string
                }
            });
            return result;
        } else return [];
    }

    if (!hasMounted) return <></>
    return (
        <Modal forceRender title={<Title type="secondary" level={4} style={{ margin: '0 0 30px 0' }}>{userInit?._id ? "Update user" : "Create User"}</Title>}
            open={isOpenModal}
            onCancel={handleReset}
            maskClosable={false}
            width={'60%'}
            footer={false}
        >
            <Form form={form} variant="filled" layout="vertical" onFinish={handleSubmit}>
                <Row gutter={20}>
                    <Col span={24} md={12} >
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Please input!' }, { type: 'email', message: 'Please enter valid email!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={24} md={12}>
                        <Form.Item label="Password" name="password" rules={userInit?._id ? undefined : [{ required: true, message: 'Please input!' }]}>
                            <Input.Password disabled={userInit?._id ? true : false} />
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
                                options={roles}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={24} md={12} >
                        <Form.Item label="Company" name="company" rules={[{ required: true, message: 'Please input!' }]}>
                            <Select
                                options={companies}
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
                    <Button style={{ marginRight: '10px' }} onClick={() => setIsOpenModal(false)}>
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
