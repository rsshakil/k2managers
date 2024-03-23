import React, { useEffect, useRef, useState } from 'react';
import Page1440Body from '../../Page1440/Page1440Body';
import { Form, Formik, useFormikContext } from 'formik';
import FormBodyContainer from '../../Wrapper/FormBodyContainer';
import InputContainer from '../../Wrapper/InputContainer';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import FormFooter from '../FormFooter';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    baseURL,
    listMethod,
    createMethod,
    updateMethod,
    deleteMethod,
    listEvent,
    listDomain,
    createApp,
    updateApp,
    deleteApp,
} from '../../../restapi/queries';
import Loading from '../../Loading/Loader';
import { appFormSchema } from '../../../lib/Schema';
import { errorMessages } from '../../../lib/errorMessages';
import TextBox from '../FormInputs/TextBox';
import SelectBox from '../FormInputs/SelectBox';
import ToggleLock from '../FormInputs/ToggleLock';
import PasswordWithEye from '../FormInputs/PasswordWithEye';
import DatePickerInput from '../FormInputs/DatePickerInput';
import TimePickerInput from '../FormInputs/TimePickerInput';
import DialogModal from '../../Modal/DialogModal';
import { getUnixTime } from 'date-fns';
import { instance } from '../../../services/axios.js';
import commonConstants from '../../../lib/commonConstants';
import { getErrorMessageWithErrorCode } from '../../../lib/getErrorMessageWithErrorCode';
import { defaultCommonPages } from '../../../lib/commonConstants';

const FormObserver = ({ startDateValue, endDateValue, startTimeValue, endTimeValue }) => {
    const { values } = useFormikContext();

    return null;
};

