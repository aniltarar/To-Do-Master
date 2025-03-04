import React, { useEffect, useState } from 'react'
import { IoMdAdd } from 'react-icons/io'
import { useUser } from '../../hooks/useUser'
import CreateTask from '../../components/Modal/Tasks/CreateTask'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../../redux/slices/categorySlice'
import { getTasks } from '../../redux/slices/taskSlice'
import TaskBox from '../../components/Task/TaskBox'
import toast from 'react-hot-toast'

const Tasks = () => {

  const user = useUser()
  const dispatch = useDispatch()

  const [createIsOpen, setCreateIsOpen] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortType, setSortType] = useState('newest')

  const { categories } = useSelector((state) => state.category)
  const { tasks ,status} = useSelector((state) => state.task)


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


  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortType === 'newest') {
      return a.deadTime > b.deadTime ? -1 : 1
    } else {
      return a.deadTime < b.deadTime ? -1 : 1
    }
  })

  const handleAddTask = () => {
    console.log("handle dişarda");
    if (categories.length > 0) {
      setCreateIsOpen(true)
    } else {
      toast.error("You should have at least 1 category to create a task.")
    }
  }


  useEffect(() => {
    dispatch(getTasks(user.uid))
    dispatch(getCategories(user.uid))
  }, [])
  
  if(status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen w-full gap-y-5">
        <h1 className="text-3xl font-semibold">Loading...</h1>
      </div>
    )
  }




  return (
    <>
    {
      createIsOpen && <CreateTask categories={categories} setCreateIsOpen={setCreateIsOpen} user={user} />
    }
     
      <div className='flex flex-col w-full gap-y-5'>
        <div className='flex items-center justify-between border-b pb-3'>
          <h1 className='text-3xl font-semibold'>Tasks</h1>
          <button onClick={handleAddTask} className='flex items-center justify-center gap-x-3 px-3 py-2 rounded-md bg-white text-black text-xl hover:bg-neutral-200 cursor-pointer'>
            <IoMdAdd />
            <span>Add</span>
          </button>
        </div>

        {/* Select and Status Section */}
        <div className='flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between '>

          {/* Status */}
          <div className='flex p-1 rounded-md bg-[#3f4043] gap-x-1 '>
            <button onClick={() => setSelectedStatus("all")} className={`px-4 py-2 hover:cursor-pointer rounded-md  text-white  ${selectedStatus == "all" ? "bg-[#262a33]" : ""}`}>All</button>
            <button onClick={() => setSelectedStatus("pending")} className={`px-4 py-2 hover:cursor-pointer rounded-md  text-white  ${selectedStatus == "pending" ? "bg-[#262a33]" : ""}`}>Pending</button>
            <button onClick={() => setSelectedStatus("progress")} className={`px-4 py-2 hover:cursor-pointer rounded-md  text-white  ${selectedStatus == "progress" ? "bg-[#262a33]" : ""}`}>In Progress</button>
            <button onClick={() => setSelectedStatus("done")} className={`px-4 py-2 hover:cursor-pointer rounded-md  text-white  ${selectedStatus == "done" ? "bg-[#262a33]" : ""}`}>Done</button>
          </div>

          <div className='flex gap-5'>
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
            {/* Newest, Oldest */}
            <div className='flex  p-1 rounded-md bg-[#3f4043]'>
              <select className='px-4 py-2 bg-transparent text-white cursor-pointer rounded-md focus:outline-none'
                value={sortType}
                onChange={(e) => setSortType(e.target.value)}>
                <option value='newest' className='bg-[#3f4043] text-white '>Furthest</option>
                <option value='oldest' className='bg-[#3f4043] text-white '>Nearest</option>
              </select>
            </div>
          </div>

        </div>

        {
          
                    sortedTasks?.length === 0 &&
                    <div className='flex flex-col gap-y-3 items-center justify-center h-64'>
                      <h1 className='text-2xl font-semibold'>You don't have any Task.</h1>
                      <button onClick={handleAddTask} className='flex items-center justify-center gap-x-3 px-3 py-2 rounded-md bg-white text-black text-xl hover:bg-neutral-200 cursor-pointer'>
                        <IoMdAdd />
                        <span>Add Task</span>
                      </button>
                    </div>
                  
        }


        {/* Tasks */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 '>
          {
            sortedTasks.map((task) => (
              <TaskBox key={task.id} task={task} />
            ))
          }
        </div>



      </div>
    </>
  )
}

export default Tasks
