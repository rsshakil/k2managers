import { GoCalendar } from "react-icons/go";

const CalendarInput = ({ showCalendar, handleCalendarModal, placeholder, value, setShowCalendar, className, placeholderClick, name}) => {

    return (
        <div className={`flex items-center cursor-pointer justify-between relative w-[16.25rem] border-b border-cLightBlue ${className}`} onClick={() => {
            setShowCalendar(!showCalendar) 
        }
        }>
            <input
                type="text"
                className={`calendar-input placeholder-blue-400 text-cLightBlue pointer-events-none`}
                placeholder={placeholder}
                value={value}
                readOnly
                tabIndex="-1"
                name={name}
            />
            <GoCalendar className="text-right text-blue-50 z-10" />
        </div>
    );
};

export default CalendarInput;
