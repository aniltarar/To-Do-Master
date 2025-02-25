import { useState } from "react"
import DeleteCategory from '../../components/Modal/DeleteCategory'
import UpdateCategory from "../Modal/UpdateCategory"
const CategoryBox = ({ category }) => {


    const [deleteIsOpen, setDeleteIsOpen] = useState(false)
    const [editIsOpen, setEditIsOpen] = useState(false)

    const { categoryName, categoryColor, tasks, categoryDescription } = category

    return (
        <>


            <div className="flex flex-col gap-y-5 p-3 bg-[#303236] rounded-md">
                {
                    deleteIsOpen && <DeleteCategory category={category} setIsDeletedOpen={setDeleteIsOpen} />
                }
                {
                    editIsOpen && <UpdateCategory category={category} setEditIsOpen={setEditIsOpen} />
                }
                <div className="flex items-center justify-between border-b pb-2 ">
                    <h1 className="text-xl font-semibold">{categoryName.slice(0, 1).toUpperCase().concat(categoryName.slice(1))}</h1>
                    <span style={{ backgroundColor: categoryColor }} className="w-1/6 h-8 rounded-full border border-black"></span>
                </div>
                <p className="text-sm">{categoryDescription}</p>


                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-2 w-1/3">
                        <button onClick={()=>setEditIsOpen(true)} className="bg-yellow-500  text-white w-full hover:bg-yellow-600 py-1  rounded-md hover:cursor-pointer">Edit</button>
                        <button onClick={() => setDeleteIsOpen(true)} className="bg-red-500 text-white w-full hover:bg-red-600 py-1  rounded-md hover:cursor-pointer">Delete</button>
                    </div>

                    <p className="text-sm text-end">Tasks in this category : {tasks.length}</p>
                </div>

            </div>
        </>
    )
}

export default CategoryBox