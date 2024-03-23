import { Form, Formik, useFormikContext } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import commonConstants from '../../lib/commonConstants';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { fieldFormSchema } from '../../lib/Schema';
import {
    baseURL,
    createField,
    createMethod,
    deleteField,
    deleteMethod,
    listFilter,
    listMethod,
    updateField,
    updateMethod,
} from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import DragApp from '../ListElementDrag/DragApp';
import Loading from '../Loading/Loader';
import DialogModal from '../Modal/DialogModal';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import FormFooter from './FormFooter';
import SelectBox from './FormInputs/SelectBox';
import TextAreaInput from './FormInputs/TextAreaInput';
import TextBox from './FormInputs/TextBox';

const selectOptions = [
    { id: 0, value: 'テキスト型' }, //7
    { id: 1, value: 'テキストエリア型' },
    // { id: 2, value: '結合テキスト型' },//5=結合テキスト型
    { id: 3, value: 'リスト型' }, //4=リスト型
    { id: 4, value: 'YesNo型' },
    { id: 5, value: '日付型' },
    { id: 6, value: '時間型' }, //7=テキスト型
    { id: 7, value: '数値型' }, //7=テキスト型
];

// formik onChange function will show everything in form
const FormObserver = ({ setListShow, setJoinShow, setYesnoShow, setSelectTextType, setConditionType }) => {
    const { values } = useFormikContext();
    useEffect(() => {
        const { fieldId, fieldType, fieldCondition } = values;

        setJoinShow && setJoinShow(fieldType === '2' || fieldType == 2);
        setListShow && setListShow(fieldType === '3' || fieldType == 3);
        setYesnoShow && setYesnoShow(fieldType === '4' || fieldType == 4);
        setSelectTextType && setSelectTextType(fieldType === '0' || fieldType === 0);
        setConditionType && setConditionType(fieldCondition === '1' || fieldCondition == 1);
        // setConditionType && setConditionType(fieldCondition === "1")
    }, [values]);

    return null;
};

