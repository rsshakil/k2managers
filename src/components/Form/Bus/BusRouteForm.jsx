import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';
import useFileUpload from '../../../hooks/useFileUpload';
import { errorMessages } from '../../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../../lib/getErrorMessageWithErrorCode';
import { busRouteFormSchema } from '../../../lib/Schema';
import {
    baseURL, createBusRoute, createMethod, deleteBusRoute, deleteMethod, updateBusRoute, updateMethod
} from '../../../restapi/queries';
import { instance } from '../../../services/axios.js';
import ErrorMessage from '../../ErrorMessage/ErrorMessage';
import FileUploadInput from '../../FileUploadInput/FileUploadInput';
import DragApp from '../../ListElementDrag/DragApp';
import Loading from '../../Loading/Loader';
import DialogModal from '../../Modal/DialogModal';
import Page1440Body from '../../Page1440/Page1440Body';
import FormBodyContainer from '../../Wrapper/FormBodyContainer';
import InputContainer from '../../Wrapper/InputContainer';
import FormFooter from './../FormFooter';
import TextAreaInput from './../FormInputs/TextAreaInput';
import TextBox from './../FormInputs/TextBox';

const selectableNamesF = [
    { id: 1, text: 'AA', disabled: false },
    { id: 2, text: 'BB', disabled: false },
    { id: 3, text: 'CC', disabled: false },
    { id: 4, text: 'DD', disabled: false },
    { id: 5, text: 'EE', disabled: false },
    { id: 6, text: 'FF', disabled: false },
    { id: 7, text: 'GG', disabled: false },
    { id: 8, text: 'H', disabled: false },
    { id: 9, text: 'H0', disabled: false },
    { id: 7, text: 'SuperPlasma 500', visible: false },
    { id: 8, text: 'SuperPlasma 500', visible: false },
];

