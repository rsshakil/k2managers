import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import { appDesignerState, getTransitionDestinationRouteList } from '../../../store/recoil/appDesignerState';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import Loader from '../../Loading/Loader';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function DebugModeSettingBlockForm({
    blockData,
    setModalOpen = () => {},
    handleOnPressSave = () => {}, 
}) { 

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(blockData);
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { appURL } = recoilStateValue;

    function handleOnchange(e, buttonNo = 0) {
        let name = e.target.name;
        let value = valueFormatCheck(e.target.value);

        if (name == 'token') {
            var urlReadonly = `${appURL}/?debug=${value}`;
            updateFormData('url', urlReadonly);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    function updateFormData(name, value) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    useEffect(() => {
        if (formData.url == '') {
            let urlReadonly = '';
            if (formData.token != '') {
                urlReadonly = `${appURL}/?debug=${formData.token}`;
            } else {
                urlReadonly = appURL;
            }

            updateFormData('url', urlReadonly);
        }
    }, []);
    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="デバッグモード設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="デバッグモードの状態(使用しない設定の場合はトークンが一致してもデバッグモードに移行しません)"
                                            name="useDebug"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                        >
                                            <option value={true}>使用する</option>
                                            <option value={false}>使用しない</option>
                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <TextBox
                                            label="デバッグトークン（半角 英大 英小 数字のみ使用可能）"
                                            name="token"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData.token}
                                            onChange={handleOnchange}
                                        />
                                    </InputContainer>

                                    <InputContainer>
                                        <TextBox
                                            label="デバッグモード移行URL"
                                            name="url"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-gray-300 placeholder-gray-300 cursor-default pointer-events-default"
                                            value={formData.url}
                                            readOnly
                                        />
                                    </InputContainer>
                                </div>
                            </div>

                            <BlockModalFooter
                                setModalOpen={() => setModalOpen(false)}
                                handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                            />
                        </Form>
                    </div>
                </Formik>
            </WhiteModalWrapper>
        </>
    );
}
