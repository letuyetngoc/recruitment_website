'use client'
import { EnvironmentOutlined, ThunderboltOutlined } from '@ant-design/icons';
import { Card, Col, Row, Typography } from 'antd'
import Meta from 'antd/es/card/Meta';
import React from 'react'
const { Title } = Typography;

export default function JobsList() {
    return (
        <div style={{ marginTop: '50px' }}>
            <Row justify="space-between" align="middle">
                <Col span={12}>
                    <Title style={{ margin: '20px 0', fontWeight: 'bold' }} level={4}>Công việc mới nhất</Title>
                </Col>
                <Col span={12} >
                    <a style={{ margin: '20px 0', display: 'flex', justifyContent: 'end' }} onClick={(e) => e.preventDefault()}>Xem tất cả</a>
                </Col>
            </Row>
            <div>
                <Row justify="space-between" align="middle" gutter={[20, 20]}>
                    <Col span={24} md={12}>
                        <CardJob />
                    </Col>
                    <Col span={24} md={12}>
                        <CardJob />
                    </Col>
                    <Col span={24} md={12}>
                        <CardJob />
                    </Col>
                    <Col span={24} md={12}>
                        <CardJob />
                    </Col>
                </Row>

            </div>
        </div>
    )
}

const CardJob = () => {
    return (
        <Card
            hoverable
            style={{ width: '100%'}}
        >
            <Row gutter={20}>
                <div>
                    <div style={{ width: '80px', height: '80px' }}>
                        <img alt="example" width={80} height={80} src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"></img>
                    </div>
                </div>
                <div style={{ marginLeft: '10px' }}>
                    <Title style={{ margin: '0 0 0px 0', fontWeight: 'bold' }} level={5}>FullStack developer</Title>
                    <div style={{ fontSize: '12px' }}>
                        <EnvironmentOutlined /> Hà Nội
                    </div>
                    <div style={{ fontSize: '12px' }}>
                        <ThunderboltOutlined /> 12 000 000đ
                    </div>
                </div>
            </Row>
            <Row >
                <Col span={24} style={{ display: 'flex', justifyContent: 'end', fontSize:'12px' }}>
                    9/2/2024
                </Col>
            </Row>
        </Card>
    )
}
