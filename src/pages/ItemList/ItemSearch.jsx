import React from 'react';

import TableControls from '../../components/Table/TableControls';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';

export default function ItemSearch({ setSearchParams,setPageNumber }) {
    const retainedItemList = JSON.parse(
        sessionStorage.getItem(`retained_item_list_${sessionStorage.getItem('currentProjectId')}`)
    );
    const initializeValue = {
        itemName: retainedItemList?.itemName,
        itemManageName: retainedItemList?.itemManageName,
    };
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag
    setSelectedValue(initializeValue);
    const { handleChange2, handleChange, values } = FilterComMethods(initializeValue);
    return (
        <>
            <TableControls.Search
                placeholder="管理名"
                name="itemManageName"
                value={values.itemManageName}
                onChange={(e) => handleChange2(e)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleChange(e);
                        const { name, value } = e.target;
                        const obj = { ...values, [name]: value };
                        //The URLSearchParams interface defines utility methods to work with the query string of a URL.
                        let createdSearchParams = new URLSearchParams(obj);
                        createdSearchParams = createdSearchParams.toString();
                        setSearchParams(createdSearchParams);
                        setPageNumber(0);
                        sessionStorage.setItem(`pagination_pageNo`, 0);
                    }
                }}
            />

            <TableControls.Search
                placeholder="アイテム名"
                name="itemName"
                value={values.itemName}
                onChange={(e) => handleChange2(e)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleChange(e);
                        const { name, value } = e.target;
                        const obj = { ...values, [name]: value };
                        //The URLSearchParams interface defines utility methods to work with the query string of a URL.
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
