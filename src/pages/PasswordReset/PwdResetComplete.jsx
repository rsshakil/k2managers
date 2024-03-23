import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Page960Body from '../../components/Page960/Page960Body';
import Wrapper from '../../components/Page960/Wrapper';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';

const PwdResetComplete = () => {
    const navigate = useNavigate();

    return (
        <ContentWrapper>
            <Wrapper>
                <Page960Body>
                    <div className="flex flex-col w-full text-center mb-[14rem]">
                        <p className="font-bold">パスワードの変更が正常に完了しました。</p>
                    </div>
                    <div className="cursor-pointer" onClick={() => navigate('/top')}>
                        <Button title="TOP" />
                    </div>
                </Page960Body>
            </Wrapper>
        </ContentWrapper>
    );
};

export default PwdResetComplete;
