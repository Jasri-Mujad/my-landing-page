import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Check if user is already logged in
        const token = localStorage.getItem('authToken')
        if (token) {
            setIsAuthenticated(true)
        }
        setLoading(false)
    }, [])

    const login = async (username, password) => {
        const result = await api.login(username, password)
        if (result.success) {
            localStorage.setItem('authToken', result.token)
            setIsAuthenticated(true)
            return true
        }
        return false
    }

    const logout = async () => {
        await api.logout()
        localStorage.removeItem('authToken')
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
