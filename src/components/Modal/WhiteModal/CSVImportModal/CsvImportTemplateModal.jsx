import React, { useEffect, useRef, useState } from 'react';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import { Formik, Form } from 'formik';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../../components/Loading/Loader';
import DialogModal from '../../../../components/Modal/DialogModal';
import TagBoxComponent from "../../../ManagementItem/TagBoxComponent";

import ModalFormFooter from '../../../../components/Footer/ModalFormFooter';
import { errorMessages } from '../../../../lib/errorMessages';
import InputContainer from '../../../Wrapper/InputContainer';
import CsvImportOutputField from '../../../../pages/CsvList/TemplateSetting/CsvImportOutputField';
import TextBox from '../../../Form/FormInputs/TextBox';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import SelectBox from '../../../Form/FormInputs/SelectBox';
import useGetListWithPID from '../../../../hooks/useGetListWithPID';
import { v4 as uuid } from 'uuid';
import { getErrorMessageWithErrorCode } from '../../../../lib/getErrorMessageWithErrorCode';

import {
    baseURL,
    listField,
    listFilter,
    listRoles,
    listEvent,
    listMethod,
    createMethod,
    updateMethod,
    deleteMethod,
    csvImportTemplateCreate,
    csvImportTemplateUpdate,
    csvImportTemplateDelete,
} from '../../../../restapi/queries';
import { useSelector } from 'react-redux';

import { instance } from '../../../../services/axios';
import commonConstants from '../../../../lib/commonConstants';
import { csvImportTempSettingAddModal } from '../../../../lib/Schema';
import CsvImportFieldModal from './CsvImportFieldModal';
import { parseJSON } from 'date-fns';

export default function CsvImportTemplateModal({ title, formType, initialValues, handleCancel, templateId }) {
    const processing = useRef(false);
    const projectId = sessionStorage.getItem('currentProjectId');
    const [loading, setLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [loadingDragApp, setLoadingDragApp] = useState(true);
    const [openEditImportModal, setOpenEditImportModal] = useState(false);
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [deleteError, setDeleteError] = useState(false);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [itemDataOfCsvImportField, setItemDataOfCsvImportField] = useState({});
    const [error, setError] = useState({});
    const [formData, setFormData] = useState([]);
    const [targetEvent, setTargetEvent] = useState([]);
    const [csvImportTemplateType, setCsvImportTemplateType] = useState(initialValues.csvImportTemplateType?initialValues.csvImportTemplateType:0);
    const [defaultFieldRecords, setDefaultFieldRecords] = useState([]);
    const [iniData, setIniFieldRecords] = useState(initialValues);
    const [fieldRecords, setDropDownFieldRecords] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const { info } = useSelector((state) => state.auth);
    const [tagShow, setTagShow] = useState(false)
    const [roles, setRoles] = useState([]);
    const [roleTagRecords, setRoleTagRecords] = useState([]);
    const [functionMode, setFunctionMode] = useState({ mode: "", item: {} })

console.log("initialValues", initialValues);

    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();
    
const selectOptions = [
    { id: 0, value: '制限しない' }, //7
    { id: 1, value: '制限する' },
]
    // Fetching All Filter Lists for selecting filter
    const { records: filterRecords, fetchLoading: loadingFilter } = useGetListWithPID({
        info: {
            projectId: projectId,
            baseURL: baseURL,
            listURL: listFilter,
            listMethod: listMethod,
            shouldGetRecord: true,
        },
    });
    // Fetching All Field Lists for selecting field
    const { records: fieldRecordsData, fetchLoading: loadingField } = useGetListWithPID({
        info: {
            projectId: projectId,
            baseURL: baseURL,
            listURL: listField,
            listMethod: listMethod,
            shouldGetRecord: true,
            fieldType: '0,1,2,3,4,5,6,7',
            fieldImportFlag: '3',
        },
    });

     // Fetching All Role Lists for selecting role
     const { records: roleRecords, fetchLoading: loadingRole } = useGetListWithPID({
        info: {
            projectId: projectId,
            baseURL: baseURL,
            listURL: listRoles,
            listMethod: listMethod,
            shouldGetRecord: true
        }
    })

    // After fetching roleRecords, showing the results in the role dropdown
    useEffect(() => {
        setRoles(roleRecords?.map(role => {
            return {
                ID: role.roleId,
                Name: role.roleName
            }
        }));
    }, [roleRecords]);

     
    useEffect(() => {
        const roleTag = sessionStorage.getItem(`${routeName}_timestamp__roleTag_${projectId}`);
        if (roleTag) {
            setRoleTagRecords(JSON.parse(roleTag)) // roleTag_
        }
    }, [tagShow]);
     
    useEffect(() => {
        if(initialValues?.csvImportTemplateAuthRole && initialValues?.csvImportTemplateAuthRole.length>0){
            setRoleTagRecords(initialValues?.csvImportTemplateAuthRole)
            setTagShow(true)
            initialValues.limitType=1;
        }else{
            initialValues.limitType=0;
            setRoleTagRecords([]);
        }
    }, []);
     

    const handleAdd = async (values) => {
        const pid = sessionStorage.getItem('currentProjectId');
        let authRoles;
        if (initialValues?.limitType == '1') {
            const roleTags = sessionStorage.getItem(`${routeName}_timestamp__roleTag_${projectId}`);
            if (roleTags) {
                authRoles = roleTags
            } else {
                authRoles = [];
            }
        } else {
            authRoles = [];
        }
        let formDataForUpdate = {};
        formDataForUpdate.csvImportTemplateFieldQuery = sessionStorage.getItem(`${routeName}_drag`);
        formDataForUpdate.csvImportTemplateAuthRole = authRoles;
        formDataForUpdate.projectId = pid;
        formDataForUpdate.csvImportTemplateName = values?.csvImportTemplateName;
        formDataForUpdate.eventId = values?.eventId;
        formDataForUpdate.memo = (values?.memo)? values.memo:"";
        formDataForUpdate.createdBy = info.accountId;
        formDataForUpdate.updatedBy = info.accountId;
        formDataForUpdate.csvImportTemplateType = csvImportTemplateType;

        insertOrUpdateApi(csvImportTemplateCreate, createMethod, formDataForUpdate, 1);
    };
    const handleUpdate = async (values) => {
        const pid = sessionStorage.getItem('currentProjectId');
        let authRoles;
        if (initialValues?.limitType == '1') {
            const roleTags = sessionStorage.getItem(`${routeName}_timestamp__roleTag_${projectId}`);
            if (roleTags) {
                authRoles = roleTags
            } else {
                authRoles = null;
            }
        } else {
            authRoles = null;
        }
        let formDataForUpdate = {};
        formDataForUpdate.csvImportTemplateFieldQuery = sessionStorage.getItem(`${routeName}_drag`);
        formDataForUpdate.csvImportTemplateAuthRole = authRoles;
        formDataForUpdate.projectId = pid;
        formDataForUpdate.csvImportTemplateName = values?.csvImportTemplateName;
        formDataForUpdate.eventId = values?.eventId;
        formDataForUpdate.memo = (values?.memo)? values.memo:"";
        formDataForUpdate.createdBy = info.accountId;
        formDataForUpdate.updatedBy = info.accountId;
        formDataForUpdate.csvImportTemplateType = csvImportTemplateType;
        insertOrUpdateApi(csvImportTemplateUpdate, updateMethod, formDataForUpdate, 2);
    };

    const insertOrUpdateApi = async (actionUrl, methodType, formDataForUpdate, submitType) => {
        if (processing.current) return;
        processing.current = true;
        const pid = sessionStorage.getItem('currentProjectId');
        setLoading(true);
        try {
            const ENDPOINT =
                submitType == 1 ? `${baseURL}${actionUrl}?pid=${pid}` : `${baseURL}${actionUrl}${templateId}`;
            const config = {
                method: methodType,
                url: ENDPOINT,
                data: formDataForUpdate,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const copied = await instance.request(config);

            if (copied) {
                setSystemError(false);
                setLoading(false);
                //setModalOpen(false);
                // navigate("/customer_list");
            }
            handleCancel(false);
            setLoading(false);
        } catch (error) {
            if (error.response.status === 409) {
                setSystemError(false);
            } else {
                setSystemError(true);
            }
            setLoading(false);
        }finally {
            processing.current = false;
        }
    };

    const handleCSVImportModalSaveButton = (e) => {
        if (e) e.preventDefault();
    };
    useEffect(() => {
        async function fetchEventInfo() {
            setLoading(true);
            setSystemError(false);
            try {
                const pid = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${listEvent}?pid=${pid}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);

                setTargetEvent(response?.data?.records);
                setSystemError(false);
                setLoading(false);
            } catch (error) {
                if (error?.response?.status === 409) {
                    setSystemError(false);
                } else {
                    setSystemError(true);
                }
                setLoading(false);
            }
            setLoading(false);
        }
        fetchEventInfo();
        if (csvImportTemplateType == 1) {
            getDefaultFieldList('1,2', 1);
            getDefaultFieldList('0', 2);
        }
        else {
            getDefaultFieldList(1, 1);
            getDefaultFieldList(3, 2);
        }
    }, []);
    useEffect(() => {
        if (templateId > 0) {
            let dragsItems = initialValues?.csvImportTemplateFieldQuery;
            dragsItems = dragsItems ?? [];
            initialValues.csvImportTemplateColumn = dragsItems;
            sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(dragsItems));
            sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(dragsItems));
            setIniFieldRecords(initialValues);
        }
    }, [templateId]);
    async function addDefaultField(e) {
        if (e.target.value != '') {
            let csvImportTemplateType = e.target.value;
            setCsvImportTemplateType(csvImportTemplateType);
            let fieldImportFlags = csvImportTemplateType == 1 ? '1,2' : '1';
            let dropDownFiledParam = csvImportTemplateType == 1 ? '0' : '3';
            //FIXME: tatsu temporary update
            getDefaultFieldList(fieldImportFlags, 1, 1, csvImportTemplateType);
            //FIXME: tatsu temporary update
            getDefaultFieldList(dropDownFiledParam, 2, 1, csvImportTemplateType);
        }
    }

    //FIXME: tatsu temporary update
    async function getDefaultFieldList(fieldImportFlag, listShowType, initFlag = 0, csvImportTemplateType = null) {

        console.log("getDefaultFieldList", fieldImportFlag);

        const pid = sessionStorage.getItem('currentProjectId');
        let fieldType = '0,1,2,3,4,5,6,7';
        try {
            setLoading(true);
            // const projectId = item.currentProjectId
            const ENDPOINT = `${baseURL}${listField}?pid=${pid}&fieldType=${fieldType}&fieldImportFlag=${fieldImportFlag}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await instance.request(config);
            if (response) {
                listShowType == 1 && setDefaultFieldRecords(response.data.records);
                listShowType == 2 && setDropDownFieldRecords(response.data.records);
                if (listShowType == 1) {
                    let defaultList = [];
                    let currentPosition = 0;
                    response.data.records.length > 0 &&
                        response.data.records.map((item) => {
                            const fromObj = {
                                Task_ID: uuid(),
                                Task_Subject: '' + Math.floor(Math.random() * (1000 - 100 + 1) + 100),
                                inputBox2: { id: uuid(), value: item?.fieldName, type: item?.fieldType },
                                inputBox: { id: uuid(), value: item?.fieldName, type: item?.fieldType },
                                expandType: 'F',
                                dragType: 'default',
                                fTypeId: item?.fieldId,
                                fieldData: item || '',
                                info2: '',
                                number: Math.floor(Math.random() * (1000 - 100 + 1) + 100),
                                currentPos: currentPosition,
                                checkbox1: { checked: false, id: uuid(), type: 'checkbox' },
                                checkbox2: { checked: false, id: uuid(), type: 'checkbox' },
                            };
                            defaultList.push(fromObj);
                            currentPosition++;
                        });
                    //FIXME: tatsu temporary update
                    if (initFlag === 0) {
                        if (formType != 'add' && templateId > 0) {
                            let dragsItems = initialValues?.csvImportTemplateFieldQuery;
                            dragsItems = dragsItems ?? [];
                            initialValues.csvImportTemplateColumn = dragsItems;
                            sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(dragsItems));
                            sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(dragsItems));
                        } else {
                            initialValues.csvImportTemplateColumn = response.data.records;
                            sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(defaultList));
                            sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(defaultList));
                        }
                    }
                    //FIXME: tatsu temporary update
                    else {
                        initialValues.csvImportTemplateColumn = defaultList;
                        initialValues.csvImportTemplateType = csvImportTemplateType;
                        sessionStorage.setItem(`${routeName}_drag`, JSON.stringify(defaultList));
                        sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(defaultList));
                    }

                    setIniFieldRecords(initialValues);
                }
                setSystemError(false);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setSystemError(error.message);
        }
    }

    // Delete CSV Export template
    const handleDelete = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        setDeleteError(false);
        try {
            const ENDPOINT = `${baseURL}${csvImportTemplateDelete}${templateId}?pid=${projectId}`;
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
                setSystemError(false);
                setLoading(false);
                handleCancel(false);
            }
        } catch (error) {
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            setDeleteError(true);
            setDeleteErrorMessage(matchErrorMessage);
            setLoading(false);
        }finally {
            processing.current = false;
        }
    };

    const closeDialogModal = () => {
        setOpenDeleteModal(false);
        setDeleteError(false);
    };
    function changelimitHandler(e){
        let limitTypes = e.target.value;
        setTagShow(limitTypes==1)
        initialValues.limitType=limitTypes;
    }
    return (
        <>
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title={title} className="text-blue-100 text-xl" />
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={csvImportTempSettingAddModal}
                    initialValues={initialValues}
                    enableReinitialize={true}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (formType === 'add') {
                            handleAdd(values, resetForm);
                        } else {
                            handleUpdate(values);
                        }
                    }}
                >
                    {({ errors }) => {
                        const first = Object.keys(errors)[0];
                        return (
                            <div className="relative w-full h-full">
                                <Form>
                                    <div className="-mt-4" id="scroller"></div>
                                    <FormBodyContainer className="!px-0">
                                        <InputContainer>
                                            <TextBox
                                                label="CSVインポートテンプレート名（32文字まで）"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 placeholder-blue-100"
                                                placeholder="CSVインポートテンプレート名"
                                                name="csvImportTemplateName"
                                                type="text"
                                                isRequired
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <SelectBox
                                                label="対象イベント"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                                name="eventId"
                                                isRequired
                                            >
                                                <option value="">
                                                    {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT('対象イベント')}{' '}
                                                </option>
                                                {targetEvent.length > 0 &&
                                                    targetEvent.map((target, index) => (
                                                        <option
                                                            value={target.eventId}
                                                            key={target.eventId + '_' + index}
                                                        >
                                                            {target.eventName}
                                                        </option>
                                                    ))}
                                            </SelectBox>
                                        </InputContainer>
                                        {/*  */}
                                        <InputContainer>
                                            <SelectBox
                                                label="インポート種別"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25"
                                                name="csvImportTemplateType"
                                                onChange={(e) => addDefaultField(e)}
                                            >
                                                <option value={0}>顧客</option>
                                                <option value={1}>顧客 + 予約</option>
                                            </SelectBox>
                                        </InputContainer>
                                        <InputContainer className="py-10">
                                            {/* CSV Import field */}
                                            <CsvImportOutputField
                                                infoText={{
                                                    buttonFTypeName: 'CSV入力フィールド追加',
                                                    dragAppCSVTitle: '',
                                                    inputBoxHeader: 'フィールド',
                                                    openEditPencilModal: 'csvImport',
                                                }}
                                                stateInfoCsvImport={{
                                                    setOpenEditImportModal: setOpenEditImportModal,
                                                    setItemDataOfCsvImportField: setItemDataOfCsvImportField,
                                                }}
                                                fieldRecords={fieldRecords}
                                                fieldRecords2={fieldRecords}
                                                filterRecords={filterRecords}
                                                initialValues={iniData}
                                                setLoading={setLoadingDragApp}
                                                formType={formType}
                                            />
                                        </InputContainer>

                                        <InputContainer>
                                                <SelectBox
                                                    label='このテンプレートを利用可能なロール'
                                                    inputClassName='bg-transparent text-blue-100'
                                                    labelClassName="text-blue-100"
                                                    border="border-unset border-b-[1px]"
                                                    name='limitType'
                                                    onChange={(e)=>changelimitHandler(e)}
                                                >
                                                    {selectOptions.length > 0 &&
                                                        selectOptions.map((role) => (
                                                            <option
                                                                value={role.id}
                                                                key={role.id}>
                                                                {role.value}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                                {tagShow &&
                                                    <InputContainer className="px-20 mt-4" >
                                                        <label className="text-blue-100">利用可能なロールを選択してください</label>
                                                        <div className="area-tagbox-component">
                                                            {/* <TagBoxComponent
                                                                dragList={roles}
                                                                functionMode={functionMode}
                                                            /> */}
                                                            <TagBoxComponent
                                                            pathName={routeName}
                                                                dragList={roleRecords}
                                                                displayExpr="roleName"
                                                                valueExpr="roleId"
                                                                count={`_roleTag_${projectId}`}
                                                                preDefineTagBoxValue={roleTagRecords && roleTagRecords}
                                                                functionMode={functionMode}
                                                            />
                                                        </div>
                                                         
                                                    </InputContainer>
                                                }
                                            </InputContainer>

                                        <ModalFormFooter
                                            padding="!p-0"
                                            btn_title1={`${
                                                formType === 'add' ? 'キャンセル' : 'CSVインポートテンプレート削除'
                                            }`}
                                            btn_title2={`${formType === 'add' ? '新規追加' : '更新'}`}
                                            formType={formType}
                                            handleCancel={handleCancel}
                                            setOpenModal={setOpenDeleteModal}
                                            setIsOverFlow={false}
                                            memoClassName="!text-blue-100"
                                            buttonComponents={true}
                                            setContinuousAdd={() => {}}
                                            deleteLoading={deleteLoading}
                                        >
                                            {/* ----error---- */}
                                            <ErrorMessage>
                                                {errors[first]}
                                                {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                            </ErrorMessage>
                                        </ModalFormFooter>
                                    </FormBodyContainer>
                                </Form>
                                {openDeleteModal && (
                                    <DialogModal
                                        title="削除"
                                        btn_title="削除"
                                        cancel_title="キャンセル"
                                        handleButtonLeft={handleDelete}
                                        handleButtonRight={closeDialogModal}
                                        setIsOverFlow={false}
                                        values={initialValues}
                                        errors={
                                            <span
                                                className={`${deleteError && errors[first]} ? "visible" : "invisible"`}
                                            >
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
            </WhiteModalWrapper>
            {openEditImportModal && (
                <CsvImportFieldModal
                    handleCancel={() => setOpenEditImportModal(false)}
                    handleOnPressSave={handleCSVImportModalSaveButton}
                    blockData={itemDataOfCsvImportField}
                    filterRecords={filterRecords}
                />
            )}
        </>
    );
}
