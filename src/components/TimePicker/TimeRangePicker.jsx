import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useEffect, useState } from 'react';
import TimeDatePickerButton from '../Button/TimeDatePickerButton';
import './TimeRangePicker.css';

const TimeRangePicker = ({ setDateValue, close }) => {
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();
    const keyName = routeName + '_timestamp_' + 'TimeRangePicker';
    const separator = ' ~ ';
    const now = moment();

    const [from, setFrom] = useState({});
    const [to, setTo] = useState({});

    useEffect(() => {
        const item = JSON.parse(localStorage.getItem(keyName));
        let valueSet = '';
        let toValueSet = '';
        let fromValueSet = '';
        try {
            if (item) {
                const { time_from, time_to } = item;

                if (time_from) {
                    const aMomentFrom = moment(time_from);
                    console.log('Convert in Moment From:', aMomentFrom);
                    setFrom({ value: aMomentFrom });
                    fromValueSet = `${aMomentFrom.format('HH:mm')}`;
                }
                if (time_to) {
                    console.log('Time_TO TRUE');
                    const aMomentTo = moment(time_to);
                    console.log('Convert in Moment   To:', aMomentTo);
                    setTo({ val: aMomentTo });
                    toValueSet = `${aMomentTo.format('HH:mm')}`;
                }
                valueSet = fromValueSet + separator + toValueSet;
                setDateValue(valueSet);
                // setValues(aMoment)
            }
        } catch (error) {
            console.log('Set time range by useEffect');
        }
    }, []);
    // handle form change
    const handleValueChange = (value) => {
        setFrom({ value });
    };
    // handle to change
    const handleChange = (val) => {
        setTo({ val });
    };

    const handleClick = () => {
        let timeObj = { time_from: '', time_to: '' };
        let valueSet = '';
        let toValueSet = '';
        let fromValueSet = '';

        if (from.value) {
            const aJsDate = from.value.toDate();
            timeObj = { ...timeObj, time_from: `${aJsDate}` };
            // time from add
            localStorage.setItem(keyName, JSON.stringify(timeObj));
            // localStorage.setItem("time_from", aJsDate)

            const fromValue = from.value;
            fromValueSet = `${fromValue.format('HH:mm')}`;
        }
        //saving data to local storage

        if (to.val) {
            const aJsDate = to.val.toDate();

            timeObj = { ...timeObj, time_to: `${aJsDate}` };

            localStorage.setItem(keyName, JSON.stringify(timeObj));

            const toValue = to.val;
            toValueSet = `${toValue.format('HH:mm')}`;
        }

        valueSet = fromValueSet + separator + toValueSet;
        setDateValue(valueSet);
        close();
    };
    const clear = () => {
        setDateValue('');
        setFrom({
            value: undefined,
        });
        setTo({
            val: undefined,
        });
        window.localStorage.removeItem(keyName);

        close();
    };

    return (
        <>
            <div className="flex justify-center items-center align-middle">
                <div className="flex justify-between items-center">
                    <TimePicker value={from.value} showSecond={false} onChange={handleValueChange} />
                    <span className="leading-8">～</span>
                    <TimePicker value={to.val} showSecond={false} onChange={handleChange} />
                </div>
            </div>

            <TimeDatePickerButton handleClear={clear} handleSet={handleClick} />
        </>
    );
};

export default TimeRangePicker;
