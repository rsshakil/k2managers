import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import Page1440Body from '../../Page1440/Page1440Body';
import FormBodyContainer from '../../Wrapper/FormBodyContainer';
import InputContainer from '../../Wrapper/InputContainer';
import TextAreaInput from '../FormInputs/TextAreaInput';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loading from '../../Loading/Loader';
import FormFooter from '../FormFooter';
import TextBox from '../FormInputs/TextBox';
import Calendar2 from '../../Calendar/Calendar2';
import { GoClock } from 'react-icons/go';
import TimesPicker from '../../TimePicker/TimesPicker';
import BusWayTimePicker from '../FormComponents/BusWayTimePicker';
import {
    baseURL,
    createBusWay,
    createMethod,
    deleteBusWay,
    deleteMethod,
    updateBusWay,
    updateMethod,
} from '../../../restapi/queries';
import { instance } from '../../../services/axios';
import { useSelector } from 'react-redux';
import { busWayFormSchema } from '../../../lib/Schema';
import { errorMessages } from '../../../lib/errorMessages';
import DialogModal from '../../Modal/DialogModal';
import { getErrorMessageWithErrorCode } from '../../../lib/getErrorMessageWithErrorCode';

const options = [
    { id: 1, name: '阿佐ヶ谷駅前', timeValue: '' },
    { id: 2, name: '佐ヶ谷南一丁目', timeValue: '' },
    { id: 3, name: '和泉一丁目', timeValue: '' },
    { id: 4, name: '高円寺南四丁目〔都営バス〕', timeValue: '' },
];

// global declaration
const pathname = window.location.pathname;
const routeName = pathname.split('/').pop();
const keyName = 'bus_way_add_timestamp_TimePicker_BusWay';

