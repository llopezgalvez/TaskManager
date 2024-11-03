'use strict'
import Task from './task.model.js'

export const test = (req, res) => {
    try {
        return res.send({ message: 'Test running...' })
    } catch (error) {
        console.error(error)
    }
}

export const add = async (req, res) => {
    try {
        let data = req.body
        data.status = false
        if(data.title === '' || data.description === '' || data.start === '' || data.end === ''){
            return res.status(400).send({ message: 'Please fill all required fields' })
        }
        let task = new Task(data)
        await task.save()
        return res.send({ message: 'task adding successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error adding a task', error })
    }
}

export const update = async (req, res) => {
    try {
        let data = req.body
        let { id } = req.params
        let updateTask = await Task.findOne({ _id: id })
        if (!updateTask) return res.send({ message: 'Taks not exist || not found' })

        if(data.title === '' || data.description === '' || data.status === ''){
            return res.status(400).send({ message: 'Please fill all required fields' })
        }
        console.log(typeof data.status)
        
        let updatedTask = await Task.findOneAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        return res.send({ message: 'Task updated successfully', updatedTask })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error updating task', error })
    }
}

export const deleteTask = async (req, res) => {
    try {
        let { id } = req.params
        let deleteTask = await Task.findOneAndDelete({ _id: id })
            if (!deleteTask) return res.send({ message: 'Task not exists || not found' })
            return res.send({ message: 'Task deleted successfully' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error deleting a task', error })
    }
}

export const display = async (req, res) => {
    try {
        let task = await Task.find()
        return res.send(task)
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error displaying tasks', error })
    }
}

export const getTask = async (req, res) =>{
    const task = await Task.findById(req.params.id)
    if (!task) return res.status(404).json
    res.json(task)
}

export const filter = async (req, res) => {
    try {
        let { search } = req.body

        if (search.toString() !== 'false' && search.toString() !== 'true') {
            return res.status(400).send({ message: 'You can only enter true or false' })
        }

        let tasks = await Task.find({
            status: search
        })

        if (tasks.length == 0) return res.status(404).send({ message: `There are no tasks ${search}` })
        return res.send({ message: 'Tasks found', tasks })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error displaying task', error })
    }
}