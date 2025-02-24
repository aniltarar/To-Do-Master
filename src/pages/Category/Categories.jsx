import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import CreateCategory from '../../components/Modal/CreateCategory'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/slices/categorySlice'
import { useUser } from '../../hooks/useUser'

const Categories = () => {

  const [createIsOpen, setCreateIsOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useUser()

  const {categories} = useSelector((state)=>state.category)

  console.log(categories);


  useEffect(() => {
    dispatch(getCategories(user.uid))
  }, [])



  return (
    <>

      {
        createIsOpen && <CreateCategory setCreateIsOpen={setCreateIsOpen} />

      }

      <div className='flex flex-col w-full'>

        <div className='flex items-center justify-between border-b pb-3'>
          <h1 className='text-3xl font-semibold'>Categories</h1>

          <button onClick={() => setCreateIsOpen(true)} className='flex items-center justify-center gap-x-3 px-3 py-2 rounded-md bg-white text-black text-xl hover:bg-neutral-200 cursor-pointer'>
            <IoMdAdd />
            <span>Add Category</span>
          </button>

        </div>

      </div>
    </>
  )
}

export default Categories