const BusRouteForm = ({
    initialValues,
    formType,
    load,
    setIsOverFlow,
    busStops,
    busStopLoading,
    busRouteStopStyle,
}) => {
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();

    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);

    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [top, setTop] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');

    // File upload component
    const [files, setFiles, images, setImages, error, setError] = useFileUpload();
    const [uploadedImage, setUploadedImage] = useState([]);

    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    const [dragList, setDragList] = useState([]);
    const [buttonType, setButtonType] = useState({
        buttonName: 'バス停留所追加',
        type: 'F',
        buttonData: [],
        buttonItems: [],
        placeholder: 'バス停留所追加',
    });

    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: true, space: 'col-span-1 ', header: '移動' }, //col-span-2
        pen: { show: false, space: 'col-span-1', header: 'abc2' },
        checkbox1: { show: false, space: 'col-span-1', header: 'abc3' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: true, space: 'col-span-6', header: '停留所住所', editable: false },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: { show: true, space: 'col-span-4', header: '停留所名', editable: false },
        inputBox2: { show: false, space: 'col-span-10', header: 'abc5' },
        inputBox3: { show: false, space: 'col-span-10', header: '' },
        trash: { show: true, space: 'col-span-1', header: '削除' },
    });

    // set button data after api load  add screen
    useEffect(() => {
        try {
            if (busStops) {
                if (formType == 'edit') {
                    let t = 2;
                    const timer = setTimeout(() => {
                        while (t--) {
                            const buttonDataArray = [...busStops];
                            const selectedItems = initialValues.busRouteStopStyle
                                ? [...initialValues.busRouteStopStyle]
                                : [];
                            for (let i = 0; i < selectedItems.length; i++) {
                                const fTypeId = selectedItems[i].fTypeId;
                                for (let j = 0; j < buttonDataArray.length; j++) {
                                    if (buttonDataArray[j].id == fTypeId) {
                                        buttonDataArray[j].disabled = true;
                                    }
                                }
                            }

                            setButtonType({ ...buttonType, buttonData: [...buttonDataArray] });
                        }
                    }, 1500);
                    return () => clearTimeout(timer);
                } else {
                    setButtonType({ ...buttonType, buttonData: [...busStops] });
                }
            }
        } catch (error) {
            console.log('set button data after api load  BUS ROUTE FORM', error);
        }
    }, [busStops, busStopLoading, busRouteStopStyle]);

    // cancel operation
    const handleCancel = () => {
        navigate('/bus_route_list');
    };

    const processing = useRef(false);
    // create operation
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        let busRouteImageURL1 = '';
        let busRouteImageURL2 = '';
        let busRouteImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                busRouteImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                busRouteImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                busRouteImageURL3 = uI.location;
            }
        });

        let busStopNameSession = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));

        const busRouteStopStyle = [...busStopNameSession];

        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${createBusRoute}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    // busRouteName: busStopName,
                    busRouteName: values.busRouteName.trim(),
                    busRouteManageName: values.busRouteManageName,
                    busRouteOverview: values.busRouteOverview,
                    busRouteDescription: values.busRouteDescription,
                    busRouteImageURL1: busRouteImageURL1,
                    busRouteImageURL2: busRouteImageURL2,
                    busRouteImageURL3: busRouteImageURL3,
                    busRouteStopStyle: busRouteStopStyle,
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
            // if submit type is not continuous
            if (!continuousAdd) {
                return navigate('/bus_route_list');
            }
            // if submit type is continuous
            else {
                resetForm({ [values]: '' });
                setFiles({});
                setImages({});
                setUploadedImage([]);
                setDragList([]);
                sessionStorage.removeItem(`${routeName}_drag`);
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
        let busRouteImageURL1 = '';
        let busRouteImageURL2 = '';
        let busRouteImageURL3 = '';
        uploadedImage.map((uI) => {
            if (uI?.number == 1) {
                busRouteImageURL1 = uI.location;
            } else if (uI?.number == 2) {
                busRouteImageURL2 = uI.location;
            } else if (uI?.number == 3) {
                busRouteImageURL3 = uI.location;
            }
        });

        // bus add data drag list as array
        let busStopNameSession = JSON.parse(sessionStorage.getItem(`${routeName}_drag`));
        const busRouteStopStyle = [...busStopNameSession];

        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${updateBusRoute}${values.busRouteId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    busRouteName: values.busRouteName.trim(),
                    busRouteManageName: values.busRouteManageName,
                    busRouteOverview: values.busRouteOverview,
                    busRouteDescription: values.busRouteDescription,
                    busRouteStatus: values.busRouteStatus ? 1 : 0,
                    busRouteImageURL1: busRouteImageURL1,
                    busRouteImageURL2: busRouteImageURL2,
                    busRouteImageURL3: busRouteImageURL3,
                    busRouteStopStyle: busRouteStopStyle,
                    memo: values.memo,

                    updatedBy: info.accountId,
                },
            };
            const updated = await instance.request(config);

            // if update is successful
            if (updated) {
                setSystemError(false);
                setLoading(false);
                navigate('/bus_route_list');
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
            const ENDPOINT = `${baseURL}${deleteBusRoute}${values.busRouteId}?pid=${values.projectId}`; //?pid=${projectId}}
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
                navigate('/bus_route_list');
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
                        validationSchema={busRouteFormSchema(formType)}
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
                                                    label="バス路線画像（3枚まで）"
                                                    files={files}
                                                    setFiles={setFiles}
                                                    images={images}
                                                    setImages={setImages}
                                                    uploadedImage={uploadedImage}
                                                    setUploadedImage={setUploadedImage}
                                                    initialValues={initialValues}
                                                    error={error}
                                                    setError={setError}
                                                    name="busRouteImageURL"
                                                />
                                            </InputContainer>

                                            <InputContainer>
                                                <TextBox
                                                    label="バス路線名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="busRouteName"
                                                    maxLength="32"
                                                    placeholder="バス路線名"
                                                    isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="バス路線管理名（32文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="busRouteManageName"
                                                    maxLength="32"
                                                    placeholder="バス路線管理名"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="バス路線説明（改行不可128文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="busRouteOverview"
                                                    maxLength="128"
                                                    placeholder="バス路線説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="バス路線説明（改行可512文字）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="busRouteDescription"
                                                    maxLength="512"
                                                    placeholder="バス路線説明"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                {/*<label className="text-blue-100">バス路線停留所（最大３２個）</label>*/}
                                                {formType === 'add' && (
                                                    <DragApp
                                                        title="バス路線停留所（最大３２個）"
                                                        dragList={dragList}
                                                        buttonType={buttonType}
                                                        controlDragDrop={controlDragDrop}
                                                        addLimit={32}
                                                    />
                                                )}
                                                {formType === 'edit' && (
                                                    <DragApp
                                                        title="バス路線停留所（最大３２個）"
                                                        dragList={
                                                            busRouteStopStyle
                                                                ? [...busRouteStopStyle]
                                                                : [...initialValues.busRouteStopStyle]
                                                        }
                                                        buttonType={buttonType}
                                                        controlDragDrop={controlDragDrop}
                                                        addLimit={32}
                                                        load={busStopLoading}
                                                    />
                                                )}
                                            </InputContainer>
                                        </FormBodyContainer>
                                        <FormFooter
                                            btn_title1={formType === 'add' ? '新規追加' : 'バス路線削除'}
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
                                            btn_title="バス路線削除"
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
export default BusRouteForm;
