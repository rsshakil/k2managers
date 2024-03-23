import React, { useState, useEffect } from 'react';

import { Form, Formik } from 'formik';
import { useRecoilValue } from 'recoil';
import _ from 'lodash';

import SelectBox from '../../Form/FormInputs/SelectBox';
import TextBox from '../../Form/FormInputs/TextBox';
import InputContainer from '../../Wrapper/InputContainer';
import WhiteModalWrapper from '../../Modal/components/WhiteModalWrapper';
import ModalTitle from '../../Modal/components/ModalTitle';
import BlockModalFooter from './BlockModalFooter';
import Loader from '../../Loading/Loader';
import {
    appDesignerState,
    getSelectedPageData,
    getTransitionDestinationRouteList,
} from '../../../store/recoil/appDesignerState';
import {
    numOfMaxLength,
    fullWidthNumber,
    readOnlyDropDownItems,
    requiredDropDownItems,
} from '../../../lib/commonConstants';
import { getFieldDropDownItemsByFieldType } from '../../../services/appDesignerService';
import { inputMode, autoComplete, inputType } from '../../../lib/tailwindClassAttributes';
import { valueFormatCheck } from '../../../utilities/commonFunctions';
import Note from '../../Form/FormInputs/Note';

const placeholderItem = {
    fieldId: '',
    fieldName: 'フィールドを選択してください',
    fieldStyle: {
        caption: 'フィールドを選択してください',
    },
};

