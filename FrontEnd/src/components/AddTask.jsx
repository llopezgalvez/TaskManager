import { Link } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import { useEffect } from "react";

//FECHA
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)


export const AddTask = () => {

    const { register, handleSubmit, setValue } = useForm();
    const { createTask, getTask, updateTask } = useTasks()
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await getTask(params.id)
                console.log(task)
                setValue('title', task.title)
                setValue('description', task.description)
                setValue('start', dayjs.utc(task.start).format("YYYY-MM-DD"))
                setValue('end', dayjs.utc(task.end).format("YYYY-MM-DD"))
                setValue('empleado', task.empleado)
            }
        }
        loadTask()
    }, [])


    const onSubmit = handleSubmit((data) => {
        if (params.id) {
            updateTask(params.id, {
                ...data,
            })
        } else {
            createTask({
                ...data,
                date: dayjs.utc(data.start, data.end).format(),

            })
        }
        navigate('/')

    })
    return (
        <div className="flex h-[calc(70vh-100px)] items-center justify-center">

            <div className="bg-zinc-700 max-w-md w-full p-8 h-50 mt-12 rounded-md">
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        {...register("title")}

                        className="w-full bg-neutral-600	 text-while px-4 py-2 rounded-md my-2"
                        autoFocus
                    />

                    <textarea rows="4"
                        placeholder="Description"
                        {...register("description")}
                        className="w-full bg-neutral-600	 text-while px-4 py-2 rounded-md my-2"
                    ></textarea>
                    <label htmlFor="">Date Start</label>
                    <input type="date"
                        placeholder="Date Start"
                        {...register("start")}
                        className="w-full bg-neutral-600	 text-while px-4 py-2 rounded-md my-2"
                    />
                    <label htmlFor="">Date End</label>
                    <input type="date"
                        placeholder="Date End"
                        {...register("end")}
                        className="w-full bg-neutral-600	 text-while px-4 py-2 rounded-md my-2"
                    />

                    <input
                        type="text"
                        placeholder="Empleado"
                        {...register("empleado")}
                        className="w-full bg-neutral-600	 text-while px-4 py-2 rounded-md my-2"
                        autoFocus
                    />

                    <div className="mt-10">
                        <button onSubmit={onSubmit} class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Save</button>
                    </div>
                    <div >
                        <Link to='/'><button  class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Cancel</button></Link>
                    </div>
                </form>
            </div>
        </div>
    )
}