const AppForm = ({ initialValues, formType, load, setIsOverFlow, editForm }) => {
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [top, setTop] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const [eye, setEye] = useState(false);
    const [show, setShow] = useState(false);
    const [eventOptions, setEventOptions] = useState([]);
    const [domainOptions, setDomainOptions] = useState([]);
    const [storeValues, setStoreValues] = useState({});

    const [openDomainConfirmation, setOpenDomainConfirmation] = useState(false);

    // Date Picker values
    const [startDateValue, setStartDateValue] = useState(''); // app start date
    const [startTimeValue, setStartTimeValue] = useState(''); // app start time
    const [endDateValue, setEndDateValue] = useState(''); // app end data
    const [endTimeValue, setEndTimeValue] = useState('');

    const [deleteLoading, setDeleteLoading] = useState(false);

    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '20px', behavior: 'smooth' });
    }, [top]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const projectId = sessionStorage.getItem('currentProjectId');
                // get event list
                let ENDPOINT = `${baseURL}${listEvent}?itemsPerPage=1000&pagesVisited=0&pid=${projectId}`;
                let config = { method: listMethod, url: ENDPOINT };
                let response = await instance.request(config);
                let result = await response.data;

                if (result.error) throw new Error(result.error);
                if (result.records !== undefined) {
                    setEventOptions(
                        result.records.map(({ eventId, eventName, ...rest }) => ({
                            id: eventId,
                            value: eventName,
                            ...rest,
                        }))
                    );
                }

                // get domain list
                ENDPOINT = `${baseURL}${listDomain}?itemsPerPage=1000&pagesVisited=0`;
                config = { method: listMethod, url: ENDPOINT };
                response = await instance.request(config);
                result = await response.data;
                if (result.error) throw new Error(result.error);
                if (result.records !== undefined) {
                    setDomainOptions(
                        result.records.map(({ domainId, domainName, domainURL, ...rest }) => ({
                            id: domainId,
                            value: domainName,
                            url: domainURL,
                            ...rest,
                        }))
                    );
                }

                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        if (!initialValues.appBasicFlag) {
            setShow(true);
        } else {
            setShow(false);
        }
    }, [initialValues.appBasicFlag]);

    // cancel operation
    const handleCancel = () => {
        navigate('/app_list');
    };

    const processing = useRef(false);
    // create operation
    const handleAdd = async (values) => {
        if (processing.current) return;
        processing.current = true;

        setLoading(true);
        setSystemError(false);
        setStoreValues(values);

        // app start time to unix time
        const appStartHour = startTimeValue.slice(0, 2);
        const appStartMinutes = startTimeValue.slice(3);
        let appStartNewDate = new Date(startDateValue);
        appStartNewDate.setHours(parseInt(appStartHour));
        appStartNewDate.setMinutes(parseInt(appStartMinutes));
        const unixAppStartTime = getUnixTime(appStartNewDate);
        // app end time to unix time
        const appEndHour = endTimeValue.slice(0, 2);
        const appEndMinutes = endTimeValue.slice(3);
        let appEndNewDate = new Date(endDateValue);
        appEndNewDate.setHours(parseInt(appEndHour));
        appEndNewDate.setMinutes(parseInt(appEndMinutes));
        const unixAppEndTime = getUnixTime(appEndNewDate);

        // if app basic auth not using user and password is blank.
        const appBasicUser = values.appBasicFlag ? '' : values.appBasicUser;
        const appBasicPassword = values.appBasicFlag ? '' : values.appBasicPassword;

        try {
            const ENDPOINT = `${baseURL}${createApp}?pid=${sessionStorage.getItem('currentProjectId')}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    eventId: values.eventId,
                    appName: values.appName.trim(),
                    appDomainId: values.appDomainId,
                    appAPIDomainId: values.appAPIDomainId,
                    appAuthDomainId: values.appAuthDomainId,
                    appStatus: values.appStatus ? 1 : 0,
                    appBasicFlag: values.appBasicFlag ? 1 : 0,
                    appBasicUser: appBasicUser,
                    appBasicPassword: appBasicPassword,
                    switchFlag: values?.switchFlag,
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                    defaultCommonPages: defaultCommonPages,
                },
            };
            const created = await instance.request(config);

            // if create is successful
            if (created) {
                setSystemError(false);
                setLoading(false);
                if (created.data?.errorCode === 601) {
                    setOpenDomainConfirmation(true);
                } else {
                    return navigate('/app_list');
                }
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }
        finally {
            processing.current = false;
        }
    };

    // update operation
    const handleUpdate = async (values) => {
        if (processing.current) return;
        processing.current = true;

        setLoading(true);
        setSystemError(false);
        setStoreValues(values);

        // app start time to unix time
        const appStartHour = startTimeValue.slice(0, 2);
        const appStartMinutes = startTimeValue.slice(3);
        let appStartNewDate = new Date(startDateValue);
        appStartNewDate.setHours(parseInt(appStartHour));
        appStartNewDate.setMinutes(parseInt(appStartMinutes));
        const unixAppStartTime = getUnixTime(appStartNewDate);
        // app end time to unix time
        const appEndHour = endTimeValue.slice(0, 2);
        const appEndMinutes = endTimeValue.slice(3);
        let appEndNewDate = new Date(endDateValue);
        appEndNewDate.setHours(parseInt(appEndHour));
        appEndNewDate.setMinutes(parseInt(appEndMinutes));
        const unixAppEndTime = getUnixTime(appEndNewDate);

        const appBasicUser = values.appBasicFlag ? '' : values.appBasicUser;
        const appBasicPassword = values.appBasicFlag ? '' : values.appBasicPassword;

        try {
            const ENDPOINT = `${baseURL}${updateApp}${values.appId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    eventId: values.eventId,
                    appName: values.appName.trim(),
                    appDomainId: values.appDomainId,
                    appAPIDomainId: values.appAPIDomainId,
                    appAuthDomainId: values.appAuthDomainId,
                    appStatus: values.appStatus ? 1 : 0,
                    appBasicFlag: values.appBasicFlag ? 1 : 0,
                    appBasicUser: appBasicUser,
                    appBasicPassword: appBasicPassword,
                    switchFlag: values?.switchFlag,
                    memo: values.memo,
                    updatedBy: info.accountId,
                    projectId: sessionStorage.getItem('currentProjectId'),
                },
            };
            const updated = await instance.request(config);

            // if update is successful
            if (updated) {
                setSystemError(false);
                setLoading(false);
                if (updated.data?.errorCode === 601) {
                    // Confirm whether to force the switching because the domain is used by another APP
                    setOpenDomainConfirmation(true);
                } else {
                    return navigate('/app_list');
                }
            }
        } catch (error) {
            if (error.response.status === 400) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
                setDeleteLoading(false);
            } else {
                setDeleteLoading(false);
                setSystemError(true);
            }
            setLoading(false);
        }
        finally {
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
            const ENDPOINT = `${baseURL}${deleteApp}${values.appId}?pid=${sessionStorage.getItem('currentProjectId')}`;
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleted = await instance.request(config);

            // if delete is successful
            if (deleted) {
                setDeleteError(false);
                setLoading(false);
                navigate('/app_list');
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
        setDeleteError(false);
    };

    const handleConfirmDomain = (values, formType) => {
        values['switchFlag'] = 1; //If "Yes" is selected in the confirmation modal set parameter "switchFlag = 1" in body
        formType === 'edit' ? handleUpdate(values) : handleAdd(values);
    };

    return (
        <>
            {loading && <Loading />}
            {load ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        validationSchema={appFormSchema(show)}
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
                                            <InputContainer>
                                                <SelectBox
                                                    label="イベント"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="eventId"
                                                    isRequired
                                                >
                                                    <option value="">
                                                        {' '}
                                                        {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                            'イベント'
                                                        )}{' '}
                                                    </option>
                                                    {eventOptions.length > 0 &&
                                                        eventOptions.map((event) => (
                                                            <option value={event.id} key={event.id}>
                                                                {event.value}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="APP名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="appName"
                                                    maxLength="32"
                                                    placeholder="APP名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="APP コード（自動生成変更不可）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    name="appCode"
                                                    readOnly
                                                    tabIndex="-1"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="最新デプロイベース"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    name="appBaseName"
                                                    readOnly
                                                    tabIndex="-1"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label="APP 画面アクセスドメイン（ドメインを変更した場合、デザイナー画面でデプロイが必要です）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="appDomainId"
                                                >
                                                    <option value="">
                                                        {' '}
                                                        {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                            'APP 画面アクセスドメイン'
                                                        )}{' '}
                                                    </option>
                                                    {domainOptions.length > 0 &&
                                                        domainOptions.map((domain, key) => (
                                                            <option
                                                                value={domain.id}
                                                                key={domain.id + '_appDomainId_' + key}
                                                            >
                                                                {domain.value}（{domain.url}）
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>

                                            <InputContainer>
                                                <ToggleLock
                                                    label="メンテナンス（設定の反映にはデプロイが必要です）"
                                                    labelClassName="text-blue-100"
                                                    name="appStatus"
                                                    inputClassName=""
                                                    type="checkbox"
                                                    textLeft="運用中"
                                                    textRight="メンテナンス中"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <ToggleLock
                                                    label="BASIC認証フラグ（変更時に再構成が実行されます）"
                                                    labelClassName="text-blue-100"
                                                    name="appBasicFlag"
                                                    inputClassName=""
                                                    type="checkbox"
                                                    textLeft="利用しない"
                                                    textRight="利用する"
                                                    onClick={(e) => {
                                                        setShow(!show);
                                                    }}
                                                />
                                            </InputContainer>
                                            {show && (
                                                <>
                                                    <InputContainer>
                                                        <TextBox
                                                            label="BASIC認証ユーザー名（16文字まで・半角英数のみ）"
                                                            labelClassName="text-blue-100"
                                                            inputClassName="bg-blue-25"
                                                            name="appBasicUser"
                                                            maxLength="16"
                                                            placeholder="BASIC認証ユーザー名"
                                                            isRequired
                                                        />
                                                    </InputContainer>
                                                    <InputContainer>
                                                        <PasswordWithEye
                                                            label="BASIC認証パスワード（16文字まで・半角英数のみ）"
                                                            labelClassName="text-blue-100"
                                                            name="appBasicPassword"
                                                            inputClassName="bg-blue-25"
                                                            eye={eye}
                                                            setEye={setEye}
                                                            maxLength="16"
                                                            placeholder="BASIC認証パスワード"
                                                            isRequired
                                                        />
                                                    </InputContainer>
                                                </>
                                            )}
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'APP削除'}
                                            btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                            btn_title3="キャンセル"
                                            continuousAddRemove
                                            handleCancel={handleCancel}
                                            formType={formType}
                                            setContinuousAdd={setContinuousAdd}
                                            setIsOverFlow={setIsOverFlow}
                                            setOpenModal={setOpenModal}
                                            loading={loading}
                                            deleteLoading={deleteLoading}
                                        >
                                            {/* ----error---- */}
                                            <ErrorMessage>
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
                                            btn_title="APP削除"
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
                                    {openDomainConfirmation && (
                                        <DialogModal
                                            title="APP画面アクセスドメインは既に使用されています。"
                                            btn_title="キャンセル"
                                            cancel_title="更新"
                                            handleButtonLeft={() => {
                                                setOpenDomainConfirmation(false);
                                                setIsOverFlow(false);
                                            }}
                                            colorType="bg-blue-100"
                                            handleButtonRight={() => handleConfirmDomain(storeValues, formType)}
                                            setIsOverFlow={setIsOverFlow}
                                            errors={
                                                <span className={`${errors[first]} ? "visible" : "invisible"`}>
                                                    {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                                </span>
                                            }
                                        >
                                            <div className="text-center text-orange-500 mt-[1rem]">
                                                <p>ドメインを強制的に付け替えます</p>
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
export default AppForm;
