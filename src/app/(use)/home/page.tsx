"use client";
import React from "react";
import SearchHome from "../../../components/home/search.home";
import CompanyList from "../../../components/home/company.list";
import JobsList from "../../../components/home/jobs.list";
import { Divider } from "antd";


const HomePage = () => {
  return (
    <div className="container">
      <SearchHome />
      <Divider />
      <CompanyList />
      <Divider />
      <JobsList />
    </div>
  );
}


export default HomePage;
