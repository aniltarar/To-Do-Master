import React from 'react'

const SubtaskBadge = ({ subTask, setSubTasks }) => {

    const deleteSubTask = () => {
        setSubTasks((prev) => prev.filter((task) => task !== subTask))
    }



    return (
        <div onClick={deleteSubTask} className='px-2 py-1 border rounded-md bg-white text-black hover:bg-red-300  hover:line-through hover:cursor-pointer'>{subTask}</div>
    )
}

export default SubtaskBadge