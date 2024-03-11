import React from "react";
import '../styles/app.css'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from "../AntdRegistry";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "recruitment_website",
  description: "author by ngocle",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <StoreProvider>
            {children}
          </StoreProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}

export default RootLayout;
