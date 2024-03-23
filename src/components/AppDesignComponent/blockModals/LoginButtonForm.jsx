//--------added 6th feb,23, no need anymore-------
//Ebetsu Version
import { Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

import { getSelectedPageData, getTransitionDestinationRouteList } from '../../../store/recoil/appDesignerState';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function LoginButtonForm({ blockData = '', setModalOpen = () => {}, handleOnPressSave = () => {} }) {
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [formData, setFormData] = useState(blockData);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="[江別]予約ブロック設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <TextBox
                                        label="ボタン表示名"
                                        name="buttonText"
                                        placeholder="ボタン表示名"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="ログイン成功時遷移先"
                                        name="successDestination"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        value={formData.successDestination}
                                        onChange={handleOnchange}
                                    >
                                        <option value="">なし</option>
                                        {transitionRoutes.map((x) => (
                                            <option key={x.id} value={x.url}>
                                                {x.name}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="ログイン失敗時遷移先"
                                        name="failureDestination"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        value={formData.failureDestination}
                                        onChange={handleOnchange}
                                    >
                                        <option value="">なし</option>
                                        {transitionRoutes.map((x) => (
                                            <option key={x.id} value={x.url}>
                                                {x.name}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <SelectBox
                                        label="配置ボタンタイプ"
                                        name="buttonType"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                        value={formData.buttonType}
                                        onChange={handleOnchange}
                                    >
                                        <option value="a">A</option>
                                        <option value="b">B</option>
                                        <option value="c">C</option>
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="ログインエリアwrapカスタムClass"
                                        name="loginAreaCustomClass"
                                        placeholder="ログインエリアwrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
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
    );
}
