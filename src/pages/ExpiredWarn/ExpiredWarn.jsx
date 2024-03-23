import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Page960Body from "../../components/Page960/Page960Body";
import Wrapper from "../../components/Page960/Wrapper";
import ContentWrapper from "../../components/Wrapper/ContentWrapper";
import '../FirstLogin/FirstLogin.css';

const ExpiredWarn = () => {
    const navigate = useNavigate()
    const {limit} = useSelector((state) => state.auth)
    return (
        <ContentWrapper>
            <Wrapper>
                <Page960Body>
                    <div className='flex flex-col w-full message'>
                        {/*password expired warning*/}
                        <p className='font-bold'>
                            パスワードの有効期限が近づいています。
                        </p>
                        <p className='flex font-bold text-left warning w-margin'>
                            あと{limit}日で有効期限が切れます。
                        </p>
                        <p className='flex font-bold text-left warning'>
                            期限が切れる前にパスワードの変更を行ってください。
                        </p>
                    </div>
                    <div className='cursor-pointer' onClick={() => navigate('/pwd_reset')}>
                        <Button title='確認'/>
                    </div>
                </Page960Body>
            </Wrapper>
        </ContentWrapper>
    );
}

export default ExpiredWarn
