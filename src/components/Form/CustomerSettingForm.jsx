import { Form, Formik } from 'formik';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Page1440Body from '../Page1440/Page1440Body';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { tasks } from '../ListElementDrag/data';
import { tasks1 } from '../ListElementDrag/dataExpandable';
import ButtonGTypeComponent from '../ListElementDrag/ButtonTypeComponent/ButtonGTypeComponent';
import TemplateModal from '../Modal/WhiteModal/TemplateModal';
import LabelWithListActionAddEdit, {
    LabelWithListActionAddEditIcon,
} from '../ListElementDrag/static/LabelWithListActionAddEdit';
import EditIconSVG from '../SVG/EditIconSVG';
import AddSVG from '../SVG/AddSVG';
import CustomerSettingTemplate from '../Modal/WhiteModal/CustomerSettingTemplate/CustomerSettingTemplate';
import {
    baseURL,
    createCustomerViewTemplate,
    listCustomerViewTemplate,
    customerTemplateList,
    customerTemplateUpdate,
    updateMethod,
    listMethod,
    customerEditTemplateRead,
} from '../../restapi/queries';
import { instance } from '../../services/axios';
import Loading from '../Loading/Loader';
import { BsFillPencilFill } from 'react-icons/bs';
import FormFooterButtons from './FormComponents/FormFooterButtons';
import Note from './FormInputs/Note';

