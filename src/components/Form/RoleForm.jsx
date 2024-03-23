import { Form, Formik, useFormikContext } from 'formik';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import roleFormFun from '../../helper/functions/roleFormComponent';
import commonConstants from '../../lib/commonConstants';
import { errorMessages } from '../../lib/errorMessages';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';
import { ParentChildData } from '../../pages/RoleList/RoleAddData';
import {
    baseURL,
    createMethod,
    createRole, deleteMethod,
    deleteRole,
    listMethod,
    listProject,
    updateMethod,
    updateRole
} from '../../restapi/queries';
import { instance } from '../../services/axios';
import ParentChildCheckBox from '../CheckBoxComponent/ParentChildCheckBox';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ModalFormFooterWithHover from '../Footer/ModalFormFooterWithHover';
import ButtonTypeF from '../ListElementDrag/ButtonType/ButtonTypeF';
import Loading from '../Loading/Loader';
import ExpandRow from '../ManagementItem/ExpandRows/ExpandRow';
import DialogModal from '../Modal/DialogModal';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import SelectBox from './FormInputs/SelectBox';
import TextBox from './FormInputs/TextBox';
import ToggleLock from './FormInputs/ToggleLock';

const selectOptions = [
    { id: 0, value: 'しない' },
    { id: 1, value: 'する' },
];
// formik onChange function will show everything in form
const FormObserver = ({ setTagShow, pathName }) => {
    const { values } = useFormikContext();
    useEffect(() => {
        const { limitType } = values;
        // set sessionStorage for limitType
        let storeSessionValue = {
            limitType: limitType ? limitType : 0,
        };
        const sessionKey = `${pathName}_timestamp_roleRelationStyle`;
        const getSessionItem = JSON.parse(sessionStorage.getItem(sessionKey));
        if (getSessionItem !== null) {
            getSessionItem['limitType'] = limitType ? limitType : 0;
            sessionStorage.setItem(`${pathName}_timestamp_roleRelationStyle`, JSON.stringify(getSessionItem));
        } else {
            sessionStorage.setItem(`${pathName}_timestamp_roleRelationStyle`, JSON.stringify(storeSessionValue));
        }
        setTagShow && setTagShow(limitType === '1' || limitType == 1);
    }, [values]);

    return null;
};
const RoleForm = ({ initialValues, formType, load = false, error = null, setIsOverFlow }) => {
    const processing = useRef(false);
    const location = useLocation()
    const pathName = location.pathname.split('/').pop();
    const { info } = useSelector((state) => state.auth); // Auth info held in Redux
    const [show, setShow] = useState(true);
    const [tagShow, setTagShow] = useState(initialValues.limitType === 1);
    const [openModal, setOpenModal] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const isOpenModal = () => {
        setOpenModal(true);
        setIsOverFlow(true);
    };
    const [modal, setModal] = useState(false);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [loading, setLoading] = useState(false);
    const [roleError, setRoleError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const [deleteLoading, setDeleteLoading] = useState(false);

    const navigate = useNavigate();
    // drag app compnents control state
    const [dragList, setDragList] = useState([]);
    const [buttonType, setButtonType] = useState({
        buttonName: 'Button Type F',
        type: 'F',
        buttonData: [],
    });
    const [projectLoaded, setProjectLoaded] = useState(false);
    // F type button will show
    const [optionValue, setOptionValue] = useState('');
    // Tag box handle state
    const [functionMode, setFunctionMode] = useState({ mode: '', item: {} })
    const [countTagBox, setCoutTagBox] = useState([{ name: 'TagBox1', ID: 1 }]);

    const roleSessionKey = `${pathName}_timestamp_roleRelationStyle`;

    useEffect(() => {
        sessionStorage.removeItem(roleSessionKey);
        fetchProject();
    }, []);

    useEffect(() => {
        if (initialValues?.roleRelationStyle) {
            sessionStorage.setItem(roleSessionKey, JSON.stringify(initialValues.roleRelationStyle));

            if (typeof initialValues?.roleRelationStyle?.projectEvent !== 'undefined') {
                setDragList(initialValues?.roleRelationStyle?.projectEvent);
 
                if (projectLoaded) {
                    setTimeout(() => {
                        const selectedDragList = initialValues?.roleRelationStyle?.projectEvent;
                        const buttonIdArr = selectedDragList.map((x) => x['id']);
                        const itemListArr = [...buttonType.buttonData];
                        if (itemListArr.length > 0 && buttonIdArr.length > 0) {
                            itemListArr.map((item, i) => {
                                if (buttonIdArr.includes(item.projectId)) {
                                    item.disabled = true;
                                }
                                return item;
                            });
                            setButtonType({ ...buttonType, buttonData: itemListArr });
                        }
                    }, 2000);
                }
            }
        }
    }, [initialValues?.roleRelationStyle, projectLoaded]);

    const fetchProject = async () => {
        if (processing.current) return
        processing.current = true;
        try {
            setLoading(true);
            const queryString = `?itemsPerPage=${300}&pagesVisited=${0}`; // Set Query String
            const ENDPOINT = `${baseURL}${listProject}${queryString}`;
            const config = {
                method: listMethod,
                url: ENDPOINT,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const response = await instance.request(config);
            if (response) {
                setLoading(false);
                setButtonType({ ...buttonType, buttonData: response.data.records });
                setProjectLoaded(true);
            }
        } catch (error) {
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };
    // GET PROJECT LIST END
    const isOpenModal2 = () => {
        setModal(true);
        setIsOverFlow(true);
        setDeleteError(false);
    };
    const closeDialogModal = () => {
        setModal(false);
        setIsOverFlow(false);
    };
    const HandleEventData = (event) => {
        setShow(event.target.value === commonConstants.SPECIFIED_EVENT_VALUE);
    };
    const handleCancel = () => {
        sessionStorage.removeItem(roleSessionKey);
        navigate('/role_list');
    };

    // ADD NEW ROLE START
    const handleAddRole = async (values, resetForm) => {
        if (processing.current) return
        processing.current = true;

        setLoading(true);
        const getSessionItem = sessionStorage.getItem(roleSessionKey);
        const parseSessionItem = JSON.parse(getSessionItem);

        if (parseSessionItem !== null) {
            values['roleRelationStyle'] = parseSessionItem; // I need It here

            const newRoleRelationStyle = values.roleRelationStyle;
            if (newRoleRelationStyle.limitType == '0') {
                newRoleRelationStyle.projectEvent = [];
            } else {
                if (newRoleRelationStyle.projectEvent) {
                    for (let i = 0; i < newRoleRelationStyle.projectEvent.length; i++) {
                        if (values[`tagType_${newRoleRelationStyle.projectEvent[i].currentProjectId}`]) {
                            newRoleRelationStyle.projectEvent[i]['eventFacilityRestrictions'] =
                                +values[`tagType_${newRoleRelationStyle.projectEvent[i].currentProjectId}`];
                        }
                        if (newRoleRelationStyle.projectEvent[i].eventFacilityRestrictions === 0) {
                            newRoleRelationStyle.projectEvent[i].eventTag = [];
                            newRoleRelationStyle.projectEvent[i].instituteTag = [];
                        } else {
                            if (typeof newRoleRelationStyle.projectEvent[i].eventTag === 'undefined') {
                                newRoleRelationStyle.projectEvent[i].eventTag = [];
                            }
                            if (typeof newRoleRelationStyle.projectEvent[i].instituteTag === 'undefined') {
                                newRoleRelationStyle.projectEvent[i].instituteTag = [];
                            }
                        }
                    }
                }
            }
        }

        const { roleName, isMFAEnabled, loginProjectId, roleRelationStyle, memo } = values;

        roleFormFun.dynamicKeyNameCheck(ParentChildData, values);
        try {
            const ENDPOINT = `${baseURL}${createRole}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    roleName: roleName,
                    isMFAEnabled: isMFAEnabled ? 0 : 1,
                    r1: values.r1,
                    r2: values.r2,
                    r3: values.r3,
                    r4: values.r4,
                    r5: values.r5,
                    r6: values.r6,
                    r7: values.r7,
                    r8: values.r8,
                    r9: values.r9,
                    r10: values.r10,
                    r11: values.r11,
                    r12: values.r12,
                    r13: 0,
                    r14: 0,
                    r15: 0,
                    loginProjectId: loginProjectId ? loginProjectId : 0,
                    roleRelationStyle: roleRelationStyle,
                    memo: memo ? memo : '',
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            const created = await instance.request(config);

            if (created) {
                setSystemError(false);
                setLoading(false);
            }
            if (!continuousAdd) {
                // if submit type is not continuous
                sessionStorage.removeItem(roleSessionKey);
                return navigate('/role_list');
            } else {
                // if submit type is continuous
                sessionStorage.removeItem(roleSessionKey);
                resetForm({ [values]: '' });
                setShow(false);
            }
        } catch (error) {
            console.error('SYSTEM ERROR ROLE_ADD: ', error);
            setSystemError(true);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    // UPDATED ROLE START
    const handleUpdateRole = async (values) => {
        if (processing.current) return
        processing.current = true;

        setLoading(true);
        const getSessionItem = sessionStorage.getItem(roleSessionKey);
        const parseSessionItem = JSON.parse(getSessionItem);

        if (parseSessionItem !== null) {
            // Retrieve roleRelationStyle form session Storage and set in Values.roleRelationStyle
            values['roleRelationStyle'] = parseSessionItem; // I need It here

            const newRoleRelationStyle = values.roleRelationStyle;
            if (newRoleRelationStyle.limitType == '0') {
                newRoleRelationStyle.projectEvent = [];
            } else {
                if (newRoleRelationStyle.projectEvent) {
                    for (let i = 0; i < newRoleRelationStyle.projectEvent.length; i++) {
                        if (values[`tagType_${newRoleRelationStyle.projectEvent[i].currentProjectId}`]) {
                            newRoleRelationStyle.projectEvent[i]['eventFacilityRestrictions'] =
                                +values[`tagType_${newRoleRelationStyle.projectEvent[i].currentProjectId}`];
                        }
                        if (newRoleRelationStyle.projectEvent[i].eventFacilityRestrictions === 0) {
                            newRoleRelationStyle.projectEvent[i].eventTag = [];
                            newRoleRelationStyle.projectEvent[i].instituteTag = [];
                        } else {
                            if (typeof newRoleRelationStyle.projectEvent[i].eventTag === 'undefined') {
                                newRoleRelationStyle.projectEvent[i].eventTag = [];
                            }
                            if (typeof newRoleRelationStyle.projectEvent[i].instituteTag === 'undefined') {
                                newRoleRelationStyle.projectEvent[i].instituteTag = [];
                            }
                        }
                    }
                }
            }
        }

        const { roleName, isMFAEnabled, loginProjectId, roleRelationStyle, memo } = values;
        // AIS add start
        let cpValues = JSON.parse(JSON.stringify(values));
        roleFormFun.dynamicKeyNameCheck(ParentChildData, cpValues);

        try {
            setDeleteLoading(true);
            const ENDPOINT = `${baseURL}${updateRole}${cpValues?.roleId}`;
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    roleName: roleName,
                    isMFAEnabled: isMFAEnabled ? 0 : 1,
                    r1: cpValues.r1,
                    r2: cpValues.r2,
                    r3: cpValues.r3,
                    r4: cpValues.r4,
                    r5: cpValues.r5,
                    r6: cpValues.r6,
                    r7: cpValues.r7,
                    r8: cpValues.r8,
                    r9: cpValues.r9,
                    r10: cpValues.r10,
                    r11: cpValues.r11,
                    r12: cpValues.r12,
                    r13: 0,
                    r14: 0,
                    r15: 0,
                    loginProjectId: loginProjectId ? loginProjectId : 0,
                    roleRelationStyle: roleRelationStyle,
                    memo: memo ? memo : '',
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            // AIS add End
            const updated = await instance.request(config);

            if (updated) {
                sessionStorage.removeItem(roleSessionKey);
                setSystemError(false);
                setDeleteLoading(false);
                setLoading(false);
                return navigate('/role_list');
            }
        } catch (error) {
            console.error('SYSTEM ERROR ROLE_UPDATE: ', error);
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

    const yupValidation = Yup.object({
        roleName: Yup.string()
            .min(2, `${errorMessages.W_GTE_01('ロール名', 2)}`)
            .required(`${errorMessages.W_REQUIRED_01('ロール名')}`),
    });

    // Add form type FFFFFFFFF
    const addFromFType = (e) => {
        const selectedItem = e.itemData;
        const selectedItemId = e.itemData?.projectId;
        const selectedItemValue = e.itemData?.projectName;

        let stateButtonData = [...buttonType.buttonData];
        stateButtonData.forEach((item, index, arr) => {
            if (item?.projectId == selectedItemId) {
                item.disabled = true;
            }
        });
        const newButtonData = { ...buttonType, buttonData: stateButtonData };
        setButtonType({ ...newButtonData });

        let stateArray = [...dragList];

        const fromObj = {
            Name: selectedItemValue,
            Title: selectedItemValue,
            currentProjectId: selectedItemId,
            // Tree view list
            id: selectedItemId,
            expanded: false,
            ID: selectedItemId,
            eventFacilityRestrictions: 0,
        };
        stateArray.push(fromObj);

        setDragList && setDragList([...dragList, fromObj]);

        const getSessionItem = JSON.parse(sessionStorage.getItem(roleSessionKey));
        if (getSessionItem !== null) {
            if (getSessionItem['projectEvent']) {
                getSessionItem['projectEvent'] = [...getSessionItem['projectEvent'], fromObj];
            } else {
                getSessionItem['projectEvent'] = [fromObj];
            }
            sessionStorage.setItem(roleSessionKey, JSON.stringify(getSessionItem));
        }
    };
    const deteleFromFType = (item) => {
        try {
            setFunctionMode && setFunctionMode({ mode: 'delete', item: item }); // Employee list useEffect
            const data = item; // props assign as a data
            const selectedItemId = data.id; // select id
            const itemButtonId = data.ID; // item button id for disable make false
            const stateButton = buttonType; // button all data copy
            let stateButtonData = [...stateButton.buttonData]; // button array get
            stateButtonData.forEach((item, index, arr) => {
                if (item.projectId === itemButtonId) {
                    item.disabled = false;
                }
            });
            // new button type data added after delete rows
            const newButtonData = { ...buttonType, buttonData: stateButtonData };
            setButtonType(newButtonData);

            //  set new drag list after delete
            const getSessionItem = JSON.parse(sessionStorage.getItem(roleSessionKey));
            const items = [...getSessionItem.projectEvent];
            const filteredItems = items.filter((item) => item.id !== selectedItemId);
            setDragList([]);
            setTimeout(() => {
                setDragList(filteredItems);
            }, 0);

            let sessionStorageRes = {};
            sessionStorageRes.limitType = 1;
            sessionStorageRes.projectEvent = filteredItems;
            sessionStorage.setItem(roleSessionKey, JSON.stringify(sessionStorageRes));
        } catch (error) {
            console.log('Error from delete item row event item modal', error);
        }
    };

    // Role delete operation
    const handleDelete = async () => {
        if (processing.current) return
        processing.current = true;

        setLoading(true);
        const ENDPOINT = `${baseURL}${deleteRole}${initialValues?.roleId}`;
        try {
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
            const deleteRole = await instance.request(config);
            if (deleteRole) {
                setDeleteError(false);
                setLoading(false);
                navigate('/role_list');
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

    const projectLimitHandle = () => {
        const getSessionItem = JSON.parse(sessionStorage.getItem(roleSessionKey));
        if (getSessionItem.projectEvent) {
            setDragList(getSessionItem.projectEvent);
        }
    };

    return (
        <>
            {load || !Object.keys(initialValues).length ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 p-0">
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={{
                            ...initialValues,
                        }}
                        validationSchema={yupValidation}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            if (formType === 'add') {
                                handleAddRole(values, resetForm);
                            } else {
                                handleUpdateRole(values, {
                                    setSubmitting,
                                });
                            }
                        }}
                    >
                        {({ errors, setFieldValue }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <>
                                    <FormObserver setTagShow={setTagShow} pathName={pathName} />
                                    <div className="relative w-full h-full">
                                        {loading && <Loading />}
                                        <Form>
                                            <FormBodyContainer
                                                height={`${formType === 'add' ? '!min-h-[calc(100vh-436px)]' : ''}`}
                                            >
                                                <InputContainer>
                                                    <TextBox
                                                        label="ロール名（32文字まで）"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        type="text"
                                                        name="roleName"
                                                        maxLength="32"
                                                        placeholder="ロール名"
                                                        isRequired
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <ToggleLock
                                                        label="二段階認証"
                                                        labelClassName="text-blue-100"
                                                        name="isMFAEnabled"
                                                        inputClassName=""
                                                        type="checkbox"
                                                        textLeft="二段階認証無効"
                                                        textRight="二段階認証有効"
                                                    />
                                                </InputContainer>
                                                <div className="flex flex-col w-full">
                                                    <TextBox
                                                        label="配属アカウント数"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="read-only border-all text-right pointer-events-none"
                                                        type="text"
                                                        readOnly={true}
                                                        tabIndex="-1"
                                                        name="numberOfAccounts"
                                                    />
                                                </div>

                                                {/*---component for checkbox starts (authorityManagementServices)---*/}
                                                <ParentChildCheckBox label="権限管理" Data={ParentChildData} />

                                                <InputContainer>
                                                    <label className="text-blue-100">許可プロジェクト・イベント</label>
                                                    <div className="px-8">
                                                        <InputContainer>
                                                            <SelectBox
                                                                label="プロジェクト制限"
                                                                labelClassName="text-blue-100"
                                                                inputClassName="bg-blue-25"
                                                                name="limitType"
                                                                onClick={projectLimitHandle}
                                                            >
                                                                {selectOptions.length > 0 &&
                                                                    selectOptions.map((role) => (
                                                                        <option value={role.id} key={role.id}>
                                                                            {role.value}
                                                                        </option>
                                                                    ))}
                                                            </SelectBox>
                                                        </InputContainer>
                                                        {
                                                            // tagShow &&
                                                        }
                                                        {tagShow && (
                                                            <div className="px-10">
                                                                {dragList.length > 0 &&
                                                                    dragList.map((dL, index) => (
                                                                        <ExpandRow
                                                                            key={index}
                                                                            rowsLabel={dL.Name}
                                                                            item={dL}
                                                                            extendFormType={'role'}
                                                                            deteleFromFType={deteleFromFType}
                                                                            pathName={pathName} // For set SessionStorage
                                                                            setSystemError={setSystemError} // setSystemError comes from ExpandRow
                                                                            projectEvent={dragList} // for Accordion
                                                                            setFieldValue={setFieldValue}
                                                                        />
                                                                    ))}

                                                                <ButtonTypeF
                                                                    buttonData={buttonType.buttonData}
                                                                    displayExpr="projectName"
                                                                    valueExpr="projectId"
                                                                    optionValue={optionValue}
                                                                    addFromFType={addFromFType}
                                                                    placeholder="プロジェクト追加"
                                                                />
                                                            </div>
                                                        )}
                                                    </div>
                                                </InputContainer>
                                            </FormBodyContainer>

                                            {/*---component for Form Footer starts---*/}

                                            <ModalFormFooterWithHover
                                                buttonComponents={true}
                                                btn_title1={`${formType === 'add' ? 'キャンセル' : '権限ロール削除'}`}
                                                btn_title2={`${formType === 'add' ? '追加' : '更新'}`}
                                                formType={formType}
                                                setOpenModal={isOpenModal2}
                                                setIsOverFlow={setIsOverFlow}
                                                handleCancel={handleCancel}
                                                memoClassName="!text-blue-100"
                                                padding={`${formType === 'add' ? '!pb-6' : ''}`}
                                                deleteLoading={deleteLoading}
                                            >
                                                {/* ----error---- */}
                                                <ErrorMessage>
                                                    {errors[first]}
                                                    {alreadyDeletedErrorMessage &&
                                                        !errors[first] &&
                                                        `${alreadyDeletedErrorMessage}`}
                                                    {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                                </ErrorMessage>
                                            </ModalFormFooterWithHover>
                                        </Form>

                                        {modal && (
                                            <DialogModal
                                                title="削除"
                                                btn_title="権限ロール削除"
                                                cancel_title="いいえ"
                                                handleButtonLeft={handleDelete}
                                                handleButtonRight={closeDialogModal}
                                                setIsOverFlow={setIsOverFlow}
                                                deleteLoading={deleteLoading}
                                                errors={
                                                    <span className={`${deleteErrorMessage} ? "visible" : "invisible"`}>
                                                        {/* {projectError && !errors[first] ? `${errorMessages.W_EXISTS_01('プロジェクトコード')}` : errors[first]} */}
                                                        {deleteError && deleteErrorMessage && `${deleteErrorMessage}`}
                                                    </span>
                                                }
                                            >
                                                <div className="text-center mt-[1rem]">
                                                    <p>選択した権限ロールを削除します。</p>
                                                    <div className="text-orange-500 mt-[1rem]">
                                                        削除したデータは復元できません。
                                                    </div>
                                                </div>
                                            </DialogModal>
                                        )}
                                    </div>
                                </>
                            );
                        }}
                    </Formik>
                </Page1440Body>
            )}
        </>
    );
};
export default RoleForm;
