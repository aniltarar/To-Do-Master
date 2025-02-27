import React from 'react'
import ModalContainer from '../../Container/ModalContainer'
import { useDispatch } from 'react-redux'
import { IoMdClose, IoMdTrash } from 'react-icons/io'
import { deleteTask } from '../../../redux/slices/taskSlice'
import { useNavigate } from 'react-router-dom'

const DeleteTask = ({ task, setIsDeleteOpen }) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const closeModal = () => {
        setIsDeleteOpen(false)
    }


    const handleDeleteTask = () => {
        const data = {
            id: task.id,
            uid: task.uid
        }
        dispatch(deleteTask(data))
        setIsDeleteOpen(false)
        
        setInterval(()=>{
            navigate('/tasks')
        }, 1000)
    }

    //  id, uid ile silmece

    return (
        <ModalContainer>
            <div className='bg-[#262a33] text-white p-6 rounded-lg shadow-lg w-full max-w-4xl'>
                <div className='header flex items-center justify-between border-b pb-2'>
                    <h1 className='text-xl font-semibold'>Delete Task</h1>
                    <button
                        className='text-2xl text-gray-600 hover:text-white cursor-pointer'
                        onClick={closeModal}
                    >
                        <IoMdClose />
                    </button>
                </div>

                <div className='p-3'>
                    <p className='text-lg font-semibold'>Are you sure you want to delete this task?</p>
                    <div className='flex items-center justify-end gap-3 mt-5'>
                        <button
                            onClick={handleDeleteTask}
                            className='flex items-center justify-center gap-x-2 px-4 py-2 bg-red-500 rounded-md hover:bg-red-600'
                        >
                            <IoMdTrash />
                            <span>Delete</span>
                        </button>
                        <button
                            onClick={closeModal}
                            className='flex items-center justify-center gap-x-2 px-4 py-2 bg-white rounded-md text-black hover:bg-neutral-200'
                        >
                            <span>Cancel</span>
                        </button>
                    </div>
                </div>
            </div>

        </ModalContainer>
    )
}

export default DeleteTask