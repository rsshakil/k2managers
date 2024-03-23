/*
 * Set and Get local storage
 */

import { reloadPagesFlag } from '../flagStatus/reloadPagesFlag';

export function LocalStorageOnReload() {
    // Retain Feature Start
    const fetchLocalStorageData = (pathname, listTable, setValues, initializeValue) => {
        const { items, searchParamsValues } = getInitialState(pathname); // Pass the pathname and get the filter items and new searchParams from LocalStorage

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
    const getInitialState = (pathname) => {
        pathname = pathname.split('/').pop();
        const retrievedObject = window.localStorage.getItem(`retained_${pathname}`);
        if (retrievedObject) {
            const items = JSON.parse(retrievedObject);
            const searchParamsValues = Object.entries(items)
                .map((x) => x.join('='))
                .join('&'); // build Query params likes -- roleId=1&accountName=test
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

        const pathname = window.location.pathname;
        let newValuesObj = {};
        Object.keys(values).forEach((key) => {
            if (values[key]) {
                newValuesObj[key] = values[key]; // remove falsy value from object values
            }
        });
        window.localStorage.setItem(`retained_${pathname.split('/').pop()}`, JSON.stringify(newValuesObj));
        localStorage.removeItem('tempChange');
    };
    // !!! Implemented State !!! set Calendar date
    const setCalendarValueLS = (dateSearchParamsObj) => {};

    // Remove---- /name_of_route ----like this pattern key from the localStorage except same route.
    const removeFromLocalStorageOnRouteChange = () => {
        let pathname = window.location.pathname;
        pathname = pathname.split('/').pop();
        const ls_Items = { ...localStorage };
        const rexPattern = /^\bretained[_].*\b/;
        const tempArray = [];

        if (ls_Items !== null) {
            for (let matchKey in ls_Items) {
                // Match the pattern likes start with  -- retained_
                if (rexPattern.test(matchKey)) {
                    let pathNameLS = matchKey.split('retained_').pop(); // pathNameLS = account_list --- instance of retained_account_list
                    if (pathNameLS !== pathname) {
                        tempArray.push(matchKey);
                    }
                }
            }
            tempArray.forEach((element) => {
                localStorage.removeItem(element);
            });
        }
    };

    return {
        fetchLocalStorageData,
        setSelectedValue,
        setCalendarValueLS,
        getInitialState,
        removeFromLocalStorageOnRouteChange,
    };
}
