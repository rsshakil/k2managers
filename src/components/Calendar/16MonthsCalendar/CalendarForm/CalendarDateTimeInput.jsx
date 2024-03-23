import React, { useState } from 'react';
import { GoCalendar, GoClock } from 'react-icons/go';
import DatePicker from '../../../DatePicker/DatePicker';
import TimesPicker from '../../../TimePicker/TimesPicker';
import Calendar2 from '../../Calendar2';

const CalendarDateTimeInput = ({
    dateValueDate,
    timeValue,
    setDateValueDate,
    setTimeValue,
    datePicker,
    timePicker,
    nameTime,
}) => {
    const [showTimePicker, setShowTimePicker] = useState();

    const [showCalendarDate, setShowCalendarDate] = useState(false);

    return (
        <div className="flex justify-between w-full mt-2">
            {datePicker && (
                <div>
                    <div
                        className="flex items-center cursor-pointer justify-between relative
                w-[15.25rem] border border-solid border-blue-100"
                        onClick={() => {
                            setShowCalendarDate(!showCalendarDate);
                        }}
                    >
                        <input
                            className={`h-8 p-2 outline-none w-full text-blue-100 pointer-events-none`}
                            type="text"
                            value={dateValueDate}
                            name="eventCategoryStartDate"
                            readOnly
                            tabIndex="-1"
                        />
                        <GoCalendar className="text-right text-blue-50 z-10 mr-2" />
                    </div>

                    {showCalendarDate && (
                        <Calendar2
                            close={() => {
                                setShowCalendarDate(false);
                            }}
                            setDateValue={setDateValueDate}
                            components={
                                <DatePicker
                                    setDateValue={setDateValueDate}
                                    setShowCalendar={setShowCalendarDate}
                                    notStoreValue={true}
                                />
                            }
                        />
                    )}
                </div>
            )}
            {timePicker && (
                <div>
                    <div
                        className="flex items-center cursor-pointer justify-between relative w-[15.25rem] border border-solid border-blue-100"
                        onClick={() => {
                            setShowTimePicker(!showTimePicker);
                        }}
                    >
                        <input
                            className={`h-8 p-2 outline-none w-full text-blue-100 pointer-events-none`}
                            type="text"
                            value={timeValue}
                            name={nameTime}
                            readOnly
                            tabIndex="-1"
                        />

                        <GoClock className="text-right z-10 mr-2 text-blue-50" />
                    </div>

                    {showTimePicker && (
                        <Calendar2
                            className="w-[392px] h-[112px]"
                            close={() => {
                                setShowTimePicker(false);
                            }}
                            setDateValue={setTimeValue}
                            components={
                                <TimesPicker
                                    setDateValue={setTimeValue}
                                    setShowCalendar={setShowTimePicker}
                                    notStoreValue={true}
                                />
                            }
                        />
                    )}
                </div>
            )}
        </div>
    );
};
export default CalendarDateTimeInput;
