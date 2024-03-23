import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useState, useRef } from 'react';
import { baseURL, customerEditTemplateRead, customerEditTemplateCreate, customerEditTemplateUpdate, customerEditTemplateDelete, listMethod, updateMethod, createMethod, deleteMethod } from '../../../../restapi/queries';
import { instance } from '../../../../services/axios';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import SelectBox from '../../../Form/FormInputs/SelectBox';
import Loading from '../../../Loading/Loader';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import InputContainer from '../../../Wrapper/InputContainer';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '../../../../lib/errorMessages';
import Button from '../../../Button/Button';
import CustomerSettingTemplateAdd from './CustomerSettingTemplateAdd';
import FormFooter from '../../../Form/FormFooter';
import TextBox from '../../../Form/FormInputs/TextBox';
import DialogModal from '../../DialogModal';
import { getErrorMessageWithErrorCode } from '../../../../lib/getErrorMessageWithErrorCode';
import { customerSettingAddEditFromSchema } from '../../../../lib/Schema';

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
    blocks = [],
    customerAddTemplateData,
    customerEditTemplateId,
    customerAddTemplateFromType,
    buttonType,
    data,
}) {
    const processing = useRef(false);
    const navigate = useNavigate();
    const { info } = useSelector((state) => state.auth);
    
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');

    //State management
    const [loading, setLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);

    
    const [formValues, setFormValues] = useState(initialValues);
    
    const [deleteErrorMessage, setDeleteErrorMessage] = useState("")
    const [deleteError, setDeleteError] = useState(false)
    const [openModal, setOpenModal] = useState(false);

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

    // create operation
    const handleAdd = async (values) => {
        setLoading(true);
        setSystemError(false);
        const pathname = window.location.pathname;
        const routeName = pathname.split('/').pop();
        const customerEditTemplateColumn = sessionStorage.getItem(`${routeName}_drag`);
        const createENDPOINT = `${baseURL}${customerEditTemplateCreate}`;
        try {
            const config = {
                method: createMethod,

                url: createENDPOINT,
                data: {
                    projectId: sessionStorage.getItem('currentProjectId'),
                    customerEditTemplateName: values.customerEditTemplateName,
                    customerEditTemplateColumn: customerEditTemplateColumn,
                    customerEditTemplateTypeFlag: 0, // customer edit template column added
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

                sessionStorage.removeItem(`${routeName}_drag`);
                sessionStorage.removeItem(`${routeName}_drag_F_Type`);

                //return navigate('/customer_list');
                handleCancel();
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }
        setLoading(false);
    };

    const handleUpdate = async (values) => {
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
                    customerEditTemplateTypeFlag: 0, // customer edit template column added
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

                sessionStorage.removeItem(`${routeName}_drag`);
                sessionStorage.removeItem(`${routeName}_drag_F_Type`);

                //return navigate('/customer_list');
                handleCancel();
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
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

    return (
        <>
            {loading && <Loading />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                {/*this is the modal title section*/}
                <ModalTitle className="text-blue-100 bold text-xl" title={modalTitle ? modalTitle : 'Modal Title'} />
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    enableReinitialize={true}
                    initialValues={formValues}
                    validationSchema={customerSettingAddEditFromSchema(formType)}
                    // validationSchema={}
                    onSubmit={(values, { resetForm }) => {
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
                                        <CustomerSettingTemplateAdd
                                            customerAddTemplateData={formType == 'edit'?data?.find(template => template.customerEditTemplateId === JSON.parse(sessionStorage.getItem("customer_template_edit"))).customerEditTemplateColumn : []}
                                            buttonTypeData={buttonType}
                                        />
                                    </InputContainer>
                                </FormBodyContainer>

                                <div className={`px-10`}>
                                    {/* <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                        {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                    </ErrorMessage> */}
                                    {/* <div className="flex space-x-[42px] mb-4">
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
                                    </div> */}

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

export const TreeListDropDownButton = ({ handleOnAction }) => {
    return (
        <>
            <div className="mb-4">
                <SelectBox
                    label=""
                    name="addAppPageBlock"
                    labelClassName="text-blue-100"
                    inputClassName="bg-blue-25"
                    onChange={(e) => handleOnAction(e, 'add')}
                >
                    {defaultBlocks.map((item) => (
                        <option key={item.blockPageId} value={JSON.stringify(item)}>
                            {item.blockPageTitle}
                        </option>
                    ))}
                </SelectBox>
            </div>
        </>
    );
};
