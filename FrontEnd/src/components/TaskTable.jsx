
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import { useState } from "react";
import './TaskTable.css'


dayjs.extend(utcPlugin);

export const TaskTable = () => {
    const { deleteTask, getTasks, tasks, toggleTaskStatus } = useTasks();

    useEffect(() => {
        getTasks();
    }, [getTasks]);

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="bg-zinc-700 px-6 py-3 text-white">Status</th>
                        <th scope="col" className="bg-zinc-700 px-6 py-3 text-white">Task</th>
                        <th scope="col" className="bg-zinc-700 px-6 py-3 text-white">Description</th>
                        <th scope="col" className="bg-zinc-700 px-6 py-3 text-white">Date Start</th>
                        <th scope="col" className="bg-zinc-700 px-6 py-3 text-white">Date End</th>
                        <th scope="col" className="bg-zinc-700 px-6 py-3 text-white">Employee</th>
                        <th scope="col" className="bg-zinc-700 px-6 py-3 text-white"></th>
                    </tr>
                </thead>
                <tbody>
                    {tasks && tasks.length > 0 ? (
                        tasks.map(task => (
                            <tr key={task._id} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 ${task.status ? 'completed' : ''}`}>                                <td className="px-6 py-4 whitespace-nowrap">
                                <div>
                                    <input
                                        type="checkbox"
                                        checked={task.status}
                                        onChange={() => toggleTaskStatus(task._id)}
                                    />
                                    {task.status && <span className="ml-2 text-green-600">Complete</span>}
                                </div>
                            </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">{task.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">{task.description}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        {dayjs(task.start).utc().format("DD/MM/YYYY")}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">
                                        {dayjs(task.end).utc().format("DD/MM/YYYY")}
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-900 dark:text-white">{task.empleado}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <Link to={`/task/uptd/${task._id}`}className={task.status ? 'disabled-button' : ''}>Edit</Link>
                                    <button
                                        onClick={() => {
                                            deleteTask(task._id);
                                            window.location.reload();
                                        }}
                                        className="text-zinc-500 hover:underline mr-1 ml-5"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7" className="text-center py-4">
                                No tasks available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
