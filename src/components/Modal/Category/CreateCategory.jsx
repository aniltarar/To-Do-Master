import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { useUser } from '../../../hooks/useUser'
import { useDispatch } from 'react-redux'
import { createCategory } from '../../../redux/slices/categorySlice'
import ModalContainer from "../../Container/ModalContainer"

const CreateCategory = ({ setCreateIsOpen }) => {


    const closeModal = () => {
        setCreateIsOpen(false)
    }

    const [categoryColor, setCategoryColor] = useState('#000000') // Default color code

    const dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm()
    const user = useUser()

    const createCategorySubmit = (data) => {
        const categoryData = {
            uid: user.uid,
            categoryName: data.categoryName,
            categoryDescription: data.categoryDescription,
            categoryColor: categoryColor,
            tasks: [],
        }
        dispatch(createCategory(categoryData))

        closeModal()
    }

    // Handle color code change
    const handleColorChange = (e) => {
        setCategoryColor(e.target.value);
    }

    return (
        <ModalContainer>
            <div className="bg-[#262a33]  text-white p-6 rounded-lg shadow-lg w-full md:max-w-4xl  ">
                <div className="header flex items-center justify-between border-b pb-2">
                    <h1 className='text-xl font-semibold'>Create a Category</h1>
                    <button
                        className=" top-3 right-3 text-2xl text-gray-600 hover:text-black cursor-pointer"
                        onClick={closeModal}
                    >
                        <IoMdClose className='text-white hover:text-gray-500' />
                    </button>
                </div>

                <form className='flex flex-col gap-y-5 p-3 ' onSubmit={handleSubmit(createCategorySubmit)}>

                    <div className='flex flex-col gap-y-2'>
                        <label className='text-lg' htmlFor="categoryName">Category Name</label>
                        <input type="text" id='categoryName' className='rounded-md outline-1 px-2 py-2.5 text-md' placeholder='Category Name max 50 ch.' {...register('categoryName', {
                            required: { value: true, message: 'Field cannot be empty.' },
                            minLength: { value: 2, message: 'Category name must be at least 2 characters' },
                            maxLength: { value: 50, message: 'Category name must be at most 50 characters' }
                        })} />
                        {errors.categoryName && <span className='text-pink-500 font-semibold text-sm'>{errors.categoryName.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <label className='text-lg' htmlFor="categoryDescription">Category Description</label>
                        <textarea id='categoryDescription' className='rounded-md outline-1 px-2 py-2.5 text-md max-h-32 min-h-20' placeholder='Category Description max 50 ch.' {...register('categoryDescription', {
                            required: { value: true, message: 'Field cannot be empty.' },
                            minLength: { value: 2, message: 'Category description must be at least 2 characters' },
                            maxLength: { value: 100, message: 'Category description must be at most 100 characters' }
                        })} />
                        {errors.categoryDescription && <span className='text-pink-500 font-semibold text-sm'>{errors.categoryDescription.message}</span>}
                    </div>

                    <div className='flex flex-col gap-y-2 '>
                        <label htmlFor="categoryColor" className='text-lg'>Category Color</label>
                        <div className="flex gap-x-2 items-center justify-center  ">
                            <input
                                type="color"
                                id='categoryColor'
                                className='h-13 w-full min-w-1/2 '
                                value={categoryColor}
                                onChange={handleColorChange}
                            />
                            <input
                                type="text"
                                id='categoryColorCode'
                                className='rounded-md outline px-2 py-2.5 text-md min-w-1/2'
                                placeholder="Color Code"
                                value={categoryColor}
                                onChange={handleColorChange}
                            />
                        </div>
                        {errors.categoryColor && <span className='text-pink-500 font-semibold text-sm'>{errors.categoryColor.message}</span>}
                    </div>
                    <div className='flex items-center justify-around'>
                        {['#FF5733', '#33FF57', '#3357FF', '#F333FF', '#33FFF3'].map((color) => (
                            <div
                                key={color}
                                className="w-10 h-8 rounded-full cursor-pointer border border-white"
                                style={{ backgroundColor: color }}
                                onClick={() => setCategoryColor(color)}
                            />
                        ))}

                    </div>

                    <button type='submit' className='outline-1 text-black bg-white rounded-md px-4 py-2 hover:bg-[#1a1d23] hover:text-white hover:cursor-pointer transition-colors'>Create Category</button>

                </form>
            </div>
        </ModalContainer>
    )
}

export default CreateCategory
