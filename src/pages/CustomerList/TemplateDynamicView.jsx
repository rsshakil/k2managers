/*
 * Template View 1 User Information
 *
 */
import React, { useEffect, useRef, useState } from 'react';
import { GoMail } from 'react-icons/go';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loader';

import CustomToolTip from '../../components/Tooltip/CustomToolTip';

import { AiOutlineMail } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import { CgNotes } from 'react-icons/cg';
import { GiCancel } from 'react-icons/gi';
import { GoDeviceMobile } from 'react-icons/go';

import axios from 'axios';
import { useSelector } from 'react-redux';
import * as queries from '../../api/gql/queries';
import CustomerEditForm from '../../components/Form/CustomerEditForm';
import DialogModal from '../../components/Modal/DialogModal';
import CustomerLogListModal from '../../components/Modal/WhiteModal/CustomerSettingTemplate/CustomerLogListModal';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import {
	baseURL,
	sendResendEmail,
	sendResendSMS,
	createMethod,
	customerCancelReservationDelete,
	deleteMethod,
	updateCustomerReservation,
    listCustomerViewTemplate,
    listMethod,
	updateMethod
} from '../../restapi/queries';
import { instance } from '../../services/axios';

// GLOBAL DECLARATION START
const headerCells = [
    { label: 'ユーザーID', width: '9.875rem' },
    { label: '予約ID', width: '9.875rem' },
    { label: '記号', width: '5.875rem' },
    { label: '番', width: '2rem' },
    { label: '姓', width: '5.875rem' },
    { label: '名', width: '5.875rem' },
    { label: 'セイ', width: '5.875rem' },
    { label: 'メイ', width: '5.875rem' },
    { label: '性', width: '2rem' },
    { label: '生年月日', width: '8rem' },
    { label: '〒', width: '5.875rem' },
    { label: '住所', minWidth: '31.4375rem' },
    { label: '送付先住所', minWidth: '31rem' },
    { label: 'TEL', width: '8.125rem' },
    { label: '検診施設', minWidth: '22.625rem' },
    { label: '健診日', width: '8rem' },
    { label: '健診時間', width: '5.25rem' },
    { label: '負担額', width: '4.875rem' },
    { label: '予約日時', width: '10.375rem' },
    { label: '取消日時', width: '10.375rem' },
    { label: '予約者', width: '3.9375rem' },
    { label: '取消者', width: '3.9375rem' },
    { label: 'log', width: '2rem' },
    {
        iconLabel: <GoMail className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem]" />,
        width: '2rem',
    },
    {
        iconLabel: <IoMdClose className="inline-block text-orange-300 h-[1.5rem] w-[1.5rem]" />,
        width: '2rem',
    },
];

// GLOBAL DECLARATION END

