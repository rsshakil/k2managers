import { format } from 'date-fns';
import DialogModal from '../Modal/DialogModal';
import { holidayList } from './data';

const dxGanttConfig = {};
const typeCategory = 'category',
    typeEvent = 'event',
    typeInstitute = 'institute',
    typeDate = 'date',
    categoryTypeItem = 'item',
    categoryTypeCounselor = 'counselor'; //counselor

export const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
};
/*const navigate = useNavigate()*/

const modalOpen = (e) => {
    return <DialogModal />;
};

// Onclick handler START
dxGanttConfig.onTaskEditDialogShowing = (e) => {
    alert('onTaskEditDialogShowing ❗️❗️️️');
    e.cancel = true;
};
dxGanttConfig.onTaskClick = (e) => {
    e.data.type === typeDate
        ? e.event.target.className === 'dx-gantt-task-edit-frame'
            ? openInNewTab('/slotTable')
            : console.log(' ️️')
        : console.log(' ️');
    e.cancel = true;
};
dxGanttConfig.onTaskDblClick = (e) => { 
    e.cancel = true;
};

dxGanttConfig.TaskTooltipTemplate = (data) => {
    return (
        <div className="custom-task-edit-tooltip p-2 bg-black text-white rounded-md opacity-80">
            {/* Only for where BUS ICON */}
            {data?.type === typeInstitute ? (
                data?.bus ? (
                    <div className="custom-tooltip-row">バス検診</div>
                ) : null
            ) : null}

            {/* Check Type Date, show with Date y/m/d */}
            {data?.type === typeDate ? (
                <div className="custom-tooltip-title">{data.title}</div>
            ) : (
                <div className="custom-tooltip-title">{data.title}</div>
            )}

            <div className="custom-tooltip-row">
                受付期間開始 : {format(data.receptionDatetimeFrom, 'y/MM/dd HH:mm')}
            </div>
            <div className="custom-tooltip-row">受付期間終了 : {format(data.receptionDatetimeTo, 'y/MM/dd HH:mm')}</div>
        </div>
    );
};

// Gantt Tooltips END
// Gantt Header ScaleIndex START

dxGanttConfig.onScaleCellPrepared = (e) => {
    if (e.startDate.getDay() === 0 && e.scaleIndex === 0) {
        e.scaleElement.style.color = '#ff4b00'; //red color for sunday
    } else if (e.startDate.getDay() === 6 && e.scaleIndex === 0) {
        e.scaleElement.style.color = '#00A2FF'; //blue color for saturday
    } else {
        e.scaleElement.style.color = '#000000'; //black for other days
    }
    // highlight holidays
    if (holidayList.some((d) => new Date(d.date).getTime() === e.startDate.getTime()) && e.scaleIndex === 0) {
        e.scaleElement.style.color = 'red';
    }

    if (e.scaleIndex === 1) {
        let yearMonth = `${e.startDate.getFullYear()}年${e.startDate.getMonth() + 1}月`;
        e.scaleElement.innerText = yearMonth;
        e.scaleElement.title = yearMonth;
    } else {
        e.scaleElement.innerText = e.startDate.getDate();
        e.scaleElement.title = e.startDate.getDate();
    }
};
// Gantt Header ScaleIndex END

dxGanttConfig.onModalOpen = (e) => {};

export default dxGanttConfig;
