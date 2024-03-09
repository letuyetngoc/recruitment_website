'use client'
import React, { useEffect, useState } from 'react';
import { Button, Col, Popconfirm, Row, Table, Typography, message } from 'antd';
import type { GetProp, TableProps } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { deleteUser, getAllUsers } from '../../../config/axios/api';
import { IUser } from '../../../types/backend';
import Search from 'antd/es/input/Search';
import { useDebounce } from '../../../config/hook/customHook';
import queryString from 'query-string';
import { PAGE_SIZE } from '../../../config/constants';
import UserModal from './user.modal';
import dayjs from 'dayjs';

const { Title } = Typography

type ColumnsType<T> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;
interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: string;
  sortOrder?: string;
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}

const Page = () => {
  const [data, setData] = useState<IUser[]>();
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: PAGE_SIZE,
    },
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false)
  const [userInit, setUserInit] = useState<IUser | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [email, setEmail] = useState<string | null>(null)
  const debouncedEmailSearch = useDebounce<string | null>(email, 800)
  const debouncedNameSearch = useDebounce<string | null>(name, 800)

  console.log('tableParams.pagination user', tableParams.pagination)

  //fetch data user for table
  useEffect(() => {
    fetchData();
  }, [JSON.stringify(tableParams)]);

  // handle search user by email and name
  useEffect(() => {
    fetchData()
  }, [debouncedEmailSearch, debouncedNameSearch, JSON.stringify(tableParams)]);


  const fetchData = async () => {
    setLoading(true);
    const query = buildQuery(tableParams.pagination?.current!, tableParams.pagination?.pageSize!, name, email);
    const res = await getAllUsers(query);
    if (res.data && res.data?.data) {
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

  const handeDeleteUser = async (id: string | undefined) => {
    if (id) {
      const res = await deleteUser(id);
      if (res && res.data) {
        message.success('Delete use success!');
        fetchData();
      } else {
        message.error('An error occurred. Please try again');
      }
    }
  };

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
      title: 'Created at',
      dataIndex: 'createdAt',
      render: (value, company, index) => dayjs(value).format('DD-MM-YYYY HH:mm:ss')
    },
    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
      render: (value, company, index) => dayjs(value).format('DD-MM-YYYY HH:mm:ss')
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (value, user, index) => <>
        <EditOutlined style={{ color: 'blue', marginRight: '10px', cursor: 'pointer' }}
          onClick={() => {
            setUserInit(user)
            setIsOpenModal(true)
          }}
        />
        <Popconfirm
          placement="topRight"
          title='Are you sure to delete this user?'
          description='Delete the user'
          okText="Yes"
          cancelText="No"
          onConfirm={() => handeDeleteUser(user._id!)}
        >
          <DeleteOutlined style={{ color: '#ff4d4f', cursor: 'pointer' }} />
        </Popconfirm>
      </>
    },
  ];

  const buildQuery = (current: number, pageSize: number, name: string | null, email: string | null) => {
    const query = { pageSize, current, email, name };
    if (query.name) query.name = `/${query.name}/i`;
    if (query.email) query.email = `/${query.email}/i`;
    let temp = queryString.stringify(query);
    return temp;
  }

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className='searchbar' style={{ display: 'flex', justifyContent: 'center'}}>
          <Search placeholder="input name to search" enterButton 
            onChange={e => setName(e.target.value)}
          />
        </div>
        {/* <div style={{ display: 'flex', justifyContent: 'center', width: '30%' }}>
          <Search placeholder="input email to search" enterButton="Search"
            onChange={e => setEmail(e.target.value)}
          />
        </div> */}
      </div>
      <Row justify={'center'} align={'middle'}>
        <Col span={12}>
          <Title style={{ margin: '20px 0' }} level={4}>List Users</Title>
        </Col>
        <Col span={12} style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpenModal(true)}>Add</Button>
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
      {isOpenModal &&
        <UserModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          fetchData={fetchData}
          userInit={userInit}
          setUserInit={setUserInit}
        />
      }
    </>
  );
};

export default Page;