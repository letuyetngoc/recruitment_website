"use client";
import SearchHome from "../components/home/search.home";
import { Divider } from "antd";
import CompanyList from "../components/home/company.list";
import JobsList from "../components/home/jobs.list";
import HeaderPage from "../components/client/header.client";
import { useAppStore } from "../lib/hooks";
import { useSelector } from "react-redux";
import { RootState } from "../lib/store";

const Page = () => {
  const todoList = useSelector((state: RootState) => state.todoReducer.list);
  return (
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
  )
};

export default Page;
