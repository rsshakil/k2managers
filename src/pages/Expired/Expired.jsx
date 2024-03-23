import React, { useEffect } from 'react';
import '../FirstLogin/FirstLogin.css'
import Page960Body from "../../components/Page960/Page960Body";
import Wrapper from "../../components/Page960/Wrapper";
import ContentWrapper from "../../components/Wrapper/ContentWrapper";

const Expired = () => {
    useEffect(() => sessionStorage.clear(), [])

    return (
        <ContentWrapper>
            <Wrapper>
                <Page960Body>
                    <div className='flex flex-col w-full'>
                        {/*expired screen messege*/}
                        <p
                            className='flex text-left warning mb-[16px] font-bold'>
                            パスワードの有効期限が切れています。
                        </p>
                        <p
                            className='flex text-left warning mb-[15rem] font-bold'>
                            システム管理者までお問い合わせください。
                        </p>
                    </div>
                </Page960Body>
            </Wrapper>
        </ContentWrapper>
    );
}

export default Expired
