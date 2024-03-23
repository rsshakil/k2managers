import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Page960Body from '../../components/Page960/Page960Body';
import Wrapper from '../../components/Page960/Wrapper';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';

const PwdResetFailure = () => {
    const navigate = useNavigate();
    return (
        <ContentWrapper>
            <Wrapper>
                <Page960Body>
                    <div className="flex flex-col w-full mb-[16rem]">
                        {/* error messege if password change failed 3 times */}
                        <p className="flex text-left warning">パスワードの変更を3回間違えた為、ログアウトします。</p>
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate('/')}>
                        <Button title="ログイン画面へ戻る" />
                    </div>
                </Page960Body>
            </Wrapper>
        </ContentWrapper>
    );
};

export default PwdResetFailure;
