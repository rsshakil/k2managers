import { Form, Formik } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { baseURL, customerEditTemplateCreate, customerEditTemplateUpdate, customerEditTemplateDelete, listField, listMethod, updateMethod, deleteMethod, createMethod } from '../../../../restapi/queries';
import { instance } from '../../../../services/axios';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import Loading from '../../../Loading/Loader';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import InputContainer from '../../../Wrapper/InputContainer';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '../../../../lib/errorMessages';
import CustomerSettingTemplateEdit from './CustomerSettingTemplateEdit';
import FormFooter from '../../../Form/FormFooter';
import { getErrorMessageWithErrorCode } from '../../../../lib/getErrorMessageWithErrorCode';
import DialogModal from '../../DialogModal';
import { customerSettingEditFromSchema } from '../../../../lib/Schema';

const blockData = [];

const initialValues = { memo: '' , customerEditTemplateName: '' };

const defaultBlocks = [
    { blockPageId: '', blockPageTitle: 'Add Block' },
    { blockPageId: 1, blockPageTitle: 'A' },
    { blockPageId: 2, blockPageTitle: 'B' },
    { blockPageId: 3, blockPageTitle: 'C' },
    { blockPageId: 4, blockPageTitle: 'D' },
    { blockPageId: 5, blockPageTitle: 'E' },
    { blockPageId: 6, blockPageTitle: 'F' },
    { blockPageId: 7, blockPageTitle: 'G' },
    { blockPageId: 8, blockPageTitle: 'H' },
    { blockPageId: 9, blockPageTitle: 'I' },
    { blockPageId: 10, blockPageTitle: 'J' },
];