// Field Form Main ExpandableComponents
const FieldForm = ({ formType, initialValues, load, error, setIsOverFlow, fieldStyleDb }) => {
    // route name get to fetch local storage data
    const pathname = window.location.pathname;
    const routeName2 = pathname.split('/').pop();

    // use state handle for this components
    const [loading, setLoading] = useState(true);
    const { info } = useSelector((state) => state.auth);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [fieldError, setFieldError] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const navigate = useNavigate();
    const [top, setTop] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [listShow, setListShow] = useState(initialValues.fieldType == 3 ? true : false);
    const [joinShow, setJoinShow] = useState(initialValues.fieldType == 2 ? true : false);
    const [yesnoShow, setYesnoShow] = useState(initialValues.fieldType == 4 ? true : false);
    const [selectTextType, setSelectTextType] = useState(false);

    const [filter, setFilter] = useState();
    const [dragList, setDragList] = useState([]);
    const [buttonType, setButtonType] = useState({ buttonName: 'リスト追加', type: 'normal' });
    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: true, space: 'col-span-1', header: '' }, //col-span-2
        pen: { show: false, space: 'col-span-1', header: '' },
        checkbox1: { show: false, space: 'col-span-1', header: '' },
        info: { show: false, space: 'col-span-2', header: '' },
        info2: { show: false, space: 'col-span-2', header: '' },
        task: { show: false, space: 'col-span-1', header: '' },
        checkbox2: { show: false, space: 'col-span-1', header: '' },
        inputBox: { show: false, space: 'col-span-2', header: '' },
        inputBox2: { show: true, space: 'col-span-10', header: '' },
        inputBox3: { show: false, space: 'col-span-10', header: '' },
        trash: { show: true, space: 'col-span-1', header: '' },
    });

    // make screen loader false initilize
    useEffect(() => {
        const projectId = sessionStorage.getItem('currentProjectId');
        const ENDPOINT = `${baseURL}${listFilter}?pid=${projectId}`;
        (async () => {
            try {
                setLoading(true);
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                const result = await response.data;
                if (result.error) throw new Error(result.error);
                setFilter(result.records);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        })();
    }, []);

    // if submit type is continuous add, page will be scroll to top
    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    const handleCancel = () => {
        navigate('/field_list');
    };
    const processing = useRef(false);

    const handleAddField = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;

        let fieldStyle = [];
        //Filter Builder GET JSON DATA from LS
        // const getLs = JSON.parse(window.sessionStorage.getItem(`${routeName2}_timestamp_filterBuilder`));
        const getLs = JSON.parse(window.sessionStorage.getItem(`filterBuilder`));
        if (values.fieldType == 3) {
            const fieldStyleInLocalStorage = JSON.parse(sessionStorage.getItem(`${routeName2}_drag`));
            if (fieldStyleInLocalStorage) {
                fieldStyle = [...fieldStyleInLocalStorage];
            }
        } else if (values.fieldType == 2) {
            fieldStyle = [values.numberOfJoinedField];
        } else if (values.fieldType == 4) {
            fieldStyle = {
                trueText: values.fieldTrueText,
                falseText: values.fieldFalseText,
            };
        }
        // make object whitch will go to the db
        const sendDataToTheDB = {
            projectId: sessionStorage.getItem('currentProjectId'),
            fieldName: values.fieldName.trim(),
            fieldManageName: values.fieldManageName,
            fieldOverview: values.fieldOverview,
            fieldCode: values.fieldCode,
            fieldDescription: values.fieldDescription,
            fieldType: values.fieldType,
            fieldStyle: fieldStyle ? fieldStyle : [],
            filterId: values.filterId ? values.filterId : 0,
            memo: values.memo,
            createdBy: info.accountId,
            updatedBy: info.accountId,
        };

        try {
            setLoading(true);
            const ENDPOINT = `${baseURL}${createField}?pid=${sessionStorage.getItem('currentProjectId')}`;
            const config = { method: createMethod, url: ENDPOINT, data: { ...sendDataToTheDB } };

            const newField = await instance.request(config);

            if (newField) {
                setSystemError(false);
                setLoading(false);
            }
            // if submit type is not continuous
            if (!continuousAdd) {
                return navigate('/field_list');
            }
            // if submit type is continuous
            setTop((prev) => !prev);
            resetForm({ [values]: '' });
            setSystemError(false);
            setFieldError(false);
        } catch (error) {
            if (error.response.status === 409) {
                setFieldError(true);
                setLoading(false);
            } else {
                setSystemError(true);
                setFieldError(false);
                setLoading(false);
            }
        } finally {
            processing.current = false;
        }
    };

    // field update form submit action
    const handleUpdateField = async (values) => {
        if (processing.current) return;
        processing.current = true;
        let fieldStyle = [];
        //Filter Builder GET JSON DATA from LS
        // const getLs = JSON.parse(window.sessionStorage.getItem(`${routeName2}_timestamp_filterBuilder`));
        const getLs = JSON.parse(window.sessionStorage.getItem(`filterBuilder`));
        if (values.fieldType == 3) {
            // local storage dnd data has checking
            const fieldStyleInLocalStorage = JSON.parse(sessionStorage.getItem(`${routeName2}_drag`));
            if (fieldStyleInLocalStorage) {
                fieldStyle = [...fieldStyleInLocalStorage];
            }
        } else if (values.fieldType == 2) {
            fieldStyle = [values.numberOfJoinedField];
        } else if (values.fieldType == 4) {
            fieldStyle = {
                trueText: values.fieldTrueText,
                falseText: values.fieldFalseText,
            };
        }

        const ENDPOINT = `${baseURL}${updateField}${values.fieldId}`;
        const updateData = {
            projectId: sessionStorage.getItem('currentProjectId'),
            fieldName: values.fieldName.trim(),
            fieldManageName: values.fieldManageName,
            fieldCode: values.fieldCode,
            fieldOverview: values.fieldOverview,
            fieldDescription: values.fieldDescription,
            fieldType: values.fieldType,
            fieldStyle: fieldStyle,

            filterId: values.filterId ? values.filterId : 0,
            updatedBy: info.accountId,
            memo: values.memo,
        };
        try {
            setDeleteLoading(true);
            setLoading(true);
            const config = { method: updateMethod, url: ENDPOINT, data: updateData };
            const updateField = await instance.request(config);
            if (updateField) {
                setSystemError(false);
                navigate('/field_list');
                setDeleteLoading(false);
                setLoading(false);
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
    const closeDialogModal = () => {
        setOpenModal(false);
        setIsOverFlow(false);
        setDeleteError(false);
    };
    //field delete operation
    const handleDelete = async () => {
        if (processing.current) return;
        processing.current = true;

        const ENDPOINT = `${baseURL}${deleteField}${initialValues.fieldId}?pid=${sessionStorage.getItem(
            'currentProjectId'
        )}`;
        try {
            setLoading(true);
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleteField = await instance.request(config);
            if (deleteField) {
                setDeleteError(false);
                setLoading(false);
                navigate('/field_list');
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

    // 結合テキストとYesNo型用
    let initialValues2 = initialValues;
    if (initialValues.fieldType == 4) {
        initialValues2.fieldTrueText = initialValues.fieldStyle.trueText;
        initialValues2.fieldFalseText = initialValues.fieldStyle.falseText;
    } else if (initialValues.fieldType == 2) {
        initialValues2.numberOfJoinedField = initialValues.fieldStyle;
    }

    return (
        <>
            {load || !Object.keys(initialValues).length || deleteLoading ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 h-[calc(100vh-134px)] p-0">
                    {/* <input onChange={handleChange} onblur={linconFunc} /> */}

                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues2}
                        validationSchema={fieldFormSchema(formType)}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            if (formType === 'add') {
                                handleAddField(values, resetForm);
                            } else {
                                handleUpdateField(values, {
                                    setSubmitting,
                                });
                            }
                        }}
                    >
                        {({ errors }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <>
                                    <FormObserver
                                        setListShow={setListShow}
                                        setJoinShow={setJoinShow}
                                        setYesnoShow={setYesnoShow}
                                        setSelectTextType={setSelectTextType}
                                    />
                                    <div className="relative w-full h-full">
                                        {loading && <Loading />}
                                        <Form>
                                            <div className="-mt-4" id="scroller"></div>
                                            <FormBodyContainer>
                                                <InputContainer>
                                                    <TextBox
                                                        // label='フィールド名（32文字まで）'
                                                        label="フィールド名（2文字から32文字まで）"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="fieldName"
                                                        maxLength="32"
                                                        type="text"
                                                        placeholder="フィールド名"
                                                        isRequired
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <TextBox
                                                        label="フィールド管理名（2文字から32文字まで）"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="fieldManageName"
                                                        maxLength="32"
                                                        type="text"
                                                        placeholder="フィールド管理名"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <TextBox
                                                        label="フィールド説明（改行不可128文字）"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="fieldOverview"
                                                        maxLength="128"
                                                        type="text"
                                                        placeholder="フィールド説明"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <TextAreaInput
                                                        label="フィールド説明（改行可512文字）"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25 !h-16"
                                                        name="fieldDescription"
                                                        maxLength="512"
                                                        type="text"
                                                        placeholder="フィールド説明"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <TextBox
                                                        label="フィールドコード（自動生成変更不可）"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-gray-300 pointer-events-none"
                                                        name="fieldCode"
                                                        readOnly
                                                        tabIndex="-1"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <SelectBox
                                                        label="フィールドタイプ"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="fieldType"
                                                        isRequired
                                                    >
                                                        <option value="">
                                                            {' '}
                                                            {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                                'フィールドタイプ'
                                                            )}{' '}
                                                        </option>
                                                        {selectOptions.length > 0 &&
                                                            selectOptions.map((field, index) => (
                                                                <option value={field.id} key={field.id + '_' + index}>
                                                                    {field.value}
                                                                </option>
                                                            ))}
                                                    </SelectBox>
                                                </InputContainer>
                                                {listShow && (
                                                    <div className="mx-8 my-4">
                                                        {initialValues.fieldStyle ? (
                                                            <div>
                                                                <DragApp
                                                                    dragList={initialValues.fieldStyle?.lookup} // chagnes from linkon
                                                                    buttonType={buttonType}
                                                                    controlDragDrop={controlDragDrop}
                                                                    addLimit={32}
                                                                />
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                <DragApp
                                                                    dragList={dragList}
                                                                    buttonType={buttonType}
                                                                    controlDragDrop={controlDragDrop}
                                                                    addLimit={32}
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                )}
                                                {joinShow && (
                                                    <InputContainer>
                                                        <SelectBox
                                                            label="結合フィールド数"
                                                            labelClassName="text-blue-100"
                                                            inputClassName="bg-blue-25"
                                                            name="numberOfJoinedField"
                                                        >
                                                            <option value="">
                                                                {' '}
                                                                {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                                    '結合フィールド数'
                                                                )}{' '}
                                                            </option>
                                                            <option value="1">1</option>
                                                            <option value="2">2</option>
                                                            <option value="3">3</option>
                                                            <option value="4">4</option>
                                                            <option value="5">5</option>
                                                        </SelectBox>
                                                    </InputContainer>
                                                )}
                                                {yesnoShow && (
                                                    <InputContainer>
                                                        <TextBox
                                                            label="Yes"
                                                            labelClassName="text-blue-100"
                                                            inputClassName="bg-blue-25"
                                                            name="fieldTrueText"
                                                            maxLength="128"
                                                            type="text"
                                                            placeholder="Yes"
                                                        />
                                                        <TextBox
                                                            label="No"
                                                            labelClassName="text-blue-100"
                                                            inputClassName="bg-blue-25"
                                                            name="fieldFalseText"
                                                            maxLength="128"
                                                            type="text"
                                                            placeholder="No"
                                                        />
                                                    </InputContainer>
                                                )}
                                            </FormBodyContainer>
                                            <FormFooter
                                                btn_title1={formType === 'add' ? '新規追加' : 'フィールド削除'}
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
                                                    {fieldError && !errors[first]
                                                        ? `${errorMessages.W_EXISTS_01('フィールド名')}`
                                                        : errors[first]}
                                                    {alreadyDeletedErrorMessage &&
                                                        !errors[first] &&
                                                        `${alreadyDeletedErrorMessage}`}
                                                    {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                                    {error && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                                </ErrorMessage>
                                            </FormFooter>
                                        </Form>
                                    </div>
                                    {openModal && (
                                        <DialogModal
                                            title="削除"
                                            btn_title="フィールド削除"
                                            cancel_title="キャンセル "
                                            handleButtonLeft={handleDelete}
                                            handleButtonRight={closeDialogModal}
                                            setIsOverFlow={setIsOverFlow}
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
                                </>
                            );
                        }}
                    </Formik>
                </Page1440Body>
            )}
        </>
    );
};
export default FieldForm;
