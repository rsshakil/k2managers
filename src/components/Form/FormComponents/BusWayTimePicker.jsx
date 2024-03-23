import React, { useEffect, useState } from 'react';
import { GoClock } from 'react-icons/go';
import Calendar2 from '../../Calendar/Calendar2';
import BusWayTimesPicker from '../../TimePicker/BusWayTimesPicker';

const BusWayTimePicker = ({ item, index, formType, busStopInitialTime, busStops, setBusStopsTime, busStopsTime }) => {
    // time picker range
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [timeValue, setTimeValue] = useState('00:00');
    const [selectIndex, setSelectIndex] = useState();

    // edit screen
    useEffect(() => {
        if (formType == 'edit') {
            setTimeValue(timeFormat(busStopInitialTime));
        }
    }, [busStopInitialTime]);

    // edit screen time formatter
    const timeFormat = (value) => {
        try {
            let value2 = '';
            if (value) {
                if (String(value).length == 3) {
                    value2 = '0' + String(value.slice(0, 1)) + ':' + String(value.slice(-2));
                } else {
                    value2 = String(value.slice(0, 2)) + ':' + String(value.slice(-2));
                }
                return value2;
            }
        } catch (error) {
            console.log('Time format error bus way time picker', error);
        }
    };

    return (
        <>
            {index == 0 ? (
                <></>
            ) : (
                <>
                    <div>
                        <p className="text-blue-100">{item[0]?.busStopName}</p>
                    </div>
                    <div className="flex">
                        <div className="flex !text-black">
                            <div className="">
                                {formType === 'add' && (
                                    <>
                                        <div className="w-full flex">
                                            {timeValue && (
                                                <p className="text-blue-100">{timeValue ? timeValue : '00:00'}</p>
                                            )}
                                            {(timeValue == false || timeValue == null) && (
                                                <p className="text-blue-100">{'00:00'}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                                {formType === 'edit' && (
                                    <>
                                        <div className="w-full flex">
                                            {timeValue && (
                                                <p className="text-blue-100">{timeValue ? timeValue : '00:00'}</p>
                                            )}
                                            {(timeValue == false || timeValue == null) && (
                                                <p className="text-blue-100">{'00:00'}</p>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                        <div
                            className="flex items-center cursor-pointer ml-8"
                            onClick={() => {
                                setSelectIndex(index);
                                setShowTimePicker(!showTimePicker);
                            }}
                        >
                            <GoClock className="text-right z-10 mr-2 text-blue-50" />
                        </div>
                        {showTimePicker && (
                            <Calendar2
                                className="w-[392px] h-[112px]"
                                close={() => {
                                    setShowTimePicker(false);
                                }}
                                setDateValue={''}
                                components={
                                    <BusWayTimesPicker
                                        setDateValue={setTimeValue}
                                        setShowCalendar={setShowTimePicker}
                                        index={item[0].busStopId} // Indexing data has been changes somehow from db
                                        busStops={busStops}
                                        formType={formType}
                                        setBusStopsTime={setBusStopsTime}
                                        busStopsTime={busStopsTime}
                                        timeValue={timeValue}
                                    />
                                }
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};
export default BusWayTimePicker;
