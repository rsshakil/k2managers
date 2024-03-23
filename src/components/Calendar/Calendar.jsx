import { getUnixTime } from 'date-fns/esm';
import { useContext } from 'react';
import { DateRangePicker } from 'react-date-range';
import * as locales from 'react-date-range/dist/locale';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { dateFormat, getEndDateUnixTime } from '../../lib/date';
import { UnixTsToStringYYMMDD } from '../../lib/unixTsToString';
import { DataManageContext } from '../../routes/Router';
import SVGComponent from '../Table/UpperSection/svgviewer-searchicon';
import './Calendar.css';
const Calendar = ({
    close,
    setPlaceholderDynamic,
    dateRange,
    setDateRange,
    setOnChangeDateRange,
    setControlFunction,
    controlFunction,
    placeholder,
    initialDateRange,
    setIsCloseClicked,
}) => {
    const [dataManage, setDataManage] = useContext(DataManageContext);

    const handleSearch = () => {
        const startDate = getUnixTime(dateRange[0].startDate);
        const endDate = getEndDateUnixTime(dateRange[0].endDate); //added next 23 hours 59 minutes and 59 sec

        const { start, end } = dataManage;
        let dateSelected = dataManage.func;
        dateSelected({ startDate, endDate, startName: start, endName: end });

        const sDateConvert = UnixTsToStringYYMMDD(startDate);
        const eDateConvert = UnixTsToStringYYMMDD(endDate);
        let totalDate = sDateConvert + '-' + eDateConvert;
        setPlaceholderDynamic(totalDate);
        setControlFunction(controlFunction ? false : true);
        setIsCloseClicked(false);
        close();
    };
    const handleClose = () => {
        const startDate = getUnixTime(initialDateRange[0].startDate);
        const endDate = getUnixTime(initialDateRange[0].endDate); //it  is already made as end of the day

        setDateRange(initialDateRange);
        setPlaceholderDynamic(placeholder);
        let dateSelected = dataManage.func;
        const { start, end } = dataManage;
        dateSelected({ startDate, endDate, startName: start, endName: end });
        setIsCloseClicked(true);
        close();
    };

    return (
        <>
            {/* parent calendar */}
            <div className="modal_overlay" onClick={handleClose} />
            <div className="modal-backdrop max-w-full z-40">
                {/* calendar */}
                <div className="flex flex-col shadow-calendarShadow justify-center bg-white pb-2 w-25 h-17 mt-20 p-10">
                    <DateRangePicker
                        onChange={(item) => {
                            setDateRange([item.selection]);
                            setOnChangeDateRange([item.selection]);
                        }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={2}
                        ranges={dateRange}
                        direction="horizontal"
                        showPreview={true}
                        showDateDisplay={true}
                        showMonthAndYearPickers={true}
                        className="w-25 h-17"
                        dateDisplayFormat={`${dateFormat}（EEE）`}
                        monthDisplayFormat="yyyy年MMM"
                        shownDate={dateRange[0].endDate}
                        calendarFocus="backwards"
                        preventSnapRefocus={true}
                        locale={locales['ja']}
                    />

                    <div className="flex justify-between mr-3">
                        <button
                            className="flex border-2 ml-3 p-1 rounded bg-calendarInputBg text-base"
                            onClick={handleClose}
                        >
                            <span>クリア</span>
                        </button>
                        <button
                            className="flex justify-center items-center space-x-2 border-2 p-1 rounded bg-calendarInputBg text-base"
                            onClick={handleSearch}
                        >
                            <span> 検索</span>
                            <SVGComponent />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Calendar;
