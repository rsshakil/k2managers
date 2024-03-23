import React, { useState } from 'react';
import { GoClock } from 'react-icons/go';
import TimesPicker from '../../../TimePicker/TimesPicker';
import Calendar2 from '../../Calendar2';

const CalendarTimeInputBox = ({ label, timeValue, timePicker }) => {
    // time picker
    const [showTimePicker, setShowTimePicker] = useState();

    const [dateValue, setDateValue] = useState('');

    return (
        <div className="flex w-full mt-2">
            {timePicker && (
                <div className="w-full">
                    <div
                        className="flex items-center cursor-pointer bg-blue-25
                        justify-between relative border border-solid border-blue-100"
                        onClick={() => {
                            setShowTimePicker(!showTimePicker);
                        }}
                    >
                        <input
                            className={`h-8 p-2 outline-none bg-blue-25 w-full text-blue-100 pointer-events-none`}
                            type="text"
                            value={dateValue ? dateValue : ''}
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
                            setDateValue={timeValue}
                            components={
                                <TimesPicker
                                    setDateValue={setDateValue}
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
export default CalendarTimeInputBox;
