import Cookies from 'js-cookie';

const makeRequest2 = (url, method, info = {}) => {
    let record = new Promise(async (resolve, reject) => {
        try {
            const headers = {
                'Content-Type': 'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': origin,
            };
            info.sessionID = Cookies.get('sessionId');

            const response = await fetch(`${url}`, {
                method: method.toUpperCase(),
                body: JSON.stringify(info),
                headers: headers,
                credentials: 'include',
                mode: 'cors',
            });

            const result = await response.json();
            if (result.error) throw new Error(result.error);
            resolve(result);
        } catch (error) {
            reject(error.message);
        }
    });

    return record;
};
export default makeRequest2;
