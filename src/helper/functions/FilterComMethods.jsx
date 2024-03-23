import { useState } from 'react';
import { SessionStorageOnReload } from '../browserSessionStorage/SessionStorageOnReload';

export function FilterComMethods(initializeValue) {
    const [paramsObj, setParamsObj] = useState({}); // Manage search params obj
    const [values, setValues] = useState(initializeValue); // Manage selection search values
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag

    // Removed undefined values
    Object.keys(values).forEach((key) => {
        if (values[key] === undefined) delete values[key];
    });
    const handleChange2 = (e) => {
        const { name, value } = e.target;
        const obj = { [name]: value };
        sessionStorage.setItem('tempChange', JSON.stringify(obj));
        setValues({ ...values, [name]: value });
    };

    // Filter option or Press Enter then START
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
        name && setParamsObj({ ...paramsObj, ...values, [name]: value });
    };

    // Calendar search option start
    let calendarDateGet = (data) => {
        const pathname = window.location.pathname;
        const sessionStorageValue = JSON.parse(sessionStorage.getItem(`retained_${pathname.split('/').pop()}`));
        let tempChange = JSON.parse(sessionStorage.getItem('tempChange')) || {};
        const { startDate, endDate, startName, endName } = data; // getting data from calendar jsx file
        if (startName || endName) {
            // condition checking startName and EndName calendar set or not
            const dateSearchObj = { [startName]: startDate, [endName]: endDate }; //making new obj for search params
            let dateSearchParamsObj = { ...paramsObj, ...dateSearchObj };
            let ObjUpdate = {
                ...values,
                ...sessionStorageValue,
                ...tempChange,
                ...dateSearchParamsObj,
            };
            setParamsObj(ObjUpdate);
            setValues(ObjUpdate);
        }
    };
    //The URLSearchParams interface defines utility methods to work with the query string of a URL.
    let searchParams = new URLSearchParams(paramsObj);
    searchParams = searchParams.toString();
    searchParams && setSelectedValue(values);

    return {
        values,
        setValues,
        handleChange,
        handleChange2,
        searchParams,
        calendarDateGet,
    };
}

