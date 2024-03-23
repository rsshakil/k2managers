/* eslint-disable no-unused-vars */
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import Button from '../../components/Button/Button';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Note from '../../components/Form/FormInputs/Note';
import TextAreaInput from '../../components/Form/FormInputs/TextAreaInput';
import TextBox from '../../components/Form/FormInputs/TextBox';
import Loading from '../../components/Loading/Loader';
import BaseModal from '../../components/Modal/BaseModal';
import ButtonContainer from '../../components/Wrapper/ButtonContainer';
import InputContainer from '../../components/Wrapper/InputContainer';
import { createArray } from '../../lib/createArray';
import { errorMessages } from '../../lib/errorMessages';
import { appModalSchema } from '../../lib/Schema';
import { baseURL, getAppNotice, listMethod, updateAdminAppNotice, updateMethod } from '../../restapi/queries';
import { instance } from '../../services/axios.js';
import { handleAppNoticeValues } from '../../utilities/handleAppNoticeValues';
import InformationSection from './Components/InformationSection';
import { staticData } from './Components/modalDemoData';

function AppModal({ setOpenModal, setIsOverFlow, appId }) {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [formattedData, setFormattedData] = useState([]);
    const [updateError, setUpdateError] = useState(false);
    useEffect(() => {
        const ENDPOINT = `${baseURL}${getAppNotice}${appId}`;
        async function getAppNoticeData() {
            try {
                setLoading(true);
                const config = {
                    method: listMethod,
                    url: ENDPOINT,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                };
                const res = await instance.request(config);
                setData(res.data);
                setFormattedData(formatData(res.data));
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        }
        getAppNoticeData();
    }, [appId]);

    const handleCancel = () => {
        setOpenModal(false);
        setIsOverFlow(false); //background overflow will not present
        if (sessionStorage.getItem('appId')) sessionStorage.removeItem('appId');
        if (sessionStorage.getItem('openModal')) sessionStorage.removeItem('openModal');
    };
    const formatData = (data) => {
        const filtered = Object.fromEntries(Object.entries(data).filter(([key]) => key.includes('appNotice')));
        filtered.memo = data.memo;
        return filtered;
    };

    const handleSubmit = async (values) => {
        setUpdateLoading(true);
        const ENDPOINT = `${baseURL}${updateAdminAppNotice}${appId}`;
        const reqBody = {
            appNoticeValues: handleAppNoticeValues(values),
            memo: `${values.memo}`,
        };

        try {
            const config = { method: updateMethod, url: ENDPOINT, data: reqBody };
            const res = await instance.request(config);
            if (res.status === 200) {
                setOpenModal(false);
                if (sessionStorage.getItem('appId')) sessionStorage.removeItem('appId');
                if (sessionStorage.getItem('openModal')) sessionStorage.removeItem('openModal');

                setUpdateLoading(false);
            } else {
                setUpdateError(true);
                setLoading(false);
                setUpdateLoading(false);
            }
        } catch (error) {
            setUpdateError(true);
            setLoading(false);
            setUpdateLoading(false);
        }
    };
    return (
        <>
            {updateLoading && <Loading />}
            <BaseModal title={data.appName ? data.appName : ''}>
                {loading ? (
                    <Loading />
                ) : (
                    <Formik
                        validateOnChange={false}
                        validateOnBlur={false}
                        initialValues={formattedData}
                        validationSchema={appModalSchema()}
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            handleSubmit(values);
                        }}
                    >
                        {({ errors }) => {
                            const first = Object.keys(errors)[0];
                            return (
                                <Form>
                                    {createArray(16)?.map((item) => (
                                        <InformationSection
                                            titleLabel={staticData.titleLabel(item + 1)}
                                            titlePlaceholder={staticData.titlePlaceholder(item + 1)}
                                            contentLabel={staticData.contentLabel(item + 1)}
                                            contentPlaceholder={staticData.contentPlaceholder(item + 1)}
                                            colorLabel={staticData.colorLabel(item + 1)}
                                            colorValues={['青', '黄', '赤']}
                                            titleName={`appNoticeTitle${item + 1}`}
                                            contentName={`appNoticeContents${item + 1}`}
                                            colorName={`appNoticeColor${item + 1}`}
                                            key={item}
                                        />
                                    ))}

                                    <InputContainer>
                                        <TextBox
                                            label="利用規約チェック文言（16文字まで）"
                                            inputClassName="bg-blue-25 placeholder-blue-50 text-black"
                                            labelClassName="font-normal"
                                            maxLength="16"
                                            name="appNoticeTermsOfServiceTitle"
                                            placeholder="利用規約チェックボックス横の文言を入力して下さい"
                                            isRequired
                                        />
                                    </InputContainer>

                                    {/* Terms of use (up to 2048 characters can be broken) */}
                                    <InputContainer className="mb-24">
                                        <TextAreaInput
                                            label="利用規約内容（2048文字まで　改行可）"
                                            inputClassName="bg-blue-25 resize-none  placeholder-blue-50 text-black"
                                            maxLength="2048"
                                            labelClassName="font-normal"
                                            name="appNoticeTermsOfServiceContents"
                                            placeholder="利用規約の内容。"
                                            isRequired
                                        />
                                    </InputContainer>

                                    {/* bottom section */}
                                    {/* memo upto 2048 characters */}
                                    <InputContainer>
                                        <Note
                                            label="メモ（2048文字まで）"
                                            inputClassName="bg-blue-25 resize-none text-black"
                                            labelClassName="font-normal"
                                            name="memo"
                                        />
                                    </InputContainer>
                                    <ErrorMessage>
                                        {errors[first] && errors[first]}
                                        {updateError && errorMessages.E_SYSTEM_01}
                                    </ErrorMessage>
                                    <ButtonContainer>
                                        <Button
                                            title="キャンセル"
                                            className="bg-blue-100"
                                            hoverColorType="hover:bg-blue-300"
                                            type="button"
                                            onClick={handleCancel}
                                        />
                                        <Button
                                            title="設定保存"
                                            type="submit"
                                            onClick={() => {
                                                setIsOverFlow(false);
                                            }}
                                        />
                                    </ButtonContainer>
                                </Form>
                            );
                        }}
                    </Formik>
                )}
            </BaseModal>
        </>
    );
}

export default AppModal;
