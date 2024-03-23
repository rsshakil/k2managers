import { Form, Formik } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useFileUpload from '../../hooks/useFileUpload';
import { deleteImagesFromAwsS3 } from '../../lib/deleteImages';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { instituteFormSchema } from '../../lib/Schema';
import {
    baseURL,
    createInstitute,
    createMethod,
    deleteInstitute,
    deleteMethod,
    updateInstitute,
    updateMethod,
} from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import FileUploadInput from '../FileUploadInput/FileUploadInput';
import Loading from '../Loading/Loader';
import MapView from '../MapView/MapView';
import DialogModal from '../Modal/DialogModal';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import FormFooter from './FormFooter';
import TextAreaInput from './FormInputs/TextAreaInput';
import TextBox from './FormInputs/TextBox';

const InstituteForm = ({ initialValues, formType, load, error2, setIsOverFlow }) => {
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
    const [deleteImages, setDeleteImages] = useState([]);

    const [deleteLoading, setDeleteLoading] = useState(false);

    // File upload component
    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    const [uploadedImage, setUploadedImage] = useState([]);

    // if submit type is continuous add, page will be scroll to top
    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    // cancel operation
    const handleCancel = () => {
        navigate('/institute_list');
    };

    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;

        setLoading(true);
        setSystemError(false);

        // dynamically added image link cause image link not work in formik
        let instituteImageURL1 = '';
        let instituteImageURL2 = '';
        let instituteImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                instituteImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                instituteImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                instituteImageURL3 = uI.location;
            }
        });

        try {
            const ENDPOINT = `${baseURL}${createInstitute}?pid=${sessionStorage.getItem('currentProjectId')}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    instituteName: values.instituteName.trim(),
                    instituteManageName: values.instituteManageName,
                    instituteOverview: values.instituteOverview,
                    instituteDescription: values.instituteDescription,
                    instituteZipCode: values.instituteZipCode,
                    institutePrefecture: values.institutePrefecture,
                    instituteCityName: values.instituteCityName,
                    instituteTownName: values.instituteTownName,
                    instituteAddressName: values.instituteAddressName,
                    instituteBuilding: values.instituteBuilding,
                    instituteTelNo: values.instituteTelNo,
                    instituteLatlong: values.instituteLatlong,
                    instituteImageURL1: instituteImageURL1,
                    instituteImageURL2: instituteImageURL2,
                    instituteImageURL3: instituteImageURL3,
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
                return navigate('/institute_list');
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
        setLoading(true);
        setSystemError(false);

        // dynamically added image link cause image link not work in formik
        let instituteImageURL1 = '';
        let instituteImageURL2 = '';
        let instituteImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                instituteImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                instituteImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                instituteImageURL3 = uI.location;
            }
        });
        try {
            const ENDPOINT = `${baseURL}${updateInstitute}${values.instituteId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    instituteName: values.instituteName.trim(),
                    instituteManageName: values.instituteManageName,
                    instituteOverview: values.instituteOverview,
                    instituteDescription: values.instituteDescription,
                    instituteZipCode: values.instituteZipCode,
                    institutePrefecture: values.institutePrefecture,
                    instituteCityName: values.instituteCityName,
                    instituteTownName: values.instituteTownName,
                    instituteAddressName: values.instituteAddressName,
                    instituteBuilding: values.instituteBuilding,
                    instituteTelNo: values.instituteTelNo,
                    instituteLatlong: values.instituteLatlong,
                    instituteImageURL1: instituteImageURL1,
                    instituteImageURL2: instituteImageURL2,
                    instituteImageURL3: instituteImageURL3,
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
                navigate('/institute_list');
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
            const ENDPOINT = `${baseURL}${deleteInstitute}${values.instituteId}?pid=${sessionStorage.getItem(
                'currentProjectId'
            )}`;
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleted = await instance.request(config);

            if (deleted) {
                setDeleteError(false);
                setLoading(false);
                navigate('/institute_list');
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
                        validationSchema={instituteFormSchema(formType)}
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
                                                    name="instituteImageURL"
                                                    label="施設画像（3枚まで）"
                                                    deleteImageConfrim={true}
                                                    setDeleteImages={setDeleteImages}
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="施設コード（自動生成変更不可）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                    type="text"
                                                    name="instituteCode"
                                                    readOnly
                                                    tabIndex="-1"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="施設名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="instituteName"
                                                    maxLength="32"
                                                    placeholder="施設名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="施設管理名（施設を識別するために管理画面内でカッコ付で使用されます　例：〇〇センター(北海道用) 32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 placeholder-gray-300"
                                                    type="text"
                                                    name="instituteManageName"
                                                    maxLength="32"
                                                    placeholder="施設管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="施設説明（改行不可128文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="instituteOverview"
                                                    maxLength="128"
                                                    placeholder="施設説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="施設説明（改行可512文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="instituteDescription"
                                                    maxLength="512"
                                                    placeholder="施設説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="郵便番号（ハイフンあり）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="instituteZipCode"
                                                    placeholder="郵便番号"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="都道府県"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="institutePrefecture"
                                                    placeholder="都道府県"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="市区町村"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="instituteCityName"
                                                    maxLength="32"
                                                    placeholder="市区町村"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="住所1（町名）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="instituteTownName"
                                                    maxLength="32"
                                                    placeholder="住所1"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="住所2（番地）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="instituteAddressName"
                                                    maxLength="32"
                                                    placeholder="住所2"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="住所3（ビル名など）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="instituteBuilding"
                                                    maxLength="32"
                                                    placeholder="住所3"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="電話番号（ハイフンあり）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="instituteTelNo"
                                                    maxLength="32"
                                                    placeholder="電話番号"
                                                />
                                            </InputContainer>
                                            {formType === 'edit' && (
                                                <InputContainer>
                                                    <MapView
                                                        q={
                                                            initialValues.instituteLatlong
                                                                ? initialValues.instituteLatlong
                                                                : initialValues.institutePrefecture +
                                                                initialValues.instituteCityName +
                                                                initialValues.instituteTownName +
                                                                initialValues.instituteAddressName +
                                                                initialValues.instituteBuilding +
                                                                initialValues.instituteName
                                                        }
                                                    />
                                                </InputContainer>
                                            )}
                                            {formType === 'edit' && (
                                                <InputContainer>
                                                    <TextBox
                                                        label="地図修正（住所より優先されます）"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="instituteLatlong"
                                                        placeholder="35.681236,139.767125この形式で(緯度: 35.011636 経度: 135.768029)"
                                                        maxLength="128"
                                                    />
                                                </InputContainer>
                                            )}
                                        </FormBodyContainer>

                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : '施設削除'}
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
                                            btn_title="施設削除"
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
export default InstituteForm;
