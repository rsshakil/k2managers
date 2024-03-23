import React from 'react'
import { Navigate } from 'react-router-dom'

const IsLocked = ({children}) => {
    const firstLogin = true
    if (firstLogin) {
        return <Navigate to={'/first_login'} replace />
    }
    return children
}

export default IsLocked