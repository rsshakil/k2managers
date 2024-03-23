import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CSV_CHARACTER_CODE } from '../../lib/csv';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { projectFormSchema } from '../../lib/Schema';
import {
    baseURL, createMethod, createProject, deleteMethod, deleteProject, updateMethod, updateProject
} from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import SelectBox from '../Form/FormInputs/SelectBox';
import Loading from '../Loading/Loader';
import DialogModal from '../Modal/DialogModal';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import FormFooter from './FormFooter';
import TextBox from './FormInputs/TextBox';
import ToggleLock from './FormInputs/ToggleLock';

// Domain Screen Main Form
const ProjectForm = ({ initialValues, formType, setIsOverFlow, load = false }) => {
    const processing = useRef(false);
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    // used for state management
    const [loading, setLoading] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [top, setTop] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [projectError, setProjectError] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [stopErrorMessage, setStopErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);

    const [tempValues, setTempValues] = useState('');
    const [modal, setModal] = useState(false);
    const [stopModal, setStopModal] = useState(false);
    const [copyModal, setCopyModal] = useState(false);

    //TODO: Remove if not used
    const [deleteLoading, setDeleteLoading] = useState(false);

    // if submit type is continuous add, page will be scroll to top
    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    const isOpenModal = () => {
        setModal(true);
        setIsOverFlow(true);
        setDeleteError(false);
    };
    const isOpenModal2 = () => {
        setStopModal(true);
        setIsOverFlow(true);
        setDeleteError(false);
    };
    const closeDialogModal = () => {
        setModal(false);
        setIsOverFlow(false);
    };
    const closeDialogModal2 = () => {
        setStopModal(false);
        setIsOverFlow(false);
    };

    // cancel operation
    const handleCancel = () => {
        navigate('/project_list');
    };

    // add operation
    const handleAddProject = async (values, resetForm) => {
        if (processing.current) return
        processing.current = true;
        setLoading(true);
        setProjectError(false);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${createProject}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectName: values.projectName.trim(),
                    projectCode: values.projectCode.trim(),
                    projectStatus: values.projectStatus ? 1 : 0,
                    memo: values.memo,
                    projectCsvCharacterCode: values.projectCsvCharacterCode,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
            };
            const created = await instance.request(config);
 
            if (created) {
                setSystemError(false);
                setProjectError(false);
                setLoading(false);
            } 
            if (!continuousAdd) {
                return navigate('/project_list');
            }
            // if submit type is continuous
            else {
                resetForm({ [values]: '' });
                setTop((prev) => !prev);
            }
        } catch (error) {
            if (error.response.status === 409) {
                setSystemError(false);
                setProjectError(true);
            } else {
                setProjectError(false);
                setSystemError(true);
            }
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    // update operation
    const handleUpdateProject = async (values) => {
        if (processing.current) return
        processing.current = true;
        setLoading(true);
        setDeleteLoading(true);
        setProjectError(false);
        setSystemError(false);
        const ENDPOINT = `${baseURL}${updateProject}${values.projectId}`;
        const config = {
            method: updateMethod,
            url: ENDPOINT,
            data: {
                projectName: values.projectName.trim(),
                projectStatus: values.projectStatus ? 1 : 0,
                projectCsvCharacterCode: values.projectCsvCharacterCode,
                memo: values.memo,
                updatedBy: info.accountId,
            },
        };
        try {
            //FIXME: Synchronization not working
            const updated = await instance.request(config);
            if (updated) {
                setSystemError(false);
                setProjectError(false);
                setDeleteLoading(false);
                setLoading(false);
                navigate('/project_list', {
                    state: { projectName: config?.data?.projectName, projectStatus: config?.data?.projectStatus },
                });
            }
        } catch (error) {
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            if (error.response.status === 400) {
                if (!values.projectStatus) {
                    setDeleteError(true);
                    setStopErrorMessage(matchErrorMessage);
                    setSystemError(false);
                    setProjectError(false);
                    setDeleteLoading(false);
                } else {
                    setAlreadyDeletedErrorMessage(matchErrorMessage);
                    setDeleteLoading(false);
                }
            } else {
                if (!values.projectStatus) {
                    // For error showing stop modal
                    setDeleteError(true);
                    setStopErrorMessage(matchErrorMessage);
                    setSystemError(false);
                    setProjectError(false);
                    setDeleteLoading(false);
                } else {
                    // For error showing edit screen
                    setSystemError(true);
                    setProjectError(false);
                    setDeleteLoading(false);
                }
            }
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    // delete operation
    const handleDeleteProject = async () => {
        if (processing.current) return
        processing.current = true;
        setLoading(true);
        setDeleteLoading(true);
        setSystemError(false);
        setProjectError(false);
        const ENDPOINT = `${baseURL}${deleteProject}${initialValues.projectId}`;
        const config = {
            method: deleteMethod,
            url: ENDPOINT,
            data: {
                deletedBy: info.accountId,
            },
        };
        try {
            //FIXME: Synchronization not working
            const deleted = await instance.request(config);
            if (deleted) { 
                setDeleteError(false);
                setDeleteLoading(false);
                setLoading(false);
                navigate('/project_list');
            }
        } catch (error) {
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            setDeleteErrorMessage(matchErrorMessage);
            setDeleteError(true);
            setDeleteLoading(false);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    // copy operation
    const handleCopy = () => {
        setCopyModal(true);
        setIsOverFlow(true);
    };
    const handleCopyProject = async () => {
        if (processing.current) return
        processing.current = true;
        setLoading(true);
        setProjectError(false);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${createProject}${initialValues.projectId}`;
            const config = { method: createMethod, url: ENDPOINT, data: { createdBy: info.accountId } };
            const copied = await instance.request(config);

            // if copy is successful
            if (copied) { 
                setSystemError(false);
                setProjectError(false);
                setLoading(false);
            }
            return navigate('/project_list');
        } catch (error) {
            if (error.response.status === 409) {
                setSystemError(false);
                setProjectError(true);
            } else {
                setProjectError(false);
                setSystemError(true);
            }
            setLoading(false);
        } finally {
            processing.current = false;
        }
        setLoading(false);
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
                        validationSchema={projectFormSchema(formType)}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            if (formType === 'add') {
                                handleAddProject(values, resetForm);
                            } else {
                                if (values.projectStatus === false && initialValues.projectStatus === true) {
                                    setTempValues(values);
                                    isOpenModal2(values);
                                } else {
                                    handleUpdateProject(values, { setSubmitting });
                                }
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
                                                    label="プロジェクト名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="projectName"
                                                    // maxLength="32"
                                                    placeholder="プロジェクト名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="プロジェクトコード（16文字まで変更不可）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName={
                                                        formType === 'add'
                                                            ? 'bg-blue-25'
                                                            : 'bg-gray-300 cursor-default pointer-events-none'
                                                    }
                                                    name="projectCode"
                                                    maxLength="16"
                                                    type="text"
                                                    readOnly={formType === 'edit' && true}
                                                    tabIndex={formType === 'edit' ? '-1' : '0'}
                                                    placeholder="プロジェクトコード"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <ToggleLock
                                                    label="プロジェクト状態（停止にすると各選択に表示されません）"
                                                    labelClassName="text-blue-100"
                                                    name="projectStatus"
                                                    inputClassName=""
                                                    type="checkbox"
                                                    textLeft="運用中"
                                                    textRight="停止中"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label="CSV入出力文字コード"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="projectCsvCharacterCode"
                                                >
                                                    {CSV_CHARACTER_CODE.length > 0 &&
                                                        CSV_CHARACTER_CODE.map((option, index) => (
                                                            <option value={option.id} key={option.id}>
                                                                {option.value}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="作成日時"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    name="createdAt"
                                                    readOnly={true}
                                                    tabIndex="-1"
                                                />
                                            </InputContainer>
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'プロジェクト削除'}
                                            btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                            btn_title3="キャンセル"
                                            continuousAddRemove
                                            handleCancel={handleCancel}
                                            formType={formType}
                                            setContinuousAdd={setContinuousAdd}
                                            setIsOverFlow={setIsOverFlow}
                                            setOpenModal={isOpenModal}
                                            loading={loading}
                                            deleteLoading={deleteLoading}
                                        >
                                            {/* ----error---- */}
                                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                {projectError && !errors[first]
                                                    ? `${errorMessages.W_EXISTS_01('プロジェクトコード')}`
                                                    : errors[first]}
                                                {alreadyDeletedErrorMessage &&
                                                    !errors[first] &&
                                                    `${alreadyDeletedErrorMessage}`}
                                                {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                            </ErrorMessage>
                                        </FormFooter>
                                    </Form>

                                    {/* modal section starts*/}
                                    {modal && (
                                        <DialogModal
                                            title="削除"
                                            btn_title="プロジェクト削除"
                                            cancel_title="キャンセル "
                                            handleButtonLeft={handleDeleteProject}
                                            handleButtonRight={closeDialogModal}
                                            setIsOverFlow={setIsOverFlow}
                                            errors={
                                                <span className={`${deleteErrorMessage} ? "visible" : "invisible"`}>
                                                    {/* {projectError && !errors[first] ? `${errorMessages.W_EXISTS_01('プロジェクトコード')}` : errors[first]} */}
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
                                                    このプロジェクトで作成されたコンテンツも全て削除されます。
                                                </div>
                                            </div>
                                        </DialogModal>
                                    )}
                                    {stopModal && (
                                        <DialogModal
                                            title="停止"
                                            btn_title="プロジェクト停止"
                                            cancel_title="キャンセル"
                                            values={tempValues}
                                            handleButtonLeft={handleUpdateProject}
                                            handleButtonRight={closeDialogModal2}
                                            setIsOverFlow={setIsOverFlow}
                                            errors={
                                                <span className={`${stopErrorMessage} ? "visible" : "invisible"`}>
                                                    {/* {projectError && !errors[first] ? `${errorMessages.W_EXISTS_01('プロジェクトコード')}` : errors[first]} */}
                                                    {deleteError && stopErrorMessage && `${stopErrorMessage}`}
                                                </span>
                                            }
                                        >
                                            <div className="text-center mt-[1rem]">
                                                <p>プロジェクトを停止します。</p>
                                                <div className="text-orange-500 mt-[1rem]">
                                                    停止するプロジェクトに紐付いているコンテンツも全て停止されます。
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
export default ProjectForm;
