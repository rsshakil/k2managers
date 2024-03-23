import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import AccountForm from '../../components/Form/AccountForm';

const initialValues = {
    accountId: '',
    fullName: '',
    roleId: '',
    email: '',
    initialPassword: '',
    isLocked: true,
    memo: '',
};
const AccountAdd = () => {
    return (
        <>
            <BreadCrumbs title="アカウント > 新規作成" className="mt-4 text-blue-50 font-bold px-4" />
            <AccountForm initialValues={initialValues} formType="add" />
        </>
    );
};

export default AccountAdd;
