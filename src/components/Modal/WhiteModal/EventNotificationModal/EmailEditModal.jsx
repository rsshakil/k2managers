import { Form, Formik } from 'formik';
import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../../../../components/Loading/Loader';
import { errorMessages } from '../../../../lib/errorMessages';
import { baseURL, createEmailTemplate, updateMethod } from '../../../../restapi/queries';
import { instance } from '../../../../services/axios';
import Button from '../../../Button/Button';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import Note from '../../../Form/FormInputs/Note';
import TextAreaInput from '../../../Form/FormInputs/TextAreaInput';
import TextBox from '../../../Form/FormInputs/TextBox';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import InputContainer from '../../../Wrapper/InputContainer';
import ModalTitle from '../../components/ModalTitle';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import HierarchicalDataTable from './HierarchicalDataTable';

const EmailEditModal = ({
    handleCancel,
    eventID,
    eventCategoryId,
    initialValues,
    fieldValues,
    templateValuesError,
    typeFlag,
}) => {
    const processing = useRef(false);
    const { info } = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [systemError, setSystemError] = useState(false);

    const handleAdd = async (values) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        try {
            const ENDPOINT = `${baseURL}${createEmailTemplate}${eventID}`;
            let config = undefined;
            if (initialValues.emailTemplateId) {
                config = {
                    method: updateMethod,
                    url: ENDPOINT,
                    data: {
                        projectId: sessionStorage.getItem('currentProjectId'),
                        emailTemplateId: initialValues.emailTemplateId,
                        eventId: eventID,
                        eventCategoryId: eventCategoryId,
                        emailTemplateTypeFlag: typeFlag,
                        emailTemplateFrom: values.emailTemplateFrom,
                        emailTemplateSubject: values.emailTemplateSubject,
                        emailTemplateBody: values.emailTemplateBody,
                        memo: values.memo,
                        createdBy: info.accountId,
                        updatedBy: info.accountId,
                    },
                };
            } else {
                config = {
                    method: updateMethod,
                    url: ENDPOINT,
                    data: {
                        projectId: sessionStorage.getItem('currentProjectId'),
                        eventId: eventID,
                        eventCategoryId: eventCategoryId,
                        emailTemplateTypeFlag: typeFlag,
                        emailTemplateFrom: values.emailTemplateFrom ? values.emailTemplateFrom : '',
                        emailTemplateSubject: values.emailTemplateSubject ? values.emailTemplateSubject : '',
                        emailTemplateBody: values.emailTemplateBody ? values.emailTemplateBody : '',
                        memo: values.memo ? values.memo : '',
                        createdBy: info.accountId,
                        updatedBy: info.accountId,
                    },
                };
            }

            const created = await instance.request(config);
            // if create is successful
            if (created) {
                setSystemError(false);
                setLoading(false);
                handleCancel();
            }
        } catch (error) {
            setSystemError(true);
            setLoading(false);
        }finally {
            processing.current = false;
        }
    };

    function setModalTitle(emailFlag) {
        switch (emailFlag) {
            case 1:
                return '（新規）予約完了';
            case 2:
                return '（新規）再送メール';
            case 3:
                return '（検診前）リマインド';
            case 4:
                return '（変更）予約変更完了';
            case 5:
                return '（キャンセル）予約キャンセル完了';
            default:
                return '';
        }
    }

    return (
        <>
            {loading && <Loading />}
            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle
                    className="text-blue-100 bold text-xl"
                    title={`メールテンプレート管理：${setModalTitle(typeFlag)}`}
                />
                <Formik
                    validateOnChange={false}
                    validateOnBlur={false}
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                        handleAdd(values, resetForm);
                    }}
                >
                    {({ errors }) => {
                        const first = Object.keys(errors)[0];
                        return (
                            <>
                                <div className="relative w-full h-full">
                                    <Form>
                                        <FormBodyContainer className="min-h-[calc(100vh-420px)] !px-0">
                                            <InputContainer>
                                                <TextBox
                                                    label="From"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="emailTemplateFrom"
                                                    placeholder="送信元（置換タグは使えません）"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextBox
                                                    label="Subject"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    name="emailTemplateSubject"
                                                    placeholder="題名（置換タグは使えません）"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <TextAreaInput
                                                    label="本文"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 !h-[22rem]"
                                                    name="emailTemplateBody"
                                                    placeholder="本文（置換タグが使えます）"
                                                />
                                            </InputContainer>
                                            <InputContainer>
                                                <label className="text-blue-100">置換タグ一覧</label>
                                                <HierarchicalDataTable filedData={fieldValues[0]} />
                                            </InputContainer>
                                        </FormBodyContainer>

                                        <div>
                                            <InputContainer className="mb-8 mt-24">
                                                <Note
                                                    label="メモ（2048文字まで）"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25"
                                                    type="text"
                                                    name="memo"
                                                />
                                            </InputContainer>
                                            <ErrorMessage className={`${errors[first]} ? "visible" : "invisible"`}>
                                                {systemError && !errors[first] && `${errorMessages.E_SYSTEM_01}`}
                                            </ErrorMessage>
                                            <div className="flex space-x-[42px]">
                                                <Button
                                                    title="キャンセル"
                                                    className="bg-blue-100 hover:bg-blue-300"
                                                    type="button"
                                                    onClick={handleCancel}
                                                    disabled={!!loading}
                                                />
                                                <Button title="保存" type="submit" disabled={!!loading} />
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </>
                        );
                    }}
                </Formik>
            </WhiteModalWrapper>
        </>
    );
};
export default EmailEditModal;
