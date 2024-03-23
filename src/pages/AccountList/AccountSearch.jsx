import React from 'react';
import TableControls from '../../components/Table/TableControls';

export default function AccountSearch({ options, values, setValues, setSearchDBParams,setPageNumber }) {
    const handleSubmit = (e) => {

        if (values.accountName === "" || values.accountName === ' ') {
            const retainedAccountList = JSON.parse(sessionStorage.getItem(`retained_account_list`));
            const initializeValue = {
                roleId: retainedAccountList?.roleId ? retainedAccountList?.roleId : '',
                accountName: retainedAccountList?.accountName || '',
            };
            const { name, value } = e.target;
            const newSearchParamsObj = {
                ...initializeValue,
                [name]: value,
            };
            Object.keys(newSearchParamsObj).forEach((key) => {
                if (!newSearchParamsObj[key]) {
                    delete newSearchParamsObj[key]; // remove falsy value from object values
                }
            });
            setValues(newSearchParamsObj);
            sessionStorage.setItem(`retained_account_list`, JSON.stringify(newSearchParamsObj));
            setSearchDBParams(new URLSearchParams(newSearchParamsObj)?.toString());
        };

    const retainedAccountList = JSON.parse(sessionStorage.getItem(`retained_account_list`));
    const initializeValue = {
        roleId: retainedAccountList?.roleId ? retainedAccountList?.roleId : '',
        accountName: retainedAccountList?.accountName || '',
    };
    const { name, value } = e.target;
    const newSearchParamsObj = {
        ...initializeValue,
        [name]: value,
    };
    Object.keys(newSearchParamsObj).forEach((key) => {
        if (!newSearchParamsObj[key]) {
            delete newSearchParamsObj[key]; // remove falsy value from object values
        }
    });
    setValues(newSearchParamsObj);
    sessionStorage.setItem(`retained_account_list`, JSON.stringify(newSearchParamsObj));
    setSearchDBParams(new URLSearchParams(newSearchParamsObj)?.toString());
    setPageNumber(0)
};

return (
    <>
        {/* <TableControls.Selection
            defaultValue="全ロール"
            name="roleId"
            options={options}
            value={values.roleId}
            onChange={handleSubmit}
        /> */}
        <TableControls.Search
            placeholder="ID,氏名"
            name="accountName"
            value={values.accountName}
            onChange={(e) => {
                setValues({ ...values, accountName: e.target.value });
                sessionStorage.setItem(
                    `retained_account_list`,
                    JSON.stringify({ ...values, accountName: e.target.value })
                );
            }}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
        />
    </>
);
}
