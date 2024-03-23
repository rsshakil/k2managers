import { Form, Formik } from "formik";
import { useState } from "react";

import { valueFormatCheck } from "../../../utilities/commonFunctions";
import Button from "../../Button/Button";
import Note from "../../Form/FormInputs/Note";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from "../../Modal/components/WhiteModalWrapper";
import InputContainer from "../../Wrapper/InputContainer";
import ButtonBlockForm from "./ButtonBlockForm";
        


const formAttributes = {
    'BUTTON': {
        buttonQuantity: 1,
        buttonType: 'a',
        buttonCustomClass: '',
        button1Text: '',
        button1Filter: '',
        button1Function: 'onClick',
        button1Destination: '',
        button2Text: '',
        button2Filter: '',
        button2Function: 'onClick',
        button2Destination: '',
        memoModal: '',
    }
}

export default function BlockModal({ data = {}, onClickCancel, onClickSave }) { 
    const [formData, setFormData] = useState({ ...data, ...formAttributes[data.key] });
    
    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value)

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    const modalForm = (blockData, handleOnchange) => {
        switch (blockData.key) {
            case 'BUTTON':
                return <ButtonBlockForm formData={blockData} handleOnchange={handleOnchange} />

            case 'INFORMATION_AREA':
                return (
                    <div>You are a Manager.</div>
                )
            case 'TERMSS_OF_SERVICE':
                return (
                    <div>You are a Manager.</div>
                )
            case 'IMAGE':
                return (
                    <div>You are a Manager.</div>
                )
            case 'TEXT_LINK':
                return (
                    <div>You are a Manager.</div>
                )
            case 'HTML_EDITOR':
                return (
                    <div>You are a Manager.</div>
                )
            case 'MAP':
                return (
                    <div>You are a Manager.</div>
                )

            default:
                return (
                    <div>Nothing to display</div>
                )
        }
    }


    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title={`${data.blockPageTitle}設定`} className="text-blue-100" />
            <Formik
                enableReinitialize={true}
                initialValues={data}
            >
                <div className='relative w-full h-full'>
                    <Form onChange={handleOnchange}>
                        {modalForm(formData, handleOnchange)}

                        <div>
                            <InputContainer className='mb-8 mt-24'>
                                <Note
                                    label='メモ（2048文字まで）'
                                    labelClassName={`text-white !text-blue-100`}
                                    inputClassName='bg-blue-25'
                                    type='text'
                                    name='memoModal'
                                />
                            </InputContainer>


                            <div className=' flex space-x-[42px] mb-4'>
                                <Button
                                    title="キャンセル"
                                    className="bg-blue-100"
                                    hoverColorType="hover:bg-blue-300"
                                    type="button"
                                    onClick={() => onClickCancel()}
                                />
                                <Button
                                    title="決定"
                                    type='button'
                                    onClick={(e) => onClickSave(e, formData)}
                                />
                            </div>
                        </div>
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper>
    )
}