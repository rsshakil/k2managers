import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import { DateTime, Settings } from 'luxon'
import makeRequest from './fetch'
import parsedCookie from './getCookie'

Settings.defaultZone = 'Japan'

const refresher = () => {
    const { access } = parsedCookie
    const { exp, accountId } = jwtDecode(access)
    if (!accountId) return
    const diffTime = exp * 1000 - DateTime.now().toMillis()
    const delayTime = diffTime - 60000 // 5min

    return setInterval(async () => {
        await makeRequest('/auth/refresh', 'POST', {}, Cookies.get('refresh'))
    }, delayTime) // call the callback while 5min validity remaining
}

export default refresher
