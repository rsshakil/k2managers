import Cookies from 'js-cookie'

export const apiURL =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_AUTH_URL_LOCALHOST
        : process.env.REACT_APP_AUTH_URL_PRODUCTION
        
export const origin =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_AUTH_URL_LOCALHOST
        : process.env.REACT_APP_AUTH_URL_PRODUCTION

const makeRequest = (url, method = 'GET', info = {}, auth) =>
    new Promise(async (resolve, reject) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': origin
            }

            info.sessionID = Cookies.get('sessionId')
            const parameter = {
                method: method.toUpperCase(),
                body: JSON.stringify(info),
                headers: headers,
                credentials: 'include',
                mode: 'cors'
            }
            const response = await fetch(`${apiURL}${url}`, parameter)
            const result = await response.json()
            if (result.error) throw new Error(result.error)

            if (result.csrf) {
                document.querySelector('meta[name="csrf-token"]').setAttribute('content', result.csrf)
                localStorage.setItem("csrf", result.csrf)
                delete result.csrf
            }
            if (result.token) {
                localStorage.setItem("token", result.token)
            }
            if (result.refresh_token) {
                localStorage.setItem("refresh_token", result.refresh_token)
            }
            resolve(result)
        } catch (error) {
            reject(error.message)
        }
    })

export default makeRequest
