import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { changeTitle, logOut, setLoading } from '../store/slice/authSlice';
import { NAVBAR_TITLES } from '../utilities/utilitiesText';

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

const useSession = (location) => {
    const pathname = location.pathname;
    const processing = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, loading, initial, csrf } = useSelector((state) => state.auth);
    const stopLoad = pathname === '/top';
    const csrf_token = document.querySelector('meta[name="csrf-token"]').content
        ? document.querySelector('meta[name="csrf-token"]').content
        : localStorage.getItem('csrf');
    let errorFlag = false;
    useEffect(() => {
        if (!(pathname.slice(1) == 'pwd_reset' && initial == true)) {
            if (processing.current) return;
            !stopLoad && dispatch(setLoading(true));
            if (!stopLoad) {
                processing.current = true;
                fetch(ENDPOINT, {
                    method: 'POST',
                    body: JSON.stringify({
                        path: pathname.slice(1),
                        csrf: csrf_token,
                    }),
                    headers: HEADERS,
                    credentials: 'include',
                    mode: 'cors',
                })
                .then((res) => res.json())
                .then((data) => {
                    if (!data.flag) throw new Error('unauthorized');
                    dispatch(setLoading(false));
                })
                .catch((err) => {
                    console.log(err);
                    errorFlag = true;
                    sessionStorage.clear();
                    dispatch(logOut());
                    navigate('/');
                })
                .finally(() => (processing.current = false));
            }
        }
    // }, [pathname, stopLoad, dispatch, location]);
    }, [pathname, stopLoad, dispatch, location]);

// console.log("useSession1 ===== " + pathname);
// console.log("useSession2 ===== " + stopLoad);
// console.log("useSession3 ===== " + dispatch);
// console.log("useSession4 ===== " + JSON.stringify(location));


    // change title for every page.
    useEffect(() => {
        const dynamicRouteArray = location.pathname.split('/'); // Ex-Route: account_edit/123
        const title = NAVBAR_TITLES.find(
            dynamicRouteArray.length > 2
                ? ({ pathname }) => `/${dynamicRouteArray[1]}` === pathname
                : ({ pathname }) => location.pathname === pathname
        );
        if (initial) dispatch(changeTitle('初期パスワード変更' || ''));
        else if (title?.text === '%project_name%')
            dispatch(changeTitle(sessionStorage.getItem('currentProjectName') || ''));
        else dispatch(changeTitle(title?.text || ''));
    }, [location, dispatch]);

    return { loading, initial, error };
};

export default useSession;
