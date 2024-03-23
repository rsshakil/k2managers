import { useEffect } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import useSession from '../hooks/useSession'
import { useSelector } from 'react-redux'

const Protected = ({ redirectPath, children }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const path = redirectPath || '/'
    const { isLoggedIn } = useSelector((state) => state.auth)
    const { initial, error } = useSession(location)

    useEffect(() => {
        initial && navigate('/pwd_reset')
    }, [initial, navigate])

    if (!isLoggedIn || error) {
        return <Navigate to={path} replace />
    }
    return children
}

export default Protected
