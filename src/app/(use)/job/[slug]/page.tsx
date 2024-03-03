'use client'
import { EnvironmentOutlined, FieldTimeOutlined, ThunderboltOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Row, Tag, Typography } from 'antd'
import React from 'react'
const { Title } = Typography

export default function JobDetail() {
    return (
        <Row>
            <Col span={16}>
                <Title level={3} style={{ margin: '20px 0' }}>Frontend developer</Title>
                <Button style={{ width: '100%' }} type="primary" size='large' danger>Apply now</Button>
                <Divider />
                <div style={{ marginBottom: '10px' }}>
                    <Tag color="orange">ReactJS</Tag>
                    <Tag color="orange">Nextjs</Tag>
                    <Tag color="orange">VueJs</Tag>
                    <Tag color="orange">Typescript</Tag>
                </div>
                <div style={{ marginTop: '10px' }}>
                    <div style={{ fontSize: '15px', marginBottom: '10px' }}>
                        <ThunderboltOutlined style={{ color: 'orange' }} /> 12 000 000đ
                    </div>
                    <div style={{ fontSize: '15px', marginBottom: '10px' }}>
                        <EnvironmentOutlined style={{ color: 'blue' }} /> Hà Nội
                    </div>
                    <div style={{ fontSize: '15px', marginBottom: '10px' }}>
                        <FieldTimeOutlined /> 17/2/2024
                    </div>
                </div>
                <Divider />
            </Col>
            <Col span={6} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', margin: '20px 0' }}>
                <img style={{ width: '250px', height: '250px' }} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                <Title level={3} style={{ margin: '20px 0' }}>Tiki</Title>
            </Col>
        </Row>
    )
}
