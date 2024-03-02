import React from "react";
import HeaderPage from "../../components/client/header.client";

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <HeaderPage/>
        {children}
    </>
  );
}

export default RootLayout;
