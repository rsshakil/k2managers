import ModalTitle from '../../components/ModalTitle';
import React, { useRef, useState } from 'react';
import Loading from '../../../../components/Loading/Loader';
import WhiteModalWrapper from '../../components/WhiteModalWrapper';
import { Form, Formik } from 'formik';
import FormBodyContainer from '../../../Wrapper/FormBodyContainer';
import InputContainer from '../../../Wrapper/InputContainer';
import Note from '../../../Form/FormInputs/Note';
import Button from '../../../Button/Button';
import ErrorMessage from '../../../ErrorMessage/ErrorMessage';
import { errorMessages } from '../../../../lib/errorMessages';
import TextAreaInput from '../../../Form/FormInputs/TextAreaInput';
import HierarchicalDataTable from './HierarchicalDataTable';
import { useSelector } from 'react-redux';
import { instance } from '../../../../services/axios';
import { baseURL, createSMSTemplate, updateMethod } from '../../../../restapi/queries';

const SmsEditModal = ({
    eventID,
    eventCategoryId,
    handleCancel,
    typeFlag,
    initialValues,
    fieldValues,
    templateValuesError,
}) => {
    const { info } = useSelector((state) => state.auth);
    const processing = useRef(false);
    const [loading, setLoading] = useState(false);

    const [systemError, setSystemError] = useState(false);

    const handleAdd = async (values, resetForm) => {
        if (processing.current) return;
        processing.current = true;
        setLoading(true);
        setSystemError(false);
        try {
            const projectId = sessionStorage.getItem('currentProjectId'),
                smsTemplateId = initialValues?.smsTemplateId,
                accountId = info.accountId,
                { smsTemplateBody, memo } = values;
            const ENDPOINT = `${baseURL}${createSMSTemplate}${eventID}`;
            let config = undefined;
            if (smsTemplateId) {
                // UPDATE SMS TEMPLATE
                config = {
                    method: updateMethod,
                    url: ENDPOINT,
                    data: {
                        projectId: projectId,
                        smsTemplateId: smsTemplateId,
                        eventId: eventID,
                        eventCategoryId: eventCategoryId,
                        smsTemplateTypeFlag: typeFlag,
                        smsTemplateBody: smsTemplateBody,
                        memo: memo,
                        createdBy: accountId,
                        updatedBy: accountId,
                    },
                };
            } else {
                // ADD SMS TEMPLATE
                config = {
                    method: updateMethod,
                    url: ENDPOINT,
                    data: {
                        projectId: projectId,
                        eventId: eventID,
                        eventCategoryId: eventCategoryId,
                        smsTemplateTypeFlag: typeFlag,
                        smsTemplateBody: smsTemplateBody ? smsTemplateBody : '',
                        memo: memo ? memo : '',
                        createdBy: accountId,
                        updatedBy: accountId,
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
                    title={`SMSテンプレート管理：${setModalTitle(typeFlag)}`}
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
                                                <TextAreaInput
                                                    label="本文"
                                                    labelClassName="text-blue-100"
                                                    inputClassName="bg-blue-25 !h-[22rem]"
                                                    name="smsTemplateBody"
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
export default SmsEditModal;
