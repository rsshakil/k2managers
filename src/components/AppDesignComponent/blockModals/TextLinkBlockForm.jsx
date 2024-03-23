import { Form, Formik } from 'formik';
import React, { useState } from 'react';

import { linkTypes } from '../../../lib/commonConstants';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';
import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import ModalTitle from '../../Modal/components/ModalTitle';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from '../../Wrapper/InputContainer';
import BlockModalFooter from './BlockModalFooter';

export default function TextLinkBlockForm({ blockData = '', setModalOpen = () => {}, handleOnPressSave = () => {} }) {
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
            <ModalTitle title="テキストリンク設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <SelectBox
                                        label="リンク種別"
                                        name="linkType"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        {linkTypes.map((x) => (
                                            <option key={x.id} value={x.value}>
                                                {x.caption}
                                            </option>
                                        ))}
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="リンク内容"
                                        name="linkDestination"
                                        placeholder="リンク内容"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <TextBox
                                        label="リンクテキスト"
                                        name="linkText"
                                        placeholder="リンクテキスト"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                                <InputContainer>
                                    <Note
                                        label="テキストリンクエリアwrapカスタムClass"
                                        name="textLinkAreaWrapCustomClass"
                                        placeholder="テキストリンクエリアwrapカスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25 !p-1"
                                        height="h-8"
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Note
                                        label="リンクタグカスタムClass"
                                        name="linkCustomClass"
                                        placeholder="リンクタグカスタムClass"
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
