import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useUser } from '../../hooks/useUser'
import CreateTask from '../../components/Modal/Tasks/CreateTask'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/slices/categorySlice'
import { getTasks } from '../../redux/slices/taskSlice'
import TaskBox from '../../components/Task/TaskBox'

const Tasks = () => {

  const user = useUser()
  const dispatch = useDispatch()

  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const { categories } = useSelector((state) => state.category)
  const { tasks } = useSelector((state) => state.task)


  const filteredTasks = tasks.filter((task) => {
    if (selectedStatus === 'all' && selectedCategory === 'all') {
      return task
    } else if (selectedStatus === 'all' && selectedCategory !== 'all') {
      return task.category.categoryName === selectedCategory
    } else if (selectedStatus !== 'all' && selectedCategory === 'all') {
      return task.status === selectedStatus
    }
    else {
      return task.status === selectedStatus && task.category.categoryName === selectedCategory
    }
  })



  useEffect(() => {
    dispatch(getTasks(user.uid))
    dispatch(getCategories(user.uid))
  }, [])

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

        {/* Select and Status Section */}
        <div className='flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between'>

          {/* Status */}
          <div className='flex p-1 rounded-md bg-[#3f4043] gap-x-1 '>
            <button onClick={() => setSelectedStatus("all")} className={`px-4 py-2 hover:cursor-pointer rounded-md  text-white  ${selectedStatus == "all" ? "bg-[#262a33]" : ""}`}>All</button>
            <button onClick={() => setSelectedStatus("pending")} className={`px-4 py-2 hover:cursor-pointer rounded-md  text-white  ${selectedStatus == "pending" ? "bg-[#262a33]" : ""}`}>Pending</button>
            <button onClick={() => setSelectedStatus("progress")} className={`px-4 py-2 hover:cursor-pointer rounded-md  text-white  ${selectedStatus == "progress" ? "bg-[#262a33]" : ""}`}>In Progress</button>
            <button onClick={() => setSelectedStatus("done")} className={`px-4 py-2 hover:cursor-pointer rounded-md  text-white  ${selectedStatus == "done" ? "bg-[#262a33]" : ""}`}>Done</button>
          </div>

          {/* Category */}
          <div className='flex  p-1 rounded-md bg-[#3f4043]'>
            <select className='px-4 py-2 bg-transparent text-white cursor-pointer rounded-md focus:outline-none'
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}>
              <option value='all' className='bg-[#3f4043] text-white '>All Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.categoryName} className='bg-[#3f4043] text-white'>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
        </div>


        {/* Tasks */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 '>
          {
            filteredTasks.map((task) => (
              <TaskBox key={task.id} task={task} />
            ))
          }
        </div>



      </div>
    </>
  )
}

export default Tasks
