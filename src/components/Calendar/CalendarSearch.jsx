import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './Calendar.css';
import DatePickerSearch from './DatePickerSearch';

const CalendarSearch = ({ close, calendarDate, setCalendarDate, className, setDateValue,changeCalDate=()=>{} }) => {
    const handleClose = () => {
        close();
    };

    return (
        <>
            <div tabIndex={-1} className="w-screen h-full modal_overlay" onClick={handleClose}>
                <div
                    className="absolute !flex justify-center align-middle items-center"
                    onClick={(e) => e.stopPropagation()}
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}
                >
                    <div
                        className={`fixed flex flex-col align-middle shadow-calendarShadow justify-center bg-white w-[392px] h-[458px] p-[16px] items-center ${className}`}
                    >
                        <DatePickerSearch
                            setDateValue={setDateValue} // for place holder
                            calendarDate={calendarDate} // for state value
                            setCalendarDate={setCalendarDate} // for state value
                            closeCalendar={handleClose} // close calendar
                            changeCalDate={changeCalDate} //for getting change
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CalendarSearch;
