import React, { useEffect, useRef, useState } from 'react';
import Page1440Body from '../Page1440/Page1440Body';
import { Form, Formik } from 'formik';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FormFooter from './FormFooter';
import { useNavigate } from 'react-router-dom';
import TextBox from './FormInputs/TextBox';
import { useSelector } from 'react-redux';
import {
    baseURL,
    createDomain,
    updateDomain,
    deleteDomain,
    createMethod,
    updateMethod,
    deleteMethod,
} from '../../restapi/queries';
import { errorMessages } from '../../lib/errorMessages';
import Loading from '../Loading/Loader';
import { domainFormSchema } from '../../lib/Schema';
import DialogModal from '../Modal/DialogModal';
import { instance } from '../../services/axios.js';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';

// Domain Screen Main Form
const DomainForm = ({ initialValues, formType, setIsOverFlow, error, load = false }) => {
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    // used for state management
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [top, setTop] = useState(false);
    const [domainError, setDomainError] = useState(false);
    const [hostZoneError, setHostZoneError] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const [systemError, setSystemError] = useState(false);

    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '20px', behavior: 'smooth' });
    }, [top]);

    // cancel operation
    const handleCancel = () => {
        navigate('/domain_list');
    };

    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        setDomainError(false);
        setHostZoneError(false);
        try {
            const ENDPOINT = `${baseURL}${createDomain}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    domainName: values.domainName.trim(),
                    domainURL: values.domainURL.trim(),
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const newDomain = await instance.request(config);
            // if domain create is successful
            if (newDomain) {
                setLoading(false);
                navigate('/domain_list');
            }
            resetForm({ [values]: '' });
            setTop((prev) => !prev);
        } catch (error) {
            // duplicate error
            if (error.response.status === 409) {
                setDomainError(true);
            }
            // hosted zone not found
            else if (error.response.status === 400) {
                setHostZoneError(true);
            }
            // system error
            else {
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
        setSystemError(false);
        setDomainError(false);
        setHostZoneError(false);
        try {
            const ENDPOINT = `${baseURL}${updateDomain}${values.domainId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    domainName: values.domainName.trim(),
                    domainURL: values.domainURL.trim(),
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const updated = await instance.request(config);

            if (updated) {
                setLoading(false);
                navigate('/domain_list');
            }
        } catch (error) {
            // duplicate error
            if (error.response.status === 400 && error.response.data?.errno) {
                setDomainError(true);
            }
            // already deleted
            else if (error.response.status === 400 && error.response.data?.errorCode) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
            }
            // hosted zone not found
            else if (error.response.status === 400) {
                setHostZoneError(true);
            }
            // system error
            else {
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
        setDeleteError(false);
        try {
            const ENDPOINT = `${baseURL}${deleteDomain}${values.domainId}`;
            const config = {
                method: deleteMethod,
                url: ENDPOINT,
                data: {
                    deletedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const deleted = await instance.request(config);

            // if delete is successful
            if (deleted) {
                setLoading(false);
                navigate('/domain_list');
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
            {/* A loader to display on the surface of the screen */}
            {loading && <Loading />}
            {load ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        validationSchema={domainFormSchema(formType)}
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
                                                    label="ドメイン名（64文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="domainName"
                                                    maxLength="64"
                                                    placeholder="ドメイン名"
                                                    isRequired={true}
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="ドメインURL（128文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="domainURL"
                                                    maxLength="128"
                                                    placeholder="ドメインURL"
                                                    isRequired={true}
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="設定中APP"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    name="appName"
                                                    readOnly={true}
                                                    tabIndex="-1"
                                                />
                                            </InputContainer>
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'ドメイン削除'}
                                            btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                            btn_title3="キャンセル"
                                            continuousAddRemove
                                            handleCancel={handleCancel}
                                            formType={formType}
                                            setContinuousAdd={setContinuousAdd}
                                            setIsOverFlow={setIsOverFlow}
                                            setOpenModal={setOpenModal}
                                            loading={loading}
                                            deleteLoading={false}
                                        >
                                            {/* ----error---- */}
                                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                {errors[first]}
                                                {domainError &&
                                                    !errors[first] &&
                                                    `${errorMessages.W_EXISTS_01('ドメインURL')}`}
                                                {hostZoneError && !errors[first] && `${errorMessages.E_DOMAIN_01}`}
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
                                            btn_title="ドメイン削除"
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
export default DomainForm;
