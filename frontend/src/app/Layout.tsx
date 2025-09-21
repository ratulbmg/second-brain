import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header, Footer } from '../components';


const Layout: React.FC =() => {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout