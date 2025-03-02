import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTaskById, updateTask, updateTaskSubtasks } from '../../redux/slices/taskSlice';
import { useForm } from 'react-hook-form';
import { IoMdArrowBack, IoMdClose, IoMdTrash } from 'react-icons/io';
import { MdEdit } from 'react-icons/md';
import SubtaskDetailBox from '../../components/Task/SubtaskDetailBox';
import { FaSave } from 'react-icons/fa';
import { useUser } from '../../hooks/useUser';
import DeleteTask from '../../components/Modal/Tasks/DeleteTask';
import toast from 'react-hot-toast';


const TaskDetail = () => {
    const { id } = useParams();
    const user = useUser();
    const dispatch = useDispatch();
    const { currentTask } = useSelector(state => state.task);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const { taskName, category, deadTime, createdAt, taskDescription, subTasks } = currentTask || {};
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    


    const [subtaskList, setSubtaskList] = useState([]);


    const handleEditSubmit = (data) => {
        
        const updatedTask = {
            id,
            uid: user.uid,
            ...data
        }
        dispatch(updateTask(updatedTask));
        setIsEditOpen(false);
    }

    const handleSaveChanges = () => {
        if(subtaskList.length === 0) {
            toast.error("You should have at least 1 subtask.");
            return;
        }
        const updatedTask = {
            id,
            uid: user.uid,
            subTasks: subtaskList,
            status: currentTask?.status
        }
        dispatch(updateTaskSubtasks(updatedTask));
    }


    useEffect(() => {
        dispatch(getTaskById(id));
    }, [dispatch, id,]);

    useEffect(() => {
        if (subTasks) {
            setSubtaskList(subTasks);
        }
    }, [subTasks, currentTask]);

    return (
        <div className='flex flex-col w-full gap-y-6 p-6  text-white min-h-screen'>
            {
                isDeleteOpen && <DeleteTask task={currentTask} setIsDeleteOpen={setIsDeleteOpen} />
            }
            {/* Header */}
            <div className='flex items-center justify-between border-b pb-3'>
                <button
                    className='flex items-center gap-x-3 text-xl font-semibold hover:bg-gray-700 hover:cursor-pointer px-4 py-2 rounded-lg transition-all'
                    onClick={() => navigate(-1)}>
                    <IoMdArrowBack size={24} />
                    <span>Back to Tasks</span>
                </button>
            </div>

            <form onSubmit={handleSubmit(handleEditSubmit)} className='flex gap-6  md:flex-row flex-col w-full '>
                {/* Task Details */}
                <div className='flex flex-col gap-y-6 bg-gray-900 p-6 rounded-lg  shadow-lg border w-full md:w-2/3 '>
                    {/* Task Header */}
                    <div className='flex justify-between items-start'>
                        <div className='flex flex-col gap-y-3'>
                            {isEditOpen ? (
                                <input
                                    {...register('taskName', { required: true })}
                                    defaultValue={taskName}
                                    className='bg-gray-70 p-1 text-2xl font-semibold rounded-md w-full outline'
                                />
                            ) : (
                                <h1 className='text-2xl p-1 font-semibold'>{taskName}</h1>
                            )}
                            <span className='flex items-center gap-x-3 text-sm'>
                                <span className='px-2 py-0.5 rounded-md font-semibold border' style={{ borderColor: category?.categoryColor }}>
                                    {category?.categoryName}
                                </span>
                                <span>Created At: {createdAt?.toDate().toLocaleDateString('tr-TR')}</span>
                            </span>
                        </div>
                        {
                            isEditOpen ? (
                                <IoMdClose
                                    size={24}
                                    className='cursor-pointer'
                                    onClick={() => setIsEditOpen(false)}
                                />
                            ) : (
                                <MdEdit
                                    size={24}
                                    className='cursor-pointer'
                                    onClick={() => setIsEditOpen(true)}
                                />
                            )
                        }
                    </div>
                    {/* Task Description */}
                    <div className='flex flex-col gap-y-2'>
                        <h2 className='text-lg font-semibold'>Description</h2>
                        {isEditOpen ? (
                            <textarea
                                {...register('taskDescription', { required: { value: true, message: 'Task Description is required' }, maxLength: { value: 50, message: 'Task Description must be less than 50 characters' } })}
                                defaultValue={taskDescription}
                                placeholder='Task Description max 50 characters'
                                className='bg-transparent text-lg rounded-md p-2 w-full max-h-16 outline resize-none'
                            ></textarea>


                        ) : (
                            <p className='text-lg'>{taskDescription}</p>
                        )}
                    </div>
                    {
                        errors.taskDescription && <span className='text-red-500'>{errors.taskDescription.message}</span>
                    }
                    {/* Task Footer */}
                    <div className='flex justify-between items-center'>
                        <div className='text-sm flex gap-x-3'>
                            <span>End Time: {deadTime?.toDate().toLocaleDateString('tr-TR')}</span>
                            <span>Days Left: {Math.ceil((deadTime?.seconds * 1000 - Date.now()) / (1000 * 60 * 60 * 24))}</span>
                        </div>
                        {isEditOpen && (
                            <button type='submit' className='flex items-center self-end gap-x-2 px-4 py-2 bg-white text-black rounded-md hover:bg-black hover:text-white transition-all hover:scale-110 cursor-pointer'>
                                <FaSave size={24} className=' transition-all' />
                                Save Changes
                            </button>
                        )}
                    </div>
                </div>
                {/* Task Summary */}
                <div className='w-full md:w-1/3 bg-gray-900 p-6 rounded-lg shadow-lg flex flex-col gap-y-4 border'>
                    <h2 className='text-xl font-semibold'>Task Summary</h2>
                    <div className='flex justify-between text-sm'>
                        <span>Subtask Count: {subTasks?.length}</span>
                        <span>Completed: {subTasks?.filter(subTask => subTask?.status === 'done').length}</span>
                    </div>
                    <div className='w-full  border-3  bg-gray-600 rounded-full h-10'>
                        <div
                            className='h-full rounded-full  '
                            style={{ width: `${(subTasks?.filter(subTask => subTask?.status === 'done').length / subTasks?.length) * 100}%`, backgroundColor: category?.categoryColor }}
                        ></div>

                    </div>
                    <h2 className='text-center text-3xl font-semibold'>{((subTasks?.filter(subTask => subTask?.status === 'done').length / subTasks?.length) * 100).toFixed(2)} %</h2>
                </div>
            </form>

            {/* Subtasks */}
            <div className={`flex flex-col gap-y-6 bg-gray-900 p-6 rounded-lg border  ${subtaskList.length==0 ? "border-2 border-red-500 ": "border"} ` }>
                <h2 className='text-2xl font-semibold'>Subtasks</h2>
                <hr />
                <div className='flex flex-col md:flex-row items-center gap-2  '>

                    <input type="text" placeholder='Write any subtask and press "enter" for add subtask.'
                        className={`p-2 outline w-full rounded-md  ${subtaskList.length==0 ? "border-2 border-red-500 outline-0 animate-pulse": "border"} `}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                setSubtaskList([...subtaskList, { title: e.target.value, status: 'pending', index: subtaskList.length }])
                                e.target.value = ''
                            }
                        }}
                    />

                    <button
                        type="button"
                        onClick={() => {
                            setSubtaskList([...subtaskList, { title: 'New Subtask', status: 'pending', index: subtaskList.length }])
                        }}
                        className="bg-white cursor-pointer rounded-md text-black px-2 py-2.5 w-full md:w-1/5 hover:bg-black hover:text-white outline">
                        Add
                    </button>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    {subtaskList?.map((subTask, index) => (
                        <SubtaskDetailBox key={index} subTask={subTask} setSubtaskList={setSubtaskList} />
                    ))}
                </div>

                <div className='flex items-center justify-end gap-x-5'>
                    <button onClick={() => setIsDeleteOpen(true)} className='flex items-center self-end gap-x-2 px-4 py-2 bg-red-500 text-white rounded-md cursor-pointer hover:bg-red-600  transition-all hover:scale-110'>
                        <IoMdTrash size={24} className=' transition-all' />
                        Delete Task
                    </button>

                    <button onClick={handleSaveChanges} className='flex items-center self-end gap-x-2 px-4 py-2 bg-white text-black rounded-md cursor-pointer hover:bg-black hover:text-white transition-all hover:scale-110'>
                        <FaSave size={24} className=' transition-all' />
                        Save Changes
                    </button>
                </div>

            </div>
        </div>
    );
};

export default TaskDetail;
