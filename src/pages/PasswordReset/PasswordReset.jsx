import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Loading from '../../components/Loading/Loader';
import Page960Body from '../../components/Page960/Page960Body';
import Wrapper from '../../components/Page960/Wrapper';
import { errorMessages } from '../../lib/errorMessages';
import RegularExpression from '../../lib/regularExpression';
import { changePassword, changeTitle, clearError, logOut } from '../../store/slice/authSlice';
import './PasswordReset.css';

const PasswordReset = () => {
    // Destructure Regular Expression
    const { passwordValidation } = RegularExpression;

    const [eye, setEye] = useState(false);
    const [eye2, setEye2] = useState(false);
    const toggleEye = () => {
        setEye((prevState) => !prevState);
    };
    const toggleEye2 = () => {
        setEye2((prevState) => !prevState);
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { info, passState, update, initial, code } = useSelector((state) => state.auth);
    // ユーザーが存在しない or ユーザーのセッションが無効の場合ログアウトする

    useEffect(() => {
        dispatch(clearError());
    }, []);

    if (code == 'E001' || code == 'E002') {
        sessionStorage.clear();
        dispatch(logOut());
    }
    // アカウントロックの場合アカウントロック画面へ飛ばす
    else if (code == 'E003') {
        // return <AccountLock />
        sessionStorage.clear();
        navigate('/account_lock');
    }
    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
    } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const onSubmit = (value) => dispatch(changePassword(value));

    useEffect(() => {
        passState === 'success' && navigate('/top', { replace: true });
    }, [navigate, update, passState, dispatch]);

    useEffect(() => {
        initial && dispatch(changeTitle('初期パスワード変更'));
    }, [initial, dispatch]);

    return (
        <>
            {passState === 'pending' && <Loading />}
            <Wrapper>
                <Page960Body>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-col w-full">
                            <label className="text-red" htmlFor="account_id">
                                ID
                            </label>
                            <input
                                defaultValue={info?.accountId}
                                {...register('accountId')}
                                className="read-only border-all cursor-default pointer-events-none"
                                readOnly={true}
                                tabIndex="-1"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="label">現在のパスワード</label>
                            <input
                                className="input border-all"
                                type="password"
                                {...register('oldPassword', { required: true })}
                                maxLength="32"
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="label"> 新しいパスワード</label>
                            <div className="flex justify-between">
                                <input
                                    className="input border-all w-full"
                                    type={eye ? 'text' : 'password'}
                                    {...register('newPassword', {
                                        required: true,
                                        pattern: passwordValidation,
                                    })}
                                    maxLength="32"
                                />
                                {/* eye icon added*/}
                                <span className="eyeStyle" onClick={toggleEye}>
                                    {eye ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col w-full margin">
                            <label className="label">新しいパスワード（確認）</label>
                            <div className="flex justify-between">
                                <input
                                    className="input border-all w-full"
                                    type={eye2 ? 'text' : 'password'}
                                    {...register('confirmNewPassword', {
                                        required: true,
                                        validate: (v) => {
                                            const { newPassword } = getValues();
                                            return v === newPassword;
                                        },
                                    })}
                                    maxLength="32"
                                    autoComplete="new-password"
                                />
                                {/* eye icon added*/}
                                <span className="eyeStyle" onClick={toggleEye2}>
                                    {eye2 ? <AiFillEye /> : <AiFillEyeInvisible />}
                                </span>
                            </div>
                        </div>

                        <div className="hidden"></div>

                        {passState === 'error' ? (
                            code === 'E004' ? (
                                <span className="form-error">
                                    {/* Can not use last three password (W_PASSWORD_04)*/}
                                    {errorMessages.W_PASSWORD_07}
                                    {/*パスワードは過去3回に使用したものと同じパスワードを設定できません*/}
                                </span>
                            ) : (
                                <span className="form-error">
                                    {/* Can not use last three password (W_PASSWORD_04)*/}
                                    {errorMessages.W_PASSWORD_04}
                                    {/*パスワードは過去3回に使用したものと同じパスワードを設定できません*/}
                                </span>
                            )
                        ) : errors.oldPassword ? (
                            <span className="form-error">
                                {/* W_PASSWORD_01 Check your current password. */}
                                {errorMessages.W_PASSWORD_01}
                                {/* 現在のパスワードを確認してください */}
                            </span>
                        ) : errors.newPassword ? (
                            <span className="form-error">
                                {/* W_PASSWORD_02 The new password must be at least 8 characters, and at least one character from small/capital/number/symbol each. */}
                                {errorMessages.W_PASSWORD_02}
                                {/* 新しいパスワードは8文字以上で半角英大小・数字のうち、それぞれ1文字以上を含む必要があります */}
                            </span>
                        ) : errors.confirmNewPassword ? (
                            <span className="form-error">
                                {/* W_PASSWORD_03 The new password and the new password (confirmation) do not match. */}
                                {errorMessages.W_PASSWORD_03}
                                {/* 新しいパスワードと新しいパスワード（確認）が一致していません */}
                            </span>
                        ) : (
                            <div className="form-error h-6"></div>
                        )}

                        <Button type="submit" title={'パスワード変更'} />
                        <div className="form-error h-6"></div>
                        <Button
                            title={'ログアウト'}
                            onClick={() => {
                                sessionStorage.clear();
                                dispatch(logOut());
                            }}
                        />
                    </form>
                </Page960Body>
            </Wrapper>
        </>
    );
};

export default PasswordReset;
