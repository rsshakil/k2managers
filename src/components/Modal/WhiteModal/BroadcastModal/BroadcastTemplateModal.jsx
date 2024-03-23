import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../../Loading/Loader';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import { Form, Formik } from 'formik';
import InputContainer from '../../../Wrapper/InputContainer';
import TextBox from '../../../Form/FormInputs/TextBox';
import ModalFormFooter from '../../../Footer/ModalFormFooter';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import { errorMessages } from '../../../../lib/errorMessages';
import ReplacementTagList from './ReplacementTagList';
import TextAreaInput from '../../../Form/FormInputs/TextAreaInput';
import { DateBox } from 'devextreme-react';
import { locale } from 'devextreme/localization';
import { useSelector } from 'react-redux';
import {
    baseURL,
    listMethod,
    updateMethod,
    deleteMethod,
    listBroadcast,
    broadcastTemplateRead,
    broadcastTemplateUpdate,
} from '../../../../restapi/queries';
import { instance } from '../../../../services/axios.js';
import DialogModal from '../../DialogModal';
import Button from '../../../Button/Button';
import ButtonContainer from '../../../Wrapper/ButtonContainer';
import { broadcastTemplateSchema } from '../../../../lib/Schema';
import { getErrorMessageWithErrorCode } from '../../../../lib/getErrorMessageWithErrorCode';

