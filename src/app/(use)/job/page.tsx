'use client'
import React from 'react'
import SearchHome from '../../../components/home/search.home'
import { Divider, Pagination, PaginationProps } from 'antd'
import JobsList from '../../../components/home/jobs.list'

export default function Job() {
  const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <>
      <SearchHome />
      <Divider />
      <JobsList />
      <div style={{display:'flex', justifyContent:'center', margin:'20px 0'}}>
        <Pagination
          showSizeChanger
          onShowSizeChange={onShowSizeChange}
          defaultCurrent={3}
          total={50}
        />
      </div>
    </>
  )
}
