import axios from "axios"


const apiClient = axios.create({
    baseURL: 'http://localhost:8181',
    timeout: 6000
})

apiClient.interceptors.request.use(
    config=>{
        const token = localStorage.getItem('token')
        if(token) {
            config.headers.token =  token
        }
        return config
    },
    err=>{
        return Promise.reject(err)
    }
)

export const registerRequest = async(data)=>{
    try{
        return await apiClient.post('/user/register', data)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}

export const loginRequest = async(user)=>{
    try{
        return await apiClient.post('/user/login', user)
    }catch(err){
        return {
            error: true,
            err
        }
    }
}
export const newTask = async(data)=>{
    try {
        return await apiClient.post('/task/add', data)
    } catch (err) {
        return{
            error: true,
            err
        }
        
    }
}
export const updateTaskReq = async(id, task)=>{
    try {
        return await apiClient.put(`/task/uptd/${id}`, task)
        
    } catch (err) {
        return{
            error: true,
            err
        }
        
    }
}

export const deleteTaskReq = async(id)=>{
    try {
        return await apiClient.delete(`/task/delete/${id}`)
    } catch (err) {
        return{
            error: true,
            err
        }
        
    }
}

export const getTaskReq = async(id)=>{
    try {
        return await apiClient.get(`/task/get/${id}`)
    } catch (err) {
        return{
            error: true,
            err
        }
        
    }
}

export const getTasksReq = async()=>{
    try {
        return await apiClient.get(`/task/list`)
    } catch (err) {
        return{
            error: true,
            err
        }
        
    }
}

export const toggleTaskStatusReq = async (id, status) => {
    try {
        return await apiClient.put(`/task/uptd/${id}`, { status });
    } catch (err) {
        return {
            error: true,
            err
        };
    }
};