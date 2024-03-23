import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useEffect, useState } from 'react';
import TimeDatePickerButton from '../Button/TimeDatePickerButton';

// global declaration
const pathname = window.location.pathname;
const routeName = pathname.split('/').pop();
const keyName = routeName + '_timestamp_' + 'TimePicker';

const format = 'HH:mm';
const now = moment();

const TimesPicker = ({ setDateValue, setShowCalendar, notStoreValue, value }) => {
    const [values, setValues] = useState();

    useEffect(() => {
        const item = localStorage.getItem(keyName);
        try {
            if (notStoreValue) {
                if (value) {
                    const hour = value.slice(0, 2);
                    const minutes = value.slice(3);

                    const typeOfHour = typeof hour;
                    const typeOfMinutes = typeof minutes;
                    if (typeOfHour === 'object' && typeOfMinutes === 'object') {
                    } else {
                        const newDate = new Date();
                        newDate.setHours(parseInt(hour));
                        newDate.setMinutes(parseInt(minutes));
                        const aMoment = moment(newDate);
                        setValues(aMoment);
                        setDateValue(aMoment && aMoment.format(format));
                    }
                }
            } else {
                if (item) {
                    const aMoment = moment(item);
                    setValues(aMoment);
                    setDateValue(aMoment && aMoment.format(format));
                }
            }
        } catch (error) {
            console.log('date picker error', error);
        }
    }, []);

    function onChange(value) {
        setValues(value);
    }

    const handleSetTime = () => {
        const aJsDate = values.toDate();

        if (notStoreValue) {
            setDateValue && setDateValue(values && values.format(format));
            setShowCalendar(false);
        } else {
            localStorage.setItem(keyName, aJsDate);
            sessionStorage.setItem(keyName, aJsDate);
            // localStorage.setItem(key, JSON.stringify(value));  `${}`
            setDateValue(values && values.format(format));
            setShowCalendar(false);
        }
    };

    const handleClearTime = () => {
        window.localStorage.removeItem(keyName);
        setDateValue('');
        setShowCalendar && setShowCalendar(false);
    };

    return (
        <>
            <div className="flex justify-center items-center space-x-4 align-middle">
                <TimePicker
                    showSecond={false}
                    defaultValue={values}
                    value={values}
                    className="xxx"
                    onChange={onChange}
                    format={format}
                    use24Hours
                />
            </div>

            <TimeDatePickerButton handleClear={handleClearTime} handleSet={handleSetTime} />
        </>
    );
};

export default TimesPicker;
