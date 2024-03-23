import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFileUpload from '../../hooks/useFileUpload';
import { deleteImagesFromAwsS3 } from '../../lib/deleteImages';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { itemFormSchema } from '../../lib/Schema';
import {
    baseURL,
    createItem,
    createMethod,
    deleteItem,
    deleteMethod,
    updateItem,
    updateMethod,
} from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import Loading from '../Loading/Loader';
import DialogModal from '../Modal/DialogModal';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import FormFooter from './FormFooter';
import TextAreaInput from './FormInputs/TextAreaInput';
import TextBox from './FormInputs/TextBox';

const ItemForm = ({ initialValues, formType, load, setIsOverFlow }) => {
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

    //TODO: Remove if not used
    const [deleteLoading, setDeleteLoading] = useState(false);

    // File upload component
    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    const [uploadedImage, setUploadedImage] = useState([]);
    const [deleteImages, setDeleteImages] = useState([]);

    // if submit type is continuous add, page will be scroll to top
    useEffect(() => {
        //FIXME: An error occurs when the element is not found when the edit screen is displayed
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    // cancel operation
    const handleCancel = () => {
        navigate('/item_list');
    };

    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        // dynamically added image link cause image link not work in formik
        let itemImageURL1 = '';
        let itemImageURL2 = '';
        let itemImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                itemImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                itemImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                itemImageURL3 = uI.location;
            }
        });
        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${createItem}?pid=${sessionStorage.getItem('currentProjectId')}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    itemManageName: values.itemManageName.trim(),
                    itemName: values.itemName.trim(),
                    itemOverview: values.itemOverview,
                    itemDescription: values.itemDescription,
                    itemImageURL1: itemImageURL1,
                    itemImageURL2: itemImageURL2,
                    itemImageURL3: itemImageURL3,
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
                return navigate('/item_list');
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
        // dynamically added image link cause image link not work in formik
        let itemImageURL1 = '';
        let itemImageURL2 = '';
        let itemImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                itemImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                itemImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                itemImageURL3 = uI.location;
            }
        });

        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${updateItem}${values.itemId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    itemManageName: values.itemManageName.trim(),
                    itemName: values.itemName.trim(),
                    itemOverview: values.itemOverview,
                    itemDescription: values.itemDescription,
                    itemImageURL1: itemImageURL1,
                    itemImageURL2: itemImageURL2,
                    itemImageURL3: itemImageURL3,
                    memo: values.memo,
                    updatedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const updated = await instance.request(config);

            if (updated) {
                setSystemError(false);
                setLoading(false);
                await deleteImagesFromAwsS3(deleteImages);
                navigate('/item_list');
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
            const ENDPOINT = `${baseURL}${deleteItem}${values.itemId}?pid=${sessionStorage.getItem(
                'currentProjectId'
            )}`;
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
                setDeleteError(false);
                setLoading(false);
                navigate('/item_list');
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
                        validationSchema={itemFormSchema(formType)}
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
                                                    name="itemImageURL"
                                                    label="アイテム画像（3枚まで）"
                                                    deleteImageConfrim={true}
                                                    setDeleteImages={setDeleteImages}
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="アイテム名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="itemName"
                                                    maxLength="32"
                                                    placeholder="アイテム名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="アイテム管理名（同名アイテムを識別するために管理画面内でカッコ付で使用されます　例：胃癌検診(バス用) 32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="itemManageName"
                                                    maxLength="32"
                                                    placeholder="アイテム管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="アイテム説明（改行不可128文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="itemOverview"
                                                    maxLength="128"
                                                    placeholder="アイテム説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="アイテム説明（改行可512文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="!h-[82px] bg-blue-25"
                                                    name="itemDescription"
                                                    maxLength="512"
                                                    placeholder="アイテム説明"
                                                />
                                            </InputContainer>
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'アイテム削除'}
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
                                            btn_title="アイテム削除"
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
export default ItemForm;
