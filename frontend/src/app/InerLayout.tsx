import React from 'react';
import { Outlet } from 'react-router-dom';
import ItemHeader from '../components/layout/ItemHeader';



const InerLayout: React.FC =() => {
    return (
        <>
            <ItemHeader/>
            <Outlet />
        </>
    )
}

export default InerLayout