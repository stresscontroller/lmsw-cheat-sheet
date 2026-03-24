import React from 'react';
import { Suspense } from 'react'

const LoginPageLayout = ({ children }: { children: React.ReactNode }) => {
    return <div className='min-h-[calc(100vh-350px)]'><Suspense>{children}</Suspense></div>;
};

export default LoginPageLayout;
