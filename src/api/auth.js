import Cookies from 'js-cookie'
import makeRequest from '../lib/fetch'

export const loginUser = async (info) => {
    return makeRequest('/auth/signin', 'POST', info, Cookies.get('access'))
}

export const verifyToken = async (info) => {
    return await makeRequest(
        '/auth/verify-otp',
        'POST',
        info,
        Cookies.get('token')
    )
}

export const passwordChange = async (info) => {
    return await makeRequest(
        '/auth/change-password',
        'POST',
        {
            oldPassword: info.oldPassword,
            newPassword: info.newPassword,
        },
        Cookies.get('access')
    )
}

export const checkAuth = async (info) => {
    return await makeRequest(
        '/auth/getUserData',
        'POST',
        info,
        Cookies.get('access')
    )
}

export const clearUser = async (info) => {
    return await makeRequest('/auth/signout', 'POST', info)
}
