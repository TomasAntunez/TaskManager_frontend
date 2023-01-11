import axios from "axios"
import { useState, useEffect, createContext } from "react"
import axiosClient from "../config/axios"

const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [ isLoading, setIsLoading ] = useState(true)
    const [ auth, setAuth ] = useState({})

    useEffect( () => {
        const authenticateUser = async () => {

            const token = localStorage.getItem('token')

            if(!token) {
                setIsLoading(false)
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const { data } = await axiosClient('/users/admin', config)
                setAuth(data)
                
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }

            setIsLoading(false)
        }

        authenticateUser()
    }, [])

    const signOff = () => {
        localStorage.removeItem('token')
        setAuth({})
    }

    const updateProfile = async profile => {
        const token = localStorage.getItem('token')
        if(!token) {
            setIsLoading(false)
            return
        }
 
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = `/users/admin/${profile._id}`
            await axiosClient.put(url, profile, config)

            return {
                msg: 'Successfully saved'
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    const savePassword = async password => {
        const token = localStorage.getItem('token')
        if(!token) {
            setIsLoading(false)
            return
        }

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const url = '/users/password'

            const { data } = await axiosClient.put(url, password, config)
            
            return { msg: data.msg }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }
        }
    }

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                isLoading,
                signOff,
                updateProfile,
                savePassword
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext