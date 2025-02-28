import React from 'react'
import { useNavigate } from 'react-router-dom'

const TaskBox = ({ task }) => {

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/tasks/${task.id}`)
    }


    return (
        <div onClick={handleClick} className='flex flex-col bg-gray-900 hover:bg-gray-700 p-5 rounded-lg shadow-lg border border-white gap-y-3 cursor-pointer '>
            <div className='flex items-center justify-between'>
                <h1 className='text-xl font-semibold'>{task?.taskName}</h1>
                <span style={{ borderColor: task?.category.categoryColor }} className='px-2 py-0.5 rounded-md font-semibold border  '>{task?.category.categoryName}</span>
            </div>
            <p className='text-sm '>{task?.taskDescription}</p>

            <div className='flex items-center justify-between gap-x-2'>
                <span className='text-sm'>Sub Tasks : {
                    task.subTasks.filter(subTask => subTask.status === 'done').length
                } / {task?.subTasks.length}</span>
                <span className='text-sm'>Total Status: {task?.status} </span>
            </div>

            <div className='w-full bg-gray-200 rounded-full h-2.5'>
                <div
                    className='h-2.5 rounded-full'
                    style={{ width: `${(task.subTasks.filter(subTask => subTask.status === 'done').length / task.subTasks.length) * 100}%`, backgroundColor: task.category.categoryColor }}
                ></div>
            </div>
            <div className='flex items-center justify-between gap-x-2 border-t pt-2'>
                <span className='text-sm'>Created: {new Date(task.createdAt.seconds * 1000).toLocaleDateString()}</span>
                <span className='text-sm'>Deadline: {new Date(task.deadTime.seconds * 1000).toLocaleDateString()}</span>
                <span className='text-sm'>
                    Days Left: {Math.ceil((task.deadTime.seconds * 1000 - Date.now()) / (1000 * 60 * 60 * 24))}
                </span>
            </div>



        </div>
    )
}

export default TaskBox