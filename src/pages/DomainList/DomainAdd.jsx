import React from 'react';
import BreadCrumbs from '../../components/BreadCrumbs/BreadCrumbs';
import DomainForm from '../../components/Form/DomainForm';
const initialValues = {
    domainName: '',
    domainURL: '',
    appDomainName: '',
    memo: '',
};

const DomainAdd = () => {
    return (
        <>
            <BreadCrumbs title="ドメイン > 新規追加" className="mt-4 text-blue-50 font-bold px-4" />
            <DomainForm initialValues={initialValues} formType="add" />
        </>
    );
};

export default DomainAdd;
