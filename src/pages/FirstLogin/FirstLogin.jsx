import React from 'react';
import { useNavigate } from 'react-router';
import Button from '../../components/Button/Button';
import Page960Body from '../../components/Page960/Page960Body';
import Wrapper from '../../components/Page960/Wrapper';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';
import './FirstLogin.css';

const FirstLogin = () => {
    const navigate = useNavigate();

    return (
        <ContentWrapper>
            <Wrapper>
                <Page960Body>
                    <div className="flex-container">
                        <div className="flex flex-col w-full text-center mb-[14rem]">
                            <p className="font-bold">初回ログインの為、パスワードを変更して下さい。</p>
                        </div>
                        <div className="cursor-pointer" onClick={() => navigate('/pwd_reset')}>
                            <Button title="確認" />
                        </div>
                    </div>
                </Page960Body>
            </Wrapper>
        </ContentWrapper>
    );
};

export default FirstLogin;
