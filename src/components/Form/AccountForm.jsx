import { Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { errorMessages } from '../../lib/errorMessages';
import { accountFormSchema } from '../../lib/Schema';
import {
    baseURL,
    createAccount,
    deleteAccount,
    deleteMethod,
    listRoles,
    updateAccount,
    updateMethod,
    createMethod,
    listMethod,
} from '../../restapi/queries';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loading from '../Loading/Loader';
import DialogModal from '../Modal/DialogModal';
import Page1440Body from '../Page1440/Page1440Body';
import FormBodyContainer from '../Wrapper/FormBodyContainer';
import InputContainer from '../Wrapper/InputContainer';
import FormFooter from './FormFooter';
import PasswordWithEye from './FormInputs/PasswordWithEye';
import SelectBox from './FormInputs/SelectBox';
import TextBox from './FormInputs/TextBox';
import ToggleLock from './FormInputs/ToggleLock';
import { instance } from '../../services/axios.js';
import commonConstants from '../../lib/commonConstants';
import { getErrorMessageWithErrorCode } from '../../lib/getErrorMessageWithErrorCode';

const AccountForm = ({ initialValues, formType, load = false, error = null, setIsOverFlow }) => {
    const processing = useRef(false);
    const [loading, setLoading] = useState(true);
    const { info } = useSelector((state) => state.auth);
    const [continuousAdd, setContinuousAdd] = useState(false);
    const [accountError, setAccountError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [systemError, setSystemError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const [alreadyDeletedErrorMessage, setAlreadyDeletedErrorMessage] = useState('');
    const navigate = useNavigate();
    const [top, setTop] = useState(false);
    const [eye, setEye] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [options, setOptions] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(false);

    let click = 0,
        update = 0;
    const handleCancel = () => {
        navigate('/account_list');
    };
    const closeModal = () => {
        setOpenModal(false);
        setIsOverFlow(false);
        setDeleteError(false);
    };

    useEffect(() => {
        document.getElementById('scroller')?.scrollIntoView({ top: '0', behavior: 'smooth' });
    }, [top]);

    useEffect(() => {
        const ENDPOINT = `${baseURL}${listRoles}?itemsPerPage=500&pagesVisited=0`;
        (async () => {
            try {
                if (processing.current) return;
                processing.current = true;
                setLoading(true);
                const config = { method: listMethod, url: ENDPOINT };
                const response = await instance.request(config);
                const result = await response.data;
                if (result.error) throw new Error(result.error);
                if (result.records !== undefined) {
                    setOptions(
                        result.records.map(({ roleId, roleName, ...rest }) => ({
                            id: roleId,
                            value: roleName,
                            ...rest,
                        }))
                    );
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
            } finally {
                processing.current = false;
            }
        })();
    }, []);

    //account add form submit action
    const handleAddAccount = async (values, resetForm) => {
        setLoading(true);
        click++;
        update++;
        try {
            if (processing.current) return;
            processing.current = true;
            const ENDPOINT = `${baseURL}${createAccount}`;
            const config = {
                method: createMethod,
                url: ENDPOINT,
                data: {
                    accountId: values.accountId.trim(),
                    fullName: values.fullName.trim(),
                    roleId: values.roleId,
                    email: values.email,
                    initialPassword: values.initialPassword,
                    initialState: values.initialPassword ? true : false,
                    createdAt: Date.now().toLocaleString(),
                    createdBy: info.accountId,
                    updatedBy: info.accountId,
                    isLocked: !values.isLocked ? 1 : 0,
                    memo: values.memo,
                },
            };
            const newAccount = await instance.request(config);
            //if account create is successful
            newAccount && setSystemError(false);

            //if submit type is not continuous
            if (!continuousAdd) return navigate('/account_list');

            //if submit type is continuous
            setTop((prev) => !prev);
            resetForm({ [values]: '' });
            setEye(false);
            setLoading(false);
        } catch (error) {
            if (error.response.status === 409) {
                setAccountError(true);
                setLoading(false);
            } else {
                setSystemError(true);
                setAccountError(false);
                setLoading(false);
            }
        } finally {
            processing.current = false;
        }
    };
    //This is for edit account screen
    const handleUpdateAccount = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        const ENDPOINT = `${baseURL}${updateAccount}${values.accountId}`;
        click++;
        update++;
        //update account
        try {
            setDeleteLoading(true);
            const config = {
                method: updateMethod,
                url: ENDPOINT,
                data: {
                    fullName: values.fullName.trim(),
                    roleId: values.roleId,
                    email: values.email,
                    initialPassword: values.initialPassword,
                    isLocked: !values.isLocked ? 1 : 0,
                    memo: values.memo,
                    updatedBy: info.accountId,
                },
            };
            const updateAccount = await instance.request(config);

            if (updateAccount) {
                setSystemError(false);
                navigate('/account_list');
                setDeleteLoading(false);
                setLoading(false);
            }
        } catch (error) {
            if (error.response.status === 403) {
                setPasswordError(true);
                setDeleteLoading(false);
            } else if (error.response.status === 400) {
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

    //account delete operation
    const handleDelete = async () => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        const ENDPOINT = `${baseURL}${deleteAccount}${initialValues.accountId}`;
        try {
            const config = { method: deleteMethod, url: ENDPOINT, data: { deletedBy: info.accountId } };
            const deleteAccount = await instance.request(config);
            if (deleteAccount) {
                setDeleteError(false);
                setLoading(false);
                navigate('/account_list');
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

    return (
        <div>
            {loading && <Loading />}

            {load ? (
                <Loading />
            ) : (
                <Page1440Body className="page1440-body3 p-0">
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={initialValues}
                        validationSchema={accountFormSchema(formType)}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            if (formType === 'add') {
                                handleAddAccount(values, resetForm);
                            } else {
                                handleUpdateAccount(values, {
                                    setSubmitting,
                                });
                            }
                        }}
                    >
                        {({ errors }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <>
                                    <div className="relative w-full h-full">
                                        {loading && <Loading />}
                                        <Form>
                                            <div className="-mt-4" id="scroller"></div>
                                            <FormBodyContainer>
                                                {/* accountId*/}
                                                <InputContainer>
                                                    {formType === 'edit' ? (
                                                        <TextBox
                                                            label="アカウントID（16文字まで 変更不可）"
                                                            labelClassName="text-blue-100"
                                                            name="accountId"
                                                            inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                            type="text"
                                                            readOnly
                                                            tabIndex="-1"
                                                            isRequired
                                                        />
                                                    ) : (
                                                        <TextBox
                                                            label="アカウントID（16文字まで 変更不可）"
                                                            labelClassName="text-blue-100"
                                                            name="accountId"
                                                            inputClassName="bg-blue-25"
                                                            type="text"
                                                            maxLength="16"
                                                            placeholder="アカウントID"
                                                            isRequired
                                                        />
                                                    )}
                                                </InputContainer>

                                                {/* --fullName-- */}
                                                <InputContainer>
                                                    <TextBox
                                                        label="氏名（32文字まで）"
                                                        labelClassName="text-blue-100"
                                                        name="fullName"
                                                        inputClassName="bg-blue-25"
                                                        type="text"
                                                        maxLength="32"
                                                        placeholder="氏名"
                                                        isRequired
                                                    />
                                                </InputContainer>
                                                {/*-- roleId--  */}
                                                <InputContainer>
                                                    <SelectBox
                                                        label="ロール"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="roleId"
                                                        isRequired
                                                    >
                                                        <option value="">
                                                            {' '}
                                                            {commonConstants.INPUT_PLACEHOLDER_PREFIX_SELECT(
                                                                'ロール'
                                                            )}{' '}
                                                        </option>
                                                        {options.length > 0 &&
                                                            options.map((role) => (
                                                                <option value={role.id} key={role.id}>
                                                                    {role.value}
                                                                </option>
                                                            ))}
                                                    </SelectBox>
                                                </InputContainer>
                                                {/*-- email-- */}
                                                <InputContainer>
                                                    <TextBox
                                                        label="メールアドレス"
                                                        labelClassName="text-blue-100"
                                                        name="email"
                                                        inputClassName="bg-blue-25"
                                                        type="text"
                                                        placeholder="メールアドレス"
                                                    />
                                                </InputContainer>
                                                {/* --initialPassword-- */}
                                                <InputContainer>
                                                    <PasswordWithEye
                                                        label="初期パスワード"
                                                        labelClassName="text-blue-100"
                                                        name="initialPassword"
                                                        inputClassName="bg-blue-25"
                                                        eye={eye}
                                                        setEye={setEye}
                                                        maxLength="32"
                                                        placeholder="初期パスワード"
                                                        isRequired={formType === 'edit' ? false : true}
                                                    />
                                                </InputContainer>

                                                <InputContainer>
                                                    <TextBox
                                                        label="最終ログイン日時"
                                                        labelClassName="text-blue-100"
                                                        name="lastLoginTime"
                                                        inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                        type="text"
                                                        readOnly
                                                        tabIndex="-1"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <TextBox
                                                        label="パスワード有効期限"
                                                        labelClassName="text-blue-100"
                                                        name="passwordExpirationDate"
                                                        inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                        type="text"
                                                        readOnly
                                                        tabIndex="-1"
                                                    />
                                                </InputContainer>
                                                {/* currentLoginFailureCount */}
                                                <InputContainer>
                                                    <TextBox
                                                        label="ログイン失敗回数"
                                                        labelClassName="text-blue-100"
                                                        name="currentLoginFailureCount"
                                                        inputClassName="bg-gray-300 cursor-default pointer-events-none"
                                                        type="text"
                                                        readOnly
                                                        tabIndex="-1"
                                                    />
                                                </InputContainer>
                                                {/* initialState */}
                                                <InputContainer>
                                                    <TextBox
                                                        label="初期状態"
                                                        labelClassName="text-blue-100"
                                                        name="initialState"
                                                        inputClassName={`${
                                                            initialValues.initialState === '初期状態です'
                                                                ? 'text-orange-300'
                                                                : 'text-black'
                                                        } bg-gray-300 cursor-default pointer-events-none`}
                                                        type="text"
                                                        readOnly
                                                        tabIndex="-1"
                                                    />
                                                </InputContainer>
                                                {/* isLocked */}
                                                <InputContainer>
                                                    <ToggleLock
                                                        label="ロック状態"
                                                        labelClassName="text-blue-100"
                                                        name="isLocked"
                                                        inputClassName=""
                                                        type="checkbox"
                                                        textLeft="ロック解除"
                                                        textRight="ロック "
                                                    />
                                                </InputContainer>
                                            </FormBodyContainer>
                                            <FormFooter
                                                btn_title1={`${formType === 'add' ? '新規追加' : 'アカウント削除'}`}
                                                btn_title2={`${formType === 'add' ? '連続追加' : '更新'}`}
                                                btn_title3="キャンセル"
                                                setContinuousAdd={setContinuousAdd}
                                                formType={formType}
                                                setOpenModal={setOpenModal}
                                                setIsOverFlow={setIsOverFlow}
                                                handleCancel={handleCancel}
                                                loading={loading}
                                                deleteLoading={deleteLoading}
                                            >
                                                {/* ----error---- */}
                                                <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                    {accountError && !errors[first]
                                                        ? `${errorMessages.W_ACCOUNT_01}`
                                                        : errors[first]}
                                                    {passwordError &&
                                                        !errors[first] &&
                                                        `${errorMessages.W_PASSWORD_04}`}
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
                                            btn_title="アカウント削除"
                                            cancel_title="キャンセル"
                                            handleButtonRight={closeModal}
                                            setIsOverFlow={setIsOverFlow}
                                            handleButtonLeft={handleDelete}
                                            deleteLoading={deleteLoading}
                                            errors={
                                                <span
                                                    className={`${deleteErrorMessage !== ''} ? "visible" : "invisible"`}
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
                                </>
                            );
                        }}
                    </Formik>
                </Page1440Body>
            )}
        </div>
    );
};
export default AccountForm;
