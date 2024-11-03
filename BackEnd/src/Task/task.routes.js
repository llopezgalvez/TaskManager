import { Router } from "express"
import { add, deleteTask, display, test, update, filter, getTask } from "./task.controller.js"
import { validateJwt } from "../middlewares/validate-jwt.js"

const api = Router()

//Admin Routes
api.get('/test', test)


//User Routes
api.post('/add' ,add)
api.put('/uptd/:id', update)
api.delete('/delete/:id', deleteTask)
api.get('/list',display)
api.get('/test', test)
api.post('/filt/status', filter)
api.get('/get/:id', getTask)

export default api