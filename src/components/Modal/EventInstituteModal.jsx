import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import { GoClock } from 'react-icons/go';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loader';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { eventInstituteFormSchema } from '../../lib/Schema';
import {
    baseURL, createEventInstitute, createMethod, deleteEventInstitute, deleteMethod, updateEventInstitute, updateMethod
} from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import Calendar2 from '../Calendar/Calendar2';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ModalFormFooterWithHover from '../Footer/ModalFormFooterWithHover';
import Hidden from '../Form/FormInputs/Hidden';
import SelectBox from '../Form/FormInputs/SelectBox';
import ToggleLock from '../Form/FormInputs/ToggleLock';
import TextBox from '../Form/FormInputs/TextBox';
import AddRequiredMark from '../HelpingComponent/AddRequiredMark';
import ButtonTypeNormal from '../ListElementDrag/ButtonType/ButtonTypeNormal';
import TimeRangePicker from '../TimePicker/TimeRangePicker';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import ModalTitle from './components/ModalTitle';
import WhiteModalWrapper from './components/WhiteModalWrapper';
import DialogModal from './DialogModal';
import EventTimeInput from './EventTimeInput';
import _ from 'lodash';

// ピッカーがFormikに対応する必要があるためこれが必要
const FormObserver = ({ timeRangeValue }) => {
    const { values } = useFormikContext();

    useEffect(() => {
        values.eventInstituteSlotStyleRangeTime = timeRangeValue ? timeRangeValue : '';
    }, [values, timeRangeValue]);

    return null;
};

