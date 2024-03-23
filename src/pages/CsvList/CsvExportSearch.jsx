import { getUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';
import TableControls from '../../components/Table/TableControls';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';
import { datePlaceholders } from '../../lib/datePlaceholder';
import Loading from '../../components/Loading/Loader';

const CsvExportSearch = ({ setSearchDBParams, setLoading, loading, setPageNumber }) => {
    // if there is value in session storage
    const projectId = sessionStorage.getItem('currentProjectId');
    const retainedCSVList = JSON.parse(sessionStorage.getItem(`retained_csv_export_list_${projectId}`));
    const retainedCSVDATESEARCH = JSON.parse(
        sessionStorage.getItem(`retained_csv_export_list_date_search_${projectId}`)
    );
    const initializeValue = {
        csvName: retainedCSVList?.csvName?retainedCSVList?.csvName:'',
        csvCreateDateTimeFrom: (retainedCSVDATESEARCH?.from && getUnixTime(new Date(retainedCSVDATESEARCH.from))) || '',
        csvCreateDateTimeTo: (retainedCSVDATESEARCH?.to && getUnixTime(new Date(retainedCSVDATESEARCH.to))) || '',
    };
    // calendar date search state manage
    const [calendarDateObject, setCalendarDateObject] = useState({});
    const [calendarDate, setCalendarDate] = useState({
        from: retainedCSVDATESEARCH?.from ? new Date(retainedCSVDATESEARCH?.from * 1000) : '',
        to: retainedCSVDATESEARCH?.to ? new Date(retainedCSVDATESEARCH?.to * 1000) : '',
    });
    // existing value will selected while component render
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag
    setSelectedValue(initializeValue);

    // common functions for search options
    const { handleChange2, handleChange, values, setValues } = FilterComMethods(initializeValue);

    // Calendar data change
    useEffect(() => {
        const { from, to } = calendarDate;
        const retainedCSVList2 = JSON.parse(sessionStorage.getItem(`retained_csv_export_list_${projectId}`));
        console.log('formto',calendarDate);
        if (from === undefined && to === undefined) {
            setLoading(true);
            const searchObject = { ...values, csvCreateDateTimeFrom: '', csvCreateDateTimeTo: '' };

            setValues({ ...values, csvCreateDateTimeFrom: '', csvCreateDateTimeTo: '' });
            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        }

        if (from && to) {
            setLoading(true);
            const csvCreateDateTimeFrom = new Date(from);
            const csvCreateDateTimeTo = new Date(to);
            const csvDateTimeFromUnix = getUnixTime(csvCreateDateTimeFrom);
            const csvDateTimeToUnix = getUnixTime(csvCreateDateTimeTo);
            const searchObject = {
                ...values,
                csvCreateDateTimeFrom: csvDateTimeFromUnix ? csvDateTimeFromUnix : '',
                csvCreateDateTimeTo: csvDateTimeToUnix ? csvDateTimeToUnix : '',
            };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setCalendarDateObject({
                csvCreateDateTimeFrom: csvDateTimeFromUnix,
                csvCreateDateTimeTo: csvDateTimeToUnix,
            });
            setSelectedValue(searchObject);
            console.log('csvCreateDateTimeFrom',csvDateTimeFromUnix);
            console.log('csvDateTimeToUnix',csvDateTimeToUnix);
            console.log('csvCreateDateTimeFromExisting',retainedCSVList?.csvCreateDateTimeFrom);
            console.log('csvCreateDateTimeFromExistingTTTT',retainedCSVList?.csvCreateDateTimeTo);
        } else if (from) {
            setLoading(true);
            const csvCreateDateTimeFrom = new Date(from);
            const csvDateTimeFromUnix = getUnixTime(csvCreateDateTimeFrom);
            const searchObject = { ...values, csvCreateDateTimeFrom: csvDateTimeFromUnix };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setCalendarDateObject({ csvCreateDateTimeFrom: csvDateTimeFromUnix });
            setSelectedValue(searchObject);

            console.log('csvCreateDateTimeFrom',csvDateTimeFromUnix);
            console.log('csvCreateDateTimeFromExisting',retainedCSVList2?.csvCreateDateTimeFrom);
        } else {
            setLoading(true);
            const searchObject = { ...values, csvCreateDateTimeFrom: '', csvCreateDateTimeTo: '' };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setCalendarDateObject({});
            setSelectedValue(searchObject);
        }
        
        setLoading(false);
    }, [calendarDate]);
    const changeCalDate = (calendarDate2) => { 
        console.log('change event fire', calendarDate2);
        const { from, to } = calendarDate2;
        if (from === undefined && to === undefined) {
            setLoading(true);
            const searchObject = { ...values, csvCreateDateTimeFrom: '', csvCreateDateTimeTo: '' };

            setValues({ ...values, csvCreateDateTimeFrom: '', csvCreateDateTimeTo: '' });
            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        }

        if (from && to) {
            setLoading(true);
            const csvCreateDateTimeFrom = new Date(from);
            const csvCreateDateTimeTo = new Date(to);
            const csvDateTimeFromUnix = getUnixTime(csvCreateDateTimeFrom);
            const csvDateTimeToUnix = getUnixTime(csvCreateDateTimeTo);
            const searchObject = {
                ...values,
                csvCreateDateTimeFrom: csvDateTimeFromUnix ? csvDateTimeFromUnix : '',
                csvCreateDateTimeTo: csvDateTimeToUnix ? csvDateTimeToUnix : '',
            };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setCalendarDateObject({
                csvCreateDateTimeFrom: csvDateTimeFromUnix,
                csvCreateDateTimeTo: csvDateTimeToUnix,
            });
            setSelectedValue(searchObject);
        } else if (from) {
            setLoading(true);
            const csvCreateDateTimeFrom = new Date(from);
            const csvDateTimeFromUnix = getUnixTime(csvCreateDateTimeFrom);
            const searchObject = { ...values, csvCreateDateTimeFrom: csvDateTimeFromUnix };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setCalendarDateObject({ csvCreateDateTimeFrom: csvDateTimeFromUnix });
            setSelectedValue(searchObject);
        } else {
            setLoading(true);
            const searchObject = { ...values, csvCreateDateTimeFrom: '', csvCreateDateTimeTo: '' };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setCalendarDateObject({});
            setSelectedValue(searchObject);
        }
        setPageNumber(0);
        sessionStorage.setItem(`pagination_pageNo`, 0);
        setLoading(false);
    }
    
    return (
        <>
            {loading && <Loading />}
            <TableControls.CalendarSectionSearch
                placeholder={datePlaceholders.csvListCalendar}
                start="csvCreateDateTimeFrom"
                end="csvCreateDateTimeTo"
                calendarDate={calendarDate}
                setCalendarDate={setCalendarDate}
                changeCalDate={changeCalDate}
            />
            <TableControls.Search
                placeholder="CSV名"
                name="csvName"
                value={values.csvName}
                onChange={handleChange2}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleChange(e);
                        const csvDateTime = JSON.parse(
                            sessionStorage.getItem(`retained_csv_export_list_date_search_${projectId}`)
                        );
                        if (csvDateTime) {
                            const { from, to } = csvDateTime;
                            if (from && to) {
                                const csvCreateDateTimeFrom = new Date(from);
                                const csvCreateDateTimeTo = new Date(to);
                                const csvDateTimeFromUnix = getUnixTime(csvCreateDateTimeFrom);
                                const csvDateTimeToUnix = getUnixTime(csvCreateDateTimeTo);
                                const searchObject = {
                                    csvCreateDateTimeFrom: csvDateTimeFromUnix,
                                    csvCreateDateTimeTo: csvDateTimeToUnix,
                                };

                                const { name, value } = e.target;
                                const obj = { ...searchObject, [name]: value };
                                let createdSearchParams = new URLSearchParams(obj);
                                createdSearchParams = createdSearchParams.toString();
                                setSearchDBParams(createdSearchParams);
                            }
                        } else {
                            const { name, value } = e.target;
                            const obj = { [name]: value };
                            let createdSearchParams = new URLSearchParams(obj);
                            createdSearchParams = createdSearchParams.toString();
                            setSearchDBParams(createdSearchParams);
                        }
                        setPageNumber(0);
                        sessionStorage.setItem(`pagination_pageNo`, 0);
                    }
                }}
            />
        </>
    );
};

export default CsvExportSearch;
