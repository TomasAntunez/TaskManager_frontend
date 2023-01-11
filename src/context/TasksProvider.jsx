import { useState, useEffect, createContext } from "react"
import axiosClient from "../config/axios"

const TasksContext = createContext()

const TasksProvider = ({children}) => {

    const [ tasks, setTasks ] = useState([])
    const [ task, setTask ] = useState({})

    useEffect( () => {
        const getTasks = async () => {
            
            try {
                const token = localStorage.getItem('token')
                if( !token ) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await axiosClient('/tasks', config)
                setTasks(data)

            } catch (error) {
                console.log(error)
            }
        }

        getTasks()
    }, [])

    const saveTask = async task => {

        const token = localStorage.getItem('token')
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if( task.id ) {
            try {
                const { data } = await axiosClient.put(`/tasks/${task.id}`, task, config)
                
                const updatedTasks = tasks.map( taskState => taskState._id === data._id
                    ? data
                    : taskState    
                )
                setTasks(updatedTasks)

            } catch (error) {
                console.log(error.response.data.msg)
            }
            return
        }

        try {
            const { data } = await axiosClient.post('/tasks', task, config)
            setTasks([data, ...tasks])

        } catch (error) {
            console.log(error.response.data.msg)
        }
    }

    const setEdition = task => {
        setTask(task)
    }

    const deleteTask = async id => {
        const confirmed = confirm('Do you want to delete this task?')

        if( confirmed ) {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                await axiosClient.delete(`/tasks/${id}`, config)
                
                const updatedTasks = tasks.filter( taskState => taskState._id !== id )
                setTasks(updatedTasks)

            } catch (error) {
                console.log(error)
            }

        }
    }

    return (
        <TasksContext.Provider
            value={{
                tasks,
                saveTask,
                task,
                setEdition,
                deleteTask
            }}
        >
            {children}
        </TasksContext.Provider>
    )
}

export {
    TasksProvider
}

export default TasksContext