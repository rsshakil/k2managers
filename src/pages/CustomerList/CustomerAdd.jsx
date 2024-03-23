import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import CustomerForm from '../../components/Form/CustomerForm';
import { ItemData } from '../../utilities/projectBtnItemData';

const initialValues = { customerName: '', memo: '' };
const CustomerAdd = () => {
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <BreadCrumbs title="顧客 > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <CustomerForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default CustomerAdd;
