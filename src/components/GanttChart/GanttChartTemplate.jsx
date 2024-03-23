import { format } from 'date-fns';
import 'devexpress-gantt/dist/dx-gantt.css';
import { Editing } from 'devextreme-react/data-grid';
import Gantt, {
    Column,
    ContextMenu,
    Item,
    ScaleTypeRange,
    Sorting,
    StripLine,
    Tasks,
    Validation,
} from 'devextreme-react/gantt';
import 'devextreme/dist/css/dx.light.css';
import { locale } from 'devextreme/localization';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loading from '../../components/Loading/Loader';
import { FilterComMethods } from '../../helper/functions/FilterComMethods.jsx';
import EventCategoryAdd from '../../pages/EventList/EventScheduler/EventCategory/EventCategoryAdd';
import EventCategoryEdit from '../../pages/EventList/EventScheduler/EventCategory/EventCategoryEdit';
import EventCounsellorAdd from '../../pages/EventList/EventScheduler/EventCounsellor/EventCounsellorAdd';
import EventInstituteAdd from '../../pages/EventList/EventScheduler/EventInstitute/EventInstituteAdd';
import EventInstituteEdit from '../../pages/EventList/EventScheduler/EventInstitute/EventInstituteEdit';
import EventItemEdit from '../../pages/EventList/EventScheduler/EventItem/EventItemEdit';
import { baseURL, listMethod, listScheduler } from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import EventCalendar16Months from '../Calendar/16MonthsCalendar/EventCalendar16Months';
import EventBusModal from '../Modal/WhiteModal/EventBusModal/EventBusModal';
import EventItemSlotTemplateModal from '../Modal/WhiteModal/EventItemSlotTemplateModal/EventItemSlotTemplateModal';
import EventSlotModal from '../Modal/WhiteModal/EventSlotModal/EventSlotModal';
import IconComponent from './Column/IconComponent';
import RenderGridCellBusIcon from './Column/RenderGridCellBusIcon';
import { currentDate, optionArray } from './data.js';
import dxGanttConfig from './dxGanttConfig.js';
import './granttChartTemplate.css';

// GLOBAL DECLARATION START
const initializeValue = {
    categoryId: '',
    instituteName: '',
};
var filterValues = [];
// GLOBAL DECLARATION END

