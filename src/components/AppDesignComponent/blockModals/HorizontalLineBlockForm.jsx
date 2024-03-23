import { Form, Formik } from "formik";
import React, { useState } from "react";

import Note from "../../Form/FormInputs/Note";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from "../../Wrapper/InputContainer";
import BlockModalFooter from "./BlockModalFooter";

export default function HorizontalLineBlockForm({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { }, fieldKey = '', type = 1 }) {
    const [formData, setFormData] = useState(blockData);


    function handleOnchange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="水平線設定" className="text-blue-100 text-xl" />

            <Formik
                enableReinitialize={true}
                initialValues={formData}
            >
                <div className='relative w-full h-full'>
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <Note label="<hr>カスタムクラス"
                                        name="hrCustomClass"
                                        placeholder="<hr>カスタムクラス"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
                                    />
                                </InputContainer>

                                <InputContainer>
                                    <Note label="<hr>Wrapカスタムクラス"
                                        name="hrWrapCustomClass"
                                        placeholder="<hr>Wrapカスタムクラス"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
                                    />
                                </InputContainer>
                            </div>
                        </div>

                        <BlockModalFooter setModalOpen={() => setModalOpen(false)} handleOnPressSave={(e) => handleOnPressSave(e, formData)} />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper >
    )
}