import { getUnixTime } from 'date-fns';
import React, { useEffect, useState } from 'react';
import TableControls from '../../components/Table/TableControls';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';
import { datePlaceholders } from '../../lib/datePlaceholder';
import Loading from '../../components/Loading/Loader';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';

export default function EventSearch({ setSearchDBParams, loading, setLoading,setPageNumber }) {
    const projectId = sessionStorage.getItem('currentProjectId');
    const retainedEventList = JSON.parse(sessionStorage.getItem(`retained_event_list_${projectId}`));
    const retainedEventDateSearch = JSON.parse(sessionStorage.getItem(`retained_event_list_date_search_${projectId}`));

    const initializeValue = {
        eventName: retainedEventList?.eventName || '',
        eventDateTimeFrom: (retainedEventDateSearch?.from && getUnixTime(new Date(retainedEventDateSearch.from))) || '',
        eventDateTimeTo: (retainedEventDateSearch?.to && getUnixTime(new Date(retainedEventDateSearch.to))) || '',
    };

    // existing value will selected while component render
    const { setSelectedValue } = SessionStorageOnReload(); // Manage reload option flag
    setSelectedValue(initializeValue);

    // calendar date search state manage
    const [calendarDate, setCalendarDate] = useState({
        from: retainedEventDateSearch?.from ? new Date(retainedEventDateSearch?.from) : '',
        to: retainedEventDateSearch?.to ? new Date(retainedEventDateSearch?.to) : '',
    });

    // common functions for search options
    const { handleChange2, handleChange, values, setValues } = FilterComMethods(initializeValue);

    // Calendar data change
    useEffect(() => {
        const { from, to } = calendarDate;

        if (from === undefined && to === undefined) {
            const searchObject = { ...values, eventDateTimeFrom: '', eventDateTimeTo: '' };

            setValues({ ...values, eventDateTimeFrom: '', eventDateTimeTo: '' });
            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        }

        if (from && to) {
            setLoading(true);
            const eventCreateDateTimeFrom = new Date(from);
            const eventCreateDateTimeTo = new Date(to);
            const eventDateTimeFromUnix = getUnixTime(eventCreateDateTimeFrom);
            const eventDateTimeToUnix = getUnixTime(eventCreateDateTimeTo);
            const searchObject = {
                ...values,
                eventDateTimeFrom: eventDateTimeFromUnix ? eventDateTimeFromUnix : '',
                eventDateTimeTo: eventDateTimeToUnix ? eventDateTimeToUnix : '',
            };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        } else if (from) {
            setLoading(true);
            const eventCreateDateTimeFrom = new Date(from);
            const eventDateTimeFromUnix = getUnixTime(eventCreateDateTimeFrom);
            const searchObject = { ...values, eventDateTimeFrom: eventDateTimeFromUnix };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        } else {
            const searchObject = { ...values, eventDateTimeFrom: '', eventDateTimeTo: '' };
            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        }
        
    }, [calendarDate]);
    const changeCalDate = (calendarDate2) => { 
        console.log('change event fire');
        const { from, to } = calendarDate2;

        if (from === undefined && to === undefined) {
            const searchObject = { ...values, eventDateTimeFrom: '', eventDateTimeTo: '' };

            setValues({ ...values, eventDateTimeFrom: '', eventDateTimeTo: '' });
            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        }

        if (from && to) {
            setLoading(true);
            const eventCreateDateTimeFrom = new Date(from);
            const eventCreateDateTimeTo = new Date(to);
            const eventDateTimeFromUnix = getUnixTime(eventCreateDateTimeFrom);
            const eventDateTimeToUnix = getUnixTime(eventCreateDateTimeTo);
            const searchObject = {
                ...values,
                eventDateTimeFrom: eventDateTimeFromUnix ? eventDateTimeFromUnix : '',
                eventDateTimeTo: eventDateTimeToUnix ? eventDateTimeToUnix : '',
            };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        } else if (from) {
            setLoading(true);
            const eventCreateDateTimeFrom = new Date(from);
            const eventDateTimeFromUnix = getUnixTime(eventCreateDateTimeFrom);
            const searchObject = { ...values, eventDateTimeFrom: eventDateTimeFromUnix };

            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        } else {
            const searchObject = { ...values, eventDateTimeFrom: '', eventDateTimeTo: '' };
            setSearchDBParams(new URLSearchParams(searchObject)?.toString());
            setSelectedValue(searchObject);
        }
        setPageNumber(0);
        sessionStorage.setItem(`pagination_pageNo`, 0);
    }
    const enterClickEventName = (e) => {
        const eventDateTime = JSON.parse(sessionStorage.getItem(`retained_event_list_date_search_${projectId}`));
        if (eventDateTime) {
            const { from, to } = eventDateTime;
            if (from && to) {
                const eventCreateDateTimeFrom = new Date(from);
                const eventCreateDateTimeTo = new Date(to);
                const eventDateTimeFromUnix = getUnixTime(eventCreateDateTimeFrom);
                const eventDateTimeToUnix = getUnixTime(eventCreateDateTimeTo);
                const searchObject = { eventDateTimeFrom: eventDateTimeFromUnix, eventDateTimeTo: eventDateTimeToUnix };

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
    };

    return (
        <>
            {loading && <Loading />}
            <TableControls.CalendarSectionSearch
                placeholder={datePlaceholders.eventListCalendar}
                start="eventDateTimeFrom"
                end="eventDateTimeTo"
                setCalendarDate={setCalendarDate}
                calendarDate={calendarDate}
                changeCalDate={changeCalDate}
            />
            <TableControls.Search
                placeholder="イベント名"
                name="eventName"
                value={values.eventName}
                onChange={handleChange2}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleChange(e);
                        enterClickEventName(e);
                    }
                }}
            />
        </>
    );
}
