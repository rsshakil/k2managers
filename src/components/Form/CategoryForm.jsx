import React, { useEffect, useRef, useState } from 'react';
import Page1440Body from '../Page1440/Page1440Body';
import { Form, Formik } from 'formik';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import TextAreaInput from './FormInputs/TextAreaInput';
import TextBox from './FormInputs/TextBox';
import ToggleLock from './FormInputs/ToggleLock';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FormFooter from './FormFooter';
import { useNavigate } from 'react-router-dom';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import useFileUpload from '../../hooks/useFileUpload';
import { useSelector } from 'react-redux';
import {
    baseURL,
    createMethod,
    updateMethod,
    deleteMethod,
    createCategory,
    updateCategory,
    deleteCategory,
} from '../../restapi/queries';
import Loading from '../Loading/Loader';
import { categoryFormSchema } from '../../lib/Schema';
import { errorMessages } from '../../lib/errorMessages';
import DialogModal from '../Modal/DialogModal';
import { instance } from '../../services/axios.js';
import { deleteImagesFromAwsS3 } from '../../lib/deleteImages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';

// Category Screen Main Form
//FIXME: What is error2 used for?
const CategoryForm = ({ initialValues, formType, load, setIsOverFlow }) => {
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    // used for state management
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [top, setTop] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteImages, setDeleteImages] = useState([]);

    const [deleteLoading, setDeleteLoading] = useState(false);

    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    const [uploadedImage, setUploadedImage] = useState([]);

    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    // cancel operation
    const handleCancel = () => {
        navigate('/category_list');
    };
    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;

        let categoryImageURL1 = '';
        let categoryImageURL2 = '';
        let categoryImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                categoryImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                categoryImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                categoryImageURL3 = uI.location;
            }
        });

        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${createCategory}?pid=${sessionStorage.getItem('currentProjectId')}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    categoryName: values.categoryName.trim(),
                    categoryManageName: values.categoryManageName,
                    categoryOverview: values.categoryOverview,
                    categoryDescription: values.categoryDescription,
                    categoryDescription2: values.categoryDescription2,
                    categoryStatus: values.categoryStatus ? 1 : 0,
                    categoryImageURL1: categoryImageURL1,
                    categoryImageURL2: categoryImageURL2,
                    categoryImageURL3: categoryImageURL3,
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
                setLoading(false);
            }
            // if submit type is not continuous
            if (!continuousAdd) {
                return navigate('/category_list');
            }
            // if submit type is continuous
            else {
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
        
        let categoryImageURL1 = '';
        let categoryImageURL2 = '';
        let categoryImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                categoryImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                categoryImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                categoryImageURL3 = uI.location;
            }
        });

        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${updateCategory}${values.categoryId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    categoryName: values.categoryName.trim(),
                    categoryManageName: values.categoryManageName,
                    categoryOverview: values.categoryOverview,
                    categoryDescription: values.categoryDescription,
                    categoryDescription2: values.categoryDescription2,
                    categoryStatus: values.categoryStatus ? 1 : 0,
                    categoryImageURL1: categoryImageURL1,
                    categoryImageURL2: categoryImageURL2,
                    categoryImageURL3: categoryImageURL3,
                    memo: values.memo,
                    updatedBy: info.accountId,
                },
            };
            const updated = await instance.request(config);

            if (updated) {
                setSystemError(false);
                setLoading(false);
                await deleteImagesFromAwsS3(deleteImages);
                navigate('/category_list');
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
            const ENDPOINT = `${baseURL}${deleteCategory}${values.categoryId}?pid=${sessionStorage.getItem(
                'currentProjectId'
            )}`;
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleted = await instance.request(config);

            if (deleted) {
                setDeleteError(false);
                setLoading(false);
                navigate('/category_list');
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
                        validationSchema={categoryFormSchema(formType)}
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
                                                    error={error}
                                                    setError={setError}
                                                    name="categoryImageURL"
                                                    label="予約カテゴリー画像（3枚まで）"
                                                    initialValues={initialValues}
                                                    deleteImageConfrim={true}
                                                    setDeleteImages={setDeleteImages}
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="予約カテゴリー名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="categoryName"
                                                    maxLength="32"
                                                    placeholder="予約カテゴリー名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="予約カテゴリー管理名（カテゴリーを識別するために管理画面内でカッコ付で使用されます　例：〇〇検診(東京用) 32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 placeholder-gray-300"
                                                    type="text"
                                                    name="categoryManageName"
                                                    maxLength="32"
                                                    placeholder="予約カテゴリー管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="予約カテゴリー説明1（改行不可1024文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 !h-[82px]"
                                                    name="categoryOverview"
                                                    maxLength="1024"
                                                    placeholder="予約カテゴリー説明1"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="予約カテゴリー説明2（改行可1024文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 !h-[82px]"
                                                    name="categoryDescription"
                                                    maxLength="1024"
                                                    placeholder="予約カテゴリー説明2"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="予約カテゴリー説明3（改行可1024文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 !h-[82px]"
                                                    name="categoryDescription2"
                                                    maxLength="1024"
                                                    placeholder="予約カテゴリー説明3"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <ToggleLock
                                                    label="カテゴリーメンテナンス（表示条件に一致しても選択ページに表示されません）"
                                                    labelClassName="text-blue-100"
                                                    name="categoryStatus"
                                                    inputClassName=""
                                                    type="checkbox"
                                                    textLeft="ロック解除"
                                                    textRight="メンテナンス中"
                                                />
                                            </InputContainer>
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : '予約カテゴリー削除'}
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
                                            btn_title="予約カテゴリー削除"
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
export default CategoryForm;
