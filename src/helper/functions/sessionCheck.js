export const apiURL =
    process.env.NODE_ENV !== 'production'
        ? process.env.REACT_APP_CHECK_SESSION_LOCALHOST
        : process.env.REACT_APP_CHECK_SESSION_PRODUCTION;

const sessionCheckfromBackend = async () => {
    const method = 'POST';
    const headers = {
        'Content-Type': 'application/json',
        Accept: '*/*',
        'Access-Control-Allow-Origin': origin,
    };
    const response = await fetch(`${apiURL}`, {
        method: method.toUpperCase(),
        body: JSON.stringify({}),
        headers: headers,
        credentials: 'include',
        mode: 'cors',
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
    });
    const returnValue = await response.json();
    if (returnValue.isLocked) {
        window.location.replace('/account_lock');
    } else {
        if (!returnValue.flag) {
            window.location.replace(RedirectLink());
        }
    }
};

function RedirectLink() {
    const Link =
        process.env.NODE_ENV !== 'production'
            ? process.env.REACT_APP_URL_LOCALHOST
            : process.env.REACT_APP_URL_PRODUCTION;

    return Link;
}

export { RedirectLink, sessionCheckfromBackend };
