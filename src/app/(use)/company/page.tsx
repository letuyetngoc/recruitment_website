'use client'
import { Pagination, PaginationProps } from 'antd';
import React from 'react'
import CompanyList from '../../../components/home/company.list';

export default function Company() {
    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        console.log(current, pageSize);
    };
    return (
        <div>
            <CompanyList />
            <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                <Pagination
                    showSizeChanger
                    onShowSizeChange={onShowSizeChange}
                    defaultCurrent={3}
                    total={50}
                />
            </div>
        </div>
    )
}
