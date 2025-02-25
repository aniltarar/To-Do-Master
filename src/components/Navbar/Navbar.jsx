import React from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/slices/authSlice'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdOutlineDashboard, MdOutlineExitToApp } from 'react-icons/md'
import { FaTasks } from 'react-icons/fa'
import { IoLayersOutline } from 'react-icons/io5'


const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()


  const handleLogout = () => {
    setTimeout(() => {
      dispatch(logoutUser())
      toast.success('Çıkış işlemi başarılı')
      navigate('/')
    }, 1000)
  }

  return (
    <div className='flex flex-col gap-y-5 items-center w-1/10 min-w-32 bg-[#303236] border-r p-5 sticky top-0 h-screen'>
      <div className='flex flex-col w-full justify-center'>
        <Link to={"/"} className="text-2xl font-bold text-center w-full bg-gradient-to-r from-white via-red-500 to-pink-500 text-transparent bg-clip-text">
          To Do Master
        </Link>
        <hr className='my-3' />
      </div>

      <div className='flex flex-col gap-y-3 w-full'>
        <NavLink to={'/'} className={({ isActive }) => `p-2 text-white hover:bg-[#5b5b5b5b] rounded-md hover:text-white ${isActive ? 'bg-[#5b5b5b5b] text-white' : ''}`} >
          <span className='flex items-center gap-x-2 text-xl'>
            <MdOutlineDashboard />
            Dashboard
          </span>
        </NavLink>

        <NavLink to={'/tasks'} className={({ isActive }) => `p-2 text-white hover:bg-[#5b5b5b5b] rounded-md hover:text-white ${isActive ? 'bg-[#5b5b5b5b] text-white' : ''}`} >
          <span className='flex items-center gap-x-2 text-xl'>
            <FaTasks />
            Tasks
          </span>
        </NavLink>

        <NavLink to={'/categories'} className={({ isActive }) => `p-2 text-white hover:bg-[#5b5b5b5b] rounded-md hover:text-white ${isActive ? 'bg-[#5b5b5b5b] text-white' : ''}`} >
          <span className='flex items-center gap-x-2 text-xl'>
            <IoLayersOutline />
            Categories
          </span>
        </NavLink>
      </div>

      <button onClick={handleLogout} className='p-2 mt-auto flex items-center justify-center gap-x-3 text-xl text-white bg-red-500 w-full hover:bg-red-600 hover:cursor-pointer rounded-md hover:text-white'>
        <MdOutlineExitToApp />
        <span>
          Logout
        </span>
      </button>
    </div>
  )
}

export default Navbar