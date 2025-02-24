import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'

const MainLayout = () => {
    return (
        <div className='flex h-screen bg-[#262a33] text-white'>
            <Navbar />
            <Toaster position='top-center' />
            <div className='container mx-auto p-5'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout