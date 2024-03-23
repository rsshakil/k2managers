import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loader';
import Page960Body from '../../components/Page960/Page960Body';
import Wrapper from '../../components/Page960/Wrapper';
import { verifyOTP, logOut } from '../../store/slice/authSlice';
import './Verify.css';

const Verify = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const { register, handleSubmit } = useForm();
    const { loading, error, isLoggedIn } = auth;

    const onSubmit = async (value) => {
        try {
            const result = await dispatch(verifyOTP({ ...value })).unwrap();
            if (result.hasOwnProperty('passwordExpireLimit')) navigate('/expired_warn');
        } catch (e) {
            console.log('something went wrong.');
        }
    };

    useEffect(() => {
        if (isLoggedIn) navigate('/top', { replace: true });
    }, [isLoggedIn, navigate]);

    return (
        <>
            {loading && <Loading />}
            <Wrapper>
                <Page960Body>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex-container">
                        <div className="flex flex-col w-full">
                            <label className="label" htmlFor="account_id">
                                受信した認証コードを入力してください
                            </label>
                            <input
                                type="text"
                                {...register('code')}
                                className="v-code input border-all"
                                maxLength="6"
                            />
                        </div>
                        {/*  error message displayed */}
                        <span className={`form-error ${error ? 'visible' : 'invisible'}`}>
                            認証コードを確認してください
                        </span>
                        <Button type="submit" title="認証" />
                        <div className="form-error h-6"></div>
                        <Button
                            title={'ログアウト'}
                            onClick={() => {
                                sessionStorage.clear();
                                localStorage.clear();
                                dispatch(logOut());
                                navigate('/');
                            }}
                        />
                    </form>
                </Page960Body>
            </Wrapper>
        </>
    );
};

export default Verify;
