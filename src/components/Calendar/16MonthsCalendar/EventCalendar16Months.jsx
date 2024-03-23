import React, { useEffect } from 'react';
import { format } from 'date-fns';
import Scheduler from 'devextreme-react/scheduler';
import { locale } from 'devextreme/localization';
import { useRef, useState } from 'react';
import { baseURL, listEventInstituteCalendar, listMethod } from '../../../restapi/queries';
import { instance } from '../../../services/axios.js';
import ModalTitle from '../../Modal/components/ModalTitle';
import TransparentModalWrapper from '../../Modal/components/TransparentModalWrapper';
import CalendarForm from './CalendarForm/CalendarForm';
import { defaultData } from './StoreService/data';
import export16Store from './StoreService/storeDataLS';
import UpperSection16Months from './UpperSection16Months';
import YearMonthCalendarTitle from './YearMonthCalendarTitle';

// GLOBAL DECLARATION START
let initialValues = {
    resStartDate: '',
    resEndDate: '',
    resStartTime: '',
    resEndTime: '',
    eventInstituteReserveDateFrom: 12,
    eventInstituteReserveTimeFrom: 8,
    eventInstituteReserveDateTo: 11,
    eventInstituteReserveTimeTo: 24,
    memo: '',
};

export default function EventCalendar16Months({
    setOpenModal16MonthCal,
    path = 'k2_layout_design',
    eventInstituteId,
    eventInstituteName,
    eventId,
    eventInstituteItemType,
}) {
    locale('ja-JP');

    const [dateTimeObj, setDateTimeObj] = useState({
        resStartDate: '',
        resEndDate: '',
        resStartTime: '',
        resEndTime: '',
    });
    const [calendarData, setCalendarData] = useState(defaultData);
    const [calendarTemplate, setCalendarTemplate] = useState([]);

    // LOCAL DECLARATION START
    const schedulerRef = useRef();
    const [records, setRecords] = useState([]),
        [cellDuration, setCellDuration] = useState(10),
        [currentYear, setCurrentYear] = useState(format(new Date(), 'y')),
        [selectedDate, setSelectedDate] = useState('');

    useEffect(() => {
        export16Store.storeDateLS({ selectedDate, setRecords, path, calendarData, eventInstituteId });
        setSelectedDate('');
    }, [selectedDate, calendarData]);

    useEffect(() => {
        // 施設情報の取得
        const fetchEventInstituteCalendar = async () => {
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                // get event list
                let ENDPOINT = `${baseURL}${listEventInstituteCalendar}${eventInstituteId}?pid=${projectId}&eid=${eventId}`;
                let config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                let response = await instance.request(config);
                let result = await response.data;
                if (result.error) throw new Error(result.error);
                if (result.records !== undefined) {
                    result.records.initFlag = false;
                    setCalendarData(result.records.eventInstituteMappingStyle);
                    const updateFlag = true;
                    let initialCalendarData = result.records.eventInstituteMappingStyle;
                    // 日付を分解
                    let resStartDate = new Date(result.records.eventInstituteStartDate * 1000);
                    let resEndDate = new Date(result.records.eventInstituteEndDate * 1000);

                    initialValues.resStartDate =
                        resStartDate.getFullYear() + '/' + (resStartDate.getMonth() + 1) + '/' + resStartDate.getDate();
                    initialValues.resStartTime =
                        initialValues.resStartDate +
                        ' ' +
                        ('0' + resStartDate.getHours()).slice(-2) +
                        ':' +
                        ('0' + resStartDate.getMinutes()).slice(-2);
                    initialValues.resEndDate =
                        resEndDate.getFullYear() + '/' + (resEndDate.getMonth() + 1) + '/' + resEndDate.getDate();
                    initialValues.resEndTime =
                        initialValues.resEndDate +
                        ' ' +
                        ('0' + resEndDate.getHours()).slice(-2) +
                        ':' +
                        ('0' + resEndDate.getMinutes()).slice(-2);
                    initialValues.memo = result.records.memo2;

                    export16Store.storeDateLS({
                        selectedDate,
                        setRecords,
                        path,
                        eventInstituteId,
                        initialCalendarData,
                    });

                    let resSD =
                        resStartDate.getFullYear() + '/' + (resStartDate.getMonth() + 1) + '/' + resStartDate.getDate();
                    let resST =
                        initialValues.resStartDate +
                        ' ' +
                        ('0' + resStartDate.getHours()).slice(-2) +
                        ':' +
                        ('0' + resStartDate.getMinutes()).slice(-2);
                    let rED = resEndDate.getFullYear() + '/' + (resEndDate.getMonth() + 1) + '/' + resEndDate.getDate();
                    let rET =
                        initialValues.resEndDate +
                        ' ' +
                        ('0' + resEndDate.getHours()).slice(-2) +
                        ':' +
                        ('0' + resEndDate.getMinutes()).slice(-2);

                    setDateTimeObj({
                        resStartDate: resSD,
                        resEndDate: rED,
                        resStartTime: resST,
                        resEndTime: rET,
                    });

                    // Changes initial values of reservation linkon
                    const info = result.records.eventInstituteMappingStyle.eventInstitute.info;
                    if (info) {
                        initialValues.eventInstituteReserveDateFrom = info.eventInstituteReserveDateFrom;
                        initialValues.eventInstituteReserveTimeFrom = info.eventInstituteReserveTimeFrom;
                        initialValues.eventInstituteReserveDateTo = info.eventInstituteReserveDateTo;
                        initialValues.eventInstituteReserveTimeTo = info.eventInstituteReserveTimeTo;
                    }
                }
            } catch (error) {
                //FIXME: It is necessary to test whether a message is displayed on error.
                console.log('Error Fetching Data', error);
            }
        };
        fetchEventInstituteCalendar();
    }, [eventInstituteId]);

    // useEFFECT END
    // DOM -- Prevent to open ContextMenu START

    let selectedScheduler = document.getElementsByClassName('dx-scheduler-date-table-scrollable');
    const elementArray = Array.prototype.slice.call(selectedScheduler);
    elementArray.forEach(function (element) {
        element.setAttribute('oncontextmenu', 'return false;');
    });

    let getStartDateFromAppointmentForm;
    const onOptionChanged = (e) => {
        if (e.name === 'currentDate') {
        }
    },
        // 日付を左クリック　選択済みにする or 選択を解除する
        onCellClick = (e) => {
            setSelectedDate(e.cellData.startDate);
        },
        // 日付を右クリック動作
        onCellContextMenu = (e) => {
            let selectedDate = e.cellData.startDate;
            let resStartDate = export16Store.getReceptionStartData({ selectedDate, path, eventInstituteId });
            let resEndDate = export16Store.getReceptionEndData({ selectedDate, path, eventInstituteId });

            schedulerRef.current.instance.showAppointmentPopup(
                {
                    startDate: e.cellData.startDate,
                    endDate: e.cellData.endDate,
                    resStartDate: resStartDate,
                    resEndDate: resEndDate,
                    cancel: false,
                },
                true
            ); // Open Appointment Modal onRightClick.
        },
        onAppointmentTooltipShowing = (e) => {
            setSelectedDate(e.appointments[0].currentAppointmentData.displayStartDate);
            e.cancel = true;
        },
        // 予定追加前の処理
        onAppointmentAdding = (e) => {
            const receptionDatetimeFrom = e.appointmentData.resStartDate,
                receptionDatetimeTo = e.appointmentData.resEndDate,
                selectedDate = getStartDateFromAppointmentForm;
            // selectedDate = 0;

            export16Store.storeDateLS({
                selectedDate,
                setRecords,
                path,
                receptionDatetimeFrom,
                receptionDatetimeTo,
                calendarData,
                eventInstituteId,
            }); // Store New Appointment Reservation Start and End Date.
        },
        onAppointmentFormOpening = (e) => {
            getStartDateFromAppointmentForm = e.appointmentData.startDate;
            const { form } = e;

            let toolbarItems = e.popup.option('toolbarItems');
            toolbarItems.forEach((item) => {
                if (item.options && item.options.text === 'Done') {
                    item.options.text = '保存';
                }
            });

            e.popup.option('toolbarItems', toolbarItems);

            form.option('items', [
                {
                    label: {
                        text: '検診実施日',
                    },
                    dataField: 'startDate',
                    editorType: 'dxDateBox',
                    colSpan: 2,
                    editorOptions: {
                        type: 'date',
                        readOnly: true,
                    },
                },
                {
                    label: {
                        text: '検診受付開始日時',
                    },
                    dataField: 'resStartDate',
                    editorType: 'dxDateBox',
                    isRequired:true,
                    editorOptions: {
                        width: '100%',
                        type: 'datetime',
                        displayFormat: 'yyyy/MM/dd HH:mm:ss',
                    },
                },
                {
                    label: {
                        text: '予約受付終了日時',
                    },
                    dataField: 'resEndDate',
                    editorType: 'dxDateBox',
                    isRequired:true,
                    editorOptions: {
                        width: '100%',
                        type: 'datetime',
                        displayFormat: 'yyyy/MM/dd HH:mm:ss',
                    },
                },
                
            ]);
            e.cancel = typeof e.appointmentData?.cancel === 'undefined' ? true : false;
        },
        prevYearButton = (e) => {
            setCurrentYear((prev) => +prev - 1);
        },
        nextYearButton = (e) => {
            setCurrentYear((prev) => +prev + 1);
        };

    // SCHEDULER CONFIGURATION END

    return (
        <>
            <TransparentModalWrapper width="border-none" className="items-start">
                <ModalTitle className="text-blue-100 bold text-xl" title={`施設カレンダー：${eventInstituteName}`} />

                <UpperSection16Months
                    prevYearButton={prevYearButton}
                    currentYear={currentYear}
                    nextYearButton={nextYearButton}
                    calendarTemplate={calendarTemplate}
                />
                <div id="container" className="flex mb-8 text-blue-100 w-full">
                    <div className="border border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="1" />
                        <Scheduler
                            name="scheduler16_1"
                            id="1"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['01']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-1-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-b border-r border-t border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="2" />
                        <Scheduler
                            name="scheduler16_2"
                            id="2"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['02']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-2-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-b border-t border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="3" />
                        <Scheduler
                            name="scheduler16_3"
                            id="3"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['03']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-3-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-t border-b border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="4" />
                        <Scheduler
                            name="scheduler16_4"
                            id="4"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['04']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-4-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-l border-b border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="5" />
                        <Scheduler
                            name="scheduler16_5"
                            id="5"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['05']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-5-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-b border-r border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="6" />
                        <Scheduler
                            name="scheduler16_6"
                            id="6"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['06']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-6-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-b border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="7" />
                        <Scheduler
                            name="scheduler16_7"
                            id="7"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['07']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-7-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-b border-r border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="8" />
                        <Scheduler
                            name="scheduler16_8"
                            id="8"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['08']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-8-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-b border-l border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="9" />
                        <Scheduler
                            name="scheduler16_9"
                            id="9"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['09']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-9-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-b border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="10" />
                        <Scheduler
                            name="scheduler16_10"
                            id="10"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['10']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-10-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-b border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="11" />
                        <Scheduler
                            name="scheduler16_11"
                            id="11"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['11']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-11-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-b border-blue-100">
                        <YearMonthCalendarTitle currentYear={currentYear} currentMonth="12" />
                        <Scheduler
                            name="scheduler16_12"
                            id="12"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[currentYear]?.['12']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${currentYear}-12-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-r border-l border-b border-blue-100">
                        <YearMonthCalendarTitle currentYear={+currentYear + 1} currentMonth="1" />
                        <Scheduler
                            name="scheduler16_13"
                            id="13"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[`${+currentYear + 1}`]?.['01']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${+currentYear + 1}-1-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-b border-r border-blue-100">
                        <YearMonthCalendarTitle currentYear={+currentYear + 1} currentMonth="2" />
                        <Scheduler
                            name="scheduler16_14"
                            id="14"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[`${+currentYear + 1}`]?.['02']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${+currentYear + 1}-2-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className="border-b border-r border-blue-100">
                        <YearMonthCalendarTitle currentYear={+currentYear + 1} currentMonth="3" />
                        <Scheduler
                            name="scheduler16_15"
                            id="15"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[`${+currentYear + 1}`]?.['03']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${+currentYear + 1}-3-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div className=" border-b border-r  border-blue-100">
                        <YearMonthCalendarTitle currentYear={+currentYear + 1} currentMonth="4" />
                        <Scheduler
                            name="scheduler16_16"
                            id="16"
                            className="scheduler-16"
                            dataSource={records.eventInstitute?.[`${+currentYear + 1}`]?.['04']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${+currentYear + 1}-4-1`)}
                            cellDuration={cellDuration}
                            height={144}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                    <div>
                        <Scheduler
                            name="scheduler16_17"
                            id="17"
                            className="scheduler-17"
                            dataSource={records.eventInstitute?.[`${+currentYear + 1}`]?.['05']}
                            adaptivityEnabled={true}
                            defaultCurrentView="month"
                            currentDate={new Date(`${+currentYear + 1}-5-1`)}
                            cellDuration={cellDuration}
                            height={0}
                            width="100%"
                            onOptionChanged={onOptionChanged}
                            onCellClick={onCellClick}
                            ref={schedulerRef}
                            onCellContextMenu={onCellContextMenu} // Open Modal on Right Click
                            onAppointmentAdding={onAppointmentAdding} // Before Adding new Appointment
                            onAppointmentFormOpening={onAppointmentFormOpening}
                            onAppointmentTooltipShowing={onAppointmentTooltipShowing} // Occurs before showing an appointment's tooltip.
                        ></Scheduler>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div>
                        {initialValues && initialValues.resStartDate != '' && (
                            <CalendarForm
                                setOpenModal16MonthCal={setOpenModal16MonthCal}
                                formType="add"
                                initialValues={initialValues}
                                path={path}
                                eventInstituteId={eventInstituteId}
                                // Linkon Code 5/1/23
                                dateTimeObj={dateTimeObj}
                                eventInstituteItemType={eventInstituteItemType}
                            />
                        )}
                    </div>
                </div>
            </TransparentModalWrapper>
        </>
    );
}
