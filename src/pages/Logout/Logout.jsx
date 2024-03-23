import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../components/Loading/Loader';
import { logOut } from '../../store/slice/authSlice';

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        sessionStorage.clear();
        localStorage.clear();
        dispatch(logOut());
        window.location.href = '/'
    }, []);

    return (
        <div className="flex justify-center items-center min-h-screen w-screen">
            <Loader />
        </div>
    );
};

export default Logout;
