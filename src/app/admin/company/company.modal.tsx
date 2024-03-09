'use client'
import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, InputNumber, Select, Button, Row, Col, Typography, message, Upload } from 'antd';
import { createCompany, uploadFile } from '../../../config/axios/api';
import { useHasMounted } from '../../../utils/customHook';
import { ICompany } from '../../../types/backend';
import type { GetProp, UploadProps } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { Title } = Typography

interface IProp {
    isOpenModal: boolean;
    setIsOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    fetchData: () => void;
    companyInit: ICompany | null;
    setCompanyInit: React.Dispatch<React.SetStateAction<ICompany | null>>;
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
    name: string;
    address: string;
    description: string;
    logo: FileType;
}

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function CompanyModal(props: IProp) {
    const { isOpenModal, setIsOpenModal, companyInit, setCompanyInit, fetchData } = props;
    const hasMounted = useHasMounted()
    const [form] = Form.useForm<IForm>();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
    const [logoName, setLogoName] = useState<string>();

    //handle case edit user
    // useEffect(() => {
    //     (async function getRoleAndCompany() {
    //         const listCompanise = await fetchListCompanies()
    //         const listRoles = await fetchListRoles()
    //         setCompanies(listCompanise)
    //         setRoles(listRoles)

    //         if (companyInit?._id) {
    //             const { name, address, description } = companyInit
    //             form.setFieldsValue({
    //                 name,
    //                 description,
    //                 address
    //             })
    //         }
    //     })();
    // }, [companyInit]);

    const handleSubmit = async (values: IForm) => {
        const { name, address, description, logo } = values;

        if (companyInit?._id) {
            //update user
            // const user = {
            //     _id: companyInit._id,
            //     name,
            //     email,
            //     password,
            //     age,
            //     gender,
            //     address,
            //     role: role,
            //     company: {
            //         _id: values.company,
            //         name: companies?.find(company => company.value === values.company)?.label as string
            //     }
            // }
            // const res = await updateUser(user)
            // if (res?.data?.statusCode === 200) {
            //     message.info('Update user success!');
            //     handleReset()
            //     fetchData()
            // } else {
            //     message.info('An error occurred. Please try again!');
            // }
        }
        else {
            // create company
            const company = {
                name, address, description, logo: logoName
            }
            const res = await createCompany(company)
            if (res.data && res.data.data) {
                message.info('Create company success!');
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
        setCompanyInit(null);
        setIsOpenModal(false);
    }

    //------handle upload file------
    const beforeUpload = (file: FileType) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    const handleChange: UploadProps['onChange'] = async (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true);
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
            const res = await uploadFile(info.file.originFileObj, 'company')
            console.log('res', res)
            if (res.data && res.data.data) {
                message.success('Upload image success!')
                setLogoName(res.data.data.fileName)
            } else {
                message.error('An error occurred. Please try again!');
            }
        }
    };

    const getBase64 = (img: FileType, callback: (url: string) => void) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result as string));
        reader.readAsDataURL(img);
    };

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );
    //

    if (!hasMounted) return <></>
    return (
        <Modal forceRender title={<Title type="secondary" level={4} style={{ margin: '0 0 30px 0' }}>{companyInit?._id ? "Update company" : "Create company"}</Title>}
            open={isOpenModal}
            onCancel={handleReset}
            maskClosable={false}
            width={'60%'}
            footer={false}
        >
            <Form form={form} variant="filled" layout="vertical" onFinish={handleSubmit}>
                <Row gutter={20}>
                    <Col span={24}>
                        <Form.Item label="Name" name="name" rules={[{ required: true, message: 'Please input!' }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={20}>
                    <Col span={24} md={6}>
                        <Form.Item label="Logo" name='logo' rules={[{ required: true, message: 'Please upload image!' }]}>
                            <Upload
                                name="logo"
                                listType="picture-card"
                                className="avatar-uploader"
                                showUploadList={false}
                                action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                beforeUpload={beforeUpload}
                                onChange={handleChange}
                            >
                                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                            </Upload>
                        </Form.Item>
                    </Col>
                    <Col span={24} md={18} style={{ width: '100%' }}>
                        <Form.Item label="Address" name='address' rules={[{ required: true, message: 'Please input!' }]}>
                            <TextArea rows={4} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ height: '200px' }}>
                        <Form.Item label="Description" name="description" rules={[{ required: true, message: 'Please input!' }]}>
                            <ReactQuill
                                style={{ width: '100%', height: '120px' }}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'end', marginTop: '20px' }}>
                        <Button style={{ marginRight: '10px' }} onClick={() => setIsOpenModal(false)}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType='submit'>
                            Submit
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Modal >
    )
}
