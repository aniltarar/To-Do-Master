import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logoutUser } from '../../redux/slices/authSlice'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { MdOutlineDashboard, MdOutlineExitToApp, MdMenu, MdClose } from 'react-icons/md'
import { FaRegUserCircle, FaTasks } from 'react-icons/fa'
import { IoLayersOutline } from 'react-icons/io5'
import { useUser } from '../../hooks/useUser'


const Sidebar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useUser();
  const [isOpen, setIsOpen] = useState(true)

  const handleLogout = () => {
    setTimeout(() => {
      dispatch(logoutUser())
      toast.success('Çıkış işlemi başarılı')
      navigate('/')
    }, 1000)
  }

  return (

    <div className={`bg-[#303236] sticky top-0 border-r h-screen flex flex-col pt-5 ${isOpen ? 'w-3xs' : 'w-20'} transition-all duration-400`}>

      <div className='w-full flex  px-2  '>
        <Link className={`${isOpen ? "block" : "hidden"}`} to='/'>
          <h1 className='text-2xl font-bold text-center w-full bg-gradient-to-r from-white via-red-500 to-pink-500 text-transparent bg-clip-text'>To-Do Master</h1>
        </Link>
        <button className={`w-full flex items-center  gap-2 p-3 rounded-md ${isOpen ? "justify-end" : "justify-center"} hidden lg:flex `}>
          {isOpen ? <MdClose onClick={() => setIsOpen(!isOpen)} className='text-white text-2xl cursor-pointer' /> : <MdMenu onClick={() => setIsOpen(!isOpen)} className='text-white text-2xl cursor-pointer' />}
        </button>
      </div>

      <div className='flex flex-col  gap-5  w-full p-3 mt-5'>

        <NavLink to={'/'} className={({ isActive }) => `p-2 text-white w-full flex items-center ${isOpen ? "justify-start" : "justify-center"} hover:bg-[#5b5b5b] rounded-md hover:text-white ${isActive ? 'bg-[#5b5b5b] text-white ' : ''}`} >
          <span className='flex items-center  gap-x-2 text-xl'>
            <MdOutlineDashboard size={30} />
            <p className={isOpen ? "block " : "hidden "}>Dashboard</p>
          </span>
        </NavLink>

        <NavLink to={'/tasks'} className={({ isActive }) => `p-2 text-white w-full flex items-center ${isOpen ? "justify-start" : "justify-center"} hover:bg-[#5b5b5b] rounded-md hover:text-white ${isActive ? 'bg-[#5b5b5b] text-white ' : ''}`} >
          <span className='flex items-center gap-x-2 text-xl '>
            <FaTasks size={30} />

            <p className={isOpen ? "block " : "hidden "}>Tasks</p>
          </span>
        </NavLink>

        <NavLink to={'/categories'} className={({ isActive }) => `p-2 text-white w-full flex items-center ${isOpen ? "justify-start" : "justify-center"} hover:bg-[#5b5b5b] rounded-md hover:text-white ${isActive ? 'bg-[#5b5b5b] text-white ' : ''}`} >
          <span className='flex items-center gap-x-2 text-xl '>
            <IoLayersOutline size={30} />
            <p className={isOpen ? "block " : "hidden "}>Categories</p>
          </span>
        </NavLink>
      </div>

      <div className='flex flex-col items-center gap-5 w-full mt-auto bg-[#5b5b5b] p-3 rounded-md border-t border-[#303236]'>
        {/* Kullanıcı Bilgisi */}
        <span className='flex items-center justify-start gap-x-5 text-white text-xl'>
          <FaRegUserCircle size={30} />
          <p className={isOpen ? "block" : "hidden"}>{user?.displayName}</p>
        </span>

        {/* Çıkış Butonu */}
        <button onClick={handleLogout} className='flex items-center w-full  justify-around text-xl p-2 bg-red-500 text-white rounded-md hover:bg-red-600 cursor-pointer'>
          <MdOutlineExitToApp size={30} />
          <p className={isOpen ? "block" : "hidden"}>Logout</p>
        </button>
      </div>


    </div>

  )
}

export default Sidebar