const BusWatForm = ({ formType, initialValues, busStop, busRouteId, load, busStopInitialTime, setIsOverFlow }) => {
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    const [openModal, setOpenModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [busWay, setbusWay] = useState({ busRouteId: busRouteId });
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const [busWayError, setBusWayError] = useState(false);

    const [timeReset, setTimeReset] = useState(true);
    const [busStopsTime, setBusStopsTime] = useState([]);

    useEffect(() => {
        try {
            if (formType == 'edit') {
                setLoading(true);
                let busStopsTimeArray = [...initialValues.busStops];

                // Making unique array
                const uniqueMembers = unique([...busStopsTimeArray], (a, b) => (a.id === b.id) & (a.name === b.name));

                if (busStopsTimeArray.length > 0) {
                    let busStopsTimeArrayMaking = [];
                    for (let i = 0; i < busStopsTimeArray.length; i++) {
                        const arr = busStopsTimeArray[i];
                        let updateTime = arr.busTime;
                        if (
                            arr.busTime === null ||
                            arr.busTime === '0' ||
                            arr.busTime === '00' ||
                            arr.busTime === undefined
                        ) {
                            updateTime = '0000';
                        }
                        busStopsTimeArrayMaking.push([arr.busStopId, updateTime]);
                    }
                    setBusStopsTime(busStopsTimeArrayMaking);
                }

                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    }, [initialValues]);

    const handleCancel = () => {
        sessionStorage.removeItem(`bus_way_add_timestamp_TimePicker_BusWay`);
        navigate(`/bus_way_list/${busWay.busRouteId}`);
    };

    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        let busTimeJSON = busStopsTime;
        let busStopIds = [];
        let newTimeArrayDB = [];

        // making array of all bus stops ids
        let busStopsId = [...busStop];
        if (busStopsId) {
            for (let i = 1; i < busStopsId.length; i++) {
                let element = busStopsId[i];
                let busStopIdNumber = element[0].busStopId;
                busStopIds.push(busStopIdNumber);
            }

            // loop all bus stop ids and figure out which one is not select any time for bus stop
            for (let j = 0; j < busStopIds.length; j++) {
                const id = busStopIds[j];
                let newTimeArray = [id, '0000'];
                for (let k = 0; k < busTimeJSON.length; k++) {
                    const elm = busTimeJSON[k];
                    const sId = elm[0];
                    const time = elm[1];
                    if (id == sId) {
                        newTimeArray[1] = time;
                    }
                }
                newTimeArrayDB.push(newTimeArray);
            }
        }

        // Remove false value
        let newTimeArrayDB2 = [];
        for (let i = 0; i < newTimeArrayDB.length; i++) {
            let element = newTimeArrayDB[i];
            if (isNaN(element[1])) {
                element[1] = '0000';
            }

            newTimeArrayDB2.push(element);
        }
        const sendingData = {
            busRouteId: sessionStorage.getItem('busRouteId'),
            busWayName: values.busWayName,
            busWayOverview: values.busWayOverview,
            busWayCapacity: values.busWayCapacity,
            busWayDescription: values.busWayDescription,
            busTime: newTimeArrayDB2,
            memo: values.memo,
            createdBy: info.accountId,
            updatedBy: info.accountId,
            projectId: sessionStorage.getItem('currentProjectId')
        };

        try {
            const ENDPOINT = `${baseURL}${createBusWay}`;
            const config = { method: createMethod, url: ENDPOINT, data: { ...sendingData } };

            const created = await instance.request(config);
            if (created) {
                setSystemError(false);
                setLoading(false);
            }
            if (!continuousAdd) {
                navigate(`/bus_way_list/${busWay.busRouteId}`);
                sessionStorage.removeItem(`bus_way_add_timestamp_TimePicker_BusWay`);
            } else {
                resetForm({ [values]: '' });
                sessionStorage.removeItem(`bus_way_add_timestamp_TimePicker_BusWay`);
            }
        } catch (error) {
            if (error.response.status === 409 && error.response.data.errorCode === 101) {
                setSystemError(false);
            } else if (error.response.status === 409 && error.response.data.errorCode === 201) {
                setSystemError(false);
            } else {
                setSystemError(true);
            }
            setTimeReset(timeReset ? false : true);
            setLoading(false);
        } finally {
            processing.current = false;
        }


        setLoading(false);
    };

    // update operation
    const handleUpdate = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);

        // loop all bus stop ids and figure out which one is not select any time for bus stop
        let busStopsUpdateTimes = [...busStopsTime];
        let newBusTime = [];
        for (let j = 0; j < busStopsUpdateTimes.length; j++) {
            const element = busStopsUpdateTimes[j];
            const id = element[0];
            const time = element[1];

            let updateBusTimeArray = [];
            if (time === null || time === '0' || time === '00' || time === 0) {
                updateBusTimeArray[0] = id;
                updateBusTimeArray[1] = '0000';
            } else {
                updateBusTimeArray[0] = id;
                updateBusTimeArray[1] = time;
            }

            newBusTime.push(updateBusTimeArray);
        }
        let updateData = {
            // need to make this dynamic data from value
            projectId: sessionStorage.getItem('currentProjectId'),
            busRouteId: sessionStorage.getItem('busRouteId'),
            busWayId: initialValues.busWayId,
            busWayName: values.busWayName,
            busWayOverview: values.busWayOverview,
            busWayCapacity: values.busWayCapacity,
            busWayDescription: values.busWayDescription,
            busTime: newBusTime,
            memo: values.memo,
            createdBy: info.accountId,
            updatedBy: info.accountId,
        };

        try {
            const ENDPOINT = `${baseURL}${updateBusWay}${values.busRouteId}`;
            const config = { method: updateMethod, url: ENDPOINT, data: { ...updateData } };

            const created = await instance.request(config);
            if (created) {
                setSystemError(false);
                setLoading(false);
            }
            if (!continuousAdd) {
                navigate(`/bus_way_list/${busWay.busRouteId}`);
                sessionStorage.removeItem(`bus_way_add_timestamp_TimePicker_BusWay`);
            }
            // if submit type is continuous
            else {
                navigate(`/bus_way_list/${busWay.busRouteId}`);
                sessionStorage.removeItem(`bus_way_add_timestamp_TimePicker_BusWay`); //bus_way_add_timestamp_TimePicker_BusWay
            }
        } catch (error) {
            if (error.response.status === 409 && error.response.data.errorCode === 101) {
                setSystemError(false);
            } else if (error.response.status === 409 && error.response.data.errorCode === 201) {
                setSystemError(false);
            } else if (error.response.status === 400) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
                setDeleteLoading(false);
            } else {
                setSystemError(true);
            }
            setLoading(false);
        } finally {
            processing.current = false;
        }

        // ___________________________CALLING API___________________________//

        setLoading(false);
    };

    // delete operation
    const handleDelete = async () => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        const projectId = sessionStorage.getItem('currentProjectId');

        try {
            const ENDPOINT = `${baseURL}${deleteBusWay}${busWay.busRouteId}?pid=${projectId}&busWayId=${initialValues.busWayId}`;
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleted = await instance.request(config);

            if (deleted) {
                setDeleteError(false);
                setLoading(false);
                navigate(`/bus_way_list/${busWay.busRouteId}`);
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

    const closeDialogModal = () => {
        setOpenModal(false);
        setIsOverFlow(false);

        setDeleteError(true);
        setLoading(false);
        setSystemError(false);
    };

    function unique(a, fn) {
        if (a.length === 0 || a.length === 1) {
            return a;
        }
        if (!fn) {
            return a;
        }

        for (let i = 0; i < a.length; i++) {
            for (let j = i + 1; j < a.length; j++) {
                if (fn(a[i], a[j])) {
                    a.splice(i, 1);
                }
            }
        }
        return a;
    }

    return (
        <>
            {loading && <Loading />}

            {load ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    <Formik
                        initialValues={initialValues}
                        validateOnChange={false}
                        validateOnBlur={false}
                        validationSchema={busWayFormSchema}
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
                                        <div className="-mt-4" id="scroller"></div>
                                        <FormBodyContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="バス便名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="busWayName"
                                                    maxLength="32"
                                                    placeholder="バス便名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="バス便説明（改行不可128文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="busWayOverview"
                                                    maxLength="128"
                                                    placeholder="バス便説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="バス便説明（改行可512文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="!h-[60px] bg-blue-25"
                                                    name="busWayDescription"
                                                    maxLength="512"
                                                    placeholder="バス便説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="バス便定員"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="busWayCapacity"
                                                    placeholder="バス便定員"
                                                />
                                            </InputContainer>
                                            <InputContainer className="my-8">
                                                {
                                                    // this logic cause busStop data has multiple array { [ [], [] ],[[], []]}
                                                    formType === 'add' && (
                                                        <>
                                                            <label className="text-blue-100">停留所出発時刻</label>
                                                            <div className="px-10 flex justify-between mt-4">
                                                                <label className="font-normal">停留所名</label>
                                                                <label className="font-normal">出発時刻</label>
                                                            </div>
                                                            {busStop &&
                                                                busStop.length > 0 &&
                                                                busStop.map((item, i) => (
                                                                    <div
                                                                        className="ml-10 hover:bg-cevenhover flex justify-between mt-2"
                                                                        key={item.id}
                                                                    >
                                                                        <BusWayTimePicker
                                                                            name={item.name}
                                                                            item={item}
                                                                            index={i}
                                                                            formType="add"
                                                                            setBusStopsTime={setBusStopsTime}
                                                                            busStopsTime={busStopsTime}
                                                                        />
                                                                    </div>
                                                                ))}
                                                        </>
                                                    )
                                                }
                                                {
                                                    // this logic cause busStop data has multiple array { [ [], [] ],[[], []]}
                                                    formType === 'edit' && (
                                                        <>
                                                            <label className="text-blue-100">停留所出発時刻</label>
                                                            <div className="px-10 flex justify-between mt-4">
                                                                <label className="font-normal">停留所名</label>
                                                                <label className="font-normal">出発時刻</label>
                                                            </div>
                                                            {busStop.length > 0 &&
                                                                busStop.map((item, i) => (
                                                                    <div
                                                                        className="ml-10 hover:bg-cevenhover flex justify-between mt-2"
                                                                        key={item.id}
                                                                    >
                                                                        {/* edit screen bus service edit */}
                                                                        <BusWayTimePicker
                                                                            name={item.name}
                                                                            item={item}
                                                                            index={i}
                                                                            timeReset={timeReset}
                                                                            formType="edit"
                                                                            busStopInitialTime={
                                                                                i == 0
                                                                                    ? ''
                                                                                    : busStopInitialTime[i - 1].busTime
                                                                            }
                                                                            busStops={initialValues.busStops}
                                                                            setBusStopsTime={setBusStopsTime}
                                                                            busStopsTime={busStopsTime}
                                                                        />
                                                                    </div>
                                                                ))}
                                                        </>
                                                    )
                                                }
                                            </InputContainer>
                                        </FormBodyContainer>

                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'バス便削除'}
                                            btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                            btn_title3={'キャンセル'}
                                            continuousAddRemove
                                            handleCancel={handleCancel}
                                            formType={formType}
                                            setContinuousAdd={setContinuousAdd}
                                            setIsOverFlow={setIsOverFlow}
                                            loading={loading}
                                            deleteLoading={deleteLoading}
                                            setOpenModal={setOpenModal}
                                        >
                                            {/* ----error---- */}
                                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                {errors[first]}
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
                                            btn_title="バス便削除"
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
                                </div>
                            );
                        }}
                    </Formik>
                </Page1440Body>
            )}
        </>
    );
};
export default BusWatForm;