const CustomerSettingForm = ({ formType, initialValues, setIsOverflow }) => {
    const navigate = useNavigate();
    const processing = useRef(false);
    const handleCancel = () => {
        navigate('/customer_list');
        setOpenModal(false);
        removeFromSessionStorage();
    };
    const [openCustomerAddTemplate, setOpenCustomerAddTemplate] = useState(false);
    const [customerAddTemplateFromType, setCustomerAddTemplateFromType] = useState('add');
    const [customerEditTemplateFromType, setCustomerEditTemplateFromType] = useState('add');
    const [customerAddTemplateObject, setCustomerAddTemplateObject] = useState({
        customerEditTemplateId: '',
        customerEditTemplateColumn: [],
    });
    const [customerEditTemplateObject, setCustomerEditTemplateObject] = useState({
        customerEditTemplateId: '',
        customerEditTemplateColumn: [],
    });

    const [openCustomerEditTemplate, setOpenCustomerEditTemplate] = useState(false);
    const [openModal, setOpenModal] = useState(false); // Controlling Open modal
    const [openEditModal, setOpenEditModal] = useState(false); // Controlling Edit modal
    const [templates, setTemplates] = useState([]);
    const [templatesAdd, setTemplatesAdd] = useState([]);
    const [templatesEdit, setTemplatesEdit] = useState([]);
    const [loading, setLoading] = useState(false);
    const [templateMemo, setTemplateMemo] = useState('');
    const [systemError, setSystemError] = useState(false);

    // Auth info held in Redux
    const { info } = useSelector((state) => state.auth);
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();

    // HANDLE FUNCTION START
    const handleListAddIconAdd = () => {
            setOpenCustomerAddTemplate(true);
            setCustomerAddTemplateFromType('add');
        },
        handleAddTemplateModalCancel = () => {
            setOpenCustomerAddTemplate(false);
            setOpenModal(false);
            // remove local storage after cancel
            sessionStorage.removeItem(`${routeName}_drag`);
            sessionStorage.removeItem(`${routeName}_drag_F_Type`);
            removeFromSessionStorage();
        },
        handleEditTemplateModalCancel = () => {
            setOpenCustomerEditTemplate(false);
            setOpenModal(false);
            // remove local storage after cancel
            sessionStorage.removeItem(`${routeName}_drag`);
            sessionStorage.removeItem(`${routeName}_drag_F_Type`);
            removeFromSessionStorage();
        },
        handleListEditIconAdd = () => {
            setOpenCustomerEditTemplate(true);
            setCustomerEditTemplateFromType('add');
        },
        handleListEditIconEdit = () => {
            setOpenCustomerEditTemplate(true);
            setCustomerEditTemplateFromType('edit');
        },
        handleListAddIconEdit = () => {
            setOpenCustomerAddTemplate(true);
            setCustomerAddTemplateFromType('edit');
            
        };
    // HANDLE FUNCTION END

    const getCustomerViewTemplate = async () => {
        setLoading(true);
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${customerTemplateList}?pid=${projectId}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await instance.request(config);
            setTemplates(response?.data?.records);
            setTemplateMemo(response?.data?.customerTemplateMemo ?? '');
            initialValues.customerTemplateMemo = response?.data?.customerTemplateMemo ?? '';
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const getCustomerEditTemplateAdd = async () => {
        setLoading(true);
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
            setTemplatesAdd(response?.data?.records);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    const getCustomerEditTemplateEdit = async () => {
        setLoading(true);
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

    useEffect(() => {
        getCustomerViewTemplate();
        getCustomerEditTemplateAdd();
        getCustomerEditTemplateEdit();
    }, [openModal, openEditModal, openCustomerEditTemplate, openCustomerAddTemplate]);

    // //Customer Add screen and edit screen template id get
    // useEffect(() => {
    //     getCustomerAddScreenTemplateId();
    //     getCustomerEditScreenTemplateId();
    // }, []);
    //

    const removeFromSessionStorage = () => {
        const pathname = window.location.pathname;
        const routeName = pathname.split('/').pop();
        const projectId = sessionStorage.getItem('currentProjectId');
        const editId = JSON.parse(sessionStorage.getItem('customer_template_edit'));
        const template = templates?.find((template) => template.customerViewTemplateId == editId);
        let customerViewTemplateColumn, customerViewTemplateSearch;

        if (template) {
            // Removed selected column records
            if (template?.customerViewTemplateColumn) {
                customerViewTemplateColumn = template?.customerViewTemplateColumn;
                if (customerViewTemplateColumn && customerViewTemplateColumn?.length) {
                    for (let template of customerViewTemplateColumn) {
                        sessionStorage.removeItem(`customer_template_${template.Task_ID}`);
                    }
                }
            }
        }
        sessionStorage.removeItem('customer_template_edit');
        sessionStorage.removeItem(`${routeName}_drag_F_Type`);
        sessionStorage.removeItem(`routeName_timestamp_roleTag_${projectId}`);
        sessionStorage.removeItem(`customer_setting_drag`);
        const templateIds = JSON.parse(sessionStorage.getItem(`${routeName}_drag_B_Type`));
        if (templateIds && templateIds?.length) {
            for (let template of templateIds) {
                sessionStorage.removeItem(`customer_template_${template.Task_ID}`);
            }
        }
        sessionStorage.removeItem(`${routeName}_drag_B_Type`);
    };

    async function updateCustomterTemplate() {
        if (processing.current) return;
        processing.current = true;
        let projectId = sessionStorage.getItem('currentProjectId');
        let sortedListData = JSON.parse(sessionStorage.getItem('customer_template_order_' + projectId));
        sortedListData = sortedListData.sortedItems;

        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${customerTemplateUpdate}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    projectId: projectId,
                    customerTemplateMemo: initialValues.customerTemplateMemo,
                    sortedItems: sortedListData,
                    updatedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const updated = await instance.request(config);
            setLoading(false);
            navigate('/customer_list');
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    }

    function handleOnchangeUpdateMemo(e) {
        let { name, value } = e.target;
        setTemplateMemo(value);
        initialValues.customerTemplateMemo = value;
    }

    //Edit field customerEditTemplateId

    const getCustomerAddScreenTemplateId = async () => {
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
            if (editId) {
                
                //const ENDPOINT = `${baseURL}${customerEditTemplateRead}?pid=${projectId}&customerEditTemplateTypeFlag=0`;
                const ENDPOINT = `${baseURL}${customerEditTemplateRead}${editId}?pid=${projectId}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                if (response) {
                    const data = response.data.records;
                    //const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
                    //const template = data?.find(template => template.customerEditTemplateId === editId)
                    if (data.customerEditTemplateId) {
                        setCustomerAddTemplateObject(data);
                        setCustomerAddTemplateFromType('edit');
                    } else {
                        setCustomerAddTemplateFromType('add');
                    }
                }
            }
        } catch (err) {
            console.log('Field err', err);
        }
    };
    //Edit field customerEditTemplateId
    const getCustomerEditScreenTemplateId = async () => {
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
            if (editId) {
                const ENDPOINT = `${baseURL}${customerEditTemplateRead}${editId}?pid=${projectId}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                if (response) {
                    const data = response.data.records;
                    if (data.customerEditTemplateId) {
                        setCustomerEditTemplateObject(data);
                        setCustomerEditTemplateFromType('edit');
                    } else {
                        setCustomerEditTemplateFromType('add');
                    }
                }
            }
        } catch (err) {
            console.log('Field err', err);
        }
    };

    const [customerCreateDragDrop, setCustomerCreateDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: false, space: 'col-span-1', header: '移動' }, //col-span-2
        pen: { show: true, space: 'col-span-1', header: '編集' },
        text: { show: true, space: 'col-span-8', header: '顧客作成テンプレート' },
    });

    const [customerUpdateDragDrop, setCustomerUpdateDragDrop] = useState({
        grid: { name: 'grid grid-cols-12 gap-1' },
        dragable: { show: false, space: 'col-span-1', header: '移動' }, //col-span-2
        pen: { show: true, space: 'col-span-1', header: '編集' },
        text: { show: true, space: 'col-span-8', header: '顧客編集テンプレート' },
    });

    return (
        <>
            {loading && <Loading />}

            <Page1440Body className="page1440-body3 h-[calc(100vh-120px)] p-0">
                <div className="relative w-full h-full">
                    <div className="px-10 mt-10 min-h-[calc(100vh-542px)]">
                        <div className="-mt-2" id="scroller"></div>
                        <InputContainer>
                            <label className="text-blue-100">顧客一覧テンプレート（128個まで）</label>
                            <div className="mx-10 mt-4">
                                <ButtonGTypeComponent
                                    openModal={openModal}
                                    setOpenModal={setOpenModal}
                                    buttonTitle="顧客⼀覧テンプレート追加"
                                    openEditModal={openEditModal}
                                    setOpenEditModal={setOpenEditModal}
                                    data={templates}
                                    ComponentAddModal={
                                        <TemplateModal
                                            openModal={openModal}
                                            title="顧客一覧テンプレート"
                                            handleCancel={() => {
                                                setOpenModal(false);
                                                removeFromSessionStorage();
                                            }}
                                            formType="add"
                                        />
                                    }
                                    ComponentEditModal={
                                        <TemplateModal
                                            title="顧客一覧テンプレート"
                                            data={templates}
                                            openModal={openEditModal}
                                            handleCancel={() => {
                                                setOpenEditModal(false);
                                                removeFromSessionStorage();
                                            }}
                                            formType="edit"
                                        />
                                    }
                                />
                            </div>
                        </InputContainer>
                        <div>
                            <label className="text-blue-100">顧客作成テンプレート</label>
                            <div className="mx-10 mt-4">
                                 <ButtonGTypeComponent
                                    openModal={openModal}
                                    setOpenModal={handleListAddIconAdd}
                                    buttonTitle="顧客作成テンプレート追加"
                                    openEditModal={openEditModal}
                                    setOpenEditModal={handleListAddIconEdit}
                                    controlDragDrop = {customerCreateDragDrop}
                                    data={templatesAdd}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-blue-100">顧客編集テンプレート</label>
                            <div className="mx-10 mt-4">
                                 <ButtonGTypeComponent
                                    openModal={openModal}
                                    setOpenModal={handleListEditIconAdd}
                                    buttonTitle="顧客編集テンプレート追加"
                                    openEditModal={openEditModal}
                                    setOpenEditModal={handleListEditIconEdit}
                                    controlDragDrop = {customerUpdateDragDrop}
                                    data={templatesEdit}
                                />
                            </div>
                        </div>
                        {/* <div>
                            <LabelWithListActionAddEdit
                                labelTitle="顧客作成テンプレート"
                                column1Title="編集"
                                column2Title="顧客作成テンプレート"
                                id="customerCreatedTemplate"
                            >
                                <LabelWithListActionAddEditIcon
                                    iconComponent={<BsFillPencilFill onClick={handleListAddIcon} />}
                                    column2Text="顧客新規作成テンプレート"
                                />
                                <LabelWithListActionAddEditIcon
                                    iconComponent={<BsFillPencilFill onClick={handleListEditIcon} />}
                                    column2Text="顧客編集テンプレート"
                                />
                            </LabelWithListActionAddEdit>
                        </div> */}
                    </div>

                    <Formik initialValues={initialValues} enableReinitialize={true}>
                        <Form onChange={handleOnchangeUpdateMemo}>
                            <InputContainer className="mb-8 mt-24 px-10">
                                <Note
                                    label="メモ（2048文字まで）"
                                    labelClassName="text-blue-100"
                                    inputClassName="bg-blue-25"
                                    type="text"
                                    name="customerTemplateMemo"
                                    placeholder="メモ"
                                />
                            </InputContainer>
                            <FormFooterButtons
                                btn_title1={`${formType === 'add' ? 'キャンセル' : '削除'}`}
                                btn_title2={`${formType === 'add' ? '保存' : '更新'}`}
                                formType={formType}
                                handleCancel={handleCancel}
                                setIsOverFlow={setIsOverflow}
                                memoClassName="!text-blue-100"
                                buttonComponents={true}
                                setContinuousAdd={updateCustomterTemplate}
                            >
                                {/* ----error---- */}
                                <ErrorMessage></ErrorMessage>
                            </FormFooterButtons>
                        </Form>
                    </Formik>
                </div>
            </Page1440Body>
            {openCustomerAddTemplate && (
                // customer setting add and edit handle
                <CustomerSettingTemplate
                    modalTitle="顧客新規作成テンプレート"
                    screenShow="add" // this add means add screenCustomerField
                    formType={customerAddTemplateFromType} // Edit screen will show or add screen will show and api call handle
                    handleCancel={handleAddTemplateModalCancel} //
                    customerAddTemplateData={customerAddTemplateObject}
                    customerEditTemplateId={customerAddTemplateObject?.customerEditTemplateId}
                    data={templatesAdd}
                />
            )}
            {openCustomerEditTemplate && (
                <CustomerSettingTemplate
                    modalTitle="顧客編集テンプレート"
                    screenShow="edit" // this add means add screenCustomerField
                    formType={customerEditTemplateFromType} // Edit screen will show or add screen will show and api call handle
                    handleCancel={handleEditTemplateModalCancel}
                    customerAddTemplateData={customerEditTemplateObject}
                    customerEditTemplateId={customerEditTemplateObject?.customerEditTemplateId}
                    data={templatesEdit}
                />
            )}
        </>
    );
};
export default CustomerSettingForm;
