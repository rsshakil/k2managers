import { format, isAfter, isBefore, isValid, parse, set } from 'date-fns';
import ja from 'date-fns/locale/ja';
import React, { useEffect, useState } from 'react';
import { DayPicker } from 'react-day-picker';
import TimeDatePickerButton from '../Button/TimeDatePickerButton';

export default function DatePickerCalendar({ setDateValue, closeCalendar: closeCalendar, setShowCalendar, setSelectedDate }) {
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();
    const keyName = routeName + '_timestamp_' + 'DateRangePicker';
    const separator = ' ~ ';

    const [selectedRange, setSelectedRange] = useState({});
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');

    const formatYearCaption = function (date, options) {
        var y = date.getFullYear();
        return `${y}年`;
    };

    // if there is value of date range in local it will change the value and set in to the calendar
    useEffect(() => {
        const item = sessionStorage.getItem(`${keyName}`);
        const range = JSON.parse(item);
        if (range) {
            if (range?.from && range?.to) {
                setSelectedRange({
                    from: new Date(range.from) || '',
                    to: new Date(range.to) || '',
                });

                try {
                    const rangeFrom = new Date(range.from);
                    const rangeTo = new Date(range.to);

                    setFromValue(format(rangeFrom, 'y/MM/dd'));
                    setToValue(format(rangeTo, 'y/MM/dd'));
                    const valueSet = format(rangeFrom, 'y/MM/dd') + separator + format(rangeTo, 'y/MM/dd');
                    setDateValue(valueSet);
                } catch (error) {
                    console.log('range.from && range.from error', error);
                }
            } else if (range?.from) {
                setSelectedRange({
                    from: new Date(range.from) || '',
                    to: new Date(range.from) || '',
                    initial: true,
                });

                try {
                    const rangeFrom = new Date(range.from);
                    const rangeTo = new Date(range.to);

                    setFromValue(format(rangeFrom, 'y/MM/dd'));
                    const valueSet = format(rangeFrom, 'y/MM/dd') + separator;
                    setDateValue(valueSet);
                } catch (error) {
                    console.log('range.form error');
                }
            }
        }
    }, []);

    // onChange date value in range
    const handleFromChange = (e) => {
        setFromValue(e.target.value);
        const date = parse(e.target.value, 'y/MM/dd', new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: undefined, to: undefined });
        }
        if (selectedRange?.to && isAfter(date, selectedRange.to)) {
            setSelectedRange({ from: selectedRange.to, to: date });
        } else {
            setSelectedRange({ from: date, to: selectedRange?.to });
        }
    };
    // onChange date value in range
    const handleToChange = (e) => {
        setToValue(e.target.value);
        const date = parse(e.target.value, 'y/MM/dd', new Date());
        if (!isValid(date)) {
            return setSelectedRange({ from: selectedRange?.from, to: undefined });
        }
        if (selectedRange?.from && isBefore(date, selectedRange.from)) {
            setSelectedRange({ from: date, to: selectedRange.from });
        } else {
            setSelectedRange({ from: selectedRange?.from, to: date });
        }
    };

    // after selecting value it will select the range between the two dates
    const handleRangeSelect = (range) => {
        try {
            setSelectedRange(range);
            if (range?.from) setFromValue(format(range.from, 'y/MM/dd'));
            else setFromValue('');
            if (range?.to) setToValue(format(range.to, 'y/MM/dd'));
            else setToValue('');
        } catch (error) {
            console.log('handleRangeSelect function error', error);
        }
    };

    // clear local storage date also close the modal
    const handleClearDate = () => {
        setSelectedDate && setSelectedDate('');
        setSelectedRange({});
        setFromValue('');
        setToValue('');
        setDateValue('');
        window.sessionStorage.removeItem(`${keyName}`);
        setShowCalendar && setShowCalendar(false);
        closeCalendar && closeCalendar();
    };

    // set value in local storage
    const handleSelectValue = () => {
        try {
            if (selectedRange.initial) {
                setSelectedDate && setSelectedDate({ from: selectedRange.from.toString() });
                sessionStorage.setItem(`${keyName}`, JSON.stringify({ from: selectedRange.from.toString() }));

                const valueSet = format(selectedRange.from, 'y/MM/dd') + separator + '';
                setDateValue(valueSet);
                setShowCalendar && setShowCalendar(false);
                closeCalendar && closeCalendar();
            } else {
                if (selectedRange?.from && selectedRange?.to) {
                    const dateAndTimeSet = set(new Date(selectedRange?.to), { hours: 23, minutes: 59, seconds: 59 });

                    setSelectedDate &&
                        setSelectedDate({
                            from: selectedRange.from.toString(),
                            to: dateAndTimeSet.toString(),
                        });

                    sessionStorage.setItem(
                        `${keyName}`,
                        JSON.stringify({
                            from: selectedRange.from.toString(), // to local string
                            to: dateAndTimeSet.toString(),
                        })
                    );

                    // this is for input field in calendar
                    const valueSet =
                        format(selectedRange.from, 'y/MM/dd') + separator + format(selectedRange.to, 'y/MM/dd');
                    setDateValue(valueSet);
                    setShowCalendar && setShowCalendar(false);
                    closeCalendar && closeCalendar();
                } else if (selectedRange?.from) {
                    setSelectedDate && setSelectedDate({ from: selectedRange.from.toString() });
                    sessionStorage.setItem(`${keyName}`, JSON.stringify({ from: selectedRange.from.toString() }));

                    // this is for input field in calendar
                    const valueSet = format(selectedRange.from, 'y/MM/dd') + separator + '';
                    setDateValue(valueSet);
                    setShowCalendar && setShowCalendar(false);
                    closeCalendar && closeCalendar();
                } else {
                    console.log('handle not set any value from and to');
                }
            }
        } catch (error) {
            console.log('set date range in local');
        }
    };

    return (
        <div className="flex flex-col h-[426px]">
            <DayPicker
                locale={ja}
                mode="range"
                fromYear={2015}
                toYear={2025}
                selected={selectedRange}
                // defaultMonth={pastMonth} Selected month will show if you uncomment
                onSelect={handleRangeSelect}
                fixedWeeks={true}
                captionLayout="dropdown"
                formatters={{ formatYearCaption }}
                footer={
                    <form className="ma2 flex justify-between">
                        <input
                            size={10}
                            value={fromValue}
                            onChange={handleFromChange}
                            className="input-reset pa2 ma bg-white black border px-4 border-black ba"
                        />
                        <span className="leading-8">～</span>
                        <input
                            size={10}
                            value={toValue}
                            onChange={handleToChange}
                            className="input-reset pa2 bg-white border px-4 border-black black ba"
                        />
                    </form>
                }
            />
            <TimeDatePickerButton handleClear={handleClearDate} handleSet={handleSelectValue} />
        </div>
    );
}
