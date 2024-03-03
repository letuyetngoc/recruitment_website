'use client'
import { Typography } from 'antd';
import React from "react";
import { EnvironmentOutlined, MonitorOutlined } from "@ant-design/icons";
import { Button, Col, Row, Select, SelectProps, Space } from "antd";
const { Title } = Typography;


const options: SelectProps['options'] = [];

for (let i = 10; i < 36; i++) {
  options.push({
    label: i.toString(36) + i,
    value: i.toString(36) + i,
  });
}

const handleChange = (value: string[]) => {
  console.log(`selected ${value}`);
};

export default function SearchHome() {
    return (
        <div style={{ marginTop: '50px' }}>
            <Title style={{ margin: '20px 0', fontWeight: 'bold' }} level={4}>Việc làm IT cho developer</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Space style={{ width: '100%' }} direction="vertical">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder={<>
                                <MonitorOutlined />{' '}
                                Tìm theo kỹ năng
                            </>}
                            onChange={handleChange}
                            options={options}
                        />
                    </Space>
                </Col>
                <Col span={12} >
                    <Row gutter={16}>
                        <Col span={12}>
                            <Space style={{ width: '100%' }} direction="vertical">
                                <Select
                                    mode="multiple"
                                    allowClear
                                    style={{ width: '100%' }}
                                    placeholder={<>
                                        <EnvironmentOutlined />{' '}
                                        Địa điểm
                                    </>}
                                    onChange={handleChange}
                                    options={options}
                                />
                            </Space>
                        </Col>
                        <Col span={12}>
                            <Button type='primary'>Search</Button>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
    )
}
