import axios from "axios";
import { createContext, useContext, useState } from "react"
import { newTask, getTasksReq, deleteTaskReq, getTaskReq, updateTaskReq, toggleTaskStatusReq } from "../sevices/api";

const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext)

    if (!context) {
        throw new Error("useTasks must be used within a TaskProvider")
    }
    return context
}

export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([])

    const getTasks = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No se ha encontrado un token de autenticación.');
            }
            
            // Obtener las tareas del usuario actual utilizando el token de autenticación
            const res = await getTasksReq(token); // Suponiendo que getTasksReq toma el token como argumento
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    }
    const createTask = async (task) => {
        const res = await newTask(task)
        console.log(res)
    }

    const deleteTask = async (id) => {
        try {
            const res = await deleteTaskReq(id)
            if (res.status === 204) setTasks(tasks.filter(task => task._id !== id))
        } catch (error) {
            console.log(error)
        }

    }

    const updateTask = async (id, task, completed) => {
        try {
            task.completed = completed; // Actualiza la propiedad "completed"
            await updateTaskReq(id, task); // Envía la tarea actualizada

            // Actualiza el estado local si es necesario
            if (dispatch) {
                dispatch(updateTaskAction(task)); // Ejemplo de actualización del estado local
            }
        } catch (error) {
            console.log(error)
        }
    }

    const toggleTaskStatus = async (id) => {
        try {
            const task = tasks.find(t => t._id === id)
            const updatedTask = await toggleTaskStatusReq(id, !task.status)
            setTasks(tasks.map(t => (t._id === id ? updatedTask.data.updatedTask : t)))
        } catch (error) {
            console.error("Failed to toggle task status", error)
        }
    }

    

    const getTask = async (id) => {
        try {
            const res = await getTaskReq(id);
            return res.data
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <TaskContext.Provider value={{ tasks, createTask, getTasks, deleteTask, getTask, updateTask, toggleTaskStatus }}>
            {children}
        </TaskContext.Provider>
    )
}
