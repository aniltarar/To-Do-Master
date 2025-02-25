// import React from 'react'
// import { Outlet } from 'react-router-dom'
// import Navbar from '../components/Navbar/Navbar'
// import { Toaster } from 'react-hot-toast'

// const MainLayout = () => {
//     return (
//         <div className='flex min-h-screen h-full bg-[#262a33] text-white '>
//             <Navbar />
//             <Toaster position='top-center' />
//             <div className='container mx-auto p-5'>
//                 <Outlet />
//             </div>
//         </div>
//     )
// }

// export default MainLayout
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'

const MainLayout = () => {
    return (
        <div className='flex min-h-screen h-full bg-[#262a33] text-white'>
            <Navbar />
            <Toaster position='top-center' />
            <div className='flex-1 overflow-auto'>
                <div className='container mx-auto p-5'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default MainLayout