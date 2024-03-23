import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import { valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function PageTitleSettingBlock({
    blockData = '',
    setModalOpen = () => {},
    handleOnPressSave = () => {},
}) {
    const [formData, setFormData] = useState(blockData); 

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="ページタイトル設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <SelectBox
                                        label="headingTagタイプ"
                                        name="headingTagType"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        <option value="1">H1</option>
                                        <option value="2">H2</option>
                                        <option value="3">H3</option>
                                        <option value="4">H4</option>
                                        <option value="5">H5</option>
                                        <option value="6">H6</option>
                                    </SelectBox>
                                </InputContainer>

                                <InputContainer>
                                    <TextBox
                                        label="タイトル前置詞"
                                        name="firstSentence"
                                        placeholder="タイトル前置詞"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="タイトル後置詞"
                                        name="endSentence"
                                        placeholder="タイトル後置詞"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Note
                                        label="ブロックカスタムクラス"
                                        name="blockWrapCustomClass"
                                        placeholder="カスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
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
