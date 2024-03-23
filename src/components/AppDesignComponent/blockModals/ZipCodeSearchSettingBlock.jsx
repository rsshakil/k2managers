//--------added 6th feb,23, no need anymore-------
//Ebetsu Version

import React, { useState } from 'react';
import { Form, Formik } from 'formik';
import { useRecoilValue } from 'recoil';
import _ from 'lodash';

import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import InputContainer from '../../Wrapper/InputContainer';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import ModalTitle from '../../Modal/components/ModalTitle';
import {
    appDesignerState,
    getSelectedPageData,
    getTransitionDestinationRouteList,
} from '../../../store/recoil/appDesignerState';
import BlockModalFooter from './BlockModalFooter';
import { isPositiveInteger, valueFormatCheck } from '../../../utilities/commonFunctions';

export default function ZipCodeSearchSettingBlock({
    blockData = '',
    setModalOpen = () => {},
    handleOnPressSave = () => {},
    fieldKey = '',
    uniqueError = {},
}) {
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
            [name]: value,
        }));
    }

    return (
        <WhiteModalWrapper width="border-none text-black" className="items-start">
            <ModalTitle title="[江別]郵便番号設定" className="text-blue-100 text-xl" />

            <Formik enableReinitialize={true} initialValues={formData}>
                <div className="relative w-full h-full">
                    <Form onChange={handleOnchange}>
                        <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                            <div className="flex flex-col py-10">
                                <InputContainer>
                                    <SelectBox
                                        label="表示タイプ"
                                        name="displayType"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    >
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </SelectBox>
                                </InputContainer>

                                <InputContainer>
                                    <TextBox
                                        label="ブロックカスタムクラス"
                                        name="blockWrapCustomClass"
                                        placeholder="カスタムClass"
                                        labelClassName="text-blue-100"
                                        inputClassName="bg-blue-25"
                                    />
                                </InputContainer>
                            </div>
                        </div>

                        <BlockModalFooter
                            errors={uniqueError}
                            setModalOpen={() => setModalOpen(false)}
                            handleOnPressSave={(e) => handleOnPressSave(e, formData)}
                        />
                    </Form>
                </div>
            </Formik>
        </WhiteModalWrapper>
    );
}
