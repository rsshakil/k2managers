import React, { useEffect } from 'react';

import TableControls from '../../components/Table/TableControls';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';

export default function BusRouteSearch({ setSearchParams,setPageNumber }) {
    const retainedItemList = JSON.parse(
        sessionStorage.getItem(`retained_bus_route_list_${sessionStorage.getItem('currentProjectId')}`)
    );
    const initializeValue = {
        busRouteName: retainedItemList?.busRouteName,
        busRouteManageName: retainedItemList?.busRouteManageName,
    };
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag
    setSelectedValue(initializeValue);
    const { handleChange2, handleChange, values } = FilterComMethods(initializeValue);
    return (
        <>
            <TableControls.Search
                placeholder="管理名"
                name="busRouteManageName"
                value={values.busRouteManageName}
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
                placeholder="路線名"
                name="busRouteName"
                value={values.busRouteName}
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
