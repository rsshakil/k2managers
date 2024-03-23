import { useSelector } from 'react-redux'

const useAuth = () => {
    const auth = useSelector((state) => state.auth)

    return {
        user: auth.isLoggedIn ? auth.user : {},
        isLoggedIn: auth.isLoggedIn ? true : false,
        loading: auth.loading,

        role: auth.role ? auth.role : 'user',
    }
}

export default useAuth
