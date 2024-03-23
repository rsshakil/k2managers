import { useEffect, useLayoutEffect } from 'react';
import CacheBuster from 'react-cache-buster';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/Loading/Loader';
import AccountLock from '../pages/AccountLock/AccountLock';
import Expired from '../pages/Expired/Expired';
import Router from '../routes/Router';
import { checkUserToken } from '../store/slice/authSlice';
import { loadMessages, locale } from 'devextreme/localization';
import jaMessages from 'devextreme/localization/messages/ja.json';
import { disableAltArrow, disableAltArrowRemove } from '../utilities/disableAltArrow';
import Modal from 'react-modal'

const PRODUCTION = process.env.NODE_ENV?.trim() === 'production';
const VERSION = '0.1.0';
Modal.setAppElement('#root');

const App = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const { initialLoading, isLocked, expired } = auth;
    useEffect(() => {
        dispatch(checkUserToken());
    }, [dispatch]);

    useLayoutEffect(() => {
        disableAltArrow();
        if(process.env.NODE_ENV === 'production') window.console.log = () => {}
        return () => disableAltArrowRemove();
    }, []);

    // devExtreme用日本語ローカライズ
    loadMessages({
        ja: {
            'dxFilterBuilder-addCondition': '条件追加',
            'dxFilterBuilder-addGroup': '階層追加',
            'dxFilterBuilder-enterValueText': '値を入力してください',
        },
    });
    loadMessages(jaMessages);
    locale(navigator.language);

    if (initialLoading) return <Loading />;
    if (isLocked) return <AccountLock />;
    if (expired) return <Expired />;

    return PRODUCTION ? (
        <CacheBuster
            currentVersion={VERSION}
            isEnabled={PRODUCTION} //If false, the library is disabled.
            isVerboseMode={false} //If true, the library writes verbose logs to console.
            loadingComponent={<Loading />} //If not pass, nothing appears at the time of new version check.
        >
            <Router />
        </CacheBuster>
    ) : (
        <Router />
    );
};

export default App;
