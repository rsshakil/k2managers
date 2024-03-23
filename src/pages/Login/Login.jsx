import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loader';
import Page960Body from '../../components/Page960/Page960Body';
import Wrapper from '../../components/Page960/Wrapper';
import { errorMessages } from '../../lib/errorMessages';
import { changeTitle, fetchUser } from '../../store/slice/authSlice';
import './Login.css';

const redirectPath = sessionStorage.getItem('href') || '/top';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const processing = useRef(false);

    // const versions = process.env.REACT_APP_VERSIONS;

    const { loading, error, isLoggedIn, initial } = auth;
    const { register, handleSubmit } = useForm({ reValidateMode: 'onSubmit' });
    const onSubmit = async (value) => {
        if (processing.current) return;
        processing.current = true;
        try {
            const result = await dispatch(fetchUser(value)).unwrap();
            if (result.mfa) navigate('/verify');
            else if (result.hasOwnProperty('passwordExpireLimit')) navigate('/expired_warn');
        } catch (e) {
            console.log(e.message);
        } finally {       
            processing.current = false;   
        } 
    };

    const [eye, setEye] = useState(false);
    const toggleEye = () => {
        setEye((prevState) => !prevState);
    };

    useEffect(() => {
        dispatch(changeTitle('ログイン'));
        if (isLoggedIn) navigate(redirectPath, { replace: true });
    }, [isLoggedIn, navigate, redirectPath]);

    return (
        <>
            {loading && <Loading />}
            <Wrapper>
                {/* content body elements starts */}
                <Page960Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col w-full">
                            <label className="text-red" htmlFor="email">
                                ID
                            </label>
                            <input type="text" className="input border-all" id="email" {...register('accountId')} />
                        </div>
                        <div className="flex flex-col w-full margin">
                            <label className="label" htmlFor="password">
                                パスワード
                            </label>
                            <div className="flex justify-between">
                                <input
                                    type={eye ? 'text' : 'password'}
                                    id="password"
                                    {...register('password')}
                                    className="input border-all tracking-tighter w-full"
                                />
                                <span className="eyeStyle" onClick={toggleEye}>
                                    {eye ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </span>
                            </div>
                        </div>
                        <div className={error ? 'visible' : 'invisible'}>
                            <span className="form-error">
                                {/*ID、パスワードを確認してください*/}
                                {errorMessages.W_LOGIN_01}
                            </span>
                        </div>
                        <Button type="submit" title="ログイン" />
                    </form>
                </Page960Body>
                {/* <div className="versions">{versions}</div> */}
            </Wrapper>
        </>
    );
};
export default Login;