const EventInstituteModal = ({
    setCancelModal,
    initialValues,
    title = '施設 追加',
    formType = 'add',
    setIsOverflow,
    handleButtonRight,
    filters,
    institutes,
    eventId,
    eventCategoryId,
    eventInstituteId,
}) => {
    const navigate = useNavigate();
    const processing = useRef(false);
    const [startDateValue, setStartDateValue] = useState(); // event start date
    const [startTimeValue, setStartTimeValue] = useState(); // event start time
    const [endDateValue, setEndDateValue] = useState(); // event end data
    const [endTimeValue, setEndTimeValue] = useState();
    const [filter, setFilter] = useState([]);
    const [institute, setInstitute] = useState([]);
    const [initialFlag, setInitialFlag] = useState(true);
    const [loading, setLoading] = useState(false);
    const [eventInstituteCodeError, setEventInstituteCodeError] = useState(false);
    const [eventInstituteNameError, setEventInstituteNameError] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [eventCodeError, setEventCodeError] = useState(false);
    const [eventNameError, setEventNameError] = useState(false);
    const { info } = useSelector((state) => state.auth);
    const [openModal, setOpenModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [slotTypeShow, setSlotTypeShow] = useState(false);
    const [buttonType, setButtonType] = useState({ buttonName: '開催枠追加', type: 'normal' });
    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: false, space: 'col-span-1', header: '' }, //col-span-2
        pen: { show: false, space: 'col-span-1', header: '' },
        checkbox1: { show: false, space: 'col-span-1', header: '' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-2', header: '' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: { show: false, space: 'col-span-2', header: '' },
        inputBox2: { show: false, space: 'col-span-10', header: '' },
        inputBox3: { show: true, space: 'col-span-11 w-[80rem]', header: '開催枠を設定してください（64枠まで）' },
        trash: { show: true, space: 'col-span-1', header: '削除' },
    });

    const [savedOptions, setSavedOptions] = useState([]);
    const [options, setOptions] = useState([]);
    // time picker range
    const [showTimeRangePicker, setShowTimeRangePicker] = useState(false);
    const [timeRangeValue, setTimeRangeValue] = useState('');
    const [dragList, setDragList] = useState([]);
    // F type button will show
    const [optionValue, setOptionValue] = useState('');

    const [searchItemValue, setSearchItemValue] = useState('');

    // Global Declaration
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();
    const keyName = routeName + '_timestamp_' + 'TimeRangePicker';

    useEffect(() => {
        setInstitute(institutes);
        setFilter(filters);
    }, [institutes, filters]);

    useEffect(() => {
        setTimeRangeValue(initialValues.eventInstituteSlotStyleRangeTime);
        if (
            initialValues?.eventInstituteSlotStyle &&
            Object.keys(initialValues?.eventInstituteSlotStyle).length != 0 &&
            (initialValues?.eventInstituteSlotType == 1 || initialValues?.eventInstituteSlotType == 2)
        ) {
            setSavedOptions(initialValues?.eventInstituteSlotStyle);
        }
    }, [initialValues]);

    useEffect(() => {
        if (!initialValues.eventInstituteSlotType || initialValues.eventInstituteSlotType == 0) {
            setSlotTypeShow(0);
        } else if (initialValues.eventInstituteSlotType == 1) {
            setSlotTypeShow(1);
        } else {
            setSlotTypeShow(2);
        }
    }, [initialValues.eventInstituteSlotType]);

    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setEventInstituteCodeError(false);
        setEventInstituteNameError(false);
        setSystemError(false);
        setAlreadyDeletedErrorMessage('');

        let checkFlg = false;
        if (values?.eventInstituteSlotType == 1 || values?.eventInstituteSlotType == 2) {
            const item = [...options];

            if (!item.length > 0) {
                setAlreadyDeletedErrorMessage(errorMessages.E_EVENT_01);
                setLoading(false);
                checkFlg = true;
                processing.current = false;
            }

            
            item.some((data) => {
                if (data == "") {
                    
                    setAlreadyDeletedErrorMessage(errorMessages.E_BLANKTIME_01);
                    setLoading(false);
                    checkFlg = true;
                    processing.current = false;
                }
            });

            if (!checkFlg && item.length != (new Set(item)).size) {
                
                setAlreadyDeletedErrorMessage(errorMessages.E_SAMETIME_01);
                setLoading(false);
                checkFlg = true;
                processing.current = false;
            };
        }

        if (!checkFlg) {
            try {
                let mappingStartTime = values.eventInstituteSlotStyleRangeTime.slice(0, 5).replace(':', '');
                let mappingEndTime = values.eventInstituteSlotStyleRangeTime.slice(-5).replace(':', '');
                let mappingInterval = values.eventInstituteSlotStyleTimePattern;

                if (values?.eventInstituteSlotType == 1 || values?.eventInstituteSlotType == 2) {
                    values['eventInstituteSlotStyle'] = options;
                }

                const ENDPOINT = `${baseURL}${createEventInstitute}`;
                const config = {
                    method: createMethod,
                    url: ENDPOINT,
                    data: {
                        eventCategoryId: eventCategoryId,
                        instituteId: values.instituteId,
                        eventInstituteName: values.eventInstituteName,
                        eventInstituteItemType: values.eventInstituteItemType,
                        filterId: values.filterId ? values.filterId : 0,
                        eventInstituteSlotType: values.eventInstituteSlotType,
                        eventInstituteSlotStyleTimePattern: values.eventInstituteSlotStyleTimePattern,
                        eventInstituteSlotStyleRangeTime: values.eventInstituteSlotStyleRangeTime,
                        mappingStartTime: mappingStartTime,
                        mappingEndTime: mappingEndTime,
                        mappingInterval: mappingInterval,
                        eventInstituteSlotStyle: values?.eventInstituteSlotStyle,
                        eventInstituteDentalFlag: values?.eventInstituteDentalFlag ? 1 : 0,
                        memo: values.memo,
                        createdBy: info.accountId,
                        updatedBy: info.accountId,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const created = await instance.request(config);

                if (created) {
                    setSystemError(false);
                    setEventCodeError(false);
                    setEventNameError(false);
                    setLoading(false);
                }
                setCancelModal(true);

                // remove time range picker value from session/local
                localStorage.removeItem(keyName);
                sessionStorage.removeItem(keyName);
            } catch (error) {
                if (error.response.status === 409 && error.response.data.errorCode === 101) {
                    setEventNameError(false);
                    setSystemError(false);
                    setEventCodeError(true);
                } else if (error.response.status === 409 && error.response.data.errorCode === 201) {
                    setEventCodeError(false);
                    setSystemError(false);
                    setEventNameError(true);
                } else {
                    setEventCodeError(false);
                    setEventNameError(false);
                    setSystemError(true);
                }
                setLoading(false);
            } finally {
                processing.current = false;
            }
        }
    };

    const addTimeInput = (e) => {
        //const item = [...options]
        //setOptions([...options , ''])
        setOptions((prevState) => [...prevState, '']);
    };
    const deleteTimeInput = (id) => {
        const item = [...options];
        item.splice(id, 1);
        setOptions([]);
        setTimeout(() => {
            setOptions(item);
        }, 0);
    };
    // update operation
    const handleUpdate = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setEventInstituteCodeError(false);
        setEventInstituteNameError(false);
        setSystemError(false);
        console.log('savedOptions',savedOptions);
        console.log('options',options);
        //add edit validation
        let checkFlg = false;
        if (values?.eventInstituteSlotType == 1 || values?.eventInstituteSlotType == 2) {
            const item = [...savedOptions,...options];

            if (!item.length > 0) {
                console.log('1111111111111111');
                setAlreadyDeletedErrorMessage(errorMessages.E_EVENT_01);
                setLoading(false);
                checkFlg = true;
                processing.current = false;
            }

            
            item.some((data) => {
                if (data == "") {
                    console.log('222222222222222222');
                    setAlreadyDeletedErrorMessage(errorMessages.E_BLANKTIME_01);
                    setLoading(false);
                    checkFlg = true;
                    processing.current = false;
                }
            });

            if (!checkFlg && item.length != (new Set(item)).size) {
                console.log('3333333333333333333');
                setAlreadyDeletedErrorMessage(errorMessages.E_SAMETIME_01);
                setLoading(false);
                checkFlg = true;
                processing.current = false;
            };
        }

        // FIXME: I need to keep valid field list in JSON format.
        if (!checkFlg) {
            try {
                let mappingStartTime = values.eventInstituteSlotStyleRangeTime.slice(0, 5).replace(':', '');
                let mappingEndTime = values.eventInstituteSlotStyleRangeTime.slice(-5).replace(':', '');
                let mappingInterval = values.eventInstituteSlotStyleTimePattern;

                if (values?.eventInstituteSlotType == 1 || values?.eventInstituteSlotType == 2) {
                    values['eventInstituteSlotStyle'] = [...savedOptions, ...options];
                }

                const ENDPOINT = `${baseURL}${updateEventInstitute}${eventInstituteId}`;
                const config = {
                    method: updateMethod,
                    url: ENDPOINT,
                    data: {
                        eventInstituteId: eventInstituteId,
                        instituteId: values.instituteId,
                        eventInstituteName: values.eventInstituteName,
                        filterId: values.filterId ? values.filterId : 0,
                        eventInstituteSlotType: values.eventInstituteSlotType,
                        eventInstituteSlotStyleTimePattern: values.eventInstituteSlotStyleTimePattern,
                        eventInstituteSlotStyleRangeTime: values.eventInstituteSlotStyleRangeTime,
                        mappingStartTime: mappingStartTime,
                        mappingEndTime: mappingEndTime,
                        mappingInterval: mappingInterval,
                        eventInstituteSlotStyle: values?.eventInstituteSlotStyle,
                        eventInstituteDentalFlag: values?.eventInstituteDentalFlag ? 1 : 0,
                        memo: values.memo ? values.memo : '',
                        createdBy: info.accountId,
                        updatedBy: info.accountId,
                    },
                };
                const updated = await instance.request(config);

                // if update is successful
                if (updated) {
                    setSystemError(false);
                    setEventCodeError(false);
                    setEventNameError(false);
                    setLoading(false);
                    setCancelModal(true);
                    // remove time range picker value from session/local
                    localStorage.removeItem(keyName);
                    sessionStorage.removeItem(keyName);
                }
            } catch (error) {
                if (error.response.status === 409 && error.response.data.errorCode === 101) {
                    setEventNameError(false);
                    setSystemError(false);
                    setEventCodeError(true);
                } else if (error.response.status === 409 && error.response.data.errorCode === 201) {
                    setEventCodeError(false);
                    setSystemError(false);
                    setEventNameError(true);
                } else if (error.response.status === 400 && error.response.data.errorCode === 201) {
                    const matchErrorMessage = getErrorMessageWithErrorCode(error);
                    setAlreadyDeletedErrorMessage(matchErrorMessage);
                    setDeleteLoading(false);
                } else {
                    setEventCodeError(false);
                    setEventNameError(false);
                    setSystemError(true);
                }
                setLoading(false);
            } finally {
                processing.current = false;
            }
        }
    };

    // delete operation
    const handleDelete = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setDeleteError(false);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${deleteEventInstitute}${eventInstituteId}`;
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleted = await instance.request(config);

            if (deleted) {
                setCancelModal();
                setDeleteLoading(false);
                setDeleteError(false);
                setLoading(false);
                closeModal();
            }
        } catch (error) {
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            if (error.response.status === 400 && error.response.data.errorCode === 101) {
                setDeleteError(true);
                setDeleteErrorMessage(matchErrorMessage);
            } else if (error.response.status === 400 && error.response.data.errorCode === 115) {
                setDeleteError(true);
                setDeleteErrorMessage(matchErrorMessage);
            } else {
                setDeleteErrorMessage(matchErrorMessage);
            }
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };
    // close modal function
    const closeModal = () => {
        setSystemError(false);
        setDeleteErrorMessage(false); // remove error message from delete modal
        setAlreadyDeletedErrorMessage(false); // Form screen remove error message
        setOpenModal(false);
        setIsOverflow(false);

        // remove time range picker value from session/local
        localStorage.removeItem(keyName);
        sessionStorage.removeItem(keyName);
    };

    const changedTime = (index, time) => {
        const items = [...options];
        items[index] = time;
        setOptions(items);
    };


    const getFilteredList = (optionList = [], searchByKeys = [], prevSelectedId, idKey) => {
        let filteredRecords = [...optionList];

        if (searchByKeys.length > 0) {
            filteredRecords = optionList.filter((item) => Object.values(_.pick(item, searchByKeys)).join(' ').toLowerCase().includes(searchItemValue.toLowerCase()));

            if (prevSelectedId && !filteredRecords.find(x => x[idKey] == prevSelectedId)) {
                const findItem = optionList.find(x => x[idKey] == prevSelectedId);
                if (findItem) filteredRecords = [findItem, ...filteredRecords];
            }
        }

        return filteredRecords;
    }

    return (
        <>
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                {/* <h1>Hello Add facility</h1> */}
                <ModalTitle className="text-blue-100 bold text-xl" title={title} />
                <Formik
                    enableReinitialize={true}
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={initialValues}
                    validationSchema={eventInstituteFormSchema(slotTypeShow, [...options])}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (formType === 'add') {
                            handleAdd(values, resetForm);
                        } else {
                            handleUpdate(values, { setSubmitting });
                        }
                    }}
                >
                    {({ errors, setFieldValue, values }) => {
                        const first = Object.keys(errors)[0];
                        return (
                            <div className="relative w-full h-full">
                                <Form>
                                    <FormObserver
                                        startDateValue={startDateValue}
                                        endDateValue={endDateValue}
                                        startTimeValue={startTimeValue}
                                        endTimeValue={endTimeValue}
                                        timeRangeValue={timeRangeValue}
                                    />
                                    <div className="-mt-4" id="scroller"></div>
                                    <FormBodyContainer className="!px-0">
                                        <div
                                            className={`${formType === 'add'
                                                ? '!min-h-[calc(100vh-484px)]'
                                                : '!min-h-[calc(100vh-556px)] '
                                                }`}
                                        >
                                            <InputContainer>
                                                <TextBox
                                                    label="管理画面表示名"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="eventInstituteName"
                                                    maxLength="64"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                {formType === 'edit' ? (
                                                    <TextBox
                                                        label="予約対象（作成後変更不可）"
                                                        inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                        labelClassName="text-blue-100"
                                                        name="eventInstituteItemTypeName"
                                                        readOnly={true}
                                                        tabIndex="-1"
                                                    ></TextBox>
                                                ) : (
                                                    <SelectBox
                                                        label="予約対象（作成後変更不可）"
                                                        inputClassName="text-blue-100 bg-blue-25"
                                                        labelClassName="text-blue-100"
                                                        name="eventInstituteItemType"
                                                    >
                                                        <option value="0">アイテム</option>
                                                        <option value="1">カウンセラー</option>
                                                    </SelectBox>
                                                )}
                                            </InputContainer>

                                            <InputContainer>
                                                <TextBox
                                                    label={formType === 'edit' ? "表示条件（フィルター・管理名）" : "表示条件（施設・フィルター・管理名）"}
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="itemNameSearch"
                                                    placeholder={formType === 'edit' ? "表示条件（フィルター・管理名）" : "表示条件（施設・フィルター・管理名）"}
                                                    // value={searchItemValue}
                                                    onBlur={(e) => setSearchItemValue(e.target.value)}
                                                />
                                            </InputContainer>

                                            <InputContainer>
                                                {formType === 'edit' ? (
                                                    <TextBox
                                                        label="施設選択（作成後変更不可）"
                                                        inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                        labelClassName="text-blue-100"
                                                        name="instituteName"
                                                        readOnly={true}
                                                        tabIndex="-1"
                                                    ></TextBox>
                                                ) : (
                                                    <SelectBox
                                                        label="施設選択（作成後変更不可）"
                                                        inputClassName="bg-blue-25 text-blue-100"
                                                        labelClassName="text-blue-100"
                                                        name="instituteId"
                                                        isRequired
                                                    >
                                                        <option key="default" value="">施設を選択してください</option>
                                                        {institute.length > 0 &&
                                                            getFilteredList(institute, ['instituteName', 'instituteManageName'], values.instituteId, 'instituteId').map((item) => (
                                                                <option value={item.instituteId} key={item.instituteId}>
                                                                    {item.instituteName}
                                                                    {item.instituteManageName
                                                                        ? '（' + item.instituteManageName + '）'
                                                                        : ''}
                                                                </option>
                                                            ))}
                                                    </SelectBox>
                                                )}
                                            </InputContainer>
                                            <InputContainer className=" mb-4">
                                                <SelectBox
                                                    label="施設表示選択条件フィルター"
                                                    inputClassName="bg-blue-25 text-blue-100"
                                                    labelClassName="text-blue-100"
                                                    name="filterId"
                                                >
                                                    <option key="default" value="">
                                                        フィルターを選択してください
                                                    </option>
                                                    {filter.length > 0 &&
                                                        getFilteredList(filter, ['filterName', 'filterManageName'], values.filterId, 'filterId').map((item) => (
                                                            <option value={item.filterId} key={item.filterId}>
                                                                {item.filterName}
                                                                {item.filterManageName
                                                                    ? '（' + item.filterManageName + '）'
                                                                    : ''}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <ToggleLock
                                                    label="歯科検診フラグ"
                                                    labelClassName="text-blue-100"
                                                    name="eventInstituteDentalFlag"
                                                    inputClassName=""
                                                    type="checkbox"
                                                    textLeft="歯科検診あり"
                                                    textRight="歯科検診なし"
                                                />
                                            </InputContainer>
                                            {formType === 'edit' ? (
                                                <>
                                                    <InputContainer>
                                                        <Hidden name="eventInstituteSlotType"></Hidden>
                                                    </InputContainer>
                                                    <InputContainer>
                                                        <TextBox
                                                            label="予約対象（作成後変更不可）"
                                                            inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                            labelClassName="text-blue-100"
                                                            name="eventInstituteSlotTypeName"
                                                            readOnly={true}
                                                            tabIndex="-1"
                                                        ></TextBox>
                                                    </InputContainer>
                                                </>
                                            ) : (
                                                <InputContainer>
                                                    <SelectBox
                                                        label="枠タイプ（作成後変更不可）"
                                                        inputClassName="bg-blue-25 text-blue-100"
                                                        labelClassName="text-blue-100"
                                                        name="eventInstituteSlotType"
                                                        onChange={(e) => {
                                                            setSlotTypeShow(e.target.value);
                                                            setFieldValue('eventInstituteSlotType', e.target.value);
                                                        }}
                                                    >
                                                        <option value="0">繰り返しパターン</option>
                                                        <option value="1">１枠ずつ入力</option>
                                                        <option value="2">バス検診</option>
                                                    </SelectBox>
                                                </InputContainer>
                                            )}
                                            {slotTypeShow == 0 && formType == 'add' && (
                                                <>
                                                    <InputContainer className="ml-[32px] mb-4">
                                                        <SelectBox
                                                            label="時間枠パターン（作成後変更不可）"
                                                            inputClassName="bg-blue-25 text-blue-100"
                                                            labelClassName="text-blue-100"
                                                            name="eventInstituteSlotStyleTimePattern"
                                                        >
                                                            <option value="10">10分</option>
                                                            <option value="15">15分</option>
                                                            <option value="20">20分</option>
                                                            <option value="30">30分</option>
                                                            <option value="60">60分</option>
                                                        </SelectBox>
                                                    </InputContainer>
                                                    <InputContainer className="ml-[32px] mb-4">
                                                        <label className="text-blue-100">
                                                            開催時間（範囲）（作成後変更不可）
                                                            <AddRequiredMark />
                                                        </label>
                                                        <div className="flex !text-black">
                                                            <div
                                                                className={`flex items-center cursor-pointer justify-between relative border w-full bg-blue-25 text-blue-100 border-solid !border-blue-100`}
                                                                onClick={() => {
                                                                    setShowTimeRangePicker(!showTimeRangePicker);
                                                                }}
                                                            >
                                                                <input
                                                                    type="text"
                                                                    className={`calendar-input placeholder-blue-400 text-blue-100 pointer-events-none`}
                                                                    value={timeRangeValue && timeRangeValue}
                                                                    readOnly
                                                                    tabIndex="-1"
                                                                    name={'eventInstituteSlotStyleRangeTime'}
                                                                    placeholder={'--:-- ～ --:--'}
                                                                />
                                                                <GoClock className="text-right text-blue-50 z-10 mr-1" />
                                                            </div>
                                                            {showTimeRangePicker && (
                                                                <Calendar2
                                                                    className="w-[392px] h-[112px]"
                                                                    close={() => {
                                                                        setShowTimeRangePicker(false);
                                                                    }}
                                                                    setDateValue={setTimeRangeValue}
                                                                    components={
                                                                        <TimeRangePicker
                                                                            setDateValue={setTimeRangeValue}
                                                                            close={() => {
                                                                                setShowTimeRangePicker(false);
                                                                            }}
                                                                        />
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    </InputContainer>
                                                </>
                                            )}
                                            {slotTypeShow == 0 && formType == 'edit' && (
                                                <>
                                                    <InputContainer className="ml-[32px] mb-4">
                                                        <TextBox
                                                            label="時間枠パターン（作成後変更不可）"
                                                            inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                            labelClassName="text-blue-100"
                                                            name="eventInstituteSlotStyleTimePatternName"
                                                            readOnly={true}
                                                            tabIndex="-1"
                                                        ></TextBox>
                                                    </InputContainer>
                                                    <InputContainer className="ml-[32px] mb-4">
                                                        <TextBox
                                                            label="開催時間（範囲）（作成後変更不可）"
                                                            inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                            labelClassName="text-blue-100"
                                                            name="eventInstituteSlotStyleRangeTime"
                                                            readOnly={true}
                                                            tabIndex="-1"
                                                        ></TextBox>
                                                    </InputContainer>
                                                </>
                                            )}

                                            {(slotTypeShow == 1 || slotTypeShow == 2) && (
                                                <>
                                                    <div className="my-4">
                                                        <InputContainer>
                                                            <div className="flex justify-between ml-8" name="eventTimeList">
                                                                <label className="text-blue-100" name="addTime" >
                                                                    開催枠を設定してください（64枠まで）
                                                                    <AddRequiredMark /> 
                                                                </label>
                                                                <label className="text-blue-100">削除</label>
                                                            </div>
                                                            {savedOptions.length > 0 &&
                                                                savedOptions.map((item) => (
                                                                    <div className="flex pl-8 mt-2 w-full">
                                                                        <div
                                                                            className="flex items-center cursor-pointer bg-gray-300
                                                                        justify-between relative border border-solid border-blue-100 w-[97%]"
                                                                        >
                                                                            <input
                                                                                name="eventTimeM"
                                                                                className={`h-8 p-2 outline-none bg-gray-300 w-full text-blue-100`}
                                                                                type="text"
                                                                                value={item ? item : ''}
                                                                                readOnly
                                                                            />
                                                                            <GoClock className="text-right z-10 mr-2 text-blue-50" />
                                                                        </div>
                                                                        <div className="flex items-center w-[3%] justify-end mt-2 text-blue-100"></div>
                                                                    </div>
                                                                ))}
                                                            {options.length > 0 &&
                                                                options.map((item, id) => (
                                                                    <div className="flex pl-8 w-full">
                                                                        <div className="w-[97%]">
                                                                            <EventTimeInput
                                                                                timePicker={true}
                                                                                timeValue={item}
                                                                                index={id}
                                                                                changedTime={changedTime}
                                                                            />
                                                                        </div>
                                                                        <div className="flex items-center w-[3%] justify-end mt-2 text-blue-100">
                                                                            <FaTrash
                                                                                id={id}
                                                                                className="hover:text-blue-50  cursor-pointer"
                                                                                onClick={() => {
                                                                                    deleteTimeInput(id);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            <ButtonTypeNormal
                                                                buttonTitle={'開催枠追加'}
                                                                addTimeInput={addTimeInput}
                                                            />
                                                        </InputContainer>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        <ModalFormFooterWithHover
                                            padding="!p-0"
                                            buttonComponents={true}
                                            btn_title1={`${formType === 'add' ? 'キャンセル' : '施設削除'}`}
                                            btn_title2={`${formType === 'add' ? '追加' : '更新'}`}
                                            setOpenModal={setOpenModal}
                                            formType={formType}
                                            handleCancel={setCancelModal}
                                            setTimeRangeValue={setTimeRangeValue}
                                            loading={loading}
                                            deleteLoading={deleteLoading}
                                            memoClassName="!text-blue-100"
                                        >
                                            {/* ----error---- */}
                                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                {errors[first]}
                                                {alreadyDeletedErrorMessage &&
                                                    !errors[first] &&
                                                    `${alreadyDeletedErrorMessage}`}
                                                {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                            </ErrorMessage>
                                        </ModalFormFooterWithHover>
                                    </FormBodyContainer>
                                </Form>

                                {openModal && (
                                    <DialogModal
                                        title="削除"
                                        btn_title="施設削除" // 施設削除
                                        cancel_title="キャンセル"
                                        handleButtonRight={closeModal}
                                        // setIsOverFlow={setIsOverflow}
                                        handleButtonLeft={handleDelete}
                                        values={initialValues}
                                        deleteLoading={deleteLoading}
                                        errors={
                                            <span className={`${deleteErrorMessage} ? "visible" : "invisible"`}>
                                                {deleteError && deleteErrorMessage && `${deleteErrorMessage}`}
                                            </span>
                                        }
                                    >
                                        <div className="text-center mt-[1rem]">
                                            <p>選択したデータを削除します。</p>
                                            <div className="text-orange-500 mt-[1rem]">
                                                削除したデータは復元できません。
                                            </div>
                                        </div>
                                    </DialogModal>
                                )}
                            </div>
                        );
                    }}
                </Formik>
            </WhiteModalWrapper>
        </>
    );
};
export default EventInstituteModal;
