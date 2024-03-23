import React, { useState } from 'react';
import DatePicker from '../../DatePicker/DatePicker';
import CalendarInput from '../../Table/UpperSection/Calendar/CalendarInput';
import TimeRangePicker from '../../TimePicker/TimeRangePicker';
import TimesPicker from '../../TimePicker/TimesPicker';
import Calendar2 from '../Calendar2';
import DatePickerCalendar from '../DatePickerCalendar';

const DatePickerLayout = ({ }) => {

    //calendar show date range
    const [showCalendar, setShowCalendar] = useState(false)
    const [dateValue, setDateValue] = useState("")

    // day picker 
    const [showCalendarDate, setShowCalendarDate] = useState(false)
    const [dateValueDate, setDateValueDate] = useState("")
    // day picker not storage in local also not reload data get
    const [showCalendarDate1, setShowCalendarDate1] = useState(false)
    const [dateValueDate1, setDateValueDate1] = useState("")

    // time picker range
    const [showTimeRangePicker, setShowTimeRangePicker] = useState()
    const [timeRangeValue, setTimeRangeValue] = useState("")
    // time picker
    const [showTimePicker, setShowTimePicker] = useState()
    const [timeValue, setTimeValue] = useState("")

    // time picker not storage in local also not reload data get
    const [showTimePicker1, setShowTimePicker1] = useState()
    const [timeValue1, setTimeValue1] = useState("")
    return (
        <div>
            <p>Store Value in Local Storage and get the value after reload</p>
            {/* date reange picker */}
            <CalendarInput
                placeholder="Date RangePicker"
                showCalendar={showCalendar}
                value={dateValue}
                setShowCalendar={setShowCalendar}
            />
            {showCalendar && (
                <Calendar2
                    close={() => { setShowCalendar(false) }}
                    setDateValue={setDateValue}
                    components={<DatePickerCalendar
                        setDateValue={setDateValue}
                        setShowCalendar={setShowCalendar}
                    />}
                />
            )}

            {/* date picker */}
            <CalendarInput
                placeholder="Date Picker"
                showCalendar={showCalendarDate}
                value={dateValueDate}
                setShowCalendar={setShowCalendarDate}
            />
            {showCalendarDate && (
                <Calendar2
                    close={() => { setShowCalendarDate(false) }}
                    setDateValue={setDateValueDate}
                    components={<DatePicker
                        setDateValue={setDateValueDate}
                        setShowCalendar={setShowCalendarDate} />}
                />
            )}

            {/* time range picker */}
            <CalendarInput
                placeholder="Time Range Picker"
                showCalendar={showTimeRangePicker}
                setShowCalendar={setShowTimeRangePicker}
                value={timeRangeValue && timeRangeValue}
            />
            {showTimeRangePicker && (
                <Calendar2
                    className="w-[392px] h-[112px]"
                    close={() => { setShowTimeRangePicker(false) }}
                    setDateValue={setTimeRangeValue}
                    components={<TimeRangePicker setDateValue={setTimeRangeValue} close={() => { setShowTimeRangePicker(false) }} />}
                />
            )}

            {/* time picker */}
            <CalendarInput
                placeholder="Time Picker"
                showCalendar={showTimePicker}
                setShowCalendar={setShowTimePicker}
                value={timeValue}
            />
            {showTimePicker && (
                <Calendar2
                    className="w-[392px] h-[112px]"
                    close={() => { setShowTimePicker(false) }}
                    setDateValue={setTimeValue}
                    components={<TimesPicker setDateValue={setTimeValue} setShowCalendar={setShowTimePicker} />}
                />
            )}

            <p>Not Store Value in Local Storage and Not get the value after reload</p>
            {/* date picker do not store in local */}
            <CalendarInput
                placeholder="Date Picker"
                showCalendar={showCalendarDate1}
                value={dateValueDate1}
                setShowCalendar={setShowCalendarDate1}
            />
            {showCalendarDate1 && (
                <Calendar2
                    close={() => { setShowCalendarDate1(false) }}
                    setDateValue={setDateValueDate1}
                    components={<DatePicker
                        setDateValue={setDateValueDate1}
                        setShowCalendar={setShowCalendarDate1}
                        notStoreValue={true}
                    />}
                />
            )}

            {/* time picker do not store in local */}
            <CalendarInput
                placeholder="Time Picker"
                showCalendar={showTimePicker1}
                setShowCalendar={setShowTimePicker1}
                value={timeValue1}
            />
            {showTimePicker1 && (
                <Calendar2
                    className="w-[392px] h-[112px]"
                    close={() => { setShowTimePicker1(false) }}
                    setDateValue={setTimeValue1}
                    components={
                        <TimesPicker
                            setDateValue={setTimeValue1}
                            setShowCalendar={setShowTimePicker1}
                            notStoreValue={true}
                        />}
                />
            )}
        </div>
    );
};

export default DatePickerLayout;