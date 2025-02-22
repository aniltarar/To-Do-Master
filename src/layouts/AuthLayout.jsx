import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Outlet } from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='flex h-screen bg-black text-white'>
      <Toaster position='top-center' />
      <Outlet />
    </div>
  )
}

export default AuthLayout