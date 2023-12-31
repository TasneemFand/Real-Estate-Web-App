import React from "react";
import { SideBar } from "../Sidebar";
import { Header } from "../Header";

export const getNoneLayout = (page: React.ReactElement) => page;

export const getDefaultLayout = (page: React.ReactElement) => {
  return (
    <div className="flex min-h-screen min-w-fit">
      <SideBar />
      <div className="flex w-full flex-col">
        <Header />
        {page}
      </div>
    </div>
  );
};
