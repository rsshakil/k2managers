import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../../components/Button/OutlineButtonLinkContainer';
import { optionArray } from '../../../components/GanttChart/data';
import GanttChartTemplate from '../../../components/GanttChart/GanttChartTemplate';
import GanttFilter from '../../../components/GanttChart/GanttFilter';
import { LocalStorageOnReload } from '../../../helper/browserLocalStorage/LocalStorageOnReload';
import { FilterComMethods } from '../../../helper/functions/FilterComMethods';
import fetchRecords from '../../../lib/filterFetch';
import { listSchedulerCatagory } from '../../../restapi/queries';
import { DataManageContext } from '../../../routes/Router';
import { ItemData } from '../../../utilities/projectBtnItemData';

const initializeValue = { categoryId: '', instituteName: '' };

const EventScheduler = () => {
    const { pathname } = useLocation();
    const [_options, setOptions] = useState(optionArray);
    const { searchParams, values, setValues, calendarDateGet } = FilterComMethods(initializeValue);

    const [dataManage, setDataManage] = useContext(DataManageContext);
    const { getInitialState, fetchLocalStorageData } = LocalStorageOnReload();

    const filterPropObj = {
        setId: 'categoryId',
        setName: 'categoryName',
        endPoint: listSchedulerCatagory,
        setOptions: setOptions,
        projectId: window.sessionStorage.getItem('currentProjectId'),
    };

    useEffect(() => {
        fetchRecords.filter(filterPropObj);
        fetchLocalStorageData(pathname, 'listSchedulerMap', setValues, initializeValue);
    }, []);

    useEffect(() => {
        setDataManage({
            ...dataManage,
            func: calendarDateGet,
            start: 'mappingDatetimeFrom',
            end: 'mappingDatetimeTo',
        });
    }, [searchParams]);
    return (
        <>
            <OutlineButtonLinkContainer ItemData={ItemData} />
            <div className="px-4">
                <GanttFilter />
                <GanttChartTemplate pathName={pathname} />
            </div>
        </>
    );
};
export default EventScheduler;
