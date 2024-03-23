import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik, useFormikContext } from 'formik';
import { useSelector } from 'react-redux';
import { getUnixTime } from 'date-fns';
import {
    baseURL,
    createEventCategory,
    createMethod,
    deleteEventCategory,
    deleteMethod,
    updateEventCategory,
    updateMethod
} from '../../restapi/queries';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SelectBox from '../Form/FormInputs/SelectBox';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';

import Loading from '../../components/Loading/Loader';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { eventCategoryFormSchema } from '../../lib/Schema';
import EmailNotificationEdit from '../../pages/EventList/EventScheduler/NotificationSetting/EmailNotificationEdit';
import NotificationSetting from '../../pages/EventList/EventScheduler/NotificationSetting/NotificationSetting';
import SmsNotificationEdit from '../../pages/EventList/EventScheduler/NotificationSetting/SmsNotificationEdit';
import { instance } from '../../services/axios.js';
import DxDateBox from '../DxDateBox/DxDateBox';
import ModalFormFooterWithHover from '../Footer/ModalFormFooterWithHover';
import AddRequiredMark from '../HelpingComponent/AddRequiredMark';
import ModalTitle from './components/ModalTitle';
import WhiteModalWrapper from './components/WhiteModalWrapper';
import DialogModal from './DialogModal';
import TextBox from '../Form/FormInputs/TextBox';
import _ from "lodash";

// ピッカーがFormikに対応する必要があるためこれが必要
const FormObserver = ({ startDateValue, endDateValue, startTimeValue, endTimeValue }) => {
    const { values } = useFormikContext();

    useEffect(() => {
        values.eventCategoryStartDate = startDateValue ? startDateValue : ''; // it will change the event start date value
        values.eventCategoryStartTime = startTimeValue ? startTimeValue : ''; // it will change the event start time value
        values.eventCategoryEndDate = endDateValue ? endDateValue : ''; // it will change the event end date value
        values.eventCategoryEndTime = endTimeValue ? endTimeValue : ''; // // it will change the event end time value
    }, [values, startDateValue, endDateValue, startTimeValue, endTimeValue]);

    return null;
};
const eventCategoryViewTypeOption = [
    { id: 0, value: '表示しない' },
    { id: 1, value: '表示する' },
];

