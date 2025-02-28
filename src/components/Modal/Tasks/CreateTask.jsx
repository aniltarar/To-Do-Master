import React, { useState } from "react";
import ModalContainer from "../../Container/ModalContainer";
import { useForm } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import SubtaskBadge from "../../Task/SubtaskBadge";
import { useDispatch } from "react-redux";
import { createTask } from "../../../redux/slices/taskSlice";

const CreateTask = ({ categories, setCreateIsOpen, user }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [subTasks, setSubTasks] = useState([]);
    const dispatch = useDispatch();

    const closeModal = () => {
        setCreateIsOpen(false);
    };

    const createTaskSubmit = (data) => {
        const taskData = {
            taskName: data.taskName,
            taskDescription: data.taskDescription,
            category: {
                id: data.category,
                categoryName: categories.find((category) => category.id === data.category).categoryName,
                categoryColor: categories.find((category) => category.id === data.category).categoryColor,
            },
            subTasks: subTasks.map((subTask, index) => ({
                index,
                title: subTask,
                status: "pending",
            })),
            createdAt: new Date(),
            deadTime: new Date(data.deadTime),
            status: "pending",
            uid: user.uid,
        };

        dispatch(createTask(taskData));
        closeModal();

    };



    return (
        <ModalContainer>
            <div className="bg-[#262a33] text-white p-6 rounded-lg shadow-lg w-full md:max-w-4xl">
                <div className="header flex items-center justify-between border-b pb-2">
                    <h1 className="text-xl font-semibold">Create a Task</h1>
                    <button
                        className="text-2xl text-gray-600 hover:text-white cursor-pointer"
                        onClick={closeModal}
                    >
                        <IoMdClose />
                    </button>
                </div>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3" onSubmit={handleSubmit(createTaskSubmit)}>
                    {/* Task Name */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-lg" htmlFor="taskName">Task Name</label>
                        <input
                            type="text"
                            id="taskName"
                            className="rounded-md outline px-2 py-2.5 text-md"
                            placeholder="Task Name max 20 ch."
                            {...register("taskName", {
                                required: { value: true, message: "Field cannot be empty." },
                                maxLength: { value: 20, message: "Max 20 characters allowed." },
                            })}
                        />
                        {errors.taskName && <span className="text-red-500 text-sm">{errors.taskName.message}</span>}
                    </div>

                    {/* Category */}
                    <div className="flex flex-col gap-y-2">
                        <label className="text-lg" htmlFor="category">Category</label>
                        <select
                            id="category"
                            className="rounded-md outline px-2 py-2.5 text-md"
                            {...register("category", { required: { value: true, message: "Field cannot be empty." } })}
                        >
                            {categories.map((category) => (
                                <option className="text-black" key={category.id} value={category.id}>
                                    {category.categoryName}
                                </option>
                            ))}
                        </select>
                        {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}
                    </div>

                    {/* Task Description */}
                    <div className="flex flex-col gap-y-2 md:col-span-2">
                        <label className="text-lg" htmlFor="taskDescription">Task Description</label>
                        <textarea
                            id="taskDescription"
                            className="rounded-md outline px-2 py-2.5 text-md min-h-32 max-h-52"
                            placeholder="Task Description max 100 ch."
                            {...register("taskDescription", {
                                required: { value: true, message: "Field cannot be empty." },
                                maxLength: { value: 50, message: "Max 50 characters allowed." },
                            })}
                        />
                        {errors.taskDescription && <span className="text-red-500 text-sm">{errors.taskDescription.message}</span>}
                    </div>

                    {/* Sub Tasks */}
                    <div className="flex flex-col gap-y-2 md:col-span-2">
                        <label className="text-lg" htmlFor="subTasks">Sub Tasks</label>
                        <div className="flex items-center justify-between gap-x-2">


                            <input
                                type="text"
                                id="subTasks"
                                className="rounded-md outline px-2 py-2.5 text-md w-full"
                                placeholder="Sub Task Name"
                                onKeyDown={(e) => {
                                    if (e.target.value.length > 0 && e.key === "Enter") {
                                        e.preventDefault();
                                        setSubTasks([...subTasks, e.target.value]);
                                        e.target.value = "";
                                    }
                                }}
                            />
                            <button
                            type="button"
                                onClick = {()=>{
                                    if (document.getElementById('subTasks').value.length > 0){
                                        setSubTasks([...subTasks, document.getElementById('subTasks').value]);
                                        document.getElementById('subTasks').value = "";
                                    }
                                }}
                             className="bg-white cursor-pointer rounded-md text-black px-2 py-2.5 w-1/5 hover:bg-black hover:text-white outline">
                                Add
                            </button>



                        </div>
                        {subTasks.length === 0 && <span className="text-gray-400 text-xs">You should have at least 1 subtask.</span>}



                    </div>

                    {/* SubTask Badges */}
                    <div className="flex flex-wrap gap-2 md:col-span-2">
                        {subTasks.map((subTask, index) => (
                            <SubtaskBadge key={index} subTask={subTask} setSubTasks={setSubTasks} />
                        ))}
                    </div>

                    {/* Dead Time */}
                    <div className="flex flex-col col-span-2 gap-y-2">
                        <label className="text-lg" htmlFor="deadTime">Dead Time</label>
                        <input
                            type="date"
                            id="deadTime"
                            className="rounded-md outline px-2 py-2.5 text-md"
                            {...register("deadTime", {
                                required: { value: true, message: "Field cannot be empty. Choose another day later than today." },
                                validate: (value) => new Date(value) >= new Date(),

                            })}
                        />
                        {errors.deadTime && <span className="text-red-500 text-sm">{errors.deadTime.message}</span>}
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 flex justify-end">
                        <button
                            type="submit"
                            className="outline cursor-pointer w-full text-black bg-white rounded-md px-4 py-2 hover:bg-[#1a1d23] hover:text-white transition-colors"
                        >
                            Create Task
                        </button>
                    </div>
                </form>
            </div>
        </ModalContainer>
    );
};

export default CreateTask;
