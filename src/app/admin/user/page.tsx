'use client'
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Select, Space, Table, Typography } from 'antd';
import type { GetProp, SelectProps, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, EnvironmentOutlined, MailOutlined, MonitorOutlined, PlusOutlined } from '@ant-design/icons';
import { getAllUsers } from '../../../config/axios/api';
import { IUser } from '../../../types/backend';
import CreateUserModal from './createUser';

const { Title } = Typography

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<IUser> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    sorter: true,
    render: (value, record, index) => index + 1,
  },
  {
    title: 'id',
    dataIndex: '_id',
    width: '20%',
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'CreatedAt',
    dataIndex: 'createdAt',
  },
  {
    title: 'UpdatedAt',
    dataIndex: 'updatedAt',
  },
  {
    title: 'Action',
    dataIndex: 'action',
    render: () => <>
      <EditOutlined style={{ color: 'blue', marginRight: '10px', cursor: 'pointer' }} />
      <DeleteOutlined style={{ color: 'red', cursor: 'pointer' }} />
    </>
  },
];

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

const Page = () => {
  const [data, setData] = useState<IUser[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 6,
    },
  });
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const res = await getAllUsers(tableParams.pagination?.current!, tableParams.pagination?.pageSize!)
    if (res.data.statusCode === 200) {
      setData(res.data.data?.result);
      setLoading(false);
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: res.data.data?.meta.total,
        },
      });
    }
  };


  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  const handleTableChange: TableProps['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <>
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Space style={{ width: '100%' }} direction="vertical">
              <Select
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder={<>
                  <MonitorOutlined />{' '}
                  Tìm theo tên
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
                      <MailOutlined />{' '}
                      Email
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
      <Row justify={'center'} align={'middle'}>
        <Col span={12}>
          <Title style={{ margin: '20px 0', }} level={4}>Danh sách Users</Title>
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpenCreateModal(true)}>Thêm mới</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey={(record) => record._id!}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <CreateUserModal isOpenCreateModal={isOpenCreateModal} setIsOpenCreateModal={setIsOpenCreateModal}/>
    </>
  );
};

export default Page;