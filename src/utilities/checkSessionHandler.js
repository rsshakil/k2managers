const HEADERS = {
    'Content-Type': 'application/json',
    Accept: '*/*',
    'Access-Control-Allow-Origin': origin,
    Authorization: 'Bearer ' + localStorage.getItem('token'),
};

const ENDPOINT =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_CHECK_SESSION_LOCALHOST
        : process.env.REACT_APP_CHECK_SESSION_PRODUCTION;

const csrf_token = document.querySelector('meta[name="csrf-token"]').content
    ? document.querySelector('meta[name="csrf-token"]').content
    : localStorage.getItem('csrf');

export const checkSessionHandler = async () => {
    const response = await fetch(ENDPOINT, {
        method: 'POST',
        body: JSON.stringify({
            csrf: csrf_token,
        }),
        headers: HEADERS,
        credentials: 'include',
        mode: 'cors',
    });
    return response.json();
};
