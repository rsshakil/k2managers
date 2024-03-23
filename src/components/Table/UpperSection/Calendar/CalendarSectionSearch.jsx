import React, { useEffect, useState } from 'react';
import { set } from 'date-fns';
import { format } from 'date-fns';
import CalendarSearch from '../../../Calendar/CalendarSearch';
import CalendarInputSearch from './CalendarInputSearch';

export default function CalendarSectionSearch({ placeholder, setCalendarDate, calendarDate,changeCalDate=()=>{} }) {
    const [showCalendar, setShowCalendar] = React.useState(false);
    const [dateValue, setDateValue] = useState('');
    const handleCalendarModal = (value) => {
        setShowCalendar(value);
    };

    // global declaration
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();

    const projectId = JSON.parse(sessionStorage.getItem('currentProjectId'));

    useEffect(() => {
        const range1 = JSON.parse(sessionStorage.getItem(`retained_${routeName}_date_search_${projectId}`));

        const range2 = JSON.parse(sessionStorage.getItem(`retained_csv_export_list_date_search_${projectId}`));

        //  New code code lin kon
        if (range1) {
            if (range1.from && range1.from) {
                try {
                    const dateAndTimeSet = set(new Date(range1?.to), { hours: 23, minutes: 59, seconds: 59 });

                    const rangeFrom = new Date(range1.from);
                    const rangeTo = new Date(range1.to);
                    const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ' + format(rangeTo, 'y/MM/dd');

                    setDateValue(valueSet);
                    setCalendarDate({
                        from: range1.from.toString(),
                        to: dateAndTimeSet.toString(),
                    });
                } catch (error) {
                    console.log('⏰Time add from value', error);
                }
            } else if (range1.from) {
                const rangeFrom = new Date(range1.from);
                const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ';
                setDateValue(valueSet);

                setCalendarDate({
                    from: range1.from.toString(),
                    to: '',
                });
            } else {
                console.log('⏰ there is no from date and to date range 1');
            }
        } else if (range2) {
            if (range2.from && range2.from) {
                try {
                    const dateAndTimeSet = set(new Date(range2?.to), { hours: 23, minutes: 59, seconds: 59 });

                    const rangeFrom = new Date(range2.from);
                    const rangeTo = new Date(range2.to);
                    const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ' + format(rangeTo, 'y/MM/dd');

                    setDateValue(valueSet);
                    setCalendarDate &&
                        setCalendarDate({
                            from: range2.from.toString(),
                            to: dateAndTimeSet.toString(),
                        });
                } catch (error) {
                    console.log('⏰Time add from value', error);
                }
            } else if (range2.from) {
                const rangeFrom = new Date(range2.from);
                const valueSet = format(rangeFrom, 'y/MM/dd') + ' ~ ';
                setDateValue(valueSet);

                setCalendarDate &&
                    setCalendarDate({
                        from: range2.from.toString(),
                        to: '',
                    });
            } else {
                console.log('⏰ there is no from date and to date range 2');
            }
        }
    }, [projectId]);

    return (
        <>
            <CalendarInputSearch
                handleCalendarModal={handleCalendarModal}
                showCalendar={showCalendar}
                placeholder={placeholder}
                value={dateValue}
                setShowCalendar={setShowCalendar}
            />
            {showCalendar && (
                <CalendarSearch
                    close={() => {
                        setShowCalendar(false);
                    }}
                    setDateValue={setDateValue} // for place holder
                    calendarDate={calendarDate} // for state value
                    setCalendarDate={setCalendarDate} // for state value
                    changeCalDate={changeCalDate}
                />
            )}
        </>
    );
}
