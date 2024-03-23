import { getUnixTime } from 'date-fns';
import { Form, Formik, useFormikContext } from 'formik';
import moment from 'moment';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFileUpload from '../../hooks/useFileUpload';
import useGetListWithPID from '../../hooks/useGetListWithPID';
import commonConstants from '../../lib/commonConstants';
import { deleteImagesFromAwsS3 } from '../../lib/deleteImages';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { eventFormSchema } from '../../lib/Schema';
import {
    baseURL,
    createEvent,
    createMethod,
    deleteEvent,
    deleteMethod,
    listField,
    listMethod,
    updateEvent,
    updateMethod,
} from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import DateBoxDate from '../DxDateBox/DateBoxDate';
import DxDateBox from '../DxDateBox/DxDateBox';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import Loading from '../Loading/Loader';
import TagBoxComponentV2 from '../ManagementItem/TagBoxComponentV2';
import DialogModal from '../Modal/DialogModal';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import FormFooter from './FormFooter';
import DatePickerInput from './FormInputs/DatePickerInput';
import SelectBox from './FormInputs/SelectBox';
import TextAreaInput from './FormInputs/TextAreaInput';
import TextBox from './FormInputs/TextBox';

const eventCustomerDeleteFlagOption = [
    { id: 0, value: '削除しない' },
    { id: 1, value: '実施日の予約受付終了から指定日数' },
    { id: 2, value: 'イベント終了から指定日数' },
];
const eventReminderSendFlagOption = [
    { id: 0, value: '送信しない' },
    { id: 1, value: '送信する' },
];
const eventReminderSendValueOption = [
    { id: 1, value: '実施日から1日前' },
    { id: 2, value: '実施日から2日前' },
    { id: 3, value: '実施日から3日前' },
    { id: 4, value: '実施日から4日前' },
    { id: 5, value: '実施日から5日前' },
    { id: 6, value: '実施日から6日前' },
    { id: 7, value: '実施日から7日前' },
    { id: 8, value: '実施日から8日前' },
    { id: 9, value: '実施日から9日前' },
    { id: 10, value: '実施日から10日前' },
];
// Event Screen Main Form
const EventForm = ({ initialValues, formType, load, error2, setIsOverFlow, editForm }) => {
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    // used for state management
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [top, setTop] = useState(false);
    const [eventCodeError, setEventCodeError] = useState(false);
    const [eventNameError, setEventNameError] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [systemErrorCopy, setSystemErrorCopy] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const [initialFlag, setInitialFlag] = useState(true);
    const [specifiedDayOptions, setSpecifiedDayOptions] = useState([]);
    const [fieldsOptions, setFieldsOptions] = useState([]);

    const [deleteLoading, setDeleteLoading] = useState(false);

    // File upload component
    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    const [uploadedImage, setUploadedImage] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    // Date Picker values
    const [startDateValue, setStartDateValue] = useState(''); // event start date
    const [startTimeValue, setStartTimeValue] = useState(''); // event start time
    const [endDateValue, setEndDateValue] = useState(''); // event end data
    const [endTimeValue, setEndTimeValue] = useState(''); // event end time
    const [eventFiscalStartDate, setEventFiscalStartDate] = useState(''); // event fiscal start date
    const [eventFiscalEndDate, setEventFiscalEndDate] = useState(''); // event fiscal end date
    const [specifiedDayDisplay, setSpecifiedDayDisplay] = useState(false);
    const [dayRemainderEmail, setDayRemainderEmail] = useState(false);
    const [copyModal, setCopyModal] = useState(false);
    const [tempValues, setTempValues] = useState('');

    const [tagBoxValue, setTagBoxValue] = useState([]);

    const eventStartDateObject = initialValues.eventStartDate ? new Date(initialValues.eventStartDate * 1000) : '';
    const eventEndDateObject = initialValues.eventEndDate ? new Date(initialValues.eventEndDate * 1000) : '';
    const eventFiscalStartDateObject = initialValues.eventFiscalStartDate
        ? new Date(initialValues.eventFiscalStartDate * 1000)
        : '';
    const eventFiscalEndDateObject = initialValues.eventFiscalEndDate
        ? new Date(initialValues.eventFiscalEndDate * 1000)
        : '';
    const projectId = sessionStorage.getItem('currentProjectId');

    useEffect(() => {
        getSpecifiedDayOptions();
    }, []);

    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    const [loader, setLoader] = useState(editForm);

    // if event date and time value changes initial value will reset
    useLayoutEffect(() => {
        if (editForm) {
            try {
                if (eventStartDateObject != null && eventStartDateObject != '' && initialFlag) {
                    try {
                        const eventStartDate =
                            eventStartDateObject.getFullYear().toString() +
                            '/' +
                            (eventStartDateObject.getMonth() + 1).toString().padStart(2, '0') +
                            '/' +
                            eventStartDateObject.getDate().toString().padStart(2, '0');
                        const eventStartTime =
                            eventStartDateObject.getHours().toString().padStart(2, '0') +
                            ':' +
                            eventStartDateObject.getMinutes().toString().padStart(2, '0') +
                            ':' +
                            eventStartDateObject.getSeconds().toString().padStart(2, '0');

                        const eventEndDate =
                            eventEndDateObject.getFullYear().toString() +
                            '/' +
                            (eventEndDateObject.getMonth() + 1).toString().padStart(2, '0') +
                            '/' +
                            eventEndDateObject.getDate().toString().padStart(2, '0');
                        const eventEndTime =
                            eventEndDateObject.getHours().toString().padStart(2, '0') +
                            ':' +
                            eventEndDateObject.getMinutes().toString().padStart(2, '0') +
                            ':' +
                            eventEndDateObject.getSeconds().toString().padStart(2, '0');

                        if (eventStartDate) {
                            setStartDateValue(eventStartDate);
                        }
                        if (eventStartTime) {
                            setStartTimeValue(eventStartTime);
                        }
                        if (eventEndDate) {
                            setEndDateValue(eventEndDate);
                        }
                        if (eventEndTime) {
                            setEndTimeValue(eventEndTime);
                        }

                        setInitialFlag(false);
                    } catch (error) {
                        console.log('error from event date and time');
                    } finally {
                        setLoader(false);
                    }
                }
                if (eventFiscalStartDateObject != null && eventFiscalStartDateObject != '' && initialFlag) {
                    const eventFiscalStartDateValue =
                        eventFiscalStartDateObject.getFullYear().toString() +
                        '/' +
                        (eventFiscalStartDateObject.getMonth() + 1).toString().padStart(2, '0') +
                        '/' +
                        eventFiscalStartDateObject.getDate().toString().padStart(2, '0');
                    setEventFiscalStartDate(eventFiscalStartDateValue);
                }
                if (eventFiscalEndDateObject != null && eventFiscalEndDateObject != '' && initialFlag) {
                    const eventFiscalEndDateValue =
                        eventFiscalEndDateObject.getFullYear().toString() +
                        '/' +
                        (eventFiscalEndDateObject.getMonth() + 1).toString().padStart(2, '0') +
                        '/' +
                        eventFiscalEndDateObject.getDate().toString().padStart(2, '0');
                    setEventFiscalEndDate(eventFiscalEndDateValue);
                }
                if (initialValues.eventCustomerDeleteFlag && initialValues.eventCustomerDeleteFlag != 0) {
                    setSpecifiedDayDisplay(true);
                }
                if (initialValues?.eventReminderSendFlag && initialValues?.eventReminderSendFlag !== 0) {
                    setDayRemainderEmail(true);
                }
            } catch (error) {
                console.log('error from if event date and time value chagnes initial value will reset', error);
            }
        }
    }, [initialValues]);

    const { records: fieldRecords, fetchLoading: loadingField } = useGetListWithPID({
        info: {
            projectId: projectId,
            baseURL: baseURL,
            listURL: listField,
            listMethod: listMethod,
            shouldGetRecord: true,
            fieldType: '0,1,2,3,4,5,6,7',
        },
    });

    useEffect(() => {
        if (fieldRecords?.length > 0) {
            let fieldsArr = [];
            fieldRecords.forEach((field) => {
                let newItem = {};
                newItem.id = field.fieldId;
                newItem.value = field.fieldName;
                fieldsArr.push(newItem);
            });
            setFieldsOptions(fieldsArr);
        }
    }, [fieldRecords]);

    const FormObserver = ({ startDateValue, endDateValue, startTimeValue, endTimeValue }) => {
        const { values } = useFormikContext();

        useEffect(() => {
            values.eventStartDate = startDateValue ? startDateValue : ''; // it will change the event start date value
            values.eventStartTime = startTimeValue ? startTimeValue : ''; // it will change the event start time value
            values.eventEndDate = endDateValue ? endDateValue : ''; // it will change the event end date value
            values.eventEndTime = endTimeValue ? endTimeValue : ''; // // it will change the event end time value

            setSpecifiedDayDisplay(
                values.eventCustomerDeleteFlag == 1 || values.eventCustomerDeleteFlag == 2 ? true : false
            );
            setDayRemainderEmail(values?.eventReminderSendFlag == 1 ? true : false);
        }, [values, startDateValue, endDateValue, startTimeValue, endTimeValue]);

        return null;
    };

    // cancel operation
    const handleCancel = () => {
        navigate('/event_list');
    };
    // copy operation
    const handleCopy = () => {
        setCopyModal(true);
        setIsOverFlow(true);
    };

    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setEventCodeError(false);
        setEventNameError(false);
        setSystemError(false);

        let eventImageURL1 = '';
        let eventImageURL2 = '';
        let eventImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                eventImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                eventImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                eventImageURL3 = uI.location;
            }
        });

        // event start time to unix time
        const eventStartHour = startTimeValue.slice(0, 2);
        const eventStartMinutes = startTimeValue.slice(3, 5);
        const eventStateSeconds = startTimeValue.slice(6);

        let eventStartNewDate = new Date(startDateValue);
        eventStartNewDate.setHours(parseInt(eventStartHour));
        eventStartNewDate.setMinutes(parseInt(eventStartMinutes));
        eventStartNewDate.setSeconds(parseInt(eventStateSeconds));

        const unixEventStartTime = getUnixTime(eventStartNewDate);

        const eventEndHour = endTimeValue.slice(0, 2);
        const eventEndMinutes = endTimeValue.slice(3, 5);
        const eventEndSeconds = endTimeValue.slice(6);

        let eventEndNewDate = new Date(endDateValue);
        eventEndNewDate.setHours(parseInt(eventEndHour));
        eventEndNewDate.setMinutes(parseInt(eventEndMinutes));
        eventEndNewDate.setSeconds(parseInt(eventEndSeconds));
        const unixEventEndTime = getUnixTime(eventEndNewDate);

        let eventFiscalStartDateValue = new Date(eventFiscalStartDate);
        const unixEventFiscalStartDate = getUnixTime(eventFiscalStartDateValue);

        let eventFiscalEndDateValue = new Date(eventFiscalEndDate);
        const unixEventFiscalEndDate = getUnixTime(eventFiscalEndDateValue);

        const lenOfTagBox = tagBoxValue.length;
        let eventMailFlag = 0;
        if (lenOfTagBox == 2) {
            eventMailFlag = 3;
        } else if (lenOfTagBox == 1) {
            eventMailFlag = tagBoxValue[0];
        }

        try {
            const ENDPOINT = `${baseURL}${createEvent}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    eventName: values.eventName.trim(),
                    eventOverview: values.eventOverview,
                    eventDescription: values.eventDescription,
                    eventStartDate: unixEventStartTime,
                    eventEndDate: unixEventEndTime,
                    eventFiscalStartDate: unixEventFiscalStartDate,
                    eventFiscalEndDate: unixEventFiscalEndDate,
                    eventImageURL1: eventImageURL1,
                    eventImageURL2: eventImageURL2,
                    eventImageURL3: eventImageURL3,
                    eventCustomerDeleteFlag: values.eventCustomerDeleteFlag,
                    eventCustomerDeleteValue:
                        values.eventCustomerDeleteFlag == 0
                            ? null
                            : values.eventCustomerDeleteValue !== null
                            ? values.eventCustomerDeleteValue
                            : 30,
                    eventReminderSendFlag: values.eventReminderSendFlag,
                    eventReminderSendValue:
                        values.eventReminderSendFlag == 0
                            ? null
                            : values.eventReminderSendValue
                            ? values.eventReminderSendValue
                            : 0,
                    token1FieldId: values.token1FieldId,
                    token2FieldId: values.token2FieldId,
                    token3FieldId: values.token3FieldId,
                    eventMailFlag: eventMailFlag,
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
            };

            const created = await instance.request(config);
            if (created) {
                setSystemError(false);
                setEventCodeError(false);
                setEventNameError(false);
                setLoading(false);
            }
            // if submit type is not continuous
            if (!continuousAdd) {
                return navigate('/event_list');
            }
            // if submit type is continuous
            else {
                // Reset form Nur
                resetForm({ [values]: '' });
                setFiles({});
                setImages({});
                setUploadedImage([]);
                setStartDateValue('');
                setEndDateValue('');
                setStartTimeValue('');
                setEndTimeValue('');
                setTop((prev) => !prev);
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
        setEventCodeError(false);
        setEventNameError(false);
        setSystemError(false);

        // dynamically added image link cause image link not work in formik linkon code
        let eventImageURL1 = '';
        let eventImageURL2 = '';
        let eventImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                eventImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                eventImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                eventImageURL3 = uI.location;
            }
        });

        // event start time to unix time
        const eventStartHour = startTimeValue.slice(0, 2);
        const eventStartMinutes = startTimeValue.slice(3, 5);
        const eventStateSeconds = startTimeValue.slice(6);
        let eventStartNewDate = new Date(startDateValue);
        eventStartNewDate.setHours(parseInt(eventStartHour));
        eventStartNewDate.setMinutes(parseInt(eventStartMinutes));
        eventStartNewDate.setSeconds(parseInt(eventStateSeconds));
        const unixEventStartTime = getUnixTime(eventStartNewDate);

        // event end time to unix time
        const eventEndHour = endTimeValue.slice(0, 2);
        const eventEndMinutes = endTimeValue.slice(3, 5);
        const eventEndSeconds = endTimeValue.slice(6);
        let eventEndNewDate = new Date(endDateValue);
        eventEndNewDate.setHours(parseInt(eventEndHour));
        eventEndNewDate.setMinutes(parseInt(eventEndMinutes));
        eventEndNewDate.setSeconds(parseInt(eventEndSeconds));
        const unixEventEndTime = getUnixTime(eventEndNewDate);

        // eventFiscalDate
        let eventFiscalStartDateValue = new Date(eventFiscalStartDate);
        const unixEventFiscalStartDate = getUnixTime(eventFiscalStartDateValue);

        let eventFiscalEndDateValue = new Date(eventFiscalEndDate);
        const unixEventFiscalEndDate = getUnixTime(eventFiscalEndDateValue);

        // tag box value set
        const lenOfTagBox = tagBoxValue.length;
        let eventMailFlag = 0;
        if (lenOfTagBox == 2) {
            eventMailFlag = 3;
        } else if (lenOfTagBox == 1) {
            eventMailFlag = tagBoxValue[0];
        }

        try {
            const ENDPOINT = `${baseURL}${updateEvent}${values.eventId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    // eventCode: values.eventCode.trim(),
                    eventName: values.eventName.trim(),
                    eventOverview: values.eventOverview,
                    eventDescription: values.eventDescription,
                    eventStartDate: unixEventStartTime,
                    eventEndDate: unixEventEndTime,
                    eventFiscalStartDate: unixEventFiscalStartDate,
                    eventFiscalEndDate: unixEventFiscalEndDate,
                    eventImageURL1: eventImageURL1,
                    eventImageURL2: eventImageURL2,
                    eventImageURL3: eventImageURL3,
                    eventCustomerDeleteFlag: values.eventCustomerDeleteFlag,
                    eventCustomerDeleteValue:
                        values.eventCustomerDeleteFlag == 0
                            ? null
                            : values.eventCustomerDeleteValue !== null
                            ? values.eventCustomerDeleteValue
                            : 30,
                    eventReminderSendFlag: values.eventReminderSendFlag,
                    eventReminderSendValue:
                        values.eventReminderSendFlag == 0
                            ? null
                            : values.eventReminderSendValue
                            ? values.eventReminderSendValue
                            : 0,
                    token1FieldId: values.token1FieldId,
                    token2FieldId: values.token2FieldId,
                    token3FieldId: values.token3FieldId,
                    eventMailFlag: eventMailFlag,
                    //eventValidField: eventValidField,
                    memo: values.memo,
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
                await deleteImagesFromAwsS3(deleteImages);
                navigate('/event_list');
            }
        } catch (error) {
            if (error.response.status === 409 && error.response.data.errorCode === 109) {
                setEventNameError(false);
                setSystemError(false);
                setEventCodeError(true);
            } else if (error.response.status === 409 && error.response.data.errorCode === 201) {
                setEventCodeError(false);
                setSystemError(false);
                setEventNameError(true);
            } else if (error.response.status === 400 || error.response.status === 403) {
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
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${deleteEvent}${values.eventId}?pid=${projectId}`;
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleted = await instance.request(config);

            if (deleted) {
                setDeleteError(false);
                setLoading(false);
                navigate('/event_list');
            }
        } catch (error) {
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            setDeleteError(true);
            setDeleteErrorMessage(matchErrorMessage);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    // Handle Copy Event
    const handleCopyEvent = async () => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemErrorCopy(false);
        try {
            const ENDPOINT = `${baseURL}${createEvent}${initialValues.eventId}?pid=${projectId}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: { createdBy: info.accountId },
            };
            const copied = await instance.request(config);

            // if copy is successful
            if (copied) {
                setSystemErrorCopy(false);
                setLoading(false);
            }
            return navigate('/event_list');
        } catch (error) {
            if (error.response?.status === 409) {
                setSystemErrorCopy(false);
            } else {
                console.warn('SYSTEM ERROR: ', error);
                setSystemErrorCopy(true);
                setLoading(false);
            }
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    const closeDialogModal = () => {
        setOpenModal(false);
        setIsOverFlow(false);
        setDeleteError(false);
    };

    const eventFiscalStartDateHandle = (value) => {
        let nextYearDate = moment(value, 'YYYY/MM/DD').add(1, 'years').subtract(1, 'day').format('YYYY/MM/DD');
        if (nextYearDate === 'Invalid date' || nextYearDate === '1970/12/31') {
            setEventFiscalEndDate('');
            setEventFiscalStartDate('');
        } else {
            setEventFiscalEndDate(nextYearDate);
            setEventFiscalStartDate(value);
        }
    };

    const getSpecifiedDayOptions = () => {
        let contents = [];
        for (let i = 30; i <= 99; i++) {
            let item = {};
            item.id = i;
            item.value = i + '日';
            contents.push(item);
        }
        contents.push({ id: 0, value: 0 + '日' });
        setSpecifiedDayOptions(contents);
    };

    return (
        <>
            {loading && <Loading />}
            {load || loader ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        validationSchema={eventFormSchema(formType)}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            if (formType === 'add') {
                                handleAdd(values, resetForm);
                            } else {
                                handleUpdate(values, { setSubmitting });
                            }
                        }}
                    >
                        {({ errors }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <div className="relative w-full h-full">
                                    <Form>
                                        <FormObserver
                                            startDateValue={startDateValue}
                                            endDateValue={endDateValue}
                                            startTimeValue={startTimeValue}
                                            endTimeValue={endTimeValue}
                                        />
                                        <div className="-mt-4" id="scroller"></div>
                                        <FormBodyContainer>
                                            {/* file upload section and input box*/}
                                            <InputContainer>
                                                <FileUploadInput
                                                    files={files}
                                                    setFiles={setFiles}
                                                    images={images}
                                                    setImages={setImages}
                                                    uploadedImage={uploadedImage}
                                                    setUploadedImage={setUploadedImage}
                                                    initialValues={initialValues}
                                                    error={error}
                                                    setError={setError}
                                                    name="eventImageURL"
                                                    label="イベント画像（3枚まで）"
                                                    deleteImageConfrim={true}
                                                    setDeleteImages={setDeleteImages}
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="イベントID"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-gray-300 pointer-events-none"
                                                    name="eventId"
                                                    readOnly
                                                    tabIndex="-1"
                                                />
                                            </InputContainer>

                                            <InputContainer>
                                                <TextBox
                                                    label="イベント名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="eventName"
                                                    placeholder="イベント名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="イベント説明（改行不可128文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="eventOverview"
                                                    maxLength="128"
                                                    placeholder="イベント説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="イベント説明（改行可512文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="!h-[60px] bg-blue-25"
                                                    name="eventDescription"
                                                    maxLength="512"
                                                    placeholder="イベント説明"
                                                />
                                            </InputContainer>
                                            {/* custome input section */}
                                            <InputContainer id="cdxDateBox">
                                                <div className="flex justify-between">
                                                    <div>
                                                        <label className="text-blue-100">
                                                            イベント開始日時<span class="text-orange-300">※</span>
                                                        </label>
                                                        <DxDateBox
                                                            timeValue={startTimeValue}
                                                            dateValue={startDateValue}
                                                            setDateValueDate={setStartDateValue}
                                                            setTimeValue={setStartTimeValue}
                                                            placeholder="開始日時を選択してください"
                                                            formType={formType}
                                                        />
                                                    </div>

                                                    <span className="flex items-center text-blue-100 font-bold px-6 pt-[25px]">
                                                        ～
                                                    </span>
                                                    <div>
                                                        <label className="text-blue-100">
                                                            イベント終了日時 <span class="text-orange-300">※</span>
                                                        </label>
                                                        <DxDateBox
                                                            timeValue={endTimeValue}
                                                            dateValue={endDateValue}
                                                            setDateValueDate={setEndDateValue}
                                                            setTimeValue={setEndTimeValue}
                                                            placeholder="終了日時を選択してください"
                                                            formType={formType}
                                                        />
                                                    </div>
                                                </div>
                                            </InputContainer>
                                            <div className="flex justify-between">
                                                <InputContainer>
                                                    <label className="text-blue-100">イベント年度開始日</label>
                                                    <DateBoxDate
                                                        dateValue={eventFiscalStartDate}
                                                        placeholder="イベント年度開始日"
                                                        setDateValueDate={eventFiscalStartDateHandle}
                                                    />
                                                </InputContainer>
                                                <span className="flex items-center text-blue-100 font-bold pt-[10px]">～</span>
                                                <InputContainer>
                                                    <DatePickerInput
                                                        datePickerWidth="w-[38rem]"
                                                        label="イベント年度終了日"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-gray-200"
                                                        name="eventYearEndDate"
                                                        value={eventFiscalEndDate}
                                                        placeholder="イベント年度終了日"
                                                        clickEventPrevent={true}
                                                    />
                                                </InputContainer>
                                            </div>
                                            <InputContainer>
                                                <SelectBox
                                                    label="イベント顧客データ削除設定"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="eventCustomerDeleteFlag"
                                                >
                                                    {eventCustomerDeleteFlagOption.length > 0 &&
                                                        eventCustomerDeleteFlagOption.map((field, index) => (
                                                            <option value={field.id} key={field.id + '_' + index}>
                                                                {field.value}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            {specifiedDayDisplay && (
                                                <InputContainer className="px-10 mb-4">
                                                    <SelectBox
                                                        label="指定日数選択"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="eventCustomerDeleteValue"
                                                    >
                                                        {specifiedDayOptions.length > 0 &&
                                                            specifiedDayOptions.map((field, index) => (
                                                                <option value={field.id} key={field.id + '_' + index}>
                                                                    {field.value}
                                                                </option>
                                                            ))}
                                                    </SelectBox>
                                                </InputContainer>
                                            )}
                                            <InputContainer>
                                                <SelectBox
                                                    label="トークン1"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="token1FieldId"
                                                >
                                                    <option value="">
                                                        {' '}
                                                        {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                            'トークン1'
                                                        )}{' '}
                                                    </option>
                                                    {fieldsOptions.length > 0 &&
                                                        fieldsOptions.map((field, index) => (
                                                            <option value={field.id} key={field.id + '_' + index}>
                                                                {field.value}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label="トークン2"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="token2FieldId"
                                                >
                                                    <option value="">
                                                        {' '}
                                                        {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                            'トークン2'
                                                        )}{' '}
                                                    </option>
                                                    {fieldsOptions.length > 0 &&
                                                        fieldsOptions.map((field, index) => (
                                                            <option value={field.id} key={field.id + '_' + index}>
                                                                {field.value}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label="トークン3"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="token3FieldId"
                                                >
                                                    <option value="">
                                                        {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT('トークン3')}
                                                    </option>
                                                    {fieldsOptions.length > 0 &&
                                                        fieldsOptions.map((field, index) => (
                                                            <option value={field.id} key={field.id + '_' + index}>
                                                                {field.value}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            {formType === 'add' && (
                                                <InputContainer>
                                                    <span className="flex items-center text-blue-100 font-bold">
                                                        メールSMS送信手段
                                                    </span>
                                                    <TagBoxComponentV2
                                                        setTagBoxValue={setTagBoxValue}
                                                        tagBoxValue={tagBoxValue}
                                                    />
                                                </InputContainer>
                                            )}
                                            {formType === 'edit' && (
                                                <InputContainer>
                                                    <span className="flex items-center text-blue-100 font-bold">
                                                        メールSMS送信手段
                                                    </span>
                                                    <TagBoxComponentV2
                                                        setTagBoxValue={setTagBoxValue}
                                                        formType={formType}
                                                        tagBoxValue={tagBoxValue}
                                                        initialValues={initialValues}
                                                    />
                                                </InputContainer>
                                            )}
                                            <InputContainer>
                                                <SelectBox
                                                    label="リマインドメール送信設定"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="eventReminderSendFlag"
                                                >
                                                    {eventReminderSendFlagOption.length > 0 &&
                                                        eventReminderSendFlagOption.map((field, index) => (
                                                            <option value={field.id} key={field.id + '_' + index}>
                                                                {field.value}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            {/* eventReminderSendValue */}
                                            {dayRemainderEmail && (
                                                <InputContainer className="px-10 mb-4">
                                                    <SelectBox
                                                        label="指定日数選択"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="eventReminderSendValue"
                                                    >
                                                        {eventReminderSendValueOption.length > 0 &&
                                                            eventReminderSendValueOption.map((field, index) => (
                                                                <option value={field.id} key={field.id + '_' + index}>
                                                                    {field.value}
                                                                </option>
                                                            ))}
                                                    </SelectBox>
                                                </InputContainer>
                                            )}
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'イベント削除'}
                                            btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                            btn_title3="キャンセル"
                                            btn_title4="複製"
                                            continuousAddRemove
                                            buttonComponents={true}
                                            handleCancel={handleCancel}
                                            formType={formType}
                                            setContinuousAdd={setContinuousAdd}
                                            setIsOverFlow={setIsOverFlow}
                                            loading={loading}
                                            deleteLoading={deleteLoading}
                                            setOpenModal={setOpenModal}
                                            handleCopy={handleCopy}
                                        >
                                            {/* ----error---- */}
                                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                {errors[first]}
                                                {eventCodeError &&
                                                    !errors[first] &&
                                                    `${errorMessages.W_EXISTS_01('イベントコード')}`}
                                                {eventNameError &&
                                                    !errors[first] &&
                                                    `${errorMessages.W_EXISTS_01('イベント名')}`}
                                                {alreadyDeletedErrorMessage &&
                                                    !errors[first] &&
                                                    `${alreadyDeletedErrorMessage}`}
                                                {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                            </ErrorMessage>
                                        </FormFooter>
                                    </Form>
                                    {openModal && (
                                        <DialogModal
                                            title="削除"
                                            btn_title="イベント削除"
                                            cancel_title="キャンセル "
                                            handleButtonLeft={handleDelete}
                                            handleButtonRight={closeDialogModal}
                                            setIsOverFlow={setIsOverFlow}
                                            values={initialValues}
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
                                    {copyModal && (
                                        <DialogModal
                                            title="複製"
                                            btn_title="キャンセル"
                                            cancel_title="複製"
                                            values={tempValues}
                                            handleButtonLeft={() => {
                                                setCopyModal(false);
                                                setIsOverFlow(false);
                                            }}
                                            colorType="bg-blue-100"
                                            handleButtonRight={handleCopyEvent}
                                            setIsOverFlow={setIsOverFlow}
                                            errors={
                                                <span className={`${errors[first]} ? "visible" : "invisible"`}>
                                                    {systemErrorCopy &&
                                                        !errors[first] &&
                                                        `${errorMessages.E_SYSTEM_01}`}
                                                </span>
                                            }
                                        >
                                            <div className="text-center mt-[1rem]">
                                                <p>選択したデータを複製します。</p>
                                            </div>
                                        </DialogModal>
                                    )}
                                </div>
                            );
                        }}
                    </Formik>
                </Page1440Body>
            )}
        </>
    );
};
export default EventForm;
