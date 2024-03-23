import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';
import Calendar2 from '../Calendar/Calendar2';
import DatePicker from '../DatePicker/DatePicker';
import TableControls from '../Table/TableControls';
import CalendarInput from '../Table/UpperSection/Calendar/CalendarInput';
import { optionArray } from './data';

const GanttFilter = () => {
    const navigate = useNavigate()
    const { state: { eventName } } = useLocation();
    const [dateValueDate, setDateValueDate] = useState('');
    const [showCalendarDate, setShowCalendarDate] = useState(false);
    const { values, handleChange } = FilterComMethods({ categoryId: '', instituteName: '' });

    return (
        <TableControls.UpperSection>
            <div className="flex">
                <div onClick={() => navigate('/event_list')} className=" text-blue-50 font-bold cursor-pointer">
                    <span className="underline "> イベント </span>
                </div>
                <span className="text-blue-50 font bold pl-2"> &gt;</span>
                <TableControls.NumberOfRecords recordsLabel="スケジューラー " numberOfRecords={`${eventName}`} />
            </div>
{/*
            <div className="flex justify-between">
                <CalendarInput
                    className="!w-[9.25rem]"
                    placeholder="開始日"
                    showCalendar={showCalendarDate}
                    value={dateValueDate}
                    setShowCalendar={setShowCalendarDate}
                />
                {showCalendarDate && (
                    <Calendar2
                        close={() => {
                            setShowCalendarDate(false);
                        }}
                        setDateValue={setDateValueDate}
                        components={
                            <DatePicker setDateValue={setDateValueDate} setShowCalendar={setShowCalendarDate} />
                        }
                    />
                )}
                <TableControls.Selection
                    defaultValue="全カテゴリー"
                    name="categoryId"
                    options={optionArray}
                    value={values.categoryId}
                    onChange={handleChange}
                />
            </div>
 */}
        </TableControls.UpperSection>
    );
};
export default GanttFilter;
