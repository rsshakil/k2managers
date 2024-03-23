import { Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useGetListWithPID from "../../../hooks/useGetListWithPID";
import { errorMessages } from "../../../lib/errorMessages";
import { getErrorMessageWithErrorCode } from "../../../lib/getErrorMessageWithErrorCode";
import { baseURL, createCustomerViewTemplate, createMethod, deleteCustomerViewTemplate, deleteMethod, listApp, listField, listFilter, listMethod, listRoles, updateCustomerViewTemplate, updateMethod, customerEditTemplateRead } from "../../../restapi/queries";
import { instance } from "../../../services/axios";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import ModalFormFooter from "../../Footer/ModalFormFooter";
import SelectBox from "../../Form/FormInputs/SelectBox";
import TextBox from "../../Form/FormInputs/TextBox";
import DragApp from "../../ListElementDrag/DragApp";
import Loading from "../../Loading/Loader";
import TagBoxComponent from "../../ManagementItem/TagBoxComponent";
import FormBodyContainer from "../../Wrapper/FormBodyContainer";
import InputContainer from "../../Wrapper/InputContainer";
import ModalTitle from "../components/ModalTitle";
import WhiteModalWrapper from "../components/WhiteModalWrapper";
import DialogModal from "../DialogModal";
import FormFooter from "../../Form/FormFooter";
import _ from "lodash";


const selectOptions = [
    { id: 0, value: '制限しない' }, //7
    { id: 1, value: '制限する' },
]



// formik onChange function will show everything in form
const FormObserver = ({ setTagShow, setErrors }) => {
    const { values } = useFormikContext();
    useEffect(() => {

        const { limitType } = values
        setTagShow && setTagShow(limitType === "1" || limitType == 1)

        setErrors({});
    }, [values]);

    return null;
};
const initialValues = {
    customerViewTemplateName: "",
    appId: "",
    filterId: "",
    memo: "",
    limitType: '',
    createTemplateId: "",
    editTemplateId: ""
};

const TemplateModal = (
    {
        handleCancel,
        title = "施設追加",
        formType,
        setIsOverflow, handleButtonRight,
        data,
        openModal
    }) => {
    const processing = useRef(false);
    const [options, setOptions] = useState([{}])
    const [formValues, setFormValues] = useState(initialValues);
    const navigate = useNavigate();

    const [tagShow, setTagShow] = useState(initialValues.limitType == 1)
    // Tag box handle state
    const [functionMode, setFunctionMode] = useState({ mode: "", item: {} })
    const [countTagBox, setCoutTagBox] = useState([{ name: "TagBox1", ID: 1 }])

    const [searchItemValue, setSearchItemValue] = useState('');

    // show component option
    const [showComponent1, setShowComponent1] = useState(false)
    const [roles, setRoles] = useState([]);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [deleteError, setDeleteError] = useState(false)
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState("")
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("")
    const pathname = window.location.pathname;
    const routeName = pathname.split("/").pop();
    const [templatesCreate, setTemplatesCreate] = useState([]);
    const [templatesEdit, setTemplatesEdit] = useState([]);
    const [copyModal, setCopyModal] = useState(false);
    const [systemErrorCopy, setSystemErrorCopy] = useState(false);

    // drag app state handle whole things

    const [dragList, setDragList] = useState([])
    const [buttonType, setButtonType] = useState(
        {
            buttonName: "検索エリア追加", type: "F",
            buttonData: [],
            buttonItems: [],
            placeholder: "検索エリア追加"
        }
    )
    const [controlDragDrop, setDragDrop] = useState({
        grid: { name: "grid grid-cols-12 gap-1", },
        dragable: { show: true, space: "col-span-1", header: '移動' }, //col-span-2
        pen: { show: false, space: "col-span-1", header: 'abc2' },
        checkbox1: { show: false, space: "col-span-1", header: 'abc3' },
        info: { show: false, space: "col-span-2", header: '' },
        info2: { show: false, space: "col-span-6", header: '停留所住所' },
        task: { show: false, space: "col-span-1", header: '' },
        checkbox2: { show: false, space: "col-span-1", header: '' },
        inputBox: { show: true, space: "col-span-10", header: 'フィールド', editable: false },
        inputBox2: { show: false, space: "col-span-10", header: 'abc5' },
        inputBox3: { show: false, space: "col-span-3", header: '' },
        trash: { show: true, space: "col-span-1", header: '削除' },
    },)

    //drag app state for expandable button type
    const [dragList2, setDragList2] = useState([])
    const [buttonType2, setButtonType2] = useState({ buttonName: "列追加　", type: "B", buttonItems: [] })
    const [controlDragDrop2, setDragDrop2] = useState({
        grid: { name: "grid grid-cols-12 gap-1" },
        dragable: { show: true, space: "col-span-1", header: "並び替え" }, //col-span-2
        pen: { show: false, space: "col-span-1", header: "編集" },
        checkbox1: { show: false, space: "col-span-1", header: "必須 （管理画面からの操作時のみ）" },
        info: { show: false, space: "col-span-2", header: "info", },
        info2: { show: false, space: "col-span-2", header: "info2", },
        task: { show: false, space: "col-span-1", header: "" },
        checkbox2: { show: false, space: "col-span-1", header: "" },
        inputBox: { show: true, space: "col-span-9", header: "フィールド名（タイプ)" },
        inputBox2: { show: true, space: "col-span-1", header: "" },
        inputBox3: { show: false, space: "col-span-3", header: "" },
        trash: { show: false, space: "col-span-1", header: "削除" },
    },)
    const [loading, setLoading] = useState(false)
    const [systemError, setSystemError] = useState(false)
    const projectId = sessionStorage.getItem('currentProjectId')
    const [roleTagRecords, setRoleTagRecords] = useState([]);

    const { info } = useSelector((state) => state.auth)

    // Fetching All App Lists for selecting app
    const { records: appRecords, fetchLoading: loadingApp } = useGetListWithPID({
        info: {
            projectId: projectId,
            baseURL: baseURL,
            listURL: listApp,
            listMethod: listMethod,
            shouldGetRecord: true,

        }
    })

    // Fetching All Filter Lists for selecting filter
    const { records: filterRecords, fetchLoading: loadingFilter } = useGetListWithPID({
        info: {
            projectId: projectId,
            baseURL: baseURL,
            listURL: listFilter,
            listMethod: listMethod,
            shouldGetRecord: true,
        }
    })

    // Fetching All Field Lists for selecting field
    const { records: fieldRecords, fetchLoading: loadingField } = useGetListWithPID({
        info: {
            projectId: projectId,
            baseURL: baseURL,
            listURL: listField,
            listMethod: listMethod,
            shouldGetRecord: true,
            fieldType: '0,1,2,3,4,5,6,7,8',

        }
    })

    // Fetching searchableFieldRecords Field Lists for selecting field
    const { records: searchableFieldRecords, fetchLoading: loadingSearchableField } = useGetListWithPID({
        info: {
            projectId: projectId,
            baseURL: baseURL,
            listURL: listField,
            listMethod: listMethod,
            shouldGetRecord: true,
            fieldType: '0,1,2,3,4,5,6,7,8',
            searchFiledFlag: '1',

        }
    })
    console.log('searchableFieldRecords', searchableFieldRecords)
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

    const getCustomerEditTemplateCreate = async () => {
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${customerEditTemplateRead}?pid=${projectId}&customerEditTemplateTypeFlag=0`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await instance.request(config);
            setTemplatesCreate(response?.data?.records);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const getCustomerEditTemplateEdit = async () => {
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${customerEditTemplateRead}?pid=${projectId}&customerEditTemplateTypeFlag=1`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await instance.request(config);
            setTemplatesEdit(response?.data?.records);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    // After fetching roleRecords, showing the results in the role dropdown
    useEffect(() => {
        getCustomerEditTemplateCreate();
        getCustomerEditTemplateEdit();
        setRoles(roleRecords?.map(role => {
            return {
                ID: role.roleId,
                Name: role.roleName
            }
        }));
    }, [roleRecords]);

    useEffect(() => {
        const roleTag = sessionStorage.getItem(`routeName_timestamp__roleTag_${projectId}`);
        if (roleTag) {
            setRoleTagRecords(JSON.parse(roleTag)) // roleTag_
        }
    }, [tagShow]);


    useEffect(() => {
        sessionStorage.removeItem(`routeName_timestamp__roleTag_${projectId}`);
        if (formType === "edit") {
            const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
            const template = data?.find(template => template.customerViewTemplateId == editId);
            let limitType = "";
            let customerViewTemplateSearch = [];
            let customerViewTemplateColumn = [];

            if (template) {
                // Set selected role records
                if (template?.customerViewTemplateAuthRole) {
                    limitType = 1;
                    setRoleTagRecords(template?.customerViewTemplateAuthRole);
                    sessionStorage.setItem(`routeName_timestamp__roleTag_${projectId}`, JSON.stringify(template?.customerViewTemplateAuthRole))
                } else {
                    limitType = "";
                    setRoleTagRecords("");
                }

                if (template?.customerViewTemplateSearch) {
                    customerViewTemplateSearch = template?.customerViewTemplateSearch;

                    sessionStorage.setItem(`${routeName}_drag_F_Type`, JSON.stringify(template?.customerViewTemplateSearch))
                } else {
                    customerViewTemplateSearch = [];
                }

                if (template?.customerViewTemplateColumn) {
                    customerViewTemplateColumn = template?.customerViewTemplateColumn;
                    sessionStorage.setItem(`${routeName}_drag_B_Type`, JSON.stringify(template?.customerViewTemplateColumn))
                    if (customerViewTemplateColumn && customerViewTemplateColumn?.length) {
                        for (let template of customerViewTemplateColumn) {
                            sessionStorage.setItem(`customer_template_${template.Task_ID}`, JSON.stringify(template?.customerTemplate))
                        }
                    }
                } else {
                    customerViewTemplateColumn = [];
                }

                setFormValues({
                    ...formValues,
                    customerViewTemplateName: template?.customerViewTemplateName,
                    appId: template.appId,
                    filterId: template?.filterId,
                    memo: template?.memo,
                    limitType: limitType,
                    createTemplateId: template.customerViewTemplateCreateTemplateId,
                    editTemplateId: template.customerViewTemplateEditTemplateId
                });
                // Updated Field and column drag list data for rerender
                const updatedButtonType = {
                    ...buttonType,
                    buttonData: searchableFieldRecords?.map(field => {
                        const fieldFind = customerViewTemplateSearch?.find(fieldTemplate => fieldTemplate.fTypeId == field.fieldId);
                        if (fieldFind) {
                            return {
                                id: field.fieldId,
                                text: field.fieldManageName ? field.fieldName + '（' + field.fieldManageName + '）' : field.fieldName,
                                fieldManageName: field.fieldManageName,
                                disabled: true
                            }
                        } else {
                            return {
                                id: field.fieldId,
                                text: field.fieldManageName ? field.fieldName + '（' + field.fieldManageName + '）' : field.fieldName,
                                fieldManageName: field.fieldManageName,
                                disabled: false
                            }
                        }
                    }),
                    buttonItems: customerViewTemplateSearch
                };
                const updatedButtonType2 = {
                    ...buttonType2,
                    buttonItems: customerViewTemplateColumn
                };
                setButtonType(updatedButtonType);
                setButtonType2(updatedButtonType2);
            }
        } else {
            // Set Field Drag List data after api call
            const newButtonType = {
                ...buttonType,
                buttonData: searchableFieldRecords?.map(field => {
                    return {
                        id: field.fieldId,
                        text: field.fieldManageName ? field.fieldName + '（' + field.fieldManageName + '）' : field.fieldName,
                        fieldManageName: field.fieldManageName,
                        disabled: false
                    }
                })
            };
            setButtonType(newButtonType);
        }
    }, [formType, searchableFieldRecords]);


    // copy operation
    const handleCopy = () => {
        setCopyModal(true);
    };


    // Handle Copy Project
    const handleCopyProject = async () => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemErrorCopy(false);
        try {
            const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
            const ENDPOINT = `${baseURL}${createCustomerViewTemplate}${editId}?pid=${sessionStorage.getItem('currentProjectId')}`;
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
            handleCancel();
        } catch (error) {
            // if (error.response.status === 409) {
            //     setSystemErrorCopy(false);
            // } else {
            console.warn('SYSTEM ERROR: ', error);
            setSystemErrorCopy(true);
            setLoading(false);
            // }
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    // Create customer list template
    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        let templates = JSON.parse(sessionStorage.getItem(`${routeName}_drag_B_Type`));

        if (templates && templates?.length) {
            for (let template of templates) {
                const task = JSON.parse(sessionStorage.getItem(`customer_template_${template.Task_ID}`));
                template["customerTemplate"] = task;
            }
        }

        let customerViewTemplateAuthRole;
        if (values.limitType == '1') {
            const roleTag = sessionStorage.getItem(`routeName_timestamp__roleTag_${projectId}`);
            if (roleTag) {
                customerViewTemplateAuthRole = roleTag
            } else {
                customerViewTemplateAuthRole = [];
            }
        } else {
            customerViewTemplateAuthRole = null;
        }

        setLoading(true)
        setSystemError(false)
        try {
            const ENDPOINT = `${baseURL}${createCustomerViewTemplate}?pid=${sessionStorage.getItem('currentProjectId')}`
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    projectId: Number(projectId),
                    customerViewTemplateName: values.customerViewTemplateName,
                    appId: Number(values.appId),
                    customerViewTemplateCreateTemplateId: values.createTemplateId ? Number(values.createTemplateId) : null,
                    customerViewTemplateEditTemplateId: values.editTemplateId ? Number(values.editTemplateId) : null,
                    filterId: Number(values.filterId),
                    memo: values.memo,
                    customerViewTemplateSearch: sessionStorage.getItem(`${routeName}_drag_F_Type`),
                    customerViewTemplateAuthRole: customerViewTemplateAuthRole,
                    customerViewTemplateColumn: templates,
                    createdBy: info.accountId,
                    updatedBy: info.accountId
                }
            }

            const created = await instance.request(config)

            // if create is successful
            if (created) {
                setSystemError(false)
                setLoading(false)
                handleCancel();
                resetForm({ [values]: '' })
                if (templates && templates?.length) {
                    for (let template of templates) {
                        sessionStorage.removeItem(`customer_template_${template.Task_ID}`);
                    }
                }
                sessionStorage.removeItem(`${routeName}_drag_F_Type`)
                sessionStorage.removeItem(`${routeName}_drag_B_Type`)
                sessionStorage.removeItem(`routeName_timestamp__roleTag_${projectId}`)
                sessionStorage.removeItem(`customer_setting_drag`)
            }
        } catch (error) {
            setSystemError(true)
            setLoading(false)
        } finally {
            processing.current = false;
        }
        // resetForm();
        // 
    }

    // Update customer list template
    const handleUpdate = async (values) => {
        if (processing.current) return;
        processing.current = true;
        let templates = JSON.parse(sessionStorage.getItem(`${routeName}_drag_B_Type`));
        if (templates && templates?.length) {
            for (let template of templates) {
                const task = JSON.parse(sessionStorage.getItem(`customer_template_${template.Task_ID}`));
                template["customerTemplate"] = task;
            }
        }

        let customerViewTemplateAuthRole;
        if (values.limitType == '1') {
            const roleTag = sessionStorage.getItem(`routeName_timestamp__roleTag_${projectId}`);
            if (roleTag) {
                customerViewTemplateAuthRole = roleTag
            } else {
                customerViewTemplateAuthRole = [];
            }
        } else {
            customerViewTemplateAuthRole = null;
        }

        setLoading(true)
        setSystemError(false)
        try {
            const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
            const ENDPOINT = `${baseURL}${updateCustomerViewTemplate}${editId}`
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: Number(projectId),
                    customerViewTemplateName: values.customerViewTemplateName,
                    appId: Number(values.appId),
                    customerViewTemplateCreateTemplateId: values.createTemplateId ? Number(values.createTemplateId) : null,
                    customerViewTemplateEditTemplateId: values.editTemplateId ? Number(values.editTemplateId) : null,
                    filterId: Number(values.filterId),
                    memo: values.memo,
                    customerViewTemplateSearch: sessionStorage.getItem(`${routeName}_drag_F_Type`),
                    customerViewTemplateAuthRole: customerViewTemplateAuthRole,
                    customerViewTemplateColumn: templates,
                    createdBy: info.accountId,
                    updatedBy: info.accountId
                }
            }

            const updated = await instance.request(config)

            // if create is successful
            if (updated) {
                let isResetFilterInfo = JSON.parse(sessionStorage.getItem(`${routeName}_reset_filter_search`));
                if (isResetFilterInfo && isResetFilterInfo?.isReset == 1) {
                    let deletedObj = {isReset:0,resetField:[]};
                    
                    let validKeys = ['f1', 'f2', 'f3', 'f4', 'f5', 'f6'];
                    if (isResetFilterInfo?.resetField && isResetFilterInfo?.resetField.length > 0) {
                        validKeys = [...validKeys, ...isResetFilterInfo?.resetField];
                    }
                    console.log('validKeys',validKeys);
                    console.log('isResetFilterInfo?.resetField',isResetFilterInfo?.resetField);
                    let userInput = JSON.parse(sessionStorage.getItem(`retained_customer_list_${projectId}_${editId}`));
                    console.log('userInput',userInput);
                    Object.keys(userInput).forEach((key) => {
                        if(key.includes(".")){
                        let keySplit = key.split(".")[0];
                            if(validKeys.includes(keySplit)){
                                delete userInput[key];
                            } else if (validKeys.includes(key)) {
                                delete userInput[key];
                            }
                        } else if (validKeys.includes(key)) {
                            delete userInput[key];
                        }
                    });
                    console.log('userInput', userInput);
                    sessionStorage.setItem(`retained_customer_list_${projectId}_${editId}`, JSON.stringify(userInput));
                    sessionStorage.setItem(`${routeName}_reset_filter_search`, JSON.stringify(deletedObj));
                }
                setSystemError(false)
                setLoading(false)
                handleCancel();
            }
        } catch (error) {
            if (error.response.status === 400 || error.response.status === 403) {
                const matchErrorMessage = getErrorMessageWithErrorCode(error);
                setAlreadyDeletedErrorMessage(matchErrorMessage);
                setDeleteLoading(false)
            }
            else {
                setSystemError(true)
            }
            setLoading(false)
        } finally {
            processing.current = false;
        }
    }

    // Delete customer list template
    const handleDelete = async () => {
        if (processing.current) return;
        processing.current = true;
        const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
        setLoading(true)
        setSystemError(false)
        setDeleteError(false);
        try {
            const ENDPOINT = `${baseURL}${deleteCustomerViewTemplate}${editId}?pid=${sessionStorage.getItem('currentProjectId')}`
            const config = {
                method: deleteMethod,
                url: ENDPOINT,
                data: {
                    deletedBy: info.accountId
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
            const deleted = await instance.request(config)

            if (deleted) {
                setLoading(false)
                let selectedTemplateID = JSON.parse(sessionStorage.getItem('customer_view_selected_template_' + projectId))?.customerViewTemplateId;
                sessionStorage.removeItem('retained_customer_list_' + projectId + '_' + editId);
                if (editId == selectedTemplateID) {
                    // sessionStorage.setItem('retained_customer_list_' + projectId, JSON.stringify({ pid: projectId }));
                    sessionStorage.removeItem('customer_view_selected_template_' + projectId);
                    sessionStorage.removeItem('retained_customer_list_templateId_' + projectId);
                    //setPageNumber(0);
                    sessionStorage.setItem(`pagination_pageNo`, 0);
                }
                handleCancel();
            }
        } catch (error) {
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            setDeleteError(true)
            setDeleteErrorMessage(matchErrorMessage);
            setLoading(false)
        } finally {
            processing.current = false;
        }
    };

    const closeDialogModal = () => {
        setOpenDeleteModal(false)
        setIsOverFlow(false)
    }


    const displayInformationFilters = () => {
        let filteredFilterRecords = filterRecords;
        //console.log('-----------------------------------0', filteredFilterRecords)
        if (searchItemValue) {
            filteredFilterRecords = filterRecords.filter((item) => {
                return Object.values(_.pick(item, ["filterName", "filterManageName"])).some((value) => String(value).toLowerCase().includes(searchItemValue.toLowerCase()));
            });
            // console.log('-----------------------------------1')
            if (formValues?.filterId) {
                let prevSelectedItem = filteredFilterRecords.find(x => x.filterId == formValues.filterId);
                // console.log('-----------------------------------2', prevSelectedItem)
                if (!prevSelectedItem) {
                    prevSelectedItem = filterRecords.find(x => x.filterId == formValues.filterId);
                    // console.log('-----------------------------------3', prevSelectedItem)
                    if (prevSelectedItem) {
                        filteredFilterRecords = [prevSelectedItem, ...filteredFilterRecords];
                        // console.log('-----------------------------------4', filteredFilterRecords)
                    }
                }
            }
        }
        return filteredFilterRecords;
    }


    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            {/*this is the modal title section*/}
            {(loadingApp || loadingFilter || loadingField || loadingSearchableField || loadingRole || loading) && <Loading />}
            <ModalTitle className="text-blue-100 bold text-xl" title={title} />
            <Formik
                validateOnChange={false}
                validateOnBlur={false}
                enableReinitialize={true}
                initialValues={formValues}
                // validationSchema={customerListAddFormSchema(formType)}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    if (formType === 'add') {
                        handleAdd(values, resetForm)
                    } else {
                        handleUpdate(values, { setSubmitting })
                    }
                }}
            >

                {({ errors, setErrors }) => {
                    const first = Object.keys(errors)[0]
                    return (
                        <>
                            <FormObserver setTagShow={setTagShow} setErrors={setErrors} />
                            <div className='relative w-full h-full'>
                                <Form>
                                    {/* Template modal */}
                                    {/* <p>Template Modal</p> */}
                                    <div className='-mt-4' id='scroller'></div>
                                    <FormBodyContainer className='!px-0'>
                                        <div>
                                            <InputContainer>
                                                <TextBox
                                                    label='顧客一覧テンプレート名'
                                                    labelClassName='text-blue-100'
                                                    inputClassName='bg-blue-25 placeholder-gray-300'
                                                    placeholder="顧客一覧テンプレート名"
                                                    name="customerViewTemplateName"
                                                // isRequired
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label='予約APPURL（スマホアイコンをクリックして開く画面）'
                                                    inputClassName='bg-transparent text-blue-100'
                                                    labelClassName="text-blue-100"
                                                    border="border-unset border-b-[1px]"
                                                    name='appId'
                                                // isRequired
                                                >
                                                    <option
                                                        key='default'
                                                        value=''>APPを選択してください
                                                    </option>
                                                    {appRecords.length > 0 &&
                                                        appRecords.map((app) => (
                                                            <option
                                                                value={app.appId}
                                                                key={app.appId}>
                                                                {app.appName}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>

                                            <InputContainer>
                                                <SelectBox
                                                    label='顧客作成テンプレート'
                                                    inputClassName='bg-transparent text-blue-100'
                                                    labelClassName="text-blue-100"
                                                    border="border-unset border-b-[1px]"
                                                    name='createTemplateId'
                                                // isRequired
                                                >
                                                    <option
                                                        key='default'
                                                        value=''>顧客作成テンプレートを選択してください
                                                    </option>
                                                    {templatesCreate && templatesCreate.length > 0 &&
                                                        templatesCreate.map((app) => (
                                                            <option
                                                                value={app.customerEditTemplateId}
                                                                key={app.customerEditTemplateId}>
                                                                {app.customerEditTemplateName}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label='顧客編集テンプレート'
                                                    inputClassName='bg-transparent text-blue-100'
                                                    labelClassName="text-blue-100"
                                                    border="border-unset border-b-[1px]"
                                                    name='editTemplateId'
                                                // isRequired
                                                >
                                                    <option
                                                        key='default'
                                                        value=''>顧客編集テンプレートを選択してください
                                                    </option>
                                                    {templatesEdit && templatesEdit.length > 0 &&
                                                        templatesEdit.map((app) => (
                                                            <option
                                                                value={app.customerEditTemplateId}
                                                                key={app.customerEditTemplateId}>
                                                                {app.customerEditTemplateName}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                {/* There will be show and hide option by yes and no */}
                                                <SelectBox
                                                    label='表示情報フィルター（条件に一致した情報だけが表示されます）'
                                                    // label='表示情報フィルター（条件に一致した情報だけが表示されます）'
                                                    inputClassName='bg-transparent text-blue-100'
                                                    labelClassName="text-blue-100"
                                                    border="border-unset border-b-[1px]"
                                                    name='filterId'
                                                >
                                                    {/* hard coded option created by linkon changes requirment 20.10.22 */}
                                                    <option
                                                        key='default'
                                                        value='' >
                                                        フィルターを指定しない
                                                        {/* value=''>フィルターを指定しない */}
                                                    </option>
                                                    {displayInformationFilters().map((filter) => (
                                                        <option
                                                            value={filter.filterId}
                                                            key={filter.filterId}>
                                                            {filter.filterName}{filter.filterManageName && '（' + filter.filterManageName + '）'}
                                                        </option>
                                                    ))}
                                                </SelectBox>
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label={"表示条件（フィールド名・管理名）"}
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 mb-4"
                                                    type="text"
                                                    name="itemNameSearch"
                                                    placeholder={"表示条件（フィールド名・管理名）"}
                                                    // value={searchItemValue}
                                                    onBlur={(e) => setSearchItemValue(e.target.value)}
                                                />
                                            </InputContainer>

                                            <InputContainer className="">
                                                {/* commented by linkon showing error 15.10.22*/}
                                                <DragApp

                                                    title="検索エリアに表示するフィールド（最大6個）"
                                                    dragList={dragList}
                                                    buttonType={buttonType}
                                                    controlDragDrop={controlDragDrop}
                                                    fieldInfoList={searchableFieldRecords}
                                                    addLimit={6}
                                                    searchItemValue={searchItemValue}
                                                    dragForFilter={1}
                                                />
                                            </InputContainer>



                                            <InputContainer className="py-10">
                                                <DragApp
                                                    // title="顧客一覧表示フィールド設定"
                                                    title="顧客一覧表示フィールド設定（128個まで）(数が多いと表示までに時間がかかります)"
                                                    dragList={dragList2}
                                                    buttonType={buttonType2}
                                                    controlDragDrop={controlDragDrop2}
                                                    addLimit={128}
                                                    searchItemValue={searchItemValue}
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <SelectBox
                                                    label='このテンプレートを利用可能なロール'
                                                    inputClassName='bg-transparent text-blue-100'
                                                    labelClassName="text-blue-100"
                                                    border="border-unset border-b-[1px]"
                                                    name='limitType'
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
                                        </div>
                                        {/* <ModalFormFooter
                                            padding="!p-0"
                                            btn_title1={`${formType === 'add'
                                                ? 'キャンセル'
                                                : '削除'
                                                }`}
                                            btn_title2={`${formType === 'add'
                                                ? '保存'
                                                : '更新'
                                                }`}
                                            formType={formType}
                                            handleCancel={handleCancel}
                                            setOpenModal={setOpenDeleteModal}
                                            setIsOverFlow={setIsOverflow}
                                            memoClassName="!text-blue-100"
                                            buttonComponents={true}
                                            loading={loading}
                                            deleteLoading={deleteLoading}
                                        > */}

                                        <FormFooter
                                            btn_title1={formType === 'add' ? '保存' : '削除'}
                                            btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                            btn_title3={'キャンセル'}
                                            btn_title4="複製"
                                            continuousAddRemove
                                            buttonComponents={true}
                                            handleCancel={handleCancel}
                                            formType={formType}
                                            loading={loading}
                                            setOpenModal={setOpenDeleteModal}
                                            deleteLoading={deleteLoading}
                                            handleCopy={handleCopy}
                                        /*setContinuousAdd={setContinuousAdd}
                                        setIsOverFlow={setIsOverFlow}
                                        deleteLoading={deleteLoading}*/
                                        ></FormFooter>
                                        {/* ----error---- */}
                                        <ErrorMessage>
                                            {errors[first]}
                                            {alreadyDeletedErrorMessage && !errors[first] && `${alreadyDeletedErrorMessage}`}
                                            {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                        </ErrorMessage>
                                    </FormBodyContainer>
                                </Form>
                                {openDeleteModal && (
                                    <DialogModal
                                        title='削除'
                                        btn_title='削除'
                                        cancel_title='キャンセル '
                                        handleButtonLeft={handleDelete}
                                        handleButtonRight={closeDialogModal}
                                        values={initialValues}
                                        errors={<span className={`${deleteErrorMessage} ? "visible" : "invisible"`}>{deleteError && deleteErrorMessage && `${deleteErrorMessage}`}</span>}
                                    >
                                        <div className='text-center mt-[1rem]'>
                                            <p>選択したデータを削除します。</p>
                                            <div className='text-orange-500 mt-[1rem]'>削除したデータは復元できません。</div>
                                        </div>
                                    </DialogModal>
                                )}

                                {copyModal && (
                                    <DialogModal
                                        title="複製"
                                        btn_title="キャンセル"
                                        cancel_title="複製"
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
                        </>

                    );
                }}
            </Formik>
        </WhiteModalWrapper >
    );
};
export default TemplateModal