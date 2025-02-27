import React from 'react';
import { IoMdTrash } from 'react-icons/io';
import { IoReload } from 'react-icons/io5';
import { MdDone } from 'react-icons/md';

const SubtaskDetailBox = ({ subTask, setSubtaskList }) => {
    const deleteSubTask = () => {
        setSubtaskList((prev) => prev.filter((task) => task !== subTask));
    };

    const toggleStatus = () => {
        setSubtaskList((prev) =>
            prev.map((task) =>
                task === subTask
                    ? { ...task, status: task.status === 'done' ? 'pending' : 'done' }
                    : task
            )
        );
    };

    return (
        <div
            className={`flex justify-between items-center gap-x-4 p-4 rounded-xl shadow-md transition-all duration-300 
                ${subTask.status === 'done' ? 'bg-gray-500 text-blue-300' : 'bg-gray-700 text-gray-300'}
            `}
        >
            <p
                className={`text-lg font-medium transition-all duration-300 
                    ${subTask.status === 'done' ? 'line-through opacity-50' : 'opacity-100'}`}
            >
                {subTask.title}
            </p>

            <div className='flex items-center gap-x-3'>
                <button
                    className='p-2 rounded-lg transition-transform duration-300 
                        hover:scale-110 bg-gray-700 hover:bg-gray-600'
                    onClick={toggleStatus}
                >
                    {subTask.status === 'done' ? (
                        <IoReload size={24} className='text-white rotate-0 hover:rotate-180 transition-all duration-500' />
                    ) : (
                        <MdDone size={24} className='text-green-400' />
                    )}
                </button>

                <button
                    className='p-2 rounded-lg transition-transform duration-300 
                        hover:scale-110 bg-gray-700 hover:bg-gray-600'
                    onClick={deleteSubTask}
                >
                    <IoMdTrash size={24} className='text-red-500' />
                </button>
            </div>
        </div>
    );
};

export default SubtaskDetailBox;
