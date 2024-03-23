import { Form, Formik } from "formik";
import React, { useState } from "react";
import { useRecoilValue } from "recoil";

import { appDesignerState, getSelectedPageData, getTransitionDestinationRouteList } from "../../../store/recoil/appDesignerState";
import { valueFormatCheck } from "../../../utilities/commonFunctions";
import Note from "../../Form/FormInputs/Note";
import SelectBox from "../../Form/FormInputs/SelectBox";
import ModalTitle from "../../Modal/components/ModalTitle";
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import InputContainer from "../../Wrapper/InputContainer";
import BlockModalFooter from "./BlockModalFooter";

export default function SpaceBlockForm({ blockData = '', setModalOpen = () => { }, handleOnPressSave = () => { }, fieldKey = '' }) {
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const recoilStateValue = useRecoilValue(appDesignerState);
    const { activeTab, activePageId, tabItems } = recoilStateValue; 
    let numField = Array.from({ length: 257 }, (_, i) => i + 1);


    const [formData, setFormData] = useState(blockData); 

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="スペーサー設定" className="text-blue-100 text-xl" />

            <Formik
                enableReinitialize={true}
                initialValues={formData}
            >
                <div className='relative w-full h-full'>
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <SelectBox
                                        label="スペース（px）"
                                        name="size"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        {numField.map((i, n) => <option key={n} value={n}>{n}px</option>)}
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>

                                    <SelectBox
                                        label='方向'
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25'
                                        name='axis'
                                        onChange={handleOnchange}
                                    >
                                        <option value='0'>縦並び</option>
                                        <option value='1'>横並び</option>
                                    </SelectBox>
                                </InputContainer>
                                <InputContainer>
                                    <Note label="<span>カスタムクラス"
                                        name="customClass"
                                        placeholder="<span>カスタムクラス"
                                        labelClassName='text-blue-100'
                                        inputClassName='bg-blue-25 !p-1'
                                        height='h-8'
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
        </WhiteModalWrapper >
    )
}