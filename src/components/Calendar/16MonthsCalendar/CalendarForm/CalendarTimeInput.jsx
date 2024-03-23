import React, { useState } from 'react';
import { GoClock } from 'react-icons/go';
import TimesPicker from '../../../TimePicker/TimesPicker';
import Calendar2 from '../../Calendar2';

const CalendarTimeInput = ({ timeValue, timePicker }) => {
    // time picker
    const [showTimePicker, setShowTimePicker] = useState();

    /* const [field] = useField(props);*/
    return (
        <div className="flex justify-between w-full mt-2">
            {timePicker && (
                <div>
                    <div
                        className="flex items-center cursor-pointer justify-between relative w-[60.00rem] border-b-2 border-solid border-blue-100"
                        onClick={() => {
                            setShowTimePicker(!showTimePicker);
                        }}
                    >
                        <input
                            className={`h-8 p-2 outline-none w-full bg-transparent text-white pointer-events-none`}
                            type="text"
                            value={timeValue}
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
                                    setDateValue={timeValue}
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
export default CalendarTimeInput;
