import React, { createContext, useContext, useState, useEffect } from 'react'

const DarkModeContext = createContext()

export const DarkModeProvider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('darkMode') === 'true'
    })

    useEffect(() => {
        localStorage.setItem('darkMode', darkMode)
        if (darkMode) {
            document.documentElement.classList.add('dark')
            document.body.style.backgroundColor = '#111827'
            document.body.style.color = '#f3f4f6'
        } else {
            document.documentElement.classList.remove('dark')
            document.body.style.backgroundColor = '#ffffff'
            document.body.style.color = '#181A1E'
        }
    }, [darkMode])

    const toggleDarkMode = () => setDarkMode(prev => !prev)

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    )
}

export const useDarkMode = () => useContext(DarkModeContext)
