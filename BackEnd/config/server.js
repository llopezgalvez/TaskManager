import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import {config} from "dotenv"
import userRoutes from '../src/User/user.routes.js'
import taskRoutes from '../src/Task/task.routes.js'

const server = express()
config()
const port = process.env.PORT || 2080

server.use(express.json())
server.use(express.urlencoded({ extended : true }))
server.use(cors())
server.use(morgan('dev'))
server.use(helmet())
server.use('/user', userRoutes)
server.use('/task', taskRoutes)

export const initServer = () =>{
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}