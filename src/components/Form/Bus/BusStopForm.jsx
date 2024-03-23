import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import { errorMessages } from '../../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../../lib/getErrorMessageWithErrorCode';
import { busStopFromSchema } from '../../../lib/Schema';
import {
    baseURL,
    createBusStop,
    createMethod,
    deleteBusStop,
    deleteMethod,
    updateBusStop,
    updateMethod
} from '../../../restapi/queries';
import { instance } from '../../../services/axios';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import Loading from '../../Loading/Loader';
import DialogModal from '../../Modal/DialogModal';
import Page1440Body from '../../Page1440/Page1440Body';
import FormBodyContainer from '../../Wrapper/FormBodyContainer';
import InputContainer from '../../Wrapper/InputContainer';
import FormFooter from '../FormFooter';
import TextBox from '../FormInputs/TextBox';

const BusStopForm = ({ initialValues, formType, load, setIsOverFlow }) => {
    // route name
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();

    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    // used for state management
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [top, setTop] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);

    // if submit type is continuous add, page will be scroll to top
    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    // cancel operation
    const handleCancel = () => {
        navigate('/bus_stop_list');
    };

    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);

        try {
            const ENDPOINT = `${baseURL}${createBusStop}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    busStopName: values.busStopName,
                    busStopManageName: values.busStopManageName,
                    busStopAddress: values.busStopAddress,
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
            };
            const created = await instance.request(config);

            // if create is successful
            if (created) {
                setSystemError(false);
                setLoading(false);
            }
            // if submit type is not continuous
            if (!continuousAdd) {
                return navigate('/bus_stop_list');
            }
            // if submit type is continuous
            else {
                resetForm({ [values]: '' });
                resetForm({ [values.busRouteAddress]: '' });
                setTop((prev) => !prev);
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    const handleUpdate = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${updateBusStop}${values.busStopId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    busStopName: values.busStopName,
                    busStopManageName: values.busStopManageName,
                    busStopAddress: values.busStopAddress,
                    memo: values.memo,
                    updatedBy: info.accountId,
                },
            };
            const updated = await instance.request(config);

            if (updated) {
                setSystemError(false);
                setLoading(false);
                navigate('/bus_stop_list');
            }
        } catch (error) {
            if (error.response.status === 400) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
            } else {
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
            const ENDPOINT = `${baseURL}${deleteBusStop}${values.busStopId}?pid=${values.projectId}`; //?pid=${projectId}}
            const config = {
                method: deleteMethod,
                url: ENDPOINT,
                data: { deletedBy: info.accountId },
            };
            const deleted = await instance.request(config);
            // if delete is successful
            if (deleted) {
                setDeleteError(false);
                setLoading(false);
                navigate('/bus_stop_list');
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

    return (
        <>
            {(load || loading) ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        validationSchema={busStopFromSchema}
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
                                                    label="バス停名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="busStopName"
                                                    maxLength="32"
                                                    placeholder="バス停名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="バス停管理名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="busStopManageName"
                                                    maxLength="32"
                                                    placeholder="バス停管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="バス停住所(128文字まで)"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="busStopAddress"
                                                    maxLength="128"
                                                    placeholder="バス停住所"
                                                />
                                            </InputContainer>
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'バス停削除'}
                                            btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                            btn_title3="キャンセル"
                                            continuousAddRemove
                                            handleCancel={handleCancel}
                                            formType={formType}
                                            setIsOverFlow={setIsOverFlow}
                                            setOpenModal={setOpenModal}
                                            setContinuousAdd={setContinuousAdd}
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
                                            btn_title="バス停削除"
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
export default BusStopForm;
