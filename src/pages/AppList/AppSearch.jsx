import React from 'react';
import TableControls from '../../components/Table/TableControls';

export default function AppSearch({ options, setSearchDBParams, values, setValues,setPageNumber }) {
    let pathname = window.location.pathname.split('/').pop();
    const projectId = JSON.parse(sessionStorage.getItem('currentProjectId'));

    const handleSubmit = (e) => {

        if (values.appName === "" || values.appName === ' ') {    
            const retainedAppList = JSON.parse(
                sessionStorage.getItem(`retained_app_list_${sessionStorage.getItem('currentProjectId')}`)
            );
            const initializeValue = {
                appName: retainedAppList?.appName ? retainedAppList?.appName : '',
                eventId: retainedAppList?.eventId,
            };
            const { name, value } = e.target;
            const newSearchParamsObj = {
                ...initializeValue,
                [name]: value,
            };
            Object.keys(newSearchParamsObj).forEach((key) => {
                if (!newSearchParamsObj[key]) {
                    delete newSearchParamsObj[key];
                }
            });
            setValues(newSearchParamsObj);
            sessionStorage.setItem(`retained_${pathname}_${projectId}`, JSON.stringify(newSearchParamsObj));
            setSearchDBParams(new URLSearchParams(newSearchParamsObj)?.toString());
        }

        const retainedAppList = JSON.parse(
            sessionStorage.getItem(`retained_app_list_${sessionStorage.getItem('currentProjectId')}`)
        );
        const initializeValue = {
            appName: retainedAppList?.appName ? retainedAppList?.appName : '',
            eventId: retainedAppList?.eventId,
        };
        const { name, value } = e.target;
        const newSearchParamsObj = {
            ...initializeValue,
            [name]: value,
        };
        Object.keys(newSearchParamsObj).forEach((key) => {
            if (!newSearchParamsObj[key]) {
                delete newSearchParamsObj[key];
            }
        });
        setValues(newSearchParamsObj);
        sessionStorage.setItem(`retained_${pathname}_${projectId}`, JSON.stringify(newSearchParamsObj));
        setSearchDBParams(new URLSearchParams(newSearchParamsObj)?.toString());
        setPageNumber(0);
        sessionStorage.setItem(`pagination_pageNo`, 0);
    };

    return (
        <>
            <TableControls.Selection
                defaultValue="全イベント"
                name="eventId"
                options={options}
                value={values.eventId}
                onChange={handleSubmit}
            />

            <TableControls.Search
                placeholder="APP名"
                name="appName"
                value={values.appName}
                onChange={(e) => {
                    setValues({ ...values, appName: e.target.value });
                    sessionStorage.setItem(
                        `retained_${pathname}_${projectId}`,
                        JSON.stringify({ ...values, appName: e.target.value })
                    );
                }}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
            />
        </>
    );
}
