import { addDays, startOfDay } from 'date-fns';
import { getUnixTime } from 'date-fns/esm';
import React, { useContext, useEffect, useState } from 'react';
import { getEndDateUnixTime } from '../../../../lib/date';
import { UnixTsToStringYYMMDD } from '../../../../lib/unixTsToString';
import { DataManageContext } from '../../../../routes/Router';
import Calendar2 from '../../../Calendar/Calendar2';
import CalendarInput from './CalendarInput';
import DatePickerCalendar from '../../../Calendar/DatePickerCalendar';
import { format } from 'date-fns';
const startDate = getUnixTime(addDays(startOfDay(new Date()), -120)); //4 month before starting at 12:00 am
const endDate = new Date().setHours(23, 59, 59, 999); //present day 11:59:59 pm

const initialDateRange = [
    {
        startDate: new Date(startDate * 1000),
        endDate: new Date(endDate),
        key: 'selection',
    },
];

// Calendar field and icon
const CalendarSection2 = ({ placeholder, start, end, setSelectedDate, defaultDateValue }) => {
    const [dataManage, setDataManage] = useContext(DataManageContext);

    const [showCalendar, setShowCalendar] = React.useState(false);

    const [placeholderDynamic, setPlaceholderDynamic] = useState(placeholder); // place holder change dynamically
    const [dateValue, setDateValue] = useState('');
    const [dateRange, setDateRange] = useState(initialDateRange);
    const [onChangeDateRange, setOnChangeDateRange] = useState([]);
    const [controlFunction, setControlFunction] = useState(true);
    const [isCloseClicked, setIsCloseClicked] = useState(false);
    const handleCalendarModal = (value) => {
        setShowCalendar(value);
    };

    const pathName = window.location.pathname;
    const routeName = pathName.split('/').pop();
    const projectId = JSON.parse(sessionStorage.getItem('currentProjectId'));

    useEffect(() => {
        const item = sessionStorage.getItem(`${routeName}`);

        const range = JSON.parse(item);

        const keyName = routeName + '_timestamp_' + 'DateRangePicker';
        const range2 = JSON.parse(sessionStorage.getItem(`${keyName}`));
        const sessionRange = JSON.parse(
            sessionStorage.getItem(`retained_${routeName}_${sessionStorage.getItem('currentProjectId')}`)
        );

        //  previous code
        if (range) {
            if (range.from && range.from) {
                try {
                    const rangeFrom = new Date(range.from);
                    const rangeTo = new Date(range.to);

                    const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ' + format(rangeTo, 'y/MM/dd');

                    setDateValue(valueSet);
                } catch (error) {
                    console.log('Time add from value');
                }
            }
        }
        //  New code code lin kon
        if (range2) {
            if (range2.from && range2.to) {
                try {
                    const rangeFrom = new Date(range2.from);
                    const rangeTo = new Date(range2.to);

                    const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ' + format(rangeTo, 'y/MM/dd');

                    setDateValue(valueSet);
                } catch (error) {
                    console.log('Time add from value', error);
                }
            } else if (range2.from) {
                const rangeFrom = new Date(range2.from);

                const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ';

                setDateValue(valueSet);
            } else {
                console.log('there is no from date and to date');
            }
        }

        //  session date for CSV
        if (sessionRange) {
            let route = routeName?.split('_')?.[0];
            let from, to;
            if (route === 'csv') {
                from = sessionRange[`${route}CreateDateTimeFrom`];
                to = sessionRange[`${route}CreateDateTimeTo`];
            } else {
                from = sessionRange[`${route}DateTimeFrom`];
                to = sessionRange[`${route}DateTimeTo`];
            }

            if (from && to) {
                // setSelectedRange({
                //   from: new Date(range.from) || "",
                //   to: new Date(range.to) || ""
                // })
                try {
                    const rangeFrom = new Date(from * 1000);
                    const rangeTo = new Date(to * 1000);

                    const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ' + format(rangeTo, 'y/MM/dd');

                    setDateValue(valueSet);
                } catch (error) {
                    console.log('Session Time add from value', error);
                }
            } else if (from) {
                try {
                    const rangeFrom = new Date(from * 1000);

                    const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ';

                    setDateValue(valueSet);
                } catch (error) {
                    console.log('Session Time add from value', error);
                }
            } else {
                setDateValue('');
            }
        }
    }, [projectId]);

    // calendar v1
    useEffect(() => {
        const pathname = window.location.pathname;
        const lsJSON = sessionStorage.getItem(`retained_${pathname.split('/').pop()}_${projectId}`);
        const localStorageValue = JSON.parse(lsJSON);

        if (localStorageValue) {
            const { [start]: startDate } = localStorageValue;
            const { [end]: endDate } = localStorageValue;
            if (startDate && endDate) {
                const sDateConvert = UnixTsToStringYYMMDD(startDate);
                const eDateConvert = UnixTsToStringYYMMDD(endDate);
                let totalDate = sDateConvert + '~' + eDateConvert;

                setPlaceholderDynamic(totalDate);
                const existingDate = [
                    {
                        startDate: new Date(startDate * 1000),
                        endDate: new Date(endDate * 1000),
                        key: 'selection',
                    },
                ];

                setDateRange(existingDate);
            }
        }
    }, [projectId]);

    const placeholderClick = () => {
        if (!isCloseClicked) {
            try {
                if (controlFunction) {
                    setControlFunction(controlFunction ? false : true);
                }
                if (!controlFunction) {
                    const startDate = getUnixTime(onChangeDateRange[0].startDate);
                    const endDate = getEndDateUnixTime(onChangeDateRange[0].endDate); //added next 23 hours 59 minutes and 59 sec
                    if (startDate && endDate) {
                        const { start, end } = dataManage;
                        let dateSelected = dataManage.func;
                        dateSelected({ startDate, endDate, startName: start, endName: end });
                        const sDateConvert = UnixTsToStringYYMMDD(startDate);
                        const eDateConvert = UnixTsToStringYYMMDD(endDate);
                        let totalDate = sDateConvert + '-' + eDateConvert;

                        setPlaceholderDynamic(totalDate);
                    }
                    setControlFunction(controlFunction ? false : true);
                }
            } catch (error) {
                console.log('Calendar date not close by selection');
            }
        } else {
            setPlaceholderDynamic(placeholder);
        }
    };

    return (
        <>
            <CalendarInput
                handleCalendarModal={handleCalendarModal}
                showCalendar={showCalendar}
                placeholder={placeholder}
                value={dateValue}
                setShowCalendar={setShowCalendar}
                placeholderClick={placeholderClick}
            />
            {showCalendar && (
                <Calendar2
                    close={() => {
                        setShowCalendar(false);
                    }}
                    initialDateRange={initialDateRange}
                    setDateValue={setDateValue}
                    setSelectedDate={setSelectedDate}
                />
            )}
        </>
    );
};
export default CalendarSection2;
