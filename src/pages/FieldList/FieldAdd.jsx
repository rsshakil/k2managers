import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import { ItemData } from '../../utilities/projectBtnItemData';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import FieldForm from '../../components/Form/FieldForm';

const initialValues = {
    fieldName: '',
    fieldManageName: '',
    fieldOverview: '',
    fieldDescription: '',
    fieldType: '',
    filterId: '',
    numberOfJoinedField: '',
    memo: '',
};
const FieldAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="フィールド > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <FieldForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default FieldAdd;
