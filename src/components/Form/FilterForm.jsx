import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { filterFormSchema } from '../../lib/Schema';
import {
    baseURL,
    createFilter,
    createMethod,
    deleteFilter,
    deleteMethod,
    updateFilter,
    updateMethod
} from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import DxFilterBuilder from '../DxFilterBuilder/DxFilterBuilder';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loading from '../Loading/Loader';
import DialogModal from '../Modal/DialogModal';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import FormFooter from './FormFooter';
import Label from './FormInputs/Label';
import TextBox from './FormInputs/TextBox';
import debounce from 'lodash/debounce';

const FilterForm = ({ initialValues, formType, load, setIsOverFlow }) => {
    const navigate = useNavigate();

    const { info } = useSelector((state) => state.auth);
    const pathname = window.location.pathname;
    const routeName2 = pathname.split('/').pop();

    const [top, setTop] = useState(false);
    const [loading, setLoading] = useState(false);
    const [tempValues, setTempValues] = useState('');
    const [copyModal, setCopyModal] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [systemErrorCopy, setSystemErrorCopy] = useState(false);
    const [selectConditionType, setConditionType] = useState(true);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');

    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    useEffect(() => {
        if (initialValues?.filterQuery) {
            // const filterQueryInSessionStorage = JSON.parse(sessionStorage.getItem(`${routeName2}_timestamp_filterBuilder`));
            const filterQueryInSessionStorage = JSON.parse(sessionStorage.getItem(`filterBuilder`));
            filterQueryInSessionStorage.values = initialValues?.filterQuery;
            // sessionStorage.setItem(`${routeName2}_timestamp_filterBuilder`, JSON.stringify(filterQueryInSessionStorage));
            sessionStorage.setItem(`filterBuilder`, JSON.stringify(filterQueryInSessionStorage));
        }
    }, [sessionStorage]);

    // cancel operation
    const handleCancel = () => navigate('/filter_list');

    // copy operation
    const handleCopy = () => {
        setCopyModal(true);
        setIsOverFlow(true);
    };
    const processing = useRef(false);
    // Handle Copy Project
    const handleCopyProject = async () => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemErrorCopy(false);
        try {
            const ENDPOINT = `${baseURL}${createFilter}${initialValues.filterId}?pid=${sessionStorage.getItem(
                'currentProjectId'
            )}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    createdBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const copied = await instance.request(config);

            // if copy is successful
            if (copied) {
                setSystemErrorCopy(false);
                setLoading(false);
            }
            return navigate('/filter_list');
        } catch (error) {
            if (error.response.status === 409) {
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

    // create operation
    const handleAdd = debounce(async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        let filterQueryValues = [];
        // const filterQueryInSessionStorage = JSON.parse(sessionStorage.getItem(`${routeName2}_timestamp_filterBuilder`));
        const filterQueryInSessionStorage = JSON.parse(sessionStorage.getItem(`filterBuilder`));
        try {
            if (filterQueryInSessionStorage) {
                if (filterQueryInSessionStorage.values) {
                    filterQueryValues = [...filterQueryInSessionStorage?.values];
                }
            }
            const ENDPOINT = `${baseURL}${createFilter}?pid=${sessionStorage.getItem('currentProjectId')}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    filterName: values.filterName.trim(),
                    filterManageName: values.filterManageName,
                    filterOverview: values.filterOverview,
                    filterQuery: filterQueryValues,
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
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
                return navigate('/filter_list');
            }
            // if submit type is continuous
            else {
                resetForm({ [values]: '' });
                setTop((prev) => !prev);
            }
        } catch (error) {
            if (error.response?.status === 400) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
                setDeleteLoading(false);
            } else {
                setDeleteLoading(false);
                setSystemError(true);
            }
            setLoading(false);
        } finally {
            processing.current = false;
        }
    }, 500);

    // update operation
    const handleUpdate = debounce(async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        let filterQueryValues = [];
        // const filterQueryInSessionStorage = JSON.parse(sessionStorage.getItem(`${routeName2}_timestamp_filterBuilder`));
        const filterQueryInSessionStorage = JSON.parse(sessionStorage.getItem(`filterBuilder`));
        try {
            if (filterQueryInSessionStorage) {
                filterQueryValues = [...filterQueryInSessionStorage?.values];
            }
            const ENDPOINT = `${baseURL}${updateFilter}${values.filterId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    filterName: values.filterName.trim(),
                    filterManageName: values.filterManageName,
                    filterOverview: values.filterOverview,
                    filterQuery: filterQueryValues,
                    memo: values.memo,
                    updatedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const updated = await instance.request(config);

            // if update is successful
            if (updated) {
                setSystemError(false);
                setLoading(false);
                navigate('/filter_list');
            }
        } catch (error) {
            if (error.response?.status === 400) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
                setDeleteLoading(false);
            } else {
                setDeleteLoading(false);
                setSystemError(true);
            }
            setLoading(false);
        } finally {
            processing.current = false;
        }
    }, 500);

    // delete operation
    const handleDelete = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        const ENDPOINT = `${baseURL}${deleteFilter}${values.filterId}?pid=${sessionStorage.getItem(
            'currentProjectId'
        )}`;
        try {
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
            if (deleted) {
                setDeleteError(false);
                setLoading(false);
                navigate('/filter_list');
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

    function onKeyDown(keyEvent) {
        const { charCode, keyCode, target } = keyEvent;
        const enterKeyCode = 13;
        const isEnterKeyPressed =
            charCode === enterKeyCode || keyCode === enterKeyCode;
        const isMemoInput = target.name === "memo";
        const isDxInput = target.classList.contains("dx-texteditor-input");

        if (isEnterKeyPressed && !isMemoInput && isDxInput) {
            keyEvent.preventDefault();
        }
    }

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
                        validationSchema={filterFormSchema(formType)}
                        onSubmit={(values, { resetForm, setSubmitting }) => {
                            if (formType === 'add') {
                                handleAdd(values, resetForm);
                            } else {
                                handleUpdate(values, { setSubmitting });
                                // setTempValues(values)
                            }
                        }}
                    >
                        {({ errors }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <div className="relative w-full h-full">
                                    <Form onKeyDown={onKeyDown}>
                                        <div className="-mt-4" id="scroller"></div>
                                        <FormBodyContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="フィルター名（64文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="filterName"
                                                    maxLength="64"
                                                    placeholder="フィルター名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="フィルター管理名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="filterManageName"
                                                    maxLength="32"
                                                    placeholder="フィルター管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="フィルター説明（改行不可128文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="filterOverview"
                                                    maxLength="128"
                                                    placeholder="フィルター説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <Label
                                                    label="フィルター設定（同一フィールドを複数回条件照合できます）"
                                                    labelClassName="text-blue-100"
                                                    name="filterQueryLabel"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <Label
                                                    label="※固定チェックは値が入っている場合のみチェックします"
                                                    labelClassName="text-blue-100"
                                                    name="filterQueryLabel2"
                                                />
                                            </InputContainer>
                                            {/* DX FILTER BUILDER START */}
                                            {selectConditionType && (
                                                <InputContainer>
                                                    <DxFilterBuilder
                                                        info={{
                                                            // page: `${routeName2}_timestamp_filterBuilder`,
                                                            page: `filterBuilder`,
                                                            maxGroupLevel: 4,
                                                            fieldQuery: initialValues?.filterQuery,
                                                        }}
                                                    />
                                                </InputContainer>
                                            )}
                                            {/* DX FILTER BUILDER END */}
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'フィルター削除'}
                                            btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                            btn_title3="キャンセル"
                                            btn_title4="複製"
                                            continuousAddRemove
                                            buttonComponents={true}
                                            handleCancel={handleCancel}
                                            formType={formType}
                                            setContinuousAdd={setContinuousAdd}
                                            setIsOverFlow={setIsOverFlow}
                                            setOpenModal={setOpenModal}
                                            loading={loading}
                                            deleteLoading={deleteLoading}
                                            handleCopy={handleCopy}
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
                                            btn_title="フィルター削除"
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
                                                <div className="text-orange-500 mt-[1rem]">
                                                    ※APPデザイナー画面で利用している場合、予約画面が正常に動作できなくなります。
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
                                            handleButtonRight={handleCopyProject}
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
export default FilterForm;
