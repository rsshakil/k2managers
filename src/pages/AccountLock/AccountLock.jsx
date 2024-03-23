import React, { useEffect } from 'react';
import Page960Body from '../../components/Page960/Page960Body';
import Wrapper from '../../components/Page960/Wrapper';
import ContentWrapper from '../../components/Wrapper/ContentWrapper';

const AccountLock = () => {
    useEffect(() => sessionStorage.clear(), []);

    return (
        <ContentWrapper>
            <Wrapper>
                <Page960Body>
                    <div className="flex flex-col w-full">
                        <p className="flex text-left warning font-bold mb-[16px]">
                            このアカウントはロックされています。
                        </p>
                        <p className="flex text-left warning font-bold mb-[15rem]">
                            システム管理者までお問い合わせください。
                        </p>
                    </div>
                </Page960Body>
            </Wrapper>
        </ContentWrapper>
    );
};

export default AccountLock;
