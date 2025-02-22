import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'

const MainLayout = () => {
    return (
        <div className='flex h-screen'>
            <Navbar />
            <div className='container mx-auto p-5'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout