import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import InputContainer from '../../Wrapper/InputContainer';

import { Form, Formik } from 'formik';
import React from 'react';
import { useRecoilState } from 'recoil';
import { appDesignerState } from '../../../store/recoil/appDesignerState';

const DebugModeSettingsForm = ({ formData: initialData, handleOnChange, handleOnChangeColor = () => {} }) => {
    const [recoilStateValue, setRecoilState] = useRecoilState(appDesignerState);
    const { appURL } = recoilStateValue;

    let initialData2 = {};
    initialData2.useDebug = initialData.useDebug;
    initialData2.token = initialData.token;
    initialData2.url = initialData.url;
    initialData2.memo = initialData.memo;
    if (initialData2.useDebug == true) {
        initialData2.url = 'https://' + appURL + '/?debug=' + initialData2.token;
    } else {
        initialData2.url = 'https://' + appURL;
    }

    return (
        <Formik
            validateOnChange={false}
            validateOnBlur={false}
            enableReinitialize={true}
            initialValues={initialData2}
            onSubmit=""
        >
            <div className="relative w-full">
                <Form>
                    <div>
                        <InputContainer>
                            <SelectBox
                                label="デバッグモードの状態(使用しない設定の場合はトークンが一致してもデバッグモードに移行しません)"
                                name="useDebug"
                                labelClassName="text-blue-100"
                                inputClassName="bg-blue-25"
                                onChange={(e) => handleOnChange(e, 4)}
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
                                onBlur={(e) => handleOnChange(e, 4)}
                            />
                        </InputContainer>

                        <InputContainer>
                            <TextBox
                                label="デバッグモード移行URL"
                                name="url"
                                labelClassName="text-blue-100"
                                inputClassName="bg-gray-300 placeholder-gray-300 cursor-default pointer-events-default"
                                readOnly
                            />
                        </InputContainer>
                    </div>
                </Form>
            </div>
        </Formik>
    );
};
export default DebugModeSettingsForm;
