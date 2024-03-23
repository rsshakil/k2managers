import BreadCrumbs from '../../../components/BreadCrumbs/BreadCrumbs';
import React from 'react';
import CustomerSettingForm from '../../../components/Form/CustomerSettingForm';
import { useNavigate } from 'react-router-dom';

const initialValues = {};

const CustomerSetting = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="flex flex-start text-blue-50 mt-4 font-bold">
                <BreadCrumbs
                    title="顧客"
                    className="underline cursor-pointer px-4"
                    onClick={() => navigate('/customer_list')}
                />
                <span>&gt;</span>
                <BreadCrumbs title="設定" />
            </div>
            <CustomerSettingForm initialValues={initialValues} formType="add" />
        </>
    );
};
export default CustomerSetting;