export default function GanttChartTemplate({ pathName }) {
    const role = useSelector((state) => state.auth.role);
    locale('ja-JP'); // Localize Date in Gantt Chart Table Header
    const { state } = useLocation();
    const path = pathName.split('/').pop();

    // LOCAL DECLARATION START
    const [waiter, setWaiter] = useState(true);
    const [loading, setLoading] = useState(true);
    const [itemEditModal, setItemEditModal] = useState(false),
        [itemType, setItemType] = useState(0),
        [categoryAddModal, setCategoryAddModal] = useState(false),
        [categoryEditModal, setCategoryEditModal] = useState(false),
        [instituteAddModal, setInstituteAddModal] = useState(false),
        [instituteEditModal, setInstituteEditModal] = useState(false),
        [counsellorModal, setCounsellorModal] = useState(false),
        [openModal16MonthCal, setOpenModal16MonthCal] = useState(false),
        [openBusModal, setOpenBusModal] = useState(false),
        [mappingDate, setMappingDate] = useState(null), // ガントチャートの開始日
        [startDateRange, setStartDateRange] = useState(null), // ガントチャートの開始日
        [endDateRange, setEndDateRange] = useState(null), // ガントチャートの終了日
        [dateValueDate, setDateValueDate] = useState(''),
        [filterSearch, setFilterSearch] = useState([]), // Filter
        [options, setOptions] = useState(optionArray),
        [showContextMenu, setShowContextMenu] = useState(''), // ContextMenu
        [ganttConfig, setGanttConfig] = useState({
            sortingMode: 'none',
            showSortIndexes: false,
            showSortIndexesDisabled: true,
            showResources: true,
            allowFiltering: true,
            disableContextMenu: false,
            autoUpdateParentTasks: false,
            enablePredecessorGap: true,
        }); // gantt Config;
    // haga add category institute
    const [currentEventId, setCurrentEventId] = useState(0);
    const [currentEventCategoryId, setCurrentEventCategoryId] = useState(0);
    const [currentEventInstituteId, setCurrentEventInstituteId] = useState(0);
    const [currentEventInstituteItemType, setCurrentEventInstituteItemType] = useState(undefined);
    const [currentEventCounsellorId, setCurrentEventCounsellorId] = useState(0);
    const [mappingId, setMappingId] = useState(0);
    const [currentEventInstituteName, setCurrentEventInstituteName] = useState('');
    const [currentEventCategoryName, setCurrentEventCategoryName] = useState('');
    const [currentEventName, setCurrentEventName] = useState('');
    const typeCategory = 'category',
        typeInstitute = 'institute',
        typeDate = 'date',
        categoryTypeItem = 0,
        categoryTypeCounselor = 1;
    const { values } = FilterComMethods(initializeValue);

    const { eventId } = state || { eventId, eventName: '' };
    const projectId = window.sessionStorage.getItem('currentProjectId');
    const [tasks, setTasks] = useState([]);

    const memoTasks = useMemo(() => tasks, [tasks]);

    /* Hossain */
    const [eventSlotModal, setEventSlotModal] = useState(false);
    const [eventItemSlotTemplateModal, setEventItemSlotTemplateModal] = useState(false);

    // LOCAL DECLARATION END
    // useEFFECT START
    useEffect(() => {
        // 現在は江別イベント固定
        const ENDPOINT = `${baseURL}${listScheduler}${eventId}?pid=${projectId}`;
        (async () => {
            try {
                setLoading(true);
                setWaiter(false)
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                const result = await response.data;
                console.log("result", result);
                if (result.error) throw new Error(result.error);
                let records = [];
                for (let i = 0; i < result.records.length; i++) {
                    let row = result.records[i];
                    const eventInfo = result.records[0];
                    setCurrentEventName(eventInfo.title);
                    // 最初は必ずイベントなのでこの時点で開始日と終了日をセットする
                    if (i == 0) {
                        setStartDateRange(new Date(row.receptionDatetimeFrom));
                        setEndDateRange(new Date(row.receptionDatetimeTo));
                    }
                    if (row.start) {
                        row.start = new Date(row.start);
                    }
                    if (row.end) {
                        row.end = new Date(row.end);
                    }
                    if (row.receptionDatetimeFrom) {
                        row.receptionDatetimeFrom = new Date(row.receptionDatetimeFrom);
                    }
                    if (row.receptionDatetimeTo) {
                        row.receptionDatetimeTo = new Date(row.receptionDatetimeTo);
                    }
                    if (row.mappingStartDate) {
                        row.mappingStartDate = new Date(row.mappingStartDate);
                    }
                    if (row.mappingEndDate) {
                        row.mappingEndDate = new Date(row.mappingEndDate);
                    }
                    if (row.title == '実施日') {
                        row.title = row.title + ' : ' + format(row.start, 'y/MM/dd');
                    }
                    records.push(row);
                }
                setTasks(records);
                setLoading(false);
                setWaiter(true)
            } catch (error) {
                setLoading(false);
                setWaiter(true)
            }
        })();
    }, [categoryAddModal, categoryEditModal, instituteAddModal, instituteEditModal, openModal16MonthCal]);

    useEffect(() => {
        filterValues = values.categoryId === '' ? undefined : values.categoryId && dxFilter();
        setFilterSearch(filterValues);
    }, [values.categoryId]);

    useEffect(() => {
        var dateStr = window.localStorage.getItem('event_scheduler_timestamp_DatePicker');

        if (dateStr == null) {
            dateStr = '2022-01-01T00:00';
        }
        const date = new Date(dateStr);
        setStartDateRange(date);
    }, [dateValueDate]);

    // useEFFECT END

    const RenderGridCell = (data) => {
        // Onclick handler START
        const handleAddIcon = () => {
            if (role.r5 == 1) {
                setCategoryAddModal(true);
            }
        },
            handleCalendar = (e) => {
                console.log('my checking ......', e)
                console.log('my checking ...... data.data', data.data)
                if (role.r5 == 1) {
                    setCurrentEventId(data.data.eventId);
                    setCurrentEventCategoryId(data.data.eventCategoryId);
                    setCurrentEventInstituteId(data.data.eventInstituteId);
                    setCurrentEventCounsellorId(data.data.eventCounsellorId);
                    setCurrentEventInstituteName(data.data.title);
                    setOpenModal16MonthCal(true);
                    setCurrentEventInstituteItemType(data.data.categoryType);
                }
            };
        return (
            <>
                <IconComponent data={data} handleAddIcon={handleAddIcon} handleCalendar={handleCalendar} />
            </>
        );
    };

    const RenderGridCellBus = (data) => {
        const handleBusIcon = () => {
            if (role.r6 == 1) {
                setMappingId(data.data.mappingId);
                setMappingDate(format(data.data.start, 'y/MM/dd'));
                setCurrentEventInstituteName(data.row.node.parent.data.title);
                setCurrentEventInstituteId(data.row.node.parent.data.eventInstituteId);
                setOpenBusModal(true);
            }
        };
        return (
            <>
                <RenderGridCellBusIcon handleBusIcon={handleBusIcon} data={data} />
            </>
        );
    };

    // Filter START
    const handleChangeSearch = (e) => {
        const instituteTitleFind = tasks
            .filter((task) => values.instituteName === task.title)
            .filter((item) => item.type === typeInstitute), //Find title with input value
            filterChildItem =
                instituteTitleFind &&
                tasks
                    .filter(
                        (task) =>
                            instituteTitleFind[0]?.id === task?.parentId &&
                            instituteTitleFind[0]?.instituteName === task?.instituteName
                    )
                    .map((item) => item.title),
            instituteParentTitle = instituteTitleFind.map((item) => item.title),
            uniqueArrayElement = [...new Set(filterChildItem)]; //Remove duplicated Item ;

        filterValues =
            values.instituteName !== ''
                ? instituteTitleFind.length !== 0
                    ? [...instituteParentTitle, ...uniqueArrayElement]
                    : ['']
                : [];

        setFilterSearch(filterValues[0]); // After new method follow match title with categoryName
    };

    function dxFilter() {
        const selectedOptionObj = options.find((option) => option.id === +values.categoryId), // Find Selected Value from DropDown
            tasksType = tasks.filter((task) => task?.title === selectedOptionObj?.value), // First Match the title
            tasksTypeChildArr = tasksType && tasks.filter((task) => tasksType[0]?.id === task?.parentId), // Then find parentId and create new array with title
            tasksTypeChildTitleArr = tasksTypeChildArr.map((item) => item?.title),
            tasksNestedChildArr =
                tasksTypeChildArr &&
                tasks.filter((task) => tasksTypeChildArr[0]?.id === task?.parentId).map((item) => item?.title),
            uniqueArrayElement = [...new Set(tasksNestedChildArr)]; //Remove duplicated Item
        filterValues = [tasksType[0]?.title, ...tasksTypeChildTitleArr, ...uniqueArrayElement]; // merge two different array
        // return filterValues;
        return tasksType[0]?.title; // After new method follow match title with categoryName
    }
    // Filter END
    // Gantt ContextMenu START
    const onContextMenuPreparing = (e) => {
        // Before render context Menu
        const type = e.data.type,
            categoryType = e.data.categoryType;
        //
        if (e.event.target.ariaColIndex == 1) {
            // タイプがカテゴリー
            if (type === typeCategory) {
                if (role.r5 == 1) {
                    setShowContextMenu(typeCategory);
                    setCurrentEventId(e.data.eventId);
                    setCurrentEventCategoryId(e.data.eventCategoryId);
                } else {
                    e.cancel = !ganttConfig?.disableContextMenu;
                }
                // タイプが施設
            } else if (type === typeInstitute) {
                setCurrentEventId(e.data.eventId);
                setCurrentEventCategoryId(e.data.eventCategoryId);
                setCurrentEventInstituteId(e.data.eventInstituteId);
                setCurrentEventInstituteName(e.data.title);

                if (categoryType === categoryTypeItem) {
                    if (role.r5 == 1) {
                        setShowContextMenu(categoryTypeItem);
                    } else {
                        e.cancel = !ganttConfig?.disableContextMenu;
                    }
                } else if (categoryType == categoryTypeCounselor) {
                    if (role.r5 == 1) {
                        setShowContextMenu(categoryTypeCounselor);
                    } else {
                        e.cancel = !ganttConfig?.disableContextMenu;
                    }
                }
            } else if (type === typeDate) {
                setCurrentEventId(e.data.eventId);
                setCurrentEventCategoryId(e.data.eventCategoryId);
                setCurrentEventInstituteId(e.data.eventInstituteId);

                e.cancel = !ganttConfig?.disableContextMenu;
            } else {
                e.cancel = !ganttConfig?.disableContextMenu;
            }
        } else {
            e.cancel = !ganttConfig?.disableContextMenu;
        }
    },
        // Before render context Menu
        onCustomCommand = (e) => {
            // After ContextMenu Item selected.
            const type = e.name;
            if (type === 'addBookingCategory') {
                setCategoryEditModal(true);
            } else if (type === 'instituteAdd') {
                setInstituteAddModal(true);
            } else if (type === 'institutionEdit') {
                setInstituteEditModal(true);
            } else if (type === 'institutionCalendar') {
                setOpenModal16MonthCal(true);
            } else if (type === 'itemManagement') {
                setItemType(0);
                setItemEditModal(true);
                /*setOpenModalW960(true);*/
            } else if (type === 'counselorManagement') {
                setItemType(1);
                setCounsellorModal(true);
            } else if (type === 'slotSettings') {
                setEventItemSlotTemplateModal(true);
            } else {
                alert('☢ Please Match ContextMenu Item NAME !!');
            }
        };
    const customizeTextDate = useCallback((cellInfo) => {
        return format(cellInfo.value, 'y/MM/dd');
    }, []);
    const onTaskClick = (e) => {
        if (role.r6 >= 1) {
            if (e.data.type === typeDate) {
                if (
                    e.event.target.className === 'dx-gantt-task-edit-frame' ||
                    e.event.target.className === 'flex justify-between dxc-tooltip' ||
                    e.event.target.className === 'dx-treelist-cell-expandable dx-cell-focus-disabled' ||
                    e.event.target.className === 'dx-treelist-empty-space'
                ) {
                    const currentInstituteInfo = tasks.find(
                        (item) => item.eventInstituteId === e.data.eventInstituteId
                    );
                    const { categoryType } = currentInstituteInfo || {};
                    setCurrentEventInstituteItemType(categoryType);

                    setCurrentEventInstituteId(e.data.eventInstituteId);
                    setMappingDate(format(e.data.start, 'y/MM/dd'));
                    setMappingId(e.data.mappingId);
                    setEventSlotModal(true);
                    setCurrentEventInstituteName(currentInstituteInfo.title);
                    const currentCategoryInfo = tasks.find((item) => item.eventCategoryId === e.data.eventCategoryId);
                    setCurrentEventCategoryName(currentCategoryInfo.title);
                }
            }
        }
    };

    return (
        <>
            {loading && <Loading />}
            {!(
                categoryAddModal ||
                categoryEditModal ||
                instituteAddModal ||
                instituteEditModal ||
                counsellorModal ||
                eventSlotModal ||
                itemEditModal ||
                eventItemSlotTemplateModal ||
                openBusModal
            ) && (
                    <>
                        {waiter &&
                            <div className="table-wrapper overscroll-none">

                                <Gantt
                                    className="customGanttTitleColumn"
                                    taskListWidth={494}
                                    height={700}
                                    scaleType="days"
                                    showResources={ganttConfig.showResources}
                                    allowFiltering={ganttConfig.allowFiltering}
                                    onCustomCommand={onCustomCommand} // After ContextMenu Item selected.
                                    onContextMenuPreparing={onContextMenuPreparing} // Before render context Menu
                                    /* Hossain */
                                    //onTaskClick={dxGanttConfig.onTaskClick}
                                    onTaskClick={onTaskClick}
                                    onTaskDblClick={dxGanttConfig.onTaskDblClick}
                                    onScaleCellPrepared={dxGanttConfig.onScaleCellPrepared} //Header cell display japanese date style
                                    taskTooltipContentRender={dxGanttConfig.TaskTooltipTemplate}
                                    startDateRange={startDateRange && startDateRange}
                                >
                                    {/* Prevent Zoom level */}
                                    <ScaleTypeRange min="days" max="days" />
                                    <Validation
                                        autoUpdateParentTasks={ganttConfig.autoUpdateParentTasks}
                                        enablePredecessorGap={ganttConfig.enablePredecessorGap}
                                    />

                                    <Tasks dataSource={memoTasks} colorExpr="taskColor" />

                                    <StripLine start={currentDate} title={currentDate} cssClass="current-time" />
                                    {/*  Context Menu START */}
                                    {showContextMenu === typeCategory ? (
                                        <ContextMenu>
                                            <Item name="addBookingCategory" text="予約カテゴリー編集" />
                                            <Item name="instituteAdd" text="施設追加" />
                                            {/* 施設追加 == Add Facility  */}
                                        </ContextMenu>
                                    ) : null}
                                    {showContextMenu === categoryTypeItem ? (
                                        <ContextMenu>
                                            <Item name="institutionEdit" text="施設編集" />
                                            <Item name="itemManagement" text="アイテム管理" />
                                            <Item name="slotSettings" text="スロットテンプレート設定" />
                                        </ContextMenu>
                                    ) : null}
                                    {showContextMenu === categoryTypeCounselor ? (
                                        <ContextMenu>
                                            <Item name="institutionEdit" text="施設編集" />
                                            <Item name="counselorManagement" text="カウンセラー管理" />
                                            <Item name="slotSettings" text="スロットテンプレート設定" />
                                        </ContextMenu>
                                    ) : null}
                                    {/*  Context Menu END */}

                                    {/* InVisible  Column for getting Data from dataSource START*/}
                                    <Column dataField="type" visible={false} />
                                    <Column dataField="categoryType" visible={false} />
                                    <Column dataField="eventId" visible={false} />
                                    <Column dataField="categoryId" visible={false} />
                                    <Column dataField="eventCategoryId" visible={false} />
                                    <Column dataField="instituteId" visible={false} />
                                    <Column dataField="eventInstituteId" visible={false} />
                                    <Column dataField="mappingId" visible={false} />
                                    {/* InVisible  Column for getting Data from dataSource END*/}
                                    <Column
                                        dataField="title"
                                        caption="題名"
                                        dataType="string"
                                        width={240}
                                        cellRender={RenderGridCell}
                                        filterOperations={['startswith']}
                                        filterValues={filterValues && [['categoryName', '=', `${filterValues}`]]}
                                    />
                                    <Column
                                        dataField="bus"
                                        caption="バス"
                                        width={44}
                                        cellRender={RenderGridCellBus}
                                        alignment="center"
                                    />
                                    <Column
                                        dataField="receptionDatetimeFrom"
                                        caption="開始日"
                                        width={105}
                                        dataType="date"
                                        alignment="center"
                                        customizeText={customizeTextDate}
                                    />
                                    <Column
                                        dataField="receptionDatetimeTo"
                                        caption="終了日"
                                        width={105}
                                        dataType="date"
                                        customizeText={customizeTextDate}
                                        alignment="center"
                                    />
                                    <Editing disable />
                                    <Sorting mode={ganttConfig.sortingMode} showSortIndexes={ganttConfig.showSortIndexes}></Sorting>
                                </Gantt>
                            </div>
                        }
                    </>
                )}

            {itemEditModal && (
                <EventItemEdit
                    setCancelModal={() => setItemEditModal(false)}
                    eventId={eventId}
                    eventCategoryId={currentEventCategoryId}
                    eventInstituteId={currentEventInstituteId}
                    instituteName={currentEventInstituteName}
                    itemType={itemType}
                    pathName={path}
                />
            )}
            {categoryAddModal && (
                <EventCategoryAdd setCancelModal={() => setCategoryAddModal(false)} eventId={eventId} />
            )}
            {categoryEditModal && (
                <EventCategoryEdit
                    setCancelModal={() => setCategoryEditModal(false)}
                    eventId={eventId}
                    eventCategoryId={currentEventCategoryId}
                />
            )}
            {/* 施設追加 == Add Facility  */}
            {instituteAddModal && (
                < EventInstituteAdd
                    setCancelModal={() => setInstituteAddModal(false)}
                    eventId={eventId}
                    eventCategoryId={currentEventCategoryId}
                    stitle="施設追加"
                    formType="add"
                />
            )}
            {instituteEditModal && (
                <EventInstituteEdit
                    setCancelModal={() => setInstituteEditModal(false)}
                    eventId={eventId}
                    eventCategoryId={currentEventCategoryId}
                    title="施設編集"
                    formType="edit"
                    eventInstituteId={currentEventInstituteId}
                />
            )}
            {openModal16MonthCal && (
                <EventCalendar16Months
                    setCancelModal={() => setOpenModal16MonthCal(false)}
                    setOpenModal16MonthCal={setOpenModal16MonthCal}
                    path={path}
                    eventInstituteId={currentEventInstituteId}
                    eventInstituteName={currentEventInstituteName}
                    eventId={eventId}
                    eventInstituteItemType={currentEventInstituteItemType}
                />
            )}
            {counsellorModal && (
                <EventCounsellorAdd
                    setCancelModal={() => setCounsellorModal(false)}
                    eventId={eventId}
                    eventCategoryId={currentEventCategoryId}
                    eventInstituteId={currentEventInstituteId}
                    instituteName={currentEventInstituteName}
                    pathName={path}
                />
            )}

            {eventSlotModal && (
                <EventSlotModal
                    setCancelModal={() => setEventSlotModal(false)}
                    pathName={path}
                    eventInstituteId={currentEventInstituteId}
                    mappingId={mappingId}
                    eventName={currentEventName}
                    categoryName={currentEventCategoryName}
                    instituteName={currentEventInstituteName}
                    mappingDate={mappingDate}
                    eventInstituteItemType={currentEventInstituteItemType}
                // eventBusInfo={eventBusInfo}
                />
            )}
            {eventItemSlotTemplateModal && (
                <EventItemSlotTemplateModal
                    setCancelModal={() => setEventItemSlotTemplateModal(false)}
                    eventInstituteId={currentEventInstituteId}
                    instituteName={currentEventInstituteName}
                />
            )}

            {openBusModal && (
                <EventBusModal
                    formType="add"
                    handleCancel={() => setOpenBusModal(false)}
                    pathName={path}
                    eventInstituteId={currentEventInstituteId}
                    mappingId={mappingId}
                    instituteName={currentEventInstituteName}
                    mappingDate={mappingDate}
                />
            )}
        </>
    );
}
