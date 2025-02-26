import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import CreateCategory from '../../components/Modal/Category/CreateCategory'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/slices/categorySlice'
import { useUser } from '../../hooks/useUser'
import CategoryBox from '../../components/Category/CategoryBox'


const Categories = () => {

  const [createIsOpen, setCreateIsOpen] = useState(false)

  const dispatch = useDispatch()
  const user = useUser()

  const { categories } = useSelector((state) => state.category)




  useEffect(() => {
    dispatch(getCategories(user.uid))
  }, [])



  return (
    <>

      {
        createIsOpen && <CreateCategory setCreateIsOpen={setCreateIsOpen} />

      }


      <div className='flex flex-col  w-full gap-y-5'>

        <div className='flex items-center justify-between border-b pb-3'>
          <h1 className='text-3xl font-semibold'>Categories</h1>

          <button onClick={() => setCreateIsOpen(true)} className='flex items-center justify-center gap-x-3 px-3 py-2 rounded-md bg-white text-black text-xl hover:bg-neutral-200 cursor-pointer'>
            <IoMdAdd />
            <span>Add Category</span>
          </button>
        </div>
        {
          categories?.length === 0 &&
          <div className='flex flex-col gap-y-3 items-center justify-center h-64'>
            <h1 className='text-2xl font-semibold'>You don't have any Category.</h1>
            <button onClick={() => setCreateIsOpen(true)} className='flex items-center justify-center gap-x-3 px-3 py-2 rounded-md bg-white text-black text-xl hover:bg-neutral-200 cursor-pointer'>
              <IoMdAdd />
              <span>Add Category</span>
            </button>
          </div>
        }
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 '>
          {
            categories.map((category) => (
              <CategoryBox category={category} key={category.id} />
            ))
          }



        </div>

      </div>
    </>
  )
}

export default Categories