export default function BroadcastTemplateModal({
    formType = 'add',
    broadcastType = 0,
    initialValues,
    readonly,
    handleCancel,
}) {
    // LOCAL DECLARATION START
    locale('ja-JP')
    const processing = useRef(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({});
    const [systemError, setSystemError] = useState(false);
    const [deleteError, setDeleteError] = useState(false);
    const [deleteErrorMessage, setDeleteErrorMessage] = useState('');
    const { info } = useSelector((state) => state.auth);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [broadcastScheduleDatetime, setBroadcastScheduleDatetime] = useState(null);

    const navigate = useNavigate();

    const dateBoxConfig = {
        acceptCustomValue: false,
        min: new Date(2023, 0, 1),
        max: new Date(2050, 0, 1),
    };

    const replacementTagRecords = [
        { id: 1, column: '名', replacementTag: '{{broadcastLastName}}' },
        { id: 2, column: '姓', replacementTag: '{{broadcastFirstName}}' },
        { id: 3, column: 'メールアドレス', replacementTag: '{{broadcastEmailAddress}}' },
        { id: 4, column: '電話番号', replacementTag: '{{broadcastTelNo}}' },
        { id: 5, column: '住所', replacementTag: '{{broadcastAddress}}' },
        { id: 6, column: '項目1', replacementTag: '{{broadcastVarious1}}' },
        { id: 7, column: '項目2', replacementTag: '{{broadcastVarious2}}' },
        { id: 8, column: '項目3', replacementTag: '{{broadcastVarious3}}' },
        { id: 9, column: '項目4', replacementTag: '{{broadcastVarious4}}' },
        { id: 10, column: '項目5', replacementTag: '{{broadcastVarious5}}' },
        { id: 11, column: '項目6', replacementTag: '{{broadcastVarious6}}' },
        { id: 12, column: '項目7', replacementTag: '{{broadcastVarious7}}' },
        { id: 13, column: '項目8', replacementTag: '{{broadcastVarious8}}' },
    ];
    // LOCAL DECLARATION END

    useEffect(() => {
        getTemplateInfo(initialValues)
    }, [])

    // read broadcast template
    const getTemplateInfo = async (initialValues) => {
        if (initialValues.broadcastTemplateId && initialValues.broadcastTemplateId !== 0) {
            setSystemError(false);
            setLoading(true);
            try {
                const projectId = sessionStorage.getItem('currentProjectId');
                const ENDPOINT = `${baseURL}${broadcastTemplateRead}${initialValues?.broadcastId}?pid=${projectId}`;
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const response = await instance.request(config);
                if (response?.data?.records) {
                    let templateInfo = response?.data?.records;
                    setFormData(templateInfo);
                    console.log('formData Updates', response?.data?.records);
                    setBroadcastScheduleDatetime(templateInfo.broadcastScheduleDatetime ? Math.floor(new Date(templateInfo.broadcastScheduleDatetime).getTime() * 1000) : null)
                }
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
        }
    }

    // calendar change
    const onValueChangedHandleSD = (e) => {
        console.log('e.value', e);
        if (typeof e.value !== 'undefined') {
            let dateValues = e.value ? new Date(e.value).getTime() : null;
            setBroadcastScheduleDatetime(dateValues);
        }
    },
    // option change
    onOptionChanged = (e) => {
        if (e.name === 'text' && e.value !== '') {}
    },
    onChangeHandle = (e) => {};

    // value change
    const handleChange = async (e) => {
        const { value, name } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    // update broadcast template
    const handleUpdate = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${broadcastTemplateUpdate}${initialValues?.broadcastId}?pid=${projectId}`;
            let body = {
                projectId: projectId,
                broadcastTemplateTitle: values?.broadcastTemplateTitle ?? '',
                broadcastTemplateFrom: broadcastType === 0 ? (values?.broadcastTemplateFrom ?? '') : '',
                broadcastTemplateSubject: broadcastType === 0 ? (values?.broadcastTemplateSubject ?? ''): '',
                broadcastTemplateBody: values?.broadcastTemplateBody ?? '',
                memo: values?.memo ?? '',
                broadcastScheduleDatetime: broadcastScheduleDatetime ? Math.floor(new Date(broadcastScheduleDatetime).getTime() / 1000) : null,
                createdBy: info.accountId,
                updatedBy: info.accountId,
            };
            const config = {
                url: ENDPOINT,
                method: updateMethod,
                data: JSON.stringify(body),
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            };
            await instance.request(config);
            navigate('/broadcast_list');
            handleCancel(false);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setSystemError(true);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    // cancel broadcast
    const handleDelete = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        setDeleteError(false);
        try {
            const projectId = sessionStorage.getItem('currentProjectId');
            const ENDPOINT = `${baseURL}${listBroadcast}${initialValues?.broadcastId}?pid=${projectId}`;
            const config = {
                method: deleteMethod,
                url: ENDPOINT,
                data: {
                    projectId: projectId,
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
                navigate('/broadcast_list');
                handleCancel(false);
            }
        } catch (error) {
            console.log(error);
            const matchErrorMessage = getErrorMessageWithErrorCode(error);
            setDeleteError(true);
            setDeleteErrorMessage(matchErrorMessage);
            setLoading(false);
        } finally {
            processing.current = false;
        }
    };

    const closeDialogModal = () => {
        setOpenDeleteModal(false);
        setDeleteError(false);
    };

    return (
        <>
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                {/* this is the modal title section */}
                <ModalTitle
                    className="text-blue-100 bold text-xl"
                    title={broadcastType === 0 ? '一斉送信メールテンプレート' : '一斉送信SMSテンプレート'}
                />
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    validationSchema={broadcastTemplateSchema(broadcastType)}
                    initialValues={formData}
                    enableReinitialize={true}
                    onSubmit={(values, {}) => {
                        handleUpdate(values);
                    }}
                >
                    {({ errors }) => {
                        const first = Object.keys(errors)[0];
                        return (
                            <div className="relative w-full h-full">
                                <Form>
                                    <div className="mt-4" id="scroller"></div>
                                    <FormBodyContainer>
                                        <InputContainer>
                                            <TextBox
                                                label="一斉送信タイトル（32文字まで）"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 placeholder-gray-300"
                                                type="text"
                                                name="broadcastTemplateTitle"
                                                maxLength="32"
                                                placeholder="一斉送信タイトル"
                                                isRequired
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <label className="text-blue-100">送信予約日時（1000通送信完了するのに30分程度の時間を要するため、他の一斉送信の予約日時と間隔を置いて設定してください）</label>
                                            <div className="dx-field-value bg-blue-25 border border-blue-100 text-blue-50 ellipsis cursor-pointer devExtreameDateTimePicker cdx-DateBox">
                                                <DateBox
                                                    name='broadcastScheduleDatetime'
                                                    value={broadcastScheduleDatetime ?? null}
                                                    min={dateBoxConfig.min}
                                                    max={dateBoxConfig.max}
                                                    acceptCustomValue={dateBoxConfig.acceptCustomValue}
                                                    onValueChanged={onValueChangedHandleSD}
                                                    placeholder='送信予約日時'
                                                    showClearButton={true}
                                                    showTodayButton={true}
                                                    openOnFieldClick={true}
                                                    applyButtonText="OK"
                                                    applyValueMode="instantly"
                                                    type="datetime"
                                                    onOptionChanged={onOptionChanged}
                                                />
                                            </div>
                                        </InputContainer>

                                        <InputContainer className={'mt-20'}>
                                            {!broadcastType && (<>
                                                <InputContainer>
                                                    <TextBox
                                                        label="From"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="broadcastTemplateFrom"
                                                        placeholder="送信元（置換タグは使えません）"
                                                    />
                                                </InputContainer>
                                                <InputContainer>
                                                    <TextBox
                                                        label="Subject"
                                                        labelClassName="text-blue-100"
                                                        inputClassName="bg-blue-25"
                                                        name="broadcastTemplateSubject"
                                                        placeholder="題名"
                                                        isRequired
                                                    />
                                                </InputContainer>
                                            </>)}
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="本文"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 !h-[22rem]"
                                                    name="broadcastTemplateBody"
                                                    placeholder="本文（置換タグが使えます）"
                                                />
                                            </InputContainer>
                                            {readonly === false && (
                                                <InputContainer className={'mt-20'}>
                                                    <ReplacementTagList replacementTagRecords={replacementTagRecords} />
                                                </InputContainer>
                                            )}
                                        </InputContainer>
                                        {readonly === false ? (
                                            <InputContainer className={'mt-16'}>
                                                <ModalFormFooter
                                                    padding="!p-0"
                                                    btn_title1={`${formType === 'add' ? 'キャンセル' : broadcastType === 0 ? 'メール送信取り消し' : 'SMS送信取り消し'}`}
                                                    btn_title2={'更新'}
                                                    formType={formType}
                                                    handleCancel={handleCancel}
                                                    setIsOverFlow={false}
                                                    memoClassName="!text-blue-100"
                                                    buttonComponents={true}
                                                    setOpenModal={setOpenDeleteModal}
                                                    setContinuousAdd={() => {}}
                                                    deleteLoading={deleteLoading}
                                                >
                                                    {/* ----error---- */}
                                                    <ErrorMessage>
                                                        {errors[first]}
                                                        {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                                    </ErrorMessage>
                                                </ModalFormFooter>
                                            </InputContainer>
                                        ) : (
                                            <InputContainer className={'mt-16'}>
                                                <ButtonContainer>
                                                    <Button
                                                        title="キャンセル"
                                                        className="bg-blue-100"
                                                        hoverColorType="hover:bg-blue-300"
                                                        type="button"
                                                        onClick={handleCancel}
                                                    />
                                                </ButtonContainer>
                                            </InputContainer>
                                        )}
                                    </FormBodyContainer>
                                </Form>
                                {openDeleteModal && (
                                    <DialogModal
                                        title="取り消し"
                                        btn_title="取り消し"
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
                                            <p>選択した一斉送信を取り消します。</p>
                                            <div className="text-orange-500 mt-[1rem]">
                                                取り消した一斉送信は再送できません。
                                            </div>
                                        </div>
                                    </DialogModal>
                                )}
                            </div>
                        );
                    }}
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}