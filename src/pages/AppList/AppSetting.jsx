import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import AppSettingForm from '../../components/Form/App/AppSettingForm';
import { ItemData } from '../../utilities/projectBtnItemData';

const AppSetting = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="APP > app_setting" className="mt-4 text-blue-50 font-bold" />
            <AppSettingForm initialValues={{}} formType="add" />
        </>
    );
};
export default AppSetting;
