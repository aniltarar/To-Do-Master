import React, { useState } from 'react'
import ModalContainer from '../../Container/ModalContainer'
import { IoMdClose } from 'react-icons/io'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { updateCategory } from '../../../redux/slices/categorySlice'



const UpdateCategory = ({ category, setEditIsOpen }) => {

    const closeModal = () => {
        setEditIsOpen(false)
    }

    const [categoryColor, setCategoryColor] = useState(category.categoryColor)
    const dispatch = useDispatch();

    const handleColorChange = (e) => {
        setCategoryColor(e.target.value);
    }

    const { register, handleSubmit } = useForm()



    const handleEditSubmit = (data) => {
        const updatedCategory = {
            ...category,
            categoryName: data.categoryName,
            categoryDescription: data.categoryDescription,
            categoryColor: categoryColor
        }
        dispatch(updateCategory(updatedCategory))
        closeModal()

    }

    return (
        <ModalContainer>
            <div className="bg-[#262a33] text-white p-6 rounded-lg shadow-lg w-full md:max-w-4xl  ">
                <div className="header flex items-center justify-between border-b pb-2">
                    <h1 className='text-xl font-semibold'>Update Category - {category.categoryName}</h1>
                    <button
                        className=" top-3 right-3 text-2xl text-gray-600 hover:text-black cursor-pointer"
                        onClick={closeModal}
                    >
                        <IoMdClose className='text-white hover:text-gray-500' />
                    </button>
                </div>

                <form className='flex flex-col gap-y-5 p-3 ' onSubmit={handleSubmit(handleEditSubmit)}>
                    <div className='flex flex-col gap-y-2'>
                        <label className='text-lg' htmlFor="categoryName">Category Name</label>
                        <input type="text" id='categoryName' className='rounded-md outline-1 px-2 py-2.5 text-md' placeholder='Category Name max 20 ch.' {...register('categoryName', {
                            required: { value: true, message: 'Field cannot be empty.' },
                            maxLength: { value: 20, message: 'Max 20 characters allowed.' }
                        })} defaultValue={category.categoryName} />
                    </div>

                    <div className='flex flex-col gap-y-2'>
                        <label className='text-lg' htmlFor="categoryDescription">Category Description</label>
                        <textarea id='categoryDescription' className='rounded-md outline-1 px-2 py-2.5 text-md' placeholder='Category Description max 100 ch.' {...register('categoryDescription', {
                            required: { value: true, message: 'Field cannot be empty.' },
                            maxLength: { value: 100, message: 'Max 100 characters allowed.' }
                        })} defaultValue={category.categoryDescription} />
                    </div>

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

                    <button type='submit' className='bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600'>Update Category</button>
                </form>





            </div>
        </ModalContainer>
    )
}

export default UpdateCategory