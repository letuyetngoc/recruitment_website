'use client'
import React, { useEffect, useState } from 'react';
import { Button, Col, Row, Select, Space, Table, Typography } from 'antd';
import type { GetProp, SelectProps, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, EnvironmentOutlined, MonitorOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface DataType {
  name: {
    first: string;
    last: string;
  };
  gender: string;
  email: string;
  login: {
    uuid: string;
  };
}

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'STT',
    dataIndex: 'stt',
    sorter: true,
    render: (value, record, index) => index + 1,
    width: '20%',
  },
  {
    title: 'id',
    dataIndex: 'id',
    width: '20%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Job',
    dataIndex: 'job',
  },
  {
    title: 'Company',
    dataIndex: 'company',
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
      <EditOutlined style={{ color: 'blue' }} />
      <DeleteOutlined style={{ color: 'red' }} />
    </>
  },
];

const getRandomuserParams = (params: TableParams) => ({
  results: params.pagination?.pageSize,
  page: params.pagination?.current,
  ...params,
});

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

const App: React.FC = () => {
  const [data, setData] = useState<DataType[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const fetchData = () => {
    // setLoading(true);
    // fetch(`https://randomuser.me/api?${qs.stringify(getRandomuserParams(tableParams))}`)
    //   .then((res) => res.json())
    //   .then(({ results }) => {
    //     setData(results);
    //     setLoading(false);
    //     setTableParams({
    //       ...tableParams,
    //       pagination: {
    //         ...tableParams.pagination,
    //         total: 200,
    //         // 200 is mock data, you should read it from server
    //         // total: data.totalCount,
    //       },
    //     });
    //   });
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
                  Trạng thái
                </>}
                onChange={handleChange}
                options={options}
              />
            </Space>
          </Col>
        </Row>
      </div>
      <Row justify={'center'} align={'middle'}>
        <Col span={12}>
          <Title style={{ margin: '20px 0', }} level={4}>Danh sách Resumes</Title>
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="primary" icon={<PlusOutlined />}>Thêm mới</Button>
        </Col>
      </Row>
      <Table
        columns={columns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={tableParams.pagination}
        loading={loading}
        onChange={handleTableChange}
      />
    </>
  );
};

export default App;