'use client'
import React from 'react'
import { Card, Col, Row, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
const { Title } = Typography;

export default function CompanyList() {
    return (
        <div style={{ marginTop: '50px' }}>
            <Row justify="space-between" align="middle">
                <Col span={12}>
                    <Title style={{ margin: '20px 0', fontWeight: 'bold' }} level={4}>Nhà tuyển dụng hàng đầu</Title>
                </Col>
                <Col span={12} >
                    <a style={{ margin: '20px 0', display: 'flex', justifyContent: 'end' }} onClick={(e) => e.preventDefault()}>Xem tất cả</a>
                </Col>
            </Row>
            <div>
                <Row justify="center" align="middle" gutter={[20,20]}>
                    <Col span={24} md={12} lg={12} xl={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardCompany />
                    </Col>
                    <Col span={24} md={12} lg={12} xl={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardCompany />
                    </Col>
                    <Col span={24} md={12} lg={12} xl={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardCompany />
                    </Col>
                    <Col span={24} md={12} lg={12} xl={6} style={{ display: 'flex', justifyContent: 'center' }}>
                        <CardCompany />
                    </Col>
                </Row>
            </div>
        </div>
    )
}

const CardCompany = () => {
    return (
        <Card
            hoverable
            style={{ width: '300px'}}
            cover={
                <div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '300px', height: '200px' }}>
                        <img style={{ width: '140px', height: '140px' }} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                    </div>
                </div>
            }
        >
            <Meta title="Tiki" description="www.instagram.com" />
        </Card>
    )
}
