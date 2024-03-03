import React from "react";
import AdminPage from "../../components/admin/admin.layout";

interface RootLayoutProps {
    children: React.ReactNode;
}

function RootLayout({ children }: RootLayoutProps) {
    return (
        <AdminPage>
            {children}
        </AdminPage>
    );
}

export default RootLayout;