export default function CustomerSettingAddEditTemplate({
    modalTitle,
    formType,
    handleCancel,
    blocks = [], // For TreeList
    customerAddTemplateData,
    customerEditTemplateId,
    customerAddTemplateFromType,
    buttonType,
    data,
}) {
    const processing = useRef(false);
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const routeName = pathname.split('/').pop();

    const { info } = useSelector((state) => state.auth);

    const [treeBlock, setTreeBlock] = useState(blocks);
    const [dragList, setDragList] = useState([]);
    
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');

    // const [buttonType, setButtonType] = useState({
    //     buttonName: 'フィールド追加',
    //     type: 'F', //// フィールド追加
    //     buttonData: blockData ? blockData : [],
    //     buttonItems: [],
    //     placeholder: 'フィールド追加',
    // });

    //State management
    const [loading, setLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("")
    const [deleteError, setDeleteError] = useState(false)
    const [formValues, setFormValues] = useState(initialValues);
    

    useEffect(() => { 
        if (formType === "edit") {
            if(data) {
                const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
                const template = data?.find(template => template.customerEditTemplateId === editId);
                setFormValues({
                    ...formValues,
                    memo: template?.memo,
                    customerEditTemplateName: template?.customerEditTemplateName,
                });
            }
        };

    }, [formType]);

    // // use effect calling for field list data
    // useEffect(() => {
    //     getAllFieldList();
    // }, []);

    // // Calling field list API
    // const getAllFieldList = async () => {
    //     try {
    //         setLoading(true);
    //         const projectId = sessionStorage.getItem('currentProjectId');
    //         let fieldType = '0,1,2,3,4,5,6,7';
    //         if (projectId) {
    //             const ENDPOINT = `${baseURL}${listField}?pid=${projectId}&fieldType=${fieldType}`;
    //             const config = {
    //                 method: listMethod,
    //                 url: ENDPOINT,
    //                 headers: {
    //                     Authorization: `Bearer ${localStorage.getItem('token')}`,
    //                 },
    //             };
    //             const response = await instance.request(config);
    //             if (response) {
    //                 const arrayOfFeildList = response?.data?.records;
    //                 let feildListDataArrayUpdate = [];
    //                 if (response?.data?.records) {
    //                     const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
    //                     const template = data?.find(template => template.customerEditTemplateId === editId);
    //                     const selectedItem = template?.customerEditTemplateColumn ?? [];

    //                     if (arrayOfFeildList.length > 0) {
    //                         for (let i = 0; i < arrayOfFeildList.length; i++) {
    //                             const element = arrayOfFeildList[i];
    //                             const elTask_ID = element.fieldId;
    //                             let updateElement = {
    //                                 ...element,
    //                                 id: element.fieldId,
    //                                 disabled: false,
    //                                 text: element.fieldName,
    //                             };

    //                             if (selectedItem.length > 0) {
    //                                 for (let j = 0; j < selectedItem.length; j++) {
    //                                     const element2 = selectedItem[j];
    //                                     const fTypeId = element2.fTypeId;

    //                                     if (elTask_ID == fTypeId) {
    //                                         // there is selected data making button disable
    //                                         updateElement = {
    //                                             ...element,
    //                                             id: element.fieldId,
    //                                             disabled: true,
    //                                             text: element.fieldName,
    //                                         };
    //                                     }
    //                                 }
    //                             }

    //                             feildListDataArrayUpdate.push(updateElement);
    //                         }

    //                         setButtonType({
    //                             ...buttonType,
    //                             buttonData: feildListDataArrayUpdate,
    //                             buttonItem: feildListDataArrayUpdate,
    //                         });
    //                     }
    //                 }
    //                 setLoading(false);
    //             }
    //             setLoading(false);
    //         }
    //     } catch (err) {
    //         setLoading(false);
    //     }
    // };

    // create operation
    const handleAdd = async (values, resetForm) => {
        setLoading(true);
        setSystemError(false);

        // customerEditTemplateColumn get from session storage
        const pathname = window.location.pathname;
        const routeName = pathname.split('/').pop();
        const customerEditTemplateColumn = sessionStorage.getItem(`${routeName}_drag`);
        const ENDPOINT = `${baseURL}${customerEditTemplateCreate}`;

        try {
            const config = {
                method: createMethod,

                url: ENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    customerEditTemplateName: values.customerEditTemplateName,
                    customerEditTemplateColumn: customerEditTemplateColumn,
                    customerEditTemplateTypeFlag: 1, // customer edit template column added
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
            };

            const created = await instance.request(config);

            // if create is successful
            if (created) {
                setSystemError(false)
                setLoading(false)
                handleCancel();
                // remove local storage after add

                sessionStorage.removeItem(`${routeName}_drag`);
                sessionStorage.removeItem(`${routeName}_drag_F_Type`)
                sessionStorage.removeItem(`${routeName}_drag_B_Type`)
                sessionStorage.removeItem(`routeName_timestamp__roleTag_${sessionStorage.getItem('currentProjectId')}`)
                sessionStorage.removeItem(`customer_setting_drag`)
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }finally {
            processing.current = false;
        }
        setLoading(false);
    };

    // AIS Start
    // update operation
    const handleUpdate = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        const pathname = window.location.pathname;
        const routeName = pathname.split('/').pop();
        const customerEditTemplateColumn = sessionStorage.getItem(`${routeName}_drag`);
        const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
        const projectId = sessionStorage.getItem('currentProjectId');
        const updateENDPOINT = `${baseURL}${customerEditTemplateUpdate}${editId}?pid=${projectId}`;
        try {
            const config = {
                method: updateMethod,
                url: updateENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    customerEditTemplateColumn: customerEditTemplateColumn,
                    customerEditTemplateName: values.customerEditTemplateName,
                    customerEditTemplateTypeFlag: 1, // customer edit template column added
                    memo: values.memo,
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
            };

            const created = await instance.request(config);

            // if create is successful
            if (created) {
                setSystemError(false);
                setLoading(false);
                // remove local storage after add

                sessionStorage.removeItem(`${routeName}_drag`);
                sessionStorage.removeItem(`${routeName}_drag_F_Type`);

                //return navigate('/customer_list');
                handleCancel();
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }finally {
            processing.current = false;
        }
        setLoading(false);
    };

    // Delete customer list template
    const handleDelete = async () => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true)
        setSystemError(false)
        setDeleteError(false);
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            const editId = JSON.parse(sessionStorage.getItem("customer_template_edit"));
            const ENDPOINT = `${baseURL}${customerEditTemplateDelete}${editId}?pid=${projectId}`
            const config = {
                method: deleteMethod,
                url: ENDPOINT,
                data: {
                    deletedBy: info.accountId,
                },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                }
            }
            const deleted = await instance.request(config)

            if (deleted) {
                setLoading(false)
                let selectedTemplateID = JSON.parse(sessionStorage.getItem('retained_customer_list_' + projectId))?.templateId;
                if (editId === selectedTemplateID) {
                    sessionStorage.setItem('retained_customer_list_' + projectId, JSON.stringify({ pid: projectId }));
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
        setOpenModal(false);
        //setIsOverFlow(false);
        setDeleteError(false);
    };
    //AIS End

    return (
        <>
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                {/*this is the modal title section*/}
                <ModalTitle className="text-blue-100 bold text-xl" title={modalTitle ? modalTitle : 'Modal Title'} />
                <Formik
                    initialValues={formValues}
                    validateOnChange={false}
                    enableReinitialize={true}
                    validateOnBlur={false}
                    validationSchema={customerSettingEditFromSchema(formType)}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        if (formType === 'add') {
                            handleAdd(values, resetForm);
                        } else {
                            handleUpdate(values, resetForm);
                        }
                    }}
                >
                    {({ errors }) => {
                        const first = Object.keys(errors)[0];
                        return (
                            <>
                            <Form>
                                <FormBodyContainer className="min-h-[calc(100vh-452px)] !p-0">
                                    <InputContainer className="py-10">
                                        <CustomerSettingTemplateEdit
                                            customerAddTemplateData={formType == 'edit'?data?.find(template => template.customerEditTemplateId === JSON.parse(sessionStorage.getItem("customer_template_edit"))).customerEditTemplateColumn : []}
                                            buttonTypeData={buttonType}
                                        />
                                    </InputContainer>
                                </FormBodyContainer>
                                <div className={`px-10`}>
                                    <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                        {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                    </ErrorMessage>
                                    {/*<div className="flex space-x-[42px] mb-4">
                                        <Button
                                            title={'キャンセル'}
                                            className={`bg-blue-100`}
                                            hoverColorType={'hover:bg-blue-300'}
                                            type={formType === 'add' ? 'button' : 'button'}
                                            onClick={() => {
                                                handleCancel();
                                            }}
                                        />
                                        <Button title={'保存'} type="submit" />
                                        </div>*/}

                                    <FormFooter
                                        btn_title1={formType === 'add' ? '保存' : '削除'}
                                        btn_title2={formType === 'add' ? '連続追加' : '更新'}
                                        btn_title3={'キャンセル'}
                                        continuousAddRemove
                                        handleCancel={handleCancel}
                                        formType={formType}
                                        loading={loading}
                                        setOpenModal={setOpenModal}
                                        /*setContinuousAdd={setContinuousAdd}
                                        setIsOverFlow={setIsOverFlow}
                                        deleteLoading={deleteLoading}*/
                                    >
                                        
                                    <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                        {errors[first]}
                                        {alreadyDeletedErrorMessage &&
                                            !errors[first] &&
                                            `${alreadyDeletedErrorMessage}`}
                                        {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                    </ErrorMessage>
                                    </FormFooter>
                                </div>
                            </Form>
                            
                            {openModal && (
                                        <DialogModal
                                            title="削除"
                                            btn_title="テンプレート削除"
                                            cancel_title="キャンセル "
                                            handleButtonLeft={handleDelete}
                                            handleButtonRight={closeDialogModal}
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
                                                <div className="text-orange-500 mt-[1rem]">
                                                    ※XXXXXXXXXXXXXで利用している場合、XXXXXXが正常に動作できなくなります。
                                                </div>
                                            </div>
                                        </DialogModal>
                                    )}
                            </>
                        );
                    }}
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
