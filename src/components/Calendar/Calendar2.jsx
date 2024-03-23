import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import './Calendar.css';
import DatePickerCalendar from './DatePickerCalendar';

const Calendar2 = ({ close, setDateValue, components, setSelectedDate, className }) => {
    const handleClose = () => close();

    return (
        <>
            <div tabIndex={-1} className="w-screen h-full modal_overlay" onClick={handleClose}>
                <div
                    className="absolute !flex justify-center align-middle items-center"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: '1000' }}
                >
                    <div
                        className={`fixed flex flex-col align-middle shadow-calendarShadow justify-center bg-white w-[392px] h-[458px] p-[16px] items-center ${className}`}
                    >
                        {components ? (
                            components
                        ) : (
                            <DatePickerCalendar
                                setDateValue={setDateValue}
                                closeCalendar={handleClose}
                                setSelectedDate={setSelectedDate}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar2;
