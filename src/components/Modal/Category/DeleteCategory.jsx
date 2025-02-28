import React from 'react'
import ModalContainer from '../../Container/ModalContainer'
import { IoMdClose } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../redux/slices/categorySlice';

const DeleteCategory = ({ setIsDeletedOpen, category }) => {

    const closeModal = () => {
        setIsDeletedOpen(false)
    }

    const dispatch = useDispatch();

    const delCategoryService = () => {

        dispatch(deleteCategory(category))
        closeModal()
    }



    return (
        <>
            <ModalContainer>
                <div className="bg-[#262a33] text-white p-6 rounded-lg shadow-lg w-full md:max-w-4xl  ">
                    <div className="header flex items-center justify-between border-b pb-2">
                        <h1 className='text-xl font-semibold'>Delete Category - {category.categoryName}</h1>
                        <button
                            className=" top-3 right-3 text-2xl text-gray-600 hover:text-black cursor-pointer"
                            onClick={closeModal}
                        >
                            <IoMdClose className='text-white hover:text-gray-500' />
                        </button>
                    </div>
                    <div className='flex flex-col gap-y-5 p-3 w-full '>
                        <p>Are you sure you want to delete this category? If you delete this category, the tasks in it will also be deleted. </p>
                        <div className='flex justify-end gap-x-2 w-full'>
                            <button onClick={delCategoryService} className='bg-red-500 text-white  w-1/5 hover:bg-red-600 py-1  rounded-md hover:cursor-pointer'>Delete</button>
                            <button onClick={closeModal} className='bg-gray-500 text-white w-1/5  hover:bg-gray-600 py-1  rounded-md hover:cursor-pointer'>Cancel</button>
                        </div>
                    </div>
                </div>
            </ModalContainer>

        </>
    )
}

export default DeleteCategory