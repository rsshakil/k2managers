import React from 'react';
import TableControls from '../../components/Table/TableControls';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';

export default function DomainSearch({ setSearchParams,setPageNumber }) {
    const retainedDomainList = JSON.parse(sessionStorage.getItem(`retained_domain_list`));
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag
    const initializeValue = {
        domainName: retainedDomainList?.domainName,
    };
    setSelectedValue(initializeValue);

    const { handleChange, handleChange2, values } = FilterComMethods(initializeValue);

    return (
        <>
            <TableControls.Search
                placeholder="ドメイン名"
                name="domainName"
                value={values.domainName}
                onChange={handleChange2}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleChange(e);
                        const { name, value } = e.target;
                        const obj = { ...values, [name]: value };
                        let createdSearchParams = new URLSearchParams(obj);
                        createdSearchParams = createdSearchParams.toString();
                        setSearchParams(createdSearchParams);
                        setPageNumber(0);
                    }
                }}
            />
        </>
    );
}
