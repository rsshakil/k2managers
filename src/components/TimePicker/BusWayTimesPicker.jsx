import moment from 'moment';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import React, { useEffect, useState } from 'react';
import TimeDatePickerButton from '../Button/TimeDatePickerButton';

// global declaration
const pathname = window.location.pathname;
const routeName = pathname.split('/').pop();
// const keyName = routeName + "_timestamp_" + "TimePicker_BusWay"
const keyName = 'bus_way_add_timestamp_TimePicker_BusWay'; //bus_way_add_timestamp_TimePicker_BusWay

const format = 'HH:mm';
const now = moment();

const BusWayTimesPicker = ({
    setDateValue,
    setShowCalendar,
    index,
    timeValue,
    formType,
    setBusStopsTime,
    busStopsTime,
}) => {
    const [values, setValues] = useState();
    const [time, setTime] = useState();

    useEffect(() => {
        if (formType == 'edit') {
            try {
                const date = new Date().toDateString() + ` ${timeValue ? timeValue : '00:00'}:00`; //Thu Dec 08 2022 10:00:18 GMT+0600 (Bangladesh Standard Time)
                let dateUp = new Date(date);
                const aMoment = moment(dateUp);
                setValues(aMoment);
            } catch (error) {
                console.log('error busWayTimePicker component initial time set in the box', error);
            }
        } else {
            try {
                const date = new Date().toDateString() + ` 00:00:00`; //Thu Dec 08 2022 10:00:18 GMT+0600 (Bangladesh Standard Time)
                let dateUp = new Date(date);
                const aMoment = moment(dateUp);
                setValues(aMoment);
            } catch (error) {
                console.log('error busWayTimePicker component initial time set in the box', error);
            }
        }
    }, [index]);

    function onChange(value) {
        setValues(value);
        try {
            let str = value && value.format(format);
            if (str) {
                str = str.replace(/:/g, ''); // str = 'asd';
                setTime(str);
            }
        } catch (error) {
            console.log('Value removed and make null');
        }
    }

    const handleSetTime = () => {
        //new code using state
        let timeArray = [index, +time]; // time array store in [[timeArray]]
        //check are there same busStopId
        let copyBusStopsTime = [...busStopsTime];
        if (copyBusStopsTime.length > 0) {
            // if there is no value selected it will go else condition and set the value
            let foundId = 0;
            //checking already busstopsid exist if exist so it will just update the value if there is not busstopid so it will add the time array
            for (let i = 0; i < copyBusStopsTime.length; i++) {
                let singleArray = copyBusStopsTime[i];
                let busStopId = singleArray[0];
                if (busStopId == index) {
                    copyBusStopsTime[i] = [...timeArray];
                    foundId = 1;
                }
            }
            if (foundId === 1) {
                //existing bus stop id is there so set update time array
                setBusStopsTime([...copyBusStopsTime]);
            }
            if (foundId === 0) {
                // not existing bus stop id is there so set the time array
                setBusStopsTime([...busStopsTime, timeArray]);
            }
        } else {
            setBusStopsTime([...busStopsTime, timeArray]);
        }

        setShowCalendar(false);
        setDateValue(values && values.format(format));
    };

    // clear the date
    const handleClearTime = () => {
        // if form type is add this condition will work
        if (formType == 'add') {
            //new code using state
            let copyBusStopsTime = [...busStopsTime];
            if (copyBusStopsTime.length > 0) {
                // if there is no value selected it will go else condition and set the value
                let foundId = 0;
                //checking already busstopsid exist if exist so it will just update the value if there is not busstopid so it will add the time array
                for (let i = 0; i < copyBusStopsTime.length; i++) {
                    let singleArray = copyBusStopsTime[i];
                    let busStopId = singleArray[0];
                    if (busStopId == index) {
                        copyBusStopsTime[i] = [index, '0000'];
                        foundId = 1;
                    }
                }
                if (foundId === 1) {
                    //existing bus stop id is there so set update time array
                    setBusStopsTime([...copyBusStopsTime]);
                }
            }
        }
        if (formType == 'edit') {
            //new code using state
            let copyBusStopsTime = [...busStopsTime];
            if (copyBusStopsTime.length > 0) {
                // if there is no value selected it will go else condition and set the value
                let foundId = 0;
                //checking already busstopsid exist if exist so it will just update the value if there is not busstopid so it will add the time array
                for (let i = 0; i < copyBusStopsTime.length; i++) {
                    let singleArray = copyBusStopsTime[i];
                    let busStopId = singleArray[0];
                    if (busStopId == index) {
                        copyBusStopsTime[i] = [index, '0000'];
                        foundId = 1;
                    }
                }
                if (foundId === 1) {
                    //existing bus stop id is there so set update time array
                    setBusStopsTime([...copyBusStopsTime]);
                }
            }
        }

        setDateValue('00:00');
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
                    allowEmpty={false}
                    use24Hours
                />
            </div>

            <TimeDatePickerButton handleClear={handleClearTime} handleSet={handleSetTime} />
        </>
    );
};

export default BusWayTimesPicker;
