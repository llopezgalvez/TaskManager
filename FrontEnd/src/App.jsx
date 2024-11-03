import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AddTask } from './components/AddTask'
import { TaskProvider } from './context/TaskContext'
import { Navbar } from './components/Navbar'
import { Task } from './components/Task'
import { Login } from './components/Login/Login'
import { Register } from './components/Login/Register'

import './App.css'

function App() {

  return (

    <div>
      <TaskProvider>
        <BrowserRouter>
          <main className='container mx-auto px-10'>
            <Navbar />
            <Routes>
              <Route path='/' element={<Task />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/addTask' element={<AddTask />} />
              <Route path='/task/uptd/:id' element={<AddTask />} />
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </div>
  )
}

export default App
