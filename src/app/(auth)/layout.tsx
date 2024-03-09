import React from "react";
interface RootLayoutProps {
    children: React.ReactNode;
}

async function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            {children}
        </>
    );
}

export default RootLayout;
