import _ from 'lodash';
import React, { memo, useContext, useEffect, useLayoutEffect, useState, useRef } from 'react';
import { RiSettings5Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import OutlineButtonLinkContainer from '../../components/Button/OutlineButtonLinkContainer';
import Controls from '../../components/controls/Controls';
import Footer from '../../components/Footer/Footer';
import CustomerForm from '../../components/Form/CustomerForm';
import Loading from '../../components/Loading/Loader';
import DialogModal from '../../components/Modal/DialogModal';
import AddButton from '../../components/Table/FooterSection/AddButton';
import TableControls from '../../components/Table/TableControls';
import OutlineSelection from '../../components/Table/UpperSection/OutlineSelection';
import { SessionStorageOnReload } from '../../helper/browserSessionStorage/SessionStorageOnReload';
import { FilterComMethods } from '../../helper/functions/FilterComMethods';

import { GoDeviceMobile } from 'react-icons/go';
import Pagination from '../../components/Pagination/Pagination';
import fetchRecords from '../../lib/filterFetch';
import {
    adminReservationMailRemind,
    baseURL, createMethod, listCustomer, updateCustomerReservation,
    listCustomerView, listCustomerViewTemplate, listField, listInstitute, listMethod, listProjectData
} from '../../restapi/queries';
import { DataManageContext } from '../../routes/Router';
import { instance } from '../../services/axios.js';
import { ItemData } from '../../utilities/projectBtnItemData';
import Customer from './Customer';
import TemplateDynamicView from './TemplateDynamicView';
import TemplateFilterViewDynamic from './TemplateFilterViewDynamic';
import PaginationCustomerList from '../../components/Pagination/PaginationCustomerList';

const filter = fetchRecords.filter;

const recordsLabel = '顧客';

// GLOBAL DECLARATION END
const CustomerList = memo(() => {
    const processing = useRef(false);
    const role = useSelector((state) => state.auth.role);
    const accountUUID = useSelector((state) => state.auth.accountUUID);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(true);
    const { pathname } = useLocation();
    const [openModal, setOpenModal] = useState(false);
    const [customerAddModal, setCustomerAddModal] = useState(false);
    const [emailModal, setEmailModal] = useState(false);
    const [isOverFlow, setIsOverFlow] = useState(false);
    const [instituteOptions, setInstituteOptions] = useState([]);
    const [numberOfRecords, setNumberOfRecords] = useState(0);
    const [selectedRow, setSelectedRow] = useState('');
    const [dataManage, setDataManage] = useContext(DataManageContext);
    const [customerList, setCustomerList] = useState([]);
    const [headerFieldList, setHeaderFieldList] = useState([]);
    const [templates, setTemplates] = useState([]);
    const [allFields, setAllFields] = useState([]);
    const [initialTemplateId, setInitialTemplateId] = useState('');
    const [systemError, setSystemError] = useState(false);
    const [filterRender, setFilterRender] = useState(false);
    const [filterRefresh, setFilterRefresh] = useState(false);
    const [headerFieldLists, setFieldLists] = useState([]);
    const commandFieldList = ['00000a01', '00000a02', '00000a03', '00000a04', '00000a05'];

    const [customerValues, setCustomerValues] = useState({})

    const { getInitialState, getInitialStateCustomerList, fetchSessionStorageData } = SessionStorageOnReload();
    const { setSelectedValueCustomerList } = SessionStorageOnReload(); // Manage reload option flag

    const [appURL, setAppURL] = useState('');
    const { info } = useSelector((state) => state.auth);
    const projectId = sessionStorage.getItem('currentProjectId')
    const [pageNumber, setPageNumber] = useState(+sessionStorage.getItem(`pagination_pageNo`) || 0);


    const [customerViewTemplateCreateTemplateId, setCustomerViewTemplateCreateTemplateId] = useState(null);
    // GLOBAL DECLARATION START
    // const initializeValue = {
    //     pid: sessionStorage.getItem('currentProjectId'),
    //     templateId: JSON.parse(
    //         sessionStorage.getItem('retained_customer_list_templateId_' + sessionStorage.getItem('currentProjectId'))
    //     )?.templateId,

    //     // reservationStatus: JSON.parse(sessionStorage.getItem('retained_customer_list'))?.reservationStatus,
    //     // instituteId: JSON.parse(sessionStorage.getItem('retained_customer_list'))?.instituteId,
    //     // insuranceSymbol: JSON.parse(sessionStorage.getItem('retained_customer_list'))?.insuranceSymbol,
    //     // insuranceNo: JSON.parse(sessionStorage.getItem('retained_customer_list'))?.insuranceNo,
    //     // nameKana: JSON.parse(sessionStorage.getItem('retained_customer_list'))?.nameKana,
    //     // templateId: JSON.parse(
    //     //     sessionStorage.getItem('retained_customer_list_' + sessionStorage.getItem('currentProjectId'))
    //     // )?.templateId,
    //     // zipCode: JSON.parse(sessionStorage.getItem('retained_customer_list'))?.zipCode,
    //     // customerId: JSON.parse(sessionStorage.getItem('retained_customer_list'))?.customerId,
    //     // changeTemplateResetFlag: true
    // };
    // set new selected value for customer when component run
    // setSelectedValueCustomerList(initializeValue,
    //     JSON.parse(
    //         sessionStorage.getItem('retained_customer_list_' + sessionStorage.getItem('currentProjectId'))
    //     )?.templateId || ""
    // );

    // const { searchParamsValues } = getInitialStateCustomerList(pathname);
    // const {
    //     // handleChange, handleChange2,
    //     // searchParams,
    //     // values,
    //     // setValues,
    //     // paramsObj, setParamsObj
    //     calendarDateGet,
    // } = FilterComMethods(initializeValue);
    // const { handleChange, handleChange2, searchParams, values, setValues, calendarDateGet } = FilterComMethods(initializeValue);

    const [newSearchParams, setNewSearchParams] = useState("")

    useEffect(() => {
        filter({
            setId: 'instituteId',
            setName: 'instituteName',
            endPoint: listInstitute,
            setOptions: setInstituteOptions,
        });
    }, [pathname, setCustomerValues]);
    // }, [pathname, setValues]);

    // useEffect(() => {
    //     // setDataManage({
    //     //     ...dataManage,
    //     //     func: calendarDateGet,
    //     //     start: 'reservationDateTimeFrom',
    //     //     end: 'reservationDateTimeTo',
    //     // }); // Date Picker Filter
    // }, []);


    useEffect(() => {
        getCustomerViewTemplateFieldList(customerValues.templateId);
        // getCustomerViewTemplateFieldList(values.templateId);
    }, [customerValues.templateId]);
    // }, [values.templateId]);


    useEffect(() => {
        if (templates.length > 0 && customerValues?.templateId) {
            const prevSelectedTemplateId = customerValues.templateId;
            const findItemCreateTemplateId = templates.find(template => template.id == prevSelectedTemplateId)?.createTemplateId;

            if (findItemCreateTemplateId) setCustomerViewTemplateCreateTemplateId(findItemCreateTemplateId)
        }
    }, [customerValues, templates])

    // プロジェクトに入ったときにapp_listが表示されるとは限らない
    useEffect(() => {
        getProjectData();
    }, [sessionStorage.getItem('currentProjectId')]);

    async function getProjectData() {
        if (processing.current) return;
        processing.current = true;
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            if (projectId) {
                const ENDPOINT = `${baseURL}${listProjectData}${projectId}`;
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                sessionStorage.setItem(
                    `customer_view_category_filter_` + projectId,
                    JSON.stringify(response?.data?.category)
                );
                sessionStorage.setItem(
                    `customer_view_institute_filter_` + projectId,
                    JSON.stringify(response?.data?.institute)
                );
                sessionStorage.setItem(
                    `customer_view_item_filter_` + projectId,
                    JSON.stringify(response?.data?.item)
                );
                sessionStorage.setItem(
                    `customer_view_counselor_filter_` + projectId,
                    JSON.stringify(response?.data?.counselor)
                );
                sessionStorage.setItem(
                    `customer_view_busRoute_filter_` + projectId,
                    JSON.stringify(response?.data?.busRoute)
                );
                setFilterRefresh(!filterRefresh)
            }
        } catch (err) {
            console.log('Field err', err);
        } finally {
            processing.current = false;
        }
    }

    const openReservationSite = (e) => {
        e.preventDefault();
        const projectId = sessionStorage.getItem('currentProjectId');
        let sessionTemplateListInfo = JSON.parse(sessionStorage.getItem('customer_view_template_' + projectId));

        let selectedTemplate =
            sessionTemplateListInfo?.length > 0 &&
            sessionTemplateListInfo.find((temp) => temp.customerViewTemplateId == customerValues.templateId);
        // sessionTemplateListInfo.find((temp) => temp.customerViewTemplateId == values.templateId);

        let openAppUrl = selectedTemplate?.appURL ?? '';
        if (selectedTemplate && openAppUrl != '') {
            let reservationURL = 'https://' + selectedTemplate.appURL;
            window.open('https://' + openAppUrl + '?c=' + accountUUID);
        }
    };

    const getAllFieldList = async () => {
        setLoading(true)
        console.log('loadingStart');
        const projectId = sessionStorage.getItem('currentProjectId');
        let getCommandFieldListFromSession = JSON.parse(sessionStorage.getItem('command_field_list_' + projectId));
        console.log('getCommandFieldListFromSession', getCommandFieldListFromSession);
        if (getCommandFieldListFromSession) {
            setAllFields(getCommandFieldListFromSession);
        } else {
            try {
                // let fieldType = '0,1,2,3,4,5,6,7,8,9';
                let fieldType = '9';
                if (projectId) {
                    const ENDPOINT = `${baseURL}${listField}?pid=${projectId}&fieldType=${fieldType}`;
                    const config = {
                        method: listMethod,
                        url: ENDPOINT,
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    };
                    const response = await instance.request(config);
                    setAllFields(response?.data?.records);
                    //setLoading(false);

                }
            } catch (err) { console.log("error", err) }
            setLoading(false)
            console.log('loadingEnd');
        }
    };

    const getFieldCode = (fieldId) => {
        let fieldRow = allFields.length > 0 && allFields.find((item) => item.fieldId == fieldId);
        if (typeof fieldRow != 'undefined') {
            return fieldRow.fieldCode;
        }
    };

    // 2024/06/20 haga 追加
    // useEffectを利用し、elementに配列がセットされた後動作するよう変更
/*
    useEffect(() => {
        if (document.getElementsByName("templateId")[0]?.value) {
            let _templateId = document.getElementsByName("templateId")[0]?.value
            let templateData = JSON.parse(sessionStorage.getItem('customer_view_template_' + projectId));
            setCustomerViewTemplateCreateTemplateId(templateData.find(template => template.customerViewTemplateId == _templateId).customerViewTemplateCreateTemplateId);
        }
    }, [document.getElementsByName("templateId")[0]?.value]);
*/

    const getCustomerViewTemplate = async () => {
        // setLoading(true);
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            //retained_customer_list_templateId_265
            const templateIdSession = JSON.parse(sessionStorage.getItem(`retained_customer_list_templateId_${projectId}`))?.templateId
            //console.log("🚨templateIdSession key name : ", `retained_customer_list_templateId_${projectId}`)
            //console.log("🚨templateIdSession", templateIdSession)

            // if (templateIdSession) {
            //     //&& typeof JSON.parse(sessionStorage.getItem(`retained_${pathname}_${projectId}_${templateIdSession}`))?.templateId == 'undefined'
            //     console.log("🚨🚨🚨🚨Debug🚨🚨🚨🚨🚨")
            //     // firstDropdownTemplateId =
            //     //     JSON.parse(
            //     //         sessionStorage.getItem('retained_customer_list_' + projectId))?.templateId ?? firstDropdownTemplateId;

            //     // retained_customer_list_templateId_265
            //     let pathname = window.location.pathname.split('/').pop();
            //     let initialObject = JSON.parse(sessionStorage.getItem(`retained_${pathname}_${projectId}_${templateIdSession}`));
            //     console.log("Initial key", `retained_${pathname}_${projectId}_${templateIdSession}`)
            //     console.log("Initial object", initialObject)

            //     initialObject.templateId = templateIdSession;
            //     sessionStorage.setItem(`retained_${pathname}_${projectId}_${templateIdSession}`, JSON.stringify(initialObject));

            //     console.log("newValuesObj ✋✋✋✋---------4", initialObject);
            //     console.log("🔄️✅✅ getCustomerViewTemplate initialObject", { ...initialObject })
            //     setCustomerValues({ ...initialObject }); // new added linkon

            //     let searchParamsLocal = new URLSearchParams({ ...initialObject });
            //     searchParamsLocal = searchParamsLocal.toString();
            //     console.log("🚨 initializeValue Local  UE 1 IF:", { ...initialObject })
            //     console.log("🚨 SearchParams Local  UE 1:", searchParamsLocal)
            //     setNewSearchParams(searchParamsLocal)

            //     return;

            // }

            const ENDPOINT = `${baseURL}${listCustomerViewTemplate}?pid=${projectId}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };

            setLoading(true)
            const response = await instance.request(config);
            const { records = [] } = response?.data || {};

            setTemplates(
                records.map((template) => {
                    template['id'] = template?.customerViewTemplateId;
                    template['value'] = template?.customerViewTemplateName;
                    template['createTemplateId'] = template?.customerViewTemplateCreateTemplateId;
                    return template;
                })
            );

            sessionStorage.setItem('customer_view_template_' + projectId, JSON.stringify(records));
            let sessionTemplateListInfo = records;
            let firstDropdownTemplateId = records[0]?.customerViewTemplateId;
            console.log("🚨 firstDropdownTemplateId", firstDropdownTemplateId)
            if (templateIdSession) {
                //&& typeof JSON.parse(sessionStorage.getItem(`retained_${pathname}_${projectId}_${templateIdSession}`))?.templateId == 'undefined'
                console.log("🚨🚨🚨🚨Debug🚨🚨🚨🚨🚨")
                firstDropdownTemplateId = templateIdSession;
                // firstDropdownTemplateId =
                //     JSON.parse(
                //         sessionStorage.getItem('retained_customer_list_' + projectId))?.templateId ?? firstDropdownTemplateId;

                // retained_customer_list_templateId_265
                let pathname = window.location.pathname.split('/').pop();
                let initialObject = JSON.parse(sessionStorage.getItem(`retained_${pathname}_${projectId}_${templateIdSession}`));
                //console.log("Initial key", `retained_${pathname}_${projectId}_${templateIdSession}`)
                //console.log("Initial object", initialObject)

                initialObject.templateId = templateIdSession;
                sessionStorage.setItem(`retained_${pathname}_${projectId}_${templateIdSession}`, JSON.stringify(initialObject));

                //console.log("newValuesObj ✋✋✋✋---------4", initialObject);
                //console.log("🔄️✅✅ getCustomerViewTemplate initialObject", { ...initialObject })
                setCustomerValues({ ...initialObject }); // new added linkon

                let searchParamsLocal = new URLSearchParams({ ...initialObject });
                searchParamsLocal = searchParamsLocal.toString();
                //console.log("🚨 initializeValue Local  UE 1 IF:", { ...initialObject })
                //console.log("🚨 SearchParams Local  UE 1:", searchParamsLocal)
                setNewSearchParams(searchParamsLocal)
                // setLoading(false)
                // console.log('loadingOFFF111');
            } else
            // if (!templateIdSession) 
            {
                setLoading(true)
                // console.log("if there is no templateIdSession templateIdSession")
                let pathname = window.location.pathname.split('/').pop();
                firstDropdownTemplateId = firstDropdownTemplateId
                setCustomerValues({ ...customerValues, templateId: firstDropdownTemplateId, pid: projectId }); // new added linkon
                sessionStorage.setItem(`retained_${pathname}_${projectId}_${templateIdSession}`,
                    JSON.stringify({ ...customerValues, templateId: firstDropdownTemplateId, pid: projectId }));
                sessionStorage.setItem(`retained_customer_list_templateId_${projectId}`, JSON.stringify({ templateId: firstDropdownTemplateId }))//added by sakil
                let searchParamsLocal = new URLSearchParams({ ...customerValues, templateId: firstDropdownTemplateId, pid: projectId });
                searchParamsLocal = searchParamsLocal.toString();
                // console.log("🚨 initializeValue Local  UE 1 ELSE:", { ...customerValues, templateId: firstDropdownTemplateId, pid: projectId })
                //console.log("🚨 SearchParams Local  UE 1:", searchParamsLocal)
                setNewSearchParams(searchParamsLocal)
                setLoading(false)
                console.log('loadingOFFF222');
            }

            if (sessionTemplateListInfo && sessionTemplateListInfo?.length > 0) {
                let selectedTemplateField = sessionTemplateListInfo.find(
                    (item) => item.customerViewTemplateId == firstDropdownTemplateId
                );
                sessionStorage.setItem(
                    'customer_view_selected_template_' + projectId,
                    JSON.stringify(selectedTemplateField)
                );

                if (
                    selectedTemplateField?.customerViewTemplateColumn &&
                    selectedTemplateField?.customerViewTemplateColumn.length > 0
                ) {
                    let fieldInfoArray = selectedTemplateField?.customerViewTemplateColumn
                        .map((item) => {
                            if (item.customerTemplate) {
                                return { position: item.currentPos, templateInfo: item.customerTemplate };
                            }
                        })
                        .filter((e) => typeof e !== 'undefined');
                    fieldInfoArray = _.orderBy(fieldInfoArray, ['position'], ['asc']);
                    let afterSortedFieldList = fieldInfoArray.map((item) => {
                        let fCodes = getFieldCode(item?.templateInfo?.fieldType);
                        if (commandFieldList.includes(fCodes)) {
                            let obj = { ...item.templateInfo, column_width: 'w-2.5' };
                            return obj;
                        } else {
                            return item.templateInfo;
                        }
                    });
                    setFieldLists(afterSortedFieldList);
                    setFilterRender(!filterRender)
                } else {
                    setFieldLists([]);
                    setLoading(false);
                    console.log('loadingOFFF333');
                }
            }
            // firstDropdownTemplateId = firstDropdownTemplateId ?? '';
            setAppURL(response?.data?.records[0]?.appURL);
            // setLoading(false);
            // console.log('loadiiingOFFFFFFF');

        } catch (err) {
            setLoading(false);
            console.log("Error", err)
            console.log('loadingOFFF4444');

        }
    };
    const getCustomerViewTemplateFieldList = async (templateIdValue) => {
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            let sessionTemplateListInfo = JSON.parse(sessionStorage.getItem('customer_view_template_' + projectId));
            if (sessionTemplateListInfo && sessionTemplateListInfo?.length > 0) {
                let selectedTemplateField = sessionTemplateListInfo.find(
                    (item) => item.customerViewTemplateId == templateIdValue
                );
                sessionStorage.setItem(
                    'customer_view_selected_template_' + projectId,
                    JSON.stringify(selectedTemplateField)
                );
                if (
                    selectedTemplateField?.customerViewTemplateColumn &&
                    selectedTemplateField?.customerViewTemplateColumn.length > 0
                ) {
                    let fieldInfoArray = selectedTemplateField?.customerViewTemplateColumn
                        .map((item) => {
                            if (item.customerTemplate) {
                                return { position: item.currentPos, templateInfo: item.customerTemplate };
                            }
                        })
                        .filter((e) => typeof e !== 'undefined');
                    fieldInfoArray = _.orderBy(fieldInfoArray, ['position'], ['asc']);
                    let afterSortedFieldList = fieldInfoArray.map((item) => {
                        let fCodes = getFieldCode(item?.templateInfo?.fieldType);
                        if (commandFieldList.includes(fCodes)) {
                            let obj = { ...item.templateInfo, column_width: 'w-2.5' };
                            return obj;
                        } else {
                            return item.templateInfo;
                        }
                    });

                    setFieldLists(afterSortedFieldList);
                } else {
                    setFieldLists([]);
                    // setLoading(false);
                    // console.log('loadingOFFF666');

                }
            } else {
                setLoading(false);
                console.log('loadingOFFF7777');
            }
        } catch (err) {
            console.log('Field err', err);
        }
    };

    const closeEmailModal = () => {
        setEmailModal(false);
        setIsOverFlow(false);
    };

    async function handleOnPressModalSaveButton(e, formData) {
        if (e) e.preventDefault();
        let formDataForUpdate = {};
        setCustomerAddModal(false);
        const pid = sessionStorage.getItem('currentProjectId');
        formDataForUpdate.updateFieldList = formData;
        formDataForUpdate.projectId = pid;
        formDataForUpdate.createdBy = info.accountId;
        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${updateCustomerReservation}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: formDataForUpdate,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const copied = await instance.request(config);

            if (copied) {
                setSystemError(false);
            }
            navigate('/customer_list');
            setLoading(false);
        } catch (error) {
            if (error.response.status === 409) {
                setSystemError(false);
            } else {
                setSystemError(true);
            }
            setLoading(false);
        }
        setLoading(false);
    }

    const remindMail = async () => {
        setLoading(true);
        const config = {
            method: createMethod,
            url: `${baseURL}${adminReservationMailRemind}`,
            body: JSON.stringify({ reservationNo: selectedRow }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };
        const res = await instance.request(config);

        setEmailModal(false);
        setIsOverFlow(false);
        setLoading(false);
    };

    const objProps = {
        customers: customerList,
        setEmailModal,
        setIsOverFlow,
        setSelectedRow,
    };


    useEffect(() => {
        console.log("✅RUN getAllFieldList && getCustomerViewTemplate")
        getAllFieldList();
        getCustomerViewTemplate();
    }, []);


    useEffect(() => {
        setLoading(true)
        //console.log("🔄️check session has data or not ? if there is data search according to the data and set the value to the state RUN : UE 2");
        let pathname = window.location.pathname.split('/').pop();
        if (customerValues.templateId) {
            const templateIdDataInSession = JSON.parse(sessionStorage.getItem(`retained_${pathname}_${projectId}_${customerValues.templateId}`))
            // console.log('setIniStartttttedKey',`retained_${pathname}_${projectId}_${customerValues.templateId}`)
            // console.log('setIniStartttttedValue',templateIdDataInSession);
            if (templateIdDataInSession) {
                // console.log("🔄️There is data in session of templateId Set the value to the state RUN UE 2.1:", templateIdDataInSession)
                setCustomerValues({ ...templateIdDataInSession })
                let searchParamsLocal = new URLSearchParams({ ...templateIdDataInSession });
                searchParamsLocal = searchParamsLocal.toString();
                // console.log("🚨 SearchParams Local if :", searchParamsLocal)
                setNewSearchParams(searchParamsLocal)
            } else {
                // there is no data so that make initial search
                const initializeValue = {
                    pid: sessionStorage.getItem('currentProjectId') || "",
                    templateId: JSON.parse(sessionStorage.getItem(`retained_${pathname}_templateId_${sessionStorage.getItem('currentProjectId')}`))?.templateId || "",
                };
                setCustomerValues({ ...initializeValue, templateId: customerValues.templateId })
                let searchParamsLocal = new URLSearchParams({ ...initializeValue });
                searchParamsLocal = searchParamsLocal.toString();
                // console.log("🚨 SearchParams Local else :", searchParamsLocal)
                setNewSearchParams(searchParamsLocal)
                sessionStorage.setItem(
                    `retained_${pathname}_${sessionStorage.getItem('currentProjectId')}_${customerValues.templateId}`,
                    JSON.stringify({ ...initializeValue, templateId: customerValues.templateId })
                )
            }
        }
        // setLoading(false)
        // console.log('loadingOFFFFFF1111');
    }, [customerValues.templateId])

    // handle change templateId
    const templateIdChange = async (e) => {
        try {
            setLoading(true)
            const { name, value } = e.target;
            console.log("🧑‍💻 Template Id Changes :", name, ":", value)
            setCustomerValues({ [name]: value }) // set in state

            setCustomerViewTemplateCreateTemplateId(templates.find(template => template.customerViewTemplateId == value).customerViewTemplateCreateTemplateId)

            setPageNumber(0)
            sessionStorage.setItem(`pagination_pageNo`, 0);
            let pathname = window.location.pathname.split('/').pop();
            sessionStorage.setItem(`retained_${pathname}_templateId_${projectId}`, JSON.stringify({ [name]: value }))
            setFilterRefresh(!filterRefresh)

        } catch (error) {
            console.log("template id changes error", error)
        }
    }
    // onChange value
    const customerOnChangeValue = (e) => {
        const { name, value } = e.target;
        setCustomerValues({ ...customerValues, [name]: value })
        setPageNumber(0)
        sessionStorage.setItem(`pagination_pageNo`, 0);
        console.log("🧑‍💻 Template customerOnChangeValue :", { ...customerValues, [name]: value })
        let pathname = window.location.pathname.split('/').pop();
        sessionStorage.setItem(`retained_${pathname}_${projectId}_${customerValues.templateId}`, JSON.stringify({ ...customerValues, [name]: value }))

    }
    const customerOnChangeValueSearch = (e) => {
        const { name, value } = e.target;
        console.log("🧑‍💻 Template customerOnChangeValueSearch :", name, ":", value)
        setCustomerValues({ ...customerValues, [name]: value })
        setPageNumber(0)
        sessionStorage.setItem(`pagination_pageNo`, 0);
        let pathname = window.location.pathname.split('/').pop();
        let templateId = JSON.parse(
            sessionStorage.getItem('retained_customer_list_' + sessionStorage.getItem('currentProjectId'))
        )?.templateId

        sessionStorage.setItem(`retained_${pathname}_${projectId}_${customerValues.templateId}`, JSON.stringify({ ...customerValues, [name]: value }))
    }
    // enter click
    const customerOnEnterClick = (e) => {
        const { name, value } = e.target;
        let pathname = window.location.pathname.split('/').pop();
        const templateIdDataInSession = JSON.parse(sessionStorage.getItem(`retained_${pathname}_${projectId}_${customerValues.templateId}`))
        // setCustomerValues({ ...templateIdDataInSession })

        setCustomerValues({ ...templateIdDataInSession, [name]: value })
        setPageNumber(0)
        sessionStorage.setItem(`pagination_pageNo`, 0);
        console.log("🧑‍💻 Template customerOnEnterClick :", { ...customerValues, [name]: value })
        sessionStorage.setItem(`retained_${pathname}_${projectId}_${customerValues.templateId}`, JSON.stringify({ ...templateIdDataInSession, [name]: value }))
        // after enter click it will search
        let searchParamsLocal = new URLSearchParams({ ...templateIdDataInSession, [name]: value });
        searchParamsLocal = searchParamsLocal.toString();
        console.log("🚨 SearchParams Local else :", searchParamsLocal)
        setNewSearchParams(searchParamsLocal)
    }
    // console.log('customerValues',customerValues);
    return (
        <>
            {!customerAddModal &&
                (<div>
                    {/* {status === 'loading' && <Loading />} */}
                    <div className={`${isOverFlow && "overflow-hidden"} `}>
                        {loading && <Loading />}
                        {/*  ----- outline button section ----- */}
                        <OutlineButtonLinkContainer ItemData={ItemData} />
                        <div className="px-4">
                            {/* ------ Filter section ---------*/}
                            <TableControls.UpperSection>
                                <TableControls.NumberOfRecords
                                    recordsLabel={recordsLabel}
                                    numberOfRecords={numberOfRecords}
                                />
                                <div className="flex justify-between">
                                    {customerValues?.templateId && customerValues?.pid && (
                                        <TemplateFilterViewDynamic
                                            // handleChange={handleChange}
                                            // handleChange2={handleChange2}
                                            // values={values}
                                            handleOnChangeText={customerOnChangeValueSearch}
                                            handleChange={customerOnEnterClick} // handle enter click
                                            handleChange2={customerOnChangeValue} // handle onChange
                                            customerValuesProps={customerValues}
                                            filterRender={filterRender}
                                            filterRefresh={filterRefresh}
                                        />
                                    )}
                                    {/* test end */}
                                    {customerValues.templateId && (
                                        //  {values.templateId && ( */}
                                        <div>
                                            <button
                                                className="h-7 cursor-pointer hover:bg-blue-300 align-middle items-center px-1
                                    font-bold bg-blue-100 w-[126px] ml-4 flex text-white justify-between "
                                                onClick={openReservationSite}
                                            >
                                                <GoDeviceMobile />
                                                <span className="mx-2">新規予約</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </TableControls.UpperSection>
                            {/* ----Table Section----  */}
                            <div className="table-wrapper scroll-bar overflow-x-auto">
                                <TemplateDynamicView
                                    objProps={objProps}
                                    templateIdValue={customerValues.templateId}
                                    // templateIdValue={values.templateId}
                                    allFields={allFields}
                                    headerFieldLists={headerFieldLists}
                                />
                            </div>

                            <Footer classNameDiv="hidden">
                                <OutlineSelection
                                    defaultValue={
                                        templates.length > 0
                                            ? false
                                            : "テンプレートを選択してください"
                                    }
                                    name="templateId"
                                    options={templates}

                                    value={customerValues.templateId}
                                    onChange={templateIdChange}

                                // value={values.templateId}
                                // onChange={handleChange}
                                />

                                {
                                    customerValues.templateId > 0 &&
                                    <PaginationCustomerList
                                        itemsPerPage={300}
                                        records={customerList}
                                        setRecords={setCustomerList}
                                        setLoading={setLoading}
                                        setNumberOfRecords={setNumberOfRecords}
                                        setHeaderFieldList={setHeaderFieldList}
                                        endPoint={listCustomerView}
                                        subQueryString={newSearchParams}
                                        newSearchParams={newSearchParams}
                                        customerValues={customerValues}
                                        pageNumber={pageNumber}
                                        setPageNumber={setPageNumber}
                                    />
                                }
                                {
                                    // customerValues.templateId > 0 && (
                                    // customerValues.templateId > 0 && newSearchParams && (
                                    // {values.templateId > 0 && (
                                    // <PaginationCustomerList
                                    //     itemsPerPage={300}
                                    //     records={customerList}
                                    //     setRecords={setCustomerList}
                                    //     setLoading={setLoading}
                                    //     setNumberOfRecords={setNumberOfRecords}
                                    //     setHeaderFieldList={setHeaderFieldList}
                                    //     endPoint={listCustomerView}
                                    //     subQueryString={newSearchParams
                                    //         // searchParams ? searchParams : searchParamsValues
                                    //         // newSearchParams ? newSearchParams : searchParamsValues
                                    //     }
                                    //     newSearchParams={newSearchParams}
                                    // />
                                    // )
                                }

                                {role.r9 == 1 && (
                                    <div className="pb-2 ">
                                        <AddButton
                                            text="顧客追加"
                                            onClick={() => setCustomerAddModal(customerViewTemplateCreateTemplateId ? true : false)}
                                        />

                                        <AddButton
                                            text="設定"
                                            endIcon={<RiSettings5Fill />}
                                            onClick={() => navigate("/customer_setting")}
                                        />
                                    </div>
                                )}
                            </Footer>
                        </div>
                    </div>
                </div>
                )}
            {openModal && (
                <Controls.PopUpModal>
                    <Customer closeModal={setOpenModal} setIsOverFlow={setIsOverFlow} />
                </Controls.PopUpModal>
            )}
            {emailModal && (
                <DialogModal
                    title="リマインドメール再送"
                    btn_title="いいえ"
                    cancel_title="はい"
                    colorType=""
                    setIsOverFlow={setIsOverFlow}
                    handleButtonLeft={closeEmailModal}
                    handleButtonRight={remindMail}
                >
                    <div className="text-left mt-[1rem]">
                        <p>リマインドメールを再送します。</p>
                        <div className="mt-[1rem]">
                            メール送信完了まで最大で5分程度かかる場合があります
                        </div>
                    </div>
                </DialogModal>
            )}

            {customerAddModal && (
                <CustomerForm
                    // initialValues={values}
                    // templateId={values.templateId}
                    initialValues={customerValues}
                    templateId={customerValues.templateId}
                    setModalOpen={setCustomerAddModal}
                    handleOnPressSave={handleOnPressModalSaveButton}
                    formType="add"
                />
            )}
        </>
    );
});
export default CustomerList;
