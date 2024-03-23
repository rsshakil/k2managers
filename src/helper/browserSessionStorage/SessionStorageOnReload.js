/*
 * Set and Get session storage
 */

import { getUnixTime } from 'date-fns';
import { reloadPagesFlag } from '../flagStatus/reloadPagesFlag';

export function SessionStorageOnReload() {
    // Retain Feature Start
    const fetchSessionStorageData = (pathname, listTable, setValues, initializeValue, newStartDate, newEndDate) => {
        const { items, searchParamsValues } = getInitialState(pathname, newStartDate, newEndDate); // Pass the pathname and get the filter items and new searchParams from SessionStorage

        if (reloadPagesFlag[listTable]?.retainInput || reloadPagesFlag[listTable]?.retainPagination) {
            if (searchParamsValues) {
                items &&
                    Object.keys(initializeValue).forEach((key) => {
                        setValues({
                            ...items,
                            [key]: items[key] !== undefined ? items[key] : '',
                        });
                    });
            }
        }
    };
    // Retain Feature END
    // get QueryString data only

    // Get SessionStorage Data
    const getInitialState = (pathname, newStartDate, newEndDate) => {
        pathname = pathname.split('/').pop();
        const projectId = sessionStorage.getItem('currentProjectId');
        let retrievedObject;
        if (projectId) {
            retrievedObject = sessionStorage.getItem(`retained_${pathname}_${projectId}`); // Get SessionStorage Data
        } else {
            retrievedObject = sessionStorage.getItem(`retained_${pathname}`); // Get SessionStorage Data
        }
        const retrievedObjectLocal = sessionStorage.getItem(`${pathname.split('/').pop()}_timestamp_DateRangePicker`); // Get LocalStorage Data
        if (retrievedObject || retrievedObjectLocal) {
            const items = JSON.parse(retrievedObject); // Parse SessionStorage Data
            let searchParamsValuesLS = undefined;
            const searchParamsValuesSession = Object.entries(items)
                .map((x) => x.join('='))
                .join('&'); // build Query params likes -- roleId=1&accountName=test

            if (retrievedObjectLocal) {
                const itemsLS = JSON.parse(retrievedObjectLocal); // parse LocalStorage Data
                itemsLS[newStartDate] = itemsLS['from'];
                itemsLS[newStartDate] = getUnixTime(new Date(itemsLS[newStartDate]));
                itemsLS[newEndDate] = itemsLS['to'];
                itemsLS[newEndDate] = getUnixTime(new Date(itemsLS[newEndDate]));
                delete itemsLS['from'];
                delete itemsLS['to'];
                searchParamsValuesLS = Object.entries(itemsLS)
                    .map((x) => x.join('='))
                    .join('&'); // build Query params likes -- roleId=1&accountName=test
            }


            const searchParamsValues =
                searchParamsValuesLS !== undefined
                    ? searchParamsValuesSession + '&' + searchParamsValuesLS
                    : searchParamsValuesSession;
            return {
                items,
                searchParamsValues,
            };
        } else {
            return {
                items: undefined,
                searchParamsValues: undefined,
            };
        }
    };
    // Get SessionStorage Data getInitialStateCustomerList
    const getInitialStateCustomerList = (pathname, newStartDate, newEndDate) => {
        pathname = pathname.split('/').pop();
        const templateId = JSON.parse(
            sessionStorage.getItem('retained_customer_list_' + sessionStorage.getItem('currentProjectId'))
        )?.templateId


        // console.log(" 🔄️ getInitialStateCustomerList templateId : ", templateId)

        const projectId = sessionStorage.getItem('currentProjectId');
        let retrievedObject;
        // if (projectId && templateId) {
        //     retrievedObject = sessionStorage.getItem(`retained_${pathname}_${projectId}_${templateId}`); // Get SessionStorage Data
        // } else 

        if (projectId) {
            retrievedObject = sessionStorage.getItem(`retained_${pathname}_${projectId}`); // Get SessionStorage Data
        } else {
            retrievedObject = sessionStorage.getItem(`retained_${pathname}`); // Get SessionStorage Data
        }
        const retrievedObjectLocal = sessionStorage.getItem(`${pathname.split('/').pop()}_timestamp_DateRangePicker`); // Get LocalStorage Data
        if (retrievedObject || retrievedObjectLocal) {
            const items = JSON.parse(retrievedObject); // Parse SessionStorage Data
            let searchParamsValuesLS = undefined;
            const searchParamsValuesSession = Object.entries(items)
                .map((x) => x.join('='))
                .join('&'); // build Query params likes -- roleId=1&accountName=test

            if (retrievedObjectLocal) {
                const itemsLS = JSON.parse(retrievedObjectLocal); // parse LocalStorage Data
                itemsLS[newStartDate] = itemsLS['from'];
                itemsLS[newStartDate] = getUnixTime(new Date(itemsLS[newStartDate]));
                itemsLS[newEndDate] = itemsLS['to'];
                itemsLS[newEndDate] = getUnixTime(new Date(itemsLS[newEndDate]));
                delete itemsLS['from'];
                delete itemsLS['to'];
                searchParamsValuesLS = Object.entries(itemsLS)
                    .map((x) => x.join('='))
                    .join('&'); // build Query params likes -- roleId=1&accountName=test
            }


            const searchParamsValues =
                searchParamsValuesLS !== undefined
                    ? searchParamsValuesSession + '&' + searchParamsValuesLS
                    : searchParamsValuesSession;
            return {
                items,
                searchParamsValues,
            };
        } else {
            return {
                items: undefined,
                searchParamsValues: undefined,
            };
        }
    };

    // set QueryString data
    const setSelectedValue = (values) => {
        let pathname = window.location.pathname.split('/').pop();
        let newValuesObj = {};
        const projectId = sessionStorage.getItem('currentProjectId');
        values &&
            Object.keys(values).forEach((key) => {
                if (values[key]) newValuesObj[key] = values[key]; // remove falsy value from object values
            });

        if (projectId) sessionStorage.setItem(`retained_${pathname}_${projectId}`, JSON.stringify(newValuesObj));
        else sessionStorage.setItem(`retained_${pathname}`, JSON.stringify(newValuesObj));
        sessionStorage.removeItem('tempChange');
    };
    // set QueryString data for customer list
    const setSelectedValueCustomerList = (values, templateId) => {
        // console.log("🚨 🚨 templateId setSelectedValueCustomerList : ", templateId)
        let pathname = window.location.pathname.split('/').pop();
        let newValuesObj = {};
        const projectId = sessionStorage.getItem('currentProjectId');
        values &&
            Object.keys(values).forEach((key) => {
                if (values[key]) newValuesObj[key] = values[key]; // remove falsy value from object values
            });

        if (projectId) sessionStorage.setItem(`retained_${pathname}_${projectId}`, JSON.stringify(newValuesObj));
        if (projectId && templateId) sessionStorage.setItem(`retained_${pathname}_${projectId}_${templateId}`, JSON.stringify(newValuesObj));
        else sessionStorage.setItem(`retained_${pathname}`, JSON.stringify(newValuesObj));
        sessionStorage.removeItem('tempChange');
    };

    const setCalendarValueLS = () => {

    };

    const removeFromSessionStorageOnRouteChange = () => {
        let pathname = window.location.pathname;
        pathname = pathname.split('/').pop();
        const ls_Items = { ...sessionStorage };
        const rexPattern = /^\bretained[_].*\b/;
        const tempArray = [];

        if (ls_Items !== null) {
            for (let matchKey in ls_Items) {
                // Match the pattern likes start with  -- retained_
                if (rexPattern.test(matchKey)) {
                    let pathNameLS = matchKey.split('retained_').pop();
                    // pathNameLS = account_list --- instance of retained_account_list
                    if (pathNameLS !== pathname) {
                        tempArray.push(matchKey);
                    }
                }
            }
            tempArray.forEach((element) => {
                sessionStorage.removeItem(element);
            });
        }
    };

    return {
        fetchSessionStorageData,
        setSelectedValue,
        setSelectedValueCustomerList,
        setCalendarValueLS,
        getInitialState,
        removeFromSessionStorageOnRouteChange,
        getInitialStateCustomerList,
    };
}
