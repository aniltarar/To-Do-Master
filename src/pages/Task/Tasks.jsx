import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useUser } from '../../hooks/useUser'
import CreateTask from '../../components/Modal/Tasks/CreateTask'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/slices/categorySlice'

const Tasks = () => {

  const user = useUser()
  const dispatch = useDispatch()

  const [createIsOpen, setCreateIsOpen] = useState(false)
  const { categories } = useSelector((state) => state.category)


  useEffect(() => {
    dispatch(getCategories(user.uid))
  },[])


  return (

    <>
      <div className='flex flex-col w-full gap-y-5'>
        {
          createIsOpen && <CreateTask setCreateIsOpen={setCreateIsOpen} categories={categories} user={user} />
        }

        <div className='flex items-center justify-between border-b pb-3'>
          <h1 className='text-3xl font-semibold'>Tasks</h1>
          <button onClick={() => setCreateIsOpen(true)} className='flex items-center justify-center gap-x-3 px-3 py-2 rounded-md bg-white text-black text-xl hover:bg-neutral-200 cursor-pointer'>
            <IoMdAdd />
            <span>Add Tasks</span>
          </button>
        </div>

      </div>
    </>

  )
}

export default Tasks