const EventCategoryModal = ({
    setCancelModal,
    initialValues,
    formType = 'add',
    setIsOverflow,
    title,
    categories,
    filters,
    eventId,
    eventCategoryId,
}) => {
    const eventCategoryStartDateObject = initialValues.eventCategoryStartDate
        ? new Date(initialValues.eventCategoryStartDate * 1000)
        : '';
    const eventCategoryEndDateObject = initialValues.eventCategoryEndDate
        ? new Date(initialValues.eventCategoryEndDate * 1000)
        : '';

    const processing = useRef(false);
    // EMAIL
    const [mailEditModal, setMailEditModal] = useState(false);
    const [smsEditModal, setSmsEditModal] = useState(false);
    const [emailTypeFlag, setEmailTypeFlag] = useState(1);
    const [smsTypeFlag, setSMSTypeFlag] = useState(1);

    const navigate = useNavigate();
    const [startDateValue, setStartDateValue] = useState(); // event start date
    const [startTimeValue, setStartTimeValue] = useState(); // event start time
    const [endDateValue, setEndDateValue] = useState(); // event end data
    const [endTimeValue, setEndTimeValue] = useState();
    const [category, setCategory] = useState([]);
    const [filter, setFilter] = useState([]);
    const [initialFlag, setInitialFlag] = useState(true);
    const [loading, setLoading] = useState(false);
    const [eventCategoryCodeError, setEventCategoryCodeError] = useState(false);
    const [eventCategoryNameError, setEventCategoryNameError] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [eventCodeError, setEventCodeError] = useState(false);
    const [eventNameError, setEventNameError] = useState(false);
    const { info } = useSelector((state) => state.auth);
    const [openModal, setOpenModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [searchItemValue, setSearchItemValue] = useState('');

    const closeModal = () => {
        setSystemError(false);
        setDeleteErrorMessage(false); // remove error message from delete modal
        setAlreadyDeletedErrorMessage(false); // Form screen remove error message
        setOpenModal(false);
        setIsOverflow(false);
    };

    useEffect(() => {
        setCategory(categories);
        setFilter(filters);
    }, [categories, filters]);

    const isInvalidDate = (date) => Number.isNaN(date.getTime());

    // 日付のセット
    useEffect(() => {
        if (
            // eventCategoryStartDateObject !== null &&
            // eventCategoryStartDateObject !== '' &&
            // !isInvalidDate(eventCategoryStartDateObject) &&
            // eventCategoryEndDateObject !== null &&
            // eventCategoryEndDateObject !== '' &&
            // !isInvalidDate(eventCategoryEndDateObject) &&
            formType === 'edit' &&
            initialFlag
        ) {
            const eventCategoryStartDate =
                eventCategoryStartDateObject?.getFullYear().toString() +
                '/' +
                (eventCategoryStartDateObject.getMonth() + 1).toString().padStart(2, '0') +
                '/' +
                eventCategoryStartDateObject.getDate().toString().padStart(2, '0');
            const eventCategoryStartTime =
                eventCategoryStartDateObject?.getHours().toString().padStart(2, '0') +
                ':' +
                eventCategoryStartDateObject.getMinutes().toString().padStart(2, '0') +
                ':' +
                eventCategoryStartDateObject.getSeconds().toString().padStart(2, '0');
            const eventCategoryEndDate =
                eventCategoryEndDateObject?.getFullYear().toString() +
                '/' +
                (eventCategoryEndDateObject.getMonth() + 1).toString().padStart(2, '0') +
                '/' +
                eventCategoryEndDateObject.getDate().toString().padStart(2, '0');
            const eventCategoryEndTime =
                eventCategoryEndDateObject?.getHours().toString().padStart(2, '0') +
                ':' +
                eventCategoryEndDateObject.getMinutes().toString().padStart(2, '0') +
                ':' +
                eventCategoryEndDateObject.getSeconds().toString().padStart(2, '0');

            setStartDateValue(eventCategoryStartDate);
            setStartTimeValue(eventCategoryStartTime);
            setEndDateValue(eventCategoryEndDate);
            setEndTimeValue(eventCategoryEndTime);
            setInitialFlag(false);
        }
    }, [eventCategoryStartDateObject, eventCategoryEndDateObject]);
    // create operation
    const handleAdd = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setEventCategoryCodeError(false);
        setEventCategoryNameError(false);
        setSystemError(false);

        // event start time to unix time
        const eventCategoryStartHour = startTimeValue.slice(0, 2);
        const eventCategoryStartMinutes = startTimeValue.slice(3, 5);
        const eventCategoryStartSeconds = startTimeValue.slice(6);

        let eventCategoryStartNewDate = new Date(startDateValue);
        eventCategoryStartNewDate.setHours(parseInt(eventCategoryStartHour));
        eventCategoryStartNewDate.setMinutes(parseInt(eventCategoryStartMinutes));
        eventCategoryStartNewDate.setSeconds(parseInt(eventCategoryStartSeconds));

        const unixEventCategoryStartTime = eventCategoryStartNewDate && getUnixTime(eventCategoryStartNewDate);

        // event end time to unix time
        const eventCategoryEndHour = endTimeValue.slice(0, 2);
        const eventCategoryEndMinutes = endTimeValue.slice(3, 5);
        const eventCategoryEndSeconds = endTimeValue.slice(6);
        let eventCategoryEndNewDate = new Date(endDateValue);
        eventCategoryEndNewDate.setHours(parseInt(eventCategoryEndHour));
        eventCategoryEndNewDate.setMinutes(parseInt(eventCategoryEndMinutes));
        eventCategoryEndNewDate.setSeconds(parseInt(eventCategoryEndSeconds));

        const unixEventCategoryEndTime = eventCategoryEndNewDate && getUnixTime(eventCategoryEndNewDate);

        // FIXME: I need to keep valid field list in JSON format.
        try {
            const ENDPOINT = `${baseURL}${createEventCategory}?pid=${window.sessionStorage.getItem(
                'currentProjectId'
            )}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    eventId: eventId,
                    categoryId: values.categoryId,
                    eventCategoryViewType: values.eventCategoryViewType,
                    eventCategoryStartDate: unixEventCategoryStartTime,
                    eventCategoryEndDate: unixEventCategoryEndTime,
                    filterId: values.filterId ? values.filterId : 0,
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
            };
            const created = await instance.request(config);
            // if create is successful
            if (created) {
                setSystemError(false);
                setEventCodeError(false);
                setEventNameError(false);
                setLoading(false);
            }
            setCancelModal(true);
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
    };

    // update operation
    const handleUpdate = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setEventCategoryCodeError(false);
        setEventCategoryNameError(false);
        setSystemError(false);

        // event start time to unix time
        const eventCategoryStartHour = startTimeValue.slice(0, 2);
        const eventCategoryStartMinutes = startTimeValue.slice(3, 5);
        const eventCategoryStartSeconds = startTimeValue.slice(6);

        let eventCategoryStartNewDate = new Date(startDateValue);
        eventCategoryStartNewDate.setHours(parseInt(eventCategoryStartHour));
        eventCategoryStartNewDate.setMinutes(parseInt(eventCategoryStartMinutes));
        eventCategoryStartNewDate.setSeconds(parseInt(eventCategoryStartSeconds));

        const unixEventCategoryStartTime = getUnixTime(eventCategoryStartNewDate);

        // event end time to unix time
        const eventCategoryEndHour = endTimeValue.slice(0, 2);
        const eventCategoryEndMinutes = endTimeValue.slice(3, 5);
        const eventCategoryEndSeconds = endTimeValue.slice(6);

        let eventCategoryEndNewDate = new Date(endDateValue);
        eventCategoryEndNewDate.setHours(parseInt(eventCategoryEndHour));
        eventCategoryEndNewDate.setMinutes(parseInt(eventCategoryEndMinutes));
        eventCategoryEndNewDate.setSeconds(parseInt(eventCategoryEndSeconds));

        const unixEventCategoryEndTime = getUnixTime(eventCategoryEndNewDate);

        // FIXME: I need to keep valid field list in JSON format.
        try {
            const ENDPOINT = `${baseURL}${updateEventCategory}${eventCategoryId}?pid=${window.sessionStorage.getItem(
                'currentProjectId'
            )}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    eventId: eventId,
                    categoryId: values.categoryId,
                    eventCategoryViewType: values.eventCategoryViewType,
                    eventCategoryStartDate: unixEventCategoryStartTime,
                    eventCategoryEndDate: unixEventCategoryEndTime,
                    filterId: values.filterId ? values.filterId : 0,
                    memo: values.memo,
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
    };
    // delete operation
    const handleDelete = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setDeleteError(false);
        setSystemError(false);
        try {
            // const ENDPOINTS = ENDPOINTeventId
            const ENDPOINT = `${baseURL}${deleteEventCategory}${eventCategoryId}?eid=${eventId}&pid=${window.sessionStorage.getItem(
                'currentProjectId'
            )}`;
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleted = await instance.request(config);

            // if delete is successful
            if (deleted) {
                setCancelModal();
                setDeleteError(false);
                setLoading(false);
                setOpenModal(false);
                closeModal();
            }
        } catch (error) {
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            if (error.response.status === 400 && error.response.data.errorCode === 101) {
                setDeleteError(true);
                setDeleteErrorMessage(matchErrorMessage);
            } else if (error.response.status === 400 && error.response.data.errorCode === 116) {
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
            {loading ? (
                <Loading />
            ) : (
                <WhiteModalWrapper width="border-none text-black" className="items-start">
                    {/*this is the modal title section*/}
                    <ModalTitle className="text-blue-100 bold text-xl" title={title} />
                    <Formik
                        enableReinitialize={true}
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        validationSchema={eventCategoryFormSchema(formType)}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            if (formType === 'add') {
                                handleAdd(values, resetForm);
                            } else {
                                handleUpdate(values, { setSubmitting });
                            }
                        }}
                    >
                        {({ errors, values }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <>
                                    <div className="relative w-full h-full">
                                        <Form>
                                            <FormObserver
                                                startDateValue={startDateValue}
                                                endDateValue={endDateValue}
                                                startTimeValue={startTimeValue}
                                                endTimeValue={endTimeValue}
                                            />
                                            <div className="-mt-4" id="scroller"></div>
                                            <FormBodyContainer
                                                className="!px-0"
                                                height={`${formType === 'add'
                                                    ? '!min-h-[calc(100vh-436px)]'
                                                    : '!min-h-[calc(100vh-508px)]'
                                                    }`}
                                            >
                                                <div>
                                                    <InputContainer>
                                                        <TextBox
                                                            label={"表示条件（予約カテゴリー・フィルター・管理名）"}
                                                            labelClassName="text-blue-100"
                                                            inputClassName="bg-blue-25"
                                                            type="text"
                                                            name="itemNameSearch"
                                                            placeholder={"表示条件（予約カテゴリー・フィルター・管理名）"}
                                                            onBlur={(e) => setSearchItemValue(e.target.value)}
                                                        />
                                                    </InputContainer>

                                                    <InputContainer>
                                                        <SelectBox
                                                            label="追加する予約カテゴリー"
                                                            inputClassName="bg-blue-25 text-blue-100"
                                                            labelClassName="text-blue-100"
                                                            name="categoryId"
                                                            isRequired
                                                        >
                                                            <option key="default" value="">
                                                                予約カテゴリーを選択してください
                                                            </option>
                                                            {category.length > 0 &&
                                                                getFilteredList(category, ['categoryName', 'categoryManageName'], values.categoryId, 'categoryId').map((cat, index) => (
                                                                    <option value={cat.categoryId} key={cat.categoryId + '_' + index}>
                                                                        {cat.categoryName}{cat.categoryManageName && '（' + cat.categoryManageName + '）'}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                    <InputContainer className="mb-4">
                                                        <SelectBox
                                                            label="予約カテゴリー表示選択条件フィルター"
                                                            inputClassName="text-blue-100 bg-blue-25"
                                                            labelClassName="text-blue-100"
                                                            name="filterId"
                                                        >
                                                            <option key="default" value="0">
                                                                フィルターを選択してください
                                                            </option>
                                                            {filter.length > 0 &&
                                                                getFilteredList(filter, ['filterName', 'filterManageName'], values.filterId, 'filterId').map((fil) => (
                                                                    <option value={fil.filterId} key={fil.filterId}>
                                                                        {fil.filterName}{fil.filterManageName && '（' + fil.filterManageName + '）'}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                    <InputContainer className="mb-4">
                                                        <SelectBox
                                                            label="カレンダー表示時に施設名住所を表示（対応するブロックを使用した場合）"
                                                            inputClassName="text-blue-100 bg-blue-25"
                                                            labelClassName="text-blue-100"
                                                            name="eventCategoryViewType"
                                                        >
                                                            {eventCategoryViewTypeOption.length > 0 &&
                                                                eventCategoryViewTypeOption.map((item) => (
                                                                    <option value={item.id} key={item.id}>
                                                                        {item.value}
                                                                    </option>
                                                                ))}
                                                        </SelectBox>
                                                    </InputContainer>
                                                    <InputContainer id="cdxEventDateBox">
                                                        <label className="text-blue-100">
                                                            予約カテゴリー表示期間 <AddRequiredMark />
                                                        </label>
                                                        {formType === 'edit' ? (
                                                            startDateValue &&
                                                            startTimeValue &&
                                                            endTimeValue &&
                                                            endDateValue && (
                                                                <div className="flex justify-between text-blue-100">
                                                                    <DxDateBox
                                                                        timeValue={startTimeValue}
                                                                        dateValue={startDateValue}
                                                                        nameDate={'eventCategoryStartDate'}
                                                                        nameTime={'eventCategoryStartTime'}
                                                                        setDateValueDate={setStartDateValue}
                                                                        setTimeValue={setStartTimeValue}
                                                                        placeholder="開始日時を選択してください"
                                                                        formType={formType}
                                                                    />
                                                                    <span className="mx-4 flex items-center text-blue-100">
                                                                        ～
                                                                    </span>
                                                                    <DxDateBox
                                                                        timeValue={endTimeValue}
                                                                        dateValue={endDateValue}
                                                                        nameDate={'eventCategoryEndDate'}
                                                                        nameTime={'eventCategoryEndTime'}
                                                                        setDateValueDate={setEndDateValue}
                                                                        setTimeValue={setEndTimeValue}
                                                                        placeholder="終了日時を選択してください"
                                                                        formType={formType}
                                                                    />
                                                                </div>
                                                            )
                                                        ) : (
                                                            <div className="flex justify-between text-blue-100">
                                                                <DxDateBox
                                                                    timeValue={startTimeValue}
                                                                    dateValue={startDateValue}
                                                                    nameDate={'eventCategoryStartDate'}
                                                                    nameTime={'eventCategoryStartTime'}
                                                                    setDateValueDate={setStartDateValue}
                                                                    setTimeValue={setStartTimeValue}
                                                                    placeholder="開始日時を選択してください"
                                                                    formType={formType}
                                                                />
                                                                <span className="mx-4 flex items-center text-blue-100">
                                                                    ～
                                                                </span>
                                                                <DxDateBox
                                                                    timeValue={endTimeValue}
                                                                    dateValue={endDateValue}
                                                                    nameDate={'eventCategoryEndDate'}
                                                                    nameTime={'eventCategoryEndTime'}
                                                                    setDateValueDate={setEndDateValue}
                                                                    setTimeValue={setEndTimeValue}
                                                                    placeholder="終了日時を選択してください"
                                                                    formType={formType}
                                                                />
                                                            </div>
                                                        )}
                                                    </InputContainer>
                                                    {formType !== 'add' && (
                                                        <NotificationSetting
                                                            setEmailTypeFlag={setEmailTypeFlag}
                                                            setMailEditModal={setMailEditModal}
                                                            setSMSTypeFlag={setSMSTypeFlag}
                                                            setSmsEditModal={setSmsEditModal}
                                                        />
                                                    )}
                                                </div>
                                            </FormBodyContainer>
                                            <ModalFormFooterWithHover
                                                buttonComponents={true}
                                                btn_title1={`${formType === 'add' ? 'キャンセル' : '予約カテゴリー削除'
                                                    }`}
                                                btn_title2={`${formType === 'add' ? '追加' : '更新'}`}
                                                setOpenModal={setOpenModal}
                                                formType={formType}
                                                handleCancel={setCancelModal}
                                                memoClassName="!text-blue-100"
                                                padding="!px-0"
                                                loading={loading}
                                                deleteLoading={deleteLoading}
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
                                        </Form>
                                    </div>
                                    {openModal && (
                                        <DialogModal
                                            title="削除"
                                            btn_title="予約カテゴリー削除" // 予約カテゴリー削除
                                            cancel_title="キャンセル"
                                            handleButtonRight={closeModal}
                                            setIsOverFlow={setIsOverflow}
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
                                </>
                            );
                        }}
                    </Formik>
                    {smsEditModal && (
                        <SmsNotificationEdit
                            handleCancel={() => setSmsEditModal(false)}
                            eventID={eventId}
                            eventCategoryId={eventCategoryId}
                            typeFlag={smsTypeFlag}
                        />
                    )}
                    {mailEditModal && (
                        <EmailNotificationEdit
                            handleCancel={() => setMailEditModal(false)}
                            eventID={eventId}
                            eventCategoryId={eventCategoryId}
                            typeFlag={emailTypeFlag}
                        />
                    )}
                </WhiteModalWrapper>
            )}
        </>
    );
};
export default EventCategoryModal;