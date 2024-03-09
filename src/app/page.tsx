"use client";
import SearchHome from "../components/home/search.home";
import { Divider } from "antd";
import CompanyList from "../components/home/company.list";
import JobsList from "../components/home/jobs.list";
import HeaderPage from "../components/client/header.client";

const Page = () => (
  <>
    <HeaderPage />
    <div className="container">
      <SearchHome />
      <Divider />
      <CompanyList />
      <Divider />
      <JobsList />
    </div>
  </>
);

export default Page;
