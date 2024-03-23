import React from 'react';

import TableControls from '../../components/Table/TableControls';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';

export default function FilterSearch({ numberOfRecords, setSearchParams,setPageNumber }) {
    const retainedItemList = JSON.parse(
        sessionStorage.getItem(`retained_filter_list_${sessionStorage.getItem('currentProjectId')}`)
    );
    const initializeValue = {
        filterName: retainedItemList?.filterName,
        filterManageName: retainedItemList?.filterManageName,
    };
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag
    setSelectedValue(initializeValue);
    const { handleChange2, handleChange, values } = FilterComMethods(initializeValue);
    return (
        <>
            <TableControls.Search
                placeholder="管理名"
                name="filterManageName"
                value={values.filterManageName}
                onChange={(e) => handleChange2(e)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleChange(e);
                        const { name, value } = e.target;
                        const obj = { ...values, [name]: value };
                        let createdSearchParams = new URLSearchParams(obj);
                        createdSearchParams = createdSearchParams.toString();
                        setSearchParams(createdSearchParams);
                        setPageNumber(0);
                        sessionStorage.setItem(`pagination_pageNo`, 0);
                    }
                }}
            />
            <TableControls.Search
                placeholder="フィルター名"
                name="filterName"
                value={values.filterName}
                onChange={(e) => handleChange2(e)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleChange(e);
                        const { name, value } = e.target;
                        const obj = { ...values, [name]: value };
                        let createdSearchParams = new URLSearchParams(obj);
                        createdSearchParams = createdSearchParams.toString();
                        setSearchParams(createdSearchParams);
                        setPageNumber(0);
                        sessionStorage.setItem(`pagination_pageNo`, 0);
                    }
                }}
            />
        </>
    );
}
