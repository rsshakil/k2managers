import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ItemData } from '../../utilities/projectBtnItemData';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import AppForm from '../../components/Form/App/AppForm';

const initialValues = {
    appName: '',
    appCode: '',
    appBaseName: '',
    appDomainId: '',
    appAPIDomainId: '',
    appAuthDomainId: '',
    appStatus: false,
    appBasicFlag: true,
    appBasicUser: '',
    appBasicPassword: '',
    memo: '',
    eventId: '',
};

const AppAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="APP > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <AppForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default AppAdd;