export default function TemplateDynamicView({
    objProps: { customers, setEmailModal, setIsOverFlow, setSelectedRow },
    templateIdValue,
    allFields,
    headerFieldLists,
}) { 
    const navigateRoute = useNavigate(); 
    const role = useSelector((state) => state.auth.role);
    const processing = useRef(false);
    const [loading, setLoading] = useState(true);
    const { info } = useSelector((state) => state.auth);
    const accountUUID = useSelector((state) => state.auth.accountUUID);
    const refs = useRef([]);
    const ref1 = useRef(null);
    const parentTableRef = useRef(null);
    const commandFieldList = ['00000a01', '00000a02', '00000a03', '00000a04', '00000a05'];
    const [eventCustomId, setEventCustomId] = useState({
        customerId: 0,
        eventId: 0,
        reservationId: 0,
        reservationNo: '',
        eventCategoryId: 0,
    });
    const [resendEmailModal, setResendEmailModal] = useState(false);
    const [cancelReservationModal, setCancelReservationModal] = useState(false);
    const [cancelReservationError, setCancelReservationError] = useState(false);
    const [cancelReservationErrorMessage, setCancelReservationErrorMessage] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [customerEditModal, setCustomerEditModal] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [selectedTemplateId, setSelectedTemplateId] = useState(templateIdValue);
    const [openCustomerLogListModal, setOpenCustomerLogListModal] = useState(false);
    const [customerLogListSystemError, setCustomerLogListSystemError] = useState(false);
    const [customerLogListData, setCustomerLogListData] = useState([]);
    const [tableBodyListData, setTableBodyListData] = useState([]);
    refs.current = [];

//  console.log('headerFieldLists>>>>>>>>>>>>>>>>',headerFieldLists);
//  console.log('allFields>>>>>>>>>>>>>>>>',allFields);
    const addToRefs = (el) => {
        if (el && !refs.current.includes(el)) {
            refs.current.push(el);
        }

        if (refs.current.length === customers.length) {
            setLoading(false);
            console.log('loadingOFFFFFINAL');
        }
    };
    useEffect(() => {
        setTimeout(() => {
            if (customers.length == 0) {
                setLoading(false);
            }
        }, 3000);
    }, []);
    const resendEmail = (customer) => {
        setEventCustomId({
            customerId: customer?.customerId,
            eventId: customer?.eventId,
            eventCategoryId: customer?.eventCategoryId,
            eventMailFlag: customer?.eventMailFlag,
            reservationId: customer?.reservationId,
            reservationNo: customer?.reservationNo,
        });
        setResendEmailModal(true);
    };
    const cancelReservation = (customer) => {
        setEventCustomId({
            customerId: customer?.customerId,
            eventId: customer?.eventId,
            eventCategoryId: customer?.eventCategoryId,
            eventMailFlag: customer?.eventMailFlag,
            reservationId: customer?.reservationId,
            reservationNo: customer?.reservationNo,
        });
        setCancelReservationModal(true);
    };
    const getFieldCode = (fieldId) => {
        let fieldRow = allFields.length > 0 && allFields.find((item) => item.fieldId == fieldId);
        if (typeof fieldRow != 'undefined') {
            return fieldRow.fieldCode;
        }
    };
    const customerLogList = (customer) => {
        if (processing.current) return;
        processing.current = true;
        try { 
            setLoading(true);
            axios({
                url: process.env.REACT_APP_APPSYNC_API_URL,
                method: 'post',
                headers: { 'x-api-key': process.env.REACT_APP_APPSYNC_API_KEY },
                data: {
                    query: queries.byCustomerByLogDateTime,
                    variables: {
                        sortDirection: 'ASC',
                        customerId: customer?.customerId
                    },
                },
            })
                .then((res) => {
                    setCustomerLogListData(res.data.data.byCustomerByLogDateTime.items);
                    setOpenCustomerLogListModal(true);
                    setLoading(false);
                })
                .catch((err) => {
                    setCustomerLogListSystemError(true);
                    setLoading(false);
                });
        } catch (err) {
            setCustomerLogListSystemError(true);
            setLoading(false);
        }finally {
            processing.current = false;
        }
    };
    const deleteCancelReservation = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setDeleteLoading(true);
        setSystemError(false);
        setCancelReservationError(false);
        try {
            const { customerId, reservationId } = eventCustomId;
            const ENDPOINT = `${baseURL}${customerCancelReservationDelete}${reservationId}?cid=${customerId}`;
            const config = {
                method: deleteMethod,
                url: ENDPOINT,
                data: {
                    changer: info.accountId,
                    pid: sessionStorage.getItem('currentProjectId'),
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
                setDeleteLoading(false);
            }
            setCancelReservationModal(false);
            navigateRoute('/customer_list');
        } catch (error) {
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            setCancelReservationError(true);
            setCancelReservationErrorMessage(matchErrorMessage);
            setLoading(false);
            setDeleteLoading(false);
        } finally {
            processing.current = false;
            setLoading(false)
        }
    };
    const handleResendEmail = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setDeleteLoading(true);
        setSystemError(false);
        try {
            const eventMailFlag = eventCustomId.eventMailFlag;
            if (eventMailFlag === 1 || eventMailFlag === 3) {
                // send resend E-mail
                const ENDPOINT = `${baseURL}${sendResendEmail}`;
                const config = {
                    method: createMethod,
                    url: ENDPOINT,
                    data: {
                        customerId: eventCustomId.customerId,
                        eventId: eventCustomId.eventId,
                        eventCategoryId: eventCustomId.eventCategoryId,
                        reservationNo: eventCustomId.reservationNo,
                        emailTemplateTypeFlag: 2,
                        createdBy: info.accountId,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const copied = await instance.request(config);
            }
            if (eventMailFlag === 2 || eventMailFlag === 3) {
                // send resend SMS
                const ENDPOINT = `${baseURL}${sendResendSMS}`;
                const config = {
                    method: createMethod,
                    url: ENDPOINT,
                    data: {
                        customerId: eventCustomId.customerId,
                        eventId: eventCustomId.eventId,
                        eventCategoryId: eventCustomId.eventCategoryId,
                        reservationNo: eventCustomId.reservationNo,
                        smsTemplateTypeFlag: 2,
                        createdBy: info.accountId,
                    },
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const copied = await instance.request(config);
            }
            setResendEmailModal(false);
        } catch (error) {
            if (error.response.status === 409) {
                setSystemError(false);
            } else {
                setSystemError(true);
            }
            setLoading(false);
            setDeleteLoading(false);
        } finally {
            processing.current = false;
            setLoading(false);
            setDeleteLoading(false);
        }
    };
    const openCustomerInfoEditModal = async (customer) => {
        setEventCustomId({
            customerId: customer?.customerId,
            eventId: customer?.eventId,
            reservationId: customer?.reservationId,
            eventCategoryId: customer?.eventCategoryId,
        });

        const pid = sessionStorage.getItem('currentProjectId');
        const viewENDPOINT = `${baseURL}${listCustomerViewTemplate}${templateIdValue}?pid=${pid}`;
        const viewConfig = {
            method: listMethod,
            url: viewENDPOINT,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        };

        const viewResponse = await instance.request(viewConfig);

        const template = viewResponse?.data?.records?.find(template => template.customerViewTemplateId == templateIdValue);
        
        setCustomerEditModal(template?.customerViewTemplateEditTemplateId? true : false);
    };
    const appOpen = (customer) => {
        const projectId = sessionStorage.getItem('currentProjectId');
        let sessionTemplateListInfo = JSON.parse(sessionStorage.getItem('customer_view_template_' + projectId));
        let templateId = JSON.parse(sessionStorage.getItem('retained_customer_list_templateId_' + projectId)).templateId;
// console.log("templateId", templateId);
//         let tempId = JSON.parse(sessionStorage.getItem('retained_customer_list_' + projectId + '_' + templateId));
// console.log("tempId", tempId);

        let selectedTemplate =
            sessionTemplateListInfo?.length > 0 &&
            sessionTemplateListInfo.find((temp) => temp.customerViewTemplateId == templateId);
        let openAppUrl = selectedTemplate?.appURL ?? '';
        let customerToken1 = customer.token1 ?? '';
        let customerToken2 = customer.token2 ?? '';
        let customerToken3 = customer.token3 ?? '';
// console.log("appOpen1", selectedTemplate);
// console.log("appOpen2", openAppUrl);
        if (selectedTemplate && openAppUrl != '') {
            window.open(
                'https://' +
                    openAppUrl +
                    '?c=' +
                    accountUUID +
                    '&token1=' +
                    customerToken1 +
                    '&token2=' +
                    customerToken2 +
                    '&token3=' +
                    customerToken3
            );
        }
    };

    const addActionCommandIcon = (headerCell, customer) => {
// console.log("addActionCommandIcon", getFieldCode(headerCell.fieldType) + " === " + customer);
        let fieldCode = getFieldCode(headerCell.fieldType);
        switch (fieldCode) {
            case '00000a01':
                //キャンセル処理
                if (customer.reservationStatus == 1) {
                    return (
                        <div
                            className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-pointer"
                            onClick={() => cancelReservation(customer)}
                        >
                            <GiCancel className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                        </div>
                    );
                } else {
                    return (
                        <div className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-default"></div>
                    );
                }
            case '00000a02':
                //再送メール送信
                if (customer.reservationStatus == 1) {
                    return (
                        // <TemplateDynamicIconColumn dataText="再送メール送信" fetchLogDetails={() => resendEmail(customer)}>
                        <div
                            className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-pointer"
                            onClick={() => resendEmail(customer)}
                        >
                            <AiOutlineMail className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                        </div>
                        // </TemplateDynamicIconColumn>
                    );
                } else {
                    return (
                        <div className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-default"></div>
                    );
                }
            case '00000a03':
                //APPを開く
                if (customer.reservationStatus == 1) {
                    return (
                        <div
                            className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-pointer"
                            onClick={() => appOpen(customer)}
                        >
                            <GoDeviceMobile className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                        </div>
                    );
                } else {
                    return (
                        <div className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-default"></div>
                    );
                }
            case '00000a04':
                return (
                    <div
                        className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-pointer"
                        onClick={() => customerLogList(customer)}
                    >
                        <CgNotes className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                    </div>
                );
            case '00000a05':
                //顧客編集
                return (
                    <div
                        className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-pointer"
                        onClick={() => openCustomerInfoEditModal(customer)}
                    >
                        <BsFillPencilFill className="inline-block text-blue-100 h-[1.5rem] w-[1.5rem] hover:text-blue-50" />
                    </div>
                );
            default:    
                return (
                    <div className="w-[2.5rem] right-border h-10 leading-10 flex-none px-2 text-center cursor-default"></div>
                );
                // break;
        }
    };

    const isOpenModal = (reservationNo) => {
        setSelectedRow(reservationNo);
        setEmailModal(true);
        setIsOverFlow(true);
    };

    async function handleOnPressModalSaveButton(e, formData) {
        if (processing.current) return;
        processing.current = true;
        if (e) e.preventDefault();
        setLoading(true);
        setSystemError(false);
        let formDataForUpdate = {};
        setCustomerEditModal(false);
        const pid = sessionStorage.getItem('currentProjectId');
        formDataForUpdate.updateFieldList = formData;
        formDataForUpdate.projectId = pid;
        formDataForUpdate.customerId = eventCustomId.customerId;
        formDataForUpdate.eventId = eventCustomId.eventId;
        formDataForUpdate.reservationId = eventCustomId.reservationId;
        formDataForUpdate.reservationNo = eventCustomId.reservationNo;
        formDataForUpdate.updatedBy = info.accountId;

        try {
            const ENDPOINT = `${baseURL}${updateCustomerReservation}${eventCustomId.customerId}`;
            const config = {
                method: updateMethod,
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
    }

    const ENDPOINT =
        process.env.NODE_ENV !== 'production'
            ? process.env.REACT_APP_CUTOMER_SITE_URL_LOCALHOST
            : process.env.REACT_APP_CUTOMER_SITE_URL_PRODUCTION;

    const handleCancelModal = ()=>{
        setLoading(true);
        console.log('loadingstarted');
        systemError && setSystemError(false);
        resendEmailModal && setResendEmailModal(false);
        cancelReservationError && setCancelReservationError(false)
        cancelReservationModal && setCancelReservationModal(false);
        customerEditModal && setCustomerEditModal(false)
        setLoading(false);
        console.log('loadingEnd');
    }
    return (
        <>
           
            <div ref={parentTableRef}>
                <div className={`h-[calc(100vh-182px)] ${(!customerEditModal && !openCustomerLogListModal && !resendEmailModal && !cancelReservationModal)?'tbody-vertical-scroll':''} `}>
                    {loading && <Loading />}

                    <div className="flex table-row-bg-custom h-8 bg-blue-50 sticky top-0 z-10">
                        {headerFieldLists.length > 0 && allFields.length>0 && 
                            headerFieldLists.map((headerCell, index) => (
                                <>
                                    {commandFieldList.includes(getFieldCode(headerCell.fieldType)) ? (
                                        <div
                                            className={`sticky top-0 z-10 flex-none h-8 leading-8 text-white text-center font-bold right-border w-[2.5rem] bg-blue-50`}
                                        ></div>
                                    ) : (
                                        <CustomToolTip
                                            text={headerCell?.headerName}
                                            divInfo={parentTableRef}
                                            key={index}
                                        >
                                            <div
                                                ref={ref1}
                                                scope="col"
                                                key={index}
                                                className={`sticky top-0 z-10 flex-none h-8 leading-8 text-white text-center font-bold right-border truncate ${headerCell?.column_width} bg-blue-50`}
                                            >
                                                {headerCell?.headerName}
                                            </div>
                                        </CustomToolTip>
                                    )}
                                </>
                            ))}
                        <div className="grow bg-blue-50"></div>
                    </div>

                    {/* {tableBodyListData} */}

                    {customers &&
                        customers.length > 0 &&
                        customers.map((customer, index) => (
                            <div
                                className="flex table-row-bg-custom row-display align-middle w-max"
                                key={index}
                                ref={addToRefs}
                            >
                                {headerFieldLists.length > 0 && allFields.length>0 && 
                                    headerFieldLists.map((headerCell, index2) => {
                                        let col = '';
                                        let fCodes = getFieldCode(headerCell.fieldType);
                                        if (commandFieldList.includes(fCodes)) {
                                            if (role.r9 >= 1) {
                                                col = addActionCommandIcon(headerCell, customer);
                                            }
                                            else {
                                                col = addActionCommandIcon("none", customer);
                                            }
                                        } else {
                                            let colVal = Object.values(customer)[index2] ?? '';
                                            colVal = colVal.toString();
                                            col = (
                                                <CustomToolTip text={colVal} divInfo={parentTableRef}>
                                                    <div
                                                        key={`${index}_${index2}`}
                                                        className={`right-border px-1 h-10 leading-10 flex-none truncate ${headerCell?.column_width} ${headerCell?.text_align} ${headerCell?.text_size} ${headerCell?.text_bold}`}
                                                        style={{ color: headerCell?.text_color }}
                                                    >
                                                        {colVal}
                                                    </div>
                                                </CustomToolTip>
                                            );
                                        }
                                        return col;
                                    })}
                                <div className="grow"></div>
                            </div>
                        ))}
                </div>
            </div>
           

            {resendEmailModal && (
                <DialogModal
                    title="再送メール送信"
                    btn_title="キャンセル"
                    cancel_title="送信"
                    handleButtonLeft={handleCancelModal}
                    colorType="bg-blue-100"
                    handleButtonRight={handleResendEmail}
                    deleteLoading={deleteLoading}
                    errors={
                        <span className={`${systemError} ? "visible" : "invisible"`}>
                            {systemError && `${errorMessages.E_SYSTEM_01}`}
                        </span>
                    }
                >
                    <div className="text-center mt-[1rem]">
                        <div className="mt-[1rem]">再送メールを送信します</div>
                    </div>
                </DialogModal>
            )}
            {cancelReservationModal && (
                <DialogModal
                    title="予約キャンセル"
                    btn_title="予約キャンセル"
                    cancel_title="キャンセル"
                    handleButtonRight={handleCancelModal}
                    handleButtonLeft={deleteCancelReservation}
                    values={eventCustomId}
                    deleteLoading={deleteLoading}
                    errors={
                        <span className={`${cancelReservationError} ? "visible" : "invisible"`}>
                            {cancelReservationError &&
                                cancelReservationErrorMessage &&
                                `${cancelReservationErrorMessage}`}
                        </span>
                    }
                >
                    <div className="text-center mt-[1rem]">
                        <div className="text-orange-500 mt-[1rem]">
                            予約をキャンセルします。
                            <div className="text-orange-500 mt-[1rem]">
                                キャンセルした予約番号は使用できなくなります。
                            </div>
                        </div>
                    </div>
                </DialogModal>
            )}
            {openCustomerLogListModal && (
                <CustomerLogListModal
                    handleCancel={() => setOpenCustomerLogListModal(false)}
                    customerLogListData={customerLogListData}
                    customerLogListSystemError={customerLogListSystemError}
                />
            )}
            {customerEditModal && (
                <CustomerEditForm
                    initialValues={eventCustomId}
                    templateId={templateIdValue}
                    setModalOpen={setCustomerEditModal}
                    handleOnPressSave={handleOnPressModalSaveButton}
                    formType="edit"
                />
            )}
        </>
    );
}
