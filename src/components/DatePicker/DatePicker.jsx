import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import ja from 'date-fns/locale/ja';
import TimeDatePickerButton from '../Button/TimeDatePickerButton';

const pathname = window.location.pathname;
const routeName = pathname.split('/').pop();
const keyName = routeName + '_timestamp_' + 'DatePicker';

export default function DatePicker({ setDateValue, setShowCalendar, notStoreValue, value }) {
    const [selected, setSelected] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [month, setMonth] = useState(
        localStorage.getItem(`${keyName}`) ? new Date(localStorage.getItem(`${keyName}`)) : ''
    );

    useEffect(() => {
        const item = localStorage.getItem(`${keyName}`);

        try {
            if (notStoreValue) {
                if (value) {
                    const valueDate = new Date(value);
                    setSelected(valueDate);
                }
            } else {
                if (item) {
                    const date = new Date(item);
                    setSelected(new Date(item));
                    setDateValue(format(date, 'y/MM/dd'));
                }
            }
        } catch (error) {
            console.log('date picker error', error);
        }
    }, []);

    const formatYearCaption = function (date) {
        var y = date.getFullYear();
        return `${y}年`;
    };

    const handleDaySelect = (date) => {
        setSelected(date);
        if (date) {
            setInputValue(format(date, 'y/MM/dd'));
        } else {
            setInputValue('');
        }
    };

    const handleSetDate = () => {
        if (notStoreValue) {
            setDateValue(format(selected, 'y/MM/dd'));
            setShowCalendar(false);
        } else {
            localStorage.setItem(keyName, `${selected}`);

            setDateValue(format(selected, 'y/MM/dd'));
            setShowCalendar(false);
        }
    };

    const handleClearDate = () => {
        setDateValue('');
        setSelected('');
        window.localStorage.removeItem(keyName);
        setShowCalendar(false);
    };

    return (
        <>
            <DayPicker
                locale={ja}
                mode="single"
                month={month ? month : new Date()}
                onMonthChange={setMonth}
                fromYear={1900}
                toYear={2030} //will be modified as "currentYear + 10 " , initial value = current year
                defaultMonth={selected}
                selected={selected}
                onSelect={handleDaySelect}
                fixedWeeks={true}
                captionLayout="dropdown"
                formatters={{ formatYearCaption }}
            />
            <TimeDatePickerButton handleClear={handleClearDate} handleSet={handleSetDate} />
        </>
    );
}
