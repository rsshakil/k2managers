import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Formik, Form } from 'formik';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import TextBox from './FormInputs/TextBox';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import useFileUpload from '../../hooks/useFileUpload';
import {
    baseURL,
    createMethod,
    updateMethod,
    deleteMethod,
    createCounselor,
    updateCounselor,
    deleteCounselor,
} from '../../restapi/queries';
import Loading from '../Loading/Loader';
import { counselorFormSchema } from '../../lib/Schema';
import { errorMessages } from '../../lib/errorMessages';
import TextAreaInput from './FormInputs/TextAreaInput';
import FormFooter from './FormFooter';
import DialogModal from '../Modal/DialogModal';
import { instance } from '../../services/axios.js';
import { deleteImagesFromAwsS3 } from '../../lib/deleteImages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';

// Counselor Screen Main Form
const CounselorForm = ({ initialValues, formType, load, setIsOverFlow }) => {
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    const [deleteLoading, setDeleteLoading] = useState(false);

    // used for state management
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [top, setTop] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const [deleteImages, setDeleteImages] = useState([]);

    // File upload component
    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    const [uploadedImage, setUploadedImage] = useState([]);

    // if submit type is continuous add, page will be scroll to top
    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    // cancel operation
    const handleCancel = () => {
        navigate('/counselor_list');
    };
    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        let counselorImageURL1 = '';
        let counselorImageURL2 = '';
        let counselorImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                counselorImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                counselorImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                counselorImageURL3 = uI.location;
            }
        });

        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${createCounselor}?pid=${sessionStorage.getItem('currentProjectId')}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    counselorManageName: values.counselorManageName.trim(),
                    counselorName: values.counselorName.trim(),
                    counselorOverview: values.counselorOverview,
                    counselorDescription: values.counselorDescription,
                    counselorImageURL1: counselorImageURL1,
                    counselorImageURL2: counselorImageURL2,
                    counselorImageURL3: counselorImageURL3,
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
            };
            const created = await instance.request(config);

            if (created) {
                setSystemError(false);
                setLoading(false);
            }
            if (!continuousAdd) {
                return navigate('/counselor_list');
            } else {
                resetForm({ [values]: '' });
                setFiles({});
                setImages({});
                setUploadedImage([]);
                setTop((prev) => !prev);
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        } finally {
            processing.current = false;
        }

    };

    // update operation
    const handleUpdate = async (values) => {
        if (processing.current) return;
        processing.current = true;
        let counselorImageURL1 = '';
        let counselorImageURL2 = '';
        let counselorImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                counselorImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                counselorImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                counselorImageURL3 = uI.location;
            }
        });

        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${updateCounselor}${values.counselorId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    counselorManageName: values.counselorManageName.trim(),
                    counselorName: values.counselorName.trim(),
                    counselorOverview: values.counselorOverview,
                    counselorDescription: values.counselorDescription,
                    counselorStatus: values.counselorStatus ? 1 : 0,
                    counselorImageURL1: counselorImageURL1,
                    counselorImageURL2: counselorImageURL2,
                    counselorImageURL3: counselorImageURL3,
                    memo: values.memo,
                    updatedBy: info.accountId,
                },
            };
            const updated = await instance.request(config);

            if (updated) {
                setSystemError(false);
                setLoading(false);
                await deleteImagesFromAwsS3(deleteImages);
                navigate('/counselor_list');
            }
        } catch (error) {
            if (error.response.status === 400) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
                setDeleteLoading(false);
            } else {
                setSystemError(true);
                setDeleteLoading(false);
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
            const ENDPOINT = `${baseURL}${deleteCounselor}${values.counselorId}?pid=${sessionStorage.getItem(
                'currentProjectId'
            )}`;
            const config = {
                method: deleteMethod,
                url: ENDPOINT,
                data: { deletedBy: info.accountId },
            };
            const deleted = await instance.request(config);

            if (deleted) {
                setDeleteError(false);
                setLoading(false);
                navigate('/counselor_list');
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
            {loading && <Loading />}

            {load ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        validationSchema={counselorFormSchema(formType)}
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
                                                    name="counselorImageURL"
                                                    label="カウンセラー画像（3枚まで）"
                                                    deleteImageConfrim={true}
                                                    setDeleteImages={setDeleteImages}
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="カウンセラー名（16文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 placeholder-gray-300"
                                                    type="text"
                                                    name="counselorName"
                                                    maxLength="16"
                                                    placeholder="カウンセラー名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="カウンセラー管理名（同名カウンセラーを識別するために管理画面内でカッコ付で使用されます　例：〇〇カウンセラー(検診太郎) 32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 placeholder-gray-300"
                                                    type="text"
                                                    name="counselorManageName"
                                                    maxLength="32"
                                                    placeholder="カウンセラー管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="カウンセラー説明（改行不可128文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 placeholder-gray-300"
                                                    type="text"
                                                    name="counselorOverview"
                                                    maxLength="128"
                                                    placeholder="カウンセラー説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="カウンセラー説明（改行可512文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="!h-[60px] bg-blue-25 placeholder-gray-300"
                                                    name="counselorDescription"
                                                    maxLength="512"
                                                    placeholder="カウンセラー説明"
                                                />
                                            </InputContainer>
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'カウンセラー削除'}
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
                                            btn_title="カウンセラー削除"
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
export default CounselorForm;