export default function InputTextAreaSettingsBlock({
    blockData = '',
    setModalOpen = () => {},
    handleOnPressSave = () => {},
    uniqueError = {},
}) {
    const selectedPageDetail = useRecoilValue(getSelectedPageData);
    const transitionRoutes = useRecoilValue(getTransitionDestinationRouteList);
    const [dropDownItemData, setDropDownItems] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getFileterItemsByFieldType() {
        const projectId = window.sessionStorage.getItem('currentProjectId');

        const { data, status } = await getFieldDropDownItemsByFieldType(projectId, 1);
        if (status == 200) {
            let { records = [] } = data || [];
            setDropDownItems([placeholderItem, ...records]);
        }

        setLoading(false);
    }
    useEffect(() => {
        getFileterItemsByFieldType();
    }, []);

    const [formData, setFormData] = useState(blockData);

    function handleOnchange(e) {
        const name = e.target.name;
        const value = valueFormatCheck(e.target.value);

        if (e.target.name === 'fieldCode') {
            const findField = dropDownItemData.find((x) => x.fieldCode == value);

            updatedFormState('fieldId', findField.fieldId);
        }

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    function updatedFormState(name, value) {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    }
    let numField = Array.from({ length: formData.columns }, (_, i) => i + 1);
    let MaxlengthList = Array.from({ length: 256 }, (_, i) => i + 1);

    return (
        <>
            {loading && <Loader />}

            <WhiteModalWrapper width="border-none text-black" className="items-start">
                <ModalTitle title="入力フォームinputTextArea設定" className="text-blue-100 text-xl" />

                <Formik enableReinitialize={true} initialValues={formData}>
                    <div className="relative w-full h-full">
                        <Form onChange={handleOnchange}>
                            <div className="body-height3 pt-12 px-10 min-h-[calc(100vh-452px)] !p-0">
                                <div className="flex flex-col py-10">
                                    <InputContainer>
                                        <SelectBox
                                            label="対象フィールド "
                                            name={`fieldCode`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            value={formData.fieldCode}
                                            onChange={handleOnchange}
                                        >
                                            {dropDownItemData.map((x) => (
                                                <option key={x.fieldCode} value={x.fieldCode}>
                                                    {x.fieldName}
                                                </option>
                                            ))}
                                        </SelectBox>
                                    </InputContainer>

                                    <InputContainer>
                                        <TextBox
                                            label="ラベル"
                                            name={`label`}
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25"
                                            placeholder="ラベル"
                                        />
                                    </InputContainer>

                                    <div className="flex px-8">
                                        <div className="w-1/4 pr-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`必須`}
                                                    name={`required`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    {requiredDropDownItems.length > 0 &&
                                                        requiredDropDownItems.map((field, index) => (
                                                            <option value={field.value} key={field.value + '_' + index}>
                                                                {field.caption}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>

                                        <div className="w-1/4 px-2">
                                            <InputContainer>
                                                <TextBox
                                                    label={`value（初期値）`}
                                                    name={`value`}
                                                    placeholder="value"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                />
                                            </InputContainer>
                                        </div>

                                        <div className="w-1/4 px-2">
                                            <InputContainer>
                                                <TextBox
                                                    label="placeholder"
                                                    name={`placeholder`}
                                                    placeholder="placeholder"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                />
                                            </InputContainer>
                                        </div>

                                        <div className="w-1/4 pl-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`maxlength(最大文字数) `}
                                                    name={`maxlength`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    <option value="" selected>
                                                        指定しない
                                                    </option>
                                                    {MaxlengthList.map((n, i) => (
                                                        <option key={i} value={n}>
                                                            {n}
                                                        </option>
                                                    ))}
                                                    <option value="512">512</option>
                                                    <option value="1024">1024</option>
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <div className="flex px-8">
                                        <div className="w-1/4 pr-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`readonly`}
                                                    name={`readOnly`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    {readOnlyDropDownItems.length > 0 &&
                                                        readOnlyDropDownItems.map((field, index) => (
                                                            <option value={field.value} key={field.value + '_' + index}>
                                                                {field.caption}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/4 px-2">
                                            <InputContainer>
                                                <TextBox
                                                    label="必須エラー時テキスト"
                                                    name="requiredErrorText"
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    placeholder="必須エラー時テキスト"
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/4 px-2">
                                            <InputContainer>
                                                <TextBox
                                                    label="name属性"
                                                    name={`name`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    placeholder="name属性"
                                                    isRequired
                                                />
                                            </InputContainer>
                                        </div>
                                        <div className="w-1/4 pl-2">
                                            <InputContainer>
                                                <SelectBox
                                                    label={`autocomplete属性`}
                                                    name={`autoComplete`}
                                                    labelClassName="text-blue-100 text-xs"
                                                    inputClassName="bg-blue-25"
                                                    onChange={handleOnchange}
                                                >
                                                    {autoComplete.length > 0 &&
                                                        autoComplete.map((field, index) => (
                                                            <option value={field.value} key={field.value + '_' + index}>
                                                                {field.caption}
                                                            </option>
                                                        ))}
                                                </SelectBox>
                                            </InputContainer>
                                        </div>
                                    </div>

                                    <div className="px-8 mt-10 mb-10">
                                        <InputContainer>
                                            <Note
                                                label="ラベルカスタムクラス"
                                                name="labelCustomClass"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                                placeholder="カスタムClass"
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <Note
                                                label="textAreaカスタムクラス"
                                                name="textAreaCustomClass"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                                placeholder="カスタムClass"
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <Note
                                                label="placeholderカスタムクラス"
                                                name="placeholderCustomClass"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                                placeholder="カスタムClass"
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <Note
                                                label="エラーテキストカスタムクラス"
                                                name="errorTextCustomClass"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                                placeholder="カスタムClass"
                                            />
                                        </InputContainer>
                                        <InputContainer>
                                            <Note
                                                label="areaWrapカスタムクラス"
                                                name="areaWrapCustomClass"
                                                labelClassName="text-blue-100"
                                                inputClassName="bg-blue-25 !p-1"
                                                height="h-8"
                                                placeholder="カスタムClass"
                                            />
                                        </InputContainer>
                                    </div>

                                    <InputContainer>
                                        <Note
                                            label="blockWrapカスタムクラス"
                                            name="blockWrapCustomClass"
                                            labelClassName="text-blue-100"
                                            inputClassName="bg-blue-25 !p-1"
                                            height="h-8"
                                            placeholder="blockWrapカスタムクラス"
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
        </>
    